import type { Array2D } from '../types/common';

export function generateBoxData(): Array2D<number> {
	const data: Array2D<number> = [];
	for (let i = 0; i < 5; i++) {
		const row = new Array(5).fill(true).map(() => generateRandomNumber());
		data.push(row);
	}
	return data;
}

export function generateRandomNumber(min = 0, max = 4): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
