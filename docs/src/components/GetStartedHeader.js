import React from 'react';
import Logo from '@site/static/img/logo.svg';


export const GetStartedHeader = () => (
    <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Balsamiq sans' }}>
        <Logo width="10%" height="10%" />
        <span style={{ marginLeft: '20px', paddingTop: '5px' }}>informel</span>
    </h1>
);
