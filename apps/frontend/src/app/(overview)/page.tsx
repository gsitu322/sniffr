"use client";

import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import TinderCard from "react-tinder-card";
import { useState } from "react";
import { dogsData } from "../components/data/dogs";

export default function Page() {
  const currentView = useAppSelector((state) => state.ui.currentView);
  const selectedThread = useAppSelector((state) => state.ui.selectedThread);

  const [dogs, setDogs] = useState(dogsData);

  const onSwipe = (direction: string, dogName: string) => {
    console.log("You swiped: " + direction + " on " + dogName);
    if (direction === "right") {
      // Handle match
      console.log("Match with " + dogName + "! 💕");
    }
  };

  const onCardLeftScreen = (dogName: string) => {
    console.log(dogName + " left the screen");
  };

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
              <p className="text-gray-600 mb-8">
                Swipe right to match, left to pass!
              </p>
              <div className="relative h-[600px] w-full max-w-md mx-auto">
                {dogs.map((dog) => (
                  <TinderCard
                    key={dog.id}
                    onSwipe={(dir) => onSwipe(dir, dog.name)}
                    onCardLeftScreen={() => onCardLeftScreen(dog.name)}
                    preventSwipe={["up", "down"]}
                    className="absolute w-full"
                  >
                    <div className="bg-white rounded-lg shadow-xl p-6 cursor-grab active:cursor-grabbing">
                      <img
                        src={dog.image}
                        alt={dog.name}
                        draggable={false}
                        className="w-full h-96 object-cover rounded-lg mb-4 select-none"
                      />
                      <h2 className="text-2xl font-bold">{dog.name}</h2>
                      <p className="text-gray-600">
                        {dog.breed} • {dog.age} years old
                      </p>
                      <p className="mt-2 text-gray-700">{dog.bio}</p>
                    </div>
                  </TinderCard>
                ))}
              </div>
              <div className="flex gap-4 justify-center mt-8">
                <button className="bg-red-500 text-white w-16 h-16 rounded-full text-2xl hover:bg-red-600 transition">
                  ❌
                </button>
                <button className="bg-green-500 text-white w-16 h-16 rounded-full text-2xl hover:bg-green-600 transition">
                  ❤️
                </button>
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
