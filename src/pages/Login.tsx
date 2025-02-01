import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Lock, User } from "lucide-react";
import toast from "react-hot-toast";

interface LoginFormData {
  username: string;
  password: string;
}

const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 0;
    }
    10%, 90% {
      opacity: 1;
    }
    50% {
      transform: translate(120px, -100px) rotate(10deg);
    }
  }
  
  .animate-float {
    animation: float 25s linear infinite;
  }
`;
document.head.appendChild(style);

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    if (!data.username?.trim() || !data.password?.trim()) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    const toastId = toast.loading("در حال ورود...");
    try {
      await login(data.username.trim(), data.password.trim());
      toast.success("ورود با موفقیت انجام شد", { id: toastId });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error("نام کاربری یا رمز عبور اشتباه است", { id: toastId });
    }
  };

  const onError = (errors: any) => {
    if (errors.username || errors.password) {
      toast.error("لطفاً تمام فیلدها را پر کنید");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-4 z-10">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-8">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transform rotate-3 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-[2px] bg-white dark:bg-gray-800 rounded-[10px] flex items-center justify-center transform -rotate-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  پارسیم
                </span>
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-black text-gray-900 dark:text-white">
              ورود به سیستم
            </h2>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "نام کاربری الزامی است",
                    validate: (value) =>
                      value.trim() !== "" || "نام کاربری نمی‌تواند خالی باشد",
                  })}
                  className={`block w-full pr-10 text-right py-4 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-sm ring-1 
                    ${
                      errors.username
                        ? "ring-red-500"
                        : "ring-gray-200 dark:ring-gray-400"
                    } 
                    placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="نام کاربری"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "رمز عبور الزامی است",
                    validate: (value) =>
                      value.trim() !== "" || "رمز عبور نمی‌تواند خالی باشد",
                  })}
                  className={`block w-full pr-10 text-right py-4 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-sm ring-1 
                    ${
                      errors.password
                        ? "ring-red-500"
                        : "ring-gray-200 dark:ring-gray-400"
                    } 
                    placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all`}
                  placeholder="رمز عبور"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full flex justify-center py-4 px-4 rounded-xl text-white overflow-hidden group disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">
                {isSubmitting ? "در حال ورود..." : "ورود به سیستم"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
