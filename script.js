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
let segundos = 5; 
let intervalo= null; 



enfoque.addEventListener("click", () => {
    cambiarContexto("enfoque")
    enfoque.classList.add("active"); 
});
corto.addEventListener("click", () => {
    cambiarContexto("descanso-corto")
    corto.classList.add("active"); 
});
largo.addEventListener("click", () => {
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
        return
    }
    
    segundos -= 1; 
    console.log(segundos)
}

const iniciarPausar = () => {
    if (intervalo) {
        pause.play()
        clearInterval(intervalo);
        intervalo = null;
    } else {
        play.play()
        intervalo = setInterval(tiempo, 1000);
    }
}

function reiniciar (){
    clearInterval(intervalo); 
    intervalo = null; 
}

