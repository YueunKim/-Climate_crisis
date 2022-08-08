(() => {
    //main2 제목
    anime.timeline()
    .add({
        targets: '.main2_tit .line',
        opacity: [0.5,1],
        scaleX: [0, 1],
        easing: "easeInOutExpo",
        duration: 1000
    }).add({
        targets: '.main2_tit .line',
        duration: 1000,
        easing: "easeOutExpo",
        translateY: (el, i) => (-0.625 + 0.625*2) + "em"
    }).add({
        targets: '.main2_tit .letters',
        opacity: [0,1],
        translateX: [0, 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=900'
    });

    //main3 사진에 따라 텍스트 올라오기
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; // 현재 visible인 .graphic-item
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
    });

    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate() { //visible 추가
        currentItem.classList.add('visible');
    }

    function inactivate() { //visible 제거
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;

        for (let i = ioIndex-1; i < ioIndex+3; i++){
            step = stepElems[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect();

            if (boundingRect.top > window.innerHeight * 0.1 && 
                boundingRect.top < window.innerHeight * 0.8) {
                
                inactivate();

                currentItem = graphicElems[step.dataset.index];
                activate();
            }
        }
    });
})();




