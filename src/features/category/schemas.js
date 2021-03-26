import joi from 'joi'

const categorySchema = joi.object({
  category: joi
		.string()
		.required()
		.min(3)
		.max(64)
		.messages({
			'any.required' : `'Category' must exist`,
			'string.base' : `'Category must be a string`,
			'string.min' : `'Category' must be longer than 3`,
			'string.max' : `'Category' must shorter than 64`
		}),
	
	type: joi
		.string()
		.required()
		.valid('incom', 'expense')
		.messages({
			'string.base' : `'Type' must be a string`,
			'any.required' : `'Type' must exist`,
			'any.only' : `'Type' want be 'incom' or 'expense'`
		}),
	
	user : joi
		.string()
		.guid()
		.required()
		.messages({
			'string.base' : `'User' must be a string`,
			'string.guid' : `'User' type want be a GUID`,
			'any.required' : `'User' must exist`
		})
})

export async function categoryValid(body) {
	try {
		const result = categorySchema.validate(body)
		console.log(result.error)
		return result.error
	} catch (e) {
		throw e
	}
}