import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  MicrophoneIcon,
  VideoCameraIcon,
  ComputerDesktopIcon,
  XMarkIcon,
  HandRaisedIcon,
  UserPlusIcon,
  UserGroupIcon,
  LockClosedIcon,
  ArrowsPointingOutIcon,
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
  className?: string;
}

// اطلاعات شرکت‌کنندگان مجازی
interface Participant {
  id: number;
  name: string;
  avatar: string;
  isActive: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isRaisingHand: boolean;
  isHost: boolean;
  isScreenSharing: boolean;
}

// تعریف نوع برای پیام‌های چت
interface ChatMessage {
  id: number;
  sender: string;
  senderId: number;
  text: string;
  time: string;
  isMine: boolean;
  isSystem?: boolean;
}

const MockVideoCall: React.FC<VideoCallProps> = ({ meetingId, onClose }) => {
  // وضعیت‌های اصلی کال
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [isChat, setIsChat] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [callStatus, setCallStatus] = useState<string>("idle"); // idle, calling, active, ended
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRaisingHand, setIsRaisingHand] = useState<boolean>(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState<boolean>(false);
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");

  // برای کنترل نمایش ویدیوها در موبایل
  const [activeVideoId, setActiveVideoId] = useState<number>(0); // 0 = خودم، 1 تا n+1 = سایر شرکت‌کنندگان
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // رفرنس‌های ویدیو
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const timerRef = useRef<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // شرکت‌کنندگان مجازی در تماس
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: "علی رضایی",
      avatar: "/api/placeholder/40/40",
      isActive: true,
      isMuted: false,
      isVideoOff: false,
      isRaisingHand: false,
      isHost: false,
      isScreenSharing: false,
    },
    {
      id: 2,
      name: "سارا احمدی",
      avatar: "/api/placeholder/40/40",
      isActive: true,
      isMuted: true,
      isVideoOff: false,
      isRaisingHand: false,
      isHost: false,
      isScreenSharing: false,
    },
    {
      id: 3,
      name: "محمد حسینی",
      avatar: "/api/placeholder/40/40",
      isActive: true,
      isMuted: false,
      isVideoOff: true,
      isRaisingHand: true,
      isHost: true,
      isScreenSharing: false,
    },
  ]);

  // پیام‌های چت
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "سارا احمدی",
      senderId: 2,
      text: "سلام، صدای من را می‌شنوید؟",
      time: "12:34",
      isMine: false,
    },
    {
      id: 2,
      sender: "شما",
      senderId: 0,
      text: "بله، صدای شما واضح است.",
      time: "12:35",
      isMine: true,
    },
    {
      id: 3,
      sender: "محمد حسینی",
      senderId: 3,
      text: "من هم می‌توانم صدای همه را بشنوم. آماده شروع جلسه هستیم.",
      time: "12:36",
      isMine: false,
    },
  ]);

  // بررسی آیا دستگاه موبایل است یا خیر
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // بررسی اولیه
    checkIfMobile();

    // اضافه کردن event listener برای تغییر سایز
    window.addEventListener("resize", checkIfMobile);

    // پاکسازی
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // اسکرول به پایین چت وقتی پیام جدید می‌آید
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // تابع شروع تماس
  const startCall = () => {
    setCallStatus("calling");

    // شبیه‌سازی زمان انتظار پاسخ
    setTimeout(() => {
      setCallStatus("active");
      setIsCallActive(true);

      // شروع تایمر مدت مکالمه
      timerRef.current = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000) as unknown as number;
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

  // تابع ارسال پیام چت
  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage: ChatMessage = {
        id: chatMessages.length + 1,
        sender: "شما",
        senderId: 0,
        text: messageText.trim(),
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: true,
      };

      setChatMessages([...chatMessages, newMessage]);
      setMessageText("");
    }
  };

  // تبدیل ثانیه‌ها به فرمت mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // تغییر وضعیت دست بلند کردن برای یک شرکت‌کننده
  const toggleParticipantHand = (participantId: number) => {
    setParticipants(
      participants.map((p) =>
        p.id === participantId ? { ...p, isRaisingHand: !p.isRaisingHand } : p
      )
    );
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

        // تنظیم ویدیوی مجازی برای طرف مقابل در remoteVideoRefs
        participants.forEach((p) => {
          if (remoteVideoRefs.current[p.id] && !p.isVideoOff) {
            remoteVideoRefs.current[p.id]!.poster = "/api/placeholder/400/320";
          }
        });
      } catch (error) {
        console.error("خطا در دسترسی به دوربین:", error);
      }
    };

    getMedia();

    // شروع تماس پس از آماده شدن جریان ویدیو
    startCall();

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

  // تابع تغییر ویدیوی فعال در سایز موبایل
  const changeActiveVideo = (videoId: number) => {
    setActiveVideoId(videoId);
  };

  // تابع برای بلند کردن دست (و ارسال نوتیفیکیشن به سایرین)
  const toggleRaiseHand = () => {
    setIsRaisingHand(!isRaisingHand);

    // شبیه‌سازی نمایش به سایرین
    if (!isRaisingHand) {
      // اضافه کردن یک پیام سیستمی به چت
      const systemMessage: ChatMessage = {
        id: chatMessages.length + 1,
        sender: "سیستم",
        senderId: -1,
        text: "شما دست خود را بلند کردید",
        time: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: false,
        isSystem: true,
      };

      setChatMessages([...chatMessages, systemMessage]);
    }
  };

  // کامپوننت نشانگر وضعیت تماس
  const StatusIndicator = () => (
    <div className="ml-2 flex items-center">
      {callStatus === "active" && (
        <motion.div
          className="flex items-center text-green-600 dark:text-green-500 font-medium text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full mr-1 sm:mr-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span className="hidden xs:inline">در حال گفتگو - </span>
          <span>{formatTime(elapsedTime)}</span>
        </motion.div>
      )}

      {callStatus === "calling" && (
        <motion.div
          className="flex items-center text-blue-600 dark:text-blue-500 font-medium text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full mr-1 sm:mr-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span>در حال تماس...</span>
        </motion.div>
      )}

      {callStatus === "ended" && (
        <motion.div
          className="flex items-center text-red-600 dark:text-red-500 font-medium text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>تماس پایان یافت</span>
        </motion.div>
      )}
    </div>
  );

  // کامپوننت دکمه کنترل
  const ControlButton: React.FC<ControlButtonProps> = ({
    onClick,
    disabled = false,
    isActive = false,
    activeColor = "",
    children,
    tooltip,
    className = "",
  }) => (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group p-2 sm:p-3 rounded-full transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${
        isActive
          ? `bg-gradient-to-r ${activeColor} text-white shadow-lg`
          : "bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      } ${className}`}
    >
      {children}
      {tooltip && !isMobile && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
          {tooltip}
        </div>
      )}
    </motion.button>
  );

  // کامپوننت نمایش شرکت‌کننده به صورت کارت
  const ParticipantCard = ({
    participant,
    isMainView = false,
  }: {
    participant: Participant;
    isMainView?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative rounded-xl overflow-hidden bg-gray-900 ${
        isMainView ? "aspect-video" : "aspect-video"
      } shadow-lg backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30`}
    >
      {!participant.isVideoOff ? (
        <div className="h-full w-full overflow-hidden">
          <video
            ref={(el) => {
              remoteVideoRefs.current[participant.id] = el;
            }}
            autoPlay
            playsInline
            muted={participant.isMuted}
            className="w-full h-full object-cover"
            poster="/api/placeholder/400/320"
          />
          {participant.isScreenSharing && (
            <div className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full z-10">
              <ComputerDesktopIcon className="inline h-3 w-3 mr-1" />
              اشتراک صفحه
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500/80 to-purple-500/80 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg sm:text-xl font-medium">
              {participant.name.charAt(0)}
            </span>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white text-xs sm:text-sm font-medium">
              {participant.name}
              {participant.isHost && (
                <LockClosedIcon className="inline-block h-3 w-3 ml-1 text-yellow-400" />
              )}
            </span>
          </div>
          <div className="flex space-x-1 space-x-reverse">
            {participant.isMuted && (
              <div className="bg-red-500/80 text-white p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
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
            {participant.isRaisingHand && (
              <div className="bg-yellow-500/80 text-white p-1 rounded-full">
                <HandRaisedIcon className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* قابلیت تغییر به نمای اصلی در موبایل */}
      {!isMainView && isMobile && (
        <button
          className="absolute top-2 right-2 bg-gray-800/70 text-white p-1 rounded-full"
          onClick={() => changeActiveVideo(participant.id)}
        >
          <ArrowsPointingOutIcon className="h-3 w-3" />
        </button>
      )}
    </motion.div>
  );

  // کامپوننت نمایش ویدیوی خودم
  const LocalVideoComponent = ({
    isMainView = false,
  }: {
    isMainView?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className={`relative rounded-xl overflow-hidden bg-gray-900 ${
        isMainView ? "aspect-video" : "aspect-video"
      } shadow-lg backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 `}
    >
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover ${isVideoOff ? "hidden" : ""}`}
      />

      {isVideoOff && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500/80 to-blue-500/80 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg sm:text-xl font-medium">
              شما
            </span>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white text-xs sm:text-sm font-medium">
              شما {isScreenSharing && "(اشتراک صفحه)"}
            </span>
          </div>
          <div className="flex space-x-1 space-x-reverse">
            {isMicMuted && (
              <div className="bg-red-500/80 text-white p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
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
            {isRaisingHand && (
              <div className="bg-yellow-500/80 text-white p-1 rounded-full">
                <HandRaisedIcon className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* قابلیت تغییر به نمای اصلی در موبایل */}
      {!isMainView && isMobile && (
        <button
          className="absolute top-2 right-2 bg-gray-800/70 text-white p-1 rounded-full"
          onClick={() => changeActiveVideo(0)}
        >
          <ArrowsPointingOutIcon className="h-3 w-3" />
        </button>
      )}

      {isScreenSharing && (
        <div className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full z-10">
          <ComputerDesktopIcon className="inline h-3 w-3 mr-1" />
          اشتراک صفحه
        </div>
      )}
    </motion.div>
  );

  // کامپوننت پنل شرکت‌کنندگان
  const ParticipantsPanel = () => (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="absolute inset-y-0 right-0 w-full sm:w-72 md:w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg z-20 flex flex-col border-l border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-white flex items-center">
          <UserGroupIcon className="h-5 w-5 ml-2 text-purple-500" />
          شرکت‌کنندگان ({participants.length + 1})
        </h3>
        <button
          onClick={() => setShowParticipants(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-2">
          {/* خودم */}
          <li className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium mr-2">
                ش
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  شما
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  میزبان
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              {isMicMuted && (
                <MicrophoneIcon className="h-4 w-4 text-red-500" />
              )}
              {isVideoOff && (
                <VideoCameraIcon className="h-4 w-4 text-red-500" />
              )}
              {isRaisingHand && (
                <HandRaisedIcon className="h-4 w-4 text-yellow-500" />
              )}
            </div>
          </li>
          {/* سایر شرکت‌کنندگان */}
          {participants.map((participant) => (
            <li
              key={participant.id}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium mr-2">
                  {participant.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {participant.name}
                    {participant.isHost && (
                      <LockClosedIcon className="inline-block h-3 w-3 ml-1 text-yellow-400" />
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {participant.isScreenSharing
                      ? "در حال اشتراک صفحه"
                      : "شرکت‌کننده"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                {participant.isMuted && (
                  <MicrophoneIcon className="h-4 w-4 text-red-500" />
                )}
                {participant.isVideoOff && (
                  <VideoCameraIcon className="h-4 w-4 text-red-500" />
                )}
                {participant.isRaisingHand && (
                  <HandRaisedIcon className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50">
        <button
          onClick={() => setShowParticipants(false)}
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-sm flex items-center justify-center"
        >
          <UserPlusIcon className="h-4 w-4 ml-1" /> دعوت از افراد جدید
        </button>
      </div>
    </motion.div>
  );

  // کامپوننت نمایش پنل چت
  const ChatPanel = () => (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="absolute inset-y-0 right-0 w-full sm:w-72 md:w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg z-20 flex flex-col border-l border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-white">گفتگوی جلسه</h3>
        <button
          onClick={() => setIsChat(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {chatMessages.map((message) => (
          <div 
            key={message.id} 
            className={`${
              message.isMine 
                ? "mr-auto ml-4 bg-purple-500 text-white" 
                : message.isSystem 
                  ? "mx-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                  : "ml-auto mr-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            } p-3 rounded-lg max-w-[80%] shadow-sm`}
          >
            {!message.isMine && !message.isSystem && (
              <p className="text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                {message.sender}
              </p>
            )}
            <p className="text-sm">{message.text}</p>
            <p className="text-xs mt-1 text-right opacity-70">{message.time}</p>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-r-lg px-3 py-2 outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-500 text-white rounded-l-lg px-3 py-2"
          >
            ارسال
          </button>
        </div>
      </div>
    </motion.div>
  );

  // رندر UI اصلی
  return (
    <div className="relative w-full h-full min-h-[60vh] bg-gray-900 rounded-xl overflow-hidden flex flex-col">
      {/* هدر */}
      <div className="bg-gray-800/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700/50">
        <div className="flex items-center">
          <h2 className="text-white font-medium text-lg">
            {meetingId ? `جلسه شماره ${meetingId}` : "تماس تصویری"}
          </h2>
          <StatusIndicator />
        </div>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* بخش اصلی - ویدیوها */}
      <div className="flex-1 p-4 relative">
        {isMobile ? (
          // حالت موبایل - یک ویدیو بزرگ و بقیه کوچک
          <div className="h-full flex flex-col">
            <div className="flex-1 mb-2">
              {activeVideoId === 0 ? (
                <LocalVideoComponent isMainView={true} />
              ) : (
                <ParticipantCard
                  participant={participants.find(p => p.id === activeVideoId) || participants[0]}
                  isMainView={true}
                />
              )}
            </div>
            <div className="h-20 flex gap-2 overflow-x-auto py-1">
              {activeVideoId !== 0 && (
                <div className="h-full aspect-video flex-shrink-0">
                  <LocalVideoComponent />
                </div>
              )}
              {participants.map(
                (participant) =>
                  participant.id !== activeVideoId && (
                    <div key={participant.id} className="h-full aspect-video flex-shrink-0">
                      <ParticipantCard participant={participant} />
                    </div>
                  )
              )}
            </div>
          </div>
        ) : (
          // حالت دسکتاپ - گرید
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            <LocalVideoComponent />
            {participants.map((participant) => (
              <ParticipantCard key={participant.id} participant={participant} />
            ))}
          </div>
        )}
      </div>

      {/* کنترل‌ها */}
      <div className="bg-gray-800/80 backdrop-blur-sm p-4 flex justify-center items-center space-x-2 space-x-reverse border-t border-gray-700/50">
        <ControlButton
          onClick={() => setIsMicMuted(!isMicMuted)}
          isActive={isMicMuted}
          activeColor="from-red-500 to-red-600"
          tooltip={isMicMuted ? "فعال کردن میکروفون" : "قطع میکروفون"}
        >
          <MicrophoneIcon className="h-5 w-5" />
        </ControlButton>

        <ControlButton
          onClick={() => setIsVideoOff(!isVideoOff)}
          isActive={isVideoOff}
          activeColor="from-red-500 to-red-600"
          tooltip={isVideoOff ? "روشن کردن دوربین" : "خاموش کردن دوربین"}
        >
          <VideoCameraIcon className="h-5 w-5" />
        </ControlButton>

        <ControlButton
          onClick={toggleScreenShare}
          isActive={isScreenSharing}
          activeColor="from-blue-500 to-blue-600"
          tooltip={
            isScreenSharing ? "پایان اشتراک صفحه" : "اشتراک‌گذاری صفحه"
          }
        >
          <ComputerDesktopIcon className="h-5 w-5" />
        </ControlButton>

        <ControlButton
          onClick={toggleRaiseHand}
          isActive={isRaisingHand}
          activeColor="from-yellow-500 to-yellow-600"
          tooltip={isRaisingHand ? "پایین آوردن دست" : "بلند کردن دست"}
        >
          <HandRaisedIcon className="h-5 w-5" />
        </ControlButton>

        <ControlButton
          onClick={() => setShowParticipants(!showParticipants)}
          isActive={showParticipants}
          activeColor="from-purple-500 to-purple-600"
          tooltip="شرکت‌کنندگان"
        >
          <UserGroupIcon className="h-5 w-5" />
        </ControlButton>

        <ControlButton
          onClick={() => setIsChat(!isChat)}
          isActive={isChat}
          activeColor="from-green-500 to-green-600"
          tooltip="گفتگو"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </ControlButton>

        <ControlButton
          onClick={endCall}
          isActive={true}
          activeColor="from-red-600 to-red-700"
          className="mx-2"
          tooltip="پایان تماس"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
            />
          </svg>
        </ControlButton>
      </div>

      {/* پنل‌های جانبی */}
      {showParticipants && <ParticipantsPanel />}
      {isChat && <ChatPanel />}
    </div>
  );
};

export default MockVideoCall;