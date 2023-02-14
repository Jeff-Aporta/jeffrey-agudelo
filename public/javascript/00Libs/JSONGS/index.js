console.log("JSONGS cargado!")

async function cargarJSONGS(url, nombreLocalStorage, callback) {
    let texto
    try {
        texto = await (await fetch(url)).text();
        localStorage.setItem(nombreLocalStorage, texto)
    } catch (error) {
    }
    if (!texto) {
        texto = localStorage.getItem(nombreLocalStorage)
    }
    if (!texto) {
        return
    }
    let renglones = texto.split("\n")
    let objs = renglones.map(elemento => elemento.split("\t"))
    let headers = objs.shift()
    let hoja_gs = objs.map(elemento => elemento.reduce((acumulado, elemento, indice) => {
        acumulado[headers[indice].trim()] = elemento.trim().replaceAll("\r", '')
        return acumulado;
    }, {}))

    if (callback) {
        await callback();
    }

    return hoja_gs;
}

function adjuntarLibreriasEnHeader(regla) {
    if (!regla) {
        console.log("No hay regla en adjuntar librerias en header");
        return
    }
    hoja_gs.forEach(element => {
        console.log(element)
        let url = regla?regla(element):"";
        if (url) {
            let script = document.createElement(url.endsWith('js') ? 'script' : 'link')
            script[url.endsWith('js') ? 'src' : 'href'] = url;
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    });
}