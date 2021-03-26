const { knex } = require('../../lib/connect')
import { ApiError } from '../../lib/apiError'
import { getUser } from '../users'

async function getCategories(user) {
  try {
    await getUser(user)
    const data = await knex('category').where({user}).returning('*')
    return data
  } catch (e) {
    throw e
  }
}

async function addCategory(body) {
  try {
    const existCategory = await knex('category').where({category: body.category, type: body.type}).returning('*')
    if (existCategory.length > 0) throw new ApiError(400, `That's category exist`)
    const existUser = await getUser(body.user)
    if (existUser.length < 1) throw new ApiError(404, 'This is user not exist')
    await knex('category').insert(body)
    const data = await knex('category').where(body).returning('*')
    return data
  } catch (e) {
    throw e
  }
}

async function deleteCategory(uid) {
  try {
    const [isExist] = await knex('category').where({uid}).returning('*')
    if (!isExist) throw new ApiError(404, 'Category not found')
    await knex.from('category').delete().where({uid})
    return await getCategories(isExist.user)
  } catch (e) {
    throw e
  }
}

async function updateCategory(body) {
  try {
    const [existCategory] = await knex('category').where({uid: body.uid}).returning('*')
    if (!existCategory) throw new ApiError(404, 'This category not found')
    await knex('category').update(body).where({uid: body.uid})
    return await knex('category').where({uid: body.uid}).returning('*')
  } catch (e) {
    throw e
  }
}

export { getCategories, addCategory, deleteCategory, updateCategory }