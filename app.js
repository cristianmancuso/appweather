// Variables
const container = document.querySelector('#container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const tempmax= document.querySelector('#temp-Max');
const tempmin= document.querySelector('#temp-Min');
const nameCity = document.querySelector('#nombreCiudad')



//addEventListener
window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima);


})


function buscarClima(e){
    e.preventDefault()
    
    //validacion
    const ciudad = document.querySelector('#ciudadInput').value;
    const pais = document.querySelector('#paisInput').value;

    if(ciudad === '' && pais === ''){
        //mostrar mensaje de error
        mostrarError('Los campos son obligatorios');
        return;
    }

    //consultar aplicacion
    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){

    //seleccionamos una clase que no se vaya a repetir

    const seleccion = document.querySelector('.max-w-md');

    if(!seleccion){
   //crear alerta

   //*create div
   const alerta = document.createElement('div');

   //*ponemos algunos estilos
   
   alerta.classList.add('bg-red-400','border-red-950','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center','text-white');

   //*le agregamos el mensaje
   
   alerta.innerHTML =`
   <strong class="font-bold">Error!</strong>
   <span class="block">${mensaje}</span>
   `;

   //*lo insertamos en el HTML
   container.appendChild(alerta);

   //tiempo para quitar el mensaje
   setTimeout(() => {
      alerta.remove();
   }, 5000);
    }
}
    

function consultarAPI(ciudad,pais){


    const api ='26da2d69e899613f1270aa17a72460c2';

    //ins
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${api}`

    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(datos=>{

       
        limpiarHTML(); //limpiar HTML
        limpiarTempMax();
        limpiarTempMin();
        limpiarCity();
        

        //creamos If por si no se llega a encontrar la pagina

        if(datos.cod === "404"){

            mostrarError('this city not found')

            return;
        }


        //imprimir respuesta en HTML
        mostrarClima(datos);
    })

}


function mostrarClima(datos){
    //creamos las variables
    const {name,main:{temp,temp_max,temp_min}} = datos;

    //nombre de la ciudad
    const nombre = name;

    //grados
    const  F = Math.floor( 1.8*(temp -273.15) + 32);
    const C = Math.floor(temp -273.15);




    //grados Maximos
    const maxF = Math.floor(1.8*(temp_max -273.15) + 32);
    const  maxC= Math.floor(temp_max -273.15);


   //grados Minimos  
   const minF = Math.floor(1.8*(temp_min -273.15) + 32);
   const  minC= Math.floor(temp_min -273.15);




//Temperaturas F y C
    const tempActual = document.createElement('p');
    tempActual.innerHTML=`
    F = ${F} &#8451;<br>
    C = ${C} &#8451
    `

    tempActual.classList.add('font-bold', 'text-xl','text-white','pb-2','text-center');

    resultado.appendChild(tempActual);



//Temperaturas Maximas

    const tempMax = document.createElement('p');
    tempMax.innerHTML=`
    Max F = ${maxF} &#8451<br>
    Max C = ${maxC} &#8451;
    `
    
    tempMax.classList.add('font-bold', 'text-xl','text-white','pb-2','text-center');

    tempmax.appendChild(tempMax);



    
//Temperaturas Minimas

    const tempMin = document.createElement('p');
    tempMin.innerHTML=`
    Min F = ${minF} &#8451<br>
    Min C = ${minC} &#8451;
    `

    tempMin.classList.add('font-bold', 'text-xl','text-white','pb-2','text-center');

    tempmin.appendChild(tempMin);



//Nombre de ciudad

    const nombreciudad = document.createElement('p');
    nombreciudad.innerHTML=`
    ${nombre}
    `

    nombreciudad.classList.add('font-bold', 'text-4xl','text-white','p-4','text-center');

    nameCity.appendChild(nombreciudad);

}




function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function limpiarTempMax(){
    while(tempmax.firstChild){
        tempmax.removeChild(tempmax.firstChild);
    }
}

function limpiarTempMin(){
    while(tempmin.firstChild){
        tempmin.removeChild(tempmin.firstChild);
    }
}

function limpiarCity(){
    while(nameCity.firstChild){
        nameCity.removeChild(nameCity.firstChild);
    }
}






 
 

