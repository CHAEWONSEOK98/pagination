import { useEffect, useState } from 'react';

const Pagination = () => {
  const pages = 50;

  const numberOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);
  const [arrOfCurrentButtons, setArrOfCurrentButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrentButtons];

    let dotsInitial = '...';
    let dotsLeft = '... ';
    let dotsRight = ' ...';

    if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      // from 5 to 8 -> (10 - 2)
      // sliced1 (5-2, 5) -> [4,5]
      // sliced1 (5, 5+1) -> [6]
      // [1, '...', 4, 5, 6, '...', 10]
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (currentButton > numberOfPages.length - 3) {
      // > 7
      // slice(10-4)
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
      setCurrentButton(arrOfCurrentButtons[arrOfCurrentButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrentButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrentButtons[3] - 2);
    }
    setArrOfCurrentButtons(tempNumberOfPages);
  }, [currentButton]);
  return (
    <div>
      <h1>Pagination</h1>
      <div className="pagination-container">
        <a
          href="#"
          className={`${currentButton === 1 ? 'disabled' : ''}`}
          onClick={() =>
            setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
          }
        >
          Prev
        </a>
        {arrOfCurrentButtons.map((page, index) => {
          return (
            <a
              key={index}
              onClick={() => setCurrentButton(page)}
              href="#"
              className={currentButton === page ? 'active' : ''}
            >
              {page}
            </a>
          );
        })}

        <a
          href="#"
          className={`${
            currentButton === numberOfPages.length ? 'disabled' : ''
          }`}
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
