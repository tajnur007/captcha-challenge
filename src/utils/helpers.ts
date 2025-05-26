import type { Array2D } from '../types/common';

export function generateBoxData(): Array2D<number> {
	// Initializing 5 x 5 array with zero (0) value
	const data: Array2D<number> = new Array(5).fill(true).reduce((acc) => {
		const row = new Array(5).fill(0);
		acc.push(row);
		return acc;
	}, []);

	// Tracker for checking already assigned shape
	const tracker: Record<string, boolean> = {};

	for (let shapeType = 1; shapeType <= 3; shapeType++) {
		for (let i = 1; i <= 4; i++) {
			let rowIdx = generateRandomNumber();
			let colIdx = generateRandomNumber();
			let key = rowIdx + ',' + colIdx;

			// Retrying to until find out not assigned cell
			while (tracker[key]) {
				rowIdx = generateRandomNumber();
				colIdx = generateRandomNumber();
				key = rowIdx + ',' + colIdx;
			}

			// Assigning shape type and marking the cell is occupied
			tracker[key] = true;
			data[rowIdx][colIdx] = shapeType;
		}
	}
	return data;
}

export function generateRandomNumber(min = 0, max = 4): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
