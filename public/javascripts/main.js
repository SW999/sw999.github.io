var editBtn = document.querySelector('.edit-article'),
    newBtn = document.querySelector('.add-article'),
    delBtn = document.querySelector('.delete-article'),
    editBlock = document.querySelector('.edit-page'),
    newBlock = document.querySelector('.create-new'),
    delBlock = document.querySelector('.delete-block');

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {
    if(!!editBtn && !!editBlock) {
        editBtn.addEventListener('click', function (e) {
            e.preventDefault();

            editBlock.classList.toggle('hidden');
        });
    }

    if(!!newBtn && !!newBlock) {
        newBtn.addEventListener('click', function (e) {
            e.preventDefault();

            newBlock.classList.toggle('hidden');
        });
    }

    if(!!delBtn && !!delBlock) {
        delBtn.addEventListener('click', function (e) {
            e.preventDefault();

            delBlock.classList.toggle('hidden');
        });
    }
});
