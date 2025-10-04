import {basededatos} from './basededatos.js'


let indice = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let tituloa = document.getElementById('tituloa');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')
let bilatuBotoia = document.getElementById('bilatu');
let bilLiburua = [];

function eremuakBete(){

    tituloa.value = basededatos[indice].titulo
    data.value = basededatos[indice].fecha
    egilea.value = basededatos[indice].autor
    isbn.value = basededatos[indice].isbn
    irudia.src = URLBASE + basededatos[indice].filename 

}

function eremuakBeteWeb(liburu){

    tituloa.value = liburu.titulo
    data.value = liburu.fecha
    egilea.value = liburu.autor
    isbn.value = liburu.isbn
    irudia.src = URLBASE + liburu.filename 

}

function convert(book)
{
    let clave = Object.keys(book);
    let libro = book[clave];
    return {   "isbn": libro.bib_key.split(":")[1], // Split to get the part after the colon
        "titulo": libro.details.title, // Title of the book
        "autor": libro.details.authors.map(author => author.name).join(" ; "), // Join authors' names with semicolon
        "fecha": libro.details.publish_date, // Publish date
        "filename" : `${libro.details.covers[0]}-M.jpg`
    };

}

function bilatu(){
   bilLiburua =  basededatos.filter(book => {book.isbn === isbn.value});
   if(bilLiburua.length == 0){
    indice = -1;
   }
}

function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indice < basededatos.length-1)
            indice++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indice > 0)
            indice--
        eremuakBete()
    })

    bilatuBotoia.addEventListener('click', (event) => {
        bilatu()
        if(indice != -1){
            eremuakBete();
        } else {
            fetch("https://openlibrary.org/api/books?bibkeys=ISBN:" + isbn.value + "&format=json&jscmd=data").then(r => r.json()).then(data => {
                bilLiburua = convert(data);
                console.log(bilLiburua);
            })
            eremuakBeteWeb(bilLiburua);
        }
            
    })

}


window.onload = kargatu;

