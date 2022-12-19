// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// Global Stylesheet
import './index.css';
// React Router parent component
import { BrowserRouter } from "react-router-dom";
// App component
import App from './common/app/App';
// MUI elements and themes
import { ThemeProvider } from '@emotion/react';
import darkTheme from './common/themes/DarkTheme';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
