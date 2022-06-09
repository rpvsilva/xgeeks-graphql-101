import { gql } from '@apollo/client';

export const POST_MESSAGES = gql`
  mutation SendMessage($input: NewMessage!) {
    sendMessage(input: $input)
  }
`;
