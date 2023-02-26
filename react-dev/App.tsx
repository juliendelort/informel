import React from 'react';
import { InformEl, InformField, ValidationHandler } from '../react-src';
import { z } from 'zod';


// const FormData = z
//     .object({
//         first_name: z.string().min(1, { message: "Firstname is required" }),
//         last_name: z.string().min(1, { message: "Lastname is required" }),
//         email: z.string().min(1, { message: "Email is required" }).email({
//             message: "Must be a valid email",
//         }),
//         password: z
//             .string()
//             .min(6, { message: "Password must be atleast 6 characters" }),
//         terms: z.literal(true, {
//             errorMap: () => ({ message: "You must accept Terms and Conditions" }),
//         }),
//     });

const User = ({ index }: { index: number; }) => {
    return (
        <>
            <InformField>
                <input type="text" name={`users[${index}].name.first`} />
            </InformField>
            <input type="text" name={`users[${index}].name.last`} />
            <InformField>
                <input type="checkbox" name={`users[${index}].admin`} />
            </InformField>
        </>
    );
};

type FormValues = {
    users: {
        name: {
            first: string;
            last: string;
        };
        admin: boolean;
    }[];
};

const handleValidation: ValidationHandler<FormValues> = ({ values }: { values: FormValues; }) => {
    return { 'dfsadf': 1 };
};

export const App = () => {
    const [usersCount, setUsersCount] = React.useState(1);
    const handleSubmit = ({ detail: { values } }: CustomEvent<{ values: FormValues; }>) => {
        console.log('submit!', values);
    };


    const initialValues: FormValues = { users: [{ name: { first: 'j', last: 'd' }, admin: true }] };
    return <><h1>Hey!</h1>
        <button onClick={() => setUsersCount(usersCount + 1)}>Add user</button>
        <InformEl
            onInformSubmit={handleSubmit} initialValues={initialValues}
            validationHandler={({ values }) => {
                return { 'dfsadf': 1 };
            }}>
            <form>
                {[...Array(usersCount).keys()].map((_, index) => (
                    <User key={index} index={index} />
                ))}

                <button>Go!</button>
            </form>


        </InformEl>
    </>;
};
