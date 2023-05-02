import {useState} from 'react';

import {sum} from '#common';
import {sha256sum, versions} from '#preload';

import Count from './components/Count';

console.log('From renderer package:', sum);

const APP_VERSION = import.meta.env.VITE_APP_VERSION;

const label1id = 'label1id';
const label2id = 'label2id';

export default function App() {
  const [rawValue, setRawValue] = useState('hello world');

  return (
    <div className="m-3">
      <h2>App</h2>
      <Count />
      <br />
      <div>Sum from common package: {sum}</div>

      <div>App version: {APP_VERSION}</div>
      <ul id="process-versions">
        {Object.entries(versions).map(([lib, version]) => (
          <li key={lib}>
            <strong>{lib}</strong>
            <span>: v{version}</span>
          </li>
        ))}
      </ul>
      <br />
      <label htmlFor={label1id}>
        Raw value
        <input
          id={label1id}
          type="text"
          value={rawValue}
          onChange={e => {
            setRawValue(e.target.value);
          }}
        />
      </label>
      <br />
      <label htmlFor={label2id}>
        Hashed by node:crypto
        <input
          id={label2id}
          type="text"
          disabled
          value={sha256sum(rawValue)}
        />
      </label>
    </div>
  );
}
