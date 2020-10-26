function notFoundHandler(req, res, next) {
  res.statusMessage = 'Resource not found';
  res.status(404).json({ error: 'Page Not Found' });
}

module.exports = notFoundHandler;
