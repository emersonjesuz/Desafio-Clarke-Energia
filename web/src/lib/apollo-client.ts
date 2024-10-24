import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", //"https://desafio-clarke-energia-production.up.railway.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
