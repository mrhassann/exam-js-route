

const rowData = document.getElementById('rowData');
const mainDetails = document.getElementById('mainDetails');
const sec1 = document.getElementById('sec1');
const searchBtn = document.getElementById('search-Btn');
const searchInput = document.getElementById('searchInput');
const mainSearch = document.getElementById('mainSearch');
const searchByLitter = document.getElementById('searchByLitter');
const mainCategories = document.getElementById('mainCategories');
const mainingredients = document.getElementById('mainingredients');

$(function(){
    $('.loding').fadeOut(1000,function(){
        $('spiner').fadeOut(1000)
    })
})
$('.open').on("click", function () {
    $('.sidbar').animate({ width: '250px', padding: '20px' }, 500)
    $('.open').addClass('d-none');
    $('.close').removeClass('d-none');
    $('.animation').addClass('animate__animated animate__fadeInUpBig');
});

$('.close').on("click", function () {
    $('.sidbar').animate({ width: '0px', padding: '0px' }, 500)
    $('.close').addClass('d-none');
    $('.open').removeClass('d-none');
});

// loding screan jQuery
$(window).on('load', function () {
    $('.loading').fadeOut(500, function () {
        $('.loading').fadeOut(500);
        $('body').css({ overflow: 'auto' });
    });
})

getMeals()


async function getMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    const data = await response.json()
    displayMeals(data.meals)//display Meals
};
async function getDetails(index) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`)
    const data = await response.json()
    displayDetails(data.meals)//display Details
}
function displayMeals(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `
                <div onclick="getDetails(${arr[i].idMeal})"  class="col-lg-3 col-md-4 col-sm-6 animate__animated animate__backInUp">
                    <div class="inner text-center">
                        <img src="${arr[i].strMealThumb}" class="w-100" alt="test-img">
                        <div class="layer p-2">${arr[i].strMeal}</div>
                    </div>
                </div>`
    }
    rowData.innerHTML = cartona;
};

function displayDetails(arr1) {

    let cartona = '';
    for (let i = 0; i < arr1.length; i++) {
        cartona += `
                <div class="col-lg-4 col-md-6 animate__animated animate__backInLeft">
                        <img src="${arr1[i].strMealThumb}" class="w-100" alt="">
                        <div class="img-title text-white fs-4 fw-bold">${arr1[i].strMeal}</div>
                    </div>

                    <div class="col-lg-8 col-md-6 text-white animate__animated animate__backInRight">
                        <h3>Instructions</h3>
                        <p>${arr1[i].strInstructions}</p>
                        <div class="fs-4 fw-bold">Area : <span>${arr1[i].strArea}</span></div>
                        <div class="fs-4 fw-bold">Category : <span>${arr1[i].strCategory}</span></div>
                        <div class="fs-4 fw-bold">Recipes : </div>
                        <div class="allRecipes">
                            <ul class="list-unstyled d-flex g-3 flex-wrap">
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient1}</li>
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient2}</li>
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient3}</li>
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient5}</li>
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient6}</li>
                            </ul>
                            <div class="fs-4 fw-bold mb-3">Tags:</div>
                            <span class="badge text-bg-secondary fs-4">Soup</span>
                            <div class="mySource mt-3">
                                <a target="_blank" href="https://www.google.com/search?q=${arr1[i].strTags}&sca_esv=458fc5d25ecd7a59&sxsrf=ADLYWIIFMixDidd0aB5Wpp7VyGBmAtp1gg%3A1720826597390&ei=5bqRZrbCF-6JkdUP3Z2HiAw&ved=0ahUKEwj2yLrQ0qKHAxXuRKQEHd3OAcEQ4dUDCA8&uact=5&oq=meat+casserole&gs_lp=Egxnd3Mtd2l6LXNlcnAiDm1lYXQgY2Fzc2Vyb2xlMgoQIxiABBgnGIoFMgQQIxgnMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDILEAAYgAQYhgMYigVIuQ1Q9wNYmQdwAXgBkAEAmAGjAaABtAKqAQMwLjK4AQPIAQD4AQGYAgOgAssCwgIKEAAYsAMY1gQYR8ICDRAAGIAEGLADGEMYigXCAg4QABiwAxjkAhjWBNgBAcICExAuGIAEGLADGEMYyAMYigXYAQLCAgoQABiABBhDGIoFwgIGEAAYFhgemAMAiAYBkAYRugYGCAEQARgJugYGCAIQARgIkgcDMS4yoAeCDg&sclient=gws-wiz-serp" class="btn btn-success">Source</a>
                                <a target="_blank" href="${arr1[i].strYoutube}" class="btn btn-danger">Youtube</a>                                
                            </div>              
                        </div>
                    </div>`
    }
    rowData.innerHTML = cartona;

};


// Search by name api
function classes() {

    mainSearch.addEventListener('click', function () {
        sec1.classList.toggle('d-none');
        sec2.classList.toggle('d-none');

        $('.sidbar').animate({ width: '0px', padding: '0px' }, 500)
        $('.close').addClass('d-none');
        $('.open').removeClass('d-none');

    })
}
classes()

searchBtn.addEventListener('click', getMealList);

async function getMealList() {
    let searchIn = searchInput.value.trim();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchIn}`)
    const data = await response.json();
    displaySearchName(data.meals)
}
searchByLitter.addEventListener('keyup', getInputMealList);

async function getInputMealList() {
    let searchIn = searchByLitter.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchIn}`)
    const data = await response.json();
    displaySearchName(data.meals)
}

async function getSearchDetails(i) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`)
    const data = await response.json();
    // console.log(data.meals);
    displayAllDetails(data.meals);
}

function displayAllDetails(arr1) {

    let cartona = '';
    for (let i = 0; i < arr1.length; i++) {
        cartona += `
                <div class="col-lg-4 col-md-6 animate__animated animate__backInLeft">
                        <img src="${arr1[i].strMealThumb}" class="w-100" alt="">
                        <div class="img-title text-white fs-4 fw-bold">${arr1[i].strMeal}</div>
                    </div>

                    <div class="col-lg-8 col-md-6 text-white animate__animated animate__backInRight">
                        <h3>Instructions</h3>
                        <p>${arr1[i].strInstructions}</p>
                        <div class="fs-4 fw-bold">Area : <span>${arr1[i].strArea}</span></div>
                        <div class="fs-4 fw-bold">Category : <span>${arr1[i].strCategory}</span></div>
                        <div class="fs-4 fw-bold">Recipes : </div>
                        <div class="allRecipes">
                            <ul class="list-unstyled d-flex g-3 flex-wrap">
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient1}</li>
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient2}</li>
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient3}</li>
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient5}</li>
                                <li class="alert alert-info m-2 p-1">${arr1[i].strIngredient6}</li>
                            </ul>
                            <div class="fs-4 fw-bold mb-3">Tags:</div>
                            <span class="badge text-bg-secondary fs-4">Soup</span>
                            <div class="mySource mt-3">
                                <a target="_blank" href="https://www.google.com/search?q=${arr1[i].strTags}&sca_esv=458fc5d25ecd7a59&sxsrf=ADLYWIIFMixDidd0aB5Wpp7VyGBmAtp1gg%3A1720826597390&ei=5bqRZrbCF-6JkdUP3Z2HiAw&ved=0ahUKEwj2yLrQ0qKHAxXuRKQEHd3OAcEQ4dUDCA8&uact=5&oq=meat+casserole&gs_lp=Egxnd3Mtd2l6LXNlcnAiDm1lYXQgY2Fzc2Vyb2xlMgoQIxiABBgnGIoFMgQQIxgnMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDILEAAYgAQYhgMYigVIuQ1Q9wNYmQdwAXgBkAEAmAGjAaABtAKqAQMwLjK4AQPIAQD4AQGYAgOgAssCwgIKEAAYsAMY1gQYR8ICDRAAGIAEGLADGEMYigXCAg4QABiwAxjkAhjWBNgBAcICExAuGIAEGLADGEMYyAMYigXYAQLCAgoQABiABBhDGIoFwgIGEAAYFhgemAMAiAYBkAYRugYGCAEQARgJugYGCAIQARgIkgcDMS4yoAeCDg&sclient=gws-wiz-serp" class="btn btn-success">Source</a>
                                <a target="_blank" href="${arr1[i].strYoutube}" class="btn btn-danger">Youtube</a>                                
                            </div>              
                        </div>
                    </div>`
    }
    mainDetails.innerHTML = cartona;

};


function displaySearchName(all) {
    let cartona = '';
    for (let i = 0; i < all.length; i++) {
        cartona += `
                <div onclick="getSearchDetails(${all[i].idMeal})"  class="col-lg-3 col-md-4 col-sm-6 animate__animated animate__backInUp">
                    <div class="inner text-center">
                        <img src="${all[i].strMealThumb}" class="w-100" alt="test-img">
                        <div class="layer p-2">${all[i].strMeal}</div>
                    </div>
                </div>`
    }
    mainDetails.innerHTML = cartona;
}


// Categories

mainCategories.addEventListener('click', function () {
    sec1.classList.remove('d-none');
    sec2.classList.add('d-none');
    $('.sidbar').animate({ width: '0px', padding: '0px' }, 500)
    $('.close').addClass('d-none');
    $('.open').removeClass('d-none');
    getCategories();
},);

async function getCategories() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const data = await response.json()
    displayCategories(data.categories)//display Details
}


async function forCategoryApi() {
    for (let i = 0; i < 15; i++) {
        let index = i;
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${index}`)
        const data = await response.json();
        displayDetails(data.meals)

    }
};

function displayCategories(arr2) {
    let cartona = ``;
    for (let i = 0; i < arr2.length; i++) {
        cartona +=
            `<div onclick="displayDetails(${arr2[i].idCategory})" class="col-lg-3 col-md-4 col-sm-6 animate__animated animate__backInUp">
                        <div class="inner text-center">
                            <img src="${arr2[i].strCategoryThumb}" class="w-100" alt="test-img">
                            <div class="layer2 p-2 ">
                                <h3 class="text-black">${arr2[i].strCategory}</h3>
                                <p class="text-black">${arr2[i].strCategoryDescription}</p>
                            </div>
                        </div>
                    </div>`
    }
    rowData.innerHTML = cartona;
};


// area _______________________________-
const mainArea = document.getElementById('mainArea');
mainArea.addEventListener('click', function () {
    sec1.classList.remove('d-none');
    sec2.classList.add('d-none');
    $('.sidbar').animate({ width: '0px', padding: '0px' }, 500)
    $('.close').addClass('d-none');
    $('.open').removeClass('d-none');
    getArea();
},);


// getArea 
async function getArea() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const data = await response.json()
    displayArea(data.meals);
};
// displayArea
function displayArea(area) {
    let cartona = ``
    for (let i = 0; i < area.length; i++) {
        let asm = area[i].strArea;
        cartona += `<div class="col-md-3 text-white">
                        <div onclick="getDetails(${asm})" class="rounded-2 text-center cursor-pointer">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3 id="ahmed" >${asm}</h3>
                        </div>
                    </div>`
    }
    rowData.innerHTML = cartona;
}

// getAreaMeals
async function getAreaMeals() {
    let cartona = ``
    for (let i = 0; i < 5; i++) {
        cartona += `<div onclick=""  class="col-lg-3 col-md-4 col-sm-6 animate__animated animate__backInUp">
        <div class="inner text-center">
            <img src="imgs/test-img.jpg" class="w-100" alt="test-img">
            <div class="layer p-2">ahmed azmy</div>
        </div>
    </div>`
    }
    rowData.innerHTML = cartona;

};


// _____________________________  Ingredients __________________________________




mainingredients.addEventListener('click', function () {
    sec1.classList.remove('d-none');
    sec2.classList.add('d-none');
    $('.sidbar').animate({ width: '0px', padding: '0px' }, 500)
    $('.close').addClass('d-none');
    $('.open').removeClass('d-none');
    getingredients();
});


async function getingredients() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const data = await response.json()
    displayingredients(data.meals) //display ingredients
}

async function getingredientsDetails(main) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`)
    const data = await response.json()
    // console.log(data.meals);
    allDitailsingredient(data.meals)
}

function displayingredients(arr) {
    let cartona = ``
    for (let i = 0; i < 30; i++) {

        cartona += `<div onclick="getingredientsDetails(${arr[i].idMeal})" class="col-lg-3 col-md-4 col-sm-6 cursor-pointer animate__animated animate__backInUp">
                        <div class="inner text-center text-white">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${arr[i].strIngredient}</h3>
                            <p id="words" >${arr[i].strDescription}</p>
                        </div>
                    </div>`
    }
    rowData.innerHTML = cartona;
};



function allDitailsingredient(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `
                    <div class="col-lg-3 col-md-4 col-sm-6 animate__animated animate__backInUp">
                        <div class="inner text-center">
                            <img src="${data[i].strMealThumb}" class="w-100" alt="test-img">
                            <div class="layer p-2">${data[i].strMeal}</div>
                        </div>
                    </div>`
    }
    rowData.innerHTML = cartona;
}




//                   validation Form

const usreNameInput = document.getElementById('nameInput');
const usreEmailInput = document.getElementById('emailInput');
const usrePhoneInput = document.getElementById('phoneInput');
const usreAgeInput = document.getElementById('ageInput');
const usrePasswordInput = document.getElementById('passwordInput');
const usreRepasswordInput = document.getElementById('repasswordInput');

const submitBtn = document.getElementById('submitBtn');





function validateInput(element) {
    var regex = {
        nameInput: /^[a-zA-Z ]+$/,
        emailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phoneInput: /^01[0-9]{9}$/,
        ageInput: /^(?:1[5-9]|[2-5][0-9]|60)$/,
        passwordInput: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
        repasswordInput: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
    }
    if (regex[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');
        element.nextElementSibling.classList.remove('d-block');
        submitBtn.disabled = false;
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.remove('d-none');
        element.nextElementSibling.classList.add('d-block');
        submitBtn.disabled = true;

    }

}

const ContactUs = document.getElementById('ContactUs');
ContactUs.addEventListener('click', function(){
    // sec1.classList.remove('d-none');
    // sec2.classList.add('d-none');
    $('.sidbar').animate({ width: '0px', padding: '0px' }, 500)
    $('.close').addClass('d-none');
    $('.open').removeClass('d-none');
    displayValidation()
})

function displayValidation() {
    cartona = `
             <div class="contact min-vh-100 d-flex justify-content-center align-items-center animate__animated animate__backInUp">
                    <div class="container w-75 text-center">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <input id="nameInput" onkeyup="validateInput(this)" type="text" class="form-control" placeholder="Enter Your Name">
                                <div  class="alert alert-danger w-100 mt-2 d-none">
                                    Special characters and numbers not allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="emailInput" onkeyup="validateInput(this)" type="email" class="form-control " placeholder="Enter Your Email">
                                <div  class="alert alert-danger w-100 mt-2 d-none">
                                    Email not valid *exemple@yyy.zzz
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="phoneInput" onkeyup="validateInput(this)" type="text" class="form-control " placeholder="Enter Your Phone">
                                <div  class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="ageInput" onkeyup="validateInput(this)" type="number" class="form-control " placeholder="Enter Your Age">
                                <div  class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid age ( 15 to 60 )
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="passwordInput" onkeyup="validateInput(this)" type="password" class="form-control " placeholder="Enter Your Password">
                                <div  class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid password  such (Password123 , Tr0ub4d3! , S3cur3P@ss)
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="repasswordInput" onkeyup="validateInput(this)" type="password" class="form-control " placeholder="Repassword">
                                <div class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid repassword 
                                </div>
                            </div>
                        </div>
                        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
                </div>            

            `;
    rowData.innerHTML = cartona;
}