/* 
It's task from teacher
*/
function mainFunc() {
    try {
        const name = prompt('Введите имя: ');

        if (name === null) {
            throw new Error('Ввод отменён или имя не указано');
        }

        const ageInput = +prompt('Введите возраст: ');

        //Преобразую в число так-как возвраст может стать NuN
        const age = Number(ageInput);

        if (Number.isNaN(age)) {
            throw new Error('Возраст должен быть числом');
        }

        if (age < 0 || age > 149) {
            throw new Error('Возраст вне допустимого диапазона');
        }

        if (name.trim().length <= 2) {
            throw new Error('Имя слишком короткое');
        }

        if (age < 18) {
            console.log('Вы ещё малы');
        } else {
            console.log(`Приветствую, ${name}, вам ${age} лет`);
        }


    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }
}

mainFunc();