const { Configuration, OpenAIApi } = require("openai");
const secretKeys = require("../../secretKeys");
const manejadorDeArchivos = require("../../archivos/manejo")
const imgbb = require("../../imgbb")

const config = new Configuration({
	apiKey: secretKeys.openai_jeffAporta,
});
const openai = new OpenAIApi(config);


async function generar(prompt, numberOfImages = 1) {
	try {
		data = await openai.createImage({
			prompt: prompt,
			n: numberOfImages,
			size: "1024x1024",
		})
	} catch (error) {
		console.log(error)
		return {
			urls: [],
			imgbbnews: []
		}
	}
	let IMGBBJSON = manejadorDeArchivos.leer(imgbb.rutaLocal);
	if (!IMGBBJSON) {
		IMGBBJSON = []
	} else {
		IMGBBJSON = JSON.parse(IMGBBJSON)
		if (!(IMGBBJSON instanceof Array)) {
			IMGBBJSON = []
		}
	}
	let urls = data.data.data.map(obj => obj.url)
	let imgbbnews = []
	for (const url of urls) {
		let respuestaIMGBB = await imgbb.subirDesdeURL(url);
		if (respuestaIMGBB) {
			respuestaIMGBB.prompt = prompt
			respuestaIMGBB.url_openai = url
			imgbbnews.push(respuestaIMGBB)
			IMGBBJSON.push(respuestaIMGBB)
		}
	}
	manejadorDeArchivos.escribir(imgbb.rutaLocal, JSON.stringify(IMGBBJSON, null, "\t"))
	return {
		urls,
		imgbbnews
	}
}

module.exports = {
	generar
}