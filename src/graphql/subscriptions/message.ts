import { gql } from '@apollo/client';

export const SUBSCRIBE_MESSAGES = gql`
  subscription NewUpdate($username: ID!) {
    onNewMessage(username: $username) {
      id
      from
      text
    }
  }
`;
