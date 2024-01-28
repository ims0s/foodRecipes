import { mealDetails } from "./mealDetails.js";
import { listCategories } from "./categories.js";
import { listAreas } from "./areas.js";
import { listIngredients } from "./ingrediants.js";
import { searchPage } from "./search.js";
let loader = document.getElementById('loader')
let  foodsContainer = document.getElementById('foods-container')
let searchField= document.querySelector('.search-inputs')
let meals;
let searchTimeout;
hideSearchField();
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
                            <p class="fs-4 text-black ">${meal.strMeal}</p>
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


document.getElementById('search-page').addEventListener('click',()=>{
    searchPage(foodsContainer,searchField);
    closeSideNav();
})

document.getElementById('categories-page').addEventListener('click',e=>{
    listCategories(foodsContainer,loader)
    closeSideNav()
    hideSearchField();
})

document.getElementById('areas-page').addEventListener('click',()=>{
    listAreas(foodsContainer,loader);
    closeSideNav();
    hideSearchField();
})

document.getElementById('ingrediants-page').addEventListener('click',()=>{
    listIngredients(foodsContainer,loader)
    closeSideNav();
    hideSearchField();
})

document.getElementById('contact-page').addEventListener('click',()=>{
    showContacts();
    closeSideNav();
    hideSearchField();
})

function hideSearchField(){
    searchField.classList.add('d-none')
}


document.getElementById('name-search').addEventListener('input',(e)=>{
    foodsContainer.innerHTML=``
    clearTimeout(searchTimeout)
    searchTimeout=setTimeout(()=>{
        if(e.target.value){
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`)
            .then(res=>res.json())
            .then(data => data.meals)
            .then(meals =>{
                meals.forEach(meal =>{
                    foodsContainer.innerHTML+=`
                    <div class="col-md-3">
                    <div class="meal rounded-3 overflow-hidden position-relative" meal-id="${meal.idMeal}">
                        <img class="w-100 " src="${meal.strMealThumb}" alt="food">
                        <div class="light-layer">
                                        <p class="fs-4 text-black ">${meal.strMeal}</p>
                        </div>
                    </div>
                    `
                }) 
                meals=document.querySelectorAll('.meal')
                mealDetails(meals,foodsContainer,loader)
            })
        }
    },1000)
})

document.getElementById('first-search').addEventListener('input',(e)=>{
    foodsContainer.innerHTML=``
    clearTimeout(searchTimeout)
    searchTimeout=setTimeout(()=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${e.target.value}`)
        .then(res=>res.json())
        .then(data => data.meals)
        .then(meals =>{
            meals.forEach(meal =>{
                foodsContainer.innerHTML+=`
                <div class="col-md-3">
                <div class="meal rounded-3 overflow-hidden position-relative" meal-id="${meal.idMeal}">
                    <img class="w-100 " src="${meal.strMealThumb}" alt="food">
                    <div class="light-layer">
                                    <p class="fs-4 text-black ">${meal.strMeal}</p>
                    </div>
                </div>
                `
            }) 
            meals=document.querySelectorAll('.meal')
            mealDetails(meals,foodsContainer,loader)
        })
    },1000)
})

function showContacts() {
    foodsContainer.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}