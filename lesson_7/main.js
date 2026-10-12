function hello() {
    alert("Hello World");
}

function result() {
    const inputElement1 = document.getElementById('number-1'); // Получаем первое число
    const inputValue1 = parseFloat(inputElement1.value) || 0; 

    const inputElement2 = document.getElementById('number-2'); // Получаем второе число
    const inputValue2 = parseFloat(inputElement2.value) || 0; 

    const resultat = inputValue1 - inputValue2; // Вычисляем разность
    alert(`Ответ: ${resultat}`); // Показываем результат
}

function testMinus() {
    alert("37" - 7); // "37" - 7 = 30
}

function testPlus() {
    alert("37" + 7); // "37" + 7 = "377"
}

var Sales = "Toyota";

// Добавляем кнопку для вызова функции CarTypes
document.getElementById("button-2").addEventListener("click", function() {
    var carType = CarTypes("Honda"); // Вызов функции при нажатии кнопки
    var car = { myCar: "Saturn", getCar: carType, special: Sales };

    console.log(car.myCar); // Saturn
    console.log(car.getCar); // Honda
    console.log(car.special); // Toyota
});

function CarTypes(name) {
    if (name === "Honda") {
        return name;
    } else {
        return "Извините, мы не продаём " + name + ".";
    }
}
