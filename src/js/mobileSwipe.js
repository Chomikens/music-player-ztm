import {getCoverImage} from "./domElements.js";
import { playNextSong, playPreviousSong } from './main.js';

// Add swipe detection to the cover image
const coverImageSwipe = getCoverImage(); 

// Variables to store touch start coordinates and touch end coordinates
let touchstartX = 0;
let touchendX = 0;


// Function to handle touch start
function handleTouchStart(e) {
    touchstartX = e.changedTouches[0].screenX;
  }
  

// Function to handle touch end
function handleTouchEnd(e) {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
  }

  // Function to determine swipe direction
function handleGesture() {
    if (touchendX < touchstartX) {
      // Swipe left
      playNextSong()
    }
    if (touchendX > touchstartX) {
      // Swipe right
      playPreviousSong()
    }
  }

coverImageSwipe.addEventListener('touchstart', handleTouchStart, false);
coverImageSwipe.addEventListener('touchend', handleTouchEnd, false);



