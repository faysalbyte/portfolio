const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    });
}

let pageX = 0;
let pageY = 0;
let targetX = 0;
let targetY = 0;

const background = document.querySelector(".background");
const card = document.querySelector(".coming-card");

function pageMotion() {
    pageX += (targetX - pageX) * 0.025;
    pageY += (targetY - pageY) * 0.025;

    if (background) {
        background.style.transform =
            `translate3d(${pageX * 0.25}px, ${pageY * 0.25}px, 0)`;
    }

    if (card) {
        card.style.transform =
            `translate3d(${pageX * 0.025}px, ${pageY * 0.025}px, 0)`;
    }

    requestAnimationFrame(pageMotion);
}

window.addEventListener("mousemove", event => {
    targetX =
        (event.clientX / window.innerWidth - 0.5) * 30;

    targetY =
        (event.clientY / window.innerHeight - 0.5) * 30;
}, {
    passive: true
});

pageMotion();
