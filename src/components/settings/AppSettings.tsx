import { motion } from "framer-motion";
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
    <div className="container mx-auto  ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto bg-white/30 dark:bg-gray-800/30 
          backdrop-blur-sm rounded-xl  
           space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-sm font-medium bg-gradient-to-r from-purple-600 
            to-blue-600 bg-clip-text text-transparent mb-2 flex items-center">
            <PaintBrushIcon className="h-4 w-4 ml-1" />
            حالت نمایش
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {themeOptions.map(({ id, name, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTheme(id)}
                className={`
                  p-2 rounded-lg flex items-center justify-center gap-1 text-sm
                  backdrop-blur-sm transition-all duration-300
                  ${theme === id 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/20" 
                    : "bg-white/50 dark:bg-gray-800/50 hover:shadow-md hover:shadow-purple-500/10"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Color Scheme */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg 
            border border-gray-200/30 dark:border-gray-700/30 p-3"
        >
          <h3 className="text-sm font-medium bg-gradient-to-r from-purple-600 
            to-blue-600 bg-clip-text text-transparent mb-2">
            رنگ اصلی
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {colorSchemes.map(({ id, color, name }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setColorScheme(id)}
                className={`
                  group relative rounded-lg p-1 transition-all duration-300
                  ${colorScheme === id 
                    ? "ring-1 ring-purple-500 dark:ring-purple-400" 
                    : "hover:ring-1 hover:ring-purple-500/30"
                  }
                `}
                title={name}
              >
                <div
                  className="h-6 w-full rounded shadow-sm transition-all duration-300 
                    group-hover:shadow-md"
                  style={{ backgroundColor: color }}
                />
                <span className="mt-1 text-xs text-center block text-gray-600 
                  dark:text-gray-300">
                  {name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-medium bg-gradient-to-r from-purple-600 
            to-blue-600 bg-clip-text text-transparent mb-2 flex items-center">
            <LanguageIcon className="h-4 w-4 ml-1" />
            زبان
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {languages.map(({ id, name, flag }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLanguage(id)}
                className={`
                  p-2 rounded-lg flex items-center justify-center gap-2 text-sm
                  backdrop-blur-sm transition-all duration-300
                  ${language === id 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/20" 
                    : "bg-white/50 dark:bg-gray-800/50 hover:shadow-md hover:shadow-purple-500/10"
                  }
                `}
              >
                <span className="text-sm">{flag}</span>
                <span>{name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-200/30 dark:border-gray-700/30 pt-3"
        >
          <h3 className="text-sm font-medium bg-gradient-to-r from-purple-600 
            to-blue-600 bg-clip-text text-transparent mb-2">
            پیش‌نمایش
          </h3>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg 
            border border-gray-200/30 dark:border-gray-700/30 p-3 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  عنوان نمونه
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  این یک متن نمونه است
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-blue-500 
                  text-white rounded-lg shadow-md shadow-purple-500/20 
                  hover:shadow-purple-500/30 transition-all duration-300"
              >
                دکمه نمونه
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AppSettings;