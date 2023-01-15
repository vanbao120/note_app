import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Container } from '@mui/material'
import './index.css'
import './firebase/config'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { render } from "react-dom";

render(
  <React.StrictMode>
    <Container maxWidth='lg' sx={{ textAlign: 'center', marginTop: '50px' }}>
      <RouterProvider router={routes} />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
