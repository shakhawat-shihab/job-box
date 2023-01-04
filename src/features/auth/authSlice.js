import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit/dist'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.config';


const initialState = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk("auth/createUser", async (data) => {
    const result = await createUserWithEmailAndPassword(auth, data?.email, data?.password);
    return result.user;

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
            state.email = ""
        },
        setUser: (state, action) => {
            state.email = action.payload;
            state.isLoading = false
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
                state.email = action.payload.email;
                // state.role = action.payload.role;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.email = "";
                state.role = "";
            })

            .addCase(logInUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = "";
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.isLoading = false;
                state.isError = false;
                state.error = "";
                state.email = action.payload.email;
                // state.role = action.payload.role;
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.email = "";
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
            //     state.email = "";
            //     // state.role = action.payload.role;
            // })
            // .addCase(logOutUser.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.error = action.error.message;
            //     // state.email = state.email;
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
                state.email = action.payload.email;
                // state.role = action.payload.role;
            })
            .addCase(googleLogIn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.email = "";
                state.role = "";
            })
    }
})

export const { logout, setUser } = authSlice.actions

export default authSlice.reducer;
