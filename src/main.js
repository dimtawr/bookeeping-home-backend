import { ApiError } from "./lib/apiError";
import { errorHandler } from "./lib/errorHandler";
import { respondWith } from "./lib/respond";
const express = require("express");
const router = express();
const cors = require("cors");

export function application(config) {
  console.log(`Start ${config.appMeta.name} v${config.appMeta.version}`)
	
	router.use(cors())
	router.listen(config.NODE_PORT, config.NODE_HOST)
	router.use(respondWith);

	router.use('/users', require('./features/users').router)
	router.use('/category', require('./features/category').router)

	router.use((_, __, next) =>
		next(new ApiError(404, "Route not found", null))
	);
	router.use(errorHandler())
} 