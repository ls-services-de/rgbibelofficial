/* ========== Products Slider =========== */
const swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 70,
  pagination: {
    el: ".custom-pagination",
    clickable: true,
  },
  breakpoints: {
    567: {
      slidesPerView: 2,
    },
    996: {
      slidesPerView: 3,
    },
  },
});

/* ========== Fetch the Products =========== */
const getProducts = async()=> {
  try{
      const results = await fetch("products.json");
      const data = await results.json();
      const products = data.products;
      return products;
      

  } catch (error) {
      console.log(error);
  }

};

const ProductWrapper = document.getElementById("products");
window.addEventListener("DOMContentLoaded", async function(){
  let products = await getProducts();
 
  
  displayProductItems(products);
});


/* ========== Display Products =========== */
const displayProductItems = (items)=> {
  let displayProduct = items.map(
      (product) => ` <div class="swiper-slide">
  <div class="product">
    <div class="top d-flex">
      <img src=${product.url} alt="">
      <div class="icon d-flex" >
        <i class='bx bxs-heart' id="wish" ></i>
      </div>
    </div>
    <div class="bottom">
      <h3>${product.title}</h3>
      <div class="d-flex">
        <div class="price" id="price">${product.price}</div>
     
        <div class="rating">
          <i class='bx bxs-star'></i>
          <i class='bx bxs-star'></i>
          <i class='bx bxs-star'></i>
          <i class='bx bxs-star'></i>
          <i class='bx bxs-star'></i>
          
        </div>
      </div>
    </div>
  </div>
</div>`);
displayProduct = displayProduct.join("");
ProductWrapper.innerHTML = displayProduct;
};
/* ========== Filter Products =========== */
const filters = [...document.querySelectorAll(".filters div")];

filters.forEach((filter) => {
  filters[2].classList.add("active");
  filter.addEventListener("click", async (e)=>{
      const id = e.target.getAttribute("data-filter");
      const target = e.target;
      const products = await getProducts();
      filters.forEach((btn) => {
          btn.classList.remove("active");
          
      });
      target.classList.add("active");

      let menuCategory = products.filter((product) => {
          if(product.category === id){
              return product;
          }
      });

      displayProductItems(menuCategory);
      swiper.update();
  });
});
/* ========== wishlist =========== */



/* ========== wishlist =========== */


 // Load wishlist from Local Storage on page load
 let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistOverview = document.createElement("div");

wishlistOverview.id = "wishlistContainer";
wishlistOverview.style.position = "absolute";
wishlistOverview.style.zIndex = "100000000000000000000000000000";
wishlistOverview.style.right = "50px";
wishlistOverview.style.top = "100px";
wishlistOverview.style.width = "20%";
wishlistOverview.style.height = "inerhit";
wishlistOverview.style.background = "rgba(255, 255, 255, 0.212)";
wishlistOverview.style.padding = "20px";
document.body.appendChild(wishlistOverview);

const updateWishlistOverview = () => {
  let totalPrice = 0;
  let wishlistItems = "";
  wishlist.forEach((item) => {
    totalPrice += item.price;
    wishlistItems += 
   
    `<div>
      <p>${item.title}: ${item.price}€</p>
      
    </div>`;
  });

  
  wishlistOverview.innerHTML = `
    <h3>Wishlist</h3>
    <i class='bx bx-x' id="close"></i>
    
    <p>${wishlistItems}</p>
    <p>Total: ${totalPrice}€</p>
  
  `
  document.getElementById("close").addEventListener("click", () => {
    wishlistOverview.style.visibility = "hidden";
  });

 /// Save wishlist to Local Storage
localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

/* ========== Add to Wishlist =========== */
ProductWrapper.addEventListener("click", (e) => {
  if (e.target.id === "wish") {
    const product = e.target.parentNode.parentNode.parentNode;
    const title = product.querySelector("h3").textContent;
    const price = parseInt(product.querySelector("#price").textContent);
    
    wishlist.push({ title: title, price: price });

    updateWishlistOverview();
  }
});

const toggleWishlistButton = document.querySelector("#toggleWishlist");

toggleWishlistButton.addEventListener("click", () => {
  if (wishlistOverview.style.visibility === "hidden") {
    wishlistOverview.style.visibility = "visible";
  } else {
    wishlistOverview.style.visibility = "hidden";
  }
});
