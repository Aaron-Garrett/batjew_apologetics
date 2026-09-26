// Sizes each .flip-card to fit whichever face (front or back) is currently
// showing, so text is never clipped and short entries don't get stretched
// out to match a much longer entry on the other face. Re-measures whenever
// a card is flipped, and on load/resize.
(function () {
    function measureNaturalHeight(el) {
        if (!el) return 0;
        var prevPosition = el.style.position;
        var prevHeight = el.style.height;
        el.style.position = 'static';
        el.style.height = 'auto';
        var height = el.scrollHeight;
        el.style.position = prevPosition;
        el.style.height = prevHeight;
        return height;
    }

    function sizeCardToCurrentFace(card) {
        var front = card.querySelector('.flip-card-front');
        var back = card.querySelector('.flip-card-back');
        var activeFace = card.classList.contains('flipped') ? back : front;

        card.style.height = '';
        var baselineHeight = parseFloat(getComputedStyle(card).height) || 0;

        var needed = measureNaturalHeight(activeFace);
        card.style.height = Math.max(baselineHeight, needed + 8) + 'px';
    }

    function autoSizeFlipCards() {
        document.querySelectorAll('.flip-card').forEach(sizeCardToCurrentFace);
    }

    document.addEventListener('DOMContentLoaded', function () {
        autoSizeFlipCards();
        document.querySelectorAll('.flip-card').forEach(function (card) {
            // Runs after flip-cards.js's click handler (registered first) has
            // already toggled the "flipped" class, so this reads the new state.
            card.addEventListener('click', function () {
                sizeCardToCurrentFace(card);
            });
        });
    });
    window.addEventListener('load', autoSizeFlipCards);

    var resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(autoSizeFlipCards, 150);
    });
})();
