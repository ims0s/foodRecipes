import { mealDetails } from "./mealDetails.js";
export function listIngredients (mainRow , loader){
    loader.style.opacity='100%'
    loader.classList.remove('d-none')
    mainRow.innerHTML=``;
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then(res =>res.json())
    .then(data => data.meals)
    .then(ingredients =>{
        ingredients.forEach(ingredient =>{
            const {strIngredient,strDescription}=ingredient
            mainRow.innerHTML+=`
            <div class="col-md-3">
            <div class="ingredient rounded-3 overflow-hidden position-relative" ingredient="${strIngredient}">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${strIngredient}</h3>
                <p>${strDescription}</p>
            </div>
            `
        }) 
        loader.style.opacity='0'
        setTimeout(()=>loader.classList.add('d-none'),1000)
        let ingredientsList=document.querySelectorAll('.ingredient')
        ingredientMeals(ingredientsList,mainRow,loader)
    })
}

function ingredientMeals(ingredients , mainRow,loader){
    ingredients.forEach(ingredient => {
        let ingredientId= ingredient.getAttribute('ingredient')
        ingredient.addEventListener('click',e =>{
            loader.style.opacity="100%"
            loader.classList.remove('d-none')
            mainRow.innerHTML='';
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientId}`)
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