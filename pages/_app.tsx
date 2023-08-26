import '../styles/globals.css'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, goerli, mainnet, optimism, polygon, zora } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
// import { Header } from '../components/layout/header'
// import { Footer } from '../components/layout/footer'

// import { IdProvider } from '@radix-ui/react-id'
import { RecoilRoot } from 'recoil'
import { AnimateSharedLayout } from 'framer-motion'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : [])],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Nakama',
  projectId: 'YOUR_PROJECT_ID',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          // theme={darkTheme({
          //   accentColor: '#7b3fe4',
          //   accentColorForeground: 'white',
          //   borderRadius: 'medium',
          // })}
          coolMode
          chains={chains}>
          <RecoilRoot>
            <AnimateSharedLayout type="switch">
              {/* <IdProvider> */}

              {/* <Header /> */}
              <Component {...pageProps} />
              {/* <Footer /> */}

              {/* </IdProvider> */}
            </AnimateSharedLayout>
          </RecoilRoot>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
