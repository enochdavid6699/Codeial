const express = require('express');

const db = require('./config/mongoose');
const Chat = require('./models/chat');
const app = express();
const port = 8000;

//use exxpress router
app.use( '/' , require('./routes/index' ));

app.set( 'view engine' , 'ejs' );
app.set('views' , './views' );

app.listen( port , function(err){
    if(err){
        console.log(`Error in running server: ${err} `);
    }
    console.log(`Server is up and running at Port: ${port} `);
});