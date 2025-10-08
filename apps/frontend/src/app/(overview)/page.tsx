"use client";

import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "@/store/hooks";
import { AnimatePresence } from "framer-motion";
import ChatView from "../components/messages/ChatView";
import Discover from "../components/discover/Discover";

export default function Page() {
  const currentView = useAppSelector((state) => state.ui.currentView);
  const selectedThread = useAppSelector((state) => state.ui.selectedThread);

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {currentView === "discover" && <Discover />}
          {currentView === "messages" && selectedThread && (
            <ChatView
              dogName={selectedThread.dogName}
              imageUrl={selectedThread.imageUrl}
              message={selectedThread.message}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
