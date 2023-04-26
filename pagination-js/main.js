'use strict';

const postsContainer = document.querySelector('.posts-container');
const paginationContainer = document.querySelector('.pagination-container');
const allButtons = document.querySelector('.pageButton');

const pageButtons = [];
const totalPages = 20;

for (let i = 1; i <= totalPages; i++) {
  pageButtons.push(i);
}

let currentPage = 1;
const limit = 5;
let currentButton = 1;
let pageGroup = Math.ceil(currentPage / 5) * limit;

let startIndex = (currentPage - 1) * limit;
let endIndex = currentPage * limit;
let result = pageButtons.slice(startIndex, endIndex);

function buttonSetting() {
  const first = document.createElement('button');
  const prev = document.createElement('button');
  const last = document.createElement('button');
  const next = document.createElement('button');

  first.innerText = '<<';
  prev.innerText = '<';
  next.innerText = '>';
  last.innerText = '>>';

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

const postViewer = (currentPage, startIndex, endIndex) => {
  while (postsContainer.firstChild) {
    postsContainer.removeChild(postsContainer.firstChild);
  }
  currentPage;
  startIndex = (currentPage - 1) * limit;
  endIndex = currentPage * limit;
  getPosts(startIndex, endIndex);
};

paginationContainer.addEventListener('click', (event) => {
  if (!isNaN(parseInt(event.target.innerText))) {
    postViewer(
      (currentPage = parseInt(event.target.innerText)),
      startIndex,
      endIndex
    );
  }
  if (event.target.innerText === '<<') {
    postViewer((currentPage = 1), startIndex, endIndex);
  }
  if (event.target.innerText === '>>') {
    postViewer((currentPage = totalPages), startIndex, endIndex);
  }
  if (event.target.innerText === '>') {
    while (postsContainer.firstChild) {
      postsContainer.removeChild(postsContainer.firstChild);
    }

    currentPage = Math.ceil(currentPage / 5) * limit + 1;
    startIndex = (currentPage - 1) * limit;
    endIndex = currentPage * limit;
    result = pageButtons.slice(startIndex, endIndex);
    getPosts(startIndex, endIndex);
  }
  if (event.target.innerText === '<') {
    while (postsContainer.firstChild) {
      postsContainer.removeChild(postsContainer.firstChild);
    }
    currentPage = Math.floor(currentPage / 5) * limit - 4;
    startIndex = (currentPage - 1) * limit;
    endIndex = currentPage * limit;
    getPosts(startIndex, endIndex);
  }
});
