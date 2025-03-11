import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  ComputerDesktopIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// تعریف پراپرتی‌های کامپوننت
interface VideoCallProps {
  meetingId?: number | null; // آیدی جلسه (اختیاری)
  onClose: () => void; // تابع برای بستن ویدیو کال
}

// تعریف interface برای دکمه‌های کنترل
interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  activeColor?: string;
  children: React.ReactNode;
  tooltip?: string;
}

const MockVideoCall: React.FC<VideoCallProps> = ({ meetingId, onClose }) => {
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [isChat, setIsChat] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [callStatus, setCallStatus] = useState<string>("idle"); // idle, calling, active, ended
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // تابع شروع تماس
  const startCall = () => {
    setCallStatus("calling");

    // شبیه‌سازی زمان انتظار پاسخ
    setTimeout(() => {
      setCallStatus("active");
      setIsCallActive(true);

      // شروع تایمر مدت مکالمه
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }, 2000);
  };

  // تابع پایان تماس
  const endCall = () => {
    setCallStatus("ended");
    setIsCallActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // پاک کردن تایمر بعد از مدتی
    setTimeout(() => {
      setCallStatus("idle");
      setElapsedTime(0);
    }, 2000);
  };

  // تابع به اشتراک‌گذاری صفحه
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;

          // تنظیم رویداد پایان اشتراک‌گذاری
          screenStream.getVideoTracks()[0].onended = () => {
            if (localStream && localVideoRef.current) {
              localVideoRef.current.srcObject = localStream;
              setIsScreenSharing(false);
            }
          };
        }

        setIsScreenSharing(true);
      } catch (error) {
        console.error("خطا در به اشتراک‌گذاری صفحه:", error);
      }
    } else {
      if (localStream && localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      setIsScreenSharing(false);
    }
  };

  // تبدیل ثانیه‌ها به فرمت mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // دریافت جریان ویدیوی محلی
  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // تنظیم ویدیوی مجازی برای طرف مقابل
        if (remoteVideoRef.current) {
          remoteVideoRef.current.poster = "/api/placeholder/400/320";
        }
      } catch (error) {
        console.error("خطا در دسترسی به دوربین:", error);
      }
    };

    getMedia();

    // پاکسازی
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // کنترل میکروفون
  useEffect(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isMicMuted;
      });
    }
  }, [isMicMuted, localStream]);

  // کنترل ویدیو
  useEffect(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOff;
      });
    }
  }, [isVideoOff, localStream]);

  const StatusIndicator = () => (
    <div className="ml-2 flex items-center">
      {callStatus === "active" && (
        <motion.div
          className="flex items-center text-green-600 dark:text-green-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full mr-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span>در حال گفتگو - {formatTime(elapsedTime)}</span>
        </motion.div>
      )}

      {callStatus === "calling" && (
        <motion.div
          className="flex items-center text-blue-600 dark:text-blue-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full mr-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span>در حال تماس...</span>
        </motion.div>
      )}

      {callStatus === "ended" && (
        <motion.div
          className="flex items-center text-red-600 dark:text-red-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>تماس پایان یافت</span>
        </motion.div>
      )}
    </div>
  );

  const ControlButton: React.FC<ControlButtonProps> = ({
    onClick,
    disabled = false,
    isActive = false,
    activeColor = "",
    children,
    tooltip,
  }) => (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group p-3 rounded-full transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${
        isActive
          ? `bg-gradient-to-r ${activeColor} text-white shadow-lg`
          : "bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      }`}
    >
      {children}
      {tooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {tooltip}
        </div>
      )}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {meetingId ? `جلسه تصویری شماره ${meetingId}` : "تماس تصویری سریع"}
        </h1>
        <StatusIndicator />
      </motion.div>

      {/* Videos Container */}
      <div
        className={`grid ${
          isChat ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
        } gap-4 mb-6`}
      >
        {/* Remote Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-lg ${
            isChat ? "md:col-span-2" : ""
          } backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30`}
        >
          {isCallActive ? (
            <div className="h-full">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <img
                src="/api/placeholder/640/360"
                alt="Mock remote video"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 bg-gray-800/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm font-medium">
                کاربر مقابل
              </div>

              {/* Overlay controls for remote video */}
              <div className="absolute bottom-4 right-4 flex space-x-2 space-x-reverse">
                <ControlButton
                  onClick={() => {}}
                  tooltip="درخواست اختیار صفحه"
                  disabled={!isCallActive}
                >
                  <ArrowPathIcon className="h-5 w-5" />
                </ControlButton>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
              <div className="text-center text-white">
                {callStatus === "calling" ? (
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-16 w-16 border-t-2 border-l-2 border-white rounded-full mb-4"
                    />
                    <p className="text-lg">در انتظار پاسخ...</p>
                  </div>
                ) : (
                  <div className="text-lg">
                    <PhoneIcon className="h-16 w-16 text-gray-600 dark:text-gray-400 mx-auto mb-4" />
                    {callStatus === "ended"
                      ? "تماس پایان یافت"
                      : "آماده برای تماس تصویری"}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Local Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-lg backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30"
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${
              isVideoOff ? "hidden" : ""
            }`}
          />

          {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500/80 to-blue-500/80 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white text-xl font-medium">شما</span>
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4 bg-gray-800/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm font-medium">
            شما {isScreenSharing && "(اشتراک صفحه)"}
          </div>

          {/* Video Status Indicators */}
          <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
            {isMicMuted && (
              <div className="bg-red-500/80 text-white p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              </div>
            )}
            {isVideoOff && (
              <div className="bg-red-500/80 text-white p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              </div>
            )}
          </div>
        </motion.div>

        {/* Chat Panel (Conditionally shown) */}
        {isChat && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg h-full border border-gray-200/30 dark:border-gray-700/30 flex flex-col"
          >
            <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30 rounded-t-2xl">
              <h3 className="font-medium text-gray-800 dark:text-white flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-purple-500" />
                گفتگوی متنی
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tr-sm max-w-[80%] ml-auto">
                  <p className="text-sm">سلام، صدای من را می‌شنوید؟</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-left mt-1">
                    12:34
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-lg rounded-tl-sm max-w-[80%]">
                  <p className="text-sm">بله، صدای شما واضح است.</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                    12:35
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex">
                <input
                  type="text"
                  placeholder="پیام خود را بنویسید..."
                  className="flex-1 px-3 py-2 bg-white/70 dark:bg-gray-700/70 rounded-lg border border-gray-200/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <button className="ml-2 p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Call Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 dark:border-gray-700/30">
          <div className="flex flex-wrap justify-center items-center gap-3">
            <ControlButton
              onClick={() => setIsMicMuted(!isMicMuted)}
              isActive={isMicMuted}
              activeColor="from-red-500 to-red-600"
              tooltip={isMicMuted ? "فعال کردن میکروفون" : "قطع میکروفون"}
            >
              {isMicMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                <MicrophoneIcon className="h-6 w-6" />
              )}
            </ControlButton>

            <ControlButton
              onClick={() => setIsVideoOff(!isVideoOff)}
              isActive={isVideoOff}
              activeColor="from-red-500 to-red-600"
              tooltip={isVideoOff ? "فعال کردن دوربین" : "قطع دوربین"}
            >
              {isVideoOff ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                <VideoCameraIcon className="h-6 w-6" />
              )}
            </ControlButton>

            <ControlButton
              onClick={toggleScreenShare}
              disabled={!isCallActive}
              isActive={isScreenSharing}
              activeColor="from-blue-500 to-blue-600"
              tooltip={
                isScreenSharing ? "توقف اشتراک‌گذاری" : "اشتراک‌گذاری صفحه"
              }
            >
              <ComputerDesktopIcon className="h-6 w-6" />
            </ControlButton>

            <ControlButton
              onClick={() => setIsChat(!isChat)}
              isActive={isChat}
              activeColor="from-purple-500 to-blue-500"
              tooltip={isChat ? "بستن گفتگو" : "گفتگوی متنی"}
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </ControlButton>

            {!isCallActive ? (
              <motion.button
                onClick={startCall}
                disabled={callStatus === "calling"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full 
                shadow-lg shadow-green-500/30 flex items-center gap-2 transition-all duration-300 ${
                  callStatus === "calling"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <PhoneIcon className="h-5 w-5" />
                شروع تماس تصویری
              </motion.button>
            ) : (
              <motion.button
                onClick={endCall}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full 
                shadow-lg shadow-red-500/30 flex items-center gap-2 transition-all duration-300"
              >
                <XMarkIcon className="h-5 w-5" />
                پایان تماس
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Call Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 dark:border-gray-700/30">
          <h3 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            اطلاعات تماس
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/70 dark:bg-gray-700/70 p-3 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                وضعیت تماس
              </p>
              <p className="font-medium mt-1">
                {callStatus === "idle" && "آماده"}
                {callStatus === "calling" && "در حال تماس"}
                {callStatus === "active" && "فعال"}
                {callStatus === "ended" && "پایان یافته"}
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-700/70 p-3 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                مدت مکالمه
              </p>
              <p className="font-medium mt-1">{formatTime(elapsedTime)}</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-700/70 p-3 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                وضعیت میکروفون
              </p>
              <p className="font-medium mt-1">
                {isMicMuted ? "غیرفعال" : "فعال"}
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-700/70 p-3 rounded-xl border border-gray-200/30 dark:border-gray-600/30">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                وضعیت دوربین
              </p>
              <p className="font-medium mt-1">
                {isVideoOff ? "غیرفعال" : "فعال"}
              </p>
            </div>
          </div>

          {/* دکمه بستن تماس و بازگشت به صفحه جلسات */}
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl 
              shadow-lg flex items-center gap-2 transition-all duration-300"
            >
              <XMarkIcon className="h-5 w-5" />
              بازگشت به صفحه جلسات
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MockVideoCall;
