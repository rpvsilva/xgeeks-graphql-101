import { Header } from './components/Header';
import { Background } from './styles/Background';
import { MessageList } from './components/MessageList';
import { SenderView } from './components/SenderView';
import { ChatRoom } from './components/ChatRoom';

export type Message = {
  id: string;
  from: string;
  text: string;
};

function App() {
  return (
    <Background>
      <Header />
      <ChatRoom>
        <MessageList msgs={[]} />
        <SenderView send={() => ''} />
      </ChatRoom>
    </Background>
  );
}

export default App;
