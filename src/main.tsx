import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./App.css"
import App from './App'
import Usuarios from './components/Usuarios'
// JSON.parse espera un string, pero cuando importas un archivo .json en TypeScript con resolveJsonModule, lo que recibes ya es un objeto tipado, no un string.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Usuarios></Usuarios>
  </StrictMode>,
)
