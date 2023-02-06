//Variables

const carrito = document.querySelector('#carrito'); //nos servira para eliminar con la x
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); //donde se van a almacenar
const vaciarCarrito = document.querySelector('#vaciar-carrito');
//Agregando el carrito quitando y agregando sus elementos
let articulosCarrito = [];

//Nuestro sitio web tiene event listeners cuando se agrega o se vacia un curso
cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando 'Agregar al Carrito'
    listaCursos.addEventListener('click', agregarCurso); //le ponemos una funcion que se llama agregarCurso

    //Cuando eliminas articulos del carrito
    carrito.addEventListener('click', eliminarCurso);
}

//Funciones
function agregarCurso(e){
    e.preventDefault(); //para que no se vaya el scroll para arriba, se va hacia arriba debido a que tiene el # en href
    //Nota: e.target es el elemento al cual LE DAMOS CLICK
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement; //esto es para irnos y poder leer todo el contenido del HTML
        leerDatosCurso(cursoSeleccionado); //mandamos llamar esta funcion con el argumento que tomara los valores
        //de la constante cursoSeleccionado
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        //Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();//Iterar sobre el carrito y mostrar su HTML
    }
    
}

//Funcion lee el contenido de HTML que le dimos click y extrae la informacion del curso
function leerDatosCurso (curso){ //podemos nombrar los parametros como queramos
    console.log(curso);

    //Creando un objeto con el contenido del curso Actual
    const infoCurso = {
        imagen : curso.querySelector('img').src, //el curso tiene el HTML de todo lo que esta dentro de card
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'), //que numero de ID tiene 
        cantidad : 1
    }
    console.log(infoCurso);


    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    console.log(existe);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso; //retorna los objetos que no son duplicados
            }
        })
    }else{
        //Agrega elemento al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]; //necesitamos decirle que con el spread necesitamos el elemento vacio
    }
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr'); //estamos agregando una fila de tabla por cada elemento agregados
        //Aqui tambien vamos a agregarlo en orden para que aparezcan de izquierda a derecha
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        
        `
        //Agrega el HTML del carrito en el TBODY
        contenedorCarrito.appendChild(row); //ira agregando cada row 
    });
}

//Limpia el HTML
//Esto tenemos que hacerlo porque si agregamos un curso y luego agregamos otro, se queda el spread del curso anterior y se agrega
//el nuevo, digamos agregamos en 1 oleada curso1 y curso2, luego agregamos en oleada 2 curso 3, nos va a imprimir
//curso1, curso2, curso1, curso2, curso3, se empalman
//forma lenta 
// function limpiarHTML(){
//     contenedorCarrito.innerHTML = '';
// }

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//La funcion de esto es que ANTES de que se GENERE el HTML con el forEach, se LIMPIA lo que ya haya antes de agregar uno nuevo