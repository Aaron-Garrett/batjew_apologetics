document.addEventListener('DOMContentLoaded', () => {
    function handleScroll(e, container) {
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
