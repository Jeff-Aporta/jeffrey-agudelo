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

    await callback();

    return hoja_gs;
}