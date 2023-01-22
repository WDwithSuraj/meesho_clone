let backtoHOme = document.getElementById("logo-container")
backtoHOme.addEventListener("click", () => {
    location.href = "index.html"
})
let sorting=document.getElementById("sorting");

let products = JSON.parse(localStorage.getItem("products")) || []
var productData=[]
sorting.addEventListener("change",sorted)

fetch("https://sleepy-puce-greyhound.cyclic.app/products?_page=1&_limit=20")//?_page=3&_limit=10
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        showData(data)
        productData=data;
    
    })

function showData(data) {
    let cards = "";
    data.forEach((element, index) => {
        let card = `
                        <div class="Rcard" data-id="${element.id}">
                        <img src="${element.images[0]}" alt="${element.images[0]}">
                        <p class="title">${element.title ? element.title.substr(0, 20) : "No tittle"}</p>
                        <p class="price">
                        <span class="price">₹</span>
                        <span class="price">${element.original_price}</span>
                        </p>
                        <div class="delivery">Free Delivery</div>
                        <div class="rating">${element.rating}<i class="fa-solid fa-star"></i></div>
                        </div>
            
                        `;
        cards += card
    });

    document.querySelector(".Rproducts").innerHTML = cards;
    let rating = document.querySelectorAll(".rating");
    for (let item of rating) {
        if (+item.textContent >= 4.0) {
            item.style.backgroundColor = "#038d63"

        } else if (+item.textContent >= 3.4 && +item.textContent < 4.0) {
            item.style.backgroundColor = "#23bb75"
        } else if (+item.textContent >= 2.4 && +item.textContent < 3.4) {
            item.style.backgroundColor = "#f4b619"
        } else {
            item.style.backgroundColor = "#ee7212"
        }
    }

    
    let divs = document.querySelectorAll(".Rcard")
    for (let item of divs) {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.dataset.id != undefined) {
                products.unshift(e.target.dataset.id)
                console.log(products)
                localStorage.setItem("products", JSON.stringify(products))
                window.location.replace("./product.html");
            }

        })
    }

}
document.getElementById("playStore").addEventListener("click", () => {
    location.href = "https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow"
})
document.getElementById("appStore").addEventListener("click", () => {
    location.href = "https://apps.apple.com/us/app/meesho/id1457958492"
})

document.querySelector(".sellerContainer").addEventListener("click", () => {
    location.href = "BecomeSupplier.html"
})

//filtering
let category = document.querySelectorAll(".category")
for (let item of category) {
    item.addEventListener("change", () => {
        if (item.checked) {
            console.log(item.value)
        } else {
            console.error("not")
        }
    })
}




//pagination code 

let primaryButtons=[
    {text:"1",'data-id':1},
    {text:"2",'data-id':2},
    {text:"3",'data-id':3},
    {text:"4",'data-id':4},
    {text:"5",'data-id':5},
    {text:"6",'data-id':6}
];

function getAsButton(text, dataid) {
    return `<button class="pages" data-id=${dataid}>${text}</button>`
}

function renderButtons() {
    document.querySelector(".page-container").innerHTML = `
    ${primaryButtons.map(button => {
        return getAsButton(button.text, button["data-id"])
    }).join("")}

    `
}

renderButtons()
//giving functionality to buttons 

let buttons = document.querySelectorAll(".pages");
for (let item of buttons) {
    item.addEventListener("click", (e) => {
        e.preventDefault()
        fetch(`https://sleepy-puce-greyhound.cyclic.app/products?_page=${e.target.dataset.id}&_limit=20`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                showData(data)
            
                productData=data;
                
            })



    })
}



//sorting functionality 

function sorted(){
    let value=sorting.value;
    let data=productData;
    if(value=="l2h"){
        ascending=data.sort((a,b)=> a.original_price-b.original_price)
        showData(ascending)
    }else if(value=="h2l"){
        descending=data.sort((a,b)=> b.original_price-a.original_price)
        showData(descending)
    }else if(value=="rating"){
        rating=data.sort((a,b)=>b.rating-a.rating)
        showData(rating)
    }else{
        showData(data);
        
    }
    

}