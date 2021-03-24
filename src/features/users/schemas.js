const joi = require('joi')
import passwordComplexity from "joi-password-complexity";

const complexityOptions = {
  min: 4,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 5,
};

const username = joi
		.string()
		.min(4)
		.max(12)
		.required()
		.regex(/^[a-zA-Z0-9]*$/)
		.messages({
			'string.base': `'Username' must be a string`,
			'string.min': `'Username' must be longer than 4`,
			'string.max': `'Username' must be a short than 12`,
			'string.requered': `'Username' must requere field`,
			'string.regex': `'Username must have only a digit and leters`
		})

export async function checkAddUser(body) {
	try {
		const result = username.validate(body.username) 
		const checkPassword = passwordComplexity(complexityOptions).validate(body.password)
		if (result.error) return result.error.message
		if (checkPassword.error) {
			let passwordError = ''
			checkPassword.error.details.forEach((v) => {
				switch (v.type) {
					case "passwordComplexity.tooShort": {
						passwordError += "Password too short\n";
						break;
					}
					case "passwordComplexity.uppercase": {
						passwordError += "Password want have one or more uppercase letters\n";
						break;
					}
					case "passwordComplexity.numeric": {
						passwordError += "Password want have one or more digit\n";
						break;
					}
					case "passwordComplexity.tooLong": {
						passwordError += "Password too long - must be shorter than 20\n";
						break;
					}
					case "passwordComplexity.lowercase": {
						passwordError +=  "Password want have one or more lowercase letters\n";
						break;
					}
				}
			})
			if (passwordError !== '') return passwordError
		}
	} catch (e) {
		throw e
	}
}