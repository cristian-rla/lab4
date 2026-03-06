import {useEffect, useState} from "react";
import Form from './components/CustomTable.tsx'
import type { Column } from './components/CustomTable.tsx'
import list from "./assets/data.json"


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


function App() {
    const [listData, setlistData] = useState<Empleado[]>([]);
    function createEmpleado(item : Empleado){
        setlistData([...listData, item]);
    }

    function deleteEmpleado(item : Empleado){
        const index = listData.findIndex(e => e.id === item.id);
        if(index !== -1){
            setlistData(listData.filter(e => e.id !== item.id));
        }
    }

    function editEmpleado(item : Empleado){
        const index = listData.findIndex(e => e.id === item.id);
        if(index !== -1){
            const newList = [...listData];
            newList[index] = item;
            setlistData(newList);
        }
    }

    function validateEmpleado(item : Empleado){
        // intente hacer la siguiente funcion pero como utilizaba or entre string vacio y undefined, siempre daba true, porque incluso string vacio  no es estrictamente equivalente a undefined. return (item.nombre !== "" || item.nombre !== undefined) && (item.correo !== ""  || item.correo !== undefined) && (item.empresa !== "" || item.empresa !== undefined) && (item.telefono !== "" || item.telefono !== undefined) && (item.rol !== "" || item.rol !== undefined);
        return !!(item.nombre ?? "").trim() &&
        !!(item.correo ?? "").trim() &&
        !!(item.empresa ?? "").trim() &&
        !!(item.telefono ?? "").trim() &&
        !!(item.rol ?? "").trim();
        // trim no funciona en undefined, por eso se utiliza el operador ?? para asignar un string vacio en caso de que el valor sea undefined, y luego se utiliza el operador !! para convertir el resultado a un valor booleano, de esta manera, si el valor es undefined o string vacio, va a retornar false, y si tiene algun valor, va a retornar true.
        // ahora, con esto, aunque sea null, undefined o string vacio, va a retornar false, porque el operador !! convierte cualquier valor a su equivalente booleano, y el método trim() elimina los espacios en blanco al inicio y al final de la cadena, por lo que si la cadena es solo espacios en blanco, también va a retornar false.
        // con valores booleanos, la validacion es diferente, porque false puede ser un valor valido, entonces no se puede usar el operador !!, porque convertiria false a false, y true a true, entonces se tendria que validar directamente el valor booleano, sin convertirlo a booleano, por ejemplo: return item.activo === true; o return item.activo === false; dependiendo de lo que se quiera validar.
    }
    useEffect(() => {
        setlistData(data);
    }, []);
  return (
    <>
        <Form<Empleado> data={listData} columns={columns} createFn={createEmpleado} deleteFn={deleteEmpleado} editFn={editEmpleado} validateFn={validateEmpleado}/>
    </>
  )
}

export default App
