import { Octokit, App } from "octokit";
import React, { useState } from "react";
import { BranchsTable } from "./BranchsTable";

const octokit = new Octokit({
    auth: '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'
})

export function RepoTable(props) {
    const repo = props.data;
    console.log("porps", props)

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden justify-center items-center flex ">
                    <table className="w-2/5 ">
                    <thead className="bg-apricot-100 border-2 border-black">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                Repositórios
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                Ver
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {repo.map(x => {
                        return (
                        <tr className="bg-apricot-100 border-2 border-black" key={x.id}>
                            <td className="text-sm text-gray-900 font-light px-1 py-4 text-center" >
                                {x.name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-1 py-4 text-center" >
                                <button className="underline" onClick={() => props.findBranchs(x.id)}>Ver</button>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}
