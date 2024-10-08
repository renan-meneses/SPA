// src/components/CardComponent.js

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const CardComponent = ({ id, name, logo, averageCustomerRating, minimumKwhLimit, onHireClick }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={logo}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
          <Typography  variant="body2" color="text.primary">
           Nota: {averageCustomerRating}
          </Typography>
        <Typography variant="body2" color="text.primary">
          Mínimo kWh:{minimumKwhLimit}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{ width: '100%', borderRadius: 0, marginTop: 1 }}
          onClick={() => onHireClick(id)} 
        >
          Contratar
        </Button>
      </Box>
    </Card>
  );
};

export default CardComponent;
