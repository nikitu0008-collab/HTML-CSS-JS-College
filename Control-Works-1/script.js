const form = document.getElementById("userForm");
const result = document.getElementById("result");
const result_2 = document.getElementById("result_2");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    if (!name || !age) {
        result_2.textContent = "Вы ничего не ввели";
        return;
    }

    const currentHour = new Date().getHours();

    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Доброе утро";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Добрый день";
    } else if (currentHour >= 18 && currentHour < 24) {
        greeting = "Добрый вечер";
    } else {
        greeting = "Доброй ночи";
    }

    if (age < 18) {
        result_2.textContent = `Упс!) Вам меньше 18, до него не хватает: ${18 - age}`;
        result_2.style.color = '#ff0000'
    } else if (age > 18) {
        result_2.textContent = `Вау!) Вам больше 18!`;
        result_2.style.color = '#22ff00'
    } else if (age == 18) {
        result_2.textContent = `Ну ничего себе) вам ровно 18!`;
        result_2.style.color = '#ff00ae'
    } else {
        throw Error("Вызвалось исключение")
    }

    result.textContent = `${greeting} ${name}! Вам ${age} лет`;

});
