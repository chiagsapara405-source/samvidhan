import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Keyboard, Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ScreenHeader } from '@/components/screen-header';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { constitutionParts } from '@/data/constitution';
import { searchConstitution, type SearchResult, type SearchStatus } from '@/data/search';
import { useTheme } from '@/hooks/use-theme';

const statusOptions: { value: SearchStatus; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'repealed', label: 'Repealed' },
  { value: 'omitted', label: 'Omitted' },
];

export default function SearchScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [partId, setPartId] = useState<string | undefined>();
  const [status, setStatus] = useState<SearchStatus>('all');
  const [partPickerOpen, setPartPickerOpen] = useState(false);

  const search = useMemo(() => {
    try {
      return { results: searchConstitution(query, { partId, status }), error: false };
    } catch {
      return { results: [], error: true };
    }
  }, [partId, query, status]);

  const selectedPart = constitutionParts.find((part) => part.id === partId);

  function openResult(result: SearchResult) {
    Keyboard.dismiss();
    if (result.type === 'part') router.push(`/parts/${result.part.id}`);
    else router.push(`/article/${result.article.id}`);
  }

  return (
    <ScreenShell contentStyle={styles.content}>
      <ScreenHeader title="Search the Constitution" back />
      <ThemedText themeColor="textSecondary" style={styles.subtitle}>
        Find articles, topics and provisions.
      </ThemedText>

      <View
        style={[
          styles.searchBox,
          { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected },
        ]}
      >
        <ThemedText themeColor="textSecondary" style={styles.searchIcon}>
          {'\u2315'}
        </ThemedText>
        <TextInput
          accessibilityLabel="Search articles, topics or constitutional text"
          autoCapitalize="none"
          autoCorrect={false}
          enterKeyHint="search"
          onChangeText={setQuery}
          onSubmitEditing={() => Keyboard.dismiss()}
          placeholder="Search articles, topics or text..."
          placeholderTextColor={theme.textSecondary}
          returnKeyType="search"
          style={[styles.input, { color: theme.text }]}
          value={query}
        />
        {query.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => setQuery('')}
            style={styles.clearButton}
          >
            <ThemedText themeColor="textSecondary" style={styles.clearText}>
              {'\u00d7'}
            </ThemedText>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.filterSection}>
        <ThemedText themeColor="textSecondary" style={styles.filterLabel}>
          NARROW BY PART
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Filter by Part: ${selectedPart ? `${selectedPart.number}, ${selectedPart.title}` : 'All Parts'}`}
          accessibilityHint="Opens the Part filter"
          onPress={() => setPartPickerOpen(true)}
          style={({ pressed }) => [
            styles.partFilter,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.backgroundSelected,
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <ThemedText style={styles.partFilterText}>
            {selectedPart ? `${selectedPart.number} · ${selectedPart.title}` : 'All Parts'}
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.chevron}>
            {'\u2304'}
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.filterSection}>
        <ThemedText themeColor="textSecondary" style={styles.filterLabel}>
          ARTICLE STATUS
        </ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusList}
        >
          {statusOptions.map((option) => {
            const selected = status === option.value;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setStatus(option.value)}
                style={({ pressed }) => [
                  styles.statusChip,
                  {
                    backgroundColor: selected ? theme.backgroundSelected : theme.background,
                    borderColor: theme.backgroundSelected,
                    opacity: pressed ? 0.72 : 1,
                  },
                ]}
              >
                <ThemedText style={styles.statusChipText}>{option.label}</ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {query.trim() ? (
        <>
          <ThemedText themeColor="textSecondary" style={styles.resultCount}>
            {search.error
              ? 'Search is temporarily unavailable.'
              : `${search.results.length} ${search.results.length === 1 ? 'result' : 'results'}`}
          </ThemedText>
          {search.error ? (
            <ThemedText themeColor="textSecondary">Please try your search again.</ThemedText>
          ) : search.results.length ? (
            <View style={styles.results}>
              {search.results.map((result) => (
                <SearchResultCard
                  key={result.type === 'part' ? result.part.id : result.article.id}
                  onPress={() => openResult(result)}
                  result={result}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyTitle}>No matching provisions</ThemedText>
              <ThemedText themeColor="textSecondary">
                Try another article number, title or phrase.
              </ThemedText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear search query"
                onPress={() => setQuery('')}
                style={[styles.emptyClear, { borderColor: theme.backgroundSelected }]}
              >
                <ThemedText style={{ color: theme.accent }}>Clear search</ThemedText>
              </Pressable>
            </View>
          )}
        </>
      ) : (
        <View style={styles.introduction}>
          <ThemedText style={styles.introTitle}>Find a provision</ThemedText>
          <ThemedText themeColor="textSecondary">
            Search by article number, title, Part or a phrase from the Constitution.
          </ThemedText>
        </View>
      )}

      <Modal
        animationType="fade"
        onRequestClose={() => setPartPickerOpen(false)}
        transparent
        visible={partPickerOpen}
      >
        <Pressable style={styles.modalScrim} onPress={() => setPartPickerOpen(false)}>
          <Pressable
            accessibilityViewIsModal
            onPress={(event) => event.stopPropagation()}
            style={[styles.modalPanel, { backgroundColor: theme.backgroundElement }]}
          >
            <ThemedText style={styles.modalTitle}>Choose a Part</ThemedText>
            <PartOption
              label="All Parts"
              selected={!partId}
              onPress={() => {
                setPartId(undefined);
                setPartPickerOpen(false);
              }}
            />
            {constitutionParts.map((part) => (
              <PartOption
                key={part.id}
                label={`${part.number} · ${part.title}`}
                selected={partId === part.id}
                onPress={() => {
                  setPartId(part.id);
                  setPartPickerOpen(false);
                }}
              />
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenShell>
  );
}

function PartOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.partOption, { borderColor: theme.backgroundSelected }]}
    >
      <ThemedText style={{ color: selected ? theme.accent : theme.text }}>{label}</ThemedText>
      {selected ? <ThemedText style={{ color: theme.accent }}>{'\u2713'}</ThemedText> : null}
    </Pressable>
  );
}

function SearchResultCard({ result, onPress }: { result: SearchResult; onPress: () => void }) {
  const theme = useTheme();
  const isPart = result.type === 'part';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        isPart
          ? `${result.part.number}, ${result.part.title}. Open Part.`
          : `Article ${result.article.number}: ${result.article.title}. ${result.part.number}, ${result.part.title}${result.article.status !== 'active' ? `. ${result.article.status}` : ''}. Open article.`
      }
      accessibilityHint={isPart ? 'Opens this Part and its articles' : 'Opens this article'}
      onPress={onPress}
      style={({ pressed }) => [
        styles.resultCard,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.backgroundSelected,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      {isPart ? (
        <>
          <ThemedText style={[styles.resultEyebrow, { color: theme.accent }]}>
            {result.part.number.toUpperCase()}
          </ThemedText>
          <ThemedText style={styles.resultTitle}>{result.part.title}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.resultMeta}>
            {result.part.articleRange} · {result.part.articles.length} articles
          </ThemedText>
        </>
      ) : (
        <>
          <ThemedText style={[styles.resultEyebrow, { color: theme.accent }]}>
            ARTICLE {result.article.number}
          </ThemedText>
          <ThemedText style={styles.resultTitle}>{result.article.title}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.resultMeta}>
            {result.part.number} · {result.part.title}
            {result.article.status !== 'active' ? ` · ${result.article.status.toUpperCase()}` : ''}
          </ThemedText>
          {result.excerpt ? (
            <ThemedText themeColor="textSecondary" style={styles.excerpt}>
              {result.excerpt}
            </ThemedText>
          ) : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { gap: 15 },
  subtitle: { marginTop: -9 },
  searchBox: {
    minHeight: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 15,
    paddingRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchIcon: { fontSize: 25, lineHeight: 30 },
  input: { flex: 1, minWidth: 0, minHeight: 52, paddingVertical: 10, fontSize: 16 },
  clearButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  clearText: { fontSize: 28, lineHeight: 32 },
  filterSection: { gap: 8 },
  filterLabel: { fontSize: 10, lineHeight: 14, letterSpacing: 1.2, fontWeight: '700' },
  partFilter: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  partFilterText: { flex: 1, fontSize: 14, fontWeight: '600' },
  chevron: { fontSize: 22, lineHeight: 24 },
  statusList: { gap: 8, paddingRight: 20 },
  statusChip: {
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  statusChipText: { fontSize: 13, fontWeight: '600' },
  resultCount: { fontSize: 13, lineHeight: 19, paddingTop: 2 },
  results: { gap: 10 },
  resultCard: { borderWidth: 1, borderRadius: 16, padding: 16, gap: 7, minWidth: 0 },
  resultEyebrow: { fontSize: 11, lineHeight: 16, letterSpacing: 1.2, fontWeight: '700' },
  resultTitle: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
  resultMeta: { fontSize: 12, lineHeight: 18 },
  excerpt: { fontSize: 13, lineHeight: 20, paddingTop: 4 },
  introduction: { gap: 6, paddingTop: 8 },
  introTitle: { fontFamily: 'serif', fontSize: 24, lineHeight: 31, fontWeight: '600' },
  emptyState: { alignItems: 'flex-start', gap: 8, paddingTop: 8 },
  emptyTitle: { fontSize: 19, lineHeight: 27, fontWeight: '700' },
  emptyClear: { minHeight: 44, justifyContent: 'center', borderBottomWidth: 1, marginTop: 2 },
  modalScrim: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.56)',
  },
  modalPanel: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  modalTitle: {
    fontFamily: 'serif',
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '600',
    paddingBottom: 4,
  },
  partOption: {
    minHeight: 48,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
});
