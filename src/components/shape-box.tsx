import { useContext } from 'react';
import { BoxDataContext } from '../contexts/box-data-context';
import { SHAPES } from '../utils/constants';
import type { ShapeBoxProps } from '../types/component-props';

function ShapeBox({ data }: ShapeBoxProps) {
	const { selectedPositions, handleBoxClick } = useContext(BoxDataContext);

	const isBoxSelected = selectedPositions.includes(data.key);
	const backgroundColor = isBoxSelected ? 'bg-white' : 'bg-transparent';
	const shapeColor = data.color;

	return (
		<div
			className={`w-8 h-8 flex justify-center items-center border border-solid border-white cursor-pointer ${shapeColor} ${backgroundColor}`}
			onClick={() => handleBoxClick(data.key)}
		>
			{SHAPES[data.type]?.shape}
		</div>
	);
}

export default ShapeBox;
