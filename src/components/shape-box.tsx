import { useContext } from 'react';
import { BoxDataContext } from '../contexts/box-data-context';
import { SHAPES } from '../utils/constants';
import type { ShapeBoxProps } from '../types/component-props';

function ShapeBox({ type, position }: ShapeBoxProps) {
	const { selectedPositions, handleBoxClick } = useContext(BoxDataContext);
	const isBoxSelected = selectedPositions.includes(position);

	return (
		<div
			className={`w-8 h-8 flex justify-center items-center border border-solid border-white cursor-pointer ${
				isBoxSelected ? 'text-amber-600' : 'text-[#ffffffdd]'
			}`}
			onClick={() => handleBoxClick(position)}
		>
			{SHAPES[type]?.shape}
		</div>
	);
}

export default ShapeBox;
