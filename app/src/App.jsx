import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPanel from './User/UserPanel';
import AdminPanel from './Admin/AdminPanel';
import AdminUsers from './Admin/users/AdminUsers';
import UserPlans from './User/Plans/UserPlans';
import AdminProduct from './Admin/products/AdminProduct'
import Suggestions from './User/Suggestions'
import Login from "./login/Login"
import SignUp from "./signUp/SignUp"
import { motion } from 'framer-motion';
import AdminDiscount from './Admin/Discount-code/AdminDiscount';
import Educations from './Admin/educations/Educations';
import AddArticle from './Admin/AddArticle';
import UserMarkets from './User/UserMarkets';

function App() {
  return (
    <Router>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />

        <Route element={<UserPanel />} >
          <Route
            path="/users/plans"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: '100%' }}
              >
                <UserPlans />
              </motion.div>
            }
          />
          <Route
            path="/users/suggestions"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: '100%' }}
              >
                <Suggestions />
              </motion.div>
            }
          />
          <Route
            path="/users/markets"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: '100%' }}
              >
                <UserMarkets />
              </motion.div>
            }
          />


        </Route>


        <Route
          path="/admin/articles/add"
          element={
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              style={{ minHeight: '100%' }}
            >
              <AddArticle />
            </motion.div>
          }
        />
        <Route element={<AdminPanel />} >
          <Route
            path="/admin/users"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: '100%' }}
              >
                <AdminUsers />
              </motion.div>
            }
          />
          <Route
            path="/admin/discount-code"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: '100%' }}
              >
                <AdminDiscount />
              </motion.div>
            }
          />
          <Route
            path="/admin/products"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: '100%' }}
              >
                <AdminProduct />
              </motion.div>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: '100%' }}
              >
                <Educations />
              </motion.div>
            }
          />

        </Route>


      </Routes>
    </Router>
  );
}

export default App;
