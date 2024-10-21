import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: " http://localhost:3000/graphql", // Substitua pela URL da sua API GraphQL
  cache: new InMemoryCache(),
});

export default client;
