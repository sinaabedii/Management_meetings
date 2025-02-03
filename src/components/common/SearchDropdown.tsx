import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  DocumentIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  type: "meeting" | "user" | "file" | "resolution";
  title: string;
  description?: string;
  link: string;
  date?: string;
}

const mockSearch = (query: string): SearchResult[] => {
  if (!query) return [];

  const searchResults: SearchResult[] = [
    {
      id: "1",
      type: "meeting" as const,
      title: "جلسه برنامه‌ریزی اسپرینت",
      description: "تاریخ: 1402/12/15 - ساعت 14:00",
      link: "/meetings/1",
      date: "1402/12/15",
    },
    {
      id: "2",
      type: "user" as const,
      title: "علی محمدی",
      description: "مدیر پروژه",
      link: "/users/1",
    },
    {
      id: "3",
      type: "file" as const,
      title: "گزارش پیشرفت پروژه.pdf",
      description: "آخرین بروزرسانی: 2 روز پیش",
      link: "/files/1",
      date: "1402/12/10",
    },
    {
      id: "4",
      type: "resolution" as const,
      title: "تهیه مستندات فنی",
      description: "مسئول: سارا احمدی",
      link: "/meetings/1/resolutions/1",
    },
  ];

  return searchResults.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
  );
};

const getTypeIcon = (type: SearchResult["type"]) => {
  switch (type) {
    case "meeting":
      return CalendarIcon;
    case "user":
      return UserIcon;
    case "file":
      return FolderIcon;
    case "resolution":
      return DocumentIcon;
    default:
      return DocumentIcon;
  }
};

const getTypeLabel = (type: SearchResult["type"]) => {
  switch (type) {
    case "meeting":
      return "جلسه";
    case "user":
      return "کاربر";
    case "file":
      return "فایل";
    case "resolution":
      return "مصوبه";
    default:
      return type;
  }
};

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useOnClickOutside(searchRef, () => setIsOpen(false));

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = mockSearch(query);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigate(results[selectedIndex].link);
          setIsOpen(false);
          setQuery("");
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.link);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-lg">
      <motion.div 
        initial={false}
        animate={{ scale: query ? 1.02 : 1 }}
        className="relative"
      >
        <MagnifyingGlassIcon
          className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 
            text-gray-400 group-hover:text-purple-500 transition-colors duration-300"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-12 w-full rounded-xl bg-white/80 dark:bg-gray-800/80 
            backdrop-blur-sm pr-12 pl-4 text-gray-900 dark:text-white 
            placeholder:text-gray-400 border border-purple-100/20 
            dark:border-purple-900/20 shadow-lg shadow-purple-500/5
            hover:shadow-purple-500/10 focus:shadow-purple-500/20
            focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/20
            transition-all duration-300"
          placeholder="جستجو در جلسات، کاربران، فایل‌ها و مصوبات..."
        />
        <AnimatePresence>
          {query && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute left-3 top-3"
            >
              <kbd className="inline-flex items-center rounded-md bg-gray-100/80 
                dark:bg-gray-700/80 backdrop-blur-sm px-2 text-xs text-gray-400
                border border-gray-200/30 dark:border-gray-600/30
                shadow-sm transition-all duration-300">
                ESC
              </kbd>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white/80 dark:bg-gray-800/80 
              backdrop-blur-xl rounded-xl shadow-xl shadow-purple-500/10 
              border border-purple-100/20 dark:border-purple-900/20 
              max-h-96 overflow-y-auto scrollbar-thin 
              scrollbar-thumb-purple-500/20 hover:scrollbar-thumb-purple-500/30"
          >
            {results.map((result, index) => {
              const Icon = getTypeIcon(result.type);
              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(result)}
                  className={`group p-4 cursor-pointer transition-all duration-300 
                    ${index === selectedIndex
                      ? "bg-gradient-to-r from-purple-50/80 to-blue-50/80 dark:from-purple-900/30 dark:to-blue-900/30"
                      : "hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20"
                    }`}
                >
                  <div className="flex items-start">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="flex-shrink-0"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 
                        to-blue-500/10 group-hover:from-purple-500/20 
                        group-hover:to-blue-500/20 transition-all duration-300">
                        <Icon className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                      </div>
                    </motion.div>
                    <div className="mr-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white 
                          group-hover:text-purple-600 dark:group-hover:text-purple-400 
                          transition-colors duration-300">
                          {result.title}
                        </p>
                        <span className="text-xs px-2 py-1 rounded-lg bg-purple-500/10 
                          text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20 
                          transition-all duration-300">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      {result.description && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400
                          group-hover:text-gray-700 dark:group-hover:text-gray-300 
                          transition-colors duration-300">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchDropdown;
