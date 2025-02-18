'use client';

import React, { useState, useMemo, createContext, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

export enum Mode {
  Light = 'light',
  Dark = 'dark',
}

interface ThemeContextType {
  mode: Mode;
  toggleMode: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ClientThemeProvider');
  }
  return context;
};

interface ClientThemeProviderProps {
  children: React.ReactNode;
}

const ClientThemeProvider: React.FC<ClientThemeProviderProps> = ({ children }) => {
  const systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<Mode>(systemPrefersDark ? Mode.Dark : Mode.Light);
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === Mode.Light ? Mode.Dark : Mode.Light));
  };
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ClientThemeProvider;
