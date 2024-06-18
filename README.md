
# Music Player | Kotorozec

## Overview

This project is a web-based music player application built with HTML, CSS, and JavaScript. It allows users to play, pause, and navigate through a playlist of songs. The player displays album art, song title, and artist name, and includes a progress bar to show the current playback position.

## Features

-   **7-1 Pattern in SCSS**: The styling follows the 7-1 pattern, a popular structure in SCSS that helps organize stylesheets into manageable files. This pattern includes:
    
    -   `base/`: Base styles like resets and typography.
    -   `components/`: Small, reusable components.
    -   `layout/`: Layout styles for the major sections of the application.
    -   `pages/`: Styles specific to individual pages.
    -   `themes/`: Theme styles.
    -   `abstracts/`: Variables, functions, mixins, and other helpers.
    -   `vendors/`: Third-party styles.
    
-   **Lazy Initialization for DOM Queries**: The JavaScript code employs lazy initialization for DOM queries. Each getter function checks if the corresponding DOM element has already been queried. If not, it queries the DOM and stores the reference for future use. This improves performance by minimizing unnecessary DOM queries.
    
-   **JavaScript Modules**: The JavaScript code is modular, improving maintainability and reusability. Key modules include:
    
    -   `main.js`: The entry point that initializes the music player.
    -   `domElements.js`: Contains functions to lazily initialize and retrieve DOM elements.
    -   `song.js`: Defines the song list data structure.

## How to Use

1.  **Initialize the Music Player**: The `createMusicPlayer` function is called with the playlist, setting up the music player and rendering the first song.
2.  **Control Buttons**: Event listeners are added to control buttons (play, pause, next, previous) to handle user interactions.
3.  **Progress Bar**: The progress bar updates in real-time as the song plays, and users can click on the progress bar to seek different parts of the song.

## Accessibility

-   **Aria Labels**: The application uses ARIA (Accessible Rich Internet Applications) labels to ensure that screen readers can accurately describe the functionality and content of the player controls.
-   **Role Attributes**: Proper role attributes are used to describe the elements' purpose, enhancing the accessibility of the application.

## Future Enhancements
-	**JavaScript Song Caching**: Implement caching for songs to improve performance and reduce loading times as the playlist grows. This will involve storing song data in the browser's local storage or indexedDB and fetching it from the cache when needed.
-   **Playlist Management**: Add functionality to manage and customize playlists.
-   **Advanced Controls**: Introduce additional controls like shuffle and repeat.

## Demo 
[Listen to some of the songs! ](https://chomikens.github.io/music-player-ztm/)
