import { createConfig } from './lib/createConfiguration'
import { application } from './main';
require("dotenv").config(".env");

function main () {
	const config = createConfig()
	application(config);
}

main();