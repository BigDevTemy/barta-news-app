import { useEffect,useState } from 'react'
import TopHeadLine from './TopHeadlines'
import TopStories from './TopStories'
import RecentNews from './RecentNew'
import Featurednews from './FeaturedNews'
import Stickers from './sticker'
import { useDispatch,useSelector } from 'react-redux'
import { fetchRecords } from '../../common'
import { GET_TOP_HEADLINE } from '../../../constant/ServerUrl'
import { setBreak, setFeaturedNews, setLifeStyle, setRecentNews, setTopnewsHeadline, setTopstories } from '../../../app/reducers/topnewsheadline'
const Index=()=>{
    const [mount,setMount] = useState(true)
    const dispatch = useDispatch();
    useEffect(()=>{
        let timeoutId = setTimeout(()=>{
            mountedRequests();
        },100)

        return ()=>{
            clearTimeout(timeoutId)
            setMount(false)
        }
    },[])


    const mountedRequests = ()=>{
        if(mount){
            getTopHeadLineNews();
        }
    }

    const getTopHeadLineNews = ()=>{
        fetchRecords(GET_TOP_HEADLINE).then(res=>{
            console.log(res.data)
            if(res.success){
                dispatch(setTopnewsHeadline(res.data.topheadline))
                dispatch(setBreak(res.data.break))
                dispatch(setTopstories(res.data.topStories))
                dispatch(setFeaturedNews(res.data.featurednews))
                dispatch(setRecentNews(res.data.recentNews))
                dispatch(setLifeStyle(res.data.lifestyle))

            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="w-full h-full px-20">
            {/* <Stickers/> */}
            <TopHeadLine/>
            <TopStories/>
            <RecentNews/>
            <Featurednews/>
        </div>
    )
}

export default Index