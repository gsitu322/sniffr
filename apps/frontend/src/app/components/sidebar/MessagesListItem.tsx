import { useAppDispatch } from "@/store/hooks";
import { setSelectedThread } from "@/store/uiSlice";

export default function MessagesListItem({
  dogName,
  imageUrl,
  message,
}: {
  dogName: string;
  imageUrl: string;
  message: string;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSelectedThread({ dogName, imageUrl }));
  };

  return (
    <div
      onClick={handleClick}
      className="px-4 py-2 flex items-center gap-4 cursor-pointer"
    >
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
