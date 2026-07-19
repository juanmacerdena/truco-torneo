import Head from 'next/head'
import TrucoTorneo from '../components/TrucoTorneo'

export default function Home() {
  return (
    <>
      <Head>
        <title>Torneo de Truco - UnTrucoUY</title>
        <meta name="description" content="Sistema de torneo de Truco online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TrucoTorneo />
      </main>
    </>
  )
}
