import React, { useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Meeting } from '../../types/meeting';
import { motion } from 'framer-motion';

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

  const inputClassName = `w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 
    border-2 border-transparent focus:border-purple-500 dark:focus:border-purple-400 
    focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 
    outline-none transition-all duration-300 text-right
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    hover:bg-white dark:hover:bg-gray-700
    disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl 
                bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-6 text-right align-middle 
                shadow-2xl transition-all border border-gray-200/20 dark:border-gray-700/20">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                  bg-clip-text text-transparent flex justify-between items-center mb-6"
                >
                  {initialData ? 'ویرایش جلسه' : 'ایجاد جلسه جدید'}
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    type="button"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.button>
                </Dialog.Title>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        عنوان جلسه
                      </label>
                      <input
                        type="text"
                        className={inputClassName}
                        placeholder="عنوان جلسه را وارد کنید"
                        {...register('title', { required: 'عنوان جلسه الزامی است' })}
                      />
                      {errors.title && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 dark:text-red-400"
                        >
                          {errors.title.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          تاریخ
                        </label>
                        <input
                          type="date"
                          className={inputClassName}
                          {...register('date', { required: 'تاریخ الزامی است' })}
                        />
                        {errors.date && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-500 dark:text-red-400"
                          >
                            {errors.date.message}
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          زمان
                        </label>
                        <input
                          type="time"
                          className={inputClassName}
                          {...register('time', { required: 'زمان الزامی است' })}
                        />
                        {errors.time && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-500 dark:text-red-400"
                          >
                            {errors.time.message}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        مدت زمان (دقیقه)
                      </label>
                      <input
                        type="number"
                        className={inputClassName}
                        placeholder="مثال: 60"
                        {...register('duration', {
                          required: 'مدت زمان الزامی است',
                          min: { value: 15, message: 'حداقل مدت زمان 15 دقیقه است' }
                        })}
                      />
                      {errors.duration && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 dark:text-red-400"
                        >
                          {errors.duration.message}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        مکان
                      </label>
                      <input
                        type="text"
                        className={inputClassName}
                        placeholder="مکان جلسه را وارد کنید"
                        {...register('location', { required: 'مکان الزامی است' })}
                      />
                      {errors.location && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 dark:text-red-400"
                        >
                          {errors.location.message}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        وضعیت
                      </label>
                      <select
                        className={inputClassName}
                        {...register('status', { required: 'وضعیت الزامی است' })}
                      >
                        <option value="scheduled">برنامه‌ریزی شده</option>
                        <option value="completed">برگزار شده</option>
                        <option value="cancelled">لغو شده</option>
                      </select>
                      {errors.status && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-red-500 dark:text-red-400"
                        >
                          {errors.status.message}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        توضیحات
                      </label>
                      <textarea
                        className={`${inputClassName} resize-none`}
                        rows={3}
                        placeholder="توضیحات جلسه را وارد کنید"
                        {...register('description')}
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 
                      dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                      onClick={onClose}
                    >
                      انصراف
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 
                      text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300
                      focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                    >
                      {initialData ? 'ویرایش' : 'ایجاد'}
                    </motion.button>
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