<?php

include 'config.php';
session_start();
$user_id = $_SESSION['user_id'];

if(!isset($user_id)){
   header('location:login.php');
};

if(isset($_GET['logout'])){
   unset($user_id);
   session_destroy();
   header('location:login.php');
}
$select = mysqli_query($conn, "SELECT * FROM `user_form` WHERE id = '$user_id'") or die('query failed');
if(mysqli_num_rows($select) > 0){
   $fetch = mysqli_fetch_assoc($select);
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/9011f061f56a1c774c2087434/87ec4f7c3fcce0b2c643029f1.js");</script>
    <!-- ====== Favicon ====== -->
    <link
      rel="shortcut icon"
      href="https://media.discordapp.net/attachments/994646257903599727/1029862003935826020/RGBibel_Logo.png?width=471&height=473"
      type="image/x-icon"
    />
    <!-- ====== Boxicons ====== -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <!-- ====== Swiper CSS ====== -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/swiper/swiper-bundle.min.css"
    />
    <!-- ====== Custom CSS ====== -->
    <link rel="stylesheet" href="style.css" />
    <title>RGBibel Official</title>




  <!-- Sendinblue Conversations {literal} -->
<script>
  (function(d, w, c) {
      w.SibConversationsID = '63d58b055be2fd4d15573296';
      w[c] = w[c] || function() {
          (w[c].q = w[c].q || []).push(arguments);
      };
      var s = d.createElement('script');
      s.async = true;
      s.src = 'https://conversations-widget.sendinblue.com/sib-conversations.js';
      if (d.head) d.head.appendChild(s);
  })(document, window, 'SibConversations');
</script>
<!-- /Sendinblue Conversations {/literal} -->
</head>
  <body >


    <div style="text-align: center;" id="all">
     <div class="img">
      <img src="data:image/jpeg;base64,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" alt="">
     </div>
      <span id="c3">
       <span id="c1" style="font: bold 30px arial; color: #00CED1
      ;"></span><br>
       <span id="c2" style="font: bold 25px arial; color: #FFFFF0
      ;">;</span><br>
       <small>Until launch</small>
      </span>
      </div>
      
      <script type='text/javascript'>
      
      var end = new Date('January 26, 2023 17:58:20');
      
      function toSt2(n) {
        var s = '';
        if (n < 10) {
         s += '0';
        }
        return (s + n).toString();
      }
      
      function toSt3(n) {
       var s = '';
       if (n < 10) {
        s += '00';
       }
       else if (n < 100) {
        s += '0';
       }
       return (s + n).toString();
      }
      
      function countdown() {
       var d = new Date();
       var count = Math.floor(end.getTime() - d.getTime());
       if (count > 0) {
        var miliseconds = toSt3(count%1000); count = Math.floor(count/1000);
        var seconds = toSt2(count%60); count = Math.floor(count/60);
        var minutes = toSt2(count%60); count = Math.floor(count/60);
        var hours = toSt2(count%24); count = Math.floor(count/24);
        var days = count;
        document.getElementById('c1').innerHTML = days + ' TAGE';
        document.getElementById('c2').innerHTML = hours + ':' + minutes + ':' + seconds
        setTimeout('countdown()', 100);
       }
       else {
        document.getElementById("all").style.display = "none";
       }
      }
      countdown();
      </script>
      
      
      

    <!-----loader-->
    <div class="loader loader--hidden"></div>
    <script>
      window.addEventListener("load", () =>{
        document.querySelector(".loader").classList.add("loader--hidden");
        document.querySelector(".loader").addEventListener("transitionen", () => {
          document.body.removeChild(document.querySelector(".loader"));
        });
      });
    </script>
 
    <!-- ====== Header ====== -->
   
    <section class="one">
    <header class="header">
       <!-- ====== Navbar====== -->
       <nav class="navbar" id="navbar">
        <div class="row container d-flex">
          <div class="logo">
            <img src="https://cdn.discordapp.com/attachments/1026113529616531456/1046831861692911716/Polish_20221128_175557600.png" alt="RGBIBELOFFICIAL">
          </div>

          <div class="nav-list d-flex">
            <a href="#home">Home</a>
            <li class="dropdown">
              <a >Produkte</a>
              <div class="dropdown-content">
           
            <a href="office-start.html">Office</a>
            <a href="low-budget-start.html">Low Budget</a>
            <a href="mid-budget-start.html">Mid Budget</a>
            <a href="high-budget-start.html">High Budget</a>
            <a href="high-end-start.html">High End</a>
            <a href="special-start.html">Rgbibel Specials</a>
          </div>
          </li>
            <a href="#about">Über Uns</a>
            <a href="#kontakt">Support</a>
            <!-- <a href="">Live Chat</a> -->
            <div class="close">
              <i class='bx bx-x'></i>
            </div>
            <a href="" class="user-link">Login</a>
          </div>

          <div class="icons d-flex">
            <div class="icon d-flex" id="toggleWishlist"><i class='bx bx-shopping-bag'></i></div>
            <div class="icon d-flex">
              <i class='bx bx-bell'></i>
            <span></span> </div>
            <li class="dropdown">
            <div class="icon d-flex user-icon"><a href="login.php"><i class='bx bx-user' ></i><?php echo $fetch['name']; ?></a>
            
             
              <!-- <div class="dropdown-content new" color="white">
           
            <a href="office-start.html">Logout</a>
            <a href="low-budget-start.html">Profile</a>
            <a href="mid-budget-start.html">Update Settings</a> -->
           
          </div>
          </li>
         </div>

        
            
            

           


     

           
    <!-- Add your product items here -->
  </ul>
</div>

          </div>
          </div>
           <!-- ====== Hamburger ====== -->
           <div class="hamburger">
            <i class='bx bx-menu-alt-right'></i>
           </div>
        </div>
        <script src="main.js">

        </script>
       </nav>
       <!-- ====== Hero ====== -->
      <div class="hero" id="home">
        <div class="row container d-flex">
          <div class="col">
            <span class="subtitle">One Budget One PC</span>
            <h1>RGB<span class="i">i</span>BEL</h1>
            <p>Official</p>
            <a href="" class="btn">Let`s Talk!</a>
          </div>
            <img src="https://cdn.discordapp.com/attachments/1010509988017483879/1054430030001876992/maxresdefault-removebg-preview.png" alt="">
          
        </div>
      </div>
    </header>
  </section>
    
<!-------------Icons-->

<section class="icons-container">

  <div class="icons">
    <i class='bx bxs-truck'></i>
      <div class="content">
      <h3>Schneller Versand</h3>
      <p>Versand nach: DE, CH, A</p>
  </div>
</div>

<div class="icons">
  <i class='bx bxs-credit-card-alt'></i>
  <div class="content">
  <h3>Sicheres Bezahlsystem</h3>
  <p>powered by Stripe</p>
</div>
</div>

<div class="icons">
  <i class='bx bxs-filter-alt' ></i>
<div class="content">
<h3>Konfigurator</h3>
<p>Konfigurieren Sie Ihren PC</p>
</div>
</div>
<div class="icons">
  <i class='bx bxs-microphone'></i>
<div class="content">
<h3>24/7 Support</h3>
<p>Stellen Sie uns Ihre Fragen...</p>
</div>
</div>

</section>
    <!-- ====== Collection ====== -->
<section class="section collection" id="produkte">
  <div class="title">
    <span>Products</span>
    <h2>Our Top Products</h2>
  </div>

  <div class="filters d-flex">
    <div data-filter="Low-Budget">Low Budget</div>
    <div data-filter="Mid-Budget">Mid Budget</div>
    <div data-filter="High-Budget">High Budget</div>
    <div data-filter="High-End">High End</div>
  </div>

  <div class="products container">
    <div class="swiper mySwiper">
      <div class="swiper-wrapper" id="products">
        <!-- <div class="swiper-slide">
          <div class="product">
            <div class="top d-flex">
              <img src="./images/product-1.png" alt="">
              <div class="icon d-flex">
                <i class='bx bxs-heart'></i>
              </div>
            </div>

            <div class="bottom">
              <h4>Name One PC</h4>
              <div class="d-flex">
                <div class="price">150€</div>
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
        </div> -->
      </div>
    </div>
    <div class="pagination">
      <div class="custom-pagination"> </div>
    </div>
  </div>
</section>

    <!-- ====== Über Uns ====== -->

<section class="about" id="about">
 

<div class="about2">
<div class="main">
  <img src="https://cdn.discordapp.com/attachments/1026113529616531456/1047935330017345618/IMG_0110.png" alt="RGBIBELOFFICIAL">
  <div class="all-text">
      <h4>Über Uns</h4>
      <h1>Für was steht RGBibelOfficial?</h1>
      <p>RGBIBELOFFICIAL steht für Qualitativ hochwertige und bestmöglich konfigurierte Fertig-PCs. 
          Qualität zeichnet uns aus, daher liefern wir zu jedem PC Windows dazu, installieren alle nötigen Treiber und unterziehen jedem Pc einen 24 Stunden Belastungstest.
         Unsere PCs sind immer top aktuell und werden jede Woche geprüft und verbessert.</p>
         <div class="btn">
          
          <a href="about.html" class="btn2">Mehr Erfahren</a>
          <a href="team.html" class="btn2" id="team">Unser Team</a>
         </div>
  </div>
</div>
</div>
</section>

  
  
    
    <!-- ====== live chat====== -->
    
    
   
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            font-weight: bold;
            width: 50%;
            font-size: 14px;
           position: absolute;
           left: 300px;
          
           
          }
          td, th {
            border: 1px solid #00CED1;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #00CED1;
          }
          

          .h{
            height: 400px;
          }

          .sup{
          
            color: white;
            margin-bottom: 80px;
            position: absolute;
            left: 600px;
            top: 2350px;
            text-decoration: underline #00CED1;
            padding-bottom: 5px;
          }

          .span{
            color: rgba(255, 254, 254, 0.253);
            font-size: 13px;
            position: absolute;
            top: 2750px;
            left: 300px;
            
          }
          @media (max-width: 768px){
            table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            font-weight: bold;
            width: 100%;
            font-size: 14px;
           position: absolute;
           left: -50px;
           overflow: hidden;
          }
           .sup{
          
        display: none;
        }

        .span{
          display: none;
        }
           
          }

          @media (max-width: 1200px){
            table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            font-weight: bold;
            width: 80%;
            font-size: 14px;
           position: absolute;
           left: 70px;
          margin-top: 120px;
           overflow: hidden;
           margin-bottom: 80px;
          }
           .sup{
          
          color: white;
          margin-bottom: 80px;
          position: absolute;
          left: 300px;
          top: 2280px;
          text-decoration: underline #00CED1;
          padding-bottom: 5px;
        }

        .span{
          position: absolute;
            top: 2290px;
            left: 480px;
        }
           
          }

          


        </style>
      
   <div class="h" id="kontakt">
    <h1 class="sup">Support</h1>
        <table>
          <tr>
            <th>Tag</th>
            <th>Support-Zeiten <span>*</span></th>
          </tr>
          <tr>
            <td>Montag</td>
            <td>15-20 Uhr</td>
          </tr>
          <tr>
            <td>Dienstag</td>
            <td>15-20 Uhr</td>
          </tr>
          <tr>
            <td>Mittwoch</td>
            <td>15-20 Uhr</td>
          </tr>
          <tr>
            <td>Donnerstag</td>
            <td>15-20 Uhr</td>
          </tr>
          <tr>
            <td>Freitag</td>
            <td>15-23 Uhr</td>
          </tr>
          <tr>
            <td>Samstag</td>
            <td>   10-23 Uhr</td>
          </tr>
          <tr>
            <td>Sonntag</td>
            <td>14-16 Uhr</td>
          </tr>
        </table>
        <span class="span">*In Diesen Zeiten Antworten Wir Innerhalb Einer Stunde. <br>
          Je Nach Auslastung Kann Dieser Wert Sich Jedoch Verkürzen/Verlängern</span>
      </div>
    
      

    <!-- ====== Footer ====== -->
  <div class="footer">
      <div class="box-container">
          <div class="box">
              <img src="https://cdn.discordapp.com/attachments/1026113529616531456/1046831861692911716/Polish_20221128_175557600.png" class="logo" alt="RGBIBEL">
              <div class="share">
                  <a href="" class="fab fa-facebook-f"><i class='bx bxl-meta'></i></a>
                  <a href="" class="fab fa-twitter"><i class='bx bxl-twitter' ></i></a>
                  <a href="" class="fab fa-instagram"><i class='bx bxl-instagram-alt'></i></a>
                  <a href="" class="fab fa-linkedin"><i class='bx bxl-linkedin'></i></a>
               
              </div>
          </div>
          <div class="box">
              <h3>Informationen</h3>
             <a class="links" href="impressum.html"><i class='bx bx-right-arrow-alt' ></i>Impressum</a>
             <a class="links" href=""><i class='bx bx-right-arrow-alt' ></i>Datenschutz</a>
             <a class="links" href=""><i class='bx bx-right-arrow-alt' ></i>Email</a>
             <a class="links" href=""><i class='bx bxs-map-pin' ></i>Deutschland</a>
          </div>
  
          <div class="box">
              <h3>Wichtige Links</h3>
             <a class="links" href="#home"><i class='bx bx-right-arrow-alt' ></i>Home</a>
             <a class="links" href="#produkte"><i class='bx bx-right-arrow-alt' ></i>Produkte</a>
             <a class="links" href="#about"><i class='bx bx-right-arrow-alt' ></i>Über Uns</a>
             <!-- <a class="links" href="#live-chat"><i class='bx bx-right-arrow-alt' ></i>Live Chat</a> -->
             <a class="links" href="#kontakt"><i class='bx bx-right-arrow-alt' ></i>Kontakt</a>
          </div>
  

    </div>
    <div class="credit"> <a href="wordle.html">Created by <span>LS</span> | all rights reserved | </a></div>
      
  

    <!-- ====== Login and Signup Form ====== -->

    <!-- ====== SwiperJs ====== -->
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <!-- ====== Custom Script ====== -->
    <script src="product.js"></script>
    <script src="main.js"></script>
   
  </body>
</html>