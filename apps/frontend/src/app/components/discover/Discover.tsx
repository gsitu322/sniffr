"use client";

import { motion } from "framer-motion";
import TinderCard from "react-tinder-card";
import { useState, useCallback, useEffect } from "react";

export default function Discover() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchDogs = useCallback(async () => {
    // End early if we're already loading
    if (isLoading) return;

    setIsLoading(true);

    try {
      console.log("Fetching dogs");
      const data = await fetch(`/api/dogs?limit=6&offset=${offset}`);
      const newDogs = await data.json();

      setDogs((prevDogs) => [...prevDogs, ...newDogs]);
      setOffset((prev) => prev + 6);
    } catch (error) {
      console.error("Error fetching dogs: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, offset]);

  // Initial Fetch
  useEffect(() => {
    console.log("Initial Fetch");
    fetchDogs();
  }, []);

  // Fetch more when running low (but not on initial load)
  useEffect(() => {
    // Don't fetch if we have 0 dogs (initial state) or if already loading
    if (dogs.length > 0 && dogs.length < 3 && !isLoading) {
      console.log("dogs.length: ", dogs.length);
      console.log("fetching more dogs cause were low");
      fetchDogs();
    }
  }, [dogs.length, isLoading, fetchDogs]);

  const onSwipe = (direction: string, dogName: string) => {
    console.log("You swiped: " + direction + " on " + dogName);

    // Remove the swiped dog from the array
    setDogs((prevDogs) => prevDogs.slice(0, -1));

    if (direction === "right") {
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
        {dogs.map(
          (dog: {
            id: string;
            name: string;
            image: string;
            breed: string;
            age: number;
            bio: string;
          }) => (
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
          )
        )}
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
