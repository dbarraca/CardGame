import './App.scss';
import Routing from './components/Routing';
import { Provider, useDispatch } from 'react-redux'; 
import store from './store';

function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Provider store={store}>
        <div className="App">
          <Routing />
        </div>
     </Provider>
  );
}

export default App;
