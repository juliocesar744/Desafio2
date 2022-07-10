import React, { useState } from "react";
import { Octokit, App } from "octokit";
import { RepoTable } from "./Tables/RepoTable";
import { BranchsTable } from "./Tables/BranchsTable";
import { CommitsTable } from "./Tables/CommitsTable";

const octokit = new Octokit({
    auth: ''
})

export default function Widget() {
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [nameTable, setNameTable] = useState("");
    const [repoSelected, setRepoSelected] = useState();

    const [repo, setRepo] = useState([]);
    const [branchs, setBranchs] = useState([]);
    const [commits, setCommits] = useState({});
      
    async function findUser() {
        try {
        await octokit.request(`GET /users/${text}/repos`, {
            username: 'USERNAME'
        }).then((response) => {
            setError(false);
            setRepo(response.data);
            setNameTable("Repo");

        })
        } catch (error){
            setError(true);
        }
    }

    async function findBranchs(id) {
        let findRepo = repo.find(x => x.id === id);
        setRepoSelected(findRepo);

        let owner = findRepo.owner.login;
        let name = findRepo.name;
        await octokit.request(`GET /repos/${owner}/${name}/branches`, {
        }).then((response) => {
            setBranchs(response.data);
            setNameTable("Branch");
        })
    }

    async function findCommits(nameBranch) {
        let owner = repoSelected.owner.login;
        let name = repoSelected.name;
        let branch = nameBranch;
        await octokit.request(`GET /repos/${owner}/${name}/compare/${branch}...master`, {
        }).then((response) => {
            setCommits(response.data);
            setNameTable("Commit");
        })
    }

    function handleChangeUser(text){
        setError(false);
        setText(text);
    }

    return (
        <div className="space-y-12">
            <div className="font-Montserrat text-4xl flex flex-wrap justify-center w-full">
                <p className="w-full flex flex-wrap justify-center">Github</p>
                <p>User Search</p>
            </div>
            <div className="pt-10">
            { error ?
                    <p className="w-full flex flex-wrap justify-center text-red-600">O usuário {text} não existe</p>
                    :
                    <p className="w-full h-6 ">
                    </p>
            }
            <div className="flex justify-center ">
                <input 
                    type="text" 
                    className="w-1/4 px-5 py-1.5 text-base font-normal text-gray-700 bg-white  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    placeholder="Digite o nome do usuário"
                    value={text}
                    onChange={(e) => handleChangeUser(e.target.value)}
                />
                <button 
                    className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" 
                    type="button" 
                    onClick={() => findUser()}
                    id="button-addon2"
                >
                    <svg 
                        aria-hidden="true"
                        focusable="false" 
                        className="w-4" 
                        viewBox="0 0 512 512"
                    >
                    <path 
                        fill="currentColor" 
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    />
                    </svg>
                </button>
            </div>
            
        </div>
        <div>
                {
                    {
                        'Repo': <RepoTable data={repo} findBranchs={findBranchs}/>,
                        'Branch': <BranchsTable data={branchs} findCommits={findCommits} nameTable={setNameTable}/>,
                        'Commit': <CommitsTable commits={commits} nameTable={setNameTable}/>,
                    }[nameTable]
                }
            </div>
        </div>
    )
}