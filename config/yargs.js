const options = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea por hacer'
    },
    completado: {
        alias: 'c',
        desc: 'Define el estado de la tarea'
    }
}
const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', options)
    .command('borrar', 'Borra un registro de la lista de tareas', options)
    .command('listar', 'Imprime en consola un listado de las tareas que pueden ser filtrados por su estatus', {
        completado: {
            alias: 'c',
            desc: 'Define el estado de la tarea'
        }
    })
    .command('actualizar', 'Actualiza el estado completado a una tarea', options)
    .help()
    .argv;

module.exports = {
    argv
}