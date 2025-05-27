export type Array2D<T> = T[][];

export interface BoxDataContextValue {
	isCaptchaValid: boolean | null;
	selectedPositions: string[];
	handleBoxClick: (position: string) => void;
}

export interface BoxData {
	key: string;
	type: number;
	color: string;
}
