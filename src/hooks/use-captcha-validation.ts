import { useEffect, useRef, useState } from 'react';
import type { Array2D, BoxData, BoxDataContextValue } from '../types/common';
import { generateBoxData, getTarget, getTargetKeys } from '../utils/helpers';

export const useCaptchaValidation = () => {
	// Refs for DOM elements
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// State management
	const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);
	const [isCaptchaValid, setIsCaptchaValid] = useState<boolean | null>(null);
	const [target, setTarget] = useState<BoxData | null>(null);
	const [boxData, setBoxData] = useState<Array2D<BoxData>>([]);
	const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

	/**
	 * Initialize webcam stream on component mount
	 */
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

	/**
	 * Handles the main action button click based on current state
	 */
	const handleActionButtonClick = () => {
		if (isImageCaptured) {
			handleValidateAction();
		} else {
			handleContinueAction();
		}
	};

	/**
	 * Handles the image capture process and initializes the captcha challenge
	 */
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

			const randomBoxData = generateBoxData();

			setIsImageCaptured(true);
			setBoxData(randomBoxData);
			setTarget(getTarget(randomBoxData));
		}
	};

	/**
	 * Validates the user's selected positions against the target positions
	 */
	const handleValidateAction = () => {
		const targetKeys = getTargetKeys(boxData, target!);
		const isPositionInTargetKeys = (pos: string) => targetKeys.includes(pos);

		const isValid =
			selectedPositions.length === targetKeys.length &&
			selectedPositions.every(isPositionInTargetKeys);

		setIsCaptchaValid(isValid);
	};

	/**
	 * Handles box selection/deselection during the challenge
	 */
	const handleBoxClick = (position: string) => {
		if (isCaptchaValid === null) {
			if (selectedPositions.includes(position)) {
				setSelectedPositions((prev) => prev.filter((v) => v !== position));
			} else {
				setSelectedPositions((prev) => [...prev, position]);
			}
		}
	};

	/**
	 * Resets the entire captcha process to its initial state
	 */
	const resetProcess = () => {
		if (canvasRef.current) {
			const contextOfCanvas = canvasRef.current.getContext('2d');
			contextOfCanvas?.reset();
		}

		setIsImageCaptured(false);
		setIsCaptchaValid(null);
		setTarget(null);
		setBoxData([]);
		setSelectedPositions([]);
	};

	// Context provider value
	const providerValue: BoxDataContextValue = {
		isCaptchaValid,
		selectedPositions,
		handleBoxClick,
	};

	return {
		containerRef,
		videoRef,
		canvasRef,
		isImageCaptured,
		isCaptchaValid,
		target,
		providerValue,
		boxData,
		handleActionButtonClick,
		resetProcess,
	};
};
