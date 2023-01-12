import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.config';


const initialState = {
    user: {
        email: "",
        role: "",
    },
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk("auth/createUser", async (data) => {
    const result = await createUserWithEmailAndPassword(auth, data?.email, data?.password);
    return result.user;
});

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
    const result = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${email}`)
    const data = await result.json();
    // console.log(data.data)

    if (data.status) {
        return data;
    }
    else {
        return email;
    }

});

export const logInUser = createAsyncThunk("auth/logInUser", async (data) => {
    const result = await signInWithEmailAndPassword(auth, data?.email, data?.password);
    return result.user;
});

export const googleLogIn = createAsyncThunk("auth/googleLogIn", async (data) => {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider)
    return result.user;
});



// export const logOutUser = createAsyncThunk("auth/logOutUser", async (data) => {
//     const result = await signOut(auth)
//     return result;
// });


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = { email: "", role: "" }
        },
        setUser: (state, action) => {
            state.user.email = action.payload;
            state.isLoading = false
        },
        toggleLoading: (state) => {
            state.isLoading = false;
        },
        resetError: (state) => {
            state.isError = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user.email = action.payload.email;
                // state.role = action.payload.role;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.user.email = "";
                state.role = "";
            })

            .addCase(logInUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                // console.log('m, = ', action.payload.user)
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user = action.payload;
                // state.role = action.payload.role;
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.user.email = "";
                state.role = "";
            })

            // .addCase(logOutUser.pending, (state) => {
            //     state.isLoading = true;
            //     state.isError = false;
            //     state.error = "";
            // })
            // .addCase(logOutUser.fulfilled, (state) => {
            //     state.isLoading = false;
            //     state.isError = false;
            //     state.error = "";
            //     state.user.email = "";
            //     // state.role = action.payload.role;
            // })
            // .addCase(logOutUser.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.error = action.error.message;
            //     // state.user.email = state.user.email;
            //     // state.role = "";
            // })


            .addCase(googleLogIn.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(googleLogIn.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.user.email = action.payload.email;
                // state.role = action.payload.role;
            })
            .addCase(googleLogIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.user.email = "";
                state.role = "";
            })


            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                // console.log('fulfilled  ', action.payload)
                if (action.payload.status) {
                    state.user = action.payload.data;
                }
                else {
                    state.user.email = action.payload
                }
                state.isLoading = false;
                state.isError = false;
                state.error = "";

                // state.role = action.payload.role;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.user.email = "";
                state.role = "";
            })
    }
})

export const { logout, setUser, resetError, toggleLoading } = authSlice.actions

export default authSlice.reducer;
