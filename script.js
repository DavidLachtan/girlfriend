const yes = document.getElementById("yes");
const no = document.getElementById("no");
const text = document.getElementById("text");

let escaped = false;

function moveNo() {

    if (!escaped) {
        const r = no.getBoundingClientRect();

        no.style.position = "fixed";
        no.style.left = r.left + "px";
        no.style.top = r.top + "px";

        escaped = true;
    }

    const padding = 20;

    const x = Math.random() * (window.innerWidth - no.offsetWidth - padding * 2) + padding;
    const y = Math.random() * (window.innerHeight - no.offsetHeight - padding * 2) + padding;

    no.style.left = x + "px";
    no.style.top = y + "px";
}

// PC
no.addEventListener("mouseenter", moveNo);

// Mobil
no.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNo();
});

setTimeout(() => {
    moveNo();

    setInterval(() => {
        moveNo();
    }, 350);
}, 1000);

// Každých 350 ms změní cíl
setInterval(() => {
    if (escaped) moveNo();
}, 350);

yes.onclick = async () => {

    document.querySelector("h1").style.display = "none";      // Schová otázku
    document.querySelector(".buttons").style.display = "none"; // Schová tlačítka

    text.innerHTML = "❤️ Awww, díky ❤️";

    try {
        await fetch("https://ntfy.sh/OOMMGG", {
            method: "POST",
            headers: {
                "Title": "VYHRAL JSI :D",
                "Priority": "5",
                "Tags": "heart,partying_face"
            },
            body: "REKLA ANO!"
        });
    } catch (e) {
        console.log(e);
    }

};