console.log('Hello World!');





const form = document.querySelector('form'); // grabbing an element on the page
const errorElement = document.querySelector('.error-message');
const loadingElement = document.querySelector('.loading');
let mewsElement = document.querySelector('.mews');
const loadMoreElement = document.querySelector('#loadMore');
const sortCont = document.querySelector('#sort-container');
let ascSort = document.querySelector('#asc_sort');
let desSort = document.querySelector('#des_sort');
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:5000/v2/mews' : 'https://meower-api.now.sh/v2/mews';



let skip = 0;
let limit = 10;
let loading = false;
let finished = false;

errorElement.style.display = 'none';

document.addEventListener('scroll', () => {
  const rect = loadMoreElement.getBoundingClientRect();
  if (rect.top < window.innerHeight && !loading && !finished) {
    loadMore();
  }
});

listAllMews();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');

  if (name.trim() && content.trim()) {
    errorElement.style.display = 'none';
    form.style.display = 'none';
    loadingElement.style.display = '';

    const mew = {
      name,
      content
    };
    
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(mew),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {      
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType.includes('json')) {
          return response.json().then(error => Promise.reject(error.message));
        } else {
          return response.text().then(message => Promise.reject(message));
        }
      }
    }).then(() => {
      form.reset();
      setTimeout(() => {
        form.style.display = '';
      }, 5000);
      listAllMews();
    }).catch(errorMessage => {
      form.style.display = '';
      errorElement.textContent = errorMessage;
      errorElement.style.display = '';
      loadingElement.style.display = 'none';
    });
  } else {
    errorElement.textContent = 'Name and content are required!';
    errorElement.style.display = '';
  }
});

function loadMore() {
  skip += limit;
  listAllMews(false);
}

function listAllMews(reset = true) {
  loading = true;
  if (reset) {
    mewsElement.innerHTML = '';
    skip = 0;
    finished = false;
  }
  fetch(`${API_URL}?skip=${skip}&limit=${limit}`)
    .then(response => response.json())
    .then(result => {
      result.mews.forEach(mew => {
        const div = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = mew.name;

        const contents = document.createElement('p');
        contents.textContent = mew.content;

        const date = document.createElement('small');
        date.textContent = new Date(mew.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        mewsElement.appendChild(div);
      });

      loadingElement.style.display = 'none';
      if (!result.meta.has_more) {
        loadMoreElement.style.visibility = 'hidden';
        finished = true;
      } else {
        loadMoreElement.style.visibility = 'visible';
      }
      loading = false;

      
      function sortFunction() { 
        result.mews.forEach((e) => {
         
        const headerSection = document.querySelector('#header');  
        const main = document.querySelector('#main');  
        headerSection.style.display = 'none';
        main.style.display = 'none';

        const div_pop = document.createElement('div');
        div_pop.classList.add("sort_div");
        const headerAlp = document.createElement('h3');
        headerAlp.textContent = e.name;

        const contentsAlp = document.createElement('p');
        contentsAlp.textContent = e.content;

        const dateAlp = document.createElement('small');
        dateAlp.textContent = new Date(e.created);
        
        div_pop.appendChild(headerAlp);
        div_pop.appendChild(contentsAlp);
        div_pop.appendChild(dateAlp);
        sortCont.appendChild(div_pop);
        // console.log(`${e.name} ${e.content}`);
        const sortClose = document.querySelector('#sort_close');
        sortClose.addEventListener('click', () => { 
          sortCont.removeChild(div_pop);
          headerSection.style.display = '';
          main.style.display = '';
          sortCont.style.display = '';
        });
          
        });
      };

      ascSort.addEventListener('click', () => {
        sortCont.style.display = 'block';
        bodyBig.style.overflow = 'hidden';
        bodyBig.style.height = '100%';

        result.mews.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      sortFunction(); 
      }); 

      desSort.addEventListener('click', () => {
        sortCont.style.display = 'block';
        bodyBig.style.overflow = 'hidden';
        bodyBig.style.height = '100%';

        result.mews.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
        sortFunction();
      }); 

    
    });
  

}