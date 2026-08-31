// import { useParams } from "react-router";
// import { searchRepoLanguage } from "../services/githubapi";
// import { useEffect, useState } from "react";
// import { userAndCommits } from "../hooks/useFetch";


// const RepositoryDetail = () => {
//   const { repoLanguage } = useParams();
//   const [language, setLanguage] = useState([])
//   const [error, setError] = useState("");
//   const [commitdata, setCommitsData] = useState({
//     commits: [],
//     commitsAuthor: [],
//     avtar: "",
//     githubLink: "",
//     committerData: [],
//     committerNode: [],
//   })

//   /*
//   I took this approach from the chatGPT
//     const [language, setLanguage] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         setLoading(true);
//         setError("");
  
//         const res = await searchRepoLanguage(repoLanguage);
//         const keys = Object.keys(res);
  
//         if (keys.length === 0) {
//           throw new Error("No languages found");
//         }
  
//         setLanguage(keys);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchLanguages();
//   }, [repoLanguage]);
//   */

//   useEffect(() => {
//     const committerDetail = async () => {
//       const {
//         commits,
//         commitsAuthor,
//         avtar,
//         githubLink,
//         committerData,
//         committerNode,
//       } = await userAndCommits();

//       console.log(commits);
//       console.log(commitsAuthor);
//       console.log(avtar);
//       console.log(githubLink);
//       console.log(committerData);
//       console.log(committerNode);

//       setCommitsData({
//         commits: commits,
//         commitsAuthor: commitsAuthor,
//         avtar: avtar,
//         githubLink: githubLink,
//         committerData: committerData,
//         committerNode: committerNode,
//       });
//     };

//     committerDetail();
//   }, []);


//   useEffect(() => {
//     const owner = localStorage.getItem("githubUsername")
//     searchRepoLanguage(owner, "ellocent_labs")
//       .then((res) => {
//         const keys = Object.keys(res);
//         if (keys.length > 0) {
//           setLanguage(keys)
//           setError("")
//         }
//         else {
//           throw new Error("language is not present")
//         }
//       })
//       .catch((err) => setError(err.message))
//   }, [repoLanguage])

//   if (error) {
//     return (
//       <div>{error}</div>
//     )
//   }
//   return (
//     <div>
//       {/* <h2>Repository Detail - {typeof(language)}</h2> */}

//       <div>
//         {language.map((lang, index) => {
//           return (
//             <div key={index}>
//               {lang}
//             </div>
//           )
//         })}
//       </div>
//       {/* commits work */}
//       {
//         <div>
//           <div id="commits">
//             {
//               commitdata.commits.map((res)=>{
//                 return(
//                   <p>{res}</p>
//                 )
//               })
//             }
//           </div>
//           <div id="commitsAuthor">
//             {
//               commitdata.commitsAuthor.map((res)=>{
//                 return(
//                   <p>{res}</p>
//                 )
//               })
//             }
//           </div>
//           <div id="avtar">
//             {
//               <img src={`${commitdata.avtar}`} alt="avtar-image" />
//             }
//           </div>
//           <div id="githubLink">
//             {
//               <a href={`${commitdata.githubLink}`}></a>
//             }
//           </div>
//           <div id="committerData">
//             {
//               commitdata.committerData.map((res)=>{
//                 return(
//                   <div>
//                     {res}
//                   </div>
//                 )
//               })
//             }
//           </div>
//           <div id="committerNode">
//             {
//               commitdata.committerNode.map((res)=>{
//                 return(
//                   <div>
//                     {res}
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </div>
//       }
//     </div>
//   );
// };

// export default RepositoryDetail;







// import { useParams, Link } from "react-router";
// import { useEffect, useState } from "react";

// import {
//   Box,
//   Card,
//   CardContent,
//   Chip,
//   Typography,
//   Avatar,
//   Button,
//   CircularProgress,
//   Alert,
//   Divider,
// } from "@mui/material";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import CommitIcon from "@mui/icons-material/Commit";
// import CodeIcon from "@mui/icons-material/Code";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// import { searchRepoLanguage } from "../services/githubapi";
// import { userAndCommits } from "../hooks/useFetch";

// const RepositoryDetail = () => {
//   const { repoLanguage } = useParams();

//   const [language, setLanguage] = useState([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   const [commitdata, setCommitsData] = useState({
//     commits: [],
//     commitsAuthor: [],
//     avatar: "",
//     githubLink: "",
//     committerData: [],
//     committerNode: [],
//   });

//   // Fetch repository languages
//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         setError("");

//         const owner = localStorage.getItem("githubUsername");

//         if (!owner) {
//           throw new Error("GitHub username not found");
//         }

//         if (!repoLanguage) {
//           throw new Error("Repository name not found");
//         }

//         const res = await searchRepoLanguage(owner, repoLanguage);

//         const keys = Object.keys(res || {});

//         setLanguage(keys);
//       } catch (err) {
//         setLanguage([]);
//         setError(err.message || "Something went wrong");
//       }
//     };

//     fetchLanguages();
//   }, [repoLanguage]);

//   // Fetch commits
//   useEffect(() => {
//     const fetchCommits = async () => {
//       try {
//         setIsLoading(true);

//         const owner = localStorage.getItem("githubUsername");

//         if (!owner) {
//           throw new Error("GitHub username not found");
//         }

//         if (!repoLanguage) {
//           throw new Error("Repository name not found");
//         }

//         const data = await userAndCommits(owner, repoLanguage);

//         setCommitsData(data);
//       } catch (err) {
//         setError(err.message || "Failed to fetch commits");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCommits();
//   }, [repoLanguage]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center gap-4">
//         <CircularProgress />

//         <p className="text-gray-400">
//           Loading repository details...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4">
//         <Alert severity="error" className="max-w-md w-full">
//           {error}
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-white px-4 py-8">

//       <div className="max-w-7xl mx-auto">

//         {/* Back Button */}

//         <Link to="/">
//           <Button
//             variant="outlined"
//             color="inherit"
//             startIcon={<ArrowBackIcon />}
//             sx={{ marginBottom: 4 }}
//           >
//             Back to Repositories
//           </Button>
//         </Link>


//         {/* Repository Header */}

//         <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 mb-8 shadow-xl">

//           <div className="flex flex-col md:flex-row justify-between gap-6">

//             <div>

//               <div className="flex items-center gap-3 mb-3">

//                 <div className="bg-blue-500/10 p-3 rounded-xl">
//                   <GitHubIcon
//                     sx={{
//                       fontSize: 35,
//                       color: "#60a5fa",
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <Typography
//                     variant="h4"
//                     fontWeight="bold"
//                   >
//                     {repoLanguage}
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     sx={{ color: "#94a3b8" }}
//                   >
//                     Repository Details
//                   </Typography>
//                 </div>

//               </div>

//             </div>


//             {/* Author */}

//             {commitdata.avatar && (

//               <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-700">

//                 <Avatar
//                   src={commitdata.avatar}
//                   alt="GitHub Author"
//                   sx={{
//                     width: 60,
//                     height: 60,
//                   }}
//                 />

//                 <div>

//                   <Typography fontWeight="bold">
//                     Repository Author
//                   </Typography>

//                   {commitdata.githubLink && (

//                     <a
//                       href={commitdata.githubLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1 mt-1"
//                     >
//                       View GitHub Profile
//                       <OpenInNewIcon fontSize="small" />
//                     </a>

//                   )}

//                 </div>

//               </div>

//             )}

//           </div>

//         </div>


//         {/* Stats */}

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

//           <Card
//             sx={{
//               backgroundColor: "#0f172a",
//               color: "white",
//               border: "1px solid #1e293b",
//               borderRadius: 3,
//             }}
//           >
//             <CardContent>

//               <Typography
//                 sx={{ color: "#94a3b8" }}
//               >
//                 Total Commits
//               </Typography>

//               <Typography
//                 variant="h4"
//                 fontWeight="bold"
//               >
//                 {commitdata.commits.length}
//               </Typography>

//             </CardContent>
//           </Card>


//           <Card
//             sx={{
//               backgroundColor: "#0f172a",
//               color: "white",
//               border: "1px solid #1e293b",
//               borderRadius: 3,
//             }}
//           >
//             <CardContent>

//               <Typography
//                 sx={{ color: "#94a3b8" }}
//               >
//                 Languages
//               </Typography>

//               <Typography
//                 variant="h4"
//                 fontWeight="bold"
//               >
//                 {language.length}
//               </Typography>

//             </CardContent>
//           </Card>


//           <Card
//             sx={{
//               backgroundColor: "#0f172a",
//               color: "white",
//               border: "1px solid #1e293b",
//               borderRadius: 3,
//             }}
//           >
//             <CardContent>

//               <Typography
//                 sx={{ color: "#94a3b8" }}
//               >
//                 Committers
//               </Typography>

//               <Typography
//                 variant="h4"
//                 fontWeight="bold"
//               >
//                 {commitdata.committerData.length}
//               </Typography>

//             </CardContent>
//           </Card>

//         </div>


//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


//           {/* Left Section */}

//           <div className="lg:col-span-2 space-y-8">


//             {/* Languages */}

//             <Card
//               sx={{
//                 backgroundColor: "#0f172a",
//                 color: "white",
//                 border: "1px solid #1e293b",
//                 borderRadius: 3,
//               }}
//             >

//               <CardContent>

//                 <div className="flex items-center gap-2 mb-5">

//                   <CodeIcon color="primary" />

//                   <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                   >
//                     Languages
//                   </Typography>

//                 </div>


//                 {language.length > 0 ? (

//                   <div className="flex flex-wrap gap-3">

//                     {language.map((lang) => (

//                       <Chip
//                         key={lang}
//                         label={lang}
//                         color="primary"
//                         variant="outlined"
//                       />

//                     ))}

//                   </div>

//                 ) : (

//                   <Typography
//                     sx={{ color: "#94a3b8" }}
//                   >
//                     No languages found.
//                   </Typography>

//                 )}

//               </CardContent>

//             </Card>


//             {/* Commit History */}

//             <Card
//               sx={{
//                 backgroundColor: "#0f172a",
//                 color: "white",
//                 border: "1px solid #1e293b",
//                 borderRadius: 3,
//               }}
//             >

//               <CardContent>

//                 <div className="flex items-center gap-2 mb-5">

//                   <CommitIcon color="primary" />

//                   <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                   >
//                     Commit History
//                   </Typography>

//                 </div>


//                 {commitdata.commits.length > 0 ? (

//                   <div className="space-y-4">

//                     {commitdata.commits.map(
//                       (commit, index) => (

//                         <div
//                           key={
//                             commitdata.committerNode[index] ||
//                             index
//                           }
//                           className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition"
//                         >

//                           <div className="flex justify-between gap-4 flex-col md:flex-row">

//                             <div>

//                               <Typography
//                                 fontWeight="600"
//                               >
//                                 {commit}
//                               </Typography>


//                               {commitdata.committerNode[index] && (

//                                 <Typography
//                                   variant="caption"
//                                   sx={{
//                                     color: "#64748b",
//                                     fontFamily: "monospace",
//                                   }}
//                                 >

//                                   SHA:{" "}
//                                   {commitdata.committerNode[
//                                     index
//                                   ].slice(0, 12)}

//                                 </Typography>

//                               )}

//                             </div>

//                           </div>

//                         </div>

//                       )
//                     )}

//                   </div>

//                 ) : (

//                   <Typography
//                     sx={{ color: "#94a3b8" }}
//                   >
//                     No commits found.
//                   </Typography>

//                 )}

//               </CardContent>

//             </Card>


//             {/* Commit Authors */}

//             <Card
//               sx={{
//                 backgroundColor: "#0f172a",
//                 color: "white",
//                 border: "1px solid #1e293b",
//                 borderRadius: 3,
//               }}
//             >

//               <CardContent>

//                 <div className="flex items-center gap-2 mb-5">

//                   <PersonIcon color="primary" />

//                   <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                   >
//                     Commit Authors
//                   </Typography>

//                 </div>


//                 <div className="space-y-4">

//                   {commitdata.commitsAuthor.map(
//                     (author, index) => (

//                       <div
//                         key={
//                           commitdata.committerNode[index] ||
//                           index
//                         }
//                         className="bg-slate-900 border border-slate-800 rounded-xl p-5"
//                       >

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//                           {/* Name */}

//                           <div>

//                             <div className="flex items-center gap-2 text-gray-400 text-sm">

//                               <PersonIcon fontSize="small" />

//                               Name

//                             </div>

//                             <p className="font-semibold mt-1">

//                               {author.name}

//                             </p>

//                           </div>


//                           {/* Email */}

//                           <div>

//                             <div className="flex items-center gap-2 text-gray-400 text-sm">

//                               <EmailIcon fontSize="small" />

//                               Email

//                             </div>

//                             <p className="font-semibold mt-1 break-all">

//                               {author.email}

//                             </p>

//                           </div>


//                           {/* Date */}

//                           <div>

//                             <div className="flex items-center gap-2 text-gray-400 text-sm">

//                               <CalendarTodayIcon fontSize="small" />

//                               Date

//                             </div>

//                             <p className="font-semibold mt-1">

//                               {author.date
//                                 ? new Date(
//                                     author.date
//                                   ).toLocaleDateString()
//                                 : "Unknown"}

//                             </p>

//                           </div>

//                         </div>

//                       </div>

//                     )
//                   )}

//                 </div>

//               </CardContent>

//             </Card>

//           </div>


//           {/* Right Sidebar */}

//           <div className="space-y-8">


//             {/* Committers */}

//             <Card
//               sx={{
//                 backgroundColor: "#0f172a",
//                 color: "white",
//                 border: "1px solid #1e293b",
//                 borderRadius: 3,
//               }}
//             >

//               <CardContent>

//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   mb={3}
//                 >
//                   Committers
//                 </Typography>


//                 <div className="space-y-4">

//                   {commitdata.committerData.length > 0 ? (

//                     commitdata.committerData.map(
//                       (committer, index) => (

//                         <div
//                           key={
//                             commitdata.committerNode[index] ||
//                             index
//                           }
//                           className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl"
//                         >

//                           <Avatar
//                             src={committer.avatarURL}
//                             alt="Committer"
//                           />

//                           <div>

//                             <Typography
//                               fontSize="14px"
//                               fontWeight="bold"
//                             >
//                               Committer
//                             </Typography>


//                             {committer.htmlURL && (

//                               <a
//                                 href={committer.htmlURL}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-400 text-xs hover:text-blue-300"
//                               >
//                                 View Profile
//                               </a>

//                             )}

//                           </div>

//                         </div>

//                       )
//                     )

//                   ) : (

//                     <Typography
//                       sx={{
//                         color: "#94a3b8",
//                       }}
//                     >
//                       No committer information.
//                     </Typography>

//                   )}

//                 </div>

//               </CardContent>

//             </Card>


//             {/* Repository Information */}

//             <Card
//               sx={{
//                 backgroundColor: "#0f172a",
//                 color: "white",
//                 border: "1px solid #1e293b",
//                 borderRadius: 3,
//               }}
//             >

//               <CardContent>

//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   mb={2}
//                 >
//                   Repository Information
//                 </Typography>

//                 <Divider
//                   sx={{
//                     backgroundColor: "#334155",
//                     marginBottom: 2,
//                   }}
//                 />

//                 <div className="space-y-3 text-sm">

//                   <div className="flex justify-between">

//                     <span className="text-gray-400">
//                       Repository
//                     </span>

//                     <span className="font-semibold">
//                       {repoLanguage}
//                     </span>

//                   </div>


//                   <div className="flex justify-between">

//                     <span className="text-gray-400">
//                       Commits
//                     </span>

//                     <span className="font-semibold">
//                       {commitdata.commits.length}
//                     </span>

//                   </div>


//                   <div className="flex justify-between">

//                     <span className="text-gray-400">
//                       Languages
//                     </span>

//                     <span className="font-semibold">
//                       {language.length}
//                     </span>

//                   </div>

//                 </div>

//               </CardContent>

//             </Card>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default RepositoryDetail;










import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Chip,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import CommitIcon from "@mui/icons-material/Commit";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { searchRepoLanguage } from "../services/githubapi";
import { userAndCommits } from "../hooks/useFetch";

const RepositoryDetail = () => {
  const { repoLanguage } = useParams();

  const [language, setLanguage] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [commitdata, setCommitsData] = useState({
    commits: [],
    commitsAuthor: [],
    avatar: "",
    githubLink: "",
    committerData: [],
    committerNode: [],
  });

  // Fetch repository languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setError("");

        const owner = localStorage.getItem("githubUsername");

        if (!owner) {
          throw new Error("GitHub username not found");
        }

        if (!repoLanguage) {
          throw new Error("Repository name not found");
        }

        const res = await searchRepoLanguage(owner, repoLanguage);

        const keys = Object.keys(res || {});

        setLanguage(keys);
      } catch (err) {
        setLanguage([]);
        setError(err.message || "Something went wrong");
      }
    };

    fetchLanguages();
  }, [repoLanguage]);


  // Fetch commits
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setIsLoading(true);

        const owner = localStorage.getItem("githubUsername");

        if (!owner) {
          throw new Error("GitHub username not found");
        }

        if (!repoLanguage) {
          throw new Error("Repository name not found");
        }

        const data = await userAndCommits(owner, repoLanguage);

        setCommitsData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch commits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommits();
  }, [repoLanguage]);


  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center gap-4">
        <CircularProgress />

        <p className="text-gray-400">
          Loading repository details...
        </p>
      </div>
    );
  }


  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4">
        <Alert severity="error" className="max-w-md w-full">
          {error}
        </Alert>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">

      <div className="max-w-7xl mx-auto">


        {/* Back Button */}
        <Link to="/">
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ArrowBackIcon />}
            sx={{ marginBottom: 4 }}
          >
            Back to Repositories
          </Button>
        </Link>


        {/* Repository Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 mb-8 shadow-xl">

          <div className="flex flex-col md:flex-row justify-between gap-6">

            <div>

              <div className="flex items-center gap-3">

                <div className="bg-blue-500/10 p-3 rounded-xl">
                  <GitHubIcon
                    sx={{
                      fontSize: 35,
                      color: "#60a5fa",
                    }}
                  />
                </div>


                <div>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                  >
                    {repoLanguage}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#94a3b8",
                      marginTop: 0.5,
                    }}
                  >
                    Repository Details
                  </Typography>
                </div>

              </div>

            </div>


            {/* Repository Author */}
            {commitdata.avatar && (

              <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-700">

                <Avatar
                  src={commitdata.avatar}
                  alt="GitHub Author"
                  sx={{
                    width: 60,
                    height: 60,
                  }}
                />


                <div>

                  <Typography fontWeight="bold">
                    Repository Author
                  </Typography>


                  {commitdata.githubLink && (

                    <a
                      href={commitdata.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1 mt-1"
                    >
                      View GitHub Profile

                      <OpenInNewIcon fontSize="small" />
                    </a>

                  )}

                </div>

              </div>

            )}

          </div>

        </div>


        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">


          {/* Total Commits */}
          <Card
            sx={{
              backgroundColor: "#0f172a",
              color: "white",
              border: "1px solid #1e293b",
              borderRadius: 3,
            }}
          >

            <CardContent>

              <Typography
                sx={{
                  color: "#94a3b8",
                }}
              >
                Total Commits
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {commitdata.commits.length}
              </Typography>

            </CardContent>

          </Card>


          {/* Languages */}
          <Card
            sx={{
              backgroundColor: "#0f172a",
              color: "white",
              border: "1px solid #1e293b",
              borderRadius: 3,
            }}
          >

            <CardContent>

              <Typography
                sx={{
                  color: "#94a3b8",
                }}
              >
                Languages
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {language.length}
              </Typography>

            </CardContent>

          </Card>


          {/* Committers */}
          <Card
            sx={{
              backgroundColor: "#0f172a",
              color: "white",
              border: "1px solid #1e293b",
              borderRadius: 3,
            }}
          >

            <CardContent>

              <Typography
                sx={{
                  color: "#94a3b8",
                }}
              >
                Committers
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {commitdata.committerData.length}
              </Typography>

            </CardContent>

          </Card>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">


            {/* Languages */}
            <Card
              sx={{
                backgroundColor: "#0f172a",
                color: "white",
                border: "1px solid #1e293b",
                borderRadius: 3,
              }}
            >

              <CardContent>

                <div className="flex items-center gap-2 mb-5">

                  <CodeIcon color="primary" />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Languages
                  </Typography>

                </div>


                {language.length > 0 ? (

                  <div className="flex flex-wrap gap-3">

                    {language.map((lang) => (

                      <Chip
                        key={lang}
                        label={lang}
                        color="primary"
                        variant="outlined"
                      />

                    ))}

                  </div>

                ) : (

                  <Typography
                    sx={{
                      color: "#94a3b8",
                    }}
                  >
                    No languages found.
                  </Typography>

                )}

              </CardContent>

            </Card>


            {/* ============================= */}
            {/* COMMIT HISTORY WITH AUTHORS */}
            {/* ============================= */}

            <Card
              sx={{
                backgroundColor: "#0f172a",
                color: "white",
                border: "1px solid #1e293b",
                borderRadius: 3,
              }}
            >

              <CardContent>


                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                  <div className="flex items-center gap-3">

                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <CommitIcon color="primary" />
                    </div>


                    <div>

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        Commit History
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#94a3b8",
                        }}
                      >
                        {commitdata.commits.length} commits found
                      </Typography>

                    </div>

                  </div>

                </div>


                {/* Commit List */}
                {commitdata.commits.length > 0 ? (

                  <div className="relative">

                    {commitdata.commits.map(
                      (commit, index) => {

                        const author =
                          commitdata.commitsAuthor[index];

                        const committer =
                          commitdata.committerData[index];

                        const sha =
                          commitdata.committerNode[index];


                        return (

                          <div
                            key={sha || index}
                            className="relative pb-8 last:pb-0"
                          >


                            {/* Timeline Line */}
                            {index !==
                              commitdata.commits.length - 1 && (

                              <div className="absolute left-5 top-12 bottom-0 w-px bg-slate-700" />

                            )}


                            <div className="flex gap-4">


                              {/* Timeline Icon */}
                              <div className="relative z-10 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">

                                <CommitIcon
                                  sx={{
                                    fontSize: 20,
                                  }}
                                />

                              </div>


                              {/* Commit Card */}
                              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 hover:bg-slate-800 transition duration-200">


                                {/* Commit Message + SHA */}
                                <div className="flex justify-between gap-4 flex-col md:flex-row">

                                  <div className="flex-1">

                                    <Typography
                                      fontWeight="600"
                                      fontSize="17px"
                                      sx={{
                                        wordBreak: "break-word",
                                      }}
                                    >
                                      {commit}
                                    </Typography>

                                  </div>


                                  {sha && (

                                    <div className="shrink-0">

                                      <span className="bg-slate-950 border border-slate-700 px-3 py-1 rounded-md text-xs font-mono text-blue-400">

                                        {sha.slice(0, 8)}

                                      </span>

                                    </div>

                                  )}

                                </div>


                                {/* Divider */}
                                <div className="border-t border-slate-800 my-5" />


                                {/* Author Information */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">


                                  {/* Author Profile */}
                                  <div className="flex items-center gap-3">


                                    {committer?.avatarURL ? (

                                      <Avatar
                                        src={committer.avatarURL}
                                        alt={
                                          author?.name ||
                                          "Author"
                                        }
                                        sx={{
                                          width: 45,
                                          height: 45,
                                        }}
                                      />

                                    ) : (

                                      <Avatar
                                        sx={{
                                          width: 45,
                                          height: 45,
                                          backgroundColor:
                                            "#2563eb",
                                        }}
                                      >

                                        {author?.name?.charAt(
                                          0
                                        ) || "U"}

                                      </Avatar>

                                    )}


                                    <div>

                                      <Typography
                                        fontWeight="bold"
                                        fontSize="14px"
                                      >

                                        {author?.name ||
                                          "Unknown Author"}

                                      </Typography>


                                      {author?.email && (

                                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">

                                          <EmailIcon
                                            sx={{
                                              fontSize: 14,
                                            }}
                                          />

                                          {author.email}

                                        </div>

                                      )}

                                    </div>

                                  </div>


                                  {/* Date + Profile */}
                                  <div className="flex flex-col items-start md:items-end gap-2">


                                    {author?.date && (

                                      <div className="flex items-center gap-2 text-gray-400 text-xs">

                                        <CalendarTodayIcon
                                          sx={{
                                            fontSize: 14,
                                          }}
                                        />

                                        {new Date(
                                          author.date
                                        ).toLocaleString()}

                                      </div>

                                    )}


                                    {committer?.htmlURL && (

                                      <a
                                        href={
                                          committer.htmlURL
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
                                      >

                                        View Profile

                                        <OpenInNewIcon
                                          sx={{
                                            fontSize: 14,
                                          }}
                                        />

                                      </a>

                                    )}

                                  </div>

                                </div>

                              </div>

                            </div>

                          </div>

                        );

                      }
                    )}

                  </div>

                ) : (

                  <div className="text-center py-12">

                    <CommitIcon
                      sx={{
                        fontSize: 50,
                        color: "#475569",
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#94a3b8",
                        marginTop: 2,
                      }}
                    >
                      No commits found.
                    </Typography>

                  </div>

                )}

              </CardContent>

            </Card>

          </div>


          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">


            {/* Committers */}
            <Card
              sx={{
                backgroundColor: "#0f172a",
                color: "white",
                border: "1px solid #1e293b",
                borderRadius: 3,
              }}
            >

              <CardContent>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={3}
                >
                  Committers
                </Typography>


                <div className="space-y-4">

                  {commitdata.committerData.length > 0 ? (

                    commitdata.committerData.map(
                      (committer, index) => (

                        <div
                          key={
                            commitdata.committerNode[
                              index
                            ] || index
                          }
                          className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl"
                        >

                          <Avatar
                            src={committer.avatarURL}
                            alt="Committer"
                          />


                          <div>

                            <Typography
                              fontSize="14px"
                              fontWeight="bold"
                            >
                              Committer
                            </Typography>


                            {committer.htmlURL && (

                              <a
                                href={committer.htmlURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 text-xs hover:text-blue-300"
                              >
                                View Profile
                              </a>

                            )}

                          </div>

                        </div>

                      )
                    )

                  ) : (

                    <Typography
                      sx={{
                        color: "#94a3b8",
                      }}
                    >
                      No committer information.
                    </Typography>

                  )}

                </div>

              </CardContent>

            </Card>


            {/* Repository Information */}
            <Card
              sx={{
                backgroundColor: "#0f172a",
                color: "white",
                border: "1px solid #1e293b",
                borderRadius: 3,
              }}
            >

              <CardContent>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                >
                  Repository Information
                </Typography>


                <Divider
                  sx={{
                    backgroundColor: "#334155",
                    marginBottom: 2,
                  }}
                />


                <div className="space-y-3 text-sm">


                  <div className="flex justify-between gap-4">

                    <span className="text-gray-400">
                      Repository
                    </span>

                    <span className="font-semibold break-all text-right">
                      {repoLanguage}
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span className="text-gray-400">
                      Commits
                    </span>

                    <span className="font-semibold">
                      {commitdata.commits.length}
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span className="text-gray-400">
                      Languages
                    </span>

                    <span className="font-semibold">
                      {language.length}
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span className="text-gray-400">
                      Committers
                    </span>

                    <span className="font-semibold">
                      {commitdata.committerData.length}
                    </span>

                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

        </div>

      </div>

    </div>
  );
};

export default RepositoryDetail;
