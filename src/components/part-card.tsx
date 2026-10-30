import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import type { ConstitutionPart } from '@/types/constitution';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export function PartCard({ part }: { part: ConstitutionPart }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${part.number}, ${part.title}, ${part.articleRange}`}
      onPress={() => router.push(`/parts/${part.id}`)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.backgroundSelected,
          opacity: pressed ? 0.72 : 1,
        },
      ]}
    >
      <ThemedText style={styles.eyebrow}>{part.number.toUpperCase()}</ThemedText>
      <View style={styles.row}>
        <View style={styles.copy}>
          <ThemedText style={styles.title}>{part.title}</ThemedText>
          <ThemedText themeColor="textSecondary">{part.articleRange}</ThemedText>
          {part.description ? (
            <ThemedText themeColor="textSecondary" style={styles.description}>
              {part.description}
            </ThemedText>
          ) : null}
          <ThemedText themeColor="textSecondary" style={styles.count}>
            {part.articles.length} {part.articles.length === 1 ? 'article' : 'articles'}
          </ThemedText>
        </View>
        <ThemedText themeColor="textSecondary" style={styles.arrow}>
          ›
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 18, padding: 20, gap: 14, minHeight: 130 },
  eyebrow: {
    color: '#A05A27',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1.4,
    fontWeight: '700',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  copy: { flex: 1, gap: 5 },
  title: { fontSize: 18, lineHeight: 25, fontWeight: '700' },
  description: { fontSize: 13, lineHeight: 19 },
  count: { fontSize: 12, lineHeight: 17 },
  arrow: { fontSize: 30 },
});
