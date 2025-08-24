import { Fancybox } from "@fancyapps/ui";
import Swiper from 'swiper/bundle';
import { Mask, MaskInput } from "maska"

import './sass/_app.scss';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css/bundle';

Fancybox.bind("[data-fancybox]", {})

new MaskInput("[data-maska]") // for masked input

// Инициализация кастомного селектора
document.addEventListener('DOMContentLoaded', function() {
    initCustomSelect();
});

function initCustomSelect() {
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(select => {
        const selectedElement = select.querySelector('.select-selected');
        const itemsContainer = select.querySelector('.select-items');
        const items = itemsContainer.querySelectorAll('div');
        
        // Обработчик клика по выбранному элементу
        selectedElement.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Переключаем класс active для стрелки
            this.classList.toggle('select-arrow-active');
            
            // Показываем/скрываем выпадающий список
            itemsContainer.classList.toggle('select-hide');
        });
        
        // Обработчик клика по элементам списка
        items.forEach(item => {
            item.addEventListener('click', function() {
                // Устанавливаем текст выбранного элемента
                selectedElement.textContent = this.textContent;
                
                // Удаляем класс same-as-selected у всех элементов
                items.forEach(el => {
                    el.classList.remove('same-as-selected');
                });
                
                // Добавляем класс same-as-selected к выбранному элементу
                this.classList.add('same-as-selected');
                
                // Скрываем выпадающий список
                itemsContainer.classList.add('select-hide');
                selectedElement.classList.remove('select-arrow-active');
                
                // Здесь можно добавить логику для обработки выбранного города
                const selectedValue = this.getAttribute('data-value');
                console.log('Выбран город:', this.textContent, 'со значением:', selectedValue);
            });
        });
        
        // Закрываем все селекторы при клике вне их
        document.addEventListener('click', function() {
            const selectItems = document.querySelectorAll('.select-items');
            const selectSelected = document.querySelectorAll('.select-selected');
            
            selectItems.forEach(item => {
                item.classList.add('select-hide');
            });
            
            selectSelected.forEach(item => {
                item.classList.remove('select-arrow-active');
            });
        });
    });
}

if(document.querySelectorAll('.scheme__item')) {
    const schemeItems = document.querySelectorAll('.scheme__item')

    schemeItems.forEach(item => {
        const images = [...item.querySelectorAll('.scheme__images_item')];
        const maxVisible = 5;

        if (images.length > maxVisible) {
            const hiddenCount = images.length - maxVisible;
            images.forEach((el, index) => {
                if (index >= maxVisible) {
                    el.style.display = 'none';
                }
            });

            const lastVisible = images[maxVisible - 1];
            lastVisible.classList.add('scheme__images_item--more');

            const overlay = document.createElement('div');
            overlay.className = 'scheme__images_more';
            overlay.textContent = `+${hiddenCount} фото`;
            lastVisible.appendChild(overlay);
        }
    })
}

// Обработка формы обратной связи
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.querySelector('#feedback-popup form');
    const feedbackSuccess = document.querySelector('.feedback-success');
    const successBtn = document.querySelector('.success-btn');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Предотвращаем стандартную отправку формы
            
            // Скрываем форму и показываем сообщение благодарности
            feedbackForm.style.display = 'none';
            feedbackSuccess.style.display = 'block';
        });
    }
    
    // Обработчик кнопки "Хорошо"
    if (successBtn) {
        successBtn.addEventListener('click', function() {
            // Закрываем попап
            Fancybox.close();
            
            // Сбрасываем состояние попапа для следующего открытия
            setTimeout(() => {
                feedbackForm.style.display = 'block';
                feedbackSuccess.style.display = 'none';
                feedbackForm.reset(); // Очищаем форму
            }, 300);
        });
    }
});

// ----------------------------popup----------------------------

document.addEventListener('DOMContentLoaded', function(){
    const popup = document.querySelector('.popup')
    const popupShowBtns = document.querySelectorAll('.show-popup')
    const closeFormBtn = document.querySelector('.close-popup')

    popupShowBtns.forEach(item => {
        item.addEventListener('click', () => {
            popup.classList.add('active')
            document.body.classList.add('no-scroll')
        })
    })

    closeFormBtn.addEventListener('click', () => {
        popup.classList.remove('active')
        document.body.classList.remove('no-scroll')
    })

    document.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('active')
            document.body.classList.remove('no-scroll')
        }
    });
});