document.addEventListener('DOMContentLoaded', () => {
    function handleScroll(e, container) {
        // If the wheel is over a card face that has its own vertical overflow
        // (overflow-y: auto in the CSS), let the browser scroll that card's
        // own content normally instead of hijacking the wheel for the row.
        const face = e.target.closest('.flip-card-front, .flip-card-back');
        if (face && face.scrollHeight > face.clientHeight + 1) {
            return;
        }

        // Let native horizontal gestures (trackpad two-finger swipe) pass through untouched.
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        const atRightEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;
        const atLeftEnd = container.scrollLeft <= 0;

        const scrollingPastRightEnd = e.deltaY > 0 && atRightEnd;
        const scrollingPastLeftEnd = e.deltaY < 0 && atLeftEnd;

        if (scrollingPastRightEnd || scrollingPastLeftEnd) {
            // Already at the edge of the card row in this direction — let the
            // page scroll vertically instead of trapping the wheel here.
            return;
        }

        e.preventDefault();
        container.scrollLeft += e.deltaY;
    }

    document
        .querySelectorAll('#scientific-backing .information-section, #scripture .information-section')
        .forEach((container) => {
            container.addEventListener('wheel', (e) => handleScroll(e, container), { passive: false });
        });
});
