import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";


// smoke test

it("renders without crashing", function () {
  render(<Carousel />);
});

// snapshot test 
it("matches snapshot", function(){
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // click left arrow to move backward in the carousel
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow)

  // expect the first image to show, but not the second or third
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();
});


it("makes the left arrow dissapear on the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  //expect the left arrow to not appear when the first image is displayed
  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).not.toBeInTheDocument();

});