const secret = require("../secretKeys")
var path = require('path');

const imgbbUploader = require("imgbb-uploader");

async function subirDesdeURL(imgurl){
  try {
    let respuesta = await  imgbbUploader({
      apiKey: secret.imgBB, 
      name: "JeffAg", 
      imageUrl: imgurl, 
    });
      return respuesta
  } catch (error) {
  }
}

module.exports = {
    subirDesdeURL,
    rutaLocal: path.join('public', 'IMGBB.json'),
}