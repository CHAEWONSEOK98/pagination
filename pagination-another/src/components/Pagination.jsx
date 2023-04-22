import { useState } from 'react';

const Pagination = () => {
  const pages = 10;

  const numberOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  return (
    <div>
      <h1>Pagination</h1>
      <div className="pagination-container">
        <a
          href="#"
          onClick={() =>
            setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
          }
        >
          Prev
        </a>
        {numberOfPages.map((page) => {
          return (
            <a href="#" className={currentButton === page && 'active'}>
              {page}
            </a>
          );
        })}

        <a
          href="#"
          onClick={() =>
            setCurrentButton((prev) =>
              prev === numberOfPages.length ? prev : prev + 1
            )
          }
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default Pagination;
