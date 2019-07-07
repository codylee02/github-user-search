function displayRepoList(repoHTMLStr) {
    //put in the makeRepoHTML into the DOM
    $(".results").html(repoHTMLStr);
}

function clearResultsAndForm() {
    //clear form and results from the DOM
    $(".results").html("");
    $("#js-username").val("");
}

function makeRepoHTML(responseJson) {
    //make the HTML for each item in the repo list
    //reponame : responseJson[i].name
    //repoURL : responseJson[i].url
    let repoHTMLStr = responseJson.reduce((acc, m) => `${acc} <div class="repos">${m.name} : <a href="${m.url}">${m.url}</a></div>`, '');
    displayRepoList(repoHTMLStr);
}


function getRepoList(userName) {
    //get repo list from GitHub
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => makeRepoHTML(responseJson))
        
        .catch(err => {
            $('.results').text(`Something went wrong: ${err.message}`);
        });
    }

function watchForm() {
    //listen for submit button click
    $("form").submit (e => {
        e.preventDefault();
        const userName = $("#js-username").val();
        clearResultsAndForm();
        getRepoList(userName);
    });
    
}

$(watchForm);