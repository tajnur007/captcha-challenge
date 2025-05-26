import type { ValidationResultProps } from '../types/component-props';

function ValidationResult({
	isValidationSuccess,
	onRetry,
}: ValidationResultProps) {
	return (
		<p
			className={`text-xl h-10 ${
				isValidationSuccess ? 'text-green-500' : 'text-red-500'
			}`}
		>
			{isValidationSuccess
				? 'Verification successful.'
				: 'Verification failed.'}{' '}
			<span
				className="text-blue-500 hover:underline cursor-pointer"
				onClick={onRetry}
			>
				{isValidationSuccess ? 'Retry?' : 'Try again'}
			</span>
		</p>
	);
}

export default ValidationResult;
