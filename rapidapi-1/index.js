     
let container = document.getElementsByClassName("container")[0];

// Function to display the loading indicator
function showLoader() {
    if (!container) return;
    container.innerHTML = `<p>Loading...</p>`;
}
// Function to fetch and display a random dog image
async function randomDog() {
    showLoader();  // Show loader while fetching data

    try {
        let res = await fetch("https://dog.ceo/api/breeds/image/random");
        
        if (!res.ok) {
            throw new Error("Something went wrong");
        }

        let { message, status } = await res.json();

        setTimeout(() => {
            displayData(message, status);
            saveData(message, status);
        }, 5000); // Delay display by 2 seconds for smoother loading
    } 
    catch (err) {
        console.warn(err);
        container.innerHTML = `<p>Error loading image. Please try again.</p>`;
    }
}
// Function to display image and status
function displayData(url, status) {
    if (!container) {
        console.error("Error: container not found!");
        return;
    }
    container.style.display = "block"; 
    container.innerHTML = `
        <img src="${url}" alt="Random Dog" style="width: 100%; max-width: 600px; height: 100%; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <p>Status: ${status}</p>
    `;
}
// Function to save the image and status to the server
async function saveData(url, status) {
    try {
        let response = await fetch("https://gravel-longing-whip.glitch.me/dogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: url, status: status })
        });

        if (!response.ok) {
            throw new Error("Failed to save data");
        }

        console.log("Data saved successfully!");
    } 
    catch (error) {
        console.error("Error:", error);
    }
}
// Automatically fetch and display a new image every 10 seconds
document.addEventListener("DOMContentLoaded", () => {
    randomDog();                     // Initial call
    setInterval(randomDog, 7000);  // Fetch new image every 10 seconds
});

