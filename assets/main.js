import _ from 'lodash';

(() => {

    //main2 글자 하이라이트
    const highlightElems = document.querySelectorAll('.text-highlight');
    for (let i = 0; i < highlightElems.length; i++) {
        highlightElems[i].dataset.index = i;
    }
    
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



    // //main4
    // function type() {
    //     document.addEventListener('DOMContentLoaded',() => {
    //         new TypeIt('.main4 #last_txt', {
    //             speed: 200
    //         })
    //         .type("당장 행동하지 않으면 다 같이 죽는다", {delay:1000})
    //         .move(-10)
    //         .delete(4, {delay:1000})
    //         .move(+9)
    //         .delete(2, {delay:1000})
    //         .type("살 수 있")
    //         .move(+1)
    //         .go();
    //     })
    // };


        //main4
        // function type() {
        //     new TypeIt('.last-txt', {
        //         speed: 100
        //     })
        //     .type("당장 행동하지 않으면 다 같이 죽는다", {delay:1000})
        //     .move(-10)
        //     .delete(4, {delay:1000})
        //     .move(+9)
        //     .delete(2, {delay:1000})
        //     .type("살 수 있")
        //     .move(+1)
        //     .go();
        // };



    //main4
    function type() {
        new TypeIt('#type', {
            speed: 100
        })
        .type("text text text", {delay:1000})
        .move(-10)
        .delete(4, {delay:1000})
        .move(+9)
        .delete(2, {delay:1000})
        .type("abc")
        .move(+1)
        .go();
    };

    // function checkVisible( elm, eval ) {
    //     eval = eval || "object visible";
    //     let viewportHeight = window.innerHeight; // Viewport Height
    //     // let viewportHeight = $(window).height(); // Viewport Height
    //     let scrolltop = window.scrollY; // Scroll Top
    //     // let scrolltop = $(window).scrollTop(); // Scroll Top
    //     let y = elm.offsetTop;
    //     // console.log(y)
    //     // let y = $(elm).offset().top;
    //     let elementHeight = elm.offsetHeight;
    //     // console.log(elementHeight)
    //     // let elementHeight = $(elm).height();
        
    //     if (eval == "object visible") {
    //         return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    //     }
    //     if (eval == "above") {
    //         return ((y < (viewportHeight + scrolltop)));
    //     }
    // };





    //스크롤 할 때
    window.addEventListener('scroll', () => {

        //intro 마우스 사라지기
        const iconScrollElem = document.querySelector('.icon_scroll');
        const iconScrollOffset = iconScrollElem.getBoundingClientRect().top;
        iconScrollElem.style.cssText = ( window.scrollY > iconScrollOffset
            ? 'opacity:0; transform: translateY(100);'
            : 'opacity:1; transform: translateY(0px);' );
        

        //main1 글자 올라오기
        const txtupElem = document.querySelector('.txt_up');
        const txtupOffset = txtupElem.getBoundingClientRect().top + window.pageYOffset - 800;
        txtupElem.style.cssText = ( window.scrollY > txtupOffset
            ? 'opacity:1; transform: translatey(0px);'
            : 'opacity:0; transform: translatey(100px);' );


        //main2 타이틀 올라오기
        const titleElem = document.querySelectorAll('.main2_tit');
        let eleOffsetArr = [];

        titleElem.forEach(e => {
            let eleOffset = e.getBoundingClientRect().top + window.pageYOffset - 800;
            eleOffsetArr.push(eleOffset);
        });
        
        eleOffsetArr.forEach((offset, idx) => {
            titleElem[idx].style.cssText = ( window.scrollY > offset
                ? 'opacity:1; transform: translateX(0);'
                : 'opacity:0; transform: translateX(50px);' );
        });


        //main2 글자 하이라이트
        const highlight = document.getElementsByClassName("article_txt");
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray(".text-highlight").forEach((highlight) => {
            if (highlight.dataset.index == 0 || highlight.dataset.index == 1){
                ScrollTrigger.create({
                    trigger: highlight,
                    start: "-100px center",
                    scrub: 1,
                    onEnter: () => highlight.classList.add("active1")
                    
                });
            } else if (highlight.dataset.index == 2 || highlight.dataset.index == 3){
                ScrollTrigger.create({
                    trigger: highlight,
                    start: "-100px center",
                    scrub: 1,
                    onEnter: () => highlight.classList.add("active2")
                    
                });
            } else {
                ScrollTrigger.create({
                    trigger: highlight,
                    start: "-100px center",
                    scrub: 1,
                    onEnter: () => highlight.classList.add("active3")
                    
                });
            }
        
        });


        //main3 사진에 따라 텍스트 올라오기
        let step;
        let boundingRect;

        for (let i = ioIndex-1; i < ioIndex+3; i++){
            step = stepElems[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect().top;

            if (boundingRect > window.innerHeight * 0.1 && 
                boundingRect < window.innerHeight * 0.8) {
                
                inactivate();

                currentItem = graphicElems[step.dataset.index];
                activate();
            }
        }

        //main4 typeit기능
        // type();

        // let isVisible = false;
        // let el = document.querySelector('#second');
        // if (checkVisible(el, !isVisible)){
        //     type();
        //     isVisible = true;
        // }


        let el = document.querySelector('#type');
        const elOffset = el.getBoundingClientRect().top + window.pageYOffset - 800;
        if (window.scrollY > elOffset){
            let timer = setTimeout( type, 1500 );
            clearTimeout(timer);
        }



        // const last = document.querySelector('.last');
        // const lastElem = document.querySelector('.container');
        // const lastOffset = lastElem.getBoundingClientRect().top;
        // const lastOffset = last.getBoundingClientRect().top;

        // if (lastOffset < window.scrollY) {
                // type()
                // last.classList.add('last-txt');
                // setInterval(type(), 1000);
        // }


        // if ( lastOffset < 940 ){
        //     lastElem.style.cssText = 'opacity:1; transform: translateY(0);';
        //     // type();
        // } else { lastElem.style.cssText = 'opacity:0; transform: translateY(50px);'}

        // lastElem.style.cssText = ( window.scrollY > lastOffset
        //     ? 'opacity:1; transform: translateY(0);'
        //     : 'opacity:0; transform: translateY(50px);' );

        // if (window.scrollY * 0.5 < lastOffset && 
        //     window.scrollY * 0.6 > lastOffset) {
        //     type();
        // };

        // if (window.scrollY * 0.5 === lastOffset) {
        //     type();
        // };

    });

})();




