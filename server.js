var cdn = require('./index');

cdn.start(process.env.PORT, function (err) {
  if (err) {
    throw err;
  }
});