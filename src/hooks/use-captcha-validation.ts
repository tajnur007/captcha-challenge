import { useEffect, useRef, useState } from 'react';
import type { Array2D } from '../types/common';
import { generateBoxData, generateRandomNumber } from '../utils/helpers';

export const useCaptchaValidation = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);
	const [isValidationSuccess, setIsValidationSuccess] = useState<
		boolean | null
	>(null);

	const [boxData, setBoxData] = useState<Array2D<number>>([]);
	const [targetShapeId, setTargetShapeId] = useState<number>(0);
	const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.play();
				}
			})
			.catch((error) => {
				console.error('Facing issue while trying to access the webcam!', error);
			});
	}, []);

	const handleActionButtonClick = () => {
		if (isImageCaptured) {
			handleValidateAction();
		} else {
			handleContinueAction();
		}
	};

	const handleContinueAction = () => {
		if (containerRef.current && videoRef.current && canvasRef.current) {
			canvasRef.current.setAttribute(
				'height',
				containerRef.current.clientHeight + 'px'
			);
			canvasRef.current.setAttribute(
				'width',
				containerRef.current.clientWidth + 'px'
			);

			const { videoHeight, videoWidth } = videoRef.current;
			const contextOfCanvas = canvasRef.current.getContext('2d');
			contextOfCanvas?.drawImage(
				videoRef.current,
				0,
				0,
				videoWidth,
				videoHeight
			);

			setIsImageCaptured(true);
			setBoxData(generateBoxData());
			setTargetShapeId(generateRandomNumber(1, 3));
		}
	};

	const handleValidateAction = () => {
		const targetedShapePositions: string[] = [];

		boxData.forEach((row, rowIdx) => {
			row.forEach((col, colIdx) => {
				if (col === targetShapeId) {
					targetedShapePositions.push(rowIdx + ',' + colIdx);
				}
			});
		});

		const isPositionInTargetedShapePositions = (pos: string) =>
			targetedShapePositions.includes(pos);
		const isValid =
			selectedPositions.length === targetedShapePositions.length &&
			selectedPositions.every(isPositionInTargetedShapePositions);

		setIsValidationSuccess(isValid);
	};

	const handleBoxClick = (position: string) => {
		if (selectedPositions.includes(position)) {
			setSelectedPositions((prev) => prev.filter((v) => v !== position));
		} else {
			setSelectedPositions((prev) => [...prev, position]);
		}
	};

	const resetProcess = () => {
		if (canvasRef.current) {
			const contextOfCanvas = canvasRef.current.getContext('2d');
			contextOfCanvas?.reset();
		}

		setIsImageCaptured(false);
		setIsValidationSuccess(null);
		setBoxData([]);
		setTargetShapeId(0);
		setSelectedPositions([]);
	};

	const providerValue = { selectedPositions, handleBoxClick };

	return {
		containerRef,
		videoRef,
		canvasRef,
		isImageCaptured,
		isValidationSuccess,
		targetShapeId,
		providerValue,
		boxData,
		handleActionButtonClick,
		resetProcess,
	};
};
