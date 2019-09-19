const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

console.log(argv);
console.log(false);

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado(argv.completado);

        if (listado.length <= 0) {
            console.log('No existen registros para el listado solicitado');
            break;
        } else {

            listado.forEach(element => {
                let estado = () => {
                    if (element.completado) {
                        return 'Completado';
                    } else {
                        return 'Pendiente';
                    }
                };
                console.log('=====Por hacer====='.green);
                console.log('Tarea : ', element.descripcion);
                console.log('Estado: ', estado());
                console.log('==================='.green);
            });
            break;
        }


    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        if (actualizado) {
            console.log('Exitoso');
        } else {
            console.log('No se pudo actualizar');
        }

        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        if (borrado) {
            console.log('Registro Borrado');
        } else {
            console.log('No se logró actualizar');
        }
        break;

    default:
        console.log(`El comando: ${comando} no es reconocido`);
        break;
}