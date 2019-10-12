/* Create automatic slide show in modal.  Show, hide, and style slideshow 
navigation at particular times.  Use the revealing module pattern. */
var slideshow = (function () {
    var slide = document.getElementById("img01"),
    slide2 = document.getElementById("img02"),
    slider = document.getElementById("inner-modal"),
    slideNumber = document.getElementById("photo-number"),
    mapArea = document.getElementsByTagName("area"),
    container = document.querySelector(".modal"),
    img = document.querySelectorAll(".myImg"),
    nextClick = document.querySelectorAll(".next")[2],
    previousClick = document.querySelectorAll(".previous")[2],
    tabL = document.querySelector(".tab"),
    tabR = document.querySelector(".tab2"),
    playSlide = document.querySelectorAll(".play"),
    pauseSlide = document.querySelectorAll(".pause"),
    wrap = document.querySelector(".modal-content"),
    t, slideIndex = 0, p = false;
    
    /* Open modal, have the photo's container zoom in, set the source of the 
    image, and set-up the navigation to initially look and work properly. */
    function init(event) {
        responsiveModal();
        tabL.style.visibility = "hidden";
        tabR.style.visibility = "hidden";
        container.style.display = "block";
        slide.src = event.target.src;
        slideIndex = parseInt(event.target.id);
        slideNumber.innerHTML = (slideIndex > 8) ? slideIndex + 1 : "0" + (slideIndex + 1);

        if ((slider.style.WebkitAnimation || slider.style.MozAnimation ||
            slider.style.animation) == undefined) {
            wrap.style.display = "block"; // For IE 9-
        } else {
            slider.style.visibility = "hidden";
            setTimeout(sliderVisible, 2400);
            // For Google Chrome 4.0+, Safari 4.0+, and Opera 15.0+
            container.addEventListener("webkitAnimationEnd", function() {
            wrap.style.display = "block";
            });
            // For Mozilla Firefox 5.0 - 15.0
            container.addEventListener("mozAnimationEnd", function() {
            wrap.style.display = "block";
            });
            container.addEventListener("animationend", function() {
            wrap.style.display = "block";
            });
        }

        if (slideIndex === 0) {
            previousClick.setAttribute("class", "big-list previous no-hover no-hover:hover");
            nextClick.setAttribute("class", "big-list next");
        } else if (slideIndex === img.length - 1) {
            nextClick.setAttribute("class", "big-list previous no-hover no-hover:hover");
            previousClick.setAttribute("class", "big-list next");
        } else { 
            nextClick.setAttribute("class", "big-list next");
            previousClick.setAttribute("class", "big-list next");
        }

        setTimeout(mapResponse, 1200);
    }

    function sliderVisible() {
        slider.style.visibility = "visible";
        tabL.style.visibility = "visible";
        tabR.style.visibility = "visible";
    }

    // Make the slideshow responsive
    window.onresize = responsiveModal;

    function responsiveModal() {
        var modalWidth;
        var closeX = document.querySelector(".close");
        var h = window.innerHeight
        || document.documentElement.clientHeight // For IE 5 - 8
        || document.body.clientHeight; // For IE 5 - 8
        var w = window.innerWidth * 0.9
        || document.documentElement.clientWidth * 0.9 // For IE 5 - 8
        || document.body.clientWidth * 0.9; // For IE 5 - 8

        // Make sure the close class or "X" does not overflow
        if (h < 360) {
            closeX.style.display = "none";
        } else{
            closeX.style.display = "inline";
        }

        if (h > 410) {
            modalWidth = h * 0.62;
        } else {
            modalWidth = h * 0.59;
        }

        (modalWidth > w) && (modalWidth = w);
        wrap.style.width = modalWidth + "px";
        slide.style.height = (modalWidth - 24) * 4 / 3 + "px";
        mapResponse();
    }

    // Make map responsive
    function mapResponse() {
        var cw = slide.clientWidth, ch = slide.clientHeight;

        mapArea[0].coords = "0,0," + cw / 2 + "," + ch;
        mapArea[1].coords = cw / 2 + ",0," + cw + "," + ch;
    }

    // Start the automatic slideshow.
    function autoPlay() {
        playSlide[0].style.display = "none"; pauseSlide[0].style.display = "inline";
        if (slideIndex === (img.length - 1)) {slideIndex = -1;} // Ensure slideshow loops
        changeSlide();
        t = setTimeout(autoPlay, 5800);
    }

    // Pause the slideshow.
    function pauseAuto() {
        clearTimeout(t);    
        pauseSlide[0].style.display = "none"; playSlide[0].style.display = "inline";
    }

    // Display next photo manually.
    function nextSlide() {
        if (slideIndex < (img.length - 1)) {
            pauseAuto();
            changeSlide();
        }
    }

    // Display previous photo.
    function prevSlide() {
        if (slideIndex != 0) {
            pauseAuto();
            p = true;
            changeSlide();
        }
    }

    /* Make the next or previous photo in the slideshow appear.  Have the
    correct photo number displayed. */
    function changeSlide() {

        // Reverse slideshow if prevSlide was called
        slideIndex = (!p) ? slideIndex + 1 : slideIndex - 1;
        p = false;

        if ("classList" in document.documentElement && slide.classList.contains("dissolve") ||
            /dissolve/g.test(slide.className)) {
            slide2.style.zIndex = 3;
            slide.style.zIndex = 2;
            addClass(slide2, "dissolve");
            slide.src = img[slideIndex].src; 
            removeClass(slide, "dissolve");
        } else {
            slide.style.zIndex = 3;
            slide2.style.zIndex = 2;
            addClass(slide, "dissolve");
            slide2.src = img[slideIndex].src; 
            removeClass(slide2, "dissolve");
        }

        slideNumber.innerHTML = (slideIndex > 8) ? slideIndex + 1 : "0" + (slideIndex + 1);

        // Make the navigation display differently on first and last photo
        switch (slideIndex) {
            case (0): 
                previousClick.setAttribute("class", "big-list previous no-hover no-hover:hover");
                nextClick.setAttribute("class", "big-list next");
                mapArea[0].style.display = "none";        
                mapArea[1].style.display = "inline";        
                tabL.style.left = "0";
                break;
            case (img.length - 1):
                nextClick.setAttribute("class", "big-list next no-hover no-hover:hover");
                mapArea[1].style.display = "none";        
                tabR.style.right = "0";
                break;
            default:
                nextClick.setAttribute("class", "big-list next");
                previousClick.setAttribute("class", "big-list previous");
                mapArea[0].style.display = "inline";        
                mapArea[1].style.display = "inline";        
        }
    }

    // Close the slideshow.
    function closeSlider() {
        pauseAuto();
        wrap.style.display = "none";
        slide.style.zIndex = 3;
        slide2.style.zIndex = 2;
        removeClass(slide, "dissolve");
        removeClass(slide2, "dissolve");

        if (container.classList) {
            container.classList.add("fade");

            // For Google Chrome 4.0 - 25.0 and Safari 3.1 - 6.0
            container.addEventListener("webkitTransitionEnd", endSlider);

            // For Mozilla Firefox 4.0 - 15.0
            container.addEventListener("mozTransitionEnd", endSlider);

            // For Opera 10.5 - 12.0
            container.addEventListener("oTransitionEnd", endSlider);

            container.addEventListener("transitionend", endSlider);
        } else {
            container.style.display = "none"; // For IE 9-
        }
    }

    // End the slideshow.
    function endSlider() {
        container.classList.remove("fade");
        container.style.display = "none";

        // For Google Chrome 4.0 - 25.0 and Safari 3.1 - 6.0
        container.removeEventListener("webkitTransitionEnd", endSlider);

        // For Mozilla Firefox 4.0 - 15.0
        container.removeEventListener("mozTransitionEnd", endSlider);

        // For Opera 10.5 - 12.0
        container.removeEventListener("oTransitionEnd", endSlider);

        container.removeEventListener("transitionend", endSlider);
    }

    // Close the slideshow by clicking in the window.
    if ("addEventListener" in window) {
        function clickClose(event) {
            if (event.target === container) {closeSlider();}
        }

        window.addEventListener("click", clickClose);
    }

    /* Slide tabs left or right in slideshow.  Feature detection: use
    className and srcElement, instead of browser detection for IE 9 and
    IE 8 respectively. */ 
    function slideTab(event) {
        if (("classList" in document.documentElement &&
        event.target.classList.contains("next") ||
        /\bnext\b/g.test(event.target.className)) && slideIndex < (img.length - 1)) {
            tabR.style.right = "-17px";
            slider.style.cursor = "pointer";
            mapArea[1].style.display = "inline";        
            addClass(nextClick, "dark");
        } else if (("classList" in document.documentElement &&
        event.target.classList.contains("next") ||
        /\bnext\b/g.test(event.target.className)) &&
        slideIndex === (img.length - 1)) {
            tabR.style.right = "0"; // Don't slide right on last photo
            slider.style.cursor = "default";
            mapArea[1].style.display = "none";        
        } else {
            previousTabs();
        }
    } 

    // Slide tabs for previous photos
    function previousTabs() {
        if (slideIndex > 0) {
            tabL.style.left = "-17px";
            slider.style.cursor = "pointer";
            mapArea[0].style.display = "inline";        
            addClass(previousClick, "dark");
        } else if (slideIndex === 0) {
            tabL.style.left = "0"; // Don't slide left on first photo
            slider.style.cursor = "default";
            mapArea[0].style.display = "none";        
        }
    }

    // Slide tabs back in when mouse no longer moves over photo.
    function slideBack() {
        tabR.style.right = "0"; tabL.style.left = "0";
        removeClass(nextClick, "dark"); removeClass(previousClick, "dark");
    } 

    // Feature detection instead of IE 9 browser detection.
    function addClass(el, name) {
        var classes = el.className.split(" "), ind = classes.indexOf(name);

        if ("classList" in document.documentElement) {
            el.classList.add(name);
        } else if (ind == -1) {
            classes = el.className.split(" ");
            classes.push(name);
            el.className = classes.join(" ");
        }
    }

    function removeClass(el, name) {
        if ("classList" in document.documentElement) {
            el.classList.remove(name);
        } else {
            el.className = el.className.replace(name, "");
        }
    }

    // Return to make some functions available outside the module.
    return {
        init: init,
        autoPlay: autoPlay,
        pauseAuto: pauseAuto,
        nextSlide: nextSlide,
        prevSlide: prevSlide,
        closeSlider: closeSlider,
        slideTab: slideTab,
        previousTabs: previousTabs,
        slideBack: slideBack
    };
})(); 
