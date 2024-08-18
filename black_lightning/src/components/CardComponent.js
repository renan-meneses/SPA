// src/components/CardComponent.js

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const CardComponent = ({ title, imageUrl, fields }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt="card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {fields.map((field, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            {field}
          </Typography>
        ))}
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{ width: '100%', borderRadius: 0, marginTop: 1 }}
        >
          Contratar
        </Button>
      </Box>
    </Card>
  );
};

export default CardComponent;
