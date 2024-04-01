// script.js

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of the link
            const targetId = this.getAttribute('href').substring(1);
            console.log('Navigating to:', targetId);
        });
    });
});

// JavaScript code for navbar hiding/showing on scroll
var lastScrollTop = 0;
window.addEventListener("scroll", function() {
    // Scroll code
}, false);

// JavaScript code for toggling dark mode
function toggleDarkMode() {
    // Dark mode code
}

// JavaScript code for typing effect on welcome text
var welcomeText = document.getElementById("welcome-text");
var text = "elcome.";
var index = 0;

function type() {
    // Typing code
}

type();

function navigateToHomepage() {
    window.location.href = "index.html";
}

function toggleAnswer(id) {
    var answer = document.getElementById("answer" + id);
    var button = document.querySelector(".btn-plus[data-id='" + id + "']");

    if (answer.style.display === "none") {
        answer.style.display = "block";
        button.textContent = "-"; /* Change button text to "-" when answer is expanded */
    } else {
        answer.style.display = "none";
        button.textContent = "+"; /* Change button text back to "+" when answer is collapsed */
    }
}

    // Function to scroll to specific section
    function scrollToSection(sectionId) {
        var section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    }