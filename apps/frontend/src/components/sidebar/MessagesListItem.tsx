export default function MessagesListItem({
  dogName,
  imageUrl,
  message,
  unreadCount,
  onClick,
}: {
  dogName: string;
  imageUrl: string;
  message: string;
  unreadCount: number;
  onClick: () => void;
}) {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      key={`${dogName}`}
      onClick={handleClick}
      className="px-4 py-2 flex items-center gap-4 cursor-pointer"
    >
      <img
        src={`${imageUrl}`}
        alt="find matches dog"
        className="w-16 h-16 object-cover rounded-full border-amber-400 border-2"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{dogName}</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {unreadCount}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 truncate">{message}</p>
      </div>
    </div>
  );
}
