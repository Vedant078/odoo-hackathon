import React from 'react';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { AuthProvider } from './app/providers/AuthProvider';
import { NotificationProvider } from './app/providers/NotificationProvider';
import AppRouter from './app/router/AppRouter';

import './styles/theme.css';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
