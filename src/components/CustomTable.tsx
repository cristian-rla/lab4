import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, } from "reactstrap";

export interface Column<T>{
    key: keyof T;
    label: string
}

export default function Form<T extends {id : number}> ({
    data,
    columns,
    createFn,
    editFn,
    deleteFn,
    validateFn
} : { 
    data:T[];
    columns: Column<T>[];
    createFn: (item:T) => void;
    editFn: (item:T) => void;
    deleteFn: (item:T) => void
    validateFn: (item:T) => boolean;
}){
    // useState programa renders, cada que se actualiza el estado, el componente se vuelve a renderizar, por eso es importante no actualizar el estado innecesariamente, para evitar renders innecesarios.
    // en el otro ejemplo, el componente de clase ya tiene un atributo llamado state, que es un objeto, y cada que se actualiza el estado con this.setState, el componente se vuelve a renderizar.
    // son diferentes formas de manejar el estado, pero el concepto es el mismo, cada que se actualiza el estado, el componente se vuelve a renderizar.
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<"create" | "update">("create");
    const [item, setItem] = useState<T>({} as T);

    return (
        <>
            <Container>
                <br/>
                    {
                    <Button color = "success" onClick = {() => {setItem({} as T); setModalType("create"); setIsOpen(true)}}>Crear nuevo registro</Button>
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
                                    <Button color = "primary" onClick = {() => {setItem(item); setModalType("update"); setIsOpen(true)}}>Editar</Button>
                                </td>
                                <td>
                                    <Button color="danger" onClick={() => {deleteFn(item)}}>Eliminar</Button>
                                </td>
                            </tr>
                        )
                        })}
                    </tbody>
                </Table>
            </Container>
            <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                <ModalHeader>
                    {modalType === "create" ? "Crear nuevo registro" : "Editar registro"}
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>id</label>
                        <input className = 'form-control' readOnly type="text" value = {item.id}></input>
                    </FormGroup> 
                    {columns.filter(column => column.key !== "id").map(column => {
                        return (
                            <FormGroup key = {String(column.key)}>
                                <label>{column.label}</label>
                                <input className = 'form-control' name = {String(column.key)} type="text" onChange={(e) => {
                                    setItem({
                                        ...item, 
                                        [column.key]: e.target.value
                                    })
                                }} value = {item[column.key] ? String(item[column.key]) : ""}></input>
                            </FormGroup>
                        )
                    })}
                </ModalBody>
                <ModalFooter>
                    <Button color = "primary" onClick = {() => {
                        if(!validateFn(item)){
                            alert("Por favor, complete todos los campos");
                            return;
                        }
                        if(modalType === "create"){
                            createFn({...item, id: data.length > 0 ? Math.max(...data.map(x => x.id)) + 1 : 1} as T);
                        } else {
                            editFn(item);
                        }
                        setIsOpen(false);
                    }}>Guardar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
