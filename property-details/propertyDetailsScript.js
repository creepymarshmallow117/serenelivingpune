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

    if(document.getElementById('bhk3-reviews-list')){
        console.log('bhk3-reviews-loaded');
        loadReviews('bhk3-reviews-list', '../assets/reviews/bhk3.json');
    }
    else if(document.getElementById('bhk2-reviews-list')){
        console.log('bhk2-reviews-loaded');
        loadReviews('bhk2-reviews-list', '../assets/reviews/bhk2.json');
    }
    else if(document.getElementById('bhk1-reviews-list')){
        console.log('bhk1-reviews-loaded');
        loadReviews('bhk1-reviews-list', '../assets/reviews/bhk1.json');
    }
    // else if(document.getElementById('studio-reviews-list')){
    //     console.log('studio reviews loaded');
    //     loadReviews('studio-reviews-list', '../assets/reviews/studio.json');
    // }
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

function toggleAmenities(elementId) {
    const amenitiesList = document.getElementById(elementId);
    const items = amenitiesList.querySelectorAll('li');
    const button = amenitiesList.nextElementSibling;

    if(!amenitiesList.dataset.expanded || amenitiesList.dataset.expanded === "false"){
        // Show all amenities
        items.forEach(item => item.style.display = "flex");
        button.textContent = "View less amenities";
        amenitiesList.dataset.expanded = "true";
    }else {
        // Show limited amenities
        items.forEach((item, index) => {
            item.style.display = index < 5 ? "flex" : "none";
        });
        button.textContent = "View all amenities";
        amenitiesList.dataset.expanded = "false";
    }
}

function showAmenities(elementId, filePath){
    fetch(filePath)
    .then(response => {
        if(!response.ok) throw new Error("Network response not ok");
        return response.text();
    })
    .then(text =>{
        const amenitiesList = document.getElementById(elementId);
        const amenities = text.split("\n");
        amenities.forEach((amenity, index) => {
            const [name, iconName] = amenity.split(',').map(item => item.trim());

            if (name && iconName) {
                const listItem = document.createElement('li');
                listItem.style.display = index < 5 ? "flex" : "none";

                const icon = document.createElement('img');
                icon.src = "../assets/images/icons/" + iconName + ".png";
                icon.alt = name + " icon";
                icon.classList.add('amenity-icon');

                const textNode = document.createTextNode(name);

                listItem.appendChild(icon);
                listItem.appendChild(textNode);

                // Add list item to amenities list
                amenitiesList.appendChild(listItem);
            }
        });

        amenitiesList.dataset.expanded = "false";
    })
    .catch(error => console.error('error loading amenities:', error));
}

function loadReviews(elementId, filePath){
    console.log('fetching reviews from: ${filePath}');

    fetch(filePath)
    .then(response => {
        if(!response.ok) throw new Error('Network response not ok');
        return response.json();
    })
    .then(reviews => {
        const reviewsList = document.getElementById(elementId);

        reviews.forEach(review => {
            const listItem = document.createElement('li');

            // Add review text
            const reviewText = document.createElement('p');
            reviewText.classList.add('review-text');
            reviewText.textContent = review.text;

            // Add author name
            const reviewAuthor = document.createElement('p');
            reviewAuthor.classList.add('review-author');
            reviewAuthor.textContent = ' - ' + review.author;

            // Add link to the property page
            const reviewLink = document.createElement('a');
            reviewLink.classList.add('review-link');
            reviewLink.href = review.link;
            reviewLink.target = '_blank';
            reviewLink.textContent = 'Read more';

            listItem.appendChild(reviewText);
            listItem.appendChild(reviewAuthor);
            listItem.appendChild(reviewLink);

            reviewsList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error loading reviews:', error));
}
