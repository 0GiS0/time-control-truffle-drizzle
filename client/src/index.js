import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Drizzle } from 'drizzle';
import TimeControl from './contracts/TimeControl.json';

const options = {
    contracts: [TimeControl],
    web3: {
        fallback: {
            type: 'ws',
            url: 'ws://127.0.0.1:9545'
        }
    }
};

const drizzle = new Drizzle(options);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));