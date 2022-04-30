import Head from "next/head"
import { Banner, CardContent, Header } from "../components/index";
import { movieHook } from "../store/hooks/hooks";

import requests from "../utils/requests";

const Home = () => {
    const { data: trendingMovies,
      isError: isErrorTrending,
      isLoading: isLoadingTrending } = movieHook.useGetTrendedMoviesQuery()
    const { data: topRated,
      isError: isErrorTopRated,
      isLoading: isLoadingTopRated } = movieHook.useGetTopRateMoviesQuery();
    const { data: actionMovies,
      isError: isErrorAction,
      isLoading: isLoadingAction } = movieHook.useGetActionMoviesQuery();
    const { data: horrorMovies,
      isError: isErrorHorror,
      isLoading: isLoadingHorror } = movieHook.useGetHorrorMoviesQuery();
  const { data: comedyMovies,
    isError: isErrorComedy,
    isLoading: isLoadingComedy } = movieHook.useGetComedyMoviesQuery();
  const { data: romanceMovies,
    isError: isErrorRomance,
    isLoading: isLoadingRomance } = movieHook.useGetRomanceMoviesQuery();
  const { data: documentaries,
    isError: isErrorDocumentary,
    isLoading: isLoadingDocumentary } = movieHook.useGetDocumentaryMoviesQuery();
  return (
      <div className="relative h-screen bg-gradient-to-b  lg:h-[150vh]">
        <Head>
          <title>kekflix</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Header/>
        <main className="pl-4 pb-20 lg:space-y-24 lg:pl-16 lg:py-10">
          {!isLoadingTrending && trendingMovies && <Banner netflixOriginals={trendingMovies.results}/>}
          <section className="space-y-24">
            {!isLoadingTrending && trendingMovies && <CardContent title="Trending Now" movies={trendingMovies.results}/>}
            {topRated && !isLoadingTopRated && <CardContent title="Top Rated" movies={topRated.results}/>}
            {!isLoadingAction && actionMovies && <CardContent title="Action Thrillers" movies={actionMovies.results}/>}
            {/* My List */}
            {!isLoadingComedy && comedyMovies && <CardContent title="Comedies" movies={comedyMovies.results}/>}
            {!isLoadingHorror && horrorMovies && <CardContent title="Scary Movies" movies={horrorMovies.results}/>}
            {!isLoadingRomance && romanceMovies && <CardContent title="Romance Movies" movies={romanceMovies.results}/>}
            {!isLoadingDocumentary && documentaries && <CardContent title="Documentaries" movies={documentaries.results}/>}
          </section>
        </main>
      </div>
  )
}

export default Home;
