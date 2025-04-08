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