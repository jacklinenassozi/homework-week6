let BaseUrl = "https://api.github.com/search/repositories?q=user:HackYourFuture+";

// creating a request Function
function createRequest(UrlTarget, callBackFunction) {
    const request = new XMLHttpRequest();
    request.open("GET", UrlTarget);
    request.addEventListener("load", () => {
        callBackFunction(JSON.parse(request.responseText));
    });

    return request
}

// HYF Json file
function fetchJsonData(TargetUrl, callBackFunctionForRepositories) {
    let request = createRequest(TargetUrl, callBackFunctionForRepositories);

    request.send();
}


// Contributors_url Json
function fetchContributorsJsonData(contributors, callBackFunctionForcontributors) {
    let request = createRequest(contributors, callBackFunctionForcontributors);

    request.send();
}


//When I Click Thsi function will run
function getHYFRepos() {
    let filteredURL = BaseUrl + getInputValue();

    // Fetch The data and if feched dont fetch again
    fetchJsonData(filteredURL, (responsetoriesJasonData) => {
        showAll_Respoitories(responsetoriesJasonData);
    });
}






// Dom Show All Respoitories
function showAll_Respoitories(repositories) {
    const ulElement = document.querySelector("#repositories");
    ulElement.innerHTML = "";
    repositories.items.forEach(element => {
        const liElement = document.createElement("li");
        const aElement = document.createElement("a");

        aElement.innerHTML = element.name;

        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);

        fetchContributorsJsonData(element.contributors_url, (contributoresJasonData) => {
             liElement.addEventListener("click", () => {
                showAll_Contributors(contributoresJasonData);
            });
        });
    });
};





// Dom Show All Contributors
function showAll_Contributors(contributors) {
    const ulElement = document.querySelector("#contributors");
    ulElement.innerHTML = "";
    
    const DivElement = document.querySelector("div");
    contributors.forEach(element => {
        const liElement = document.createElement("li");
        const h3Element = document.createElement("h3");
        h3Element.innerHTML = element.login;

        const imgElement = document.createElement("img");
        imgElement.src = element.avatar_url;

        liElement.appendChild(imgElement);
        liElement.appendChild(h3Element);

        ulElement.appendChild(liElement);
    });
}





// Search for specific repositories
const searchButton = document.querySelector("#showRepoButton");
searchButton.addEventListener('click', getHYFRepos);

const displayRepos = document.querySelector("#displayRepos");
displayRepos.addEventListener('click', getHYFRepos);

const inputElement = document.querySelector("#search-term");
//input.addEventListener('onkeyup', searchButton);

// Get Inputvalue
function getInputValue() {
    let inputValue = inputElement.value;

    return inputValue;
}