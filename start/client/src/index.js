import {
  ApolloClient,
  ApolloProvider,
  NormalizedCache,
  gql,
  useQuery,
} from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import Login from "./pages/login";
import injectStyles from "./styles";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

export const typeDefs = gql`
  extend type Query {
    isLoggediIn: Boolean!
    cartItems: [ID!]!
  }
`;
const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
  typeDefs,
});

injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
