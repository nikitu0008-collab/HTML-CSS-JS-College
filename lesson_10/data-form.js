let form = document.querySelector('form');
let result = document.getElementById('result');

function mainFunc(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const userage = document.getElementById('userage').value;

    if (!username || !userage) {
        result.textContent = "Заполните оба поля!"
        result.style.color = '#b00020';
        return;
    }

    try {
        if (Number.isNaN(userage)) {
            throw new Error('Возраст должен быть числом');
        }

        if (userage >= 18) {
            result.textContent = 'Вы проходите. Имя: ' + username + ' Возраст' + userage;
            result.style.color = '#006400';
        } else if (userage < 18) {
            result.textContent = 'Вы не прошли'
            result.style.color = '#b00020';
        }
    } catch (error) {
        result.textContent = 'Ошибка: ${error.message}';
        result.style.color = '#b00020';
    }

}

form.addEventListener('submit', mainFunc);