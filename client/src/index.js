import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './core/theme';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
