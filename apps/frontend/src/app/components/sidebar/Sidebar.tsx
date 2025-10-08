import SidebarHeader from "./SidebarHeader";
import SidebarBanner from "./SidebarBanner";
import MessagesListItem from "./MessagesListItem";

export default function Sidebar() {
  return (
    <aside className="w-full sm:w-80 sm:min-w-[400px] sm:max-w-md  dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <SidebarHeader />
      <SidebarBanner />
      <div className="pt-2 px-4">
        <h4 className="text-lg font-semibold">Messages</h4>
      </div>
      <MessagesListItem
        dogName="Skyler"
        imageUrl="https://placedog.net/200/200?id=1"
        message="Hello, how are you?"
      />
      <MessagesListItem
        dogName="Fido"
        imageUrl="https://placedog.net/200/200?id=2"
        message="Woof, woof!"
      />
      <MessagesListItem
        dogName="Buddy"
        imageUrl="https://placedog.net/200/200?id=3"
        message="Hey! Want to meet at the dog park! 🐾"
      />
      <MessagesListItem
        dogName="Max"
        imageUrl="https://placedog.net/200/200?id=4"
        message="I love playing fetch! What about you?"
      />
      <MessagesListItem
        dogName="Bella"
        imageUrl="https://placedog.net/200/200?id=5"
        message="Your profile pic is adorable! 😍"
      />
      <MessagesListItem
        dogName="Rocky"
        imageUrl="https://placedog.net/200/200?id=6"
        message="Woof woof! Down for a playdate?"
      />
      <MessagesListItem
        dogName="Luna"
        imageUrl="https://placedog.net/200/200?id=7"
        message="I love playing fetch! What about you?"
      />
      <MessagesListItem
        dogName="Charlie"
        imageUrl="https://placedog.net/200/200?id=8"
        message="I love playing fetch! What about you?"
      />
    </aside>
  );
}
