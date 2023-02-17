const fs = require('fs')

function leer(ruta) {
    try{
        return fs.readFileSync(ruta,{encoding:'utf8', flag:'r'})
    }catch(e){
    }
}

function escribir(ruta, texto) {
    return fs.writeFileSync(ruta, texto)
}

function eliminarArchivo(path) {
    try {
        fs.unlinkSync(path)
    } catch (err) {
        console.error('Something wrong happened removing the file', err)
    }
}

module.exports = {
    leer,
    escribir,
    eliminarArchivo,
}