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
      // در حالت واقعی اینجا از API استفاده می‌شود
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
      <div className="relative">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-12 w-full border-0 bg-white dark:bg-gray-700 pr-12 pl-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 sm:text-sm rounded-lg"
          placeholder="جستجو در جلسات، کاربران، فایل‌ها و مصوبات..."
        />
        {query && (
          <div className="absolute left-3 top-3">
            <kbd className="inline-flex items-center rounded border border-gray-200 dark:border-gray-600 px-2 text-xs text-gray-400">
              ESC
            </kbd>
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          {results.map((result, index) => {
            const Icon = getTypeIcon(result.type);
            return (
              <div
                key={result.id}
                onClick={() => handleSelect(result)}
                className={`p-4 cursor-pointer ${
                  index === selectedIndex
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="mr-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                    {result.description && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {result.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
