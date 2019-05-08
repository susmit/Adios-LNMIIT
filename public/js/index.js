const DEBUG = false;
const REPETITION_COUNT = 2; // number of times each pixel is assigned to a canvas
const NUM_FRAMES = 64;

/**
* Generates the individual subsets of pixels that are animated to create the effect
* @param {HTMLCanvasElement} ctx
* @param {number} count The higher the frame count, the less grouped the pixels will look - Google use 32, but for our elms we use 128 since we have images near the edges
* @return {HTMLCanvasElement[]} Each canvas contains a subset of the original pixels
*/
function generateFrames($canvas, count = 32) {
  const { width, height } = $canvas;
  const ctx = $canvas.getContext("2d");
  const originalData = ctx.getImageData(0, 0, width, height);
  const imageDatas = [...Array(count)].map(
  (_, i) => ctx.createImageData(width, height));


  // assign the pixels to a canvas
  // each pixel is assigned to 2 canvas', based on its x-position
  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      for (let i = 0; i < REPETITION_COUNT; ++i) {
        const dataIndex = Math.floor(
        count * (Math.random() + 2 * x / width) / 3);

        const pixelIndex = (y * width + x) * 4;
        // copy the pixel over from the original image
        for (let offset = 0; offset < 4; ++offset) {
          imageDatas[dataIndex].data[pixelIndex + offset] =
          originalData.data[pixelIndex + offset];
        }
      }
    }
  }

  // turn image datas into canvas'
  return imageDatas.map(data => {
    const $c = $canvas.cloneNode(true);
    $c.getContext("2d").putImageData(data, 0, 0);
    return $c;
  });
}

/**
   * Inserts a new element over an old one, hiding the old one
   */
function replaceElementVisually($old, $new) {
  const $parent = $old.offsetParent;
  $new.style.top = `${$old.offsetTop}px`;
  $new.style.left = `${$old.offsetLeft}px`;
  $new.style.width = `${$old.offsetWidth}px`;
  $new.style.height = `${$old.offsetHeight}px`;
  $parent.appendChild($new);
  $old.style.visibility = "hidden";
}

/**
   * Disintegrates an element
   * @param {HTMLElement} $elm
   */
  function disintegrate($elm) {
  html2canvas($elm).then($canvas => {
    // create the container we'll use to replace the element with
    const $container = document.createElement("div");
    $container.classList.add("disintegration-container");

    // setup the frames for animation
    const $frames = generateFrames($canvas, NUM_FRAMES);
    $frames.forEach(($frame, i) => {
      $frame.style.transitionDelay = `${1.35 * i / $frames.length}s`;
      $container.appendChild($frame);
    });

    // then insert them into the DOM over the element
    replaceElementVisually($elm, $container);

    // then animate them
    $container.offsetLeft; // forces reflow, so CSS we apply below does transition
    if (!DEBUG) {
      // set the values the frame should animate to
      // note that this is done after reflow so the transitions trigger
      $frames.forEach($frame => {
        const randomRadian = 2 * Math.PI * (Math.random() - 0.5);
        $frame.style.transform =
        `rotate(${15 * (Math.random() - 0.5)}deg) translate(${60 * Math.cos(randomRadian)}px, ${30 * Math.sin(randomRadian)}px)
rotate(${15 * (Math.random() - 0.5)}deg)`;
        $frame.style.opacity = 0;
      });
    } else {
      $frames.forEach($frame => {
        $frame.style.animation = `debug-pulse 1s ease ${$frame.style.transitionDelay} infinite alternate`;
      });
    }
    // setTimeout(function(){
    //   var div = document.createElement('DIV');
    //   div.setAttribute('class', "item disintegration-target");
    //   var elem = document.createElement("img");
    //   elem.setAttribute("src", "/public/susmit-removebg.png");
    //   div.appendChild(elem);
    //   // var h = document.createElement("H1")                // Create a <h1> element
    //   // var t = document.createTextNode("Hello World");     // Create a text node
    //   // h.appendChild(t);
    //   // div.appendChild(h);  
    //   $elm.replaceWith(div);
    //   redo()
    // }, 3000); 
  });
}


function myFunction() {
  //const $parent = $old.offsetParent;
  //var elem = document.createElement("img");
  //elem.setAttribute("src", "/public/ironman.png");
  //$parent.appendChild(elem);
  var div = document.createElement('DIV');
  div.setAttribute('class', "item disintegration-target");
  var h = document.createElement("H1")                // Create a <h1> element
  var t = document.createTextNode("Hello World");     // Create a text node
  h.appendChild(t);
  div.appendChild(h);  
  //document.getElementById("line").appendChild(div);
  document.body.appendChild(div)
}

var countDownDate = new Date("May 10, 2019 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

 

      // function create() {
      //   var h1 = document.createElement('h1');
      //   h1.textContent = "New Heading!!!";
      //   h1.setAttribute('class', 'note');
      //   document.body.appendChild(h1);
      // }

      // const yourFunction = async () => {
      //   await delay(5000);
      //   var elem = document.createElement("img");
      //   elem.setAttribute("src", "/public/ironman.png");
      //   document.getElementById("line").appendChild(elem); 
      //   console.log("Waited 5s");
      // };

      var delay = ( function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    // function redo(){
    //   [...document.querySelectorAll(".disintegration-target")].forEach($elm => {
    //     $elm.addEventListener("click", () => {
    //       if ($elm.disintegrated) {return;}
    //       $elm.disintegrated = true;
    //       disintegrate($elm);
    //       //myFunction()
    //     });
    //   });
    // }

/** === Below is just to bind the module and the DOM == */
[...document.querySelectorAll(".disintegration-target")].forEach($elm => {
  $elm.addEventListener("click", () => {
    if ($elm.disintegrated) {return;}
    $elm.disintegrated = true;
    disintegrate($elm);
    document.getElementById('snap').play()
    //myFunction()
  });
});

[...document.querySelectorAll(".mySlides")].forEach($elm => {
  $elm.addEventListener("click", () => {
    if ($elm.disintegrated) {return;}
    $elm.disintegrated = true;
    disintegrate($elm);
    document.getElementById('snap').play()
    //myFunction()
  });
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}