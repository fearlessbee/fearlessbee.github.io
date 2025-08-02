// --- CONFIGURATION ---
const username = 'fearlessbee'; // Replace with your GitHub username
const repo = 'fearlessbee.github.io';     // Replace with your repository name
const branch = 'main';                   // Or 'master'
// ---------------------

const blogContentElement = document.getElementById('blog-content');
const urlParams = new URLSearchParams(window.location.search);
const postFile = urlParams.get('post');

if (postFile) {
    const fileUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/blogs/${postFile}`;

    fetch(fileUrl)
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(markdown => {
            blogContentElement.innerHTML = marked.parse(markdown);
            const firstH1 = blogContentElement.querySelector('h1');
            if (firstH1) document.title = firstH1.textContent;
        })
        .catch(error => {
            console.error('Error fetching blog post:', error);
            blogContentElement.innerHTML = '<h2>Post not found</h2>';
        });
} else {
    blogContentElement.innerHTML = '<h2>No post specified</h2>';
}
