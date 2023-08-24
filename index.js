import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import store from './src/store/store.ts';
import { Provider } from 'react-redux'; 

const AppWithRedux = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  AppRegistry.registerComponent(appName, () => AppWithRedux);
  