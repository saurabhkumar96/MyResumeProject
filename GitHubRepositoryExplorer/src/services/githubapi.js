import { Octokit } from "octokit";




const octokit = new Octokit({
    // auth: import.meta.env.VITE_GITHUB_TOKEN
})



// not using this function
export const languageUse = async () => {
    try {
        const result = await octokit.request("GET /repos/{owner}/{repo}", {
            owner: "saurabhkumar96",
            repo: "mini_project",
        });
        console.log(result)
    } catch (error) {
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
    }
}


export const showAllRepo = async () => {
    try {
        const result = await octokit.request("GET /users/{username}/repos", {
            username: "saurabhkumar96",
        })
        return result.data
    } catch (error) {
        console.log(`Error! Status: ${error.status}`)
        return []
    }
}

/*
    I am using this for find the languages use by all repo
*/
export const showAllRepoLanugage = async () => {
    try {
        let repos = await showAllRepo()
        const allLanguage = repos.map((repo) => repo.language)
        const language = allLanguage.filter((item, index, array) => array.indexOf(item) === index)
        let withoutnullLanguage = []
        for (const element of language) {
            if (element != null) {
                withoutnullLanguage.push(element)
            }
        }
        // console.log(withoutnullLanguage)
        return withoutnullLanguage
    } catch (error) {
        console.log(`something is error -> ${error.message}`)
        return new Set()
    }
}

// make teh pagination
export const fetchPerPageRepo = async (page, username) => {
    const perPage = 10

    const response = await octokit.request("GET /users/{username}/repos", {
        username: username,
        page: page,
        per_page: perPage,
        sort: "stars",
    })
    return response
}

// search language repo
export const searchRepoLanguage = async (owner, repoName) => {
    try {
        const result = await octokit.request("GET /repos/{owner}/{repo}/languages", {
            owner: owner,
            repo: repoName,
        });
        // console.log(result.data)
        return result.data;
    } catch (error) {
        console.error(`Error! Status: ${error.status}`);
        return {};
    }
}



export async function searchRepositoriesLanguage(language) {
    try {
        const response = await octokit.search.repos({
            // "q" contains your search terms and qualifiers like "language"
            q: `language:${language}`,
            sort: "stars",
            order: "desc",
        });
        console.log(`Found ${response.data.total_count} repositories.`);

        const repos = response.data.items.map(repo => {
            console.log(`${repo.full_name} - ⭐ ${repo.stargazers_count}`);
            return repo.full_name
        });
        console.log(repos)
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}


    export async function getAllCommits(owner, repo) {
    try {
        // octokit.paginate automatically requests all pages until no more items are found
        const allCommits = await octokit.paginate(octokit.rest.repos.listCommits, {
            owner: owner,
            repo: repo,
            per_page: 100, // Maximizes performance by pulling 100 items per request
        });

        // console.log(`Total commits fetched: ${allCommits.length}`);
        // console.log(allCommits[0].commit.message)
        // console.log(allCommits)
        return allCommits;
    } catch (error) {
        console.error("Error fetching commits:", error);
    }
}

// export const waitForRateLimit = async () => {
//     const { data } = await

//     const remaining = data.rate.remaining;
//     const resetTime = data.rate.reset * 1000;

//     console.log("Remaining requests:", remaining);

//     if (remaining <= 1) {
//         const waitTime = resetTime - Date.now();

//         console.log(
//             `Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)} seconds...`
//         );

//         await new Promise((resolve) =>
//             setTimeout(resolve, waitTime + 1000)
//         );
//     }
// };
