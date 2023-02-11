function base64SvgToBase64Png (originalBase64, width) {
     return new Promise(resolve => {
         let img = document.createElement('img');
         img.onload = function () {
             document.body.appendChild(img);
             let canvas = document.createElement("canvas");
             let ratio = (img.clientWidth / img.clientHeight) || 1;
             document.body.removeChild(img);
             canvas.width = width;
             canvas.height = width / ratio;
             let ctx = canvas.getContext("2d");
             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
             try {
                 let data = canvas.toDataURL('image/png');
                 resolve(data);
             } catch (e) {
                 resolve(null);
             }
         };
         img.onerror = function() {
             resolve(null);
         };
         img.src = originalBase64;
     });
 }