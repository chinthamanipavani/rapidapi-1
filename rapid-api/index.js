
let container=document.getElementById("container")
const url = 'https://silly-cuboid-pear.glitch.me/jobs';
let loader=document.getElementById("loader")

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'fef551e085mshfab2ef896e92915p197abfjsn89da4d2b3393',
		'x-rapidapi-host': 'linkedin-job-search-api.p.rapidapi.com'
	},
};
async function getData(){
    try {
       let response = await fetch(url, options);
        if(!response.ok){
            throw new Error ("error")
        }
        const result = await response.json();
        displayData(result)
        console.log(result);
    } 
    catch (err) {
        console.error(err.message);
    }
}
function displayData(obj){
    container.innerHTML=``
    // console.log(obj)
    obj.forEach(element=>{
        let item=document.createElement("div")
        item.className="item"
        item.innerHTML=`
         <img class="image" src="${element.organization_logo}">
        <p class="title"> <b >JOB TITLE : </b><span>${element.title}</span></p>
        <p> <b>Organization : </b>${element.organization}</p>
        <p> <b>Job-Seniority : </b>${element.seniority}</p>
        <p><b>Date_posted : </b>${element.date_posted}</p>
        <p><b>Date_validthrough : </b>${element.date_validthrough}</p>
        <p class ="description"><b>Description </b><br><br>${element.linkedin_org_description}</p>
        <p><b>Employees : </b>${element.linkedin_org_employees}</p>
        <p><b>Seniority : </b>${element.seniority}</p>
        <p><b>Locations_derived : </b><span>${element.locations_derived[0]}</span><span>${element.locations_derived[1]}</span><span>${element.locations_derived[2]}</span></p>
          <a href="${element.url}">linkedin_link</a><br><br>

         <a href="${element.linkedin_org_url}"> organization-link</a>
        `
        container.appendChild(item)
    })
    loader.remove()
}

window.addEventListener("DOMContentLoaded",function(){
    getData()
})





