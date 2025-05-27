import type { BoxDataContextValue } from '../types/common';

export const CONTEXT_DEFAULT_VALUE: BoxDataContextValue = {
	isCaptchaValid: null,
	selectedPositions: [],
	handleBoxClick: () => null,
};

export const SHAPE_COLORS = ['text-red-500', 'text-green-500', 'text-blue-500'];

export const SHAPES = [
	{
		id: 0,
		name: 'No shape',
		shape: <></>,
	},
	{
		id: 1,
		name: 'Circle',
		shape: (
			<svg fill="currentcolor" width="24px" height="24px" viewBox="0 0 15 15">
				<path d="M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z" />
			</svg>
		),
	},
	{
		id: 2,
		name: 'Triangle',
		shape: (
			<svg fill="currentcolor" width="24px" height="24px" viewBox="0 0 24 24">
				<path d="M21.9,19.3l-9-15.6c-0.1-0.1-0.2-0.2-0.3-0.3c-0.5-0.3-1.1-0.2-1.4,0.3l-9,15.6C2,19.4,2,19.6,2,19.8c0,0.6,0.4,1,1,1h18c0.2,0,0.3,0,0.5-0.1C22,20.4,22.1,19.8,21.9,19.3z" />
			</svg>
		),
	},
	{
		id: 3,
		name: 'Rectangle',
		shape: (
			<svg fill="currentcolor" width="24px" height="24px" viewBox="0 0 24 24">
				<path d="m0 0h24v24h-24z" />
			</svg>
		),
	},
];
