const typing = document.getElementById("typing");

const words = [
    "INDUSTRIAL CERTIFIED MERN STACK DEVELOPER",
    "WEB APPLICATION DEVELOPMENT WITH PYTHON National Skills Development Authority (NSDA) LEVEL-4",
    "WEB DESIGN & WEB DEVELOPMENT FOR FREELANCING TRAINER",
    "National Skills Development Authority (NSDA) Level-3 & Level-5 CERTIFIED WEB DESIGN & WEB DEVELOPER FOR FREELANCING",
    "National Skills Development Authority (NSDA) Level-4 ANDROID APP DEVELOPMENT WITH KOTLIN",
    "National Skills Development Authority (NSDA) Level-3 & Level-4 DIGITAL MARKETING FOR FREELANCING (SEO)",
    "SEO EXPERT..",
    "Full STACK WEB DEVELOPER..",
    "Frontend Developer..",
    "Backend Developer..",
    "CMS DEVELOPER..",
    "CMS EXPERT..",
    "Shopify EXPERT..",
    "eCOMMERCE DEVELOPER..",
    "WordPress DEVELOPER..",
    "Webflow DEVELOPER..",
    "Wix DEVELOPER..",
    "Squarespace DEVELOPER..",
    "Certified Software Quality Assurance National Skills Development Authority (NSDA) Level-3",
    "Certified Software Quality Assurance",
    "Knowledge UI/UX..",
    "Knowledge DevOps .."
];

const colors = [
    "#00E5FF",
    "#FF6B35",
    "#A855F7",
    "#22C55E",
    "#FACC15",
    "#FF2D55",
    "#3B82F6",
    "#06B6D4",
    "#F97316",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#EF4444",
    "#84CC16",
    "#6366F1",
    "#F43F5E",
    "#10B981",
    "#EAB308",
    "#D946EF",
    "#38BDF8",
    "#FB7185"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeWriter() {

    if (!typing) return;

    const word = words[wordIndex];
    const color = colors[wordIndex];

    typing.style.color = color;

    typing.style.textShadow = `
        0 0 8px ${color}66,
        0 0 20px ${color}33
    `;

    if (!deleting) {

        characterIndex++;

        typing.textContent =
            word.substring(
                0,
                characterIndex
            );

        if (characterIndex >= word.length) {

            deleting = true;

            setTimeout(
                typeWriter,
                1800
            );

            return;
        }

        setTimeout(
            typeWriter,
            90
        );

    } else {

        characterIndex--;

        typing.textContent =
            word.substring(
                0,
                characterIndex
            );

        if (characterIndex <= 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                words.length;

            setTimeout(
                typeWriter,
                400
            );

            return;
        }

        setTimeout(
            typeWriter,
            45
        );
    }
}

typeWriter();


const portrait =
    document.getElementById("portrait");

if (portrait) {

    const firstImage =
        portrait.querySelector(
            ".image-first"
        );

    const secondImage =
        portrait.querySelector(
            ".image-second"
        );

    const particles =
        document.getElementById(
            "particles"
        );

    let showingSecond = false;
    let animationRunning = false;
    let returnTimer = null;

    function createParticles() {

        if (!particles) return;

        particles.innerHTML = "";

        const particleCount = 55;

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );

            particle.className =
                "particle";

            const x =
                (Math.random() - 0.5) *
                480;

            const y =
                (Math.random() - 0.5) *
                620;

            const size =
                Math.random() * 5 + 2;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.setProperty(
                "--x",
                `${x}px`
            );

            particle.style.setProperty(
                "--y",
                `${y}px`
            );

            particle.style.animationDelay =
                `${Math.random() * 0.25}s`;

            particles.appendChild(
                particle
            );
        }
    }

    function burnToSecond() {

        if (
            animationRunning ||
            showingSecond
        ) {
            return;
        }

        animationRunning = true;

        clearTimeout(returnTimer);

        createParticles();

        portrait.classList.add(
            "burning"
        );

        setTimeout(() => {

            if (firstImage) {
                firstImage.style.opacity =
                    "0";
            }

            if (secondImage) {
                secondImage.style.opacity =
                    "1";
            }

            showingSecond = true;

        }, 650);

        setTimeout(() => {

            portrait.classList.remove(
                "burning"
            );

            if (particles) {
                particles.innerHTML = "";
            }

            animationRunning = false;

        }, 1300);

        returnTimer = setTimeout(() => {

            burnToFirst();

        }, 2000);
    }

    function burnToFirst() {

        if (
            animationRunning ||
            !showingSecond
        ) {
            return;
        }

        animationRunning = true;

        createParticles();

        portrait.classList.add(
            "burning"
        );

        setTimeout(() => {

            if (secondImage) {
                secondImage.style.opacity =
                    "0";
            }

            if (firstImage) {
                firstImage.style.opacity =
                    "1";
            }

            showingSecond = false;

        }, 650);

        setTimeout(() => {

            portrait.classList.remove(
                "burning"
            );

            if (particles) {
                particles.innerHTML = "";
            }

            animationRunning = false;

        }, 1300);
    }

    function activatePortrait(event) {

        if (event) {
            event.preventDefault();
        }

        if (showingSecond) {
            return;
        }

        burnToSecond();
    }

    portrait.addEventListener(
        "mouseenter",
        activatePortrait
    );

    portrait.addEventListener(
        "touchstart",
        activatePortrait,
        {
            passive: false
        }
    );

    portrait.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                activatePortrait(event);
            }
        }
    );
}


const menuButton =
    document.getElementById(
        "menuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );

if (
    menuButton &&
    mobileMenu
) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        });
}


let pageX = 0;
let pageY = 0;

let targetX = 0;
let targetY = 0;

const background =
    document.querySelector(
        ".background"
    );

const portraitScene =
    document.querySelector(
        ".portrait-scene"
    );

function pageMotion() {

    pageX +=
        (targetX - pageX) *
        0.025;

    pageY +=
        (targetY - pageY) *
        0.025;

    if (background) {

        background.style.transform =
            `translate3d(
                ${pageX * 0.25}px,
                ${pageY * 0.25}px,
                0
            )`;
    }

    if (portraitScene) {

        portraitScene.style.transform =
            `translate3d(
                ${pageX * 0.04}px,
                ${pageY * 0.04}px,
                0
            )`;
    }

    requestAnimationFrame(
        pageMotion
    );
}

window.addEventListener(
    "mousemove",
    event => {

        targetX =
            (
                event.clientX /
                window.innerWidth -
                0.5
            ) * 30;

        targetY =
            (
                event.clientY /
                window.innerHeight -
                0.5
            ) * 30;

    },
    {
        passive: true
    }
);

window.addEventListener(
    "deviceorientation",
    event => {

        if (
            typeof event.gamma !== "number" ||
            typeof event.beta !== "number"
        ) {
            return;
        }

        targetX =
            Math.max(
                -20,
                Math.min(
                    20,
                    event.gamma
                )
            );

        targetY =
            Math.max(
                -20,
                Math.min(
                    20,
                    event.beta - 45
                )
            );
    },
    {
        passive: true
    }
);

pageMotion();
