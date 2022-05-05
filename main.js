let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = "Create";
let tmp
// get Total
function getTotal(){
    if(price.value != '' && taxes.value != '' && ads.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// create product
let dataPRO ;
if(localStorage.product != null){
    dataPRO = JSON.parse(localStorage.product)
}else{
    dataPRO = []
}


submit.onclick = function(){
    let newPRO =  {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value.toLowercase(),
    }
    if(mood === "Create"){
        if(newPRO.count > 1){
            for(let i = 0; i < newPRO.count; i++){
                dataPRO.push(newPRO);
            }
        }else {
            dataPRO.push(newPRO);
        }
    }else{
        dataPRO[tmp] = newPRO;
        mood = "create";
        submit.innerHTML = "Create";
        count.style.display = "block"
    }
    
    
    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataPRO))

    clearData();
    showData();
}

// clear inputs

function clearData(){
title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
category.value = '';
}

// read

function showData(){
        getTotal()
        let table = '';
        for(let i = 0; i < dataPRO.length; i++){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPRO[i].title}</td>
            <td>${dataPRO[i].price}</td>
            <td>${dataPRO[i].taxes}</td>
            <td>${dataPRO[i].ads}</td>
            <td>${dataPRO[i].discount}</td>
            <td>${dataPRO[i].total}</td>
            <td>${dataPRO[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
            `
        }
        document.getElementById('tbody').innerHTML = table;
        let btnDelete = document.getElementById("deleteAll")
        if(dataPRO.length > 0){
            btnDelete.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPRO.length})</button>
            `
        }else{
            btnDelete.innerHTML = ''
        }
}

showData()

// delete

function deleteData(i){
    dataPRO.splice(i,1);
    localStorage.product = JSON.stringify(dataPRO);
    showData()
}

function deleteAll(){
    localStorage.clear();
    dataPRO.splice(0);
    showData()
}

// count

// update
function updateData(i){
    title.value = dataPRO[i].title;
    price.value = dataPRO[i].price;
    taxes.value = dataPRO[i].taxes;
    ads.value = dataPRO[i].ads;
    discount.value = dataPRO[i].discount;
    getTotal();
    count.style.display = "none"
    category.value = dataPRO[i].category;
    submit.innerHTML = "Update";
    mood = "Update";
    tmp = i;
    scroll({
        top0,
        behavior: 'smooth'
    })
}

// search

let searchMood = "title";

function getSearchMood(){

    let search = document.getElementById("search")
    if(id == "searchTitle"){
        searchMood = "title";
        search.placeholder = "Search by title"
    }else{
        searchMood = "category"
        
    }
    search.placeholder = "Search by category"+  searchMood
    search.focus();
    search.value = "";
    showData
}

function searchData(value){

    let table = '';
   if(searchMood == "title"){
    for(let i = 0; i < dataPRO.length; i++){
        if(dataPRO[i].title.toLowercase().includes(value)){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPRO[i].title}</td>
            <td>${dataPRO[i].price}</td>
            <td>${dataPRO[i].taxes}</td>
            <td>${dataPRO[i].ads}</td>
            <td>${dataPRO[i].discount}</td>
            <td>${dataPRO[i].total}</td>
            <td>${dataPRO[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
            `;
    }else{
        
    }
    document.getElementById('tbody').innerHTML = table;
   }
}
}