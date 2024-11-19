document.addEventListener('DOMContentLoaded', () => {
    showSlide('studio-living-room-slider');
    showSlide('studio-bath-room-slider');
    showSlide('bhk1-living-room-slider');
    showSlide('bhk1-bed-room-slider');
    showSlide('bhk1-kitchen-slider');
    showSlide('bhk2-living-room-slider');
    showSlide('bhk2-bed-room-slider');
    showSlide('bhk2-kitchen-slider');
    showSlide('bhk3-living-room-slider');
    showSlide('bhk3-living-room-slider');
    showSlide('bhk3-kitchen-slider');


    if(document.getElementById('details-studio-amenities')){
        console.log('studio-amenities loaded');
        showAmenities('details-studio-amenities', '../assets/amenities/studio.txt');
    }
    else if(document.getElementById('details-bhk1-amenities')){
        console.log('bhk1-amenities loaded');
        showAmenities('details-bhk1-amenities', '../assets/amenities/1bhk.txt');
    }
    else if(document.getElementById('details-bhk2-amenities')){
        console.log('bhk2-amenities loaded');
        showAmenities('details-bhk2-amenities', '../assets/amenities/2bhk.txt');
    }
    else if(document.getElementById('details-bhk3-amenities')){
        console.log('bhk3-amenities loaded');
        showAmenities('details-bhk3-amenities', '../assets/amenities/3bhk.txt');
    }
});

let slideIndex = {
    'studio-living-room-slider': 0,
    'studio-bath-room-slider': 0,
    'bhk1-living-room-slider': 0,
    'bhk1-bed-room-slider': 0,
    'bhk1-kitchen-slider': 0,
    'bhk2-living-room-slider': 0,
    'bhk2-bed-room-slider': 0,
    'bhk2-kitchen-slider': 0,
    'bhk3-living-room-slider': 0,
    'bhk3-bed-room-slider': 0,
    'bhk3-kitchen-slider': 0,
}

function showSlide(sliderId){
    const slides = document.querySelectorAll("#" + sliderId + " .slide");
    
    if(!slides || slides.length === 0){
        console.error("No slides found for sliderId:", sliderId);
        return;
    }

    if(!slideIndex[sliderId] || slideIndex[sliderId] < 0 || slideIndex[sliderId] >= slides.length){
        console.warn('Invalid slideIndex for sliderId', sliderId, 'resetting to 0');
        slideIndex[sliderId] = 0;
    }

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

// Show amenities
function showAmenities(elementId, filePath){
    console.log('fetching files from: ${filePath}');

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
                icon.src = '../assets/images/icons/' + iconName + ".png";
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