import { baseApi } from './base.api'
import { AuthResponseSchema, type LoginBody, type RegisterBody, type AuthResponse } from '@saas/schemas'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ data: AuthResponse }, LoginBody>({
      query: (body) => ({ url: '/api/auth/login', method: 'POST', body }),
      transformResponse: (raw: { data: unknown }) => ({
        data: AuthResponseSchema.parse(raw.data),
      }),
    }),
    register: build.mutation<{ data: AuthResponse }, RegisterBody>({
      query: (body) => ({ url: '/api/auth/register', method: 'POST', body }),
      transformResponse: (raw: { data: unknown }) => ({
        data: AuthResponseSchema.parse(raw.data),
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
