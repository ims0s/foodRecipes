import { mealDetails } from "./mealDetails.js";
export function listAreas (mainRow , loader){
    loader.style.opacity='100%'
    loader.classList.remove('d-none')
    mainRow.innerHTML=``;
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then(res =>res.json())
    .then(data => data.meals)
    .then(areas =>{
        areas.forEach(area =>{
            const {strArea}=area
            mainRow.innerHTML+=`
            <div class="col-md-3">
            <div class="area rounded-3 overflow-hidden position-relative" area="${strArea}">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${strArea}</h3>
            </div>
            `
        }) 
        loader.style.opacity='0'
        setTimeout(()=>loader.classList.add('d-none'),1000)
        let areasList=document.querySelectorAll('.area')
        areaMeals(areasList,mainRow,loader)
    })
}

function areaMeals(areas , mainRow,loader){
    areas.forEach(area => {
        let areaId= area.getAttribute('area')
        area.addEventListener('click',e =>{
            loader.style.opacity="100%"
            loader.classList.remove('d-none')
            mainRow.innerHTML='';
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaId}`)
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