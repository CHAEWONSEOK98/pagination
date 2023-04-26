'use strict';

const postsContainer = document.querySelector('.posts-container');
const paginationContainer = document.querySelector('.pagination-container');
const allButtons = document.querySelector('.pageButton');

const pageButtons = [];
const totalPages = 20;

for (let i = 1; i <= totalPages; i++) {
  pageButtons.push(i);
}

const limit = 5;
let currentPage = 1;
let currentButton = 1;

let startIndex = (currentPage - 1) * limit;
let endIndex = currentPage * limit;
let result = pageButtons.slice(startIndex, endIndex);

// if (endIndex > 5) {
// }

// if (endIndex < totalPages - 5) {
// }

const buttonViewer = () => {
  const first = document.createElement('button');
  const prev = document.createElement('button');
  first.innerText = '<<';
  prev.innerText = '<';
  paginationContainer.appendChild(first);
  paginationContainer.appendChild(prev);

  result.map((element, index) => {
    let pageButton = document.createElement('button');
    pageButton.innerText = element;
    pageButton.setAttribute('key', index + 1);
    paginationContainer.appendChild(pageButton);
  });

  const last = document.createElement('button');
  const next = document.createElement('button');
  next.innerText = '>';
  last.innerText = '>>';
  paginationContainer.appendChild(next);
  paginationContainer.appendChild(last);
};

buttonViewer();

const newButtonViewer = (newResult) => {
  const first = document.createElement('button');
  const prev = document.createElement('button');
  first.innerText = '<<';
  prev.innerText = '<';
  paginationContainer.appendChild(first);
  paginationContainer.appendChild(prev);

  newResult.map((element, index) => {
    let pageButton = document.createElement('button');
    pageButton.innerText = element;
    pageButton.setAttribute('key', index + 1);
    paginationContainer.appendChild(pageButton);
  });

  const last = document.createElement('button');
  const next = document.createElement('button');
  next.innerText = '>';
  last.innerText = '>>';
  paginationContainer.appendChild(next);
  paginationContainer.appendChild(last);
};

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
    postViewer(
      (currentPage = Math.ceil(currentPage / 5) * limit + 1),
      startIndex,
      endIndex
    );
    while (paginationContainer.firstChild) {
      paginationContainer.removeChild(paginationContainer.firstChild);
    }
    // startIndex = (currentPage - 1) * limit;
    // endIndex = currentPage * limit;
    let newResult = pageButtons.slice(currentPage - 1, currentPage + 4);
    console.log(startIndex, endIndex, currentPage, pageButtons, newResult);
    newButtonViewer(newResult);
  }
  if (event.target.innerText === '<') {
    postViewer(
      (currentPage = Math.floor(currentPage / 5) * limit - 4),
      startIndex,
      endIndex
    );
    while (paginationContainer.firstChild) {
      paginationContainer.removeChild(paginationContainer.firstChild);
    }
    // startIndex = (currentPage - 1) * limit;
    // endIndex = currentPage * limit;
    let newResult = pageButtons.slice(currentPage - 1, currentPage + 4);
    console.log(startIndex, endIndex, currentPage, pageButtons, newResult);
    newButtonViewer(newResult);
  }
});
