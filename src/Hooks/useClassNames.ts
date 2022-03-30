import { useMemo } from 'react';

const useClassNames = (...args: unknown[]): string => useMemo(() => args.filter((value) => !!value).join(' '), [args]);

export default useClassNames;
