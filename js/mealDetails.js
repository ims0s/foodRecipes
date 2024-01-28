export function mealDetails(mealsList , mainRow,loader){
    mealsList.forEach(element => {
        let mealId= element.getAttribute('meal-id')
        element.addEventListener('click' , e =>{
            loader.style.opacity="100%"
            loader.classList.remove('d-none')
            mainRow.innerHTML=''
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(res =>res.json())
            .then(data =>data.meals[0])
            .then(meal =>{
                let ingrediants=``;
                for(let i =1;i<=20;i++){
                    if(meal[`strIngredient${i}`]){
                        ingrediants+=`<span class="ingrediant rounded-3 py-1 px-2   ">${meal[`strIngredient${i}`]} ${meal[`strMeasure${i}`]}</span>`
                    }
                }

                let tags=``

                if(meal.strTags){

                    if(meal.strTags.includes(',')){

                        let tagsArray=meal.strTags.split(',')
                        console.log(tagsArray)

                        for(let i =0 ; i<tagsArray.length ; i++){
                            tags+=`<span class="tag rounded-3 py-1 px-2 ">${tagsArray[i]}</span>`;
                            
                        }

                    }else{

                        tags+=`<span class="tag rounded-3 py-1 px-2 ">${meal.strTags}</span>`;

                    }
                }
                // console.log(meal.strTags)
                console.log(tags)
                mainRow.innerHTML=`
                <div class="col-md-4">
                    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3 ">
                    <h3 class="text-white ">${meal.strMeal}</h3>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3>Area : <span>${meal.strArea}</span></h3>
                    <h3>Category : <span>${meal.strCategory}</span></h3>
                    <h3>Recipes : </h3>
                    <div class="recipes w-100 d-flex flex-wrap gap-4  py-3 ">
                        ${ingrediants}
                    </div>
                    <h3>Tags: </h3>
                    <div class="tags w-100 d-flex flex-wrap gap-4  py-3 ">
                    ${tags}
                </div>
                <button class="btn btn-success ">Source</button>
                <button class="btn btn-danger ">Youtube</button>
                `
                loader.style.opacity='0'
                setTimeout(()=>loader.classList.add('d-none'),1000)
            })
        })
        
    });
}

