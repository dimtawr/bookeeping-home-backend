const pkg = require("../../package.json");
import fs from 'fs'

export function createConfig() {
	if (fs.existsSync('.env')) {
		let config = fs.readFileSync('.env', 'utf8', (err, data) => {
			if (err) throw new Error('Error read .env file:', err)
			return data
		})
		config = parsingConfig(config)
		checkingExistFields(config)
		config.appMeta = {
			name: pkg.name,
			version: pkg.version
		}
	return config
	} else throw new Error(`Application cannot be launched, dotenv file does not exist`)
}

function parsingConfig(config) {
	const configsArray = config.match(/^..*/gm)
		.map(element => {
			element = element.match(/(.*)=(.*)/)
			return element = {[element[1]] : element[2]}
	})
	const configObject = {}
	configsArray.map(element => {
		configObject[Object.keys(element)] = Object.values(element)[0]
	})
	return configObject 
}

function checkingExistFields(data) {
	if (data.DB_HOST) 
		console.log('Database host exist...') 
	else throw  new Error(`.env must have DB_HOST param`)
	if (data.DB_USER)
		console.log(`Database user exist...`)
	else throw  new Error(`.env must have DB_USER param`)
	if (data.DB_PASSWORD)
		console.log(`Geting password to database...`)
	else throw new Error(`.env must have DB_PASSWORD param`)
	if (data.DB_DATABASE)
		console.log(`Geting database name...`)
	else throw new Error(`.env must have DB_DATABASE param`)
	if (data.DB_CLIENT)
		console.log(`Use database client: ${data.DB_CLIENT}`)
	else throw new Error(`.env must have DB_CLIENT param`)
	if (data.NODE_HOST)
		console.log(`Server started on ${data.NODE_HOST}`)	
	else throw new Error(`.env must have NODE_HOST param`)
	if (data.NODE_PORT)
		console.log(`Use port: ${data.NODE_PORT}`)
	else throw new Error(`.env must have NODE_PORT param`)
}