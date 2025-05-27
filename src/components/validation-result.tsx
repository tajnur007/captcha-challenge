import type { ValidationResultProps } from '../types/component-props';

function ValidationResult({ isSuccess, onRetry }: ValidationResultProps) {
	const msgTextColor = isSuccess ? 'text-green-500' : 'text-red-500';
	const message = `Verification ${isSuccess ? 'successful' : 'failed'}.`;
	const nextInstruction = isSuccess ? 'Restart process?' : 'Try again';

	return (
		<p className={`text-xl h-10 ${msgTextColor}`}>
			{message}{' '}
			<span
				className="text-blue-500 hover:underline cursor-pointer"
				onClick={onRetry}
			>
				{nextInstruction}
			</span>
		</p>
	);
}

export default ValidationResult;
