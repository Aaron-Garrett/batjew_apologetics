// Gives every .flip-card within the same row (.information-section) a
// single, shared height — sized to fit the tallest front or back face
// found anywhere in that row — so the cards stay a uniform size instead
// of each growing/shrinking to its own content. Recalculated on load and
// on resize (viewport-height changes shift the vh-based floor height).
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

    function sizeCardRow(row) {
        var cards = row.querySelectorAll('.flip-card');
        if (!cards.length) return;

        // Reset first so the baseline (CSS default, e.g. 45vh) reflects the
        // current viewport rather than a previous run's inline height.
        cards.forEach(function (card) { card.style.height = ''; });
        var baselineHeight = parseFloat(getComputedStyle(cards[0]).height) || 0;

        var tallest = 0;
        cards.forEach(function (card) {
            tallest = Math.max(
                tallest,
                measureNaturalHeight(card.querySelector('.flip-card-front')),
                measureNaturalHeight(card.querySelector('.flip-card-back'))
            );
        });

        // Generous, proportional buffer (not just a flat pixel amount): the
        // viewer's system may render the font stack (Garamond / Times New
        // Roman / serif fallback) with slightly different line-wrapping or
        // line-height than whatever rendered this measurement, so a fixed
        // few-pixel pad isn't reliably enough headroom across systems.
        var withBuffer = Math.ceil(tallest * 1.1 + 24);
        var sharedHeight = Math.max(baselineHeight, withBuffer) + 'px';
        cards.forEach(function (card) { card.style.height = sharedHeight; });
    }

    function autoSizeFlipCards() {
        document.querySelectorAll('.information-section').forEach(sizeCardRow);
    }

    document.addEventListener('DOMContentLoaded', autoSizeFlipCards);
    window.addEventListener('load', autoSizeFlipCards);

    var resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(autoSizeFlipCards, 150);
    });
})();
