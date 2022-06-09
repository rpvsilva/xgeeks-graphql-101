import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { createClient } from 'graphql-ws';

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'https://xgeeks-go-chat.herokuapp.com/gql'
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://xgeeks-go-chat.herokuapp.com/gql'
  })
);

const configLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  link: configLink,
  cache: new InMemoryCache()
});
