import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: "active" | "inactive";
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
    status: "active" | "inactive";
  };
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editUser,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<UserFormData>({
    defaultValues: editUser || {
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      status: "active",
    },
  });

  const password = watch("password");

  const onFormSubmit = (data: UserFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm \
    border border-gray-200/30 dark:border-gray-700/30 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 \
    outline-none transition-all duration-300";

  const labelClasses =
    "block text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1";

  const buttonBaseClasses =
    "px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2";

  const primaryButtonClasses = `${buttonBaseClasses} bg-gradient-to-r from-purple-500 to-blue-500 text-white \
    shadow-lg shadow-purple-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]`;

  const secondaryButtonClasses = `${buttonBaseClasses} bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 \
    border border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/50 dark:hover:bg-gray-700/50`;

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
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden rounded-2xl 
                bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 text-right align-middle shadow-xl 
                transition-all relative border border-gray-200/30 dark:border-gray-700/30"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 to-blue-500/50" />

                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text 
                  text-transparent flex justify-between items-center mb-6"
                >
                  {editUser ? "ویرایش کاربر" : "افزودن کاربر جدید"}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.button>
                </Dialog.Title>

                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    {/* نام و نام خانوادگی */}
                    <div>
                      <label className={labelClasses}>نام و نام خانوادگی</label>
                      <input
                        type="text"
                        className={inputClasses}
                        {...register("name", {
                          required: "نام و نام خانوادگی الزامی است",
                        })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* ایمیل */}
                    <div>
                      <label className={labelClasses}>ایمیل</label>
                      <input
                        type="email"
                        className={inputClasses}
                        {...register("email", {
                          required: "ایمیل الزامی است",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "آدرس ایمیل نامعتبر است",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* شماره تماس */}
                    <div>
                      <label className={labelClasses}>شماره تماس</label>
                      <input
                        type="tel"
                        className={inputClasses}
                        {...register("phone", {
                          required: "شماره تماس الزامی است",
                          pattern: {
                            value: /^[0-9]{11}$/,
                            message: "شماره تماس باید 11 رقم باشد",
                          },
                        })}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* نقش */}
                    <div>
                      <label className={labelClasses}>نقش</label>
                      <select
                        className={inputClasses}
                        {...register("role", { required: "نقش الزامی است" })}
                      >
                        <option value="">انتخاب نقش</option>
                        <option value="admin">مدیر سیستم</option>
                        <option value="manager">مدیر</option>
                        <option value="user">کاربر عادی</option>
                      </select>
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    {/* دپارتمان */}
                    <div>
                      <label className={labelClasses}>دپارتمان</label>
                      <select
                        className={inputClasses}
                        {...register("department", {
                          required: "دپارتمان الزامی است",
                        })}
                      >
                        <option value="">انتخاب دپارتمان</option>
                        <option value="مدیریت">مدیریت</option>
                        <option value="فنی">فنی</option>
                        <option value="طراحی">طراحی</option>
                        <option value="مارکتینگ">مارکتینگ</option>
                      </select>
                      {errors.department && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.department.message}
                        </p>
                      )}
                    </div>

                    {/* وضعیت */}
                    <div>
                      <label className={labelClasses}>وضعیت</label>
                      <select className={inputClasses} {...register("status")}>
                        <option value="active">فعال</option>
                        <option value="inactive">غیرفعال</option>
                      </select>
                    </div>

                    {/* رمز عبور - فقط برای کاربر جدید */}
                    {!editUser && (
                      <>
                        {/* <div>
                          <label className={labelClasses}>
                            رمز عبور
                          </label>
                          <input
                            type="password"
                            className={inputClasses}
                            {...register('password', {
                              required: 'رمز عبور الزامی است',
                              minLength: {
                                value: 8,
                                message: 'رمز عبور باید حداقل 8 کاراکتر باشد'
                              }
                            })}
                          />
                          {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                          )}
                        </div> */}

                        {/* <div>
                          <label className={labelClasses}>
                            تکرار رمز عبور
                          </label>
                          <input
                            type="password"
                            className={inputClasses}
                            {...register('confirmPassword', {
                              required: 'تکرار رمز عبور الزامی است',
                              validate: value =>
                                value === password || 'رمز عبور و تکرار آن یکسان نیستند'
                            })}
                          />
                          {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">
                              {errors.confirmPassword.message}
                            </p>
                          )}
                        </div> */}
                      </>
                    )}
                  </div>

                  <div className="mt-8 flex justify-end space-x-4 space-x-reverse">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className={secondaryButtonClasses}
                      onClick={onClose}
                    >
                      انصراف
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={primaryButtonClasses}
                    >
                      {editUser ? "ویرایش" : "افزودن"}
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

export default UserModal;
