import { useEffect, useRef, useState } from 'react';

function App() {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);

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
