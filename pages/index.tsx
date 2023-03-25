import Head from "next/head"
import {useRecoilValue} from "recoil";
import {Banner, CardContent, Header, Modal, Plans} from "../components/index";
import {movieHook} from "../store/hooks/hooks";
import useAuth from "../store/hooks/useAuth";
import {modalState} from '../atoms/modalAtom';

const Home = () => {
    const {
        data: trendingMovies,
        isError: isErrorTrending,
        isLoading: isLoadingTrending
    } = movieHook.useGetTrendedMoviesQuery()
    const {
        data: topRated,
        isError: isErrorTopRated,
        isLoading: isLoadingTopRated
    } = movieHook.useGetTopRateMoviesQuery();
    const {
        data: actionMovies,
        isError: isErrorAction,
        isLoading: isLoadingAction
    } = movieHook.useGetActionMoviesQuery();
    const {
        data: horrorMovies,
        isError: isErrorHorror,
        isLoading: isLoadingHorror
    } = movieHook.useGetHorrorMoviesQuery();
    const {
        data: comedyMovies,
        isError: isErrorComedy,
        isLoading: isLoadingComedy
    } = movieHook.useGetComedyMoviesQuery();
    const {
        data: romanceMovies,
        isError: isErrorRomance,
        isLoading: isLoadingRomance
    } = movieHook.useGetRomanceMoviesQuery();
    const {
        data: documentaries,
        isError: isErrorDocumentary,
        isLoading: isLoadingDocumentary
    } = movieHook.useGetDocumentaryMoviesQuery();
    const {loading} = useAuth();
    const showModal = useRecoilValue(modalState);
    const subscription = false;

    if (loading || subscription) return 'loading...';
    if (!subscription) return <Plans/>
    return (
        <div className={`relative h-screen bg-gradient-to-b  lg:h-[150vh] ${showModal && '!h-screen overflow-hidden'}`}>
            <Head>
                <title>kekflix</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className="pl-4 pb-20 lg:space-y-24 lg:pl-16 lg:py-10">
                {!isLoadingTrending && trendingMovies && <Banner netflixOriginals={trendingMovies.results}/>}
                <section className="space-y-24">
                    {!isLoadingTrending && trendingMovies &&
                        <CardContent title="Trending Now" movies={trendingMovies.results}/>}
                    {topRated && !isLoadingTopRated && <CardContent title="Top Rated" movies={topRated.results}/>}
                    {!isLoadingAction && actionMovies &&
                        <CardContent title="Action Thrillers" movies={actionMovies.results}/>}
                    {/* My List */}
                    {!isLoadingComedy && comedyMovies && <CardContent title="Comedies" movies={comedyMovies.results}/>}
                    {!isLoadingHorror && horrorMovies &&
                        <CardContent title="Scary Movies" movies={horrorMovies.results}/>}
                    {!isLoadingRomance && romanceMovies &&
                        <CardContent title="Romance Movies" movies={romanceMovies.results}/>}
                    {!isLoadingDocumentary && documentaries &&
                        <CardContent title="Documentaries" movies={documentaries.results}/>}
                </section>
            </main>
            {showModal && <Modal/>}
        </div>
    )
}

export default Home;
