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
      console.log('random')
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
      console.log('not random')
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


// ...do view stuff here
// ...will need to systemize this, how to position programatically etc.
function renderData(content) {
  // content will includes files, text etc. 
  const container = $('.content')
  // empty container
  container.html('')
  for (var i = 0; i < content.length; i++) {
    let projectUrl = '/home/projects/' + content[i].project
    let fileUrl = content[i].url 
    let el = '<div class="projects__item clip1"><a href=' + projectUrl + '><img src =' + fileUrl + '></a></div>'
    container.append(el)
  }
}



// --- event handlers --- 
function initHandlers() {
  const randomButton = document.querySelector('.dd-random')
  randomButton.addEventListener('click', function() {
    getData(true, false)
  })
  

  // open up dd selection
  const selectButton = $('.dd-select')
  selectButton.on('click', function(e) {
    $('.selector').removeClass('hidden')
  })


  // temp 
  const selectorName = $('.selector__name')
  selectorName.on('click', function(e) {
    $('.selector').addClass('hidden')
    let dataTags = $(this).attr('data-tags')
    let tagsArray = dataTags.split(", ")
    getData(false, tagsArray)
  })
}

for (const cell of document.querySelectorAll(".grid div")) {
  cell.addEventListener('mouseover', function(event) {
  var thiscell = cell.textContent;
    document.querySelector('.show-title').text = '';
    document.querySelector('.show-title').innerText = thiscell;
 })
};

$(document).mousemove(function(event) {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  
  mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
  mouseYpercentage = Math.round(event.pageY / windowHeight * 100);
  
  $('.fix').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #ae7eca, #fff)');
});

	$(document).mousemove(function (e) {
			$(".pointer").css({ left: e.pageX, top: e.pageY });
		});





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
    }
  }
}



// --- route fns ---
function afterProjectEnter() {
  
}

function afterProjectLeave() {
  $('.index').removeClass('blurred')
}

function beforeProjectEnter() {
  $('.index').addClass('blurred')

  $('.project-slider').on('init', function(event, slick) {
    var selectedSlide = $('.project-slider').find('[data-url="' + selectedFile + '"]:not(.slick-cloned)');
    var selectedSlideIndex = selectedSlide.data('slick-index')
    // this is a bit messy; better to find the index 1st + initialize slider with initialSlide
    // rather than sliding to it like this
    setTimeout(function() {
      $('.project-slider').slick('slickGoTo', selectedSlideIndex)
    }, 250)
  })
  $('.project-slider').slick({
    autoplay: false,
    centerMode: true,
    centerPadding: '10vw',
    slidesToShow: 1
  });
}

function initRoutes() {
  barba.use(barbaCss)
  // barba js
  barba.init({
    views: [{
      namespace: 'home',
        afterEnter(data) {
          // console.log('after enter home', data)
        },
        afterLeave(data) {
          // console.log('after leave home', data)
        },
        beforeEnter(data) {
          // console.log('before enter home', data)
        },
        beforeLeave(data) {
          // console.log('before leave home', data)
        }
    }, {
      namespace: 'project',
        afterEnter(data) {
          afterProjectEnter()
        },
        afterLeave(data) {
          afterProjectLeave()
        },
        beforeEnter(data) {
          beforeProjectEnter()
        },
        beforeLeave(data) {
          // console.log('before leave project', data)
        }
    }]
  })


  barba.hooks.beforeEnter((data) => {
    console.log('yes');
    // Set <body> classes for "next" page
    var nextHtml = data.next.html;
    var response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml);
    var bodyClasses = $(response).filter('notbody').attr('class');
    $("body").attr("class", bodyClasses);

});
}

// --- init ---
$(document).ready(function() {
  initIntro()
  initHandlers()
  initRoutes()
})



