
const openButton = document.getElementById("openLetter");
const letterSection = document.getElementById("letterSection");

const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");
const musicSymbol = document.getElementById("musicSymbol");
const music = document.getElementById("backgroundMusic");

const heartsContainer = document.getElementById("heartsContainer");

let letterOpened = false;

// ABRIR CARTA
openButton.addEventListener("click", () => {
    if (!letterOpened) {
        letterSection.classList.add("visible");
        letterOpened = true;

        openButton.querySelector("span:first-child").textContent =
            "Minha carta para você";

        setTimeout(() => {
            letterSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 150);
    } else {
        letterSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

// MÚSICA: O NAVEGADOR SÓ PERMITE INICIAR APÓS UM TOQUE
musicButton.addEventListener("click", async () => {
    const source = music.querySelector("source");
    const musicUrl = source ? source.getAttribute("src") : "";

    if (!musicUrl || musicUrl.includes("COLE_AQUI")) {
        musicText.textContent = "Adicione sua música no HTML";
        return;
    }

    if (music.paused) {
        try {
            await music.play();

            musicText.textContent = "Pausar música";
            musicSymbol.textContent = "♫";
        } catch (error) {
            musicText.textContent = "Toque para tentar novamente";
        }
    } else {
        music.pause();

        musicText.textContent = "Tocar música";
        musicSymbol.textContent = "♫";
    }
});

// ATUALIZA O BOTÃO SE A MÚSICA TERMINAR OU FALHAR
music.addEventListener("pause", () => {
    musicText.textContent = "Tocar música";
});

music.addEventListener("play", () => {
    musicText.textContent = "Pausar música";
});

// CORAÇÕES CAINDO
function createHeart() {
    const heart = document.createElement("span");

    heart.classList.add("floating-heart");
    heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (12 + Math.random() * 17) + "px";
    heart.style.animationDuration = (7 + Math.random() * 7) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// MENOS CORAÇÕES EM CELULARES PARA NÃO PESAR
const isMobile = window.matchMedia("(max-width: 600px)").matches;
const heartInterval = isMobile ? 1000 : 650;

setInterval(createHeart, heartInterval);

// PRIMEIROS CORAÇÕES
for (let i = 0; i < 7; i++) {
    setTimeout(createHeart, i * 350);
}
