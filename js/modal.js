document.addEventListener('DOMContentLoaded', function() {

    const modalButtons = document.querySelectorAll('.open-modal'),
          overlay      = document.querySelector('.overlay-modal'),
          closeButtons = document.querySelectorAll('.modal-close'),
          modalElem = document.querySelector('#modal')

    modalButtons.forEach(function(item){
        item.addEventListener('click', function(e) {
            e.preventDefault();
            modalElem.classList.add('active');
            overlay.classList.add('active');
        });
    });

    closeButtons.forEach(function(item){

        item.addEventListener('click', function(e) {
            const parentModal = this.closest('#modal');
            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    document.body.addEventListener('keyup', function (e) {
        const key = e.key;

        if (key === 'Escape') {

            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);

    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });

});