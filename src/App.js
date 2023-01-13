import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./app/store";
import { getUser, setUser, toggleLoading } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";

function App() {
  const { isLoading } = useSelector(state => state.auth);
  console.log('LOADING ', isLoading)
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        dispatch(getUser(user?.email))
      }
      else {
        // dispatch(setUser(""))
        // console.log("else part")
        dispatch(getUser(user?.email))
        dispatch(toggleLoading())
      }
    });
  }, [])
  return (
    <>
      {/* <Provider store={store}> */}
      <Toaster />
      <RouterProvider router={routes} />
      {/* </Provider> */}
    </>
  );
}

export default App;
