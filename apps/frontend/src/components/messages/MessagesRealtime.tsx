"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { upsertThread } from "@/store/messagesSlice";

export default function MessagesRealtime() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let socket: any;

    async function connect() {
      // To check if it's installed, look for 'socket.io-client' in your package.json dependencies.
      // If not installed, run: npm install socket.io-client (or yarn add socket.io-client)
      const { io } = await import("socket.io-client");
      const url =
        process.env.NEXT_PUBLIC_BACKEND_WS_URL || "http://localhost:3001";

      socket = io(url, { transports: ["websocket"] });

      socket.on("thread.created", (payload: any) => {
        if (payload?.threadId) {
          dispatch(upsertThread(payload));
        }
      });
    }

    connect();

    return () => socket?.disconnect();
  }, [dispatch]);

  return null;
}
