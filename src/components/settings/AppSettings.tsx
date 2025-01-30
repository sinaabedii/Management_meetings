import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { useSettings } from "../../context/SettingsContext";

const themeOptions = [
  { id: "light", name: "روشن", icon: SunIcon },
  { id: "dark", name: "تیره", icon: MoonIcon },
  { id: "system", name: "سیستم", icon: ComputerDesktopIcon },
] as const;

const colorSchemes = [
  { id: "blue", color: "#3B82F6", name: "آبی" },
  { id: "emerald", color: "#059669", name: "زمردی" },
  { id: "violet", color: "#7C3AED", name: "بنفش" },
  { id: "rose", color: "#E11D48", name: "صورتی" },
  { id: "amber", color: "#D97706", name: "کهربایی" },
] as const;

const languages = [
  { id: "fa", name: "فارسی", flag: "🇮🇷" },
  { id: "en", name: "English", flag: "🇬🇧" },
  { id: "ar", name: "العربية", flag: "🇸🇦" },
] as const;

const AppSettings = () => {
  const {
    theme,
    setTheme,
    colorScheme,
    setColorScheme,
    language,
    setLanguage,
  } = useSettings();

  
  

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <PaintBrushIcon className="h-5 w-5 ml-2" />
          حالت نمایش
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {themeOptions.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`
                p-3 rounded-lg flex items-center justify-center gap-2
                ${
                  theme === id
                    ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Scheme */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          رنگ اصلی
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {colorSchemes.map(({ id, color, name }) => (
            <button
              key={id}
              onClick={() => setColorScheme(id)}
              className={`
                group relative rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-gray-900
                ${
                  colorScheme === id
                    ? "ring-2 ring-gray-900 dark:ring-white"
                    : ""
                }
              `}
              title={name}
            >
              <div
                className="h-8 w-full rounded transition-transform group-hover:scale-105"
                style={{ backgroundColor: color }}
              />
              <span className="sr-only">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <LanguageIcon className="h-5 w-5 ml-2" />
          زبان
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {languages.map(({ id, name, flag }) => (
            <button
              key={id}
              onClick={() => setLanguage(id)}
              className={`
                p-3 rounded-lg flex items-center justify-center gap-2
                ${
                  language === id
                    ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <span className="text-xl">{flag}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          پیش‌نمایش
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                عنوان نمونه
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                این یک متن نمونه برای نمایش تنظیمات فعلی است.
              </p>
            </div>
            <button className="btn-primary">دکمه نمونه</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
