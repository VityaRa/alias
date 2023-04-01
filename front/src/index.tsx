import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './router';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { Main } from './layouts/main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Main>
      <RouterProvider router={Router} />
    </Main>
  </React.StrictMode>
);