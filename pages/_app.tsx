import "@styles/tailwind.css"
import type { AppProps } from 'next/app'
import { Layout } from "@components/common"
import { UIProvider, LoadedProvider } from "@components/context"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoadedProvider>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </LoadedProvider>
  )
}

export default MyApp
