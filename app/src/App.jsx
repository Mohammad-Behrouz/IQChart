// App.jsx
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UserPanel from './User/UserPanel';
import AdminPanel from './Admin/AdminPanel';
import AdminUsers from './Admin/users/AdminUsers';
import UserPlans from './User/Plans/UserPlans';
import AdminProduct from './Admin/products/AdminProduct';
import Suggestions from './User/Suggestions';
import Login from "./login/Login";
import SignUp from "./signUp/SignUp";
import { motion, AnimatePresence } from 'framer-motion';
import AdminDiscount from './Admin/Discount-code/AdminDiscount';
import Educations from './Admin/educations/Educations';
import AddArticle from './Admin/AddArticle';
import UserMarkets from './User/UserMarkets';
import Bourse from './User/Markets/Bourse/Bourse';
import Nazer from './User/Markets/Bourse/Nazer';
import Codal from './User/Markets/Bourse/Codal';
import Gold from './User/Markets/Gold/Gold';
import Crypto from './User/Markets/Crypto/Crypto';
import "./styles/responsive.css"
import Car from './User/Markets/Car/Car';
import Arz from './User/Markets/Arz/Arz'
const PageWrapper = ({ children, pathnameKey }) => (
  <motion.div
    key={pathnameKey}
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 40 }}
    transition={{ duration: 0.25 }}
    style={{ minHeight: '100%', position: 'relative', width: '100%', zIndex: "0" }} // مهم: absolute برای overlap
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path='/login' element={<PageWrapper pathnameKey={location.pathname}><Login /></PageWrapper>} />
        <Route path='/signUp' element={<PageWrapper pathnameKey={location.pathname}><SignUp /></PageWrapper>} />

        <Route element={<UserPanel />} >
          <Route path="/Bourse" element={<PageWrapper pathnameKey={location.pathname}><Bourse /></PageWrapper>} />
          <Route path="/Bourse/:id" element={<PageWrapper pathnameKey={location.pathname}><Bourse /></PageWrapper>} />
          <Route path="/Gold" element={<PageWrapper pathnameKey={location.pathname}><Gold /></PageWrapper>} />
          <Route path="/Crypto" element={<PageWrapper pathnameKey={location.pathname}><Crypto /></PageWrapper>} />
          <Route path="/Car" element={<PageWrapper pathnameKey={location.pathname}><Car /></PageWrapper>} />
          <Route path="/Arz" element={<PageWrapper pathnameKey={location.pathname}><Arz /></PageWrapper>} />
          <Route path="/Bourse/Codal" element={<PageWrapper pathnameKey={location.pathname}><Codal /></PageWrapper>} />
          <Route path="/Bourse/Nazer" element={<PageWrapper pathnameKey={location.pathname}><Nazer /></PageWrapper>} />
          <Route path="/users/plans" element={<PageWrapper pathnameKey={location.pathname}><UserPlans /></PageWrapper>} />
          <Route path="/users/suggestions" element={<PageWrapper pathnameKey={location.pathname}><Suggestions /></PageWrapper>} />
          <Route path="/users/markets" element={<PageWrapper pathnameKey={location.pathname}><UserMarkets /></PageWrapper>} />
        </Route>

        <Route path="/admin/articles/add" element={<PageWrapper pathnameKey={location.pathname}><AddArticle /></PageWrapper>} />

        <Route element={<AdminPanel />} >
          <Route path="/admin/users" element={<PageWrapper pathnameKey={location.pathname}><AdminUsers /></PageWrapper>} />
          <Route path="/admin/discount-code" element={<PageWrapper pathnameKey={location.pathname}><AdminDiscount /></PageWrapper>} />
          <Route path="/admin/products" element={<PageWrapper pathnameKey={location.pathname}><AdminProduct /></PageWrapper>} />
          <Route path="/admin/articles" element={<PageWrapper pathnameKey={location.pathname}><Educations /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      {/* والد باید relative باشه چون صفحات absolute هستند */}
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
