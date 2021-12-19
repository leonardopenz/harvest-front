import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/layout/header'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#df1d00',
    },
  },
});

function HarvestApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="content">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}

export default HarvestApp
