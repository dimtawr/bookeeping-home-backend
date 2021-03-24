const expres = require('express')
import { ApiError } from '../../lib/apiError';
import { addUser, getUser, getUsers, logInUser } from './controller';
import { checkAddUser } from './schemas';
const bodyParser = require("body-parser");

const router = expres.Router()
router.use(bodyParser.json())

router.get('/', async (req, res, next) => {
	try {
		return res.respondWith(await getUsers())
	} catch (e) {
		return next(e)
	}
})

router.get('/:id', async(req, res, next) => {
	try {
		return res.respondWith(await getUser(req.params.id))
	} catch (e) {
		return next(e)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const validateFields = await checkAddUser(req.body)
		if (validateFields) throw new ApiError(400, validateFields)
		return res.respondWith(await addUser(req.body))
	} catch (e) {
		return next(e)
	}
})

router.post('/auth', async (req, res, next) => {
	try {
		return res.respondWith(await logInUser(req.body))
	} catch (e) {
		return next(e)
	}
})

module.exports = {router}