import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faUser,faUserGroup,} from '@fortawesome/free-solid-svg-icons'
import './App.css';
import MainComp from './loggin/Loggingpage';
library.add(fab, faCheckSquare, faUser,faUserGroup,)

function App() {
  return (
    <div className="App" >
           <MainComp></MainComp>
    </div>
  );
}

export default App;
