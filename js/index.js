
let  foodsContainer = document.getElementById('foods-container')
let meals;
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
.then(res =>res.json())
.then(data => data.meals)
.then(meals =>{
    meals.forEach(meal =>{
        foodsContainer.innerHTML+=`
        <div class="col-md-3">
        <div class="meal rounded-3 overflow-hidden position-relative" meal-id="${meal.idMeal}">
            <img class="w-100 " src="${meal.strMealThumb}" alt="food">
            <div class="light-layer">
                            <p class="fs-1 text-black ">${meal.strMeal}</p>
            </div>
        </div>
        `
    })
    meals=document.querySelectorAll('.meal')
})
fetch()
