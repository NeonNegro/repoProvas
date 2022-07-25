import * as categoryRepository from '../repositories/categoryRepository.js';


async function getCategories(){
    return await categoryRepository.getAllCategories();
}


const categoryService = {
    getCategories,
}

export default categoryService;