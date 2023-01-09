import React from 'react';
import { InformEl, InformField } from '../react-src';
import { z } from 'zod';


const FormData = z
    .object({
        first_name: z.string().min(1, { message: "Firstname is required" }),
        last_name: z.string().min(1, { message: "Lastname is required" }),
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        password: z
            .string()
            .min(6, { message: "Password must be atleast 6 characters" }),
        terms: z.literal(true, {
            errorMap: () => ({ message: "You must accept Terms and Conditions" }),
        }),
    });
export const App = () => {

    const handleSubmit = ({ detail: { values } }) => {
        console.log('submit!', values);
    };

    return <><h1>Hey!</h1>
        <InformEl onInformSubmit={handleSubmit} zodSchema={FormData}>
            <form>

                <label>
                    First name
                    <InformField>
                        <input type="text" name="first_name" />
                    </InformField>
                </label>

                <label>
                    Last Name
                    <InformField>
                        <input type="text" name="last_name" />
                    </InformField>
                </label>
                <label>
                    Email
                    <InformField>
                        <input type="text" name="email" />
                    </InformField>
                </label>
                <label>
                    password
                    <InformField>
                        <input type="password" name="password" />
                    </InformField>
                </label>

                <label>
                    Accept terms:
                    <InformField>
                        <input type="checkbox" name="terms" />
                    </InformField>
                </label>

                <button>Go!</button>
            </form>


        </InformEl>
    </>;
};
