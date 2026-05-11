const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;

    message = "Duplicate data found";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;