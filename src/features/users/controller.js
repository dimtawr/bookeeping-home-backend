const { knex } = require('../../lib/connect')
import { ApiError } from '../../lib/apiError'
import bcrypt from "bcrypt";
const jwt = require("njwt");

export async function getUsers() {
	try {
		const data = await knex.select().from('users').returning()
		data.forEach(element => {
			delete element.password
		});
		return data
	} catch (e) {
		throw e
	}
}

export async function getUser(uid) {
	try {
		console.log(`Get user with uid: ${uid}`)
		const data = await knex('users').select(['uid', 'username']).where({uid})
			.returning(['uid', 'username'])
		if (data.length > 0) return data
		throw new ApiError(404, 'That user(s) not exist')
	} catch (e) {
			throw e
	}
}

export async function addUser(body) {
	try {
		console.log(`Add new user \n`, body)
		if (body.password !== body.confirmPassword) 
			throw new ApiError(400, 'Password and confirmation do not match')

		delete body.confirmPassword;
		const checkExistUsername = await knex('users').select('username')
			.where({username: body.username})
		
		if (checkExistUsername.length > 0) 
			throw new ApiError(400, 'This login already exist')

		const data = await knex('users').insert({
			...body, 
			password: await bcrypt.hash(body.password, 1)
		}).returning(['uid', 'username'])
		console.log(`Success`)
		return data
	}	catch (e) {
		throw e
	}
}

export async function logInUser(body) {
	try {
		if (!body.username || !body.password)
			throw new ApiError(400, `Fields 'Username' and 'Password' can not be a empty`)
		console.log(`Login user ${body.username}`)
		const [user] = await knex.select().from('users')
			.where(knex.raw('LOWER("username") = ?', body.username));
		const hashMatches = await bcrypt.compare(body.password, user.password)
		if (user.length === 0 || !hashMatches) 
			throw new ApiError(400, 'Incorrect username or password')
		const token = await generateToken(user.uid)
		return {uid: user.uid, username: user.username, token}
	} catch (e) {
		throw e
	}
}

const generateToken = async (sub) => {
	const token = jwt.create({ sub }, "bookkeeping-hard-password").setExpiration(null);
	return token.compact();
};