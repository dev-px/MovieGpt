import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/store/AppStore.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  // </StrictMode>
)

// because of StrictMode we have useEffect called twice in development mode but in production it will be called once
// because of this our fetch call is happening twice in development mode and when we console anything we see it twice
// to avoid this we can either remove StrictMode or we can use a ref to track if useEffect has already run
// but it's better to keep StrictMode for finding potential problems in our app during development