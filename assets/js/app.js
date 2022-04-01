$(document).ready(function() {

    /* TAROOOOOOOOO
    ======================================*/
    let taroItem = $('.taro__item');
    taroItem.on('click', function(event) {
        $(this).toggleClass('taro__item--active');
    });



    /* Roulette
    ========================================*/
    let windowH = $(window).height();
    let windowW = $(window).width();
    let windowWidthMedium = 1200;
    let area = $('#roulette');
    let areaW = area.innerHeight;
    let rouletteItems = $('.roulette__item');

    boxLenght(windowW, windowH);
    roulettePos();
    bottleUse();

    $(window).on("scroll  resize", function() {
        windowH = $(window).height();
        windowW = $(window).width();
        boxLenght(windowW, windowH);
        roulettePos();
    });

    // размещение объектов по кругу
    function roulettePos(){
        let quests = [...document.querySelectorAll('.roulette')];
        quests.map((item) => {
            let items = item.querySelectorAll('.roulette__item');
            const length = items.length;
            const arc = 2 * Math.PI * (1 / length);

            let radius = 0;

            if (windowW > windowH) {
                radius = windowH * 0.1;
            }

            if (((windowW <= 1100) & (windowW > windowH))) {
                radius = windowH / 14;
            }

            if ((windowW <= 1100) & (windowW >= 800)){
                if(windowW < windowH) {
                    radius = windowW * 0.08;
                }
            }

            if ((windowW < 800) & (windowW >= 600)) {
                if(windowW < windowH) {
                    radius = windowW * 0.1;
                }
            }

            if (windowW < 600) {
                if(windowW < windowH) {
                    radius = windowW * 0.16;
                }
            }
           if (windowW <= 928){
               if (windowW > windowH){
                   radius = windowW * 0.13;
               }
           }
            console.log(windowW, windowH, radius)


            for (let i = 0; i < length; i++) {
                const angle = i * arc;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                items[i].style.left = 50 + x + '%';
                items[i].style.top = 50 + y + '%';

            }
        });
    }


    // функция для перезаписи длины и высоты блока roulette
    function boxLenght(windowW, windowH) {
        if (windowW > windowH) {
            area.css({
                width: windowH / 2.25,
                height: windowH / 2.25
            });
        }
        else if (windowW < windowH) {
            area.css({
                width: windowW / 2,
                height: windowW / 2
            });
        }else {
            area.css({
                width: windowW / 2,
                height: windowW / 2
            });
        };

    }


    // функция взаимодействия с бутылкой (первый клик - раскручиваем на рандомный градус и присваиваем класс active нужному сектору, второй клик - возвращаем в исходную позицию, сбрасываем класс active)
    function bottleUse(){
        let rouletteBottle = $('.roulette__bottle');
        let bottleClick = 0;

        rouletteBottle.on('click', function(event) {
            bottleClick++;
            if (bottleClick%2 == 1) {
                let randomDeg = getRandomInt(360);
                rouletteBottle.css({
                    transition: 'transform 2s linear',
                    transform: 'translateX(-50%) translateY(-50%) rotate(1080deg)',
                });
                bottleRotate(rouletteBottle, randomDeg);
                sectorWin(randomDeg);
            }
            if (bottleClick%2 == 0) {
                removeClassActive();
                rouletteBottle.css({
                    transition: 'transform 0s linear',
                    transform: 'translateX(-50%) translateY(-50%) rotate(1080deg)',
                });
            }
        });
    }


    // функция раскрутки бутылки на случайный градус
    function bottleRotate(rouletteBottleActive, randomDeg){
        rouletteBottleActive.css({
            transform: 'translateX(-50%) translateY(-50%) rotate('+randomDeg+'deg)',
        });
    }

    // функция определения выигрышного сектора
    function sectorWin(randomDeg){
        // узнаём количество элементов в круге
        let lenghtItems = $('.roulette__item').length;
        // вычисляем градусную меру одного сектора
        let circleDeg = 360;
        let circleSector = 360 / (lenghtItems * 2);

        // первый объект (между верхом и правой стороной) (90 градусов)
        if ((randomDeg > (circleSector * 3)) & (randomDeg < (circleSector * 5))) {
            removeClassActive();
            setTimeout(function(){$('#first').addClass('roulette__item--active')}, 2.2*1000);
        }

        // второй объект (между нижзом и правой стороной) (135 градусов)
        if ((randomDeg > (circleSector * 5)) & (randomDeg < (circleSector * 7))) {
            removeClassActive();
            setTimeout(function(){$('#second').addClass('roulette__item--active')}, 2.2*1000);
        }

        // третий объект (нижняя сторона) (180 градусов)
        if ((randomDeg > (circleSector * 7)) & (randomDeg < (circleSector * 9))) {
            removeClassActive();
            setTimeout(function(){$('#third').addClass('roulette__item--active')}, 2.2*1000);
        }

        // четвёртый объект (между левой стороной и низом) (225 градусов)
        if ((randomDeg > (circleSector * 9)) & (randomDeg < (circleSector * 11))) {
            removeClassActive();
            setTimeout(function(){$('#fourth').addClass('roulette__item--active')}, 2.2*1000);
        }

        // пятый объект (левая сторона) (270 градусов)
        if ((randomDeg > (circleSector * 11)) & (randomDeg < (circleSector * 13))) {
            removeClassActive();
            setTimeout(function(){$('#fifth').addClass('roulette__item--active')}, 2.2*1000);
        }

        // шестой объект (между левой стороной и верхом) (315 градусов)
        if ((randomDeg > (circleSector * 13)) & (randomDeg < (circleSector * 15))) {
            removeClassActive();
            setTimeout(function(){$('#sixth').addClass('roulette__item--active')}, 2.2*1000);
        }

        // седьмой объект (верхний) (0/360 градусов)
        if (((randomDeg >= 0) & (randomDeg < circleSector)) || ((randomDeg > 337.5) & (randomDeg <=360))) {
            removeClassActive();
            setTimeout(function(){$('#seventh').addClass('roulette__item--active')}, 2.2*1000);
        }

        // восьмой объект (между верхом и правой стороной) (45 градусов)
        if ((randomDeg > circleSector) & (randomDeg < (circleSector * 3))) {
            removeClassActive();
            setTimeout(function(){$('#eighth').addClass('roulette__item--active')}, 2.2*1000);
        }

    }

    // функция для удаления класса у элементов roulette
    function removeClassActive(){
        rouletteItems.removeClass('roulette__item--active');
    }

    // сгенерировать случайное число
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
        //return 90;
    }
    window.addEventListener("scroll", function(event){
        let top = this.pageYOffset;
        let layers = $(".parallax__item");
        let speed, yPos;
        layers.each(function() {
            speed = $(this).attr('data-speed');
            let yPos = -(top * speed / 100);
            $(this).attr('style','transform: translate3d(0px, ' + yPos + 'px, 0px)');
        });
    });

});
