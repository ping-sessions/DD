const element = document.querySelector('.projects');
const button  = document.querySelector('.load-more');
let page      = parseInt(element.getAttribute('data-page'));

const fetchProjects = async () => {
  console.log('fetch projects')
  let url = `${window.location.href}home.json/page:${page}`;
  try {
    const response = await fetch(url);
    const { html, more } = await response.json();
    button.hidden        = !more;
    element.innerHTML    += html;
    page++;
  } catch (error) {
    console.log('Fetch error: ', error);
  }
}

button.addEventListener('click', fetchProjects);