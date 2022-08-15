import { Redirect, Route, Switch } from "react-router-dom";
import Chats from "./components/ChatRoom";
import Login from "./components/Login";
import AddRoomModal from "./components/Modal/AddRoomModal";
import InviteMember from "./components/Modal/InviteMember";
import SendImageModal from "./components/Modal/SendImageModal";


function App() {
  return (
    <>
      <Switch>
        <Redirect from="/" to={'/login'} exact />
        <Route path='/login' component={Login} />
        <Route path='/chat' component={Chats} />
      </Switch>
      <AddRoomModal />
      <InviteMember />
      <SendImageModal/>
    </>

  );
}

export default App;
