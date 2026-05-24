import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@saas/schemas'

interface AuthState {
  accessToken: string | null
  user: User | null
}

function loadToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('saas_token')
}

const initialState: AuthState = {
  accessToken: loadToken(),
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ accessToken: string; user: User }>) {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      localStorage.setItem('saas_token', action.payload.accessToken)
    },
    clearAuth(state) {
      state.accessToken = null
      state.user = null
      localStorage.removeItem('saas_token')
    },
  },
})

export const { setCredentials, clearAuth } = authSlice.actions
export default authSlice.reducer
