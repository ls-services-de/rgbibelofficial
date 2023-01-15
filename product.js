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
        <i class='bx bxs-heart' id="wish"></i>
      </div>
    </div>
    <div class="bottom">
      <a>${product.title}</a>
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




