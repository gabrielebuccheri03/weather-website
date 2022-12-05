import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import hbs from 'hbs';
import  utils from './utils.js';

//we get the path of the directory of the file we are currently working on
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pub = path.join(__dirname, '../public');


const app = express();

//set the view engine and the path of the views directory
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));


//set up static directory to serve
app.use(express.static(pub));

app.get('', (req, res)=>{
  res.render('index', {
     title : 'Weather',
     name : 'gianni'
  });
});

app.get('/help', (req, res)=>{
  res.render('help', {
     title : 'Help', 
     name : 'gianni'
  });
});

app.get('/about', (req, res)=>{
  res.render('about', {
     title : 'About',
     name : 'gianni'
  });
});

app.get('/weather', async (req, res) =>{
  if(!req.query.address){
    return res.send('Address must be provided');
  }
  const location = req.query.address;
  const responseGeo = await utils.geocode(location);
  if(!responseGeo.error){
    const responseFore = await utils.forecast(responseGeo.lat,responseGeo.lon);
    if(!responseFore.error){
      res.send({
        forecast : responseFore.weather,
        location : location,
        state : responseFore.country
      });
    }
    else{
      res.send({
        error : responseFore.error
      })
    }

  }
  else{
    res.send({
      error : responseGeo.error
    })
  }

});

app.get('/help/*', (req, res)=>{
  res.render('error', {
    title : '404',
    detail : 'help page not found',
    name : 'gianni'
  });
})

app.get('*', (req, res)=>{
  res.render('error', {
    title : '404',
    detail : 'Page not found',
    name : 'gianni'
  });
})

app.listen(3000, ()=>{
  console.log('Server Up');
});
