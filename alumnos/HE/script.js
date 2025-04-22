// DOM Elements
const demoElement = document.getElementById('demo-element');
const buttons = {
    content: {
        changeText: document.getElementById('btn-change-text'),
        htmlContent: document.getElementById('btn-html-content'),
        toggleVisibility: document.getElementById('btn-toggle-visibility')
    },
    styles: {
        changeColor: document.getElementById('btn-change-color'),
        bgColor: document.getElementById('btn-bg-color'),
        increaseFont: document.getElementById('btn-increase-font'),
        decreaseFont: document.getElementById('btn-decrease-font'),
        addBorder: document.getElementById('btn-add-border')
    },
    classes: {
        addClass: document.getElementById('btn-add-class'),
        removeClass: document.getElementById('btn-remove-class'),
        toggleClass: document.getElementById('btn-toggle-class')
    }
};

// Utility functions
const utils = {
    getRandomColor: () => `#${Math.floor(Math.random()*16777215).toString(16)}`,
    getCurrentFontSize: (element) => 
        parseFloat(window.getComputedStyle(element).fontSize),
    toggleVisibility: (element) => 
        element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden'
};

// Content manipulation
buttons.content.changeText.addEventListener('click', () => {
    demoElement.textContent = '¡Texto cambiado con JavaScript!';
});

buttons.content.htmlContent.addEventListener('click', () => {
    demoElement.innerHTML = '<strong>HTML</strong> insertado con <em>innerHTML</em>';
});

buttons.content.toggleVisibility.addEventListener('click', () => {
    utils.toggleVisibility(demoElement);
});

// Style manipulation
buttons.styles.changeColor.addEventListener('click', () => {
    demoElement.style.color = utils.getRandomColor();
});

buttons.styles.bgColor.addEventListener('click', () => {
    demoElement.style.backgroundColor = utils.getRandomColor();
});

buttons.styles.increaseFont.addEventListener('click', () => {
    const currentSize = utils.getCurrentFontSize(demoElement);
    demoElement.style.fontSize = `${currentSize + 2}px`;
});

buttons.styles.decreaseFont.addEventListener('click', () => {
    const currentSize = utils.getCurrentFontSize(demoElement);
    demoElement.style.fontSize = `${Math.max(currentSize - 2, 8)}px`;
});

buttons.styles.addBorder.addEventListener('click', () => {
    demoElement.style.border = `2px solid ${utils.getRandomColor()}`;
});

// Class manipulation
buttons.classes.addClass.addEventListener('click', () => {
    demoElement.classList.add('highlight');
});

buttons.classes.removeClass.addEventListener('click', () => {
    demoElement.classList.remove('highlight');
});

buttons.classes.toggleClass.addEventListener('click', () => {
    demoElement.classList.toggle('active');
});