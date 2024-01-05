import React, { useState } from 'react';
import FirstStep from '../steps/FirstStep';
import SecondStep from '../steps/SecondStep';
import ThirdStep from '../steps/ThirdStep';
import { ProgressBar } from "@shopify/polaris";

function MainForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3; // Updated to reflect 4 total steps

    // Function to proceed to the next step
    const nextStep = () => {
        if(currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
        // Add any final step handling if necessary
    };

    // Function to go back to previous step
    const prevStep = () => {
        if(currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Function to render the current step
    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return <FirstStep nextStep={nextStep} />;
            case 2:
                return <SecondStep nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <ThirdStep prevStep={prevStep} />;
            default:
                // In case of an undefined step, redirect to the first step
                return <FirstStep nextStep={nextStep} />;
        }
    };
    
    

    // Calculate the progress (for the ProgressBar)
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div>
            {renderStep()}
            {/* Progress Indicator */}
            <ProgressBar progress={progress} size="small" />
            {/* Navigation Buttons */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
           
            </div>
        </div>
    );
}

export default MainForm;