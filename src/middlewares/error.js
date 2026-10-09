// Олдохгүй route хүсэлтэд 404 буцаана
export function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.url
  });
}

// Серверийн дотоод алдааг барина (500)[cite: 48]
export function errorHandler(error, req, res, next) {
  console.error(error);
  res.status(500).json({
    message: "Internal server error"
  });
}