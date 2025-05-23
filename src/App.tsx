import { useEffect, useRef, useState, type ReactNode } from 'react';

type Array2D<T> = T[][];

const SHAPES_SVG: ReactNode[] = [
	// No shape
	<></>,
	// Circle
	<svg fill="#ffffffdd" width="24px" height="24px" viewBox="0 0 15 15">
		<path d="M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z" />
	</svg>,
	// Triangle
	<svg fill="#ffffffdd" width="24px" height="24px" viewBox="0 0 24 24">
		<path d="M21.9,19.3l-9-15.6c-0.1-0.1-0.2-0.2-0.3-0.3c-0.5-0.3-1.1-0.2-1.4,0.3l-9,15.6C2,19.4,2,19.6,2,19.8c0,0.6,0.4,1,1,1h18c0.2,0,0.3,0,0.5-0.1C22,20.4,22.1,19.8,21.9,19.3z" />
	</svg>,
	// Rectangle
	<svg fill="#ffffffdd" width="24px" height="24px" viewBox="0 0 24 24">
		<path d="m0 0h24v24h-24z" />
	</svg>,
];

function App() {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);
	const [boxData, setBoxData] = useState<Array2D<number>>([]);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.play();
				}
			})
			.catch((error) => {
				console.error('Facing issue while trying to access the webcam!', error);
			});
	}, []);

	const handleButtonClick = () => {
		if (isImageCaptured) {
			handleValidateAction();
		} else {
			handleContinueAction();
		}
	};

	const handleContinueAction = () => {
		if (containerRef.current && videoRef.current && canvasRef.current) {
			canvasRef.current.setAttribute(
				'height',
				containerRef.current.clientHeight + 'px'
			);
			canvasRef.current.setAttribute(
				'width',
				containerRef.current.clientWidth + 'px'
			);

			const { videoHeight, videoWidth } = videoRef.current;
			const contextOfCanvas = canvasRef.current.getContext('2d');
			contextOfCanvas?.drawImage(
				videoRef.current,
				0,
				0,
				videoWidth,
				videoHeight
			);

			setIsImageCaptured(true);
			setBoxData(generateBoxData());
		}
	};

	const handleValidateAction = () => {};

	return (
		<div className="bg-[#16295d] w-screen h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center">
			<div className="p-20 bg-white w-1/2 h-2/3 flex flex-col justify-center items-center">
				{/* Instruction  */}
				<p className="text-blue-700 text-3xl text-center">
					{isImageCaptured ? 'Validate Captcha' : 'Take Selfie'}
				</p>

				{/* Camera zone  */}
				<div ref={containerRef} className="relative my-5 w-4/5 flex">
					<video ref={videoRef} id="video" className="w-full" />
					<canvas
						ref={canvasRef}
						id="image"
						height={0}
						width={0}
						className="absolute top-0 left-0"
					/>
					<SquareFrame boxData={boxData} />
				</div>

				{/* Action  */}
				<button
					className="uppercase bg-[#de9b0d] text-white p-2 w-40 cursor-pointer transition-all ease-linear hover:bg-[#de9c0de4] hover:tracking-wider"
					onClick={handleButtonClick}
				>
					{isImageCaptured ? 'Validate' : 'Continue'}
				</button>
			</div>
		</div>
	);
}

export default App;

function SquareFrame({ boxData }: { boxData: Array2D<number> }) {
	const squareRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const intervalRef = setInterval(() => {
			if (squareRef.current && !boxData.length) {
				const parentElement = squareRef.current.parentElement as HTMLDivElement;
				const parentHeight = parentElement.clientHeight;
				const parentWidth = parentElement.clientWidth;
				const squareWidth = 162;

				const positionX = generateRandomNumber(0, parentWidth - squareWidth);
				const positionY = generateRandomNumber(0, parentHeight - squareWidth);

				squareRef.current.style.left = positionX + 'px';
				squareRef.current.style.top = positionY + 'px';
			}
		}, 3000);

		return () => clearInterval(intervalRef);
	}, [boxData.length]);

	return (
		<div
			ref={squareRef}
			className={`w-[162px] h-[162px] grid grid-cols-5 absolute top-10 left-10 z-20 border border-solid border-white ${
				boxData.length ? 'bg-[#ffffff55]' : ''
			}`}
		>
			{boxData.map((row) => {
				return (
					<>
						{row.map((shapeType, index) => (
							<Shape key={'shape-' + index} type={shapeType} />
						))}
					</>
				);
			})}
		</div>
	);
}

function Shape({ type }: { type: number }) {
	return (
		<div className="w-8 h-8 flex justify-center items-center border border-solid border-white cursor-pointer">
			{SHAPES_SVG[type]}
		</div>
	);
}

function generateBoxData(): Array2D<number> {
	const data: Array2D<number> = [];
	for (let i = 0; i < 5; i++) {
		const row = new Array(5).fill(true).map(() => generateRandomNumber());
		data.push(row);
	}
	return data;
}

function generateRandomNumber(min = 0, max = 4): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
