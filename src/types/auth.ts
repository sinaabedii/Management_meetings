export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'manager' | 'user';
    permissions: string[];
    name: string;
    department: string;
  }
  
  export interface AuthState {
    user: User | any;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }
  
  export const PERMISSIONS = {
    MANAGE_USERS: 'manage_users',
    MANAGE_MEETINGS: 'manage_meetings',
    VIEW_REPORTS: 'view_reports',
    MANAGE_FILES: 'manage_files',
    MANAGE_SETTINGS: 'manage_settings',
    CREATE_MEETING: 'create_meeting',
    EDIT_MEETING: 'edit_meeting',
    DELETE_MEETING: 'delete_meeting',
  } as const;