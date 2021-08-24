require('colors');
const inquirer = require('inquirer');

/**
 * Objeto de preguntas que leerá inquirer
 */
const preguntas = [
    {
        type:'list', //Tipo de lista de preguntas
        name:'opcion', //variable en donde se guardara la opcion leida
        message: '¿Qué desea hacer?', //pregunta al usuario
        //opciones
        choices: [
            {
                value: 1, // Valor de la opcion
                name: `${'1.'.green} Buscar ciudad` // Texto mostrado
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir\n`
            }
        ]
    }
];
/**
 * Muestra el menpu de opciones y lee la opcion seleccionada
 * 
 * @returns opcion
 */
const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('   Seleccione una opción  '.white);
    console.log('==========================\n'. green);

    /* Mostramos las preguntas y leemos desde la consola */
    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

/**
 * Pausa el programa hasta que se presione una tecla
 */
const pausa = async () => {

    const question = [
        {
            type:'input',
            name:'opcion',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);

}

/**
 * 
 * Muestra el mensaje indicado y lee un input desde la consola
 * 
 * 
 * @param {*} message 
 * @returns desc
 */
const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;

}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, index) => {
        const idx = `${index + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    confirmar,
    listarLugares
}