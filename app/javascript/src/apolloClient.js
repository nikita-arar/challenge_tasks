import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlEndpoint = document.querySelector("meta[name='graphql-endpoint']").getAttribute("content");

const client = new ApolloClient({
  uri: graphqlEndpoint,
  cache: new InMemoryCache(),
});

export default client;
