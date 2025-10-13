"use client";

import { useRouter } from "next/navigation";

export default function SidebarBanner() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/discover");
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 flex items-center cursor-pointer gap-4 bg-gray-100"
    >
      <img
        src="/golden-retriever.jpg"
        alt="find matches dog"
        className="w-16 h-16 object-cover rounded-full border-amber-400 border-2"
      />
      <div>
        <h3 className="text-lg font-semibold">Find Your Pawfect Match!</h3>
        <p className="text-sm text-gray-500">
          Start swipping to find your doggo!
        </p>
      </div>
    </div>
  );
}
