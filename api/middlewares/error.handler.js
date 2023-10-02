function logErrors (err, req, res, next){
  next(err);
}

/*Even if you are not using next, it must be set because 
it is the only way that detects that it is a middleware*/
function errorHandler (err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler (err, req, res, next){
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else {
    next(err);
  }
}


module.exports = { logErrors, errorHandler, boomErrorHandler };