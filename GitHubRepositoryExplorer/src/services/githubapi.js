import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: import.meta.env.GITHUB_TOKEN
})

// const octokit = new Octokit({ })

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
        return result
    } catch (error) {
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
    }
}

// make teh pagination
export const fetchPerPageRepo = async (page,username)=>{
    const perPage = 10

    const response = await octokit.request("GET /users/{username}/repos", {
        username: username,
        page: page,
        per_page:perPage
    })
    return response
}

