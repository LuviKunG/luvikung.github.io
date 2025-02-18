'use client';

import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { Mode, useThemeContext } from '@/app/components/ClientThemeProvider';

const Page = () => {
  const { mode, toggleMode } = useThemeContext();
  return (
    <div>
      <Box sx={{}}>
        <Typography variant='h4' gutterBottom>
          Home page with Theme Switcher
        </Typography>
        <FormControlLabel
          control={<Switch checked={mode === Mode.Dark} onChange={toggleMode} />} label='Toggle Theme'
        />
        <Typography variant='body1' sx={{ mt: 2 }}>
          Current Theme: {mode}
        </Typography>
      </Box>
      <h1>Page</h1>
    </div>
  );
}

export default Page;
