function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Server Error :(';
  err.message = res.json({ error: 'Server Error :(' });
}

module.exports = errorHandler;
