import Head from "next/head"
import Image from "next/image"
import { Banner, CardContent, Header } from "../components/index";
import { Props } from "../models/Props";
import requests from "../utils/requests";

const Home = ({ netflixOriginals,
                trendingNow,
                topRated,
                actionMovies,
                comedyMovies,
                horrorMovies,
                romanceMovies,
                documentaries }: Props) => {
  console.log(netflixOriginals);
  return (
      <div className="relative h-screen bg-gradient-to-b  lg:h-[150vh]">
        <Head>
          <title>kekflix</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Header/>
        <main className="pl-4 pb-20 lg:space-y-24 lg:pl-16 lg:py-10">
          <Banner netflixOriginals={trendingNow}/>
          <section className="space-y-24">
            <CardContent title="Trending Now" movies={trendingNow} />
            <CardContent title="Top Rated" movies={topRated} />
            <CardContent title="Action Thrillers" movies={actionMovies} />
            {/* My List */}
            <CardContent title="Comedies" movies={comedyMovies} />
            <CardContent title="Scary Movies" movies={horrorMovies} />
            <CardContent title="Romance Movies" movies={romanceMovies} />
            <CardContent title="Documentaries" movies={documentaries} />
          </section>
        </main>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then(data => data.json()),
    fetch(requests.fetchTrending).then(data => data.json()),
    fetch(requests.fetchTopRated).then(data => data.json()),
    fetch(requests.fetchActionMovies).then(data => data.json()),
    fetch(requests.fetchComedyMovies).then(data => data.json()),
    fetch(requests.fetchHorrorMovies).then(data => data.json()),
    fetch(requests.fetchRomanceMovies).then(data => data.json()),
    fetch(requests.fetchDocumentaries).then(data => data.json())
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    }
  }
}