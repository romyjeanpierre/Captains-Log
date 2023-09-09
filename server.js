const express = require('express')
const methodOverride = require('method-override');
require('dotenv').config()
const connectDB = require('./utils/connectDB')
const jsxEngine = require('jsx-view-engine')
const Logs = require('./models/logs')

//variables
const app = express();
const PORT = 3000;

//App Configuration
app.set('view engine','jsx')
app.engine('jsx',jsxEngine())

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))



app.get('/', (req, res) => {
    res.send('Working!')
});


//Index
app.get('/logs', async (req, res) => {
    try {
        const logs = await Logs.find({});
        res.render('Index', {logs})
    } catch (e) {
        console.log(e);
    }
});




//New
app.get('/logs/new', (req, res) => {
    res.render('New')
})


//Edit
app.get('/logs/:id/edit', async (req, res)=> {
    const {id} = req.params
    try{
        
        const logs = await Logs.findById(id)
        
        res.render('Edit', {logs})
    }catch(error){
        console.log(error)
    }
})


//Show
app.get('/logs/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const logs = await Logs.findById(id);
        res.render('Show', {logs})
    } catch (e) {
        console.log(e);
    }
});


//Create
app.post('/logs', async (req, res) => {

    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    }else{
        req.body.shipIsBroken = false;
    }
    const createLog = await Logs.create(req.body)
    
    res.redirect(`/logs`)
})





//Update
app.put('/logs/:id', async(req, res)=> {
    const { id } = req.params

    console.log( req.body )

    if(req.body.shipIsBroken ==='on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }
    try {
         const updatedLog = await Logs.findByIdAndUpdate(id, req.body, 
            {new: true,
            });
        res.redirect(`/logs/${id}`);
    } catch (e) {
        console.log(e);
    }
});




//Delete
app.delete('/logs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLog = await Logs.findByIdAndDelete(id);
        res.redirect('/logs');
    } catch (e) {
        console.log(e);
    }
});




//Listening & Connecting to DB 
connectDB()
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));