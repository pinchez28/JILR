// Array of image paths
const images = [
    "Slide-1.jpg", "Slide-2.jpg", "Slide-3.jpg", "Slide-4.jpg", "Slide-5.jpg", "Slide-6.jpg", "Slide-7.jpg", "Slide-8.jpg", "Slide-9.jpg","Slide-10","Slide-11", "Slide-12","Slide-13", "Slide-14", "Slide-15", "Slide-16", "Slide-17", "Slide-18", "Slide-19", "Slide-20", "Slide-21", "Slide-22", "Slide-23", "Slide-24", "Slide-25", "Slide-26", "Slide-27", "Slide-28", "Slide-29", "Slide-30", "Slide-31", "Slide-32", "Slide-33", "Slide-34", "Slide-35", "Slide-36", "Slide-37", "Slide-38", "Slide-39", "Slide-40", "Slide-41", "Slide-42", "Slide-43", "Slide-44", "Slide-45"
    
];

let currentIndex = 0; // Track the current image index
const slideshowElements = document.querySelectorAll('.slideshow'); // Get all images with the class 'slideshow'

function updateSlideshow() {
    // Update the src of the first image in the 'slideshow' class group
    slideshowElements.forEach(img => img.style.display = 'none'); // Hide all images
    slideshowElements[currentIndex].style.display = 'block'; // Show the current image

    currentIndex = (currentIndex + 1) % slideshowElements.length; // Loop back to the first image
}

// Initially hide all images except the first
slideshowElements.forEach(img => img.style.display = 'none');
slideshowElements[0].style.display = 'block';

// Change image every 10 seconds (10000ms)
setInterval(updateSlideshow, 10000);

