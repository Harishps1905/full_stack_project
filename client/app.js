
// search button
// let searchBox = document.querySelector("#search_input_box");
// let searchBtn = document.querySelector("#search_1");
// searchBtn.addEventListener('click', function () {
//     searchBox.style.display = 'block';
// });


// let closeSearch = document.querySelector('#close_search');

// closeSearch.addEventListener('click', function () {
//     searchBox.style.display = '';
// });



// register popup
let openpopBtn = document.querySelector('#reg-popbtn,#contact');
let closepopBtn = document.querySelector('.close-btn');
let regPopup = document.querySelector('#reg-popup');
let bodyBig = document.querySelector('body');
let logBtn = document.querySelector('#log-btn');
let logOut = document.querySelector('#log-out');


openpopBtn.addEventListener('click', () => {
    regPopup.style.display = 'block';
    bodyBig.style.overflow = 'hidden';
    bodyBig.style.height = '100%';
});

closepopBtn.addEventListener('click', () => { 
    regPopup.style.display = 'none';
    bodyBig.style.overflow = 'visible';
    bodyBig.style.height = '100%';
});

logBtn.addEventListener('click', () => {

    setTimeout(() => {
        location.replace("index.html");
    }, 0);
});


// logOut.addEventListener('click', () => {
//     setTimeout(() => {
//         location.replace("login.html");
//     }, 0);
// })