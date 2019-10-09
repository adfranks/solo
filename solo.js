/* Create automatic slide show in modal.  Show, hide, and style slideshow 
navigation at particular times.  Use the revealing module pattern. */
var theModal = (function () {
    var modalImg = document.getElementById("img01"),
    modalImg2 = document.getElementById("img02"),
    modalDiv = document.getElementById("inner-modal"),
    modalNumber = document.getElementById("photo-number"),
    modalArea = document.getElementsByTagName("area"),
    modal = document.querySelector(".modal"),
    img = document.querySelectorAll(".myImg"),
    nextClick = document.querySelectorAll(".next")[2],
    previousClick = document.querySelectorAll(".previous")[2],
    tabL = document.querySelector(".tab"),
    tabR = document.querySelector(".tab2"),
    modalPlay = document.querySelectorAll(".play"),
    modalPause = document.querySelectorAll(".pause"),
    modalContent = document.querySelector(".modal-content"),
    t, photoIndex = 0, p = false;
    
    /* Open modal, have the photo's container zoom in, set the source of the 
    image, and set-up the navigation to initially look and work properly. */
    function openModal(event) {
        responsiveModal();
        tabL.style.visibility = "hidden";
        tabR.style.visibility = "hidden";
        modal.style.display = "block";
        modalImg.src = event.target.src;
        photoIndex = parseInt(event.target.id);
        modalNumber.innerHTML = (photoIndex > 8) ? photoIndex + 1:"0" + (photoIndex + 1);
        if ((modalDiv.style.WebkitAnimation || modalDiv.style.MozAnimation ||
            modalDiv.style.animation) == undefined) {
            modalContent.style.display = "block"; // For IE 9-
        } else {
            modalDiv.style.visibility = "hidden";
            setTimeout(modalDivVisible, 2400);
            // For Google Chrome 4.0+, Safari 4.0+, and Opera 15.0+
            modal.addEventListener("webkitAnimationEnd", function() {
            modalContent.style.display = "block";
            });
            // For Mozilla Firefox 5.0 - 15.0
            modal.addEventListener("mozAnimationEnd", function() {
            modalContent.style.display = "block";
            });
            modal.addEventListener("animationend", function() {
            modalContent.style.display = "block";
            });
        }
        if (photoIndex === 0) {
            previousClick.setAttribute("class", "big-list previous no-hover no-hover:hover");
            nextClick.setAttribute("class", "big-list next");
        } else if (photoIndex === img.length - 1) {
            nextClick.setAttribute("class", "big-list previous no-hover no-hover:hover");
            previousClick.setAttribute("class", "big-list next");
        } else { 
            nextClick.setAttribute("class", "big-list next");
            previousClick.setAttribute("class", "big-list next");
        }
        setTimeout(mapResponse, 1200);
    }

    function modalDivVisible() {
        modalDiv.style.visibility = "visible";
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
        modalContent.style.width = modalWidth + "px";
        modalImg.style.height = (modalWidth - 24) * 4 / 3 + "px";
        mapResponse();
    }

    // Make map responsive
    function mapResponse() {
        var cw = modalImg.clientWidth, ch = modalImg.clientHeight;
        modalArea[0].coords = "0,0," + cw / 2 + "," + ch;
        modalArea[1].coords = cw / 2 + ",0," + cw + "," + ch;
    }

    // Start the automatic slideshow.
    function consecutivePhoto() {
        modalPlay[0].style.display = "none"; modalPause[0].style.display = "inline";
        if (photoIndex === (img.length - 1)) {photoIndex = -1;} // Ensure slideshow loops
        changePhoto();
        t = setTimeout(consecutivePhoto, 5800);
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

    /* Make the next or previous photo in the slideshow appear.  Have the
    correct photo number displayed. */
    function changePhoto() {

        // Reverse slideshow if previousPhoto was called
        photoIndex = (!p) ? photoIndex + 1:photoIndex - 1;
        p = false;

        if ("classList" in document.documentElement && modalImg.classList.contains("dissolve") ||
            /dissolve/g.test(modalImg.className)) {
            modalImg2.style.zIndex = 3;
            modalImg.style.zIndex = 2;
            addClass(modalImg2, "dissolve");
            modalImg.src = img[photoIndex].src; 
            removeClass(modalImg, "dissolve");
        } else {
            modalImg.style.zIndex = 3;
            modalImg2.style.zIndex = 2;
            addClass(modalImg, "dissolve");
            modalImg2.src = img[photoIndex].src; 
            removeClass(modalImg2, "dissolve");
        }
        modalNumber.innerHTML = (photoIndex > 8) ? photoIndex + 1:"0" + (photoIndex + 1);

        // Make the navigation display differently on first and last photo
        switch (photoIndex) {
            case (0): 
                previousClick.setAttribute("class", "big-list previous no-hover no-hover:hover");
                nextClick.setAttribute("class", "big-list next");
                modalArea[0].style.display = "none";        
                modalArea[1].style.display = "inline";        
                tabL.style.left = "0";
                break;
            case (img.length - 1):
                nextClick.setAttribute("class", "big-list next no-hover no-hover:hover");
                modalArea[1].style.display = "none";        
                tabR.style.right = "0";
                break;
            default:
                nextClick.setAttribute("class", "big-list next");
                previousClick.setAttribute("class", "big-list previous");
                modalArea[0].style.display = "inline";        
                modalArea[1].style.display = "inline";        
        }
    }

    // Pause the slideshow
    function pauseConsecutivePhoto() {
        clearTimeout(t);    
        modalPause[0].style.display = "none"; modalPlay[0].style.display = "inline";
    }

    // Display next photo
    function nextPhoto() {
        if (photoIndex < (img.length - 1)) {
            pauseConsecutivePhoto();
            changePhoto();
        }
    }

    // Display previous photo
    function previousPhoto() {
        if (photoIndex != 0) {
            pauseConsecutivePhoto();
            p = true;
            changePhoto();
        }
    }

    // Close the slideshow.
    function stopConsecutivePhoto() {
        pauseConsecutivePhoto();
        modalContent.style.display = "none";
        modalImg.style.zIndex = 3;
        modalImg2.style.zIndex = 2;
        removeClass(modalImg, "dissolve");
        removeClass(modalImg2, "dissolve");
        if (modal.classList) {
            modal.classList.add("fade");
            // For Google Chrome 4.0 - 25.0 and Safari 3.1 - 6.0
            modal.addEventListener("webkitTransitionEnd", closeModal);
            // For Mozilla Firefox 4.0 - 15.0
            modal.addEventListener("mozTransitionEnd", closeModal);
            // For Opera 10.5 - 12.0
            modal.addEventListener("oTransitionEnd", closeModal);
            modal.addEventListener("transitionend", closeModal);
        } else {
            modal.style.display = "none"; // For IE 9-
        }
    }

    // Close the modal.
    function closeModal() {
        modal.classList.remove("fade");
        modal.style.display = "none";
        // For Google Chrome 4.0 - 25.0 and Safari 3.1 - 6.0
        modal.removeEventListener("webkitTransitionEnd", closeModal);
        // For Mozilla Firefox 4.0 - 15.0
        modal.removeEventListener("mozTransitionEnd", closeModal);
        // For Opera 10.5 - 12.0
        modal.removeEventListener("oTransitionEnd", closeModal);
        modal.removeEventListener("transitionend", closeModal);
    }

    // Close modal by clicking in the window.
    if ("addEventListener" in window) {
        function clickClose(event) {
            if (event.target === modal) {stopConsecutivePhoto();}
        }
        window.addEventListener("click", clickClose);
    }

    /* Slide tabs left or right in slideshow.  Feature detection: use
    className and srcElement, instead of browser detection for IE 9 and
    IE 8 respectively. */ 
    function slideTab(event) {
        if (("classList" in document.documentElement &&
        event.target.classList.contains("next") ||
        /\bnext\b/g.test(event.target.className)) && photoIndex < (img.length - 1)) {
            tabR.style.right = "-17px";
            modalDiv.style.cursor = "pointer";
            modalArea[1].style.display = "inline";        
            addClass(nextClick, "dark");
        } else if (("classList" in document.documentElement &&
        event.target.classList.contains("next") ||
        /\bnext\b/g.test(event.target.className)) &&
        photoIndex === (img.length - 1)) {
            tabR.style.right = "0"; // Don't slide right on last photo
            modalDiv.style.cursor = "default";
            modalArea[1].style.display = "none";        
        } else {
            previousTabs();
        }
    } 

    // Slide tabs for previous photos
    function previousTabs() {
        if (photoIndex > 0) {
            tabL.style.left = "-17px";
            modalDiv.style.cursor = "pointer";
            modalArea[0].style.display = "inline";        
            addClass(previousClick, "dark");
        } else if (photoIndex === 0) {
            tabL.style.left = "0"; // Don't slide left on first photo
            modalDiv.style.cursor = "default";
            modalArea[0].style.display = "none";        
        }
    }

    // Slide tabs back in when mouse no longer moves over photo.
    function slideBack() {
        tabR.style.right = "0"; tabL.style.left = "0";
        removeClass(nextClick, "dark"); removeClass(previousClick, "dark");
    } 

    // Return to make some functions available outside the module.
    return {
        openModal: openModal,
        consecutivePhoto: consecutivePhoto,
        pauseConsecutivePhoto: pauseConsecutivePhoto,
        nextPhoto: nextPhoto,
        previousPhoto: previousPhoto,
        stopConsecutivePhoto: stopConsecutivePhoto,
        slideTab: slideTab,
        previousTabs: previousTabs,
        slideBack: slideBack
    };
})(); 
