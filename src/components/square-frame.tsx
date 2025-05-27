import { useEffect, useRef } from 'react';
import { generateRandomNumber } from '../utils/helpers';
import type { SquareFrameProps } from '../types/component-props';
import ShapeBox from './shape-box';

function SquareFrame({ boxData }: SquareFrameProps) {
	const squareRef = useRef<HTMLDivElement>(null);
	const frameBackground = boxData.length ? 'bg-[#ffffff55]' : '';

	useEffect(() => {
		const intervalRef = setInterval(() => {
			if (squareRef.current && !boxData.length) {
				const parentElement = squareRef.current.parentElement as HTMLDivElement;
				const parentHeight = parentElement.clientHeight;
				const parentWidth = parentElement.clientWidth;
				const squareWidth = 162;

				const positionX = generateRandomNumber(0, parentWidth - squareWidth);
				const positionY = generateRandomNumber(0, parentHeight - squareWidth);

				squareRef.current.style.left = positionX + 'px';
				squareRef.current.style.top = positionY + 'px';
			}
		}, 3000);

		return () => clearInterval(intervalRef);
	}, [boxData.length]);

	return (
		<div
			ref={squareRef}
			className={`w-[162px] h-[162px] grid grid-cols-5 absolute top-10 left-10 z-20 border border-solid border-white ${frameBackground}`}
		>
			{boxData.map((row) => {
				return (
					<>
						{row.map((item) => (
							<ShapeBox key={item.key} data={item} />
						))}
					</>
				);
			})}
		</div>
	);
}

export default SquareFrame;
