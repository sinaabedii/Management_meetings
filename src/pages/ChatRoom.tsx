// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   PaperAirplaneIcon,
//   PaperClipIcon,
//   FaceSmileIcon,
//   MicrophoneIcon,
//   StopIcon,
//   PlayIcon,
//   PauseIcon,
//   XMarkIcon,
//   ChevronDoubleRightIcon,
//   ChevronDoubleLeftIcon
// } from '@heroicons/react/24/outline';

// interface Message {
//   id: string;
//   content: string;
//   type: 'text' | 'voice';
//   sender: {
//     id: string;
//     name: string;
//     avatar: string;
//   };
//   timestamp: Date;
//   audioUrl?: string;
//   audioDuration?: number;
// }

// const ChatRoom = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [isPlaying, setIsPlaying] = useState<string | null>(null);
//   const audioChunks = useRef<Blob[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const audioRef = useRef<HTMLAudioElement>(null);

//   // Handle Voice Recording
//   useEffect(() => {
//     if (isRecording) {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//           const recorder = new MediaRecorder(stream);
//           setMediaRecorder(recorder);

//           recorder.ondataavailable = (e) => {
//             audioChunks.current.push(e.data);
//           };

//           recorder.onstop = () => {
//             const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
//             const audioUrl = URL.createObjectURL(audioBlob);
            
//             // Add voice message
//             const newVoiceMessage: Message = {
//               id: Date.now().toString(),
//               type: 'voice',
//               content: '',
//               audioUrl,
//               audioDuration: 0, // You can calculate actual duration
//               sender: {
//                 id: 'currentUser',
//                 name: 'من',
//                 avatar: '/current-user-avatar.jpg'
//               },
//               timestamp: new Date()
//             };
//             setMessages(prev => [...prev, newVoiceMessage]);
//             audioChunks.current = [];
//           };

//           recorder.start();
//         });
//     } else if (mediaRecorder) {
//       mediaRecorder.stop();
//       setMediaRecorder(null);
//     }
//   }, [isRecording]);

//   // Scroll to bottom on new message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return;
    
//     const newTextMessage: Message = {
//       id: Date.now().toString(),
//       type: 'text',
//       content: newMessage,
//       sender: {
//         id: 'currentUser',
//         name: 'من',
//         avatar: '/current-user-avatar.jpg'
//       },
//       timestamp: new Date()
//     };
    
//     setMessages(prev => [...prev, newTextMessage]);
//     setNewMessage('');
//   };

//   const toggleAudioPlayback = (messageId: string, audioUrl: string) => {
//     if (isPlaying === messageId) {
//       audioRef.current?.pause();
//       setIsPlaying(null);
//     } else {
//       if (audioRef.current) {
//         audioRef.current.src = audioUrl;
//         audioRef.current.play();
//         setIsPlaying(messageId);
//       }
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 
//       dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Collapsible Sidebar */}
//       <motion.div
//         initial={false}
//         animate={{ width: showSidebar ? 320 : 0 }}
//         className={`border-l border-purple-100/20 dark:border-purple-900/20 
//           bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl overflow-hidden
//           transition-all duration-300 ease-in-out
//           ${showSidebar ? 'block' : 'hidden'} md:block`}
//       >
//         <div className="h-full flex flex-col">
//           <div className="p-4 border-b border-purple-100/20 dark:border-purple-900/20">
//             <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 
//               bg-clip-text text-transparent">گفتگوها</h2>
//           </div>
          
//           {/* Chat List */}
//           <div className="flex-1 overflow-y-auto">
//             {/* Add your chat list here */}
//           </div>
//         </div>
//       </motion.div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col relative">
//         {/* Toggle Sidebar Button */}
//         <button
//           onClick={() => setShowSidebar(!showSidebar)}
//           className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-white/80 
//             dark:bg-gray-800/80 shadow-lg z-10"
//         >
//           {showSidebar ? (
//             <ChevronDoubleLeftIcon className="w-5 h-5" />
//           ) : (
//             <ChevronDoubleRightIcon className="w-5 h-5" />
//           )}
//         </button>

//         {/* Messages Area */}
//         <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
//           <AnimatePresence>
//             {messages.map((message, index) => (
//               <motion.div
//                 key={message.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`flex items-end gap-2 ${
//                   message.sender.id === 'currentUser' ? 'flex-row-reverse' : 'flex-row'
//                 }`}
//               >
//                 <img
//                   src={message.sender.avatar}
//                   alt={message.sender.name}
//                   className="w-8 h-8 rounded-full"
//                 />
                
//                 <div className={`flex flex-col ${
//                   message.sender.id === 'currentUser' ? 'items-end' : 'items-start'
//                 }`}>
//                   <span className="text-xs text-gray-500 mb-1">{message.sender.name}</span>
                  
//                   <div className={`max-w-[80%] rounded-2xl p-3 shadow-md ${
//                     message.sender.id === 'currentUser'
//                       ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
//                       : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white'
//                   }`}>
//                     {message.type === 'text' ? (
//                       <p>{message.content}</p>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => message.audioUrl && 
//                             toggleAudioPlayback(message.id, message.audioUrl)}
//                           className="p-2 rounded-full bg-white/20"
//                         >
//                           {isPlaying === message.id ? (
//                             <PauseIcon className="w-5 h-5" />
//                           ) : (
//                             <PlayIcon className="w-5 h-5" />
//                           )}
//                         </button>
//                         <div className="h-1 bg-white/20 rounded-full flex-1">
//                           {/* Add waveform visualization here */}
//                         </div>
//                       </div>
//                     )}
                    
//                     <span className="text-xs opacity-70 mt-1 inline-block">
//                       {new Date(message.timestamp).toLocaleTimeString('fa-IR', {
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl 
//           border-t border-purple-100/20 dark:border-purple-900/20">
//           <div className="flex items-center gap-2">
//             <button className="p-2 text-gray-500 hover:text-purple-600 
//               dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
//               <FaceSmileIcon className="w-6 h-6" />
//             </button>
//             <button className="p-2 text-gray-500 hover:text-purple-600 
//               dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
//               <PaperClipIcon className="w-6 h-6" />
//             </button>
            
//             <div className="flex-1">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="پیام خود را بنویسید..."
//                 className="w-full px-4 py-2 bg-gray-100/50 dark:bg-gray-700/50 
//                   rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 
//                   dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
//               />
//             </div>

//             {newMessage.trim() ? (
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={handleSendMessage}
//                 className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 
//                   rounded-xl text-white shadow-lg shadow-purple-500/20 
//                   hover:shadow-purple-500/30 transition-all duration-300"
//               >
//                 <PaperAirplaneIcon className="w-5 h-5" />
//               </motion.button>
//             ) : (
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setIsRecording(!isRecording)}
//                 className={`p-2 rounded-xl transition-all duration-300 ${
//                   isRecording
//                     ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
//                     : 'text-gray-500 hover:text-purple-600 dark:text-gray-400'
//                 }`}
//               >
//                 {isRecording ? (
//                   <StopIcon className="w-5 h-5" />
//                 ) : (
//                   <MicrophoneIcon className="w-5 h-5" />
//                 )}
//               </motion.button>
//             )}
//           </div>
//         </div>

//         {/* Hidden Audio Element */}
//         <audio ref={audioRef} onEnded={() => setIsPlaying(null)} />
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;