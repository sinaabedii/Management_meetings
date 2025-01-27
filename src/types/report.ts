export interface MeetingStats {
    month: string;
    total: number;
    completed: number;
    cancelled: number;
  }
  
  export interface DepartmentMeeting {
    name: string;
    value: number;
  }
  
  export interface AttendanceData {
    name: string;
    present: number;
    absent: number;
    total: number;
  }
  
  export interface MeetingMetrics {
    totalMeetings: number;
    completedMeetings: number;
    averageParticipants: number;
    averageDuration: number;
  }
  
  export type DateRangeType = 'last3months' | 'last6months' | 'lastyear';
  export type DepartmentType = 'all' | 'development' | 'design' | 'management';