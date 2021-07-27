if (document.readState == 'loading'){
   document.addEventListener('DOMContentLoaded', ready)
} else {
   ready();
}

function ready () {
  var removeCartItemButtons= document.getElementsByClassName('btnClose');// Array of elements
   for (var i=0;i<removeCartItemButtons.length; i++) {
       var button=removeCartItemButtons[i]; 
       button.addEventListener('click', removeCartItem )  
   }
   var quantityInputs = document.getElementsByClassName('styleInput');
   for (var i=0; i< quantityInputs.length; i++) {
       var input = quantityInputs[i];
       input.addEventListener('change', quantityChanged)
   }
   var addToCartButtons = document.getElementsByClassName('Toadd');
   for (var i=0; i< addToCartButtons.length; i++){
      var button = addToCartButtons[i];
      button.addEventListener('click',addToCartClicked)
   }
   document.getElementsByClassName('orderButton')[0].addEventListener('click',orderClicked)
   var heart=document.getElementsByClassName('heart');
   for (var i=0; i< heart.length; i++){
      var heartCheck = heart[i];
      heartCheck.addEventListener('click', redHeart);
   }
   var Clear=document.getElementsByClassName('ClearButton')[0];
   Clear.addEventListener('click' , clearCart )
}
 
function openModel (){
   var itemInCart = document.getElementsByClassName('itemInCat')[0];
   var displayModel = document.getElementById('id01');
   if (itemInCart.innerText==0) {
      alert('The cart is empty ! Please add items in the cart');
   }
   else {
   displayModel.style.display='block';
}
}

function redHeart(event) 
{
var clickedHeart= event.target;
if (clickedHeart.style.color!='red'){
   clickedHeart.style.color='red'
   
} else {clickedHeart.style.color='rgb(206, 194, 194)';
        }
        var redHeart = clickedHeart.parentElement.parentElement
        var nameProduct = redHeart.getElementsByClassName('productName')[0].innerText;
       var heartInCart= document.getElementsByClassName('productNamePosition');
       for (var i=0;i< heartInCart.length;i++) {
        if (heartInCart[i].innerText== nameProduct){  
         var parentSameName = heartInCart[i].parentElement.parentElement;
         var inCartHeart = parentSameName.getElementsByClassName('HeartInCart')[0];
         inCartHeart.style.color= redHeart.getElementsByClassName('heartHover')[0].style.color;
        }
      }
}

function clearCart () { 
   var itemInCart = document.getElementsByClassName('itemInCat')[0];
   if (itemInCart.innerHTML==0) {
   alert('The cart is already empty');}
   else
   {
   var cartItems = document.getElementsByClassName('products')[0];
   while (cartItems.hasChildNodes() ) {
      cartItems.removeChild(cartItems.firstChild);
   }
   updateCartTotal();
   itemInCart.innerHTML=0;}
}

function orderClicked () {
   var cartItems = document.getElementsByClassName('products')[0];
   var cartModel = document.getElementsByClassName('w3-modal')[0];
   while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild); 
   }
   updateCartTotal();
   var itemInCart = document.getElementsByClassName('itemInCat')[0];
   itemInCart.innerHTML=0;
   alert('Thank you for your order'); 
   cartModel.style.display='none'; 
   document.location.reload(true);
}

function removeCartItem(event) {
   var buttonClicked = event.target; 
   var redHeart = buttonClicked.parentElement.parentElement
   var heart= redHeart.getElementsByClassName('HeartInCart')[0].style.color;
   if (heart!='red'){
      buttonClicked.parentElement.parentElement.remove();
      updateCartTotal();
   var itemInCart = document.getElementsByClassName('itemInCat')[0];
   itemInCart.innerHTML--;
   if (itemInCart.innerHTML==0) {
      var displayModel = document.getElementById('id01');
      displayModel.style.display='none';
   }
   }
   else alert("This item is selected as favorit , you cannot delete it from the cart ");
}

function quantityChanged (event) {
    var input = event.target
    if (isNaN (input.value) || input.value <=0){
       input.value=1;
    }
    updateCartTotal();
}

function addToCartClicked (event){
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName('productName')[0].innerText;
  var price = shopItem.getElementsByClassName('price')[0].innerText;
  var heartStyleColor = shopItem.getElementsByClassName('heartHover')[0].style.color;
  addItemToCart (title, price,heartStyleColor);
  updateCartTotal()
}

function addItemToCart (title, price,heartStyleColor){
  var cartRow = document.createElement('div');
  var cartItems = document.getElementsByClassName('products')[0];
  var cartItemNames = cartItems.getElementsByClassName('productNamePosition');
  for (i=0; i< cartItemNames.length; i++) {
     if (cartItemNames[i].innerText == title) {
        alert ('This item is already added to the cart !')
        return
     }
  }
  var cartRowContents = `
                    <div class="BlockModel">   
                         <div class="product">
                           <i  class="far fa-times-circle btnClose" style="color: red; margin: 0; font-size:1.5em; padding:0.3em;"></i>
                           <span class="productNamePosition">${title}</span>
                         </div>
                         <i id="" class="fas fa-heart HeartInCart" style="color:${heartStyleColor};"></i>
                         <div class="total">
                           <p><span class="totalPerItem">${price}</span></p>
                         </div>
                         <div class="quantity">
                            <input class="styleInput" type="number" value="1">
                         </div>                      
                    </div>`
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btnClose')[0].addEventListener('click',removeCartItem);
  cartRow.getElementsByClassName('styleInput')[0].addEventListener('change',quantityChanged);
  var itemInCart = document.getElementsByClassName('itemInCat')[0];
  itemInCart.innerHTML++;
}

function updateCartTotal()
{
  var cartItemContainer = document.getElementsByClassName('products')[0];
  var cartRows = cartItemContainer.getElementsByClassName('BlockModel');
  var total = 0;
  for (var i=0;i<cartRows.length ; i++) 
  {
     var cartRow = cartRows[i];
     var priceElement = cartRow.getElementsByClassName('total')[0];
     var quantityElement = cartRow.getElementsByClassName('styleInput')[0];
     var price = parseFloat(priceElement.innerText.replace(',00dt',''));
     var quantity = quantityElement.value;  
     total = total + (price * quantity);      
  }
   document.getElementsByClassName('total-cart')[0].innerText=total;  
}