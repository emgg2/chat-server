const { connectUser, disconnectUser, getUsers, saveMessage } = require("../controllers/sokets");
const { checkJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [JWTvalid, uid]  = checkJWT(socket.handshake.query['x-token']);

            if(!JWTvalid) {
                console.log('Unidentifed JWT');
                return socket.disconnect();  
            } else {
                console.log('Cliente conectado', uid);
            }

           await connectUser( uid );

           //Unir al usuario a una sala de socket.io
                socket.join( uid );



         // si el token no es válido , desconectar
         // TODO: saber qué usuaro está activo mientras el UID

         //TODO: emitir todos los usuarios están conectados

         
            this.io.emit('users-list', await getUsers());
            socket.on('personal-message', async ( payload ) => {
                const message = await saveMessage( payload );
                this.io.to(payload.to).emit('personal-message', message);
                this.io.to(payload.from).emit('personal-message', message);
            })

        

         // TODO: escuchar cuando el cliente manda un mensaje
         // mensaje-personal

         // TODO: disconnect
         // marcar en la bbdd que el usuario se desconectó.

         // TODO: emitir todos los usuarios conectados

         socket.on('disconnect', async() => {
            console.log('cliente desconectado',uid);
            await disconnectUser( uid );            
            this.io.emit('users-list', await getUsers());
        })



        });
       
    }


}


module.exports = Sockets;