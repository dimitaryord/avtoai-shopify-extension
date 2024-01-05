import React, { useState } from 'react';
import { FormLayout, TextField, InlineError } from '@shopify/polaris';


export function Form() {
    // State for storing input values and error message
    const [storeName, setStoreName] = useState('');
    const [accountEmail, setAccountEmail] = useState('');
    const [emailError, setEmailError] = useState('');
  
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Handle changes in the store name field
    const handleStoreNameChange = (value) => setStoreName(value);
  
    // Handle changes in the account email field
    const handleAccountEmailChange = (value) => {
      setAccountEmail(value);
      if (emailRegex.test(value)) {
        setEmailError(''); // Clear error if the email is valid
      } else {
        setEmailError('Enter a valid email address.'); // Set error message
      }
    };
  
    return (
      <FormLayout>
        <TextField
          label="Store name"
          value={storeName}
          onChange={handleStoreNameChange}
          autoComplete="on"
        />
        <TextField
          type="email"
          label="Account email"
          value={accountEmail}
          onChange={handleAccountEmailChange}
          autoComplete="email"
          error={emailError ? true : false}
        />
        {emailError && <InlineError message={emailError} fieldID="accountEmail" />}
      </FormLayout>
    );
  }