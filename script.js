/* =========================================================
   FRESHERS' 2026
   INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const intro = document.getElementById("intro");
    const enterBtn = document.getElementById("enterBtn");

    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    const musicText = document.getElementById("musicText");

    const progressBar = document.getElementById("progressBar");

    const cursorGlow = document.querySelector(".cursor-glow");

    const parallaxImage =
        document.querySelector(".parallax-image");

    const activityCards =
        document.querySelectorAll(".activity-card");

    const activityDetail =
        document.getElementById("activityDetail");

    const detailClose =
        document.getElementById("detailClose");

    const detailNumber =
        document.getElementById("detailNumber");

    const detailTitle =
        document.getElementById("detailTitle");

    const detailText =
        document.getElementById("detailText");

    const vibeButtons =
        document.querySelectorAll(".vibe-btn");

    const vibeLabel =
        document.getElementById("vibeLabel");

    const vibeTitle =
        document.getElementById("vibeTitle");

    const vibeText =
        document.getElementById("vibeText");

    const vibeResultNumber =
        document.querySelector(".vibe-result-number");

    const revealTitleBtn =
        document.getElementById("revealTitleBtn");

    const titleReveal =
        document.getElementById("titleReveal");

    const finalButton =
        document.getElementById("finalButton");


    /* =====================================================
       MUSIC
    ====================================================== */

    music.volume = 0.22;

    let musicStarted = false;

    async function startMusic() {

        try {

            await music.play();

            musicStarted = true;

            musicBtn.classList.add("playing");

            musicText.textContent = "Music On";

        } catch (error) {

            console.log(
                "Music playback requires interaction."
            );

        }

    }


    enterBtn.addEventListener("click", () => {

        startMusic();

        intro.classList.add("hide");

        document.body.classList.remove("no-scroll");

    });


    musicBtn.addEventListener("click", async () => {

        if (!musicStarted) {

            await startMusic();

            return;

        }

        if (music.paused) {

            await startMusic();

        } else {

            music.pause();

            musicBtn.classList.remove("playing");

            musicText.textContent = "Music Off";

        }

    });


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    function updateProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width =
            `${progress}%`;

    }

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    /* =====================================================
       REVEAL ON SCROLL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       CURSOR GLOW
    ====================================================== */

    if (
        window.matchMedia("(pointer: fine)").matches &&
        cursorGlow
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            }
        );

    }


    /* =====================================================
       PARALLAX IMAGE
    ====================================================== */

    function updateParallax() {

        if (!parallaxImage) return;

        const section =
            parallaxImage.closest(
                ".cinematic-section"
            );

        if (!section) return;

        const rect =
            section.getBoundingClientRect();

        const windowHeight =
            window.innerHeight;

        if (
            rect.bottom > 0 &&
            rect.top < windowHeight
        ) {

            const progress =
                (windowHeight - rect.top) /
                (windowHeight + rect.height);

            const movement =
                (progress - 0.5) * 70;

            parallaxImage.style.transform =
                `translateY(${movement}px) scale(1.05)`;

        }

    }

    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );


    /* =====================================================
       ACTIVITY DATA
       
       TEAM CHALLENGE REMOVED
    ====================================================== */

    const activityData = {

        individual: {
            number: "01",
            title: "INDIVIDUAL CHALLENGE",
            text:
                "Step into the spotlight, take the challenge and show everyone what makes you different."
        },

        performance: {
            number: "02",
            title: "DANCE • MUSIC • JAM",
            text:
                "Sing it. Dance it. Jam it. Whether you're on stage or off stage, bring your energy to the carnival."
        },

        food: {
            number: "03",
            title: "FOOD • REFRESHMENTS",
            text:
                "Because great events need good people, good conversations and something refreshing between the action."
        }

    };


    /* =====================================================
       ACTIVITY CARD INTERACTION
    ====================================================== */

    activityCards.forEach(card => {

        card.addEventListener("click", () => {

            const key =
                card.dataset.card;

            const data =
                activityData[key];

            if (!data) return;

            detailNumber.textContent =
                data.number;

            detailTitle.textContent =
                data.title;

            detailText.textContent =
                data.text;

            activityDetail.classList.add(
                "active"
            );

            document.body.classList.add(
                "no-scroll"
            );

        });


        /* Desktop tilt */

        if (
            window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateY =
                        ((x / rect.width) - 0.5) * 7;

                    const rotateX =
                        ((y / rect.height) - 0.5) * -7;

                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        }

    });


    /* =====================================================
       CLOSE ACTIVITY DETAIL
    ====================================================== */

    function closeActivityDetail() {

        activityDetail.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }

    detailClose.addEventListener(
        "click",
        closeActivityDetail
    );


    activityDetail.addEventListener(
        "click",
        event => {

            if (
                event.target === activityDetail
            ) {

                closeActivityDetail();

            }

        }
    );


    /* =====================================================
       VIBE SELECTOR
    ====================================================== */

    const vibeData = {

        perform: {
            number: "01",
            label: "THE SPOTLIGHT",
            title: "You were born for the stage.",
            text:
                "Grab the mic, step forward and make people remember you."
        },

        dance: {
            number: "02",
            label: "THE ENERGY",
            title: "You ARE the party.",
            text:
                "Music starts. Everyone moves. You somehow end up in the middle."
        },

        compete: {
            number: "03",
            label: "THE COMPETITOR",
            title: "You came to collect points.",
            text:
                "Challenges, pressure and a little friendly competition? Say less."
        }

    };


    vibeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                vibeButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });

                button.classList.add(
                    "active"
                );

                const data =
                    vibeData[
                        button.dataset.vibe
                    ];

                if (!data) return;

                vibeResultNumber.textContent =
                    data.number;

                vibeLabel.textContent =
                    data.label;

                vibeTitle.textContent =
                    data.title;

                vibeText.textContent =
                    data.text;

            }
        );

    });


    /* =====================================================
       MR & MS REVEAL
    ====================================================== */

    revealTitleBtn.addEventListener(
        "click",
        () => {

            const isActive =
                titleReveal.classList.toggle(
                    "active"
                );

            if (isActive) {

                revealTitleBtn
                    .querySelector("span")
                    .textContent =
                    "HIDE THE MOMENT";

            } else {

                revealTitleBtn
                    .querySelector("span")
                    .textContent =
                    "REVEAL THE MOMENT";

            }

        }
    );


    /* =====================================================
       MAGNETIC BUTTONS
    ====================================================== */

    const magneticElements =
        document.querySelectorAll(".magnetic");

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        magneticElements.forEach(element => {

            element.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    element.style.transform =
                        `translate(
                            ${x * 0.12}px,
                            ${y * 0.12}px
                        )`;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       RSVP SYSTEM
    ====================================================== */

    const rsvpModal =
        document.getElementById("rsvpModal");

    const rsvpClose =
        document.getElementById("rsvpClose");

    const rsvpForm =
        document.getElementById("rsvpForm");

    const rsvpName =
        document.getElementById("rsvpName");

    const rsvpInstagram =
        document.getElementById(
            "rsvpInstagram"
        );

    const rsvpSuccess =
        document.getElementById(
            "rsvpSuccess"
        );


    /*
       IMPORTANT:
       Google Apps Script Web App URL
    */

    const RSVP_URL =
        "https://script.google.com/macros/s/AKfycbyDAo84wAjdexCZ4FsD4QgHXCeBpsz0HLB4p7OHxo7MQ4Z1-d0BwnvwaRcAEOpwfZAT/exec";


    /* OPEN RSVP */

    finalButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            rsvpModal.classList.add(
                "active"
            );

            document.body.classList.add(
                "no-scroll"
            );

            setTimeout(() => {

                rsvpName.focus();

            }, 300);

        }
    );


    /* CLOSE RSVP */

    function closeRSVP() {

        rsvpModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }

    rsvpClose.addEventListener(
        "click",
        closeRSVP
    );


    /* CLICK OUTSIDE */

    rsvpModal.addEventListener(
        "click",
        event => {

            if (
                event.target === rsvpModal
            ) {

                closeRSVP();

            }

        }
    );


    /* RSVP SUBMIT */

    rsvpForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const name =
                rsvpName.value.trim();

            let instagram =
                rsvpInstagram.value.trim();


            if (!name || !instagram) {

                return;

            }


            if (
                !instagram.startsWith("@")
            ) {

                instagram =
                    "@" + instagram;

            }


            const submitButton =
                rsvpForm.querySelector(
                    ".rsvp-submit"
                );


            submitButton.disabled = true;

            submitButton
                .querySelector("span")
                .textContent =
                "ADDING YOU...";


            const data =
                new URLSearchParams();


            data.append(
                "name",
                name
            );

            data.append(
                "instagram",
                instagram
            );

            data.append(
                "submittedAt",
                new Date().toISOString()
            );


            try {

                await fetch(
                    RSVP_URL,
                    {
                        method: "POST",
                        mode: "no-cors",
                        body: data
                    }
                );


                rsvpForm.style.display =
                    "none";

                rsvpSuccess.classList.add(
                    "active"
                );


            } catch (error) {

                console.error(
                    "RSVP submission failed:",
                    error
                );


                submitButton.disabled =
                    false;

                submitButton
                    .querySelector("span")
                    .textContent =
                    "TRY AGAIN";

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }

            closeActivityDetail();

            closeRSVP();

            titleReveal.classList.remove(
                "active"
            );

        }
    );


    /* =====================================================
       FINAL BUTTON
    ====================================================== */

    finalButton.addEventListener(
        "mouseenter",
        () => {

            if (
                window.matchMedia(
                    "(pointer: fine)"
                ).matches
            ) {

                finalButton
                    .querySelector("span")
                    .textContent =
                    "JOIN THE CARNIVAL";

            }

        }
    );


    finalButton.addEventListener(
        "mouseleave",
        () => {

            finalButton
                .querySelector("span")
                .textContent =
                "I'LL BE THERE";

        }
    );


    /* =====================================================
       PARTICLES
    ====================================================== */

    const particleContainer =
        document.querySelector(
            ".particles"
        );

    const particleCount =
        window.innerWidth < 700
            ? 18
            : 32;


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

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;

        particle.style.animationDelay =
            `${Math.random() * -15}s`;

        particle.style.opacity =
            `${0.2 + Math.random() * 0.5}`;

        particleContainer.appendChild(
            particle
        );

    }


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    updateProgress();

    updateParallax();

});