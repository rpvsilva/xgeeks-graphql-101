import { Header } from './components/Header';
import { Background } from './styles/Background';
import { MessageList } from './components/MessageList';
import { SenderView } from './components/SenderView';
import { ChatRoom } from './components/ChatRoom';
import useRandUsername from './hooks/useRandUsername';
import { useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from './graphql/queries/message';
import { POST_MESSAGES } from './graphql/mutations/message';
import { SUBSCRIBE_MESSAGES } from './graphql/subscriptions/message';

export type Message = {
  id: string;
  from: string;
  text: string;
};

function App() {
  const username = useRandUsername();

  const { loading, error, data } = useQuery<{ messages: Message[] }>(GET_MESSAGES);

  const [sendMessageMutation] = useMutation(POST_MESSAGES);

  useSubscription(SUBSCRIBE_MESSAGES, {
    onSubscriptionData: ({ client: { cache }, subscriptionData }) => {
      const incomingMessage = {
        ...subscriptionData.data.onNewMessage,
        __typename: 'ChatMessage'
      };

      cache.modify({
        fields: {
          messages: (oldMessages = []) => {
            return [...oldMessages, incomingMessage];
          }
        }
      });
    },
    variables: { username },
    skip: !username
  });

  const sendMessage = (text: string) => {
    sendMessageMutation({
      variables: {
        input: {
          text,
          from: username
        }
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Background>
      <Header />
      <ChatRoom>
        <MessageList msgs={data?.messages} />
        <SenderView send={sendMessage} />
      </ChatRoom>
    </Background>
  );
}

export default App;
