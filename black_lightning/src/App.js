import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Grid, CircularProgress, TextField, Box, Typography, Button } from '@mui/material';
import { GET_SUPPLIERS, GET_USER_DATA, HIRE_SUPPLIER } from './querys/query';
import CardComponent from './components/CardComponent';

function App() {
  const { data, loading, error } = useQuery(GET_SUPPLIERS);
  const [minKWh, setMinKWh] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_DATA);
  
  const [hireSupplier] = useMutation(HIRE_SUPPLIER);

  useEffect(() => {
    if (data) {
      const minKWhValue = parseFloat(minKWh) || 0;
      const filtered = data.supplier.filter(supplier => supplier.minimumKwhLimit >= minKWhValue);
      setFilteredSuppliers(filtered);
    }
  }, [minKWh, data]);

  const handleHireClick = async (supplierId) => {
    try {
      const minKWhValue = parseFloat(minKWh) || 0;
      const response = await hireSupplier({
        variables: {
          supplierId: supplierId,
          monthlyConsumption: minKWhValue,
        },
      });

      const { success, message } = response.data.hireSupplier;
      if (success) {
        console.log(`Fornecedor com ID ${supplierId} foi contratado com sucesso.`);
      } else {
        console.log(`Erro ao contratar fornecedor: ${message}`);
      }
    } catch (error) {
      console.error("Erro na contratação do fornecedor:", error);
    }
  };

  const logoutNow = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  if (loading || userLoading) return <CircularProgress />;
  if (error || userError) return <p>Erro ao carregar dados.</p>;

  return (
    <Container>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo {userData?.user?.username} à nossa plataforma de fornecedores 
          <Button
            style={{ marginLeft: "80px" }}
            color="secondary"
            variant="contained"
            onClick={logoutNow}
          >
            Logout
          </Button>
        </Typography>
        <TextField
          label="Consumo em kWh"
          variant="outlined"
          fullWidth
          type="number"
          value={minKWh}
          onChange={(e) => setMinKWh(e.target.value)}
        />
      </Box>
      <Grid container spacing={2}>
        {Array.isArray(filteredSuppliers) && filteredSuppliers.length > 0 ? (
          filteredSuppliers.map((supplier) => (
            <Grid item key={supplier.id} xs={12} sm={4}>
              <CardComponent
                id={supplier.id}
                name={supplier.name}
                logo={supplier.logo}
                averageCustomerRating={supplier.averageCustomerRating}
                minimumKwhLimit={supplier.minimumKwhLimit}
                onHireClick={() => handleHireClick(supplier.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary">
            Nenhum fornecedor encontrado.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default App;
