// var fs = require('fs');
// var svg2img = require('svg2img');
// var btoa = require('btoa');

async function convertToImage({name, svg}) {

    const req = await fetch('/api/draw', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        mode: 'cors',
        body: JSON.stringify({
            name,
            img: svg
        })
    });

    return await req.json();

    // console.log(resp);

    // let svgString = svg;
    // if(typeof(svg) !== 'string' && svg.innerHTML){
    //     svgString = svg.innerHTML;
    // }

    // svg2img(svgString, function(error, buffer) {
    //     //returns a Buffer
    //     fs.writeFileSync('foo1.png', buffer);
    // });
}

export { convertToImage }