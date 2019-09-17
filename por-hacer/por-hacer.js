const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            reject(err);
        }
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

let crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB(porHacer);
    return porHacer;
}

let getListado = (filtro) => {
    cargarDB();

    if (!Boolean(filtro)) {
        return listadoPorHacer;

    } else {
        if (filtro == 'true') {
            filtro = true;

        } else {
            filtro = false;
        }
        let newListadoPorHacer = [];

        listadoPorHacer.forEach(tarea => {
            if (tarea.completado == filtro) {
                newListadoPorHacer.push(tarea);
            }
        });

        return newListadoPorHacer;

    }

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

};

const borrar = (descripcion) => {
    cargarDB();
    let newListadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === newListadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = newListadoPorHacer;
        guardarDB();
        return true;
    }


};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}