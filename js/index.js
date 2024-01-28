import { mealDetails } from "./mealDetails.js";
let loader = document.getElementById('loader')
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
    loader.style.opacity='0'
    setTimeout(()=>loader.classList.add('d-none'),1000)
    meals=document.querySelectorAll('.meal')
    mealDetails(meals,foodsContainer,loader)
})

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})