// Define displayPost function globally
function displayPost(post) {
    const contentDiv = document.getElementById("content");
    const postHTML = `
        <h2>${post.title}</h2>
        <p>Content: ${post.content}</p>
        <p>User ID: ${post.userId}</p>
    `;
    contentDiv.innerHTML = postHTML;
}

document.addEventListener("DOMContentLoaded", () => {
    const postIdInput = document.getElementById("postIdInput");
    const getPostButton = document.getElementById("getPostButton");

    getPostButton.addEventListener("click", async () => {
        const postId = postIdInput.value;
        if (postId.trim() === "") {
            alert("Please enter a valid Post ID");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5005/api/post/${postId}`);
            if (!response.ok) {
                throw new Error("Post not found");
            }
            const post = await response.json();
            displayPost(post);
        } catch (error) {
            console.error("Error:", error.message);
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });
});
