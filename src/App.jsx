import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./routes/Home/home";
import Account from "./routes/Account/account";
import Deposit from "./routes/Deposit/deposit";
import Withdraw from "./routes/Withdraw/withdraw";
import AllData from "./routes/AllData/alldata";
import CloseAccount from "./routes/CloseAccount/closeaccount";
import UpdateNote from "./routes/Deposit/note";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note/:id" element={<UpdateNote />} />
          <Route path="/note/:id" element={<UpdateNote />} />
          <Route path="/account" element={<Account/>} />
          <Route path="/closeaccount" element={<CloseAccount/>} />
          <Route path="/deposit" element={<Deposit/>} />
          <Route path="/withdraw" element={<Withdraw/>} />
          <Route path="/alldata" element={<AllData/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
