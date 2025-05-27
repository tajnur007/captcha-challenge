import { useContext } from 'react';
import { BoxDataContext } from '../contexts/box-data-context';
import { SHAPES } from '../utils/constants';
import type { ShapeBoxProps } from '../types/component-props';

function ShapeBox({ data }: ShapeBoxProps) {
	const { isCaptchaValid, selectedPositions, handleBoxClick } =
		useContext(BoxDataContext);

	const isResultShown = isCaptchaValid !== null;
	const isBoxSelected = selectedPositions.includes(data.key);

	const shapeColor = data.color;
	const cursorStyle = isResultShown ? 'cursor-not-allowed' : 'cursor-pointer';
	const backgroundColor = isBoxSelected ? 'bg-white' : 'bg-transparent';

	return (
		<div
			className={`w-8 h-8 flex justify-center items-center border border-solid border-white ${shapeColor} ${cursorStyle} ${backgroundColor}`}
			onClick={() => handleBoxClick(data.key)}
		>
			{SHAPES[data.type]?.shape}
		</div>
	);
}

export default ShapeBox;
