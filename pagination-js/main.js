'use strict';

const postsContainer = document.querySelector('.posts-container');
const paginationContainer = document.querySelector('.pagination-container');

const pageButtons = [];
const totalPages = 20;

for (let i = 1; i <= totalPages; i++) {
  pageButtons.push(i);
}

const limit = 5;
let currentPage = 1;

let startIndex = (currentPage - 1) * limit;
let endIndex = currentPage * limit;
let result = pageButtons.slice(startIndex, endIndex);

const buttonViewer = () => {
  if (currentPage > 5) {
    const first = document.createElement('button');
    const prev = document.createElement('button');
    first.innerText = '<<';
    prev.innerText = '<';
    paginationContainer.appendChild(first);
    paginationContainer.appendChild(prev);
  }

  result.map((element) => {
    let pageButton = document.createElement('button');
    pageButton.innerText = element;
    paginationContainer.appendChild(pageButton);
  });

  const last = document.createElement('button');
  const next = document.createElement('button');
  next.innerText = '>';
  last.innerText = '>>';
  paginationContainer.appendChild(next);
  paginationContainer.appendChild(last);
};

const newButtonViewer = (newResult, currentPage) => {
  while (paginationContainer.firstChild) {
    paginationContainer.removeChild(paginationContainer.firstChild);
  }

  if (currentPage > limit) {
    const first = document.createElement('button');
    const prev = document.createElement('button');
    first.innerText = '<<';
    prev.innerText = '<';
    paginationContainer.appendChild(first);
    paginationContainer.appendChild(prev);
  }

  newResult.map((element) => {
    let pageButton = document.createElement('button');
    pageButton.innerText = element;
    if (element === currentPage) {
      pageButton.setAttribute('class', 'currentButtonActive');
    }
    paginationContainer.appendChild(pageButton);
  });

  if (currentPage <= totalPages - limit) {
    const last = document.createElement('button');
    const next = document.createElement('button');
    next.innerText = '>';
    last.innerText = '>>';
    paginationContainer.appendChild(next);
    paginationContainer.appendChild(last);
  }
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
            <li>${val.id} ${val.title}</li>
        `
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const postViewer = (currentPage, startIndex, endIndex) => {
  while (postsContainer.firstChild) {
    postsContainer.removeChild(postsContainer.firstChild);
  }
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
    0;

    for (let i = 0; i < event.target.parentNode.childNodes.length; i++) {
      event.target.parentNode.childNodes[i].classList.remove(
        'currentButtonActive'
      );
    }
    event.target.classList.add('currentButtonActive');
  }
  if (event.target.innerText === '<<') {
    postViewer((currentPage = 1), startIndex, endIndex);

    let newResult = pageButtons.slice(0, 5);
    newButtonViewer(newResult, currentPage);
  }
  if (event.target.innerText === '>>') {
    postViewer((currentPage = totalPages), startIndex, endIndex);

    let newResult = pageButtons.slice(-5);
    newButtonViewer(newResult, currentPage);
  }
  if (event.target.innerText === '>') {
    postViewer(
      (currentPage = Math.ceil(currentPage / 5) * limit + 1),
      startIndex,
      endIndex
    );

    let newResult = pageButtons.slice(currentPage - 1, currentPage + 4);
    newButtonViewer(newResult, currentPage);
  }
  if (event.target.innerText === '<') {
    postViewer(
      (currentPage = Math.ceil(currentPage / 5) * limit - 5),
      startIndex,
      endIndex
    );

    let newResult = pageButtons.slice(currentPage - limit, currentPage);
    newButtonViewer(newResult, currentPage);
  }
});

const init = () => {
  buttonViewer();
  getPosts(startIndex, endIndex);
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
