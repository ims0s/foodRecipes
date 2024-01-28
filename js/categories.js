import { mealDetails } from "./mealDetails.js";
export function listCategories (mainRow , loader){
    loader.style.opacity='100%'
    loader.classList.remove('d-none')
    mainRow.innerHTML=``;
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res =>res.json())
    .then(data => data.categories)
    .then(categories =>{
        categories.forEach(category =>{
            
            const {strCategory,strCategoryThumb,strCategoryDescription}=category
            mainRow.innerHTML+=`
            <div class="col-md-3">
            <div class="category rounded-3 overflow-hidden position-relative" category="${strCategory}">
                <img class="w-100 " src="${strCategoryThumb}" alt="food">
                <div class="light-layer">
                        <h3>${strCategory}</h3>
                        <p class=" text-black ">${strCategoryDescription}</p>
                </div>
            </div>
            `
        }) 
        loader.style.opacity='0'
        setTimeout(()=>loader.classList.add('d-none'),1000)
        let categoriesList=document.querySelectorAll('.category')
        categoryMeals(categoriesList,mainRow,loader)
    })
}

function categoryMeals(categories , mainRow,loader){
    categories.forEach(category => {
        let categoryId= category.getAttribute('category')
        category.addEventListener('click',e =>{
            loader.style.opacity="100%"
            loader.classList.remove('d-none')
            mainRow.innerHTML='';
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`)
            .then(res =>res.json())
            .then(data => data.meals)
            .then(meals =>{
                meals.forEach(meal =>{
                    mainRow.innerHTML+=`
                    <div class="col-md-3">
                    <div class="meal rounded-3 overflow-hidden position-relative" meal-id="${meal.idMeal}">
                        <img class="w-100 " src="${meal.strMealThumb}" alt="food">
                        <div class="light-layer">
                                        <p class="fs-4 text-black ">${meal.strMeal}</p>
                        </div>
                    </div>
                    `
                }) 
                loader.style.opacity='0'
                setTimeout(()=>loader.classList.add('d-none'),1000)
                let mealsList=document.querySelectorAll('.meal')
                mealDetails(mealsList,mainRow,loader)
            })
            
        })
    })
}