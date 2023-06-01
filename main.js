function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(reconocerDibujo)
    leerEnVozAlta = window.speechSynthesis;
}

function draw() {
    strokeWeight(13);
    stroke("blue")
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function borrar() {
    background("white");
}

function preload() {
    modelo = ml5.imageClassifier("DoodleNet")
}

function reconocerDibujo() {
    modelo.classify(canvas, mostrarResultados);
}

function mostrarResultados(error, resultados) {
    if (!error) {
        console.log(resultados);
        dibujo = resultados[0].label;
        confianza = resultados[0].confidence;
        confianza = Math.round(confianza*100)
        document.getElementById("confianza").innerHTML = "Confianza" + confianza +"%";
        fetch("https://api.mymemory.translated.net/get?q=" + dibujo + "&langpair=en|es-MX")
            .then(response => response.json())
            .then(data => {
                traduccion = data.responseData.translatedText;
                document.getElementById("dibujo").innerHTML = "Veo Veo " + traduccion;
                hablar(traduccion);
            });
    }
}

function hablar(mensaje) {
    lectura = new SpeechSynthesisUtterance(mensaje);
    lectura.lang = "es-MX"
    leerEnVozAlta.speak(lectura);
}