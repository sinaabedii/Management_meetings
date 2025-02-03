import { 
    HomeIcon, 
    CalendarIcon, 
    UsersIcon,
    DocumentChartBarIcon,
    FolderIcon,
     
  } from "@heroicons/react/24/outline";
  
  export const navigation = [
    { name: "داشبورد", href: "/", icon: HomeIcon },
    { name: "تقویم", href: "/calendar", icon: CalendarIcon },
    { name: "جلسات", href: "/meetings", icon: CalendarIcon },
    { name: "کاربران", href: "/users", icon: UsersIcon },
    { name: "گزارشات", href: "/reports", icon: DocumentChartBarIcon },
    { name: "فایل‌ها", href: "/files", icon: FolderIcon },
  ];