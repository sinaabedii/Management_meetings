import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { Camera, Lock, User } from 'lucide-react';

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data.username, data.password);
      navigate('/');
    } catch (err) {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 relative">
            <div className="absolute inset-0 bg-blue-500 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-purple-500 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12" />
            <div className="relative bg-white dark:bg-gray-800 rounded-xl p-1.5">
              <img src="./public/assets/logo.png" alt="logo" className='' />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            ورود به سیستم
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                id="username"
                type="text"
                {...register('username', { required: 'نام کاربری الزامی است' })}
                className="block w-full pr-10 text-right border-0 py-3 rounded-xl dark:bg-gray-700 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="نام کاربری"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
              )}
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'رمز عبور الزامی است' })}
                className="block w-full pr-10 text-right border-0 py-3 rounded-xl dark:bg-gray-700 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="رمز عبور"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4 border border-red-200 dark:border-red-800">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="mr-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full flex justify-center py-3 px-4 rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 overflow-hidden group disabled:opacity-70"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
            <span className="relative">
              {isSubmitting ? 'در حال ورود...' : 'ورود به سیستم'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;