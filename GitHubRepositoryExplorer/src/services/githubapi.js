import { Octokit } from "octokit";
export async function octoapi() {
    const octokit = new Octokit({
        auth: import.meta.env.GITHUB_TOKEN
    })

    try {
        const result = await octokit.request("GET /repos/{owner}/{repo}/languages", {
            owner: "saurabhkumar96",
            repo: "mini_project",
        });

        // const titleAndAuthor = result.data.map(issue => { title: issue.title, authorID: issue.user.id })

        console.log(result)

    } catch (error) {
        console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
    }

}   