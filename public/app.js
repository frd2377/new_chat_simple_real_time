const socket = io()

const contenedorPrincipal = document.getElementById('contenedor-principal')
const registrarUsuario = document.getElementById('registrar-usuario')
const nombreUsuario = document.getElementById('nombre-usuario')
const enviarMensaje = document.getElementById('enviar-mensaje')
enviarMensaje.disabled = true
const contenidoMensaje = document.getElementById('contenido-mensaje')
let nombre;

registrarUsuario.addEventListener('click',()=>{
    if (nombreUsuario.value.trim() != '') {
        registrarUsuario.disabled = true
        nombreUsuario.disabled = true
        registrarUsuario.ariaPlaceholder = nombreUsuario.value
        enviarMensaje.disabled = false
        nombre = nombreUsuario.value
    }
    return
})

enviarMensaje.addEventListener('click',()=>{
    if (contenidoMensaje.value.trim() != '') {
        socket.emit('mensaje',{
            nombre:nombre,
            contenidoMensaje:contenidoMensaje.value
        })
    }
})

socket.on('mensaje',(data)=>{
    contenedorPrincipal.innerHTML += `
    <div class="row" style="margin-bottom: 5px; margin-top: 5px;">
        <div class="card" style="border: solid 1px">
            <div class="card-body">
                <h6 class="card-title">Usuario: ${data.nombre} id="${data.idSecion}"</h6>
                <p class="card-text">Mensaje: ${data.contenidoMensaje}</p>
            </div>
        </div>
    </div>
    `
})