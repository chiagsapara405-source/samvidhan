import { createContext, useContext, useState, type PropsWithChildren } from 'react';

export type ReadingTheme = 'dark' | 'light';
export type ReadingSize = 'small' | 'medium' | 'large';

type ReaderPreferences = {
  theme: ReadingTheme;
  setTheme: (theme: ReadingTheme) => void;
  textSize: ReadingSize;
  setTextSize: (size: ReadingSize) => void;
  bookmarkedArticleIds: string[];
  toggleBookmark: (articleId: string) => void;
};

const ReaderPreferencesContext = createContext<ReaderPreferences | null>(null);

export function ReaderPreferencesProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ReadingTheme>('dark');
  const [textSize, setTextSize] = useState<ReadingSize>('medium');
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>([]);

  function toggleBookmark(articleId: string) {
    setBookmarkedArticleIds((current) =>
      current.includes(articleId)
        ? current.filter((savedId) => savedId !== articleId)
        : [...current, articleId],
    );
  }

  return (
    <ReaderPreferencesContext.Provider
      value={{
        theme,
        setTheme,
        textSize,
        setTextSize,
        bookmarkedArticleIds,
        toggleBookmark,
      }}
    >
      {children}
    </ReaderPreferencesContext.Provider>
  );
}

export function useReaderPreferences() {
  const preferences = useContext(ReaderPreferencesContext);
  if (!preferences) {
    throw new Error('useReaderPreferences must be used within ReaderPreferencesProvider');
  }
  return preferences;
}
