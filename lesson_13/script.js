let par = document.getElementById("par")
let but = document.getElementById("but")

window.addEventListener('click', (event) => {
    const Checkclick = { x: event.clientX, y: event.clientY }
    console.log(`вы кликнули по координатам: x:${event.clientX} y:${event.clientY}`);
    localStorage.setItem(localStorage.length++, JSON.stringify(Checkclick));
    //console.log("{}", localStorage);


    for (let i = 0; i < localStorage.length; i++) {
        console.log("{}", localStorage[i]);
        par.innerHTML += localStorage[i] + "<br></br>";
    }
})

but.addEventListener('click', (event) => {
    localStorage.clear();
    location.reload();
})