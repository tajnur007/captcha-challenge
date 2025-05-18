import { useEffect, useState } from 'react';

enum ButtonAction {
	CONTINUE = 'Continue',
	VALIDATE = 'Validate',
}

function App() {
	const [instruction, setInstruction] = useState<string>('Take Selfie');
	const [btnAction, setBbtnAction] = useState<ButtonAction>(
		ButtonAction.CONTINUE
	);

	useEffect(() => {
		const videoElement = document.getElementById('video') as HTMLVideoElement;
		if (videoElement) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					videoElement.srcObject = stream;
				})
				.catch((error) => {
					console.error(
						'Facing issue while trying to access the webcam!',
						error
					);
				});
		}
	}, []);

	const handleButtonClick = () => {
		if (btnAction === ButtonAction.CONTINUE) {
			handleContinueAction();
		} else {
			handleValidateAction();
		}
	};

	const handleContinueAction = () => {};
	const handleValidateAction = () => {};

	return (
		<div className="bg-[#16295d] w-screen h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center">
			<div className="p-20 bg-white w-1/2 h-2/3 flex flex-col justify-center items-center">
				<p className="text-blue-700 text-3xl text-center">{instruction}</p>
				<video
					autoPlay
					id="video"
					className="my-5 border border-solid border-gray-200 w-4/5"
				/>
				<button
					className="uppercase bg-[#de9b0d] text-white p-2 w-40 cursor-pointer transition-all ease-linear hover:bg-[#de9c0de4] hover:tracking-wider"
					onClick={handleButtonClick}
				>
					{btnAction}
				</button>
			</div>
		</div>
	);
}

export default App;
