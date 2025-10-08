"use client";

import { motion, AnimatePresence } from "framer-motion";
import TinderCard from "react-tinder-card";
import { dogsData } from "../data/dogs";
import { useState } from "react";

export default function Discover() {
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
    <motion.div
      key="discover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-4">Discover Dogs</h1>
      <p className="text-gray-600 mb-8">Swipe right to match, left to pass!</p>
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
  );
}
