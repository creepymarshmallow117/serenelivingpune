document.addEventListener("DOMContentLoaded", () => {
    showSlide('studio-slider');
    showSlide('bhk3-slider');
    showSlide('bhk2-slider');
    showSlide('bhk1-slider');

    showDescription('sereneliving-description', 'assets/descriptions/sereneliving.txt');
    showDescription('studio-description', 'assets/descriptions/studio.txt');
    showDescription('bhk3-description', 'assets/descriptions/3bhk.txt');
    showDescription('bhk2-description', 'assets/descriptions/2bhk.txt');
    showDescription('bhk1-description', 'assets/descriptions/1bhk.txt');

    showAmenities('studio-amenities', 'assets/amenities/studio.txt');
    showAmenities('bhk3-amenities', 'assets/amenities/3bhk.txt');
    showAmenities('bhk2-amenities', 'assets/amenities/2bhk.txt');
    showAmenities('bhk1-amenities', 'assets/amenities/1bhk.txt');
});



let slideIndex = {'studio-slider': 0, 'bhk3-slider': 0, 'bhk2-slider': 0, 'bhk1-slider': 0};
let descriptionPaths = {'sereneliving-description': '../descriptions/sereneliving.txt'};

function showSlide(sliderId){
    const slides = document.querySelectorAll("#" + sliderId + " .slide");
    
    slides.forEach((slide) => {
        slide.style.display = "none";
    })

    slides[slideIndex[sliderId]].style.display = "block"; 
}

// Show next slide
function changeSlide(n, sliderId){
    const slides = document.querySelectorAll("#" + sliderId + " .slide");
    const totalSlides = slides.length;

    slideIndex[sliderId] = (slideIndex[sliderId] + n + totalSlides) % totalSlides;
    showSlide(sliderId);
}

// Show description
function showDescription(elementId, filePath){

    // const filePath = descriptionPaths[elementId];

    fetch(filePath)
    .then(response => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.text();
    })
    .then(text => {
        document.getElementById(elementId).innerText = text;
    })
    .catch(error => console.error('Error loading description: ', error));
}

// Show amenities
function showAmenities(elementId, filePath){
    fetch(filePath)
    .then(response => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.text();
    })
    .then(text => {
        const amenitiesList = document.getElementById(elementId);
        const amenities = text.split("\n");
        amenities.forEach(amenity => {
            const [name, iconName] = amenity.split(',').map(item => item.trim());

            if(name && iconName){
                const listItem = document.createElement('li');

                // Create an image for the icon
                const icon = document.createElement('img');
                icon.src = 'assets/images/icons/' + iconName + ".png";
                icon.alt = name + " icon";
                icon.classList.add('amenity-icon');

                // Add text
                const textNode = document.createTextNode(name);

                // Append icon and text to list item
                listItem.appendChild(icon);
                listItem.appendChild(textNode);

                // Add list item to amenities list
                amenitiesList.appendChild(listItem);
            }
        });
    })
    .catch(error => console.error('Error loading amenities:', error));
}