import React from 'react';

import appStyles from './app.module.css';

import {SearchForm} from '../search-form/search-form';
import {UserCard} from '../user-card/user-card';
import {Popup} from '../popup/popup';

function App() {
  return (
    <main className={appStyles.main}>
      <SearchForm/>
      <UserCard avatarSrc="https://images.immediate.co.uk/production/volatile/sites/23/2023/01/Giant-panda-c2c51b8.jpg?resize=768,574"
                login="dariarus"
                repoNumber={2}
                profileUrl="https://github.com/dariarus"
      />
      <UserCard avatarSrc="https://images.immediate.co.uk/production/volatile/sites/23/2023/01/Giant-panda-c2c51b8.jpg?resize=768,574"
                login="dariarus"
                repoNumber={8}
                profileUrl="https://github.com/dariarus"
      />
      <UserCard avatarSrc="https://images.immediate.co.uk/production/volatile/sites/23/2023/01/Giant-panda-c2c51b8.jpg?resize=768,574"
                login="dariarus"
                repoNumber={3}
                profileUrl="https://github.com/dariarus"
      />
      {/*<Popup onClosePopup={() => console.log('hi')}*/}
      {/*       login="dariarus"*/}
      {/*       profileUrl="https://github.com/dariarus"*/}
      {/*       username="Daria"*/}
      {/*       userInfo="Привет! Меня зовут Дарья. Меняю профессию и постепенно приближаюсь к цели стать веб-разработчиком! Связаться со мной можно по почте rusanova_dv@mail.ru"*/}
      {/*       followers={2}*/}
      {/*       following={4}*/}

      {/*/>*/}
    </main>
  );
}

export default App;
