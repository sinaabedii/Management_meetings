import { useState, useEffect } from 'react';

type Locale = 'fa' | 'en' | 'ar';

interface LocaleConfig {
  direction: 'rtl' | 'ltr';
  fontFamily: string;
}

const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  fa: {
    direction: 'rtl',
    fontFamily: 'Vazirmatn, sans-serif'
  },
  en: {
    direction: 'ltr',
    fontFamily: 'Inter, sans-serif'
  },
  ar: {
    direction: 'rtl',
    fontFamily: 'Noto Sans Arabic, sans-serif'
  }
};

export const useLocale = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    return (localStorage.getItem('locale') as Locale) || 'fa';
  });

  useEffect(() => {
    const root = document.documentElement;
    const config = LOCALE_CONFIGS[locale];

    root.dir = config.direction;
    root.style.setProperty('--font-family', config.fontFamily);
    document.body.style.fontFamily = config.fontFamily;

    localStorage.setItem('locale', locale);
  }, [locale]);

  const direction = LOCALE_CONFIGS[locale].direction;

  return {
    locale,
    setLocale,
    direction,
    isRTL: direction === 'rtl'
  };
};