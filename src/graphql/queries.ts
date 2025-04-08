/**
 * queries.ts
 * Stores our GraphQL query for fetching products.
 */

import { gql } from 'graphql-request';

export const GET_PRODUCTS = gql`
  {
    products {
      id
      title
      price
      images
      category {
        name
      }
    }
  }
`;
