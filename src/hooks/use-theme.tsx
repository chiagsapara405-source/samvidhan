import { createContext, useContext, type PropsWithChildren } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ThemeName = keyof typeof Colors;
const ThemeOverrideContext = createContext<ThemeName | undefined>(undefined);

export function ThemeOverrideProvider({
  value,
  children,
}: PropsWithChildren<{ value: ThemeName }>) {
  return <ThemeOverrideContext.Provider value={value}>{children}</ThemeOverrideContext.Provider>;
}

export function useTheme() {
  const scheme = useColorScheme();
  const override = useContext(ThemeOverrideContext);
  const theme: ThemeName = override ?? (scheme === 'dark' ? 'dark' : 'light');

  return Colors[theme];
}
