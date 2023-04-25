'use strict';

const postsContainer = document.querySelector('.posts-container');
const posts = [];

let data = async () =>
  (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
data()
  .then((res) => {
    res.forEach((val) => {
      postsContainer.insertAdjacentHTML(
        'beforeend',
        `
    <ul>
      <li>${val.id}</li>
    </ul>
  `
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then((response) => response.json())
//   .then((data) => {
//     data.map((val) => {
//       let jsonData = JSON.stringify(val.title);
//       posts.push(jsonData);
//     });
//   })
//   .catch((error) => console.log(error));

// console.log(posts);

const paginationContainer = document.querySelector('.pagination-container');
const allButtons = document.querySelector('.pageButton');

const pageButtons = [];
const totalPages = 20;
let currentButton = 2;

for (let i = 1; i <= totalPages; i++) {
  pageButtons.push(i);
}

let page = 1;
const limit = 10;

const startIndex = (page - 1) * limit;
const endIndex = page * limit;

const result = pageButtons.slice(startIndex, endIndex);

const first = document.createElement('button');
const prev = document.createElement('button');
const last = document.createElement('button');
const next = document.createElement('button');

first.innerText = '<<';
prev.innerText = '<';
next.innerText = '>';
last.innerText = '>>';

function buttonSetting() {
  paginationContainer.appendChild(first);
  paginationContainer.appendChild(prev);

  result.map((element, index) => {
    let pageButton = document.createElement('button');
    pageButton.innerText = element;
    pageButton.setAttribute('key', index + 1);
    paginationContainer.appendChild(pageButton);
  });

  paginationContainer.appendChild(next);
  paginationContainer.appendChild(last);
}

paginationContainer.addEventListener('click', (event) => {
  currentButton = parseInt(event.target.innerText);
  if (currentButton === parseInt(event.target.innerText)) {
    console.log('aa');
  }
  //   if (currentButton !== parseInt(event.target.innerText)) {
  //     console.log('aa');
  //     event.target.classList.remove('btn-active');
  //   }
  //   if (!isNaN(parseInt(event.target.innerText))) {
  //     console.log('dd');
  //     currentButton = parseInt(event.target.innerText);
  //   }
});

buttonSetting();
