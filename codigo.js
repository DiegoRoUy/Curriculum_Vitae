document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       🎞️ ANIMACIÓN DE SÍMBOLOS DE FONDO EN EL HEADER
    ============================================================ */
    const container = document.getElementById("background-code");
    const symbols = "01{}<>#@*&%$=+";
    const total = 40; // cantidad de símbolos animados

    for (let i = 0; i < total; i++) {
        const span = document.createElement("span");
        span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDuration = 6 + Math.random() * 6 + "s"; // velocidad variable
        span.style.fontSize = 1 + Math.random() * 1.2 + "rem";
        container.appendChild(span);
    }

    /* ============================================================
       ✨ ANIMACIÓN DE NOMBRE (LETRAS "DESCIFRADAS")
    ============================================================ */
    const text = "Diego Rodríguez";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let interval = null;
    let iteration = 0;

    const element = document.getElementById("scramble");
    if (!element) return;

    element.textContent = "";

    function animacionText() {
        clearInterval(interval);
        let displayText = text.split("").map(() => "");
        iteration = 0;

        interval = setInterval(() => {
            let done = true;
            let html = "";

            for (let i = 0; i < text.length; i++) {
                if (i < iteration) {
                    // ✅ Letra correcta → blanca
                    html += `<span style="color:#ffffff;">${text[i]}</span>`;
                } else if (text[i] !== " ") {
                    // 🔁 Letras en transición → azul claro
                    const randomChar = letters[Math.floor(Math.random() * letters.length)];
                    html += `<span style="color:#cfe3ff;">${randomChar}</span>`;
                    done = false;
                } else {
                    html += " ";
                }
            }

            element.innerHTML = html;

            if (done) clearInterval(interval);
            iteration += 0.2; // velocidad
        }, 50);
    }

    animacionText();
});

const canvas = document.getElementById("linesCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let lines = [];

function createLine(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 2;
    const length = 40 + Math.random() * 100;
    const color = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`;
    lines.push({
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: 1,
        color,
        length,
    });
}

function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach((line, i) => {
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.dx * line.length, line.y + line.dy * line.length);
        ctx.stroke();

        // actualiza posición y vida
        line.x += line.dx;
        line.y += line.dy;
        line.life -= 0.02;

        // desvanece
        if (line.life <= 0) lines.splice(i, 1);
    });

    requestAnimationFrame(drawLines);
}

drawLines();

document.getElementById("hero").addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // genera varias líneas por clic
    for (let i = 0; i < 5; i++) {
        createLine(x, y);
    }
});