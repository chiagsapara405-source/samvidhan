import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import type { Article } from '@/types/constitution';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export function ArticleCard({ article }: { article: Article }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Article ${article.number}: ${article.title}`}
      onPress={() => router.push(`/article/${article.id}`)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.backgroundSelected,
          opacity: pressed ? 0.72 : 1,
        },
      ]}
    >
      <View style={styles.topLine}>
        <ThemedText style={styles.number}>ARTICLE {article.number}</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.arrow}>
          {'\u2192'}
        </ThemedText>
      </View>
      <View style={styles.titleRow}>
        <ThemedText style={styles.title}>{article.title}</ThemedText>
        {article.status !== 'active' ? (
          <ThemedText themeColor="textSecondary" style={styles.status}>
            {article.status.toUpperCase()}
          </ThemedText>
        ) : null}
      </View>
      <ThemedText themeColor="textSecondary" style={styles.footer}>
        {article.textVerification === 'verified'
          ? 'Official text verified'
          : 'Official text unavailable'}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 16, padding: 18, gap: 10, minWidth: 0 },
  topLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  number: { color: '#C67A43', fontSize: 12, lineHeight: 18, letterSpacing: 1.4, fontWeight: '700' },
  arrow: { fontSize: 18 },
  titleRow: { gap: 8 },
  title: { fontSize: 17, lineHeight: 25, fontWeight: '600' },
  status: { fontSize: 10, lineHeight: 14, letterSpacing: 1, fontWeight: '700' },
  footer: { fontSize: 13, lineHeight: 19, paddingTop: 2 },
});
