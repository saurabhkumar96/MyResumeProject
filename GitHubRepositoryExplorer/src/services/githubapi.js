import { Octokit } from "@octokit/rest";
// import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: import.meta.env.GITHUB_TOKEN
})


export async function checkRateLimit() {
    const { data } = await octokit.rateLimit.get();
    console.log(data.rate);
}



export const languageUse = async () => {
    try {
        const result = await octokit.request("GET /repos/{owner}/{repo}", {
            owner: "saurabhkumar96",
            repo: "mini_project",
        });
        // console.log(result)
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
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
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
    const response = await octokit.rest.repos.listLanguages({
        owner: "saurabhkumar96",
        repo: repoName,
    });
    return response
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
