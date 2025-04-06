import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { UserAuthProvider } from './providers/UserAuthProvider'
import { Provider } from 'react-redux'
import { store } from './store/store'
import router from '@/pages/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider>
    </Provider>
  </StrictMode>,
)
