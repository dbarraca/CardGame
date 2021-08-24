import './App.scss';
import Routing from './components/Routing';
import { Provider } from 'react-redux'; 
import store from './store';

function App() {
  return (
    <Provider store={store}>
        <div className="App">
          <Routing />
        </div>
     </Provider>
  );
}

export default App;
