import type { ReactNode, RefObject } from 'react';
import type { Array2D, BoxData, BoxDataContextValue } from './common';

export interface BoxDataProviderProps {
	children: ReactNode;
	value: BoxDataContextValue;
}

export interface InstructionProps {
	isImageCaptured: boolean;
	targetShapeId: number;
	targetColor: string;
}

export interface CameraZoneProps {
	containerRef: RefObject<HTMLDivElement | null>;
	videoRef: RefObject<HTMLVideoElement | null>;
	canvasRef: RefObject<HTMLCanvasElement | null>;
	boxData: Array2D<BoxData>;
}

export interface ActionButtonProps {
	isImageCaptured: boolean;
	handleActionButtonClick: () => void;
}

export interface SquareFrameProps {
	boxData: Array2D<BoxData>;
}

export interface ShapeBoxProps {
	data: BoxData;
}

export interface ValidationResultProps {
	isValidationSuccess: boolean;
	onRetry: () => void;
}
