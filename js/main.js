import {basededatos} from './basededatos.js'


let indice = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let tituloa = document.getElementById('tituloa');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')

function eremuakBete(){

    tituloa.value = basededatos[indice].titulo
    data.value = basededatos[indice].fecha
    egilea.value = basededatos[indice].autor
    isbn.value = basededatos[indice].isbn
    irudia.src = URLBASE + basededatos[indice].filename 

}


function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indice < basededatos.length-1)
            indice++
        eremuaBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indice > 0)
            indice--
        eremuakBete()
    })


}

window.onload = kargatu;

