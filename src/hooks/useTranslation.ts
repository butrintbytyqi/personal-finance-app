import { useCallback } from 'react';
import { useAppSelector } from './redux';
import sq from '../i18n/sq.json';
import en from '../i18n/en.json';
import de from '../i18n/de.json';
import fr from '../i18n/fr.json';

const translations = {
  sq,
  en,
  de,
  fr,
} as const;

type TranslationsType = typeof en;

type PathImpl<T, Key extends keyof T> =
  Key extends string
  ? T[Key] extends Record<string, any>
    ? `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
    : Key
  : never;

type Path = PathImpl<TranslationsType, keyof TranslationsType> | Join<PathImpl<TranslationsType, keyof TranslationsType>>;

type Join<K> = K extends string 
  ? K extends `${infer A}.${infer B}`
    ? `${A}.${Join<B>}`
    : K
  : never;

export const useTranslation = () => {
  const language = useAppSelector((state) => state.settings?.preferences?.language || 'en');

  const t = useCallback((key: Path): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  }, [language]);

  return { t, language };
};
