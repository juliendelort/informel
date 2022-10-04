import React from 'react';
import { InformEl, InformField } from '../react-src';

export const App = () => {

    const handleSubmit = ({ detail: { values } }) => {
        console.log('submit!', values);
    };
    return <><h1>Hey!</h1>
        <InformEl onInformSubmit={handleSubmit}>
            <form>

                <label>
                    login
                    <InformField>
                        <input type="text" required name="login" />
                    </InformField>
                </label>

                <label>
                    password
                    <InformField>
                        <input type="password" required name="password" />
                    </InformField>
                </label>

                <button>Go!</button>
            </form>


        </InformEl>
    </>;
};
