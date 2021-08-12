
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const svgConverter = require('./svgConverter');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use(pino);

app.post('/api/draw', async (req, res) => {
  const {img, name} = req.body;

  const uploaded = await svgConverter.convertToImage({name, svg: img});

  res.setHeader('Content-Type', 'application/json');
  if(uploaded.status === true){
    res.send({ response: "SUCCESS", next: '/payment', image: uploaded.path  });
  }else{
      res.status(500).send('Error', uploaded.error);
  }
});

app.get('/api/image-preview', (req, res) => {
    const {image} = req.query;

    try {
        res.sendFile( path.join(__dirname,'../uploaded/', image))
    }catch(e){
        res.status(500).send("Could not find image\n\n" + e.toString())
    }
})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);