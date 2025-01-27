export interface Participant {
  id: number;
  name: string;
  role: string;
  email: string;
  department: string;
  attendance: 'present' | 'absent' | 'pending';
}

export interface Resolution {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: number;
  name: string;
  type: string;
  size: string;
}

export interface Meeting {
  id: number;
  title: string;
  date: Date;
  time: string;
  duration: number;
  status: string;
  description: string;
  location: string;
  participants: Participant[];
  agenda: string[];
  attachments: Attachment[];
  resolutions: Resolution[];
}