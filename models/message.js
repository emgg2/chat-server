const { Schema, model } = require('mongoose');

const MessageSchema = Schema ({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    }, 
    message: {
        type: String,        
        required: true
    }
}, {
        timestamps: true
});

// La función de aqui no puede ser de flecha sino no funciona
MessageSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object; 

});

module.exports = model( 'Message', MessageSchema );