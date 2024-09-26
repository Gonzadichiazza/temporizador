const enfoque = document.querySelector(".app__card-button--enfoque");
const corto = document.querySelector(".app__card-button--corto");
const largo = document.querySelector(".app__card-button--largo");
const html = document.querySelector("html");
const imagenEnfoque = document.querySelector(".app__image"); 
const titulo = document.querySelector(".app__title"); 
const botones = document.querySelectorAll(".app__card-button");
const checkbox = document.querySelector("#alternar-musica"); 
const musica = new Audio("./sonidos/luna-rise-part-one.mp3"); 
const play = new Audio("./sonidos/play.wav")
const pause = new Audio("./sonidos/pause.mp3")
const tiempoFinalizado = new Audio("./sonidos/beep.mp3")
const botonIniciarPausar = document.querySelector("#start-pause"); 
const botonComenzar = document.querySelector("#start-pause span"); 
const icono = document.querySelector(".app__card-primary-butto-icon"); 
const tiempoEnPantalla = document.querySelector("#timer"); 

let segundos = 1500; 
let intervalo= null; 



enfoque.addEventListener("click", () => {
    segundos = 1500;
    cambiarContexto("enfoque")
    enfoque.classList.add("active"); 
});
corto.addEventListener("click", () => {
    segundos = 300;
    cambiarContexto("descanso-corto")
    corto.classList.add("active"); 
});
largo.addEventListener("click", () => {
    segundos = 900;
    cambiarContexto("descanso-largo")
    largo.classList.add("active"); 
});

musica.loop = true; 

checkbox.addEventListener("change" , () => {
    if(musica.paused){
        musica.play(); 
    }
    else{
        musica.pause(); 
    }
    
})

function cambiarContexto(contexto){
    mostrarTiempo();
    html.setAttribute("data-contexto", contexto);
    imagenEnfoque.setAttribute("src",`/imagenes/${contexto}.png`);

    botones.forEach(function(contexto) {
        contexto.classList.remove("active")

    })

    switch (contexto) {
        case "enfoque":
                titulo.innerHTML = `Optimiza tu productividad,<br>
             <strong class="app__title-strong" > sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
                titulo.innerHTML = `¿Qué tal tomar un respiro? <br>
             <strong class="app__title-strong" > ¡Haz una pausa corta!</strong>`
            break;
        case "descanso-largo":
                titulo.innerHTML = `Hora de volver a la superficie <br>
             <strong class="app__title-strong" >  Haz una pausa larga.</strong>`
            break;
        default:
            break;
    }


    
}

botonIniciarPausar.addEventListener("click", () =>{
    iniciarPausar(); 

})

function tiempo(){
    if(segundos <= 0){
        reiniciar(); 
        tiempoFinalizado.play();
        alert("finalizado");
        segundos = 5; 
        botonComenzar.textContent ="Comenzar"; 
        cambiarImagen("./imagenes/play_arrow,png")
        return
    }
    
    segundos -= 1; 
    mostrarTiempo();
}

const iniciarPausar = () => {
    if (intervalo) {
        pause.play()
        clearInterval(intervalo);
        intervalo = null;
        cambiarImagen("./imagenes/play_arrow.png")
        botonComenzar.textContent ="Reiniciar"; 
    } else {
        play.play()
        intervalo = setInterval(tiempo, 1000);
        cambiarImagen("./imagenes/pause.png")
        botonComenzar.textContent ="Pausar"; 
    }
}

function reiniciar (){
    clearInterval(intervalo); 
    intervalo = null; 

}

const cambiarImagen = (imagen) =>{
    icono.setAttribute("src", imagen); 
}

function mostrarTiempo(){
    const tiempo = new Date(segundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString("es-MX", {minute:"2-digit", second:"2-digit"});  
    tiempoEnPantalla.innerHTML = tiempoFormateado; 
}

mostrarTiempo();