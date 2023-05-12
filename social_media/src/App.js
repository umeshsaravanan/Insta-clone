import './App.css';
import Login from './Chat/Login/Login';
import SignUp from './Chat/Login/Signup';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import Chat from './Chat/Chat.js';
import { UserAuthContextProvider } from './Chat/Login/UserAuthContext';
import ProtectedRoute from './Chat/Login/ProtectedRoute';
import GPT from './GPT/GPT';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./GPT/state/api.js";

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

function App() {
 
  return (
   <div className="App">
    <UserAuthContextProvider>
      <Routes>
      <Route path='/home' element={<ProtectedRoute><Chat /></ProtectedRoute>}/>
        <Route path='/' element={<Login></Login>} ></Route>
        <Route path='/signup' element={<SignUp></SignUp>} ></Route>
      </Routes>
    </UserAuthContextProvider>
    <Provider store={store}>
        <Routes>
          <Route path='/gpt' element={<GPT />} />
        </Routes>
      </Provider>
   </div>
  );
}

export default App;
