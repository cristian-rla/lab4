import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, } from "reactstrap";

interface Empleado {
    id:number, 
    nombre:string, 
    correo:string,
    empresa:string,
    telefono:string,
    rol:string
}

export interface Column<T>{
    key: keyof T;
    label: string
}


export default function Form<T extends {id : number}> ({
    data,
    columns,
    createFn,
    deleteFn
} : { 
    data:T[];
    columns: Column<T>[];
    createFn: (item:T) => void;
    deleteFn: (item:T) => void
}){

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null); 

    return (
        <>
            <Container>
                <br/>
                    {//<Button onClick = {() => createFn(item)}>Crear nuevo registro</Button>
                    }
                <br/>
                <br/>
                <Table>
                    <thead>
                        {columns.map(column => {
                            return <th key = {String(column.key)}>{column.label}</th>;
                        })}
                    </thead>
                    <tbody>
                        {data.map(item => {
                            return (<tr key = {item.id}>
                                {columns.map(column => {
                                    return <td key = {String(column.key)}>{String(item[column.key])}</td>;
                                })}
                                <td>
                                    <Button color="danger" onClick={() => {alert('hola'); deleteFn(item)}}>Eliminar</Button>

                                </td>
                            </tr>
                        )
                        })}
                    </tbody>
                </Table>
            </Container>
            <Modal isOpen={false}>
                        
            </Modal>
        </>
    )
}
