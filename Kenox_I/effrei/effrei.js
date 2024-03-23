const zoomElement = document.querySelector(".workspace");
let zoom = 1;
const ZOOM_SPEED = 0.03;
let scrollsave = this.scrollY;

window.addEventListener("scroll", function() {  

    let newLocation = this.scrollY;

    newLocation === 0 ? newLocation = 1 : newLocation *= ZOOM_SPEED;

    newLocation < 1 ? newLocation = 1 : null;

    newLocation >30 ? newLocation=0 : null;


    console.log(this.scrollY);

    if (this.scrollY > 400) {
        let newOpacity = (this.scrollY - 400)*0.01;
        newOpacity = (1/newOpacity);
        zoomElement.style.opacity = newOpacity;
    }
    else {
        zoomElement.style.opacity = `1`;
    }
    
    zoomElement.style.transform = `scale(${newLocation})`;

    
    scrollsave = this.scrollY

});


function scrollToTop() {
   window.onbeforeunload = function () {
    window.scrollTo(0, 0);
   }
}


window.addEventListener("load", function() {
  scrollToTop();
});

/*
const save = () => {
    window.addEventListener("scroll", function() {  
        console.log(this.scrollY);
        
        if(this.scrollY > scrollsave){    
            
            zoomElement.style.transform = `scale(${zoom += ZOOM_SPEED})`;  
    
        }else{    
            
            zoomElement.style.transform = `scale(${zoom -= ZOOM_SPEED})`;  
        }
        scrollsave = this.scrollY
    
    });
}
*/