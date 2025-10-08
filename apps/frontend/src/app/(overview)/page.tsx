"use client";

import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const currentView = useAppSelector((state) => state.ui.currentView);
  const selectedThread = useAppSelector((state) => state.ui.selectedThread);

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {currentView === "discover" && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold mb-4">Discover Dogs</h1>
              <p className="text-gray-600">
                Swipe through adorable dogs looking for their perfect match!
              </p>
              <div className="mt-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                  <img
                    src="https://placedog.net/400/400?random"
                    alt="Dog to match"
                    className="w-full h-96 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-bold">Max</h2>
                  <p className="text-gray-600">
                    Golden Retriever • 3 years old
                  </p>
                  <p className="mt-2 text-gray-700">
                    Loves playing fetch and long walks in the park!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          {currentView === "messages" && selectedThread && (
            <motion.div
              key={`messages-${selectedThread.dogName}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                <img
                  src={selectedThread.imageUrl}
                  alt={selectedThread.dogName}
                  className="w-16 h-16 object-cover rounded-full border-amber-400 border-2"
                />
                <h1 className="text-2xl font-bold">
                  Chat with {selectedThread.dogName}
                </h1>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg max-w-md">
                  <p>{selectedThread.message}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
