console.log("JSONGS cargado! a7");

document.addEventListener("load",JSONGS_usarLocalStorage)
setTimeout(JSONGS_usarLocalStorage, 0);

function JSONGS_usarLocalStorage() {
    let regex = /JSONGS--X--.*--Y--.*/g
    document.querySelectorAll("*").forEach((element) => {
        let clases = element.classList;
        clases.forEach(clase => {
            if (!regex.test(clase)) {
                console.log(clase,"NO CUMPLE")
                return;
            }
            console.log(clase, "CUMPLE")
            let XY = localStorage.getItem(clase)
            if (XY) {
                element.innerHTML = XY
            }
        })
    })
}

async function JSONGS_cargar(url, nombreLocalStorage, callback) {
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
        await callback(hoja_gs);
    }
    return hoja_gs;
}

function JSONGS_XY(hoja_gs, X, Y) {
    return hoja_gs.find((elemento) => elemento.id == Y ? true : false)[X]
}

function JSONGS_sustituirValoresSegunClase(hoja_gs) {
    //JSONGS--X--html--Y--0001
    let regex = /JSONGS--X--.*--Y--.*/g
    document.querySelectorAll("*").forEach((element) => {
        let clases = element.classList;
        clases.forEach(clase => {
            if (regex.test(clase)) {
                let params = clase.split("--")
                let X = params[2]
                let Y = params[4]
                let XY = JSONGS_XY(hoja_gs, X, Y)
                console.log(XY)
                if (XY) {
                    element.innerHTML = XY
                    localStorage.setItem(clase, XY)
                }
            }
        })
    })
}

function JSONGS_adjuntarLibreriasEnHeader(hoja_gs, regla) {
    if (!regla) {
        console.log("No hay regla en adjuntar librerias en header");
        return
    }
    hoja_gs.forEach(element => {
        let url = regla ? regla(element) : "";
        if (url) {
            let script = document.createElement(url.endsWith('js') ? 'script' : 'link')
            script[url.endsWith('js') ? 'src' : 'href'] = url;
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    });
}