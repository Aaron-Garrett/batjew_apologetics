// Sizes each .parallax page's .background layer to the actual rendered
// content height (rather than a hardcoded vh guess), so the background
// never runs out before the page does on any screen size.
(function () {
    function fitParallaxBackgrounds() {
        document.querySelectorAll('.parallax').forEach(function (parallax) {
            var background = parallax.querySelector('.background');
            if (!background) return;
            background.style.height = parallax.scrollHeight + 'px';
        });
    }

    document.addEventListener('DOMContentLoaded', fitParallaxBackgrounds);
    window.addEventListener('load', fitParallaxBackgrounds);

    var resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(fitParallaxBackgrounds, 150);
    });
})();
