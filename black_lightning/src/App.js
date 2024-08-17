import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Edit, Delete } from "@mui/icons-material";
const App = () => {
  const [name, setName] = useState("");
  const [supplierid, setSupplierid] = useState(null);
  const [editSupplier, seteditSupplier] = useState(false);
  const { loading, error, data } = useQuery(GET_Suppliers);
  const { loading: userloding, error: usererror, data: userdata } = useQuery(
    GET_USER_DATA
  );
  const [createsupplier] = useMutation(Add_Supplier, {
    onCompleted(data) {
      setName("");
    },
    refetchQueries: [
      {
        query: GET_Suppliers,
      },
    ],
  });
  const [updateSupplier] = useMutation(EDIT_supplier, {
    onCompleted(data) {
      setName("");
      seteditSupplier(false);
    },
    refetchQueries: [
      {
        query: GET_Suppliers,
      },
    ],
  });
  const [delateSupplier] = useMutation(DELETE_supplier, {
    onCompleted(data) {
    },
    refetchQueries: [
      {
        query: GET_Suppliers,
      },
    ],
  });
  const addNewSupplier = () => {
    createsupplier({ variables: { name: name } });
  };
  const editButtonHandeler = (id, name) => {
    setName(name);
    seteditSupplier(true);
    setSupplierid(parseInt(id));
  };
  const editASupplier = () => {
    updateSupplier({ variables: { id: supplierid, name: name } });
  };
  const delateSingleSupplier = (id) => {
    delateSupplier({ variables: { id: id } });
  };
  const logoutNow = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };
  if (loading) return <h1>Loding...</h1>;
  if (error) return <h1>Error...</h1>;
  return (
    <Container>
      <Typography align="center" variant="h3">
        Welcome to supplier App "{userdata?.user?.username}"
        <Button style={marginLeft="80px"} color="secondary" variant="contained" onClick={logoutNow}>
          Logout
        </Button>
      </Typography>
      <Box
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          marginTop: "15px",
        }}
      >
        <TextField
          fullWidth
          value={name}
          id="outlined-basic"
          label={editSupplier ? "Edit supplier" : "Add supplier.."}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
        {editSupplier ? (
          <Button
            onClick={editASupplier}
            disabled={!name}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={addNewSupplier}
            disabled={!name}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        )}
      </Box>
      <Box
        component="div"
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <List>
          {data?.suppliers?.map((item, i) => (
            <ListItem button key={i}>
              <ListItemIcon>
                <Avatar
                  style={{
                    backgroundColor: "blue",
                  }}
                >
                  {i + 1}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={item?.name} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => editButtonHandeler(item?.id, item?.name)}
                >
                  <Edit color="primary" />
                </IconButton>
                <IconButton
                  onClick={() => delateSingleSupplier(parseInt(item?.id))}
                >
                  <Delete color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

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
export default App;