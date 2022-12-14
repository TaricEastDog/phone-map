import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import App from "./App"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

reportWebVitals()
