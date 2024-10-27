
let data = document.getElementById("data")
let searchContainer = document.getElementById("searchContainer")
let buttonSubmit = document.getElementById("buttonSubmit")



function openNav() {
    let boxWidth = $(".side-nav .nav-tab").outerWidth();
    
    $(".side-nav").animate({
        left: 0
    }, 500);
    
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    
    for (let i = 0; i < $(".links ul li").length; i++) {
        $(".links ul li").eq(i).animate({
            top: 0
        }, 500 + i * 50); 
    }
}

function closeNav() {
    let boxWidth = $(".side-nav .nav-tab").outerWidth();
    
    $(".side-nav").animate({
        left: -boxWidth
    }, 500);
    
    $(".open-close-icon").removeClass("fa-x");

    $(".open-close-icon").addClass("fa-align-justify");
    
    $(".links ul li").animate({
        top: 300
    }, 500);
}

closeNav();

$(".side-nav i.open-close-icon").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeNav();

    } else {
        openNav();  

    }
});


function displayMeals(arr) {
    if (!arr || arr.length === 0) {
        data.innerHTML = "<p>No meals found.</p>";
        return;
    }

    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
            <div onclick="mealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex flex-column align-items-center text-black">
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    }

    data.innerHTML = box;
}



searchByName("")



async function getCategory(){
    searchContainer.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
response = await response.json()
console.log(response.categories);

displayCategory(response.categories)

}



function displayCategory(arr){
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getCategoryFilter('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
        </div>
        `
        
    } 
    
    data.innerHTML = box 
}


async function area(){
    searchContainer.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
response = await response.json()
console.log(response.meals);

displayArea(response.meals);
}


function displayArea(arr){
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
<div class="col-md-3 mb-3 text-center">
    <div onclick="getAreaFilter('${arr[i].strArea}')" class="rounded-3 py-2">
<i class="fa-solid fa-earth-oceania fa-2x"></i>       
<h3>${arr[i].strArea}</h3>
    </div>
</div>

        `
        
    } 
    
    data.innerHTML = box 
}


async function ingredients(){
    searchContainer.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
response = await response.json()
console.log(response.meals);

displayIngrediant(response.meals);
}


function displayIngrediant(arr){
    let box = "";
    for (let i = 0; i < arr.length; i++) {
        box += `
<div class="col-md-3 mb-3 text-center cursor-pointer">
    <div onclick="getIngredientFilter('${arr[i].strIngredient}')" class="rounded-3 py-2">
<i class="fa-solid fa-bowl-food fa-2x"></i>
<h3>${arr[i].strIngredient}</h3>
<p>${arr[i].strDescription.split(" ").splice(0,10).join(" ")}</p>
    </div>
</div>`

            
    } 
    
    data.innerHTML = box 
}

async function getCategoryFilter(category) {
    data.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals)
    }


// function displayMeals(arr) {

//     let box = "";
//     for (let i = 0; i < arr.length; i++) {
//         box += `
//         <div class="col-md-3">
//             <div class="meal position-relative overflow-hidden rounded-2">
//                 <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
//                 <div class="meal-layer position-absolute text-center text-black p-2">
//                     <h3>${arr[i].strMeal}</h3>
//                     <p>${arr[i].strArea}</p>
//                 </div>
//             </div>
//         </div>
//         `;
//     }

//     searchBox.innerHTML = box;
// }



async function getAreaFilter(area) {

    data.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals)
    }



    async function getIngredientFilter(ingredient) {
        data.innerHTML = ""
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        response = await response.json()
    
    
        displayMeals(response.meals)
        }



async function mealDetails(mealID) {
    searchContainer.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json();
    
    displayDetails(response.meals[0])

}



function displayDetails(meal) { 
    console.log(meal);
    
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = "";
    if (meal.strTags) {
        tags = meal.strTags.split(",").map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join("");
    }

    let box = `        
        <div class="col-md-4">
            <img class="w-100 rounded" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bold">Area:</span> ${meal.strArea}</h3>
            <h3><span class="fw-bold">Category:</span> ${meal.strCategory}</h3>
            <h3>Recipes:</h3>
            <ul class="d-flex flex-wrap list-unstyled">${ingredients}</ul>
            ${tags ? `<h3>Tags:</h3><ul class="d-flex flex-wrap list-unstyled">${tags}</ul>` : ""}
            <a href="${meal.strSource}" target="_blank" class="btn btn-danger">Source</a>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">YouTube</a>
        </div>`;

    data.innerHTML = box;
}


function searchCategory() {
    searchContainer.innerHTML = `
    <div class="row py-5">
        <div class="col-md-6">
            <input oninput="searchByName(this.value)" type="text" class="form-control" placeholder="Search by NAME">
        </div>
        <div class="col-md-6">
            <input oninput="searchByLitter(this.value)"maxlenght="1" type="text" class="form-control" placeholder="Search BY LETTER">
        </div>
    </div>`;
    data.innerHTML = "";
}

async function searchByName(term) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();

    displayMeals(response.meals);
}

async function searchByLitter(term) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();
    displayMeals(response.meals);
}


// contact us//
function contact() {
    data.innerHTML = `
<div class="row py-5">
    <div class="contact-us min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-50 text-center">
            <div class="row g-6">
                <div class="col-md-6 py-4">
                    <input id="nameId" onkeyup="validation()" type="text" class="form-control" placeholder="Name">
                    <div id="nameAlert" class="alert alert-danger w-100 d-none" style="background-color: #f8d7da; border-color: #f5c6cb;">
                        <strong>Error:</strong> Write your name!
                    </div>
                </div>
                <div class="col-md-6 py-4">
                    <input id="emailId" onkeyup="validation()" type="email" class="form-control" placeholder="Email">
                    <div id="emailAlert" class="alert alert-danger w-100 d-none" style="background-color: #f8d7da; border-color: #f5c6cb;">
                        <strong>Error:</strong> Enter a valid email!
                    </div>
                </div>
                <div class="col-md-6 py-4">
                    <input id="phoneId" onkeyup="validation()" type="number" class="form-control" placeholder="Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 d-none" style="background-color: #f8d7da; border-color: #f5c6cb;">
                        <strong>Error:</strong> Write a valid phone number!
                    </div>
                </div>
                <div class="col-md-6 py-4">
                    <input id="ageId" onkeyup="validation()" type="number" class="form-control" placeholder="Age">
                    <div id="ageAlert" class="alert alert-danger w-100 d-none" style="background-color: #f8d7da; border-color: #f5c6cb;">
                        <strong>Error:</strong> Write your age!
                    </div>
                </div>
                <div class="col-md-6 py-4">
                    <input id="passwordId" onkeyup="validation()" type="password" class="form-control" placeholder="Password">
                    <div id="passAlert" class="alert alert-danger w-100 d-none" style="background-color: #f8d7da; border-color: #f5c6cb;">
                        <strong>Error:</strong> Write a correct password!
                    </div>
                </div>
                <div class="col-md-6 py-4">
                    <input id="repasswordId" onkeyup="validation()" type="password" class="form-control" placeholder="Re-enter Password">
                    <div id="repassAlert" class="alert alert-danger w-100 d-none" style="background-color: #f8d7da; border-color: #f5c6cb;">
                        <strong>Error:</strong> Passwords do not match!
                    </div>
                </div>
            </div>
            <button id="buttonSubmit" disabled class="btn btn-danger px-2 w-25">Submit</button>
        </div>
    </div>
</div>

`
 buttonSubmit = document.getElementById("buttonSubmit")

}


function validateName() {
    return /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(document.getElementById("nameId").value)
}


function validateEmail() {
    return /^[\w\.-]+@[\w\.-]+\.\w{2,3}$/.test(document.getElementById("emailId").value)
}


function validatePhone() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneId").value)
}

function validateAge() {
    return /^(0?[1-9]|[1-9][0-9]|1[0-9]{2}|100)$/.test(document.getElementById("ageId").value)
}
function validatePassword() {
    return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordId").value);
}


function validateRePassword() {
    return document.getElementById("repasswordId").value === document.getElementById("passwordId").value
}


function validation() {
    // Enable or disable the submit button based on overall validation
    if (
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateAge() &&
        validatePassword() &&
        validateRePassword()
    ) {
        buttonSubmit.removeAttribute("disabled");
    } else {
        buttonSubmit.setAttribute("disabled", "true");
    }

    if (document.getElementById("nameId").value.trim() !== "" && !validateName()) {
        document.getElementById("nameAlert").classList.remove("d-none");
    } else {
        document.getElementById("nameAlert").classList.add("d-none");
    }

    if (document.getElementById("emailId").value.trim() !== "" && !validateEmail()) {
        document.getElementById("emailAlert").classList.remove("d-none");
    } else {
        document.getElementById("emailAlert").classList.add("d-none");
    }

    if (document.getElementById("phoneId").value.trim() !== "" && !validatePhone()) {
        document.getElementById("phoneAlert").classList.remove("d-none");
    } else {
        document.getElementById("phoneAlert").classList.add("d-none");
    }

    if (document.getElementById("ageId").value.trim() !== "" && !validateAge()) {
        document.getElementById("ageAlert").classList.remove("d-none");
    } else {
        document.getElementById("ageAlert").classList.add("d-none");
    }

    if (document.getElementById("passwordId").value.trim() !== "" && !validatePassword()) {
        document.getElementById("passAlert").classList.remove("d-none");
    } else {
        document.getElementById("passAlert").classList.add("d-none");
    }

    if (document.getElementById("repasswordId").value.trim() !== "" && !validateRePassword()) {
        document.getElementById("repassAlert").classList.remove("d-none");
    } else {
        document.getElementById("repassAlert").classList.add("d-none");
    }
}

    //alert validation//
    // function alertValidation() {
    //     if(!validateName() || !validateEmail() || !validatePhone() || !validateAge() || !validatePassword() || !validateRePassword()){
    //         alert("Please Enter Valid Details")
    //     }
    // }
    

