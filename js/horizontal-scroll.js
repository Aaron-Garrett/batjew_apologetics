document.addEventListener('DOMContentLoaded', () => {
    let isScrollingHorizontally = false;
    let scrollTimeout;

    function handleScroll(e, container) {
        const isAtRightEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth;
        const isAtLeftEnd = container.scrollLeft <= 0;

        // If we hit the limits, set a timer before allowing vertical scroll
        if ((e.deltaY > 0 && isAtRightEnd) || (e.deltaY < 0 && isAtLeftEnd)) {
            if (!isScrollingHorizontally) {
                return;
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrollingHorizontally = false;
            }, 300); // 500ms buffer
            
            e.preventDefault();
            return;
        }

        // Otherwise, convert to horizontal scroll
        isScrollingHorizontally = true;
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
