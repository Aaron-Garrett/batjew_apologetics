window.addEventListener('scroll', function() {
    const scrollY = window.scrollY; // Get the scroll position of the page
    const parallaxElements = document.querySelectorAll('.parallax'); // Select all parallax layers
    const header = document.querySelector('#header'); // Select the header

    // Adjust speed of each layer based on its index
    parallaxElements.forEach(function(element, index) {
        let speed = (index + 1) * 0.5; // Speed multiplier for each layer (you can adjust this value)
        element.style.transform = `translateY(-${scrollY * speed}px)`; // Apply scroll-based movement
    });

    // Move the header at the same speed as the third image
    const thirdImage = parallaxElements[2]; // Select the third parallax image (index 2)
    const thirdImageOffset = thirdImage.offsetTop; // Get the position of the third image
    header.style.transform = `translateY(-${scrollY - thirdImageOffset * 0.3}px)`; // Apply scroll effect to header
});
