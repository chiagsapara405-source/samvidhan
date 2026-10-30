import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

const sections = [
  { title: 'Parts', available: true },
  { title: 'Search', available: true },
  { title: 'Articles', available: false },
  { title: 'Schedules', available: false },
  { title: 'Amendments', available: false },
];

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScreenShell contentStyle={styles.content}>
      <View style={styles.brand}>
        <ThemedText style={styles.wordmark}>Samvidhan</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.kicker}>
          CONSTITUTION OF INDIA
        </ThemedText>
      </View>

      <ThemedText themeColor="textSecondary" style={styles.intro}>
        Explore the Constitution of India, part by part and article by article.
      </ThemedText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Read the Constitution of India. Explore Parts and Articles."
        onPress={() => router.push('/parts')}
        style={({ pressed }) => [
          styles.feature,
          { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.86 : 1 },
        ]}
      >
        <ThemedText style={styles.featureLabel}>THE CONSTITUTION OF INDIA</ThemedText>
        <ThemedText style={[styles.featureTitle, { color: theme.text }]}>
          A closer look at the foundations of the Republic.
        </ThemedText>
        <View style={styles.featureFooter}>
          <ThemedText style={[styles.featureAction, { color: theme.text }]}>
            Read the Constitution
          </ThemedText>
          <ThemedText style={styles.featureArrow}>↗</ThemedText>
        </View>
        <ThemedText style={[styles.featureHint, { color: theme.textSecondary }]}>
          Explore Parts and Articles
        </ThemedText>
      </Pressable>

      <View style={styles.sectionHeading}>
        <ThemedText style={styles.sectionTitle}>Explore Constitution</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.sectionNote}>
          A reference, one section at a time
        </ThemedText>
      </View>

      <View style={styles.grid}>
        {sections.map((section, index) => (
          <Pressable
            key={section.title}
            accessibilityRole={section.available ? 'button' : undefined}
            accessibilityLabel={
              section.available
                ? section.title === 'Search'
                  ? 'Search the Constitution'
                  : 'Explore Parts'
                : `${section.title}, coming soon`
            }
            accessibilityState={section.available ? undefined : { disabled: true }}
            disabled={!section.available}
            onPress={() => router.push(section.title === 'Search' ? ('/search' as Href) : '/parts')}
            style={({ pressed }) => [
              styles.sectionCard,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: theme.backgroundSelected,
                opacity: !section.available ? 0.63 : pressed ? 0.68 : 1,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.sectionNumber,
                { color: index === 0 ? '#A05A27' : theme.textSecondary },
              ]}
            >
              0{index + 1}
            </ThemedText>
            <ThemedText style={styles.cardTitle}>{section.title}</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.cardMeta}>
              {section.available ? 'Explore now  →' : 'Coming soon'}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <ThemedText themeColor="textSecondary" style={styles.disclaimer}>
        Independent educational/reference application. Not affiliated with the Government of India.
      </ThemedText>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 36, gap: 26 },
  brand: { gap: 6 },
  wordmark: {
    fontFamily: 'serif',
    fontSize: 36,
    lineHeight: 43,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  kicker: { fontSize: 11, lineHeight: 16, letterSpacing: 2, fontWeight: '600' },
  intro: { fontSize: 17, lineHeight: 26, maxWidth: 440 },
  feature: { borderRadius: 22, padding: 24, gap: 15 },
  featureLabel: {
    color: '#A05A27',
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  featureTitle: {
    color: '#252B32',
    fontFamily: 'serif',
    fontSize: 25,
    lineHeight: 33,
    maxWidth: 450,
  },
  featureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  featureAction: { color: '#252B32', fontSize: 15, lineHeight: 22, fontWeight: '700' },
  featureArrow: { color: '#252B32', fontSize: 21 },
  featureHint: { color: '#666A6B', fontSize: 13, lineHeight: 19 },
  sectionHeading: { gap: 4 },
  sectionTitle: { fontSize: 20, lineHeight: 28, fontWeight: '700' },
  sectionNote: { fontSize: 13, lineHeight: 19 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  sectionCard: {
    flexGrow: 1,
    flexBasis: '46%',
    minHeight: 125,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 7,
  },
  sectionNumber: { fontSize: 11, lineHeight: 16, letterSpacing: 1.2, fontWeight: '700' },
  cardTitle: { fontSize: 16, lineHeight: 21, fontWeight: '700' },
  cardMeta: { fontSize: 12, lineHeight: 17 },
  disclaimer: { fontSize: 12, lineHeight: 18, paddingTop: 4 },
});
