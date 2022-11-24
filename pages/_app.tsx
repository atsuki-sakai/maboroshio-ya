import "@styles/tailwind.css"
import type { AppProps } from 'next/app'
import { Layout } from "@components/common"
import { UIProvider, CartProvider, LoginProvider } from "@components/context"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
      <CartProvider>
        <UIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UIProvider>
      </CartProvider>
    </LoginProvider>
  )
}

export default MyApp
