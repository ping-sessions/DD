const title = document.querySelector('.title')
const content = document.querySelector('.content')
const button = document.querySelector('.load-more')

// reassign this variable with current data on each succesful request
let currentData = {}
// endpoint url 
const url = `${window.location.href}home.json`



// helper -- check if two array are the same
var arraysMatch = function (arr1, arr2) {
	if (arr1.length !== arr2.length) return false
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false
	}
	return true
};


// another option would be to store all words/name pairs in the endpoint to begin with
// then increment through these 
function getData(endpoint) {
  console.log('get data')
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
  content.innerHTML = data.html
  title.innerHTML = ''
  for (var i = 0; i < data.current_words.length; i++) {
    title.innerHTML += data.current_words[i] + ' '
  }
  currentData = data
}

function handleClick() {
  getData(url)
}

button.addEventListener('click', handleClick)


// barba js
barba.init({
  views: [{
    namespace: 'home',
    beforeLeave(data) {
      console.log('leave home')
      // do something before leaving the current `index` namespace
    }
  }, {
    namespace: 'project',
    beforeEnter(data) {
      console.log('enter project')
      // do something before entering the `contact` namespace
    }
  }]
})