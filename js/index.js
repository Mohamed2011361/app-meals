let mealData = document.getElementById('mealData');
let searchContainer=document.getElementById('searchContainer');
let submitBtn;
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
function openSlide() {
    $('.slide-menu').animate({
        left: 0

    }, 500)
    $('.open-close-nav').removeClass("fa-align-justify");
    $('.open-close-nav').addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".nav-links li").eq(i).animate({       //equal index li 
            top: 0
        }, (i + 5) * 100)
    }
}
function closeSlide() {
    let navWith = $('.slide-menu .nav-slide').outerWidth();
    $('.slide-menu').animate({
        left: -navWith

    }, 500)
    $('.open-close-nav').addClass("fa-align-justify");
    $('.open-close-nav').removeClass("fa-x");
    $(".nav-links li").animate({
        top: 300
    }, 500)}


closeSlide();
$('.slide-menu i.open-close-nav').click(() => {
    if ($('.slide-menu').css("left") == "0px") {
        closeSlide();
    }
    else {
        openSlide();

    }
})

// ===========================================category=============================================
// =================================================================================================
function displayCategory(arr) {
    let boxData = "";

    for (let i = 0; i < arr.length; i++) {
        boxData += `<div class="col-md-3">
                         <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative rounded-2 overflow-hidden cursor">
                         <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">

                         <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                         </div>
                         </div>  
                    </div>`

    }
    mealData.innerHTML = boxData;

}
async function getCategory() {
    mealData.innerHTML = "";
    $('.loading-screen').fadeIn(300);
    searchContainer.innerHTML = "";

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const responsCategory = await response.json();
    console.log(responsCategory.categories); // cheeck category
    displayCategory(responsCategory.categories);
    $('.loading-screen').fadeOut(300);
}
// =========================================categorys meals========================================
// =================================================================================================
function displayMeals(arr) {
    let boxData = ""
    for (let i = 0; i < arr.length; i++) {
        boxData += `<div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative rounded-2 overflow-hidden cursor">
                <img src="${arr[i].strMealThumb}" class="w-100" alt="">

                <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${arr[i].strMeal}</h3>
                
                </div>
                </div>  
            </div>`
    }
    mealData.innerHTML = boxData;

}

async function getCategoryMeals(category) {
      
    $('.loading-screen').fadeIn(300);
    
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const responsCategory = await response.json();
    displayMeals(responsCategory.meals.slice(0, 20))
    $('.loading-screen').fadeOut(300);
}

// =========================================mealsDetails=============================================
// ==================================================================================================

async function getMealDetails(idMeal) {   
    closeSlide();
    mealData.innerHTML="";
    $('.loading-screen').fadeIn(300);
    searchContainer.innerHTML = "";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const responseGetMealDetails = await response.json();
    displayMealsDetails(responseGetMealDetails.meals[0])
    $('.loading-screen').fadeOut(300);
}


function displayMealsDetails(meal) {
    searchContainer.innerHTML = "";
    let Ingredient = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            Ingredient += `<li class="alert alert-info m-2 p-1" >${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) tags = [];
    let boxtags = ""
    for (let i = 0; i < tags.length; i++) {
        boxtags += `<a class="alert alert-danger m-2 p-1">${tags[i]}</a>`

    }

    let BoxMealDetails = `
                 <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${meal.strMealThumb}"  alt="meal">
                    <h3>${meal.strMeal}</h3>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bold" >Area :</span> ${meal.strArea}</h3>
                    <h3><span class="fw-bold" >Category :</span> ${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="d-flex flex-wrap list-unstyled g-3">
                    ${Ingredient}

                    </ul>
                    <h3>Tags :</h3>
                    <ul>
                    <li class="list-unstyled"> ${boxtags}</li>
                    </ul>
                    <a target="_blank" href="${meal.strSource}" class="btn btn-success ">Source</a>
                    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger ">Youtube</a>
                </div> `
    mealData.innerHTML = BoxMealDetails;


}
// ========================================== AreaMeals ==========================================
//================================================================================================
async function getAreaMeals(area) {
    mealData.innerHTML="";
    $('.loading-screen').fadeIn(300);
    searchContainer.innerHTML = "";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    const displayAreaData =await response.json();

    displayMeals(displayAreaData.meals.slice(0,20));
    $('.loading-screen').fadeOut(300);

}


function displayArea(arr) {
    mealData.innerHTML="";
    let BoxArea = "";
    for (let i = 0; i < arr.length; i++) {
        BoxArea += `    <div class="col-md-3">
                           <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor">
                              <i class="fa-solid fa-house-laptop fa-4x"></i>
                               <h3>${arr[i].strArea}</h3>
                           </div>
                        </div>`
    }
    mealData.innerHTML=BoxArea;

}
async function getArea(){
    mealData.innerHTML="";
    $('.loading-screen').fadeIn(300);
    searchContainer.innerHTML = "";
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const getAreaData=await response.json();
    console.log(getAreaData.meals);
    displayArea(getAreaData.meals);
    $('.loading-screen').fadeOut(300);
    

}

// =============================================ingredents=========================================
// ================================================================================================

async function getIngredients(){
    
    $('.loading-screen').fadeIn(300);
    searchContainer.innerHTML = "";
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const getIngredientData=await response.json();
    console.log(getIngredientData)
    displayIngredient(getIngredientData.meals.slice(0,20));

    $('.loading-screen').fadeOut(300);

}
function displayIngredient(arr){
   
    let boxIngredient="";
    for (let i = 0 ; i <arr.length; i++){
        boxIngredient += `<div  class="col-md-3"> 
                                <div onclick="getIngredientMeal('${arr[i].strIngredient}')"       class="rounded-2 text-center cursor">
                                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                    <h3>${arr[i].strIngredient}</h3>
                                    <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                                </div>               
                          </div>`

    }
    mealData.innerHTML=boxIngredient;

}
async function getIngredientMeal(meal){
   
    $('.loading-screen').fadeIn(300);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
    const ingredientMealData=await response.json();
    displayMeals(ingredientMealData.meals.slice(0,20));
    $('.loading-screen').fadeOut(300);
}

// ===============================================contact======================================
// ===============================================================================================
function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    mealData.innerHTML = ""
}
async function searchByName(term) {
    closeSlide();
    mealData.innerHTML = ""
    $('.loading-screen').fadeIn(300);

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    const searchNameData = await response.json()

    searchNameData.meals ? displayMeals(searchNameData.meals) : displayMeals([])
    $('.loading-screen').fadeOut(300);

}

async function searchByFLetter(term) {
    closeSlide();
    mealData.innerHTML = ""
    $('.loading-screen').fadeIn(300);

    term == "" ? term = "a" : "";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
   const searchLetterData = await response.json()

    response.meals ? displayMeals(searchLetterData .meals) : displayMeals([])
    $('.loading-screen').fadeOut(300);

}

function showContacts() {
    mealData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
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
   

submitBtn = document.getElementById("submitBtn");
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputClick = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputClick = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputClick = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputClick = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputClick = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputClick = true
    })
}
// ===========================================validation=============================================
// ==================================================================================================

function inputsValidation() {
    if (nameInputClick) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputClick) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputClick) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputClick) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputClick) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputClick) {
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








