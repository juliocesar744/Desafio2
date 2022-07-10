import React from "react";


export function BranchsTable(props) {
    const branchs = props.data;

    function handleBack(){
        props.nameTable("Repo")
    }

    return (
        <div className="flex flex-wrap justify-center items-center space-y-2">
            <div className="w-full flex flex-wrap justify-center items-center ">
            <button 
                className=" hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => handleBack()}
            >
                Voltar
            </button>
            </div>
                    <table className="py-2  w-2/5" >
                    <thead className="bg-apricot-100 border-2 border-black">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                Branchs
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                Ver
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {branchs.map(x => {
                        return (
                        <tr className="bg-apricot-100 border-2 border-black" key={x.commit.sha}>
                            <td className="text-sm text-gray-900 font-light px-1 py-4 text-center" >
                                {x.name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-1 py-4 text-center" >
                                <button className="underline" onClick={() => props.findCommits(x.name)}>Ver</button>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                    </table>
        </div>
    )
}
