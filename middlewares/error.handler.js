function logErrors (err, req, res, next){
  console.log('logErrors');
  console.error(err);
  next(err);
}

/*Even if you are not using next, it must be set because 
it is the only way that detects that it is a middleware*/
function errorHandler (err, req, res, next){
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}


module.exports = { logErrors, errorHandler };