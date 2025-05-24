import type { CameraZoneProps } from '../types/component-props';
import SquareFrame from './square-frame';

function CameraZone({
	containerRef,
	videoRef,
	canvasRef,
	boxData,
}: CameraZoneProps) {
	return (
		<div
			ref={containerRef}
			className="relative my-5 w-[280px] h-[210px] md:w-[380px] md:h-[285px] lg:w-[480px] lg:h-[360px] xl:w-[560px] xl:h-[420px] 2xl:w-[640px] 2xl:h-[480px]"
		>
			<video ref={videoRef} className="w-full" />
			<canvas
				ref={canvasRef}
				height={0}
				width={0}
				className="absolute top-0 left-0"
			/>
			<SquareFrame boxData={boxData} />
		</div>
	);
}

export default CameraZone;
