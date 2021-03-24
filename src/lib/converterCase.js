const { camelCase, snakeCase } = require("lodash");

const convertResponse = (response) =>
  Object.entries(response)
    .map(([key, value]) => [camelCase(key), value])
    .reduce((acc, [k, v]) => ((acc[k] = v), acc), {});

const convertIdentifierName = (id) => snakeCase(id);

module.exports = { convertResponse, convertIdentifierName };
