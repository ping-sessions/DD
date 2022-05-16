const title = document.querySelector('.title');
const content = document.querySelector('.content');
const button = document.querySelector('.load-more');
// let page = parseInt(element.getAttribute('data-page'));

const fetchContent = async () => {
  // let url = `${window.location.href}home.json/page:${page}`;
  let url = `${window.location.href}home.json`;

  try {
    const response = await fetch(url);
    const { html, current_words } = await response.json();
    title.innerHTML = ''
    for (var i = 0; i < current_words.length; i++) {
      title.innerHTML += current_words[i] + ' '
    }

    // overwrite current content
    content.innerHTML = html;
    content
  } catch (error) {
    // throw error here
    console.log('Fetch error: ', error);
  }
}

button.addEventListener('click', fetchContent);