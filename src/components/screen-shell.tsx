import type { ComponentRef, PropsWithChildren, ReactNode, Ref } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';

export function ScreenShell({
  children,
  contentStyle,
  scrollViewRef,
  onScroll,
  scrollEventThrottle,
  showsVerticalScrollIndicator,
  overlay,
}: PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  scrollViewRef?: Ref<ComponentRef<typeof ScrollView>>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollEventThrottle?: number;
  showsVerticalScrollIndicator?: boolean;
  overlay?: ReactNode;
}>) {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </ScrollView>
      {overlay}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: 'center' },
  content: {
    width: '100%',
    maxWidth: 720,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    gap: 24,
  },
});
