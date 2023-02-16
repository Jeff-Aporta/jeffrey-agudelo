/**
 * Función para verificar si un punto está dentro de un polígono.
 * 
 * El algoritmo se basa en el hecho de que si una línea infinita se traza desde el punto hacia un lado (por 
 * ejemplo, hacia el norte) y el número de veces que esta línea cruza las líneas del polígono es impar, el punto 
 * está dentro del polígono.
* 
* La línea de código que se está explicando aquí se encarga de determinar si la línea trazada desde el punto 
* cruza una de las líneas del polígono. Está comparando si el punto y (coordenada y) del vértice actual i del 
* polígono es diferente al punto y del vértice siguiente j del polígono. Si es diferente, significa que la línea entre 
* los dos vértices cruza el eje y en algún lugar, lo que significa que podría cruzar la línea infinita trazada desde 
* el punto.
* 
* A continuación, se realiza un cálculo para determinar si la línea entre los vértices i y j realmente cruza la línea 
* infinita trazada desde el punto. El cálculo se basa en el hecho de que las líneas paralelas tienen una relación 
* constante entre sus puntos x y y. Si el punto x (coordenada x) del punto dado es menor que el punto x que se 
* obtiene de aplicar esta relación a la línea entre los vértices i y j, significa que la línea infinita trazada desde el 
* punto cruza la línea entre los vértices i y j.
* 
* Finalmente, si se cumple esa condición, el resultado se invierte. Esto se hace para contar el número de veces 
* que la línea infinita trazada desde el punto cruza las líneas del polígono. Si es impar, el punto está dentro del 
* polígono.
 * 
 * @param {Array} polygon - un arreglo de puntos que representan el polígono
 * @param {Object} point - un objeto con las propiedades x e y que representa un punto
 * @return {Boolean} - True si el punto está dentro del polígono, False en caso contrario
 */
function polyContains(polygon, point) {
    let i = 0; // variable para recorrer el poligono
    let j = 0; // variable para recorrer el poligono
    let result = false; // variable para guardar el resultado
    for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) { // recorre el poligono 
        // verifica si el punto está dentro del poligono
        if ((polygon[i].y > point.y) != (polygon[j].y > point.y) &&
                (point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)) {
            result = !result;
        }
    }
    return result;
}