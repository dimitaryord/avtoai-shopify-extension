import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Card, FormLayout, Select, TextField, Button } from "@shopify/polaris";

const RedirectToSettingsButton = ({ baseUrl, endpoint }) => {
    const navigate = useNavigate();

    const redirectToSettings = () => {
        const fullUrl = `${baseUrl}${endpoint}`;
        navigate(fullUrl);
    };

    return (
        <button onClick={redirectToSettings} size='large' className="text-xl font-bold py-6 px-12 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition ease-in duration-200 transform hover:scale-105">
            Go to Settings
        </button>
    );
};

export default RedirectToSettingsButton;