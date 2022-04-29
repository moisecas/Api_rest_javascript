alert("Bienvenido, api perritos, elaborado por @moisecas") 
 
//cargar ruta
const api_url_random = "https://api.thedogapi.com/v1/images/search?limit=3&api_key=b64cd1c1-e8f5-4e3c-9a3f-8b80f8855ee2" //query parameters para enviar cierta cantidad de datos ?limit..
//se debe hacer el proceso de la apikeyporcorreo
//voy a enviarle a mi función de async esa constante con el contenido de url 
const api_url_favorites = "https://api.thedogapi.com/v1/favourites?api_key=b64cd1c1-e8f5-4e3c-9a3f-8b80f8855ee2" //query parameters para enviar cierta cantidad de datos ?limit..

const spanError = document.getElementById('error') 



//función recargar 
async function loadRandom(){
    const res = await fetch(api_url_random)//nos devuelve una promesa
    const data = await res.json();
    console.log('random')
    console.log(data)
    if(res.status !==200){
        spanError.innerHTML = "hubo un error al cargar la información" + res.status; 

    }else{
        const img1 = document.getElementById('img1') 
        const img2 = document.getElementById('img2') 
        const img3 = document.getElementById('img3')
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2')
        const btn3 = document.getElementById('btn2') 
        img1.src= data[0].url //traemos la url de la imagen, la rendereizamos en el html, data posición 0 de la url y así
        img2.src= data[1].url 
        img3.src= data[2].url

        btn1.onclick = () => saveFavorites(data[0].id);
        btn2.onclick = () => saveFavorites(data[1].id);
        btn3.onclick = () => saveFavorites(data[2].id);
        //carga los datos, la api nos da unos datos con unas propiedades en json

    }
    
 
}

async function loadFavorites(){ 
    const res = await fetch(api_url_favorites)//nos devuelve una promesa
    const data = await res.json(); 
    console.log('favoritos') 
    console.log(data) 
 
    //carga los datos, la api nos da unos datos con unas propiedades en json
    if(res.status !==200){
        spanError.innerHTML = "hubo un error al cargar la información" + res.status + data.message; 

    }else{
        data.forEach(perro => {
            //manipulación del dom
            const section = document.getElementById('favoritePerro')
            const article = document.createElement('article'); 
            const img = document.createElement('img'); 
            const btn = document.createElement('button');  
            const btnText = document.createTextNode('Sacar al perro de favoritos'); 
            
            //ahora empezamos a devolvernos 
            
            img.src=perro.image.url //imagen y boton listo
            img.width = 150;
            btn.appendChild(btnText);
            
            article.appendChild(img)
            article.appendChild(btn) //insertamos en el article

            section.appendChild(article)//insertamos en la section a article



            
        });
    }

}

async function saveFavorites(id){//nueva función asincrona para guardar las imagenes 
    const res = await fetch (api_url_favorites, { //await por ser asincrona, le enviamos el parametro de la ruta favoritos
        method: 'POST',
        headers:{//respuesta, como queremos comunicarnos con el backend
            'Content-Type':'application/json', //estamos trabajando en json

        },
        body: JSON.stringify({ //en formato json para facil comunicación con el backend
            image_id: id
            
        }), //acá le decimos que vamos a mostrar, guarda esto en favoritos 
    });//le enviamos un objeto, primero el metodo
    
    const data = await res.json(); //lo convertimos a res.json
    
    console.log('save')
    console.log(res) //lo mostramos
    //pide por defecto un body y un headers para ver la rta

    //validando errores
    if(res.status !==200){
        spanError.innerHTML = "hubo un error al cargar la información" + res.status + data.message;  

    }
}


loadRandom() 
loadFavorites()


//json viewer ext para chrome, para ver mejor el contenido de una api

//