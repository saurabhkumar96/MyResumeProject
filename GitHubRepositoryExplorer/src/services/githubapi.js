import { Octokit } from "@octokit/rest";
// import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    // auth: import.meta.env.VITE_GITHUB_TOKEN
})




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

// not using this function 
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
export const showAllRepoLanugage = async ()=>{
    try {
        let repoNames = await showAllRepo()
        let repoLanguageArray = []
        for(let i=0; i<repoNames.length; i++){
            await waitForRateLimit()
            const name = repoNames[i].name
            const res = await searchRepoLanguage(name)
            let languageKey = Object.keys(res)
            repoLanguageArray.push(...languageKey)
        }
        const languageSet = new Set(repoLanguageArray)
        console.log(languageSet)
        return languageSet
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
export const searchRepoLanguage = async (repoName) => {
    try {
        const result = await octokit.request("GET /users/{username}/repos", {
            username: "saurabhkumar96",
        });

        return result.data;
    } catch (error) {
        console.error(`Error! Status: ${error.status}`);
        return [];
    }
}



export async function searchRepositoriesLanguage(language) {
    try {
        const response = await octokit.rest.search.repos({
            // "q" contains your search terms and qualifiers like "language"
            q: `language:${language}`,
            sort: "stars",
            order: "desc",
        });
        console.log(`Found ${response.data.total_count} repositories.`);

        return response.data.items.map(repo => {
            // console.log(`${repo.full_name} - ⭐ ${repo.stargazers_count}`);
            return repo.full_name
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const waitForRateLimit = async () => {
    const { data } = await octokit.rateLimit.get();

    const remaining = data.rate.remaining;
    const resetTime = data.rate.reset * 1000;

    console.log("Remaining requests:", remaining);

    if (remaining <= 1) {
        const waitTime = resetTime - Date.now();

        console.log(
            `Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)} seconds...`
        );

        await new Promise((resolve) =>
            setTimeout(resolve, waitTime + 1000)
        );
    }
};
