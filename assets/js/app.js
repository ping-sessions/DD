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


// async option
// const fetchContent = async () => {
//   // let url = `${window.location.href}home.json/page:${page}`;
//   let url = `${window.location.href}home.json`;
  
//   try {
//     const response = await fetch(url);
//     const { html, current_words } = await response.json();
//     title.innerHTML = ''
//     for (var i = 0; i < current_words.length; i++) {
//       title.innerHTML += current_words[i] + ' '
//     }
//     // overwrite current content
//     content.innerHTML = html;
//   } catch (error) {
//     // throw error here
//     console.log('Fetch error: ', error);
//   }
// }

// button.addEventListener('click', fetchContent);



//typed.js intro

const local_check = localStorage.getItem('typed_off');

if (local_check !== 'true') {
  const typed_text = document.querySelector('#typed');
  typed_text.classList.add('active');

  const typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 70,
     cursorChar: 'D_D',
  });
  
  typed_text.addEventListener('click', typed_off);
  
  function typed_off() {
    localStorage.setItem('typed_off', true);
    typed_text.classList.remove('active');
  }
}


