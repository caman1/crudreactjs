import React from 'react'
import firebase from '../firebase'

const items = (id, nombre, cedula) => {
    console.log(nombre);
}

const deleted = (id) => {
    firebase
    .firestore()
    .collection('crud')
    .doc(id)
    .delete()
}

export default deleted