import type { CameraZoneProps } from '../types/component-props';
import SquareFrame from './square-frame';

function CameraZone({
	containerRef,
	videoRef,
	canvasRef,
	boxData,
}: CameraZoneProps) {
	return (
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
	);
}

export default CameraZone;
