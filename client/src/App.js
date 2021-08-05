import './App.scss';
import { useEffect } from 'react';

import Game from './components/Game';

import { Provider, useDispatch } from 'react-redux'; 
import store from './store';
// import { loadUser } from './actions/authActions';

function App() {

  // store.dispatch(loadUser);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // console.log("In app use effect");
  //   dispatch(loadUser);

  // }, [] );

  return (
    <Provider store={store}>
        <div className="App">
          <Game />
        </div>
     </Provider>
  );
}

export default App;
