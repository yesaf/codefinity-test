import { Chat } from "./components/pages/chat/Chat";
import { Sidebar } from "./components/pages/sidebar/Sidebar";

function App() {
  return (
    <div className="flex flex-col h-full">
      <header className="pt-8 pb-3">
        <div className="max-w-[1280px] mx-auto">
          <h1>Chat bots 2.0</h1>
        </div>
      </header>
      <div className="flex-1 pt-5 pb-12 bg-gray-bg">
        <div className="flex size-full max-w-[1280px] mx-auto">
          <Chat />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
