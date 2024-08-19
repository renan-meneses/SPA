import React, {useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid, CircularProgress, TextField, Box, Typography } from '@mui/material';
import { GET_SUPPLIERS, GET_USER_DATA } from './querys/query'
import CardComponent from './components/CardComponent';

function App() {
  const { data, loading, error } = useQuery(GET_SUPPLIERS);
  const [minKWh, setMinKWh] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]); 
  const { loading: userloding, error: usererror, data: userdata } = useQuery(
    GET_USER_DATA
  );

  useEffect(() => {
    if (data) {
      setFilteredSuppliers(data.supplier);
      const minKWhValue = parseFloat(minKWh) || 0;
      const filtered = data.supplier.filter((supplier) =>
        supplier.minimumKwhLimit >= minKWhValue
      );
      if(filtered){
        setFilteredSuppliers(filtered);
      }
    }
  }, [minKWh, data]);
  const handleHireClick = (id) => {
    // Função que será chamada quando o botão for clicado
    console.log(`Fornecedor com ID ${id} foi contratado.`);
    // Adicione aqui a lógica para tratar a contratação do fornecedor
  };
  if (data)
  if (loading) return <CircularProgress />;
  if (error) return <p>Erro ao carregar dados.</p>;

  return (
    <Container>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo  {userdata?.user?.username}  à nossa plataforma de fornecedores 
        </Typography>
        <TextField
          label="Mínimo kWh"
          variant="outlined"
          fullWidth
          type="number"
          value={minKWh}
          onChange={(e) => setMinKWh(e.target.value)}
        />
      </Box>
      <Grid container spacing={2}>
      {Array.isArray(filteredSuppliers) && filteredSuppliers.length > 0 ? (
          filteredSuppliers?.map((supplier) => (
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
