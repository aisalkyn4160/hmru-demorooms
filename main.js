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


//toggle catalog
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-catalog')?.addEventListener('click', () => {
        const jalousie = document.querySelector('.jalousie');
        if (window.innerWidth > 992) {
            jalousie?.classList.toggle('active');
        } else {
            jalousie?.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-catalog')?.addEventListener('click', () => {
        const basket = document.querySelector('.basket');
        const cross = document.querySelector('.cross');
        const body = document.body;
        document.querySelector('.header__discount-dropdown').classList.remove('active');

        document.getElementById('show-catalog').classList.toggle('is_active');
    
   
        document.querySelector('.burger-menu').classList.remove('active');
        document.querySelector('.header__burger').classList.remove('is-active');
        document.querySelector('.catalog-menu').classList.toggle('active');

        body.classList.toggle('locked');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const firstListItem = document.querySelector('.catalog-menu__list_item');
    const firstInnerItem = document.querySelector('.catalog-menu__inner_item');
    if (firstListItem) firstListItem.classList.add('active');
    if (firstInnerItem) firstInnerItem.classList.add('active');

    document.addEventListener('click', (e) => {
        const listItem = e.target.closest('.catalog-menu__list_item');
        if (listItem) {
            if (window.innerWidth < 992) {
                listItem.classList.toggle('opened');
                const subMenu = listItem.querySelector('.catalog-sub-menu');
                if (subMenu) subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
            } else {
                document.querySelectorAll('.catalog-menu__list_item').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.catalog-menu__inner_item').forEach(item => item.classList.remove('active'));
                listItem.classList.add('active');
                const innerItem = document.querySelector(`.catalog-menu__inner_item[data-tab="${listItem.dataset.tab}"]`);
                if (innerItem) innerItem.classList.add('active');
            }
        }
    });
});

//burger
document.addEventListener('DOMContentLoaded', () => {
    const toggleClass = (elem, cls) => elem.classList.toggle(cls);

    [document.getElementById('mobile-burger'), document.querySelector('.burger-menu__close')].forEach(btn => {
        btn?.addEventListener('click', () => {
            toggleClass(btn, 'is-active');
            toggleClass(document.querySelector('.burger-menu'), 'active');
            toggleClass(document.documentElement, 'lock');
        });
    });

    document.querySelectorAll('.burger-menu__menu_trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            toggleClass(trigger.parentElement, 'is-active');
            const submenu = trigger.nextElementSibling;
            submenu && (submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block');
        });
    });
});

// ---------------------------------header-discount-dropdown--------------------------------
document.addEventListener('DOMContentLoaded', function(){
    const headerDiscount = document.querySelector('.header__discount');
    const headerDiscountDropdown = document.querySelector('.header__discount-dropdown');
    const catalogMenu = document.querySelector('.catalog-menu');
    const headerCatTr = document.querySelector('.header__catalog_trigger');

    headerDiscount.addEventListener('click', () => {
        headerDiscountDropdown.classList.toggle('active');
        catalogMenu.classList.remove('active');
        headerCatTr.classList.remove('is_active');
    })
});
   
//sticky header
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header__top');
    const headerBottom = document.querySelector('.header__bottom');
    let headerBottomOffset = null;
    let headerBottomHeight = null;
    
    const handleScroll = () => {
        if (headerBottomOffset === null) {
            headerBottomOffset = headerTop.offsetHeight;
            headerBottomHeight = headerBottom.offsetHeight;
        }
        
        const scrollY = window.scrollY;
        
        if (scrollY >= headerBottomOffset) {
            header.classList.add('header-scrolled');
            headerBottom.classList.add('fixed');
            document.body.style.paddingTop = headerBottomHeight + 'px';
        } else {
            header.classList.remove('header-scrolled');
            headerBottom.classList.remove('fixed');
            document.body.style.paddingTop = '0';
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
});