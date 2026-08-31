import { useCallback } from "react";
import { showAllRepo, fetchPerPageRepo, getAllCommits } from "../services/githubapi";

export function useGithubApi() {
    const getRepos = useCallback(async () => {
        try {
            const res = await showAllRepo()
            if (res.status != 200) throw new Error("Fail to fetch data")
            const arr = res.data.map((elem) => elem.name)
            return arr
        } catch (error) {
            console.log(`Error! Status: ${err?.status}. Message: ${err?.response?.data?.message || err.message}`)
            return []
        }
    }, [])

    const getPerPageRepo = async (page, username) => {
        try {
            const res = await fetchPerPageRepo(page, username)
            const arr = res.data.map((elem) => elem.name)
            return arr
        } catch (error) {
            console.log(`Error! ${error.message}`)
        }
    }
    return { getRepos, getPerPageRepo }
}

// export async function userAndCommits() {
//     const commitsData = await getAllCommits("saurabhkumar96","MyResumeProject")

//     const commits = commitsData.map((res)=>{
//         return res.commit.message
//     })
//     const commitsAuthor = commitsData.map((res)=>{
//         return {
//             name:res.commit.author.name, 
//             email: res.commit.author.email, 
//             date: res.commit.author.date
//         }
//     })
//     const committerData = commitsData.map((res)=>{
//         return {
//             avtarURL: res.committer.avatar_url,
//             htmlsURL: res.committer.html_url,

//         }
//     })
//     const committerNode = commitsData.map((res)=>{
//         return res.sha
//     })
//     const avtar = commitsData[0].author.avatar_url
//     const githubLink = commitsData[0].author.html_url

//     return {commits,commitsAuthor,avtar,githubLink,committerData,committerNode}

// }


export async function userAndCommits(owner, repo) {
    const commitsData = await getAllCommits(owner, repo);

    const commits = commitsData.map((res) => res.commit?.message || "");

    const commitsAuthor = commitsData.map((res) => ({
        name: res.commit?.author?.name || "",
        email: res.commit?.author?.email || "",
        date: res.commit?.author?.date || "",
    }));

    const committerData = commitsData.map((res) => ({
        avatarURL: res.committer?.avatar_url || "",
        htmlURL: res.committer?.html_url || "",
    }));

    const committerNode = commitsData.map((res) => res.sha);

    const firstCommit = commitsData[0];

    const avatar = firstCommit?.author?.avatar_url || "";
    const githubLink = firstCommit?.author?.html_url || "";

    return {
        commits,
        commitsAuthor,
        avatar,
        githubLink,
        committerData,
        committerNode,
    };
}

