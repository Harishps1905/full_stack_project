
console.log('hello world');


const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = "http://localhost5000/mews";

loading.style.display = 'none';

form.addEventListener('submit', (event) => {

    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
        name,
        content
    };
    console.log(mew);
    loading.style.display = '';
    form.style.display = 'none';
    
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
          'content-type': 'application/json'
        }
    });


});