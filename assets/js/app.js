// --- variables ---
let currentData = {}
let selectedFile = ''
//const apiUrl = 'http://localhost:8888/dd_kirby/DD/home.json'
const apiUrl = `${window.location.href}home.json`

// --- helpers --- 
var arraysMatch = function (arr1, arr2) {
	if (arr1.length !== arr2.length) return false
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false
	}
	return true
};

var contains = function (arr1, arr2) {
  arr1.some(element => {
    return arr2.indexOf(element) !== -1
  })
}



if ($(window).width() > 1) {
  if ($(window).width() > 768) {
  var time = 4000; 
  }
  else {
    var time = 15000; 
  }
  var activityTimer = setTimeout(inActive, time); 
  
  function resetActive() {
    $('.screensaver').empty();
    clearTimeout(activityTimer);
    activityTimer = setTimeout(inActive, time);
  }
  

  function inActive() {
    var counter = 0;
    var interval_loop = setInterval(function(){
      counter++;

     
      var path = 'https://dailydecisions.space/assets/',
          imgs = ['dd_new.svg'],
          i = Math.floor(Math.random()*imgs.length);
       function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      top_image = getRandomInt(100);
      left = getRandomInt(100);
      rotate = getRandomInt(360);


      if (counter >= 250) {
        $('.screensaver img').first().remove();
        //clearInterval(interval_loop);
    }
  
      $('.screensaver').append("<img style='transform:rotate("+rotate+"deg); left:"+left+"%; top:"+top_image+"%' src='"+path+imgs[i]+"'>").show();
      }, 100);
  
      $(document).bind('mousemove scroll keydown touchstart', function () {
        clearInterval(interval_loop);
      });

  }
  
  $(document).bind('mousemove scroll keydown touchstart', function () {
    resetActive();
  });
  }


// --- api stuf ---
function getData(random, tags) {
  const content = document.querySelector('.content')
  content.classList.add('hidden')
  $.ajax({
    type: "GET",
    url: apiUrl,
  })
  .done(function(data) {
    if (random) {
      if (currentData.hasOwnProperty('random_words')) {
        // if words from new request are not same words currently stored 
        // handle the data (populate content)
        if (!arraysMatch(data.random_words, currentData.random_words)) {
          handleData(data, data.random_words)
        }
        // if they are the same, make request again until they are different
        else {
          getData(true, data.random_words)
        }
      }
      else {
        handleData(data, data.random_words)
      }
    }
    else {
      handleData(data, tags)
    }
  })
  .catch(function(err) {
    console.log('error', err)
  })
}


// clean this up
function handleData(data, tags) {
  const content = document.querySelector('.content')
  const decision = document.querySelector('#decision')
  // if random (no tags passed from event)
  // probably not best way to do this
  if (!tags.length) {

    // update title (DD) with arr from api 
    // updateTitle(data.current_words)
    updateTitle(data.random_words)
    // renderData(data.tagged_files)

    let filteredData = data.all_files.filter((file) => {
      var match = file.tags.some(function(v) { return tags.indexOf(v) != -1 })
      if (match) {
        return file
      }
    })

    renderData(filteredData)

  }
  else {
    // update title (DD) with arr from event 
    updateTitle(tags)

    // find files (data) with matching tags passed originally from evt
    let filteredData = data.all_files.filter((file) => {
      var match = file.tags.some(function(v) { return tags.indexOf(v) != -1 })
      if (match) {
        return file
      }
    })
    renderData(filteredData)
  }
  // reassign global var
  // maybe just use current tags or w.e. instead of whole tree
  currentData = data
}

function updateTitle(arr) {
  const decision = document.querySelector('#decision')
  decision.innerHTML = ''
  for (var i = 0; i < arr.length; i++) {
    decision.innerHTML += arr[i] + ' '
  }
}

// add random clip class to thumbnails
function initClips() {
  var clip_classes = ["clip1", "clip2", "clip3", "clip4", "clip5", "clip6", "clip7", "clip8", "clip8", "clip9", "clip10", "clip11", "clip12", "clip13", "clip14"];

  $(".projects__item").each(function(){
    $(this).addClass(clip_classes[~~(Math.random()*clip_classes.length)]);
  });
}



function renderData(content) {
  // content will includes files, text etc. 
  const container = $('.content')
  // empty container
  container.html('')
  for (var i = 0; i < content.length; i++) {
    //  let projectUrl = '/dd_kirby/DD/home/projects/' + content[i].project
   let projectUrl = '/home/projects/' + content[i].project
    // let fileUrl = content[i].url 
    let fileUrl 
    let el 
    // markup must match file.php snippet
    if (content[i].type == 'image') {
      fileUrl = content[i].resize_url 
      // json stringy seems to work (keep eye on this)
      let dataNumber = '(' + parseInt(content[i].position + 1) + ')'
      let dataTitle = content[i].project_title
      el = '<div class="projects__item" data-number=' + JSON.stringify(dataNumber) + '" data-title=' + JSON.stringify(dataTitle) + '><a href=' + projectUrl + ' data-position=' + content[i].position +'><div class="lin-grad"></div><img data-src =' + fileUrl + ' class="lazy"></a></div>'
    }
    else if (content[i].type == 'audio') {
      fileUrl = content[i].url
      let dataTitle = '(' + parseInt(content[i].position + 1) + ')' + ' ' + content[i].project_title
      el = '<div class="projects__item" data-number=' + JSON.stringify(2) + '" data-title=' + JSON.stringify(dataTitle) + '><a class="circ-grad" href=' + projectUrl + ' data-position=' + content[i].position +'></a><div class="projects__text"><div class="projects__text__inner">' + content[i].filename + '</div></div></div>'
    }
    else if (content[i].type == 'document') {
      fileUrl = content[i].url
      let dataTitle = '(' + parseInt(content[i].position + 1) + ')' + ' ' + content[i].project_title
      el = '<div class="projects__item" data-number=' + JSON.stringify(1) + '" data-title=' + JSON.stringify(dataTitle) + '><a class="circ-grad" href=' + projectUrl + ' data-position=' + content[i].position +'><div class="projects__text"><div class="projects__text__inner">' + content[i].text + '</div></div></a></div>'
    }
    container.append(el)

    setTimeout(function() {
      document.querySelector('.title').classList.remove('load-out')
    }, 1)
    setTimeout(function() {
      document.querySelector('.projects').classList.remove('load-out')
    }, 300)

    // re init lazyload
    lazyLoadInstance.update()
  }

  // empty counter 
  $('.fixed__meta').html('')
  var imageCount = content.filter((file) => file.type === 'image').length
  var audioCount = content.filter((file) => file.type === 'audio').length
  // add rtf here to ensure it doesn't pick up pdf
  var textCount = content.filter((file) => file.type === 'document' && file.extension === 'rtf').length
  var videoCount = content.filter((file) => file.type === 'video').length
  // $('.fixed__meta').append('<div>' + 'Your decision has' + '</div>')
  if (imageCount > 0) {
    $('.fixed__meta').append('<div>' + imageCount + ' ' + 'Images</div>')
  }
  if (audioCount > 0) {
    $('.fixed__meta').append('<div>' + audioCount + ' ' + 'Audios</div>')
  }
  if (textCount > 0) {
    $('.fixed__meta').append('<div>' + textCount + ' ' + 'Texts</div>')
  }
  if (videoCount > 0) {
    $('.fixed__meta').append('<div>' + videoCount + ' ' + 'Videos</div>')
  }


  // scroll back to top when selection made
  // may want to animate this 
  $(document).scrollTop(0);
  // ...

  initThumbHover()
  initClips()
}




// --- event handlers --- 
function initHandlers() {
  const randomButton = document.querySelector('.dd-random')
  randomButton.addEventListener('click', function() {
    document.querySelector('#cursor').classList.add('clicked')
    document.querySelector('.projects').classList.add('load-out')
    document.querySelector('.show-title').classList.add('load-out')
    setTimeout(function() {
      getData(true, false)
      document.querySelector('#cursor').classList.remove('clicked')
      document.querySelector('.dday').classList.add('active')
    }, 300);
  })
  
  if ($(window).width() > 768) {
  const cursor = document.querySelector('#cursor');
  // const cursorCircle = cursor.querySelector('.cursor__circle');
  
  const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
  const pos = { x: 0, y: 0 }; // cursor's coordinates
  const speed = 0.1; // between 0 and 1
  
  var updateCoordinates = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  window.addEventListener('mousemove', updateCoordinates)
  
  
  var updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);
    
    pos.x += diffX * speed;
    pos.y += diffY * speed;
    
  
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';
  
    cursor.style.transform = translate;
  };
  

}


  function initSelectionGrid() {
    for (const cell of document.querySelectorAll(".grid div")) {
      cell.addEventListener('mouseover', function(event) {
        var thiscell = cell.textContent;
        document.querySelector('.show-title').text = '';
        document.querySelector('.show-title').innerText = thiscell;
      })
    }
  }

  // init
  initSelectionGrid()

  // open selector (grid) + bind mouse event
  const selectButton = $('.dd-select')
  selectButton.on('click', function(e) {
    $('.selector').removeClass('hidden')
    lockIndex()
    window.addEventListener('mousemove', updateCoordinates);

    function loop() {
      updateCursor();
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop);
  })


  // make selection + remove mouse event when made
  const selectorName = $('.selector__name')
  selectorName.on('click', function(e) {
    $('.selector').addClass('hidden')
    let dataTags = $(this).attr('data-tags')
    let tagsArray = dataTags.split(", ")
    document.querySelector('.projects').classList.add('load-out');
    document.querySelector('.title').classList.add('load-out')
    getData(false, tagsArray)
    unlockIndex()
    window.removeEventListener('mousemove', updateCoordinates);
    document.querySelector('.dday').classList.add('active');
  })




  $('.projects__outer').mousemove(function(event) {
    var windowWidth_all = window.innerWidth;
    var windowHeight_all = window.innerHeight;
    mouseXpercentage = Math.round(event.pageX / windowWidth_all * 100)
    mouseYpercentage = Math.round(event.pageY / windowHeight_all * 100)
    $('.fix').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #ae7eca, #fff)')
  });


  $(document).mousemove(function (e) {
    $(".pointer").css({ left: e.pageX, top: e.pageY });
  });

  const bg = document.querySelector('.projects__outer');
  const windowWidth = window.innerWidth / 5;
  const windowHeight = window.innerHeight / 5 ;
  
  bg.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / windowWidth;
    const mouseY = e.clientY / windowHeight;
    
    bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
  });

  initThumbHover()
  initDrag()
}

function initDrag() {
  $( ".program-button" ).draggable({
    addClasses: true,
    cursorAt: {
      top: 25,
      left: 25
    }
  });

  $( ".radio__overlay" ).draggable({
    addClasses: true,
    cursor: 'move',
    cursorAt: {
      top: 25,
      left: 25
    }
  });
}


function initThumbHover() {
  const project_items = document.querySelectorAll('.projects__item');
  Array.from(project_items).forEach(function (item) {
    item.addEventListener("mouseenter", function (event) {
      document.querySelectorAll('.projects__item').forEach(element => element.classList.add('blured'));
      item.classList.remove('blured');
      document.querySelector('body').style.backgroundColor = item.getAttribute('data-bg');
      document.querySelector('.fixed__title').setAttribute("href", item.getAttribute('href'));
      document.querySelector('.fixed__title__inner__number').textContent = item.getAttribute('data-number');
      document.querySelector('.fixed__title__inner').textContent = item.getAttribute('data-title');
      document.querySelector('.fixed__title__inner').classList.add('active');
      document.querySelector('.fixed__title').classList.add('active');
    });
    item.addEventListener("mouseleave", function (event) {
      document.querySelector('body').style.backgroundColor = '#000';
      document.querySelectorAll('.projects__item').forEach(element => element.classList.remove('blured'));
      document.querySelector('.fixed__title__inner').classList.remove('active');
      document.querySelector('.fixed__title').classList.remove('active');
    });
  });
}



// --- local storage stuff --
function initIntro() {
  const local_check = localStorage.getItem('typed_off')

  if (local_check !== 'true') {
    const typed_text = document.querySelector('.intro')
    typed_text.classList.add('active')

    const typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      typeSpeed: 50,
      cursorChar: 'D_D',
    });
    
    typed_text.addEventListener('click', typed_off)
    
    function typed_off() {
      localStorage.setItem('typed_off', true)
      typed_text.classList.remove('active')
      document.querySelector('.index').classList.add('active')
    }
  }
  else {
    document.querySelector('.index').classList.add('active')
  }
}


// radio player stuff

var playing = false,
    radio = document.getElementById('radio'),
    player = document.querySelector('.play-wrapper'),
    play_button = document.querySelector('.play'),
    pause_button = document.querySelector('.pause');

document.addEventListener("DOMContentLoaded", function() {

  if (player !== null) {
    player.onclick = function() {
        if (playing == false) {
            radio.play();
            pause_button.classList.remove('hide');
            play_button.classList.add('hide');
            playing = true;

        } else {
            radio.pause();
            pause_button.classList.add('hide');
            play_button.classList.remove('hide');
            playing = false;
        }
    };
  }
});


if (document.querySelector('.swiper') !== null) {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: false,
    slidesPerView: "auto",
    centeredSlides: true,
    preloadImages: false,
    allowTouchMove: true,
    lazy: true,
    watchSlidesVisibility: true,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 5,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">'+'('+ (index + 1) + ')' + "</span>";
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}


function blurIndex() {
  $('.index').addClass('blurred')
}

function focusIndex() {
  $('.index').removeClass('blurred')
}

function lockIndex() {
 // scrollLock.disablePageScroll();
}

function unlockIndex() {
//  scrollLock.enablePageScroll();
}

function initRoutes() {
   barba.use(barbaCss)
  // barba js
  barba.init({
    preventRunning: true,
    prefetchIgnore: false,
    timeout: 20000000000,
    views: [{
      debug: true,
      namespace: 'home',
        afterEnter(data) {
          // ...
        },
        afterLeave(data) {
          // ...
        },
        beforeEnter(data) {
          unlockIndex()
        },
        beforeLeave(data) {
          blurIndex()
          // ...
        }
    }, {
      namespace: 'project',
        afterEnter(data) {
          // ...
        },
        afterLeave(data) {
          // ...
        },
        beforeEnter(data) {
          lockIndex()
          // ...
        },
        beforeLeave(data) {
          focusIndex()
        }
    }, {
      namespace: 'about',
        afterEnter(data) {
          // ...
        },
        afterLeave(data) {
          // ...
        },
        beforeEnter(data) {
          lockIndex()
          // ...
        },
        beforeLeave(data) {
          focusIndex()
        } 
      }, {
      namespace: 'schedule',
        afterEnter(data) {
          // ...
        },
        afterLeave(data) {
          // ...
        },
        beforeEnter(data) {
          lockIndex()
          // ...
        },
        beforeLeave(data) {
          focusIndex()
        } 
      }
    ]
  })
  // ...init hooks
  initHooks()
}

function initProjectSwiper(data) {
  // i.e. if not a text project
  if (document.querySelector('.swiper') !== null) {
    var position = data.trigger.getAttribute('data-position');
    var swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: false,
      slidesPerView: "auto",
      // allowTouchMove: false,
      allowTouchMove: true,
      centeredSlides: true,
      initialSlide: parseInt(position),
      preloadImages: false,
      lazy: true,
      watchSlidesVisibility: true,
      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        dynamicMainBullets: 5,
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">'+'('+ (index + 1) + ')' + "</span>";
        },
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}

function initHooks() {
  barba.hooks.beforeEnter((data) => {
    var nextHtml = data.next.html
    var response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml);
    var bodyClasses = $(response).filter('notbody').attr('class');
    $("body").attr("class", bodyClasses);
    // ...
    initProjectSwiper(data)

    var getUrl = window.location.origin;
    if ( data.next.url.path ) {
        $("a").removeClass('active-item');
        $('a[href$="' + getUrl + data.next.url.path +'"]').addClass('active-item');
    }
  });


  barba.hooks.beforeLeave((data) => {
    document.querySelector('.loader').classList.add('active');
    document.querySelector('.projects').classList.add('load-out')
    document.querySelector('.title').classList.add('load-out')
  });

  barba.hooks.afterEnter((data) => {
    document.querySelector('.projects').classList.remove('load-out')
    document.querySelector('.loader').classList.remove('active');
    document.querySelector('.title').classList.remove('load-out')
  });
  
}

var currenttUrl = window.location;
$('a[href$="' + currenttUrl +'"]').addClass('active-item');



var lazyLoadInstance
function initLazyLoad() {
  lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
  });
}


// --- init ---
$(document).ready(function() {
  initIntro()
  initHandlers()
  initRoutes()
  initLazyLoad()
  initClips()
})





