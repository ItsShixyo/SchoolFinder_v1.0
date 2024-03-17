document.addEventListener("scroll", () => {
    //let myLogo = document.querySelector(".scale-up-logo");
    //let myLogoTop = myLogo.getBoundingClientRect().top;

    let newScale = this.scrollY;
    newScale = newScale/ 100;

    if (newScale < 1) {
        newScale = 1;
    }

    // Prevent from infinite page
    if (newScale < 30) {
        document.getElementById("scale-up-2").style.transform = `scale(${newScale})`;
    }
    else {
        document.getElementById("scale-up-2").style.transform = `scale(0)`;
    }


    if (newScale < 30) {
        document.getElementById("full-site").style.transform = `translateY(${this.scrollY}px)` // Prevent site from moving
    }

    let a1 = document.getElementById("first-table");
    if (a1.getBoundingClientRect().top < 0 && a1.style.borderSpacing.split("px")[0] < 100){
        console.log(a1.style.borderSpacing);
        document.getElementById("first-table").style.borderSpacing = `${-(a1.getBoundingClientRect().top/5)}px`;
    }


});

let sideMenuIsOpen = false;

const openNav = () => {
    const button = document.getElementById("side-menu-button");
    sideMenuIsOpen ? button.style.transform = "rotate(180deg)" : button.style.transform = "rotate(0deg)";
    sideMenuIsOpen = !sideMenuIsOpen;

    const container = document.getElementById("options-container");
    //nav1.style.animationDuration = '500ms';
    //nav1.style.animationName = 'open-side-menu-animation';
    //nav1.style.height = sideMenuIsOpen ? "auto" : "100px";

    if (sideMenuIsOpen) {
        container.innerHTML = "";  // Clear menu (simulate closing)
    }
    else {

        // All options available in top menu
        const allOptions = [
            {
                title: "Le site de l'école",
                redirect: "https://epitech.eu"
            },
            {
                title: "Parcoursup",
                redirect: "https://parcoursup.gouv.fr"
            }
        ];

        // Add each option in 'options-container'
        allOptions.forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "option-item";

            const siteRedirection = document.createElement("a");
            siteRedirection.innerHTML = item.title;
            siteRedirection.href = item.redirect;

            itemDiv.appendChild(siteRedirection);
            container.appendChild(itemDiv);
        });
    }
}