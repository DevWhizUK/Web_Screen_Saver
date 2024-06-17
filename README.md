# ScreenSaver Web App

## Overview

The ScreenSaver Web App is a customizable digital clock web application designed to be used as a screensaver. The app features a large digital clock display, settings for personalizing the appearance, and functionality to remember user settings and background images across sessions.

![ScreenSaver Web App](images/Screenshot_2024-06-17_132131.png)

## Features

- **Digital Clock Display**: A large, easy-to-read digital clock that supports both 12-hour and 24-hour formats, with or without seconds.
- **Customizable Appearance**: Users can select from various fonts, adjust the background and clock transparency, and invert colors.
- **Background Image Upload**: Users can upload their own images to set as the background.
- **Settings Memory**: The app remembers user settings and background images across sessions using local storage.
- **Auto-Hide Icons**: The icons for settings, fullscreen, and background upload fade out after 8 seconds of inactivity and reappear when the mouse is moved.

![Customizable](images/Screenshot_2024-06-17_132302)

![Multiple Styles](images/Screenshot_2024-06-17_132400)

## Technologies Used

- **HTML**
- **CSS**
- **JavaScript**
- **LocalStorage**: For saving user preferences and settings.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DevWhizUK/web_screen_saver.git
   ```

2. Navigate to the project directory:
   ```bash
   cd web_screen_saver
   ```

3. Open the `index.html` file in your preferred web browser.

## Usage

1. **Upload Background Image**: Click on the folder icon to upload a background image.
2. **Fullscreen Mode**: Click on the fullscreen icon to toggle fullscreen mode.
3. **Open Settings**: Click on the settings icon to open the settings menu.
4. **Change Font**: Select your preferred font from the dropdown menu.
5. **Adjust Transparency**: Use the sliders to adjust the background and clock transparency.
6. **Change Clock Size**: Use the slider to adjust the size of the clock.
7. **Change Clock Format**: Select the desired clock format from the dropdown menu.
8. **Invert Colors**: Toggle the switch to invert the colors of the clock and background.
9. **Auto-Hide Icons**: The icons will automatically fade out after 8 seconds of inactivity and reappear when the mouse is moved.

## File Structure

```plaintext
screensaver-web-app/
│
├── images/
│   ├── screenshots
│
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   │   └── ds-digital.ttf
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│
├── index.html
├── README.md
└── ...
