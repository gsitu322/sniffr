export default function MessagesListItem({
  dogName,
  imageUrl,
  message,
}: {
  dogName: string;
  imageUrl: string;
  message: string;
}) {
  return (
    <div className="px-4 py-2 flex items-center gap-4">
      <img
        src={`${imageUrl}`}
        alt="find matches dog"
        className="w-16 h-16 object-cover rounded-full border-amber-400 border-2"
      />
      <div>
        <h3 className="text-lg font-semibold">{dogName}</h3>
        <p className="text-sm text-gray-400">{message}</p>
      </div>
    </div>
  );
}
