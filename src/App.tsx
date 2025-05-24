import { useCaptchaValidation } from './hooks/use-captcha-validation';
import BoxDataProvider from './contexts/box-data-context/provider';
import Instruction from './components/instruction';
import CameraZone from './components/camera-zone';
import ActionButton from './components/action-button';

function App() {
	const {
		containerRef,
		videoRef,
		canvasRef,
		isImageCaptured,
		targetShapeId,
		providerValue,
		boxData,
		handleActionButtonClick,
	} = useCaptchaValidation();

	return (
		<BoxDataProvider value={providerValue}>
			<div className="bg-[#16295d] w-screen h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center">
				<div className="p-20 bg-white w-1/2 h-2/3 flex flex-col justify-center items-center">
					<Instruction
						isImageCaptured={isImageCaptured}
						targetShapeId={targetShapeId}
					/>

					<CameraZone
						containerRef={containerRef}
						videoRef={videoRef}
						canvasRef={canvasRef}
						boxData={boxData}
					/>

					<ActionButton
						isImageCaptured={isImageCaptured}
						handleActionButtonClick={handleActionButtonClick}
					/>
				</div>
			</div>
		</BoxDataProvider>
	);
}

export default App;
