import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/job",
                body: data
            }),
            invalidatesTags: ["Jobs"]
        }),
        apply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/apply",
                body: data
            }),
            // invalidatesTags: ["Jobs"]
        }),
        question: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/query",
                body: data
            }),
            invalidatesTags: ["Job"]
        }),
        reply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/reply",
                body: data
            }),
            invalidatesTags: ["Job"]
        }),
        getJobs: builder.query({
            query: () => ({
                url: "/jobs",
            }),
            providesTags: ["Jobs"]
        }),
        getJobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`,
            }),
            providesTags: ["Job"]
        }),
        getAppliedJobs: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`,
            })
        }),
        getMyJobs: builder.query({
            query: (email) => ({
                url: `/my-jobs/${email}`,
            })
        }),
        closeJob: builder.mutation({
            query: (id) => ({
                method: "PATCH",
                url: `/job/${id}`,
            }),
            invalidatesTags: ["Job"]
        }),

    })
})

export const { usePostJobMutation, useGetJobsQuery, useGetJobByIdQuery, useApplyMutation, useGetAppliedJobsQuery, useGetMyJobsQuery, useQuestionMutation, useReplyMutation, useCloseJobMutation } = jobApi