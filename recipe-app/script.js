const mealsElement = document.getElementById("meals-wrapper");
const favouriteContainer = document.getElementById("favourite-wrapper");

async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

getRandomMeal();

async function getMealById(id) {
    const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );

    const response = await res.json();
    const meal = response.meals[0];
    return meal;
}

async function getMealsBySearch(term) {
    const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );

}

function addMeal(mealData, random = false) {
    console.log(mealData);

    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${random
            ? `
            <span class="random"> Random Recipe </span>`
            : ""
        }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealLocaleStorage(mealData.idMeal);
            btn.classList.remove("active");
        } else {
            addMealLocalStorage(mealData.idMeal);
            btn.classList.add("active");
        }
        
        fetchFavouriteMeals();
    });

    mealsElement.appendChild(meal);
}

const addMealLocalStorage = (mealIds) => {
    const mealsIds = getMealsLocalStorage();

    localStorage.setItem('mealIds', JSON.stringify([...mealsIds, mealIds]));
}

const removeMealLocaleStorage = (mealId) => {
    const mealsIds = getMealsLocalStorage();

    localStorage.setItem('mealIds', JSON.stringify(mealsIds.filter(id => id !== mealId)))
}

const getMealsLocalStorage = () => {
    const mealsIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealsIds === null ? [] : mealsIds;
}

const fetchFavouriteMeals = async () => {
    favouriteContainer.innerHTML = "";

    const mealIds = getMealsLocalStorage();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        addFavouriteMeal(meal);
    }
}

fetchFavouriteMeals();

function addFavouriteMeal(mealData) {
    
    const favouriteMeal = document.createElement("li");

    favouriteMeal.innerHTML = `
        <img 
            alt="${mealData.strMeal}" 
            src="${mealData.strMealThumb}">
        <span>${mealData.strMeal}</span>
        <button class="close-button"><i class="fas fa-times"></i></button>
    `;

    const btn = favouriteMeal.querySelector('.close-button');

    btn.addEventListener('click', () => {
        removeMealLocaleStorage(mealData.idMeal);

        fetchFavouriteMeals();
    })

    favouriteContainer.appendChild(favouriteMeal);
}