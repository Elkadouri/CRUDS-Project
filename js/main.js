
let title = document.getElementById("title");

let price = document.getElementById("price");

let taxes = document.getElementById("taxes");

let ads = document.getElementById("ads");

let discount = document.getElementById("discount");

let total = document.getElementById("total");

let count = document.getElementById("count");

let category = document.getElementById("category");

let submit = document.getElementById("submit");


let mood = "create";
let tmp;




// Get total
function getTotal(){
    if (price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040"
    } else{
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02"
    }
}





// Creat product

let dataPro;
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
} else{
    dataPro = [] ;
}

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 100){
        if (mood === "create"){
            // Count
            if (newPro.count > 1){
                for(let i = 0 ; i < newPro.count ; i++){
                    dataPro.push(newPro);  
                }
            } else{
                dataPro.push(newPro);
            }
            } else{
                dataPro[tmp] = newPro;
                mood = "create"
                count.style.display = "block"
                submit.innerHTML = "Create";
            }

            clearData()
    }
   
    

    // Save localStorage
    localStorage.setItem("product" , JSON.stringify(dataPro))

    showData()
  
};






// Save in local-storage

// Clear inputs
function clearData(){
    title.value = "";
    price.value ="";
    taxes.value ="";
    ads.value ="";
    discount.value = "";
    total.innerHTML ="";
    count.value = "";
    category.value ="";
}



// Read

function showData(){

    getTotal()
    let table = "";
    for(let i = 0 ; i < dataPro.length ; i++){
        let item = dataPro[i];
        table += 
      ` <tr>
            <td>${i+1}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.taxes}</td>
            <td>${item.ads}</td>
            <td>${item.discount}</td>
            <td>${item.total}</td>
            <td>${item.category}</td>
            <td><button onclick="updateData(${i})" id="update"><i class="fa-solid fa-pencil"></i></button></td>
            <td><button onclick="deleteData(${i})" id="delete"><i class="fa-regular fa-trash-can"></i></button></td>
        </tr> `
      ;
    }

    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick = "deleteAll()">Delete All (${dataPro.length})</button>`
    } else{
        btnDelete.innerHTML = "";
    }
}
showData()




// Delete

function deleteData(i){
    
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

// Delete All

function deleteAll(){
    localStorage.clear();
    dataPro = [];
    showData();
}






// Update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    
    getTotal()
    count.style.display = "none"

    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;

    scroll({
        top:0,
        behavior:"smooth"
    })

}






// Search

let searchMode = 'title';

function getSearchMode(id){

    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMode = 'title';
    } else{
        searchMode = 'category'
        
    }
    search.placeholder = 'Search by '+ searchMode;

    search.focus()
    search.value = '';
    showData()
}


function searchData(value){

    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){ 
       if(searchMode == 'title'){

            if(dataPro[i].title.includes(value.toLowerCase())){

                let item = dataPro[i];
                
                table += 
                ` <tr>
                      <td>${i+1}</td>
                      <td>${item.title}</td>
                      <td>${item.price}</td>
                      <td>${item.taxes}</td>
                      <td>${item.ads}</td>
                      <td>${item.discount}</td>
                      <td>${item.total}</td>
                      <td>${item.category}</td>
                      <td><button onclick="updateData(${i})" id="update"><i class="fa-solid fa-pencil"></i></button></td>
                      <td><button onclick="deleteData(${i})" id="delete"><i class="fa-regular fa-trash-can"></i></button></td>
                  </tr> `
                ;

            }

        
       } else{
        
            if(dataPro[i].category.includes(value.toLowerCase())){

                let item = dataPro[i];
                
                table += 
                ` <tr>
                      <td>${i+1}</td>
                      <td>${item.title}</td>
                      <td>${item.price}</td>
                      <td>${item.taxes}</td>
                      <td>${item.ads}</td>
                      <td>${item.discount}</td>
                      <td>${item.total}</td>
                      <td>${item.category}</td>
                      <td><button onclick="updateData(${i})" id="update"><i class="fa-solid fa-pencil"></i></button></td>
                      <td><button onclick="deleteData(${i})" id="delete"><i class="fa-regular fa-trash-can"></i></button></td>
                  </tr> `
                ;

            }

     }
}

    document.getElementById("tbody").innerHTML = table;
}



// Clean Data

