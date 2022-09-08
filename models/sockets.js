

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {


            console.log("cliente conectado");

         // TODO: validat JWT

         // si el token no es válido , desconectar
         // TODO: saber qué usuaro está activo mientras el UID

         //TODO: emitir todos los usuarios están conectados

         // TODO: socket join, uid

         // TODO: escuchar cuando el cliente manda un mensaje
         // mensaje-personal

         // TODO: disconnect
         // marcar en la bbdd que el usuario se desconectó.

         // TODO: emitir todos los usuarios conectados

        });
        this.io.on('disconnect', () => {
            console.log('cliente desconectado');
        })
    }


}


module.exports = Sockets;