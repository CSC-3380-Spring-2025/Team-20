//reference page added with
"use client";
import React from "react";

const IconRefPage: React.FC = () => {

    return(
        <div className="flex flec-col items-center justify-cenetr min-h-screen bg-purple-50 p-4">
            <div className= "bg-white rounded-x1 shadow-md p-8 max-w-md w-full text-senter">
                <h1 className= "text-2x1 font-bold text-purple-900 mb-6"> Icon Reference</h1>
            <p className="text-purple-700 mb-6">
                For the collection of Icons please visit: 
            </p>
            < a 
            href="https://icons8.com/icons"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors shadow-md inlineblock"> icons 8.com
            </a>
            </div>
        </div>
    )

}