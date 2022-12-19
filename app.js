function displayRandomMeal(res){
    document.querySelector(".random-title").innerHTML = res.data.meals[0].strMeal;
    document.querySelector(".random-image").src = res.data.meals[0].strMealThumb;
    document.querySelector(".random-meal-info p").innerHTML = res.data.meals[0].strArea + ", " + res.data.meals[0].strCategory;
    document.querySelector(".random-section button").addEventListener("click", function(){
        DisplayIngredients(res.data.meals[0].idMeal);
    });
}

function HandleSubmit() {
    let searchItem = document.querySelector(".search-input").value;
    document.querySelector(".meals-section").classList.remove("na");
    let container = document.querySelector(".meals-container");
    container.innerHTML = "";

    axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + searchItem)
    .then((res) => {
        if(res.data.meals != null) {
            res.data.meals.forEach(meal => {
                container.innerHTML += `<div class="meal-card" onclick="DisplayIngredients(${meal.idMeal})">
                                <div class="meal-image" style="background:url('${meal.strMealThumb}'); background-size: cover"></div>
                                <h3>${meal.strMeal}</h3>
                            </div>`
            });
        } else {
            container.innerHTML = "<h2>No results found.</h2>"
        }
    })
    .catch((err) => console.log(err));
}

function DisplayIngredients(id) {
    axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then((res) => {
            document.querySelector(".ing-container").classList.remove("na");
            document.querySelector(".ing-container p").innerHTML = res.data.meals[0].strMeal;
            document.querySelector(".ing-list").innerHTML = "";
            for(i = 1; i <= 20; i++){
                let ing = "strIngredient" + i;
                if(res.data.meals[0][ing] != "" || res.data.meals[0][ing] != "null"){
                    document.querySelector(".ing-list").innerHTML += `<li>${res.data.meals[0][ing]}</li>`;
                }
            }
        })
        .catch((err) => console.log(err))
}

function CloseButton() {
    document.querySelector(".ing-container").classList.add("na");
}

axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => {
        displayRandomMeal(res);
    });