import { Chat } from "./components/pages/chat/Chat";
import { Sidebar } from "./components/pages/sidebar/Sidebar";

function App() {
  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <header className="pt-[13px]">
        <div className="mx-auto max-w-desktop">
          <h1>Chat bots 2.0</h1>
        </div>
      </header>
      <div className="flex-1 pt-5 pb-12 overflow-hidden bg-gray-bg">
        <div className="flex mx-auto border size-full max-w-desktop border-divider">
          <Chat />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
