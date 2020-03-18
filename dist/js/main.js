//Массив элементов уровней навыка
let levels = document.querySelectorAll('.js-mastery-block .level-item');

//Вешаем прослушку клика на каждый уровень
for (let i = 0; i < levels.length; i++) {
  levels[i].addEventListener("click", moveSliderArrow);
}

//Функция передвижения стрелки слайдера после клика
function moveSliderArrow() {
  let curLvl = 'level-' + this.getAttribute('data-level');

  let sliderArrow = document.getElementById('slider-arrow');
  sliderArrow.className = '';
  sliderArrow.classList.add(curLvl);
}