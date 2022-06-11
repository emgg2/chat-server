const { Schema, model } = require('mongoose');

const MensajeSchema = Schema ({
    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    }, 
    mensaje: {
        type: String,        
        required: true
    }
}, {
        timestamps: true
});

// La función de aqui no puede ser de flecha sino no funciona
MensajeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object; 

});

module.exports = model( 'Mensaje', MensajeSchema );