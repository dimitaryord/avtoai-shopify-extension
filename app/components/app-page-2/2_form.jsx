import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { FormLayout, TextField, InlineError, Button } from '@shopify/polaris';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const formSchema = z.object({
    storeName: z.string().min(1, "Store name is required"),
    accountEmail: z.string().email("Invalid email address"),
});

// eslint-disable-next-line react/display-name
export const Form = forwardRef(({ onSuccessfulSubmit }, ref) => {
    const [storeName, setStoreName] = useState('');
    const [accountEmail, setAccountEmail] = useState('');
    const [errors, setErrors] = useState({});

    const mutation = useMutation((newData) => {
        return axios.post('/api/submit-form', newData);
    });

   


    const handleStoreNameChange = (value) => setStoreName(value);
    const handleAccountEmailChange = (value) => setAccountEmail(value);




    useImperativeHandle(ref, () => ({
      submitForm: () => {
          handleSubmit(new Event('submit'));
      }
  }));

    
    const handleSubmit = async () => {
        try {
            const data = formSchema.parse({ storeName, accountEmail });
            mutation.mutate(data, {
                onSuccess: () => {
                    onSuccessfulSubmit && onSuccessfulSubmit(data);
                }
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(newErrors);
            }
        }
    };

    return (
        <FormLayout>
            <TextField
                label="Store name"
                value={storeName}
                onChange={handleStoreNameChange}
                autoComplete="on"
                error={errors.storeName}
            />
            <TextField
                type="email"
                label="Account email"
                value={accountEmail}
                onChange={handleAccountEmailChange}
                autoComplete="email"
                error={errors.accountEmail}
            />
            {mutation.isError && (
                <InlineError message="An error occurred while submitting the form" />
            )}
        </FormLayout>
    );
});