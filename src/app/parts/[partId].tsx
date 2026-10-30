import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ArticleCard } from '@/components/article-card';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { findArticleByNumber, getPartById } from '@/data/constitution';
import { useTheme } from '@/hooks/use-theme';

function ContentNotFound() {
  return (
    <ScreenShell>
      <ScreenHeader title="Content not found" back />
      <ThemedText themeColor="textSecondary">
        The requested constitutional content could not be found.
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/')}
        style={styles.action}
      >
        <ThemedText style={styles.actionText}>Go Home</ThemedText>
      </Pressable>
    </ScreenShell>
  );
}

export default function PartScreen() {
  const { partId } = useLocalSearchParams<{ partId: string }>();
  const part = getPartById(partId);
  const theme = useTheme();
  const [query, setQuery] = useState('');

  if (!part) return <ContentNotFound />;

  const matchedArticle = query.trim() ? findArticleByNumber(query, part.id) : undefined;

  return (
    <ScreenShell>
      <ScreenHeader title={part.number} back />
      <ThemedText style={styles.title}>{part.title}</ThemedText>
      <ThemedText themeColor="textSecondary">{part.articleRange}</ThemedText>
      <View style={styles.jumpSection}>
        <ThemedText style={styles.jumpLabel}>Jump to Article</ThemedText>
        <TextInput
          accessibilityLabel="Jump to Article"
          value={query}
          onChangeText={setQuery}
          placeholder="Enter article number, e.g. 3"
          placeholderTextColor={theme.textSecondary}
          autoCapitalize="characters"
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.backgroundElement,
              borderColor: theme.backgroundSelected,
            },
          ]}
        />
        {query.trim() ? (
          matchedArticle ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push(`/article/${matchedArticle.id}`)}
              style={[styles.result, { borderColor: theme.backgroundSelected }]}
            >
              <ThemedText>Article {matchedArticle.number}</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.resultTitle}>
                {matchedArticle.title}
              </ThemedText>
              <ThemedText style={styles.resultArrow}>Open →</ThemedText>
            </Pressable>
          ) : (
            <ThemedText themeColor="textSecondary">
              No article found in {part.number}. Try an article number such as 21A.
            </ThemedText>
          )
        ) : null}
      </View>
      <View style={styles.articleList}>
        {part.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: 'serif', fontSize: 31, lineHeight: 39, fontWeight: '600' },
  jumpSection: { gap: 10 },
  jumpLabel: { fontSize: 15, fontWeight: '700' },
  input: { minHeight: 50, paddingHorizontal: 15, borderWidth: 1, borderRadius: 14, fontSize: 16 },
  result: { borderWidth: 1, borderRadius: 14, padding: 15, gap: 6 },
  resultTitle: { lineHeight: 22 },
  resultArrow: { color: '#C67A43', fontSize: 13, fontWeight: '700', paddingTop: 3 },
  articleList: { gap: 12 },
  action: {
    alignSelf: 'flex-start',
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#252B32',
  },
  actionText: { color: '#FFFFFF', fontWeight: '700' },
});
