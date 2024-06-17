let currentTimeFormat = '12hr-seconds';
let fadeOutTimeout;

function updateTime() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    clockElement.textContent = formatTime(now, currentTimeFormat);
    updateDropdownTimePreviews(now);
}

function formatTime(date, format) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    let formattedTime;
    switch (format) {
        case '12hr-seconds':
            formattedTime = `${hours % 12 || 12}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
            break;
        case '12hr-no-seconds':
            formattedTime = `${hours % 12 || 12}:${padZero(minutes)} ${ampm}`;
            break;
        case '24hr-seconds':
            formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
            break;
        case '24hr-no-seconds':
            formattedTime = `${padZero(hours)}:${padZero(minutes)}`;
            break;
    }
    return formattedTime;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function handleUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const backgroundUrl = e.target.result;
            document.body.style.backgroundImage = `url(${backgroundUrl})`;
            document.body.style.backgroundSize = 'cover';
            localStorage.setItem('backgroundImage', backgroundUrl);
        };
        reader.readAsDataURL(file);
    }
}

function openSettings() {
    document.getElementById('settings-popup').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settings-popup').style.display = 'none';
}

function changeFont() {
    const fontSelect = document.getElementById('font-select');
    const selectedFont = fontSelect.value;
    document.getElementById('clock').style.fontFamily = selectedFont;
    localStorage.setItem('fontFamily', selectedFont);
}

function changeTransparency() {
    const slider = document.getElementById('transparency-slider');
    const transparencyValue = slider.value;
    const isInverted = document.getElementById('invert-colors').checked;
    if (isInverted) {
        document.querySelector('.container').style.backgroundColor = `rgba(255, 255, 255, ${transparencyValue / 100})`;
    } else {
        document.querySelector('.container').style.backgroundColor = `rgba(0, 0, 0, ${transparencyValue / 100})`;
    }
    localStorage.setItem('backgroundTransparency', transparencyValue);
}

function changeClockTransparency() {
    const slider = document.getElementById('clock-transparency-slider');
    const transparencyValue = slider.value;
    document.getElementById('clock').style.opacity = transparencyValue / 100;
    localStorage.setItem('clockTransparency', transparencyValue);
}

function changeClockSize() {
    const slider = document.getElementById('clock-size-slider');
    const sizeValue = slider.value;
    document.getElementById('clock').style.fontSize = `${sizeValue}vw`;
    localStorage.setItem('clockSize', sizeValue);
}

function changeClockFormat() {
    const formatSelect = document.getElementById('clock-format');
    currentTimeFormat = formatSelect.value;
    localStorage.setItem('clockFormat', currentTimeFormat);
}

function invertColors() {
    const container = document.getElementById('container');
    const clock = document.getElementById('clock');
    const transparencySlider = document.getElementById('transparency-slider');
    const transparencyValue = transparencySlider.value;
    if (document.getElementById('invert-colors').checked) {
        container.style.backgroundColor = `rgba(255, 255, 255, ${transparencyValue / 100})`;
        clock.style.color = 'black';
        localStorage.setItem('invertColors', 'true');
    } else {
        container.style.backgroundColor = `rgba(0, 0, 0, ${transparencyValue / 100})`;
        clock.style.color = 'white';
        localStorage.setItem('invertColors', 'false');
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function showTooltip(elementId) {
    document.getElementById(elementId).style.display = 'block';
}

function hideTooltip(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

function updateDropdownTimePreviews(date) {
    const options = document.querySelectorAll('#clock-format option');
    options.forEach(option => {
        option.textContent = formatTime(date, option.value);
    });
}

function loadSettings() {
    const backgroundImage = localStorage.getItem('backgroundImage');
    const fontFamily = localStorage.getItem('fontFamily');
    const backgroundTransparency = localStorage.getItem('backgroundTransparency');
    const clockTransparency = localStorage.getItem('clockTransparency');
    const clockSize = localStorage.getItem('clockSize');
    const clockFormat = localStorage.getItem('clockFormat');
    const invertColors = localStorage.getItem('invertColors');

    if (backgroundImage) {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = 'cover';
    }
    if (fontFamily) {
        document.getElementById('clock').style.fontFamily = fontFamily;
        document.getElementById('font-select').value = fontFamily;
    }
    if (backgroundTransparency) {
        document.getElementById('transparency-slider').value = backgroundTransparency;
        changeTransparency();
    }
    if (clockTransparency) {
        document.getElementById('clock-transparency-slider').value = clockTransparency;
        changeClockTransparency();
    }
    if (clockSize) {
        document.getElementById('clock-size-slider').value = clockSize;
        changeClockSize();
    }
    if (clockFormat) {
        currentTimeFormat = clockFormat;
        document.getElementById('clock-format').value = clockFormat;
    }
    if (invertColors) {
        document.getElementById('invert-colors').checked = invertColors === 'true';
        invertColors();
    }
}

function fadeOutIcons() {
    document.querySelectorAll('.upload-icon, .fullscreen-icon, .settings-icon, .info-icon').forEach(icon => {
        icon.style.opacity = '0';
    });
}

function fadeInIcons() {
    document.querySelectorAll('.upload-icon, .fullscreen-icon, .settings-icon, .info-icon').forEach(icon => {
        icon.style.opacity = '1';
    });
}

function resetFadeOutTimeout() {
    clearTimeout(fadeOutTimeout);
    fadeInIcons();
    fadeOutTimeout = setTimeout(fadeOutIcons, 8000);
}

document.getElementById('upload').addEventListener('change', handleUpload);
document.getElementById('settings-icon').addEventListener('click', openSettings);
document.getElementById('font-select').addEventListener('change', changeFont);
document.getElementById('transparency-slider').addEventListener('input', changeTransparency);
document.getElementById('clock-transparency-slider').addEventListener('input', changeClockTransparency);
document.getElementById('clock-size-slider').addEventListener('input', changeClockSize);
document.getElementById('clock-format').addEventListener('change', changeClockFormat);
document.getElementById('invert-colors').addEventListener('change', invertColors);
document.getElementById('fullscreen-icon').addEventListener('click', toggleFullScreen);

document.getElementById('info-icon').addEventListener('mouseenter', () => {
    showTooltip('tooltip-upload');
    showTooltip('tooltip-fullscreen');
    showTooltip('tooltip-settings');
    showTooltip('tooltip-info');
});

document.getElementById('info-icon').addEventListener('mouseleave', () => {
    hideTooltip('tooltip-upload');
    hideTooltip('tooltip-fullscreen');
    hideTooltip('tooltip-settings');
    hideTooltip('tooltip-info');
});

window.addEventListener('mousemove', resetFadeOutTimeout);
window.addEventListener('touchmove', resetFadeOutTimeout);

loadSettings();
updateTime();
setInterval(updateTime, 1000);
fadeOutTimeout = setTimeout(fadeOutIcons, 8000);
