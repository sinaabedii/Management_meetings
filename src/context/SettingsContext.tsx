import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";
type ColorScheme = "blue" | "emerald" | "violet" | "rose" | "amber";
type Language = "fa" | "en" | "ar";

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  direction: "rtl" | "ltr";
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const COLOR_SCHEMES = {
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    500: "#059669",
    600: "#047857",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    500: "#7c3aed",
    600: "#6d28d9",
    700: "#5b21b6",
    800: "#4c1d95",
    900: "#2e1065",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    500: "#e11d48",
    600: "#be123c",
    700: "#9f1239",
    800: "#881337",
    900: "#4c0519",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    500: "#d97706",
    600: "#b45309",
    700: "#92400e",
    800: "#78350f",
    900: "#451a03",
  },
};

const LANGUAGE_CONFIGS = {
  fa: {
    direction: "rtl" as const,
    fontFamily: "Vazirmatn, sans-serif",
  },
  en: {
    direction: "ltr" as const,
    fontFamily: "Inter, sans-serif",
  },
  ar: {
    direction: "rtl" as const,
    fontFamily: "Noto Sans Arabic, sans-serif",
  },
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    return (localStorage.getItem("colorScheme") as ColorScheme) || "blue";
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("language") as Language) || "fa";
  });

  // تنظیم تم
  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const currentTheme = theme === "system" ? systemTheme : theme;

    root.classList.remove("dark", "light");
    root.classList.add(currentTheme);
    localStorage.setItem("theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        root.classList.remove("dark", "light");
        root.classList.add(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // تنظیم رنگ اصلی
  useEffect(() => {
    const root = document.documentElement;
    const colors = COLOR_SCHEMES[colorScheme];

    Object.entries(colors).forEach(([shade, value]) => {
      root.style.setProperty(`--color-primary-${shade}`, value);
    });
    localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme]);

  // تنظیم زبان و جهت
  useEffect(() => {
    const root = document.documentElement;
    const config = LANGUAGE_CONFIGS[language];

    root.dir = config.direction;
    root.style.setProperty("--font-family", config.fontFamily);
    document.body.style.fontFamily = config.fontFamily;

    localStorage.setItem("language", language);
  }, [language]);

  const direction = LANGUAGE_CONFIGS[language].direction;

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        colorScheme,
        setColorScheme,
        language,
        setLanguage,
        direction,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
