import React from 'react';

import appStyles from './app.module.css';

import {SearchForm} from '../search-form/search-form';

function App() {
  return (
    <main className={appStyles.main}>
      {/*<header className="App-header">*/}
      <SearchForm/>
      {/*</header>*/}
    </main>
  );
}

export default App;
