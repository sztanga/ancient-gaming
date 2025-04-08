/**
 * client.ts
 * Sets up a GraphQLClient pointing to the Platzi Fake Store API.
 */

import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://api.escuelajs.co/graphql');

export default client;