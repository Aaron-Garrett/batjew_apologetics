document.addEventListener('DOMContentLoaded', () => {
    function handleScroll(e, container) {
        const isAtRightEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth;
        const isAtLeftEnd = container.scrollLeft <= 0;

        // If scrolling up/down at the horizontal limits, allow normal vertical scroll
        if ((e.deltaY > 0 && isAtRightEnd) || (e.deltaY < 0 && isAtLeftEnd)) {
            return;
        }

        // Otherwise, convert to horizontal scroll
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    }

    const scientificSection = document.querySelector('#scientific-backing');
    const cardContainer = scientificSection.querySelector('.information-section');
    cardContainer.addEventListener('wheel', (e) => handleScroll(e, cardContainer));

    const biblicalSection = document.querySelector('#scripture');
    const biblicalCardContainer = biblicalSection.querySelector('.information-section');
    biblicalCardContainer.addEventListener('wheel', (e) => handleScroll(e, biblicalCardContainer));
});
