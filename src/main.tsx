import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Form from './components/Empleados.tsx'
import type { Column } from './components/Empleados.tsx'
import list from "./assets/data.json"
import "./App.css"
// JSON.parse espera un string, pero cuando importas un archivo .json en TypeScript con resolveJsonModule, lo que recibes ya es un objeto tipado, no un string.

const data = list as Empleado[];

interface Empleado {
    id:number, 
    nombre:string, 
    correo:string,
    empresa:string,
    telefono:string,
    rol:string
}

const columns : Column<Empleado>[] = [
    { key: "id", label: "ID" },
    { key: "nombre", label: "Nombre" },
    { key: "correo", label: "Correo" },
    { key: "empresa", label: "Empresa" },
    { key: "telefono", label: "Teléfono" },
    { key: "rol", label: "Rol" }
]

function createEmpleado(item : Empleado){
  data.push(item);
}

function deleteEmpleado(item : Empleado){
  const index = data.findIndex(e => e.id === item.id);
  if(index !== -1){
    data.splice(index, 1);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Form<Empleado> data={data} columns={columns} createFn={createEmpleado} deleteFn={deleteEmpleado} />
  </StrictMode>,
)
