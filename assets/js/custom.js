// custom.js

// Add a blog post
function addBlogPost(title, content) {
    // Create elements for title, date, and content
    var postElement = document.createElement("div");
    postElement.classList.add("blog-post");
    postElement.innerHTML = `
        <h3>${title}</h3>
        <p class="post-date">${getDate()}</p>
        <p>${content}</p>
    `;
    
    // Append the new post to the container
    var blogPostsContainer = document.getElementById("blog-posts");
    blogPostsContainer.appendChild(postElement);
}

// Get current date
function getDate() {
    var currentDate = new Date();
    return currentDate.toDateString(); // Example: "Wed Mar 30 2024"
}

// Prevent right-clicking and copying
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('copy', event => event.preventDefault());

// Open photographer's website in a new tab
document.querySelector('.credit a').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents click event from bubbling up
});
