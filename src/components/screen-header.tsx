import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export function ScreenHeader({ title, back = false }: { title: string; back?: boolean }) {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      {back ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            { borderColor: theme.backgroundElement, opacity: pressed ? 0.65 : 1 },
          ]}
        >
          <ThemedText style={styles.backText}>‹</ThemedText>
        </Pressable>
      ) : null}
      <ThemedText style={styles.title}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 14 },
  backButton: {
    minWidth: 44,
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { fontSize: 30, lineHeight: 34, marginTop: -4 },
  title: { fontSize: 20, lineHeight: 28, fontWeight: '700' },
});
