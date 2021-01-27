

const getRandomMeal = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const randomMeal = await res.json();
    const resData = randomMeal.meals[0];
    console.log(resData)
}

getRandomMeal();

const getMealById = async (id) => {
    const meal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
}

const getMealsBySearch = async () => {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
}
