import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  // your theme options
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
