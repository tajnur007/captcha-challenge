import type { InstructionProps } from '../types/component-props';
import { SHAPES } from '../utils/constants';

function Instruction({
	isImageCaptured,
	targetShapeId,
	targetColor,
}: InstructionProps) {
	const colorName = targetColor.split('-')[1];

	return (
		<p className="text-blue-700 text-3xl text-center capitalize">
			{isImageCaptured
				? `Select ${colorName} ${SHAPES[targetShapeId].name}`
				: 'Take Selfie'}
		</p>
	);
}

export default Instruction;
