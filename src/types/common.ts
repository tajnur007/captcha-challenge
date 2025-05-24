export type Array2D<T> = T[][];

export interface BoxDataContextValue {
	selectedPositions: string[];
	handleBoxClick: (position: string) => void;
}
