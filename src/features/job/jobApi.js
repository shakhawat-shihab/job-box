import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/job",
                body: data
            }),
            invalidatesTags: ["AllJobs"]
        }),
        apply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/apply",
                body: data
            }),
            // invalidatesTags: ["AllJobs"]
            invalidatesTags: ["Candidates"]
        }),
        approveJob: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/approve-job",
                body: data
            }),
            invalidatesTags: ["Candidates", "AppliedJobs"]
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
            providesTags: ["AllJobs"]
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
            }),
            providesTags: ["AppliedJobs"]
        }),
        getMyJobs: builder.query({
            query: (email) => ({
                url: `/my-jobs/${email}`,
            }),

        }),
        closeJob: builder.mutation({
            query: (id) => ({
                method: "PATCH",
                url: `/job/${id}`,
            }),
            invalidatesTags: ["Job"]
        }),
        getCandidates: builder.query({
            query: (_id) => ({
                url: `/candidates/${_id}`,
            }),
            providesTags: ["Candidates"]
        }),

    })
})

export const { usePostJobMutation, useGetJobsQuery, useGetJobByIdQuery, useApplyMutation, useGetAppliedJobsQuery, useGetMyJobsQuery, useQuestionMutation, useReplyMutation, useCloseJobMutation, useGetCandidatesQuery, useApproveJobMutation } = jobApi
