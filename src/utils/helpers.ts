import type { Array2D, BoxData } from '../types/common';
import { SHAPE_COLORS } from './constants';

/**
 * Generates a 5x5 grid of box data with random shapes and colors
 */
export function generateBoxData(): Array2D<BoxData> {
	// Initializing 5 x 5 array with initial color and shape type
	const data: Array2D<BoxData> = [];

	for (let rowIdx = 0; rowIdx < 5; rowIdx++) {
		const row: BoxData[] = [];
		for (let colIdx = 0; colIdx < 5; colIdx++) {
			row.push({
				key: rowIdx + ',' + colIdx,
				type: 0,
				color: '',
			});
		}
		data.push(row);
	}

	// Tracker for checking already assigned shape
	const tracker: Record<string, boolean> = {};

	for (let shapeType = 1; shapeType <= 3; shapeType++) {
		for (let i = 1; i <= 4; i++) {
			const colorIndex = generateRandomNumber(0, 2);
			let rowIdx = generateRandomNumber();
			let colIdx = generateRandomNumber();
			let key = rowIdx + ',' + colIdx;

			// Retrying until find out not assigned cell
			while (tracker[key]) {
				rowIdx = generateRandomNumber();
				colIdx = generateRandomNumber();
				key = rowIdx + ',' + colIdx;
			}

			// Assigning shape type and marking the cell is occupied
			tracker[key] = true;
			data[rowIdx][colIdx].type = shapeType;
			data[rowIdx][colIdx].color = SHAPE_COLORS[colorIndex];
		}
	}
	return data;
}

/**
 * Generates a random number between min and max
 */
export function generateRandomNumber(min = 0, max = 4): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Gets a random target box data from the box data
 */
export function getTarget(boxData: Array2D<BoxData>): BoxData {
	let rowIdx = generateRandomNumber();
	let colIdx = generateRandomNumber();

	// Retrying until find out a shape cell
	while (!boxData[rowIdx][colIdx].type) {
		rowIdx = generateRandomNumber();
		colIdx = generateRandomNumber();
	}

	return boxData[rowIdx][colIdx];
}

/**
 * Gets the keys of the target box data from the box data
 */
export function getTargetKeys(
	boxData: Array2D<BoxData>,
	target: BoxData
): string[] {
	const targetKeys: string[] = [];

	boxData.forEach((row) => {
		row.forEach((item) => {
			if (target.type === item.type && target.color === item.color) {
				targetKeys.push(item.key);
			}
		});
	});

	return targetKeys;
}
