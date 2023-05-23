//? AJAX (Asynchronous JavaScript And XML)

//! Objeto XMLHttpRequest
(() => {
     const xhr = new XMLHttpRequest(), //? Paso 1: Instanciar el objeto XMLHttpRequest
          $xhr = document.getElementById("xhr"),
          $fragment = document.createDocumentFragment();

          
          //? Paso 2: Agregarle el o los eventos que vayamos a estar manipulando de la petición (la lógica de la programación va en el callback)
     xhr.addEventListener("readystatechange", (ev) => {
          
          //? Cuando el readyState no es 4, no retorna nada
          if (xhr.readyState !== 4) return

          //console.log(xhr);

          //? Contemplando sólo los códigos de estado de respuesta HTTP (200-299 -> Respuestas satisfactorias)
          if (xhr.status >= 200 && xhr.status < 300) {

               //console.log('Éxito');
               //console.log(xhr.responseText);
               //$xhr.innerHTML = xhr.responseText;
               let json = JSON.parse(xhr.responseText);
               //console.log(json);

               json.forEach(element => {

                    const $li = document.createElement("li");
                    $li.innerHTML = `${element.username} -- ${element.name} -- ${element.email} -- ${element.phone}`;
                    $fragment.appendChild($li);

               });

               $xhr.appendChild($fragment);

          } else {

               //console.log('Error');
               let message = xhr.statusText || "Ocurrió un error";
               $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
          }

     }); 

     //? Paso 3: Abrir la petición, establecer el método por el cuál lo vamos a hacer y el recurso, URL o Endpoint al cual vamos a acceder
     xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
     //xhr.open("GET", "/js/users.json"); 

     //? Paso 4: Enviar la petición
     xhr.send();
})();

//! API Fetch
(() => {

     const $fetch = document.getElementById("fetch"),
          $fragment = document.createDocumentFragment();

     fetch("https://jsonplaceholder.typicode.com/users")
          /* .then( (res) => {
               console.log(res);
               return res.ok ? res.json() : Promise.reject(res);
          }) */
          .then( (res) => res.ok ? res.json() : Promise.reject(res) )
          .then( (json) => {
               //console.log(json);
               //$fetch.innerHTML = json;
               json.forEach(element => {

                    const $li = document.createElement("li");
                    $li.innerHTML = `${element.username} -- ${element.name} -- ${element.email} -- ${element.phone}`;
                    $fragment.appendChild($li);

               });

               $fetch.appendChild($fragment);
          })
          .catch( (err) => {
               //console.log(err);
               let message = err.statusText || "Ocurrió un error";
               $fetch.innerHTML = `Error ${err.status}: ${message}`;
          })
          
          .finally(() => {
               //console.log("Siempre me voy a ejecutar, independientemente del try..catch");
          });

})();

//! API Fetch + Async-Await
(() => {

     const $fetchAsync = document.getElementById("fetch-async"),
          $fragment = document.createDocumentFragment();

     /* async function getData(){
          try {
               
               let res = await fetch("https://jsonplaceholder.typicode.com/user"),
                    json = await res.json();

               console.log(res, json);

               //if(!res.ok) throw new Error("Ocurrió un error") //? Sólo recibe como parámetro string
               if ( !res.ok ) {
                    throw { //? throw es un return que manda nuestro flujo al catch
                         status: res.status,
                         statusText: res.statusText
                    }
               }

               json.forEach(element => {

                    const $li = document.createElement("li");
                    $li.innerHTML = `${element.username} -- ${element.name} -- ${element.email} -- ${element.phone}`;
                    $fragment.appendChild($li);

               });

               $fetchAsync.appendChild($fragment);

          } catch (error) {

               console.log(error);
               let message = error.statusText || "Ocurrió un error";
               $fetchAsync.innerHTML = `Error ${error.status}: ${message}`;

          } finally {
               console.log("Siempre me voy a ejecutar, independientemente del try..catch");
          }
     } */

     const getData = async () => {
          try {
               
               let res = await fetch("https://jsonplaceholder.typicode.com/users"),
                    json = await res.json();

               //console.log(res, json);

               //if(!res.ok) throw new Error("Ocurrió un error") //? Sólo recibe como parámetro string
               if ( !res.ok ) {
                    throw { //? throw es un return que manda nuestro flujo al catch
                         status: res.status,
                         statusText: res.statusText
                    }
               }

               json.forEach(element => {

                    const $li = document.createElement("li");
                    $li.innerHTML = `${element.username} -- ${element.name} -- ${element.email} -- ${element.phone}`;
                    $fragment.appendChild($li);

               });

               $fetchAsync.appendChild($fragment);

          } 
          catch (error) {

               //console.log(error);
               let message = error.statusText || "Ocurrió un error";
               $fetchAsync.innerHTML = `Error ${error.status}: ${message}`;

          } 
          finally {
               //console.log("Siempre me voy a ejecutar, independientemente del try..catch");
          }
     }

    getData();

})();

//! Axios
(() => {

     const $axios = document.getElementById("axios"),
          $fragment = document.createDocumentFragment();

     axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((res) => {

               //console.log(res);
               let json = res.data;
               json.forEach(element => {

                    const $li = document.createElement("li");
                    $li.innerHTML = `${element.username} -- ${element.name} -- ${element.email} -- ${element.phone}`;
                    $fragment.appendChild($li);

               });

               $axios.appendChild($fragment);

          })
          .catch((error) => {

               //console.log(error.response);
               let message = error.response.statusText || "Ocurrió un error";
               $axios.innerHTML = `Error ${error.response.status}: ${message}`;

          })
          .finally(() => {

               //console.log('Esto se ejecutará independientemente del resultado Axios');

          })
})();

//! Axios + Async-Await
(() => {

     const $axiosAsync = document.getElementById("axios-async"),
          $fragment = document.createDocumentFragment();

     const getData = async () => {
          try {

               let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
                    json = await res.data
                    
               console.log(res);
               console.log(json);
               
               json.forEach(element => {

                    const $li = document.createElement("li");
                    $li.innerHTML = `${element.username} -- ${element.name} -- ${element.email} -- ${element.phone}`;
                    $fragment.appendChild($li);

               });

               $axiosAsync.appendChild($fragment);
               
          } catch (error) {

               //console.log(error.response);
               let message = error.response.statusText || "Ocurrió un error";
               $axiosAsync.innerHTML = `Error ${error.response.status}: ${message}`;

          } finally {
               console.log('Esto se ejecutará independientemente del try..catch');
          }
     }

     getData();
})();