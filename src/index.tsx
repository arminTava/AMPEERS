import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: `Bearer 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`,
  },
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
