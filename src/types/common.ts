export type Array2D<T> = T[][];

export interface BoxDataContextValue {
	selectedPositions: string[];
	handleBoxClick: (position: string) => void;
}

export interface BoxData {
	key: string;
	type: number;
	color: string;
}
