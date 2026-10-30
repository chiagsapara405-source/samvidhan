import { constitutionParts } from '@/data/constitution';
import { PartCard } from '@/components/part-card';
import { ScreenHeader } from '@/components/screen-header';
import { ScreenShell } from '@/components/screen-shell';
import { ThemedText } from '@/components/themed-text';

export default function PartsScreen() {
  return (
    <ScreenShell>
      <ScreenHeader title="Constitution" back />
      <ThemedText themeColor="textSecondary">Explore the Constitution part by part.</ThemedText>
      {constitutionParts.map((part) => (
        <PartCard key={part.id} part={part} />
      ))}
    </ScreenShell>
  );
}
