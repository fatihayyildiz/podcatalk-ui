import { Provider } from 'react-redux';
import { store } from './store';
import MyRoutes from "./routers";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200 font-body">
        <MyRoutes />
      </div>
    </Provider>
  );
}

export default App;
