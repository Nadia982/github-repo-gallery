// select div where profile information will appear.
const overview = document.querySelector(".overview");

// variable for GitHub username
const userName = "Nadia982";

// select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

//selects the section with the class “repos” where the repo information appears.
const reposContainer = document.querySelector(".repos");

//selects the section with the class  “repo-data” where individual repo data will appear.
const repoData = document.querySelector(".repo-data");

//selects the "Back to Repo Gallery" button.
const backToRepoGallery = document.querySelector(".view-repos")

// selects the input with the “Search by name” placeholder
const searchByName = document.querySelector(".filter-repos")

// async function to fetch info from GitHub profile
async function fetchUser() {
  const userInfo = await fetch(`https://api.github.com/users/${userName}`);
  console.log(userInfo);
  const data = await userInfo.json();
  console.log(data);
  displayUserInfo(data);
}

fetchUser();

// Fetch and display user's information
const displayUserInfo = function (data) {
  const div = document.createElement("div");
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
    `;
  overview.append(div);
  gitRepos();
};

// Fetch Repos
const gitRepos = async function () {
  const fetchRepos = await fetch(
    `https://api.github.com/users/${userName}/repos?sort=updated&per_page=100`
  );
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

// Display all repos
const displayRepos = function (repos) {
  searchByName.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `
    <h3>${repo.name}</h3>
    <p>${repo.description}</p>
    `;
    repoList.append(repoItem);
  }
};

//Add event listener to output name of repo clicked on
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

// Create a function to get specific repo information
const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(
    `https://api.github.com/repos/${userName}/${repoName}`
  );
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);

  // Create an array of languages used
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);
  displayRepoInfo(repoInfo, languages);
};

// Display individual repo info 
const displayRepoInfo = function (repoInfo, languages) {
  backToRepoGallery.classList.remove("hide")
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  reposContainer.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};

// Add a click event to the back button
backToRepoGallery.addEventListener("click", function(){
  reposContainer.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepoGallery.classList.add("hide");
})
 
////selects the "Back to Repo Gallery" button.
// const backToRepoGallery = document.querySelector(".view-repos")

// selects the input with the “Search by name” placeholder
// const searchByName = document.querySelector(".filter-repos")

// Add an Input Event to the Search Box
searchByName.addEventListener("input", function(e){
  const searchTextValue = e.target.value;
  console.log(searchTextValue)
  const repos = document.querySelectorAll(".repo")
  const lowercaseSearchTextValue = searchTextValue.toLowerCase()
  for (const repo of repos){
    const lowercaseRepoText = repo.innerText.toLowerCase();
    if(lowercaseRepoText.includes(lowercaseSearchTextValue)){
      repo.classList.remove("hide")      
    } else {
      repo.classList.add("hide")
    }
  }
})