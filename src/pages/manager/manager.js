document.querySelectorAll('.action-button').forEach(button => {
    button.addEventListener('click', function () {
        window.location.href = this.getAttribute('data-link');
    });
});
