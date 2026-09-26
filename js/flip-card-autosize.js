// Sizes each .flip-card to fit the taller of its front/back faces, so text
// is never clipped or forced to internally scroll within the card border.
// Falls back to the card's normal CSS height (45vh / mobile override) as a
// floor, so short cards keep a consistent minimum size.
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

    function autoSizeFlipCards() {
        document.querySelectorAll('.flip-card').forEach(function (card) {
            var front = card.querySelector('.flip-card-front');
            var back = card.querySelector('.flip-card-back');

            card.style.height = '';
            var baselineHeight = parseFloat(getComputedStyle(card).height) || 0;

            var needed = Math.max(measureNaturalHeight(front), measureNaturalHeight(back));
            card.style.height = Math.max(baselineHeight, needed + 8) + 'px';
        });
    }

    document.addEventListener('DOMContentLoaded', autoSizeFlipCards);
    window.addEventListener('load', autoSizeFlipCards);

    var resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(autoSizeFlipCards, 150);
    });
})();
