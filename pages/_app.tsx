import type { AppProps } from "next/app"
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "../store/hooks/useAuth";
import store from "../store/store";
import "../styles/globals.css"

function MyApp({
                 Component,
                 pageProps
               }: AppProps) {
  return (
      <Provider store={store}>
        <RecoilRoot>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </RecoilRoot>
      </Provider>
  )
}

export default MyApp
