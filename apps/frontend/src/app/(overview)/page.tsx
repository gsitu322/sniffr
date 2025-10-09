"use client";

import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "@/store/hooks";
import ChatView from "../components/messages/ChatView";
import Discover from "../components/discover/Discover";
import { motion } from "framer-motion";

export default function Page() {
  const currentView = useAppSelector((state) => state.ui.currentView);
  const selectedThread = useAppSelector((state) => state.ui.selectedThread);

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={false}
          animate={{
            opacity: currentView === "discover" ? 1 : 0,
            y: currentView === "discover" ? 0 : 20,
            display: currentView === "discover" ? "block" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <Discover />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            opacity: currentView === "messages" ? 1 : 0,
            y: currentView === "messages" ? 0 : 20,
            display: currentView === "messages" ? "block" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          {selectedThread && (
            <ChatView
              dogName={selectedThread.dogName}
              imageUrl={selectedThread.imageUrl}
              message={selectedThread.message}
            />
          )}
        </motion.div>
      </div>
    </main>
  );
}
