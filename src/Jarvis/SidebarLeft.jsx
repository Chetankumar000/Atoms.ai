import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useUserInfo } from "./customHooks/useUserInfo";

const SidebarLeft = ({
  sidebarOpen,
  toggleSidebar,
  chatHistory,
  sessionId,
  setSessionId,
  setMessages,
  startNewChat,
}) => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const { userName, email } = useUserInfo();
  const isOverlayMode = windowWidth < 1250;

  const sidebarVariants = {
    open: {
      left: "0%",
      width: isOverlayMode ? "80vw" : "400px",
      transition: { delay: 0.2, duration: 0.2, ease: "easeOut" },
    },
    closed: {
      left: "0%",
      width: "60px",
      transition: { delay: 0.2, duration: 0.2, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.02, duration: 0.2, ease: "easeOut" },
    }),
  };

  return (
    <>
      {/* Overlay when sidebar is open and in overlay mode */}
      <AnimatePresence>
        {sidebarOpen && isOverlayMode && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-30"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={sidebarOpen ? "open" : "closed"}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`
          bg-[#171717] py-2 flex flex-col border-r border-[#00FFFF] shadow-lg
          ${isOverlayMode && sidebarOpen ? "fixed h-screen z-40" : "relative"}
          sm:max-w-[100vw] md:max-w-[70vw] lg:max-w-[350px] 2xl:max-w-[400px] min-w-[60px]
        `}
      >
        {/* Toggle Button */}
        <motion.div
          whileHover={
            {
              // backgroundColor: "#374151",
              // borderRadius: "9999px",
              // scale: 1.05,
            }
          }
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer w-full flex justify-end items-center text-xl transition-all"
          onClick={toggleSidebar}
          title="Toggle Sidebar"
          aria-expanded={sidebarOpen}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={sidebarOpen ? "open" : "closed"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              layout
              className="w-8 h-8 mr-2 mt-2"
            >
              {sidebarOpen ? <FaAngleLeft /> : <FaAngleRight />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {sidebarOpen ? (
            <motion.div
              key="fullSidebar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-screen"
            >
              <div className="px-6 flex flex-col space-y-2 sm:space-y-4 md:space-y-6">
                <div className="pt-4 text-center">
                  <motion.h2
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    className="text-2xl sm:text-3xl font-bold text-[#00FFFF]"
                  >
                    IndianAtoms.AI
                  </motion.h2>
                  {/* <p className="text-[0.5rem]">POWERED BY CHETANKUMAR</p> */}
                </div>

                <motion.button
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={contentVariants}
                  whileHover={{ scale: 1.03, backgroundColor: "#2563eb" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startNewChat}
                  className="w-full bg-blue-700 rounded-full text-white p-1.5 text-sm sm:text-base"
                >
                  + New Chat
                </motion.button>
              </div>

              <motion.ul
                className="mt-4 overflow-y-auto px-4 scrollbar scrollbar-thumb-[#2F2F2F] scrollbar-track-transparent whitespace-nowrap flex-grow max-h-[calc(100vh-220px)] custom-scroll"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.5 },
                  },
                }}
              >
                {chatHistory.map((session) => {
                  const chatTitle =
                    session.messages.length > 0
                      ? session.messages[0].text.slice(0, 30) + "..."
                      : "New Chat";
                  const relativeTime = formatDistanceToNow(
                    new Date(parseInt(session.id)),
                    { addSuffix: true }
                  );
                  const isActive = sessionId === session.id;

                  return (
                    <motion.li
                      key={session.id}
                      onClick={() => {
                        setSessionId(session.id);
                        setMessages(session.messages);
                      }}
                      className={`cursor-pointer hover:bg-[#2e2e2e] p-2 px-4 mb-2 rounded-lg flex flex-col transition-all duration-200 ${
                        isActive
                          ? "border border-l-4 border-cyan-400 bg-[#2F2F2F]"
                          : ""
                      }`}
                    >
                      <span className="text-white text-sm sm:text-md md:text-lg font-semibold truncate">
                        {chatTitle}
                      </span>
                      <span className="text-xs text-gray-400">
                        {relativeTime}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div
                custom={8}
                initial="hidden"
                animate="visible"
                variants={contentVariants}
                className="pt-2 border-t px-2 border-black shadow-md flex items-center gap-2 sm:gap-4 text-white mt-auto"
              >
                <motion.div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center bg-[#00FFFF] rounded-full text-lg sm:text-xl font-bold">
                  {userName?.slice(0, 1).toLowerCase() || "u"}
                </motion.div>
                <div>
                  <p className="text-sm sm:text-md md:text-lg font-semibold">
                    {userName || "username"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">
                    {email || "email"}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="miniSidebar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-screen gap-4 justify-center items-center"
            >
              <motion.div className="text-[#00FFFF] text-2xl py-3 sm:text-3xl text-center w-10 h-10 sm:w-12 sm:h-12 font-bold">
                IA
              </motion.div>
              <motion.button
                onClick={startNewChat}
                className="bg-blue-700 text-xl sm:text-2xl w-10 h-10 font-bold rounded-full text-white"
              >
                +
              </motion.button>
              <motion.div className="p-2 rounded-lg shadow-md flex items-center gap-2 text-white mt-auto">
                <div className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-[#00FFFF] rounded-full text-sm sm:text-xl font-bold">
                  {userName?.slice(0, 1).toLowerCase() || "u"}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default SidebarLeft;
