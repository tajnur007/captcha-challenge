import type { ActionButtonProps } from '../types/component-props';

function ActionButton({
	isImageCaptured,
	handleActionButtonClick,
}: ActionButtonProps) {
	return (
		<button
			className="uppercase bg-[#de9b0d] text-white p-2 w-40 cursor-pointer transition-all ease-linear hover:bg-[#de9c0de4] hover:tracking-wider"
			onClick={handleActionButtonClick}
		>
			{isImageCaptured ? 'Validate' : 'Continue'}
		</button>
	);
}

export default ActionButton;
