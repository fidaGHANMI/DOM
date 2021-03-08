
let carts= document.querySelectorAll('.add-to-cart');


let products =[
{
  name: 'plat1',
  tag: 'p1',
  price: 15,
  inCart: 0
},

{
  name: 'plat2',
  tag: 'p2',
  price: 16,
  inCart: 0
},

{
  name: 'plat3',
  tag: 'p3',
  price: 17,
  inCart: 0
},


];




for(let i=0; i < carts.length; i++){
  
  carts[i].addEventListener('click',() => {
     cartNumbers(products[i]);
     totalCost(products[i]);
       
    })
}


function onloadCartNumbers(){
  let productNumbers= localStorage.getItem('cartNumbers');

if(productNumbers){
  document.querySelector('.cart span').textContent= productNumbers;
}

}



function cartNumbers(product){


let  productNumbers = localStorage.getItem('cartNumbers');



productNumbers = parseInt(productNumbers);

if(productNumbers){
  localStorage.setItem('cartNumbers', productNumbers+1)
  document.querySelector('.cart span').textContent= productNumbers+1;
}
else{
  localStorage.setItem('cartNumbers', 1);
  document.querySelector('.cart span').textContent= productNumbers+1;
}
  
setItems(product); 

}

function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);



if(cartItems != null){

  if(cartItems[product.tag] == undefined){
    cartItems = {
      ...cartItems,
      [product.tag]: product
    }
  }

  cartItems[product.tag].inCart = 1;

} else{


  product.inCart +=1;
  cartItems={
  [product.tag]: product
   }
}


  localStorage.setItem('productsIncart', JSON.stringify (cartItems));

}
function totalCost(product){


let cartCost = localStorage.getItem('totalCost');



if(cartCost != null){
  cartCost = parseInt(cartCost);
  localStorage.setItem("totalCost", cartCost + product.price)
}else{
  localStorage.setItem("totalCost", product.price);

}

}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}




onloadCartNumbers();