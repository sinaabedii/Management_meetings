import React from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';

interface Participant {
  id: number;
  name: string;
  role: string;
  email: string;
  department: string;
  attendance: 'present' | 'absent' | 'pending';
}

interface ParticipantsListProps {
  participants: Participant[];
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({ participants }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
        <UsersIcon className="h-5 w-5 ml-2" />
        شرکت‌کنندگان
      </h3>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {participants.map((participant) => (
            <div 
              key={participant.id}
              className="flex items-start space-x-4 space-x-reverse"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {participant.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {participant.role}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {participant.department}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span 
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${participant.attendance === 'present' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    participant.attendance === 'absent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}
                >
                  {participant.attendance === 'present' ? 'حاضر' :
                   participant.attendance === 'absent' ? 'غایب' : 'نامشخص'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsList;