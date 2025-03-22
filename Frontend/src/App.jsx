import AppRoutes from "./Routes/AppRoutes"
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <AppRoutes/>
    </>
  )
}

export default App
