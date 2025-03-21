
let container=document.getElementById("container")
let loader = document.getElementById("loading");
const url = 'https://brassy-local-arrow.glitch.me/movies';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'fef551e085mshfab2ef896e92915p197abfjsn89da4d2b3393',
		'x-rapidapi-host': 'imdb-top-1000-movies-series.p.rapidapi.com',
		'Content-Type': 'application/x-www-form-urlencoded'
	},
};

async function getdata(){
    loader.style.display = "block"; 
    try {
        let response = await fetch(url, options);
        if(!response.ok){
            throw new Error("Invalid or failed to fetch", response.status);
        }
       let result = await response.json();
       displayData(result)
        console.log(result);
        
    } catch (err) {
        console.error(err.message);
    }
    finally {
        // loader.style.display = "none";  // Hide the spinner
    }
}
async function displayData(obj){
    console.log(obj)
    container.innerHTML="";
    
   obj.forEach(element=>{
        let item=document.createElement("div")
        item.className="item"
        item.innerHTML=`
        <img src="${element.Poster_Link}">
        <h2><b>${element.Series_Title}</b></h2>
        <p>${element.Genre}</p>
        `
        container.appendChild(item)
    })
}
window.addEventListener("DOMContentLoaded",function(){
    getdata()
})





