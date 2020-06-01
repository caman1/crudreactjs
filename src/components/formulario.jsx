import React, {useState} from 'react'
import firebase from '../firebase'



const Formulario = (id, nombreUpdate, cedulaUpdate) => {
    
    const [nombre, setNombre] = useState('');
    const [Cedula, setCedula] = useState('');

    function onSubmit(e) {
        e.preventDefault()

        firebase
        .firestore()
        .collection('crud')
        .add({
            nombre,
            Cedula
        })
        .then(() => {
            setNombre('')
            setCedula('')
        })
    }

    
    return (

        <form onSubmit={onSubmit}>
            <h4>Agregar persona</h4>
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" value={nombre} onChange ={e => setNombre(e.currentTarget.value)}/>
            </div>
            <div class="form-group">
                <label>Cedula</label>
                <input type="number" class="form-control" value={Cedula} onChange ={e => setCedula(e.currentTarget.value)}/>
            </div>
            <button class="btn btn-primary boton-separacion">Agregar</button>
            <button class="btn btn-primary">Actualizar</button>
        </form>
    )
}

export default Formulario