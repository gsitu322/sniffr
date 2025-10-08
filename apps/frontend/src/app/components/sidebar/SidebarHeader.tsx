export default function SidebarHeader() {
  return (
    <div className="p-4 flex gap-2 items-center bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
      <img
        src="/golden-retriever.jpg"
        alt="find matches dog"
        className="w-10 h- object-cover rounded-full border-amber-400 border-2"
      />
      <h2 className="font-semibold">My Profile</h2>
    </div>
  );
}
