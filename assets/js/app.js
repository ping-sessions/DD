// --- variables ---
let currentData = {}
let selectedFile = ''
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




// --- api stuf ---
function getData(random, tags) {
  $.ajax({
    type: "GET",
    url: apiUrl,
  })
  .done(function(data) {
    if (random) {
      if (currentData.hasOwnProperty('current_words')) {
        // if words from new request are not same words currently stored 
        // handle the data (populate content)
        if (!arraysMatch(data.current_words, currentData.current_words)) {
          handleData(data, false)
        }
        // if they are the same, make request again until they are different
        else {
          getData(true)
        }
      }
      else {
        handleData(data, false)
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


function handleData(data, tags) {
  const content = document.querySelector('.content')
  const decision = document.querySelector('#decision')
  // if random (no tags passed from event)
  // probably not best way to do this
  if (!tags.length) {
    // update title (DD) with arr from api 
    updateTitle(data.current_words)
    renderData(data.tagged_files)
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



function renderData(content) {
  // content will includes files, text etc. 
  const container = $('.content')
  // empty container
  container.html('')
  for (var i = 0; i < content.length; i++) {
    let projectUrl = '/home/projects/' + content[i].project
    let fileUrl = content[i].url 
    console.log('content', content[i])
    let el 
    // markup must match file.php snippet
    if (content[i].type == 'image') {
      // json stringy seems to work (keep eye on this)
      let dataTitle = '(' + parseInt(content[i].position + 1) + ')' + ' ' + content[i].project_title
      el = '<div class="projects__item clip1" data-title=' + JSON.stringify(dataTitle) + '><a href=' + projectUrl + ' data-position=' + content[i].position +'><img src =' + fileUrl + '></a></div>'
    }
    else if (content[i].type == 'audio') {
      let dataTitle = '(' + parseInt(content[i].position + 1) + ')' + ' ' + content[i].project_title
      el = '<div class="projects__item" data-title=' + JSON.stringify(dataTitle) + '><a href=' + projectUrl + ' data-position=' + content[i].position +'><audio controls><source src =' + fileUrl + ' type="audio/mpeg"></audio></a></div>'
    }
    else if (content[i].type == 'document') {
      let dataTitle = '(' + parseInt(content[i].position + 1) + ')' + ' ' + content[i].project_title
      el = '<div class="projects__item" data-title=' + JSON.stringify(dataTitle) + '><a href=' + projectUrl + ' data-position=' + content[i].position +'><div class="projects__text">' + content[i].text + '</div></a></div>'
    }
    container.append(el)
  }
  // scroll back to top when selection made
  // may want to animate this 
  $(document).scrollTop(0);
  // ...
  initThumbHover()
}



// --- event handlers --- 
function initHandlers() {
  const randomButton = document.querySelector('.dd-random')
  randomButton.addEventListener('click', function() {
    document.querySelector('.projects').classList.add('load-out');
    setTimeout(function(){
      getData(true, false)
    },700);

    setTimeout(function(){
      document.querySelector('.projects').classList.remove('load-out');
    },1500);
  })
  

  function cursorSelect(e) {
    var cursor = document.querySelector('.cursor');
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
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
    document.addEventListener('mousemove', cursorSelect)
  })


  // make selection + remove mouse event when made
  const selectorName = $('.selector__name')
  selectorName.on('click', function(e) {
    $('.selector').addClass('hidden')
    let dataTags = $(this).attr('data-tags')
    let tagsArray = dataTags.split(", ")
    getData(false, tagsArray)
    unlockIndex()
    document.removeEventListener('mousemove', cursorSelect);
  })

  
  $(document).mousemove(function(event) {
    windowWidth = $(window).width()
    windowHeight = $(window).height()
    mouseXpercentage = Math.round(event.pageX / windowWidth * 100)
    mouseYpercentage = Math.round(event.pageY / windowHeight * 100)
    $('.fix').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #ae7eca, #fff)')
   // $('.fix').css('background', 'repeating-conic-gradient(#fff ' + mouseYpercentage/5.5 +'%, #ae7eca ' +100+'%, #fff ' + 0 +'%, #ae7eca ' + mouseXpercentage +'%) ' +  mouseXpercentage +'% ' + 50 +'% / 100% 100% repeat')
  });


  $(document).mousemove(function (e) {
    $(".pointer").css({ left: e.pageX, top: e.pageY });
  });

  initThumbHover()
}


function initThumbHover() {
  const project_items = document.querySelectorAll('.projects__item');
  Array.from(project_items).forEach(function (item) {
    item.addEventListener("mouseenter", function (event) {
      document.querySelectorAll('.projects__item').forEach(element => element.classList.add('blured'));
      item.classList.remove('blured');
      document.querySelector('body').style.backgroundColor = item.getAttribute('data-bg');

      document.querySelector('.fixed__title__inner__number').textContent = item.getAttribute('data-number');
      document.querySelector('.fixed__title__inner').textContent = item.getAttribute('data-title');
      document.querySelector('.fixed__title__inner').classList.add('active');
    });
    item.addEventListener("mouseleave", function (event) {
      document.querySelector('body').style.backgroundColor = '#000';
      document.querySelectorAll('.projects__item').forEach(element => element.classList.remove('blured'));
      document.querySelector('.fixed__title__inner').classList.remove('active');
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
      typeSpeed: 70,
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


if (document.querySelector('.swiper') != null) {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: false,

    slidesPerView: "1.5",
    centeredSlides: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
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






function blurIndex() {
  $('.index').addClass('blurred')
}

function focusIndex() {
  $('.index').removeClass('blurred')
}

function lockIndex() {
  scrollLock.disablePageScroll();
}

function unlockIndex() {
  scrollLock.enablePageScroll();
}

function initRoutes() {
  barba.use(barbaCss)
  // barba js
  barba.init({
    views: [{
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
      }
    ]
  })
  // ...init hooks
  initHooks()
}

function initProjectSwiper(data) {
  // i.e. if not a text project
  if (document.querySelector('.swiper') != null) {
    var position = data.trigger.getAttribute('data-position');
    console.log('position >', position)
    var swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: false,
      slidesPerView: 1.5,
      centeredSlides: true,
      initialSlide: parseInt(position),
  
      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
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
    console.log('before enter hook...')
    var nextHtml = data.next.html
    var response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml);
    var bodyClasses = $(response).filter('notbody').attr('class');
    $("body").attr("class", bodyClasses);
    // ...
    initProjectSwiper(data)
  });
}






// --- init ---
$(document).ready(function() {
  initIntro()
  initHandlers()
  initRoutes()
})





