
require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {
    

    const busquedas = new Busquedas();
    
    let opt;

    do {

        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case 1:                
                
                //Mostrar mensaje 
                const termino = await leerInput('Ciudad: ');

                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);

                //Seleccionar el lugar
                const id = await listarLugares(lugares);

                if(id === 0) continue; // Si es 0 entonces seguimos con la siguiente iteración
                
                //Guardar en DB
                const lugarSeleccionado = lugares.find(lugar => lugar.id === id); // find retorna la primera coincidencia
                busquedas.agregarHistorial(lugarSeleccionado.nombre);
                
                // Clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

                //Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre.green);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Como está el clima:', clima.desc.green);
                
                break;

            case 2:
                
                busquedas.historialCapitalizado.forEach((lugar, index) => {
                    const idx = `${index + 1}`.green;
                    console.log(`${idx}. ${lugar}`);
                })

                break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);

}

main();