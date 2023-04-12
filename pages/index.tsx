import Head from "next/head"
import {useRecoilValue} from "recoil";
import {Banner, CardContent, Header, Modal, Plans} from "../components/index";
import {movieHook} from "../store/hooks/hooks";
import useAuth from "../store/hooks/useAuth";
import {modalState, movieState} from '../atoms/modalAtom';
import {useSubscription} from "../store/hooks/useSubscription";
import userList from "../store/hooks/userList";

const Home = () => {
    // @ts-ignore
    const {data: trendingMovies, isLoading: isLoadingTrending} = movieHook.useGetTrendedMoviesQuery()
    // @ts-ignore
    const {data: topRated, isLoading: isLoadingTopRated} = movieHook.useGetTopRateMoviesQuery();
    // @ts-ignore
    const {data: actionMovies, isLoading: isLoadingAction} = movieHook.useGetActionMoviesQuery();
    // @ts-ignore
    const {data: horrorMovies, isLoading: isLoadingHorror} = movieHook.useGetHorrorMoviesQuery();
    // @ts-ignore
    const {data: comedyMovies, isLoading: isLoadingComedy} = movieHook.useGetComedyMoviesQuery();
    // @ts-ignore
    const {data: romanceMovies, isLoading: isLoadingRomance} = movieHook.useGetRomanceMoviesQuery();
    // @ts-ignore
    const {data: documentaries, isLoading: isLoadingDocumentary} = movieHook.useGetDocumentaryMoviesQuery();
    const { user } = useAuth();
    const showModal = useRecoilValue(modalState);
    const subscriptions = useSubscription(user);
    const isSubscription = !!subscriptions.length;
    const movie = useRecoilValue(movieState);
    const myList = userList(user?.uid);
    // if (loading || !subscription) return 'loading...';
    if (!isSubscription) return <Plans/>

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
                    {!!myList && <CardContent title={"My List"} movies={myList} />}
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
