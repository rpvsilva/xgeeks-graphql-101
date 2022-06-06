import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Message } from '../App';
import useRandUsername from '../hooks/useRandUsername';

export const Container = styled.div`
  border: 1px solid lightgrey;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  flex: 5;
  padding: 20px;
  overflow-y: auto;
`;

export const Sender = styled.span`
  color: red;
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
`;

type Props = {
  msgs?: Message[];
};

const MessageItem = ({ msg, ownUser }: { msg: Message; ownUser: boolean }) => {
  return (
    <p>
      <Sender>
        {msg.from} {ownUser ? '(you)' : ''}:
      </Sender>
      {msg.text}
    </p>
  );
};

export const MessageList = ({ msgs = [] }: Props) => {
  const username = useRandUsername();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight
      });
    }
  }, [chatRef]);

  return (
    <Container ref={chatRef}>
      {msgs.map((msg, index) => (
        <MessageItem key={msg.id + index} msg={msg} ownUser={username === msg.from} />
      ))}
    </Container>
  );
};
