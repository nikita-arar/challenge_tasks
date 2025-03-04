import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./src/TaskManager";
import {ApolloProvider} from "@apollo/client";
import client from './src/apolloClient'

document.addEventListener("DOMContentLoaded", () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
});
