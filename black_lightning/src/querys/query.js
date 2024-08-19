
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

export const LOGIN_MUTATION = gql`
  mutation LoginNow($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
export const REGISTER_NEW_USER = gql`
  mutation RegisterNow($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        id
        username
      }
    }
  }
`;
export const HIRE_SUPPLIER = gql`
mutation HireSupplier($supplierId: ID!, $monthlyConsumption: Float!) {
  hireSupplier(supplier: $supplierId, monthlyConsumption: $monthlyConsumption) {
    success
    message
  }
}
`;