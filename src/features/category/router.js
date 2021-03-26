const expres = require('express')
import { ApiError } from '../../lib/apiError';
import { addCategory, deleteCategory, getCategories, updateCategory } from './controller';
import { categoryValid } from './schemas'
const bodyParser = require("body-parser");

const router = expres.Router()
router.use(bodyParser.json())

router.get('/:id', async (req, res, next) => {
  try {
		return res.respondWith(await getCategories(req.params.id))
	} catch (e) {
		return next(e)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const isValid = await categoryValid(req.body)
		if (isValid) throw new ApiError(400, isValid.message)
		return res.respondWith(await addCategory(req.body))
	} catch (e) {
		return next(e)
	}
})

router.post('/update', async (req, res, next) => {
	try {
		const isValid = await categoryValid(req.body)
		if (isValid) throw new ApiError(400, isValid.message)
		return 	res.respondWith(await updateCategory(req.body))
	} catch (e) {
		throw e
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		return res.respondWith(await deleteCategory(req.params.id))
	} catch (e) {
		return next(e)
	}
})

export { router }