import apiSlice from "../api/apiSlice";

const chatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postMessage: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/send-message",
                body: data
            }),
            invalidatesTags: ["Chat"]
        }),
        getMessages: builder.query({
            query: (data) => ({

                url: `/get-messages/${data?.user1}/${data?.user2}`,
            }),
            providesTags: ["Chat"]
        }),


    })
})

export const { usePostMessageMutation, useGetMessagesQuery } = chatApi
