"use client";

import MessagesRealtime from "@/components/messages/MessagesRealtime";
import Sidebar from "@/components/sidebar/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen">
      <MessagesRealtime />

      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </main>
  );
}
