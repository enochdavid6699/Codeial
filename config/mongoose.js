const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://enochdavid6699:jDcmZJXZbMNhkM7b@cluster0.flf0ij1.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error' , console.error.bind( console , 'error in connecting to db' ));

db.once('open' , function(){
    console.log('Successfully connected to the Data Base');
});