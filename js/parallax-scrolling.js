window.addEventListener('scroll', () => {
    let parent = document.getElementById('parallax-container');
    let children = parent.getElementsByTagName('div');
    for(let i = 0; i < children.length; i++) {
        children[i].style.transform = 'translateY(-' + (window.pageYOffset * i / children.length) + 'px)';
    }
    
    // Move the header along with the third parallax image
    let header = document.getElementById('header');
    if (children.length >= 3) {
        header.style.transform = 'translateY(-' + (window.pageYOffset * 2 / children.length / 2) + 'px)';
    }
});