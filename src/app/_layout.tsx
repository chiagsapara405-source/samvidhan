import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ReaderPreferencesProvider } from '@/context/reader-preferences';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ReaderPreferencesProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: {
                backgroundColor: Colors[colorScheme === 'dark' ? 'dark' : 'light'].background,
              },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="search" />
            <Stack.Screen name="parts/index" />
            <Stack.Screen name="parts/[partId]" />
            <Stack.Screen name="article/[articleId]" />
          </Stack>
        </ThemeProvider>
      </ReaderPreferencesProvider>
    </SafeAreaProvider>
  );
}
