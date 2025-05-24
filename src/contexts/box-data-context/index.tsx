import { createContext } from 'react';
import { CONTEXT_DEFAULT_VALUE } from '../../utils/constants';
import type { BoxDataContextValue } from '../../types/common';

export const BoxDataContext = createContext<BoxDataContextValue>(
	CONTEXT_DEFAULT_VALUE
);
