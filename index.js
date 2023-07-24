let products= JSON.parse(localStorage.getItem("products")) || [];

const display=(data)=>{
    document.getElementById("view-ui").innerHTML="";
    data.map((ele)=>{

        let img = document.createElement("img");
        img.src = ele.img;
        img.setAttribute("id","p-img")

        let title = document.createElement("h4");
        title.innerHTML = ele.title;

        let price = document.createElement("h6");
        price.innerHTML = ele.price;

        let cat = document.createElement("p");
        cat.innerHTML= ele.cat;

        let div = document.createElement("div");
        div.setAttribute("id","sub-div")

        let btn = document.createElement("button");
        btn.innerHTML="Add To Cart"
        btn.setAttribute("id","addcart")

        div.append(img, title, price, cat, btn);
        document.getElementById("view-ui").append(div);

    })
}

const productdata=(e)=>{
    e.preventDefault();

    let product={
        img : document.getElementById("img").value,
        title: document.getElementById("title").value,
        price : document.getElementById("price").value,
        cat : document.getElementById("category").value,
    }
    products.push(product);
    console.log(products);
    localStorage.setItem("products", JSON.stringify(products));
    display(products);
}
display(products);
document.querySelector("form").addEventListener("submit", productdata);

// Sorting Fn And Filtering Fn 
const handellth=()=>{
    let data = products.sort((a,b)=> a.price - b.price);
    display(data);
}
const handelhtl=()=>{
    let data = products.sort((a,b)=> b.price - a.price);
    display(data);
}

document.getElementById("lth").addEventListener("click", handellth); //data sort lth
document.getElementById("htl").addEventListener("click", handelhtl); //data sort htl

// Filter by Category (made filter function)
const handelcategory=(cat)=>{
    let data = products.filter((item)=> item.cat == cat);
    display(data);
}

// Filter function by using for loop

const handlecat=(cat)=>{
    // by Filter Method 
    // let data = products.filter((item)=> item.cat == cat);
    // display(data);

    // by Map MEthod 

    let temp = [];

    // products.map((ele)=>{
    //     if (ele.cat == cat){
    //         temp.push(ele);
    //     }
    // })
    // display(temp);

    for( let i = 0; i < products.length; i++){
        if (products[i].cat == cat){
            temp.push(products[i]);
        }
    }
    display(temp);
}

// let poro = ["Men","Women","Kids"]

// for (let i = 0; i < poro.length; i++){

//     let btn = document.createElement("button");
//     btn.innerHTML= poro[i];
//     btn.setAttribute("id", poro[i]);
//     document.getElementById("btns").append(btn);
// }
// for (let i = 0; i < poro.length; i++){
//     document.getElementById(poro[i]).addEventListener("click",()=> handelcategory(poro[i]));
// };
document.getElementById("men").addEventListener("click", ()=> handlecat("Men"));
document.getElementById("women").addEventListener("click", ()=> handlecat("Women"));
document.getElementById("kids").addEventListener("click", ()=> handlecat("Kids"));
// Searcing Function 

const search=()=>{
    let value = document.getElementById("s-input").value;
    let data = products.filter((item)=> item.title.toLowerCase().match(value.toLowerCase()));
    display(data);
}

document.getElementById("search").addEventListener("click",search);
document.getElementById("s-input").addEventListener("keypress",(e)=>{

    console.log(e.key);
    if (e.key == "Enter"){
        search();
    }
})