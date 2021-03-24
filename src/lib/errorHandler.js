export const errorHandler = () => (err, req, res, _) => {
  console.log(err.message, `: ${err.code}`);

  res.status(err.code);
  const response = {
    errors: err.message,
    data: null,
  };
  res.json(response);
  res.end();
};

