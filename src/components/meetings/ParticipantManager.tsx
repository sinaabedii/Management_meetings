import React, { useState } from 'react';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Participant {
  id: number;
  name: string;
  role: string;
  email: string;
  department: string;
  attendance?: 'present' | 'absent' | 'pending';
  notes?: string;
}

interface ParticipantManagerProps {
  meetingId: number;
  participants: Participant[];
  onAddParticipant: (participant: Omit<Participant, 'id'>) => void;
  onUpdateParticipant: (id: number, participant: Partial<Participant>) => void;
  onDeleteParticipant: (id: number) => void;
  onUpdateAttendance: (id: number, attendance: Participant['attendance']) => void;
}

const ParticipantManager: React.FC<ParticipantManagerProps> = ({
  participants,
  onAddParticipant,
  onUpdateParticipant,
  onDeleteParticipant,
  onUpdateAttendance
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newParticipant, setNewParticipant] = useState<Omit<Participant, 'id'>>({
    name: '',
    role: '',
    email: '',
    department: '',
    attendance: 'pending'
  });

  const getAttendanceIcon = (attendance: Participant['attendance']) => {
    switch (attendance) {
      case 'present':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      onUpdateParticipant(editingId, newParticipant);
      setEditingId(null);
    } else {
      onAddParticipant(newParticipant);
    }
    setNewParticipant({
      name: '',
      role: '',
      email: '',
      department: '',
      attendance: 'pending'
    });
    setShowAddForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">مدیریت شرکت‌کنندگان</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 ml-2" />
          افزودن شرکت‌کننده
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                className="input-primary"
                value={newParticipant.name}
                onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                سمت
              </label>
              <input
                type="text"
                className="input-primary"
                value={newParticipant.role}
                onChange={(e) => setNewParticipant({ ...newParticipant, role: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ایمیل
              </label>
              <input
                type="email"
                className="input-primary"
                value={newParticipant.email}
                onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                دپارتمان
              </label>
              <input
                type="text"
                className="input-primary"
                value={newParticipant.department}
                onChange={(e) => setNewParticipant({ ...newParticipant, department: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-4 space-x-reverse">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
              }}
            >
              انصراف
            </button>
            <button type="submit" className="btn-primary">
              {editingId !== null ? 'ویرایش' : 'افزودن'}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                نام و سمت
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                دپارتمان
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                وضعیت حضور
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">عملیات</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {participant.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {participant.role}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {participant.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {participant.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <select
                      value={participant.attendance}
                      onChange={(e) => onUpdateAttendance(participant.id, e.target.value as Participant['attendance'])}
                      className="input-primary text-sm"
                    >
                      <option value="pending">نامشخص</option>
                      <option value="present">حاضر</option>
                      <option value="absent">غایب</option>
                    </select>
                    {getAttendanceIcon(participant.attendance)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingId(participant.id);
                      setNewParticipant({
                        name: participant.name,
                        role: participant.role,
                        email: participant.email,
                        department: participant.department,
                        attendance: participant.attendance
                      });
                      setShowAddForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 ml-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDeleteParticipant(participant.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipantManager;