import { Provider } from "react-redux";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UserForm />
        <UserList />
      </div>
    </Provider>
  );
}

export default App;
