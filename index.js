//Setup Express Server
const express = require('express');
const app = express();
const port = 8000;

//Setup Layouts
const expressLayouts = require('express-ejs-layouts');

//Setup DB
const db = require('./config/mongoose');

//Set Static Folder
app.use(express.static('./assets'));

//Here we are using the Layout
app.use(expressLayouts);

//Extract styles and scripts from subpages to the alyout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//Setup Express Router
app.use( '/' , require('./routes/index' ));

//Setup Ejs
app.set( 'view engine' , 'ejs' );
app.set('views' , './views' );


//Check if Server is working
app.listen( port , function(err){
    if(err){
        console.log(`Error in running server: ${err} `);
    }
    console.log(`Server is up and running at Port: ${port} `);
});