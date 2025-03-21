if (!customElements.get('custom-slider')) {
  customElements.define(
    'custom-slider',
    class Slider extends HTMLElement {
      constructor() {
        super();

        this.isDragging = false;
        this.mx = 0;
        this.sx = 0;

        this.showAllBtn = this.querySelector('#showAllBtn');
        this.carouselWrapper = this.querySelector('.carousel__wrapper');
        this.content = this.querySelector('.carousel__content');
        this.productCards = this.querySelectorAll('.product-card');

        if (this.showAllBtn) {
          this.showAllBtn.addEventListener('click', () => this.showAll());
        }

        if (this.content) {
          this.setupDragEvents();
        }
      }

      showAll() {
        this.carouselWrapper.classList.add('show-all');
        this.showAllBtn.style.display = 'none';
      }

      setupDragEvents() {
        this.content.addEventListener('mousemove', this.mousemoveHandler.bind(this), { passive: false });
        this.content.addEventListener('mousedown', this.mousedownHandler.bind(this), { passive: false });
        this.content.addEventListener('mouseup', this.mouseupHandler.bind(this), { passive: false });
        this.content.addEventListener('mouseleave', this.mouseupHandler.bind(this), { passive: false });

        this.productCards.forEach((card) => {
          card.addEventListener('click', (e) => {
            if (this.isDragging) {
              e.preventDefault();
            }
          });
        });
      }

      mousemoveHandler(e) {
        const mx2 = e.pageX - this.content.offsetLeft;
        if (Math.abs(this.mx) > 30 && Math.abs(this.mx - mx2) > 30) {
          this.isDragging = true;
        } else {
          this.isDragging = false;
        }
        if (this.mx) {
          this.content.scrollLeft = this.sx + this.mx - mx2;
        }
      }

      mousedownHandler(e) {
        this.sx = this.content.scrollLeft;
        this.mx = e.pageX - this.content.offsetLeft;
        this.content.classList.add('dragging');
      }

      mouseupHandler() {
        this.mx = 0;
        this.content.classList.remove('dragging');
      }
    },
  );
}
