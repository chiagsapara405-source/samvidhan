import { router, Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState, type ComponentRef } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollView,
} from 'react-native';

import { ScreenHeader } from '@/components/screen-header';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { constitutionSource } from '@/data/sources';
import { getArticleById, getArticlePosition, getPartForArticle } from '@/data/constitution';
import { Colors } from '@/constants/theme';
import { useReaderPreferences, type ReadingSize } from '@/context/reader-preferences';
import { ThemeOverrideProvider, useTheme } from '@/hooks/use-theme';

function ArticleNotFound() {
  return (
    <ScreenShell>
      <ScreenHeader title="Article not found" back />
      <ThemedText themeColor="textSecondary">
        The requested constitutional article could not be found.
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace('/parts')}
        style={styles.actionButton}
      >
        <ThemedText style={styles.actionText}>Back to Part</ThemedText>
      </Pressable>
    </ScreenShell>
  );
}

export default function ArticleScreen() {
  const { articleId, direction } = useLocalSearchParams<{
    articleId: string;
    direction?: string;
  }>();
  const article = getArticleById(articleId);
  const part = article ? getPartForArticle(article.id) : undefined;
  const {
    theme: readerTheme,
    setTheme: setReaderTheme,
    textSize: readingSize,
    setTextSize,
    bookmarkedArticleIds,
    toggleBookmark,
  } = useReaderPreferences();
  const transitionDirection = direction === 'next' || direction === 'previous' ? direction : null;
  const [transitionValue] = useState(
    () =>
      new Animated.Value(transitionDirection === 'previous' ? -28 : transitionDirection ? 28 : 0),
  );
  const [transitionLocked, setTransitionLocked] = useState(Boolean(transitionDirection));

  useEffect(() => {
    if (!transitionDirection) return;

    const animation = Animated.timing(transitionValue, {
      toValue: 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished) setTransitionLocked(false);
    });

    return () => animation.stop();
  }, [transitionDirection, transitionValue]);

  if (!article || !part) return <ArticleNotFound />;

  return (
    <>
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: Colors[readerTheme].background },
          animation: transitionDirection ? 'none' : 'slide_from_right',
        }}
      />
      <Animated.View
        style={[
          styles.transitionShell,
          {
            opacity: transitionValue.interpolate({
              inputRange: [-28, 0, 28],
              outputRange: [0.96, 1, 0.96],
            }),
            transform: [{ translateX: transitionValue }],
          },
        ]}
      >
        <ThemeOverrideProvider value={readerTheme}>
          <ArticleReader
            key={article.id}
            article={article}
            part={part}
            readerTheme={readerTheme}
            setReaderTheme={setReaderTheme}
            readingSize={readingSize}
            setReadingSize={setTextSize}
            transitionLocked={transitionLocked}
            isBookmarked={bookmarkedArticleIds.includes(article.id)}
            onToggleBookmark={() => toggleBookmark(article.id)}
          />
        </ThemeOverrideProvider>
      </Animated.View>
    </>
  );
}

function ArticleReader({
  article,
  part,
  readerTheme,
  setReaderTheme,
  readingSize,
  setReadingSize,
  transitionLocked,
  isBookmarked,
  onToggleBookmark,
}: {
  article: NonNullable<ReturnType<typeof getArticleById>>;
  part: NonNullable<ReturnType<typeof getPartForArticle>>;
  readerTheme: 'dark' | 'light';
  setReaderTheme: (theme: 'dark' | 'light') => void;
  readingSize: 'small' | 'medium' | 'large';
  setReadingSize: (size: 'small' | 'medium' | 'large') => void;
  transitionLocked: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  const theme = useTheme();
  const position = getArticlePosition(article.id);
  const readingFontSize = readingSize === 'small' ? 16 : readingSize === 'large' ? 21 : 18;
  const readingLineHeight = Math.round(readingFontSize * 1.62);
  const scrollViewRef = useRef<ComponentRef<typeof ScrollView> | null>(null);
  const [backToTopOpacity] = useState(() => new Animated.Value(0));
  const showBackToTopRef = useRef(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    Animated.timing(backToTopOpacity, {
      toValue: showBackToTop ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [backToTopOpacity, showBackToTop]);

  function adjustReadingSize(direction: -1 | 1) {
    const sizes: ReadingSize[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(readingSize);
    const nextIndex = Math.max(0, Math.min(sizes.length - 1, currentIndex + direction));
    setReadingSize(sizes[nextIndex]);
  }

  function handleReaderScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const shouldShow = event.nativeEvent.contentOffset.y > 520;
    if (shouldShow !== showBackToTopRef.current) {
      showBackToTopRef.current = shouldShow;
      setShowBackToTop(shouldShow);
    }
  }

  async function shareArticle() {
    const officialText = article.paragraphs
      .map((paragraph) => {
        const indent = paragraph.indent ? '    '.repeat(paragraph.indent) : '';
        const label = paragraph.label ? `${paragraph.label} ` : '';
        return `${indent}${label}${paragraph.text}`;
      })
      .join('\n\n');
    const title = `Article ${article.number} \u2014 ${article.title}`;
    const content = officialText || 'Official text has not been added to this app.';
    const message = `${title}\n\n${constitutionSource.name}\n\n${content}\n\nSource: ${constitutionSource.department}\nEdition: ${constitutionSource.edition}`;

    try {
      if (Platform.OS === 'web') {
        if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
          await navigator.share({ title, text: message });
        } else {
          Alert.alert('Sharing unavailable', 'This browser does not support the share sheet.');
        }
        return;
      }

      await Share.share({ title, message });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      Alert.alert('Unable to share article', 'The device share sheet could not be opened.');
    }
  }

  function scrollToTop() {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  return (
    <ScreenShell
      contentStyle={styles.readerContent}
      scrollViewRef={scrollViewRef}
      onScroll={handleReaderScroll}
      scrollEventThrottle={100}
      showsVerticalScrollIndicator={false}
      overlay={
        <Animated.View
          accessibilityElementsHidden={!showBackToTop}
          importantForAccessibility={showBackToTop ? 'auto' : 'no-hide-descendants'}
          style={[
            styles.backToTop,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.backgroundSelected,
              pointerEvents: showBackToTop ? 'auto' : 'none',
              opacity: backToTopOpacity,
              transform: [
                {
                  translateY: backToTopOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Scroll to top"
            onPress={scrollToTop}
            style={styles.backToTopHitTarget}
          >
            <ThemedText style={[styles.backToTopIcon, { color: theme.accent }]}>
              {'\u2191'}
            </ThemedText>
          </Pressable>
        </Animated.View>
      }
    >
      <StatusBar style={readerTheme === 'dark' ? 'light' : 'dark'} />
      <ScreenHeader title={`Article ${article.number}`} back />

      <View style={styles.articleHeading}>
        <ThemedText themeColor="textSecondary" style={styles.eyebrow}>
          ARTICLE {article.number}
        </ThemedText>
        <ThemedText style={styles.title}>{article.title}</ThemedText>
        {article.status !== 'active' ? (
          <ThemedText themeColor="textSecondary" style={styles.status}>
            {article.status.toUpperCase()}
          </ThemedText>
        ) : null}
        <View style={[styles.rule, { backgroundColor: theme.backgroundSelected }]} />
        <View style={styles.articleActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark Article'}
            accessibilityState={{ selected: isBookmarked }}
            onPress={onToggleBookmark}
            style={[styles.articleAction, { borderColor: theme.backgroundSelected }]}
          >
            <ThemedText style={[styles.bookmarkIcon, { color: theme.accent }]}>
              {isBookmarked ? '\u2605' : '\u2606'}
            </ThemedText>
            <ThemedText>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Share Article"
            onPress={shareArticle}
            style={[styles.articleAction, { borderColor: theme.backgroundSelected }]}
          >
            <ThemedText style={[styles.shareIcon, { color: theme.accent }]}>{'\u2197'}</ThemedText>
            <ThemedText>Share</ThemedText>
          </Pressable>
        </View>
      </View>

      <View
        style={[
          styles.controlPanel,
          { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected },
        ]}
      >
        <View style={styles.controlGroup}>
          <ThemedText themeColor="textSecondary" style={styles.controlLabel}>
            TEXT SIZE
          </ThemedText>
          <View style={styles.controlRow}>
            <ControlButton
              label={'A\u2212'}
              accessibilityLabel="Decrease text size"
              onPress={() => adjustReadingSize(-1)}
              disabled={readingSize === 'small'}
            />
            <ControlButton
              label="A"
              accessibilityLabel="Default text size"
              onPress={() => setReadingSize('medium')}
              selected={readingSize === 'medium'}
            />
            <ControlButton
              label="A+"
              accessibilityLabel="Increase text size"
              onPress={() => adjustReadingSize(1)}
              disabled={readingSize === 'large'}
            />
          </View>
        </View>
        <View style={styles.controlGroup}>
          <ThemedText themeColor="textSecondary" style={styles.controlLabel}>
            READING THEME
          </ThemedText>
          <View style={styles.controlRow}>
            {(['dark', 'light'] as const).map((mode) => (
              <ControlButton
                key={mode}
                label={mode === 'dark' ? 'Dark' : 'Light'}
                accessibilityLabel={`Use ${mode} reading theme`}
                selected={readerTheme === mode}
                onPress={() => setReaderTheme(mode)}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText themeColor="textSecondary" style={styles.sectionTitle}>
          OFFICIAL TEXT
        </ThemedText>
        <View
          style={[
            styles.textCard,
            { backgroundColor: theme.backgroundReading, borderColor: theme.backgroundSelected },
          ]}
        >
          {article.paragraphs.length ? (
            article.paragraphs.map((paragraph, index) => (
              <View
                key={`${article.id}-paragraph-${index}`}
                style={[
                  styles.paragraph,
                  { marginLeft: paragraph.indent ? paragraph.indent * 18 : 0 },
                ]}
              >
                {paragraph.label ? (
                  <ThemedText
                    style={[
                      styles.paragraphLabel,
                      { fontSize: readingFontSize, lineHeight: readingLineHeight },
                      paragraph.kind === 'proviso' || paragraph.kind === 'explanation'
                        ? styles.longLabel
                        : null,
                    ]}
                  >
                    {paragraph.label}
                  </ThemedText>
                ) : null}
                <ThemedText
                  style={[
                    styles.officialText,
                    { fontSize: readingFontSize, lineHeight: readingLineHeight },
                  ]}
                >
                  {paragraph.text}
                </ThemedText>
              </View>
            ))
          ) : (
            <ThemedText themeColor="textSecondary" style={styles.unavailable}>
              Official text is unavailable in this offline edition. The article number and Part
              placement have been verified against the selected source; no text has been
              reconstructed.
            </ThemedText>
          )}
        </View>
        {article.editorialNotes?.length ? (
          <ArticleNotesCard
            articleId={article.id}
            title="EDITORIAL NOTES"
            description="Editorial notes are reference notes from the selected constitutional edition and are not part of the Article text."
            notes={article.editorialNotes}
          />
        ) : null}
        {article.editionNotes?.length ? (
          <ArticleNotesCard
            articleId={article.id}
            title="EDITION NOTES"
            description="These notes reproduce footnotes and amendment annotations printed in the selected constitutional edition; they are separate from the Article text."
            notes={article.editionNotes}
          />
        ) : null}
      </View>

      <View style={styles.section}>
        <ThemedText themeColor="textSecondary" style={styles.sectionTitle}>
          PART
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          {part.number} {'\u2014'} {part.title}
        </ThemedText>
      </View>

      <ThemedText themeColor="textSecondary" style={styles.progress}>
        ARTICLE {position.index + 1} OF {position.total}
      </ThemedText>

      <View style={styles.navigation}>
        <ArticleNavButton
          article={position.previous}
          direction="previous"
          transitionLocked={transitionLocked}
        />
        <ArticleNavButton
          article={position.next}
          direction="next"
          transitionLocked={transitionLocked}
        />
      </View>

      <View style={styles.sourceSection}>
        <ThemedText themeColor="textSecondary" style={styles.sectionTitle}>
          SOURCE
        </ThemedText>
        <ThemedText>{constitutionSource.name}</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.sourceDetails}>
          {constitutionSource.department}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.sourceDetails}>
          Edition: {constitutionSource.edition}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.sourceDetails}>
          This identifies the edition of the constitutional material used by this application.
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.sourceDetails}>
          Text verification: {(article.textVerification ?? 'unavailable').toUpperCase()}
        </ThemedText>
      </View>
    </ScreenShell>
  );
}

function ControlButton({
  label,
  accessibilityLabel,
  onPress,
  selected = false,
  disabled = false,
}: {
  label: string;
  accessibilityLabel: string;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.controlButton,
        {
          backgroundColor: selected ? theme.backgroundSelected : theme.background,
          borderColor: theme.backgroundSelected,
          opacity: disabled ? 0.9 : 1,
        },
      ]}
    >
      <ThemedText themeColor={disabled ? 'textSecondary' : 'text'} style={styles.controlButtonText}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function ArticleNotesCard({
  articleId,
  title,
  description,
  notes,
}: {
  articleId: string;
  title: string;
  description: string;
  notes: string[];
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.notesCard,
        { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected },
      ]}
    >
      <ThemedText themeColor="textSecondary" style={styles.notesTitle}>
        {title}
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.notesDescription}>
        {description}
      </ThemedText>
      {notes.map((note, index) => (
        <ThemedText
          key={`${articleId}-note-${index}`}
          themeColor="textSecondary"
          style={styles.note}
        >
          {title === 'EDITORIAL NOTES' ? `${index + 1}. ` : ''}
          {note}
        </ThemedText>
      ))}
    </View>
  );
}

function ArticleNavButton({
  article,
  direction,
  transitionLocked,
}: {
  article: ReturnType<typeof getArticleById>;
  direction: 'previous' | 'next';
  transitionLocked: boolean;
}) {
  const theme = useTheme();
  const isNext = direction === 'next';
  const label = isNext ? 'Next \u2192' : '\u2190 Previous';

  return (
    <Pressable
      accessibilityRole={article ? 'button' : undefined}
      accessibilityLabel={
        article
          ? `${label}: Article ${article.number}, ${article.title}`
          : `No ${direction} article`
      }
      accessibilityState={article ? { disabled: transitionLocked } : { disabled: true }}
      disabled={!article || transitionLocked}
      onPress={() =>
        article &&
        router.replace({
          pathname: '/article/[articleId]',
          params: { articleId: article.id, direction },
        })
      }
      style={({ pressed }) => [
        styles.navButton,
        {
          borderColor: theme.backgroundSelected,
          backgroundColor: theme.backgroundElement,
          opacity: article && pressed ? 0.72 : 1,
        },
      ]}
    >
      <ThemedText themeColor="textSecondary" style={styles.navLabel}>
        {article ? label : isNext ? 'No next article' : 'No previous article'}
      </ThemedText>
      {article ? (
        <ThemedText style={styles.navTitle} numberOfLines={2} ellipsizeMode="tail">
          Article {article.number} {'\u00B7'} {article.title}
        </ThemedText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  transitionShell: { flex: 1 },
  readerContent: { paddingBottom: 124 },
  articleHeading: { gap: 18 },
  eyebrow: { fontSize: 12, lineHeight: 18, letterSpacing: 1.8, fontWeight: '700' },
  title: { fontFamily: 'serif', fontSize: 32, lineHeight: 40, fontWeight: '600' },
  status: { fontSize: 11, lineHeight: 16, letterSpacing: 1.2, fontWeight: '700' },
  rule: { height: 1 },
  articleActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  articleAction: {
    minWidth: 118,
    minHeight: 46,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bookmarkIcon: { fontSize: 19, lineHeight: 24 },
  shareIcon: { fontSize: 18, lineHeight: 24 },
  backToTop: {
    position: 'absolute',
    right: 20,
    bottom: 16,
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  backToTopHitTarget: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backToTopIcon: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
  controlPanel: { gap: 16, padding: 16, borderWidth: 1, borderRadius: 16 },
  controlGroup: { gap: 8 },
  controlLabel: { fontSize: 10, lineHeight: 14, letterSpacing: 1.3, fontWeight: '700' },
  controlRow: { flexDirection: 'row', gap: 8 },
  controlButton: {
    minWidth: 46,
    minHeight: 44,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonText: { fontSize: 14, lineHeight: 20, fontWeight: '700' },
  section: { gap: 12 },
  sectionTitle: { fontSize: 12, lineHeight: 18, letterSpacing: 1.4, fontWeight: '700' },
  textCard: { borderWidth: 1, padding: 18, borderRadius: 16, gap: 14 },
  paragraph: { flexDirection: 'row', alignItems: 'flex-start', gap: 7 },
  paragraphLabel: { minWidth: 31, fontWeight: '700' },
  longLabel: { minWidth: 92 },
  officialText: { flex: 1, fontWeight: '400' },
  unavailable: { fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
  notesCard: { gap: 9, padding: 15, borderWidth: 1, borderLeftWidth: 3, borderRadius: 14 },
  notesTitle: { fontSize: 10, lineHeight: 14, letterSpacing: 1.2, fontWeight: '700' },
  notesDescription: { fontSize: 12, lineHeight: 18, paddingBottom: 3 },
  note: { fontSize: 12, lineHeight: 18 },
  progress: { fontSize: 12, lineHeight: 18, letterSpacing: 1, fontWeight: '700' },
  navigation: { flexDirection: 'row', alignItems: 'stretch', gap: 10 },
  navButton: {
    flex: 1,
    minWidth: 0,
    minHeight: 100,
    padding: 13,
    borderWidth: 1,
    borderRadius: 14,
    justifyContent: 'center',
    gap: 6,
  },
  navLabel: { fontSize: 13, lineHeight: 18, fontWeight: '700' },
  navTitle: { fontSize: 11, lineHeight: 15, fontWeight: '500' },
  sourceSection: { gap: 7, paddingTop: 6 },
  sourceDetails: { fontSize: 12, lineHeight: 18 },
  actionButton: {
    alignSelf: 'flex-start',
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: Colors.dark.backgroundElement,
  },
  actionText: { color: Colors.dark.text, fontWeight: '700' },
});
