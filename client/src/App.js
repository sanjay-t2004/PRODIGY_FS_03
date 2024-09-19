import { useDispatch } from 'react-redux';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { signinUser } from './redux/UserSlice';
import { useEffect } from 'react';
import { loadCart } from './redux/CartSlice';

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      // Simulate a signin action with the persisted user
      dispatch(signinUser.fulfilled(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return (
    <div className="App" >
      <AppRoutes />
    </div >
  );
}

export default App;
