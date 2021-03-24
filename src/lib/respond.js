export const respondWith = (req, res, next) => {
  res.respondWith = (data = {}, statusCode = 200) => {
    res.status(statusCode);
    return res.json({ errors: [], data });
  };
  next();
};
