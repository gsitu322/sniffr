"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { upsertThread } from "@/store/messagesSlice";

export default function MessagesRealtime() {
  const dispatch = useAppDispatch();


  const playMatchSound = () => {
    const audio = new Audio("/sounds/notification.mp3");
    audio.play().catch((error) => {
      console.error("Error playing match sound: ", error);
    });
  };

  useEffect(() => {
    let socket: any;

    async function connect() {
      const { io } = await import("socket.io-client");
      const url =
        process.env.NEXT_PUBLIC_BACKEND_WS_URL || "http://localhost:3001";

      socket = io(url, { transports: ["websocket"] });

      socket.on("thread.created", (payload: any) => {
        if (payload?.threadId) {
          dispatch(upsertThread(payload));
          playMatchSound();
        }
      });
    }

    connect();

    return () => socket?.disconnect();
  }, [dispatch]);

  return null;
}
