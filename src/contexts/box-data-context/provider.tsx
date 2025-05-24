import { BoxDataContext } from '.';
import type { BoxDataProviderProps } from '../../types/component-props';

function BoxDataProvider({ children, value }: BoxDataProviderProps) {
	return (
		<BoxDataContext.Provider value={value}>{children}</BoxDataContext.Provider>
	);
}

export default BoxDataProvider;
