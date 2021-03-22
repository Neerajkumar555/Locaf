const wrapper = document.querySelector('.wrapper');
const form = wrapper.querySelectorAll('.form');
const submitInput = form[0].querySelector('input[type="submit"]');

function getDataForm(e) {
    e.preventDefault();

    var formData = new FormData(form[0]);
// Displays info on an alert box
    alert (formData.get('username') + ' - ' + formData.get('password') 
        + ' - ' + formData.get('age'));
}

document.addEventListener('DOMContentLoaded', function() {
    submitInput.addEventListener('click', getDataForm, false);

}, false);