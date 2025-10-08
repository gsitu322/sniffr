"use client";

import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "@/store/hooks";

export default function page() {
  const currentView = useAppSelector((state) => state.ui.currentView);

  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        {currentView === "discover" && (
          <div>
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
                <p className="text-gray-600">Golden Retriever • 3 years old</p>
                <p className="mt-2 text-gray-700">
                  Loves playing fetch and long walks in the park!
                </p>
              </div>
            </div>
          </div>
        )}
        {currentView === "messages" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <p className="text-gray-600">
              Select a conversation from the sidebar to start chatting!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
