var fs = require('fs');
var svg2img = require('svg2img');
var path = require('path');
var btoa = require('btoa');

async function convertToImage({name, svg}, callback) {
    return new Promise((resolve, reject) => {
        svg2img(svg, {format:'png','quality':100}, function(error, buffer) {
            const fileName = `${name || 'foo5'}_${new Date().getTime()}.jpg`;
            const filePath = path.join(__dirname,'../uploaded/', fileName);

            fs.writeFileSync(filePath, buffer);
            if(!error){
                console.log("Uploaded to " + filePath);
                resolve({status: true, path: fileName});
            }else{
                reject({error});
            }
        });
    });

}

module.exports = {
    convertToImage
}

