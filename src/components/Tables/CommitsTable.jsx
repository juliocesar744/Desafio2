import React from "react";

export function CommitsTable(props) {
    const commits = props.commits.ahead_by;

    function handleBack(){
        props.nameTable("Branch")
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
            <div className="w-full flex flex-wrap justify-center items-center">
                <p>Quantidade de Commits: {commits}</p>
            </div>
            <div className="w-full flex flex-wrap justify-center items-center">
                <p>Não encontrei uma forma correta de mostrar todos os commits pela API do Github :{"("} então trouxe a quantidade de commits dentro da branch selecionada. </p>
            </div>
        </div>
    )
}
