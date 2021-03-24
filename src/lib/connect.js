const { convertResponse, convertIdentifierName } = require("./converterCase");
const knex = require("knex")({
  client: 'postgres',

  connection: async () => {
    return {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      timezone: process.env.TIMEZONE,
    };
  },

  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      return result.map((row) => convertResponse(row));
    } else {
      return convertResponse(result);
    }
  },

  wrapIdentifier: (value, origImpl, queryContext) =>
    origImpl(convertIdentifierName(value)),
});

module.exports = { knex };
