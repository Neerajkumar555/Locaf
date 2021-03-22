const wrapper = document.querySelector('.wrapper');
const form = wrapper.querySelectorAll('.form');
const submitInput = form[0].querySelector('input[type="submit"]');

function getDataForm(e) {
    e.preventDefault();

    var formData = new FormData(form[0]);

    var locationRef = db.collection("locations");

    locationRef.add({
        name: formData.get('username'),
        address: formData.get('address'),
        description: formData.get('description'),
    });
    addToDb();
    alert(formData.get('username') + ' - ' + formData.get('address') +
        ' - ' + formData.get('description'));
}

document.addEventListener('DOMContentLoaded', function () {
    submitInput.addEventListener('click', getDataForm, false);

}, false);