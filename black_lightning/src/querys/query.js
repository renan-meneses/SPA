import gql from "graphql-tag";

const LOGIN_MUTATION = gql`
  mutation LoginNow($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const REGISTER_NEW_USER = gql`
  mutation RegisterNow($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      user {
        id
        username
      }
    }
  }
`;

const GET_USER_DATA = gql`
  {
    user {
      id
      username
    }
  }
`;

const GET_Suppliers = gql`
  {
    supplier {
      id
      name
      averageCustomerRating
    }
  }
`;

const Add_Supplier = gql`
  mutation CreateSupplier($name: String!) {
    CreateSupplier(name: $name) {
      supplier {
        id
        name
        date
      }
    }
  }
`;

const EDIT_supplier = gql`
  mutation updateSupplier($id: UUID!, $name: String!) {
    updateSupplier(id: $id, name: $name) {
      supplier {
        id
        name
        date
      }
    }
  }
`;

const DELETE_supplier = gql`
  mutation delateSupplier($id: Int!) {
    delateSupplier(id: $id) {
      message
    }
  }
`;