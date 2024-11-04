class PalabrasManager {
    constructor() {
        this.stopWords = [];
        this.lemmatizationDict = {};
        this.resultados = {};
    }

    // Método para cargar las palabras de parada
    cargarStopWords(content) {
        this.stopWords = content.split('\n').map(word => word.trim().toLowerCase()).filter(Boolean);
    }

    // Método para cargar el diccionario de lematización
    cargarLematizacion(content) {
        this.lemmatizationDict = JSON.parse(content);
    }

    // Método para comprobar si una palabra es una stop word
    esStopWord(palabra) {
        return this.stopWords.includes(palabra);
    }

    // Método para lematizar una palabra
    lematizar(palabra) {
        return this.lemmatizationDict[palabra] || palabra;
    }

    // Método para procesar un archivo de texto
    procesarArchivo(content) {
        const palabras = content.split(/\s+/); // Divide el contenido en palabras

        palabras.forEach((palabra, indice) => {
            const palabraLower = palabra.toLowerCase(); // Convertir a minúscula

            // Comprobar si no es una stop word
            if (!this.esStopWord(palabraLower)) {
                const lematizada = this.lematizar(palabraLower);

                // Comprobar si la palabra lematizada ya existe en resultados
                if (!this.resultados[lematizada]) {
                    this.resultados[lematizada] = { count: 0, index: indice }; // Guardar el índice de la primera aparición
                }
                this.resultados[lematizada].count += 1; // Incrementar el contador
            }
        });
    }
}
