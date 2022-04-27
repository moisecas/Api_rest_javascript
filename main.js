alert("Bienvenido, api perritos, elaborado por @moisecas") 
 
//cargar ruta
const api_url = "https://api.thedogapi.com/v1/images/search?limit=3&api_key=b64cd1c1-e8f5-4e3c-9a3f-8b80f8855ee2" //query parameters para enviar cierta cantidad de datos ?limit..
//se debe hacer el proceso de la apikeyporcorreo
//voy a enviarle a mi función de async esa constante con el contenido de url 




//función recargar 
async function reload(){
    const res = await fetch(api_url)//nos devuelve una promesa
    const data = await res.json();
  
    const img1 = document.getElementById('img1') 
    const img2 = document.getElementById('img2') 
    const img3 = document.getElementById('img3') 
    img1.src= data[0].url //traemos la url de la imagen, la rendereizamos en el html, data posición 0 de la url y así
    img2.src= data[1].url 
    img3.src= data[2].url
    //carga los datos, la api nos da unos datos con unas propiedades en json


}
reload()

//json viewer ext para chrome, para ver mejor el contenido de una api

//