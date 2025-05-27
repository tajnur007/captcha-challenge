import { useEffect, useRef, useState } from 'react';
import type { Array2D, BoxData } from '../types/common';
import { generateBoxData, getTarget, getTargetKeys } from '../utils/helpers';

export const useCaptchaValidation = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [isImageCaptured, setIsImageCaptured] = useState<boolean>(false);
	const [isCaptchaValid, setIsCaptchaValid] = useState<boolean | null>(null);

	const [target, setTarget] = useState<BoxData | null>(null);
	const [boxData, setBoxData] = useState<Array2D<BoxData>>([]);
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

			const randomBoxData = generateBoxData();

			setIsImageCaptured(true);
			setBoxData(randomBoxData);
			setTarget(getTarget(randomBoxData));
		}
	};

	const handleValidateAction = () => {
		const targetKeys = getTargetKeys(boxData, target!);
		const isPositionInTargetKeys = (pos: string) => targetKeys.includes(pos);

		const isValid =
			selectedPositions.length === targetKeys.length &&
			selectedPositions.every(isPositionInTargetKeys);

		setIsCaptchaValid(isValid);
	};

	const handleBoxClick = (position: string) => {
		if (setIsCaptchaValid === null) {
			if (selectedPositions.includes(position)) {
				setSelectedPositions((prev) => prev.filter((v) => v !== position));
			} else {
				setSelectedPositions((prev) => [...prev, position]);
			}
		}
	};

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

	const providerValue = { selectedPositions, handleBoxClick };

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
