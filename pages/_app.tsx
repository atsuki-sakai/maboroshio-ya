import "@styles/tailwind.css"
import type { AppProps } from 'next/app'
import { Layout } from "@components/common"
import { UIProvider } from "@components/context"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
  )
}

export default MyApp
