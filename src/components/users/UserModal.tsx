import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  password?: string;
  confirmPassword?: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  editUser?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    status: 'active' | 'inactive';
  };
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editUser
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<UserFormData>({
    defaultValues: editUser || {
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      status: 'active'
    }
  });

  const password = watch('password');

  const onFormSubmit = (data: UserFormData) => {
    onSubmit(data);
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
                  {editUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit(onFormSubmit)} className="mt-4">
                  <div className="space-y-4">
                    {/* نام و نام خانوادگی */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        نام و نام خانوادگی
                      </label>
                      <input
                        type="text"
                        className="input-primary mt-1 w-full"
                        {...register('name', { required: 'نام و نام خانوادگی الزامی است' })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* ایمیل */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        ایمیل
                      </label>
                      <input
                        type="email"
                        className="input-primary mt-1 w-full"
                        {...register('email', {
                          required: 'ایمیل الزامی است',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'آدرس ایمیل نامعتبر است'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {/* شماره تماس */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        شماره تماس
                      </label>
                      <input
                        type="tel"
                        className="input-primary mt-1 w-full"
                        {...register('phone', {
                          required: 'شماره تماس الزامی است',
                          pattern: {
                            value: /^[0-9]{11}$/,
                            message: 'شماره تماس باید 11 رقم باشد'
                          }
                        })}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* نقش */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        نقش
                      </label>
                      <select
                        className="input-primary mt-1 w-full"
                        {...register('role', { required: 'نقش الزامی است' })}
                      >
                        <option value="">انتخاب نقش</option>
                        <option value="admin">مدیر سیستم</option>
                        <option value="manager">مدیر</option>
                        <option value="user">کاربر عادی</option>
                      </select>
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                      )}
                    </div>

                    {/* دپارتمان */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        دپارتمان
                      </label>
                      <select
                        className="input-primary mt-1 w-full"
                        {...register('department', { required: 'دپارتمان الزامی است' })}
                      >
                        <option value="">انتخاب دپارتمان</option>
                        <option value="مدیریت">مدیریت</option>
                        <option value="فنی">فنی</option>
                        <option value="طراحی">طراحی</option>
                        <option value="مارکتینگ">مارکتینگ</option>
                      </select>
                      {errors.department && (
                        <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
                      )}
                    </div>

                    {/* وضعیت */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        وضعیت
                      </label>
                      <select
                        className="input-primary mt-1 w-full"
                        {...register('status')}
                      >
                        <option value="active">فعال</option>
                        <option value="inactive">غیرفعال</option>
                      </select>
                    </div>

                    {/* رمز عبور - فقط برای کاربر جدید */}
                    {!editUser && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            رمز عبور
                          </label>
                          <input
                            type="password"
                            className="input-primary mt-1 w-full"
                            {...register('password', {
                              required: 'رمز عبور الزامی است',
                              minLength: {
                                value: 8,
                                message: 'رمز عبور باید حداقل 8 کاراکتر باشد'
                              }
                            })}
                          />
                          {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            تکرار رمز عبور
                          </label>
                          <input
                            type="password"
                            className="input-primary mt-1 w-full"
                            {...register('confirmPassword', {
                              required: 'تکرار رمز عبور الزامی است',
                              validate: value =>
                                value === password || 'رمز عبور و تکرار آن یکسان نیستند'
                            })}
                          />
                          {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                      </>
                    )}
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
                      {editUser ? 'ویرایش' : 'افزودن'}
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

export default UserModal;