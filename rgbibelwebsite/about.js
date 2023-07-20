let paths = document.querySelectorAll('path');

    fillSvgPaths()

    document.addEventListener('scroll', fillSvgPaths)

    function fillSvgPaths() {

        let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

        for (var i = 0; i < paths.length; i++) {
            let path = paths[i];

            let pathLength = path.getTotalLength();

            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;

            let drawLength = pathLength * scrollPercentage;

            path.style.strokeDashoffset = pathLength - drawLength;
        }
    }




    var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  })};