import React, { useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Meeting } from '../../types/meeting';

interface CreateMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Meeting>) => void;
  initialData?: Meeting;
}

interface MeetingFormData {
  title: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  description: string;
  status: string;
}

const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<MeetingFormData>();

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('date', new Date(initialData.date).toISOString().split('T')[0]);
      setValue('time', initialData.time);
      setValue('duration', initialData.duration);
      setValue('location', initialData.location);
      setValue('description', initialData.description);
      setValue('status', initialData.status);
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data: MeetingFormData) => {
    onSubmit({
      ...data,
      date: new Date(data.date),
      id: initialData?.id
    });
    reset();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-right align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white flex justify-between items-center"
                >
                  {initialData ? 'ویرایش جلسه' : 'ایجاد جلسه جدید'}
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        عنوان جلسه
                      </label>
                      <input
                        type="text"
                        className="input-primary mt-1"
                        {...register('title', { required: 'عنوان جلسه الزامی است' })}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          تاریخ
                        </label>
                        <input
                          type="date"
                          className="input-primary mt-1"
                          {...register('date', { required: 'تاریخ الزامی است' })}
                        />
                        {errors.date && (
                          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          زمان
                        </label>
                        <input
                          type="time"
                          className="input-primary mt-1"
                          {...register('time', { required: 'زمان الزامی است' })}
                        />
                        {errors.time && (
                          <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        مدت زمان (دقیقه)
                      </label>
                      <input
                        type="number"
                        className="input-primary mt-1"
                        {...register('duration', {
                          required: 'مدت زمان الزامی است',
                          min: { value: 15, message: 'حداقل مدت زمان 15 دقیقه است' }
                        })}
                      />
                      {errors.duration && (
                        <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        مکان
                      </label>
                      <input
                        type="text"
                        className="input-primary mt-1"
                        {...register('location', { required: 'مکان الزامی است' })}
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        وضعیت
                      </label>
                      <select
                        className="input-primary mt-1"
                        {...register('status', { required: 'وضعیت الزامی است' })}
                      >
                        <option value="scheduled">برنامه‌ریزی شده</option>
                        <option value="completed">برگزار شده</option>
                        <option value="cancelled">لغو شده</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        توضیحات
                      </label>
                      <textarea
                        className="input-primary mt-1"
                        rows={3}
                        {...register('description')}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={onClose}
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      {initialData ? 'ویرایش' : 'ایجاد'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateMeetingModal;