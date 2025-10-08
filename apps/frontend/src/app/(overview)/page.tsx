import Sidebar from "../components/sidebar/Sidebar";

export default function page() {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        {/* Main content goes here */}
      </div>
    </main>
  );
}
