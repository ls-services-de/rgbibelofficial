/* ========== Navigation =========== */
const navList = document.querySelector(".nav-list");

document.querySelector(".hamburger").onclick = ()=> {
    navList.classList.add("show")
}

document.querySelector(".close").onclick = ()=> {
    navList.classList.remove("show")
}

 var menu = document.getElementById("navbar")

     

//  window.onscroll = function(){
//    if(window.pageYOffset >=  menu.offsetTop){
//         menu.classList.add("fixed");
//    }
//     else{
//         menu.classList.remove("fixed");
// }
//  }


const tl = gsap.timeline({defaults: {ease: "power1.out"}});

tl.set(".text", 2, { y: 0});

/* ========== User Form =========== */
