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
				<div className="px-6 py-3 md:px-10 md:py-5 lg:px-12 lg:py-6 xl:px-16 xl:py-8 2xl:px-20 2xl:py-10 bg-white flex flex-col justify-center items-center">
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
