'use strict';

const postsContainer = document.querySelector('.posts-container');
const paginationContainer = document.querySelector('.pagination-container');
const allButtons = document.querySelector('.pageButton');

const pageButtons = [];
const totalPages = 20;
let currentButton = 2;

for (let i = 1; i <= totalPages; i++) {
  pageButtons.push(i);
}

let page = 1;
const limit = 5;

let startIndex = (page - 1) * limit;
let endIndex = page * limit;

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

buttonSetting();

const getPosts = async (startIndex, endIndex) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (response.ok) {
      const data = await response.json();
      const currentPosts = data.slice(startIndex, endIndex);
      console.log(data);
      currentPosts.forEach((val) => {
        postsContainer.insertAdjacentHTML(
          'beforeend',
          `
            <li>${val.id}</li>
        `
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
};

getPosts(startIndex, endIndex);

paginationContainer.addEventListener('click', (event) => {
  if (!isNaN(parseInt(event.target.innerText))) {
    while (postsContainer.firstChild) {
      postsContainer.removeChild(postsContainer.firstChild);
    }
    console.log('dd');
    page = parseInt(event.target.innerText);
    startIndex = (page - 1) * limit;
    endIndex = page * limit;
    getPosts(startIndex, endIndex);
  }
});
