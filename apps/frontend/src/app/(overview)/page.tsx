export default function page() {
  return (
    <main className="flex h-screen">
      <aside className="w-full sm:w-80 sm:min-w-[400px] sm:max-w-md  dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
        <div className="p-4 flex bg-amber-800">
          <h2 className="text-lg font-semibold">My Profile</h2>
        </div>
        <div className="p-4 flex items-center gap-4 bg-gray-100">
          <img
            src="/golden-retriever.jpg"
            alt="find matches dog"
            className="w-16 h-16 object-cover rounded-full border-amber-400 border-2"
          />
          <div>
            <h3 className="text-lg font-semibold">Find Your Match!</h3>
            <p className="text-sm text-gray-500">
              Start swipping to find your doggo!
            </p>
          </div>
        </div>
        <div>
          <p>Messages</p>
        </div>
        {/* Sidebar content goes here */}
      </aside>
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        {/* Main content goes here */}
      </div>
    </main>
  );
}
