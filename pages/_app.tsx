import '../styles/globals.css'
// import 'antd/dist/antd.min.css';
// import "@ant-design/flowchart/dist/index.css";
// import "antd/es/popover/style/index.css";
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
