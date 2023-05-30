// Div where profile information will appear.
const overview = document.querySelector(".overview")

// GitHub username
const userName = "Nadia982"

// async function to fetch info from GitHub profile
async function fetchUser(){
    const userInfo = await fetch(`https://api.github.com/users/${userName}`)
    console.log(userInfo)
    const data = await userInfo.json();
    console.log(data)
    displayUserInfo(data)
}

fetchUser()

// Fetch & Display User Information
const displayUserInfo = function(data) {
    const div = document.createElement("div")
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt="photo of Natalie Gillam" src=${data.avatar_url} />
    </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> 
    `
    overview.append(div)
}