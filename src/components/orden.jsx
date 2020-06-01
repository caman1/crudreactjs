import React, {useState, useEffect} from 'react'
import firebase from '../firebase'
import deleted from './deleted'
import Formulario from './formulario'


const ELECCIONES = {
    'NOMBRE_ASC':{column: 'nombre', direction: 'asc'},
    'NOMBRE_DESC':{column: 'nombre', direction: 'desc'},
    'CEDULA_ASC':{column: 'Cedula', direction: 'asc'},
    'CEDULA_DESC':{column: 'Cedula', direction: 'desc'}
}

function usePersona(sortBy = 'NOMBRE_ASC') {
    const [personas, setPersonas] = useState([])

    useEffect(() => {
        const unsubcribe = firebase
        .firestore()
        .collection('crud')
        .orderBy(ELECCIONES[sortBy].column, ELECCIONES[sortBy].direction)
        .onSnapshot((snapshot) =>{
            const nuevaPersonas = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setPersonas(nuevaPersonas)
        })

        return () => unsubcribe
    }, [sortBy])

    return personas
}



const Opciones = () => {
    const[sortBy, setSortBy] = useState('NOMBRE_ASC')
    const personas = usePersona(sortBy)

    const [nombre, setNombre] = useState('');
    const [Cedula, setCedula] = useState('');
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);

    function onSubmit(e) {
        e.preventDefault()
        if(editMode == false){


            firebase
            .firestore()
            .collection('crud')
            .add({
                nombre,
                Cedula
            })
            .then(() => {
                setId('')
                setNombre('')
                setCedula('')
            })
        }else{
            firebase
            .firestore()
            .collection('crud')
            .doc(id)
            .update({
                nombre,
                Cedula
            })
            .then(() => {
                setId('')
                setNombre('')
                setCedula('')
                setEditMode(false)
            })
        }

    }

    function setItem (id, nombreUpdate, cedulaUpdate)  {
        setId(id)
        setNombre(nombreUpdate)
        setCedula(cedulaUpdate)
        setEditMode(true);
    }

    return (
        <div>
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
            </form>
            <br/>
            <select class="form-control form-control-lg" value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}>
              <option value="NOMBRE_ASC">Nombre(Ascendente)</option>
              <option value="NOMBRE_DESC">Nombre(Ascendente)</option>
              <option disabled>---</option>
              <option value="CEDULA_ASC">Cedula(Ascendente)</option>
              <option value="CEDULA_DESC">Cedula(Ascendente)</option>
            </select>
            <hr/>
            <div class="container">
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">nombre</th>
                  <th scope="col">cedula</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                  {
                      personas.map((persona) =>
                        <tr key={persona.id}>
                            <th scope="row">{persona.id}</th>
                            <td>{persona.nombre}</td>
                            <td>{persona.Cedula}</td>
                            <td>
                            <button type="button" class="btn btn-success boton-separacion" onClick={() => setItem(persona.id, persona.nombre, persona.Cedula)}>Editar</button>
                            <button type="button" class="btn btn-danger" onClick={() => deleted(persona.id)}>Eliminar</button>
                            </td>
                        </tr>
                      )
                  }
              </tbody>
            </table>
            </div>
        </div>
    )
}

export default Opciones