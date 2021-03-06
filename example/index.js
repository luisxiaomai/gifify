var fs = require('fs');
var gifify = require('../');
var path = require('path');

var input = path.join(__dirname, 'movie.mp4');
var output = path.join(__dirname, 'movie.gif');

var movie = fs.createReadStream(input);
var gif = fs.createWriteStream(output);

var options = {
  resize: '200:-1',
  from: 30,
  to: 35
};

gifify(movie, options, function done(err, gifReadStream) {
  if (err) {
    console.error(err);
    return;
  }

  gifReadStream.pipe(gif);

  gif.on('close', function end() {
    console.log('gifified ' + input + ' to ' + output);
  });
});
