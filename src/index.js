import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Root from './Root/Root';


const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/about",
        element: <div>Denne hjemmeside er lavet til at kunne se 20 Pokémons af gangen, for at kunne gå ind i dem og tjekke hvilke stats de har osv.</div>
      }
    ]
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);


