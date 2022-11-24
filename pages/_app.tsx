import "@styles/tailwind.css"
import type { AppProps } from 'next/app'
import { Layout } from "@components/common"
import { UIProvider, CartProvider, CustomerStateProvider } from "@components/context"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomerStateProvider>
      <CartProvider>
        <UIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UIProvider>
      </CartProvider>
    </CustomerStateProvider>
  )
}

export default MyApp
