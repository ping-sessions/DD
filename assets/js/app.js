// --- variables ---
let currentData = {}
let selectedFile = ''
const url = `${window.location.href}home.json`


// --- helpers --- 
var arraysMatch = function (arr1, arr2) {
	if (arr1.length !== arr2.length) return false
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false
	}
	return true
};


// --- api ---
function getData(endpoint) {
  $.ajax({
    type: "GET",
    url: endpoint,
  })
  .done(function(data) {
    if (currentData.hasOwnProperty('current_words')) {
      // if words from new request are not same words currently stored 
      // handle the data (populate content)
      if (!arraysMatch(data.current_words, currentData.current_words)) {
        handleData(data)
      }
      // if they are the same, make request again until they are different
      else {
        getData(endpoint)
      }
    }
    else {
      handleData(data)
    }
  })
  .catch(function(err) {
    console.log('error', err)
  })
}

function handleData(data) {
  const content = document.querySelector('.content')
  const decision = document.querySelector('#decision')
  content.innerHTML = data.html
  decision.innerHTML = ''
  for (var i = 0; i < data.current_words.length; i++) {
    decision.innerHTML += data.current_words[i] + ' '
  }
  currentData = data
}

function handleRandomClick() {
  getData(url)
}

function handleSelectClick() {
  getData(url)
}


// --- handlers --- 
function initHandlers() {
  const randomButton = document.querySelector('.dd-random')
  randomButton.addEventListener('click', handleRandomClick)
  const selectButton = document.querySelector('.dd-select')
  selectButton.addEventListener('click', handleSelectClick)
}

function initRoutes() {
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
        });


      },
      afterLeave(data) {
        $('.index').removeClass('blurred')
        // console.log('after leave project', data)
      },
      beforeEnter(data) {
        // console.log('before enter project', data)
        // update global variable of selected file based on url of link triggered
        $('.index').addClass('blurred')
        selectedFile = data.trigger.querySelector('img').getAttribute('src')
        console.log('set selected file >', selectedFile)
      },
      beforeLeave(data) {
        // console.log('before leave project', data)
      }
    }]
  })
}

// --- init ---
$(document).ready(function() {
  initHandlers()
  initRoutes()
})