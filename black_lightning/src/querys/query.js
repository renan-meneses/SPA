
import { gql } from '@apollo/client';

export const GET_SUPPLIERS = gql`
  query GetSuppliers {
    supplier {
      id
      name
      logo
      minimumKwhLimit
      numberCustomers
    }
  }
`;

export const GET_USER_DATA = gql`
  query GetUserData {
    user {
      id
      username
    }
  }
`;
