import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Transactions from '../components/Transactions'
import TransactionDetails from '../components/TransactionDetails'
import NavigationBar from '../components/NavigationBar'
import TransactionForm from '../components/TransactionForm'


const App = () => {
  return <div>
    <NavigationBar />
    <h1>Budgeting App</h1>
    <Router>
      <Routes>
        <Route path='/' element={<Transactions />} />
        <Route path='/:id' element={<TransactionDetails />}></Route>
        <Route path='/edit' element={<TransactionForm />}></Route>
      </Routes>
    </Router>

  </div>
}

export default App
