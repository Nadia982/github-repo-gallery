// select div where profile information will appear.
const overview = document.querySelector(".overview")

// variable for GitHub username
const userName = "Nadia982"

// select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list")

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
    gitRepos()
}

// Fetch Repos
const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${userName}/repos?sort=updated&per_page=100&affiliation=owner`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
  };

  // Display Info About Repos
const displayRepos = function(repos){
for (const repo of repos){
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo")
    repoItem.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(repoItem)
}
}


// Save and view the page. Under your profile information, you should now see your repos beginning with the 
//repo you’ve updated most recently (see screenshot above).
// Add and commit your changes with the command line. 
//Push the changes up to GitHub. Copy the link to your repo and submit it below.