import React from "react";

export function BookCall() {
    // Event handler for button click
    const redirectToCalendly = () => {
        // Update the window's location to the Calendly URL
        window.location.href = "https://calendly.com/ckarakano/aiconuslt";
    };

    return (
        <button 
            onClick={redirectToCalendly} // Add the onClick event handler
            size='large' 
            fullWidth={true} 
            variant="primary" 
            className="text-xl font-bold py-6 px-12 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition ease-in duration-200 transform hover:scale-105"
        >
            <h1 as="h1" variant="headinglg" class="text-2xl">
               Book a Call
            </h1>
        </button>
    );
}