import React, {useEffect, useState} from 'react'
import { DataState } from '../../context/ContextProvider'
import ProgressBar from '../../components/ProgressBar';
import CustomBox from '../../components/CustomBox';
import { useNavigate } from 'react-router-dom';
import {BsCheckCircleFill, BsFillXCircleFill} from 'react-icons/bs'
import { getAnalizedData } from '../../apis/api';
import {ImSpinner9} from 'react-icons/im'

const AnalizedResult = () => {
    const [analizedData, setAnalizedData] = useState([])
    const {requestUrl, taskId} = DataState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async() =>{
            setLoading(true)
            if (taskId){
                try {
                    const res = await getAnalizedData(taskId)
                    setAnalizedData(res)
                    // console.log(res)
                    setLoading(false)
                } catch (error) {
                    // console.log(error)
                }
            }else{
                // console.log('Task id not provided')
                setLoading(false)
                navigate('/')
            }
        }
        fetchData()
    },[taskId])


    if (loading){
        return (
            <div className="full-loader">
                <div>
                    <h1>Please wait data is scanning</h1>
                    <div style={{width: "100%", textAlign: "center"}}>{loading ? <ImSpinner9/> : ''}</div>
                </div>
                
            </div>
        )
    }

    const metaData = 
            (analizedData?.result && 
            analizedData.result[0]?.items &&
            analizedData.result[0]?.items[0]?.meta) ?? {};
    const items = 
            (analizedData?.result && 
            analizedData.result[0]?.items &&
            analizedData.result[0]?.items[0]) ?? [];
        
    return (
        <>
        <div className='container'>
            <h1 className='requested-url' style={{textAlign:'center', marginTop: '50px', padding: '5px 15px'}}>
                Results for {requestUrl}
            </h1>
        </div>
        <div className='container'>
            <ProgressBar 
                percentage={items?.onpage_score}
                title={'On-Page Score'}
            />
        </div>


        <div className='onpage-results__container container'>
            <div className='onpage-results__header'>
                <h2>OnPage Results</h2>
                <div>{items?.onpage_score}%</div>
            </div>
            <div className='onpage-results__values-content'>
                <CustomBox>
                    <p>{metaData?.internal_links_count}</p>
                    <p>Internal Links</p>
                </CustomBox>
                <CustomBox>
                    <p>{metaData?.external_links_count}</p>
                    <p>External Links</p>
                </CustomBox>
                <CustomBox>
                    <p>{metaData?.images_count}</p>
                    <p>Number of Images</p>
                </CustomBox>
                <CustomBox>
                    <p>{metaData?.images_size}</p>
                    <p>Image Size</p>
                </CustomBox>
                <CustomBox>
                    <p>{metaData?.scripts_count}</p>
                    <p>Scripts</p>
                </CustomBox>
                <CustomBox>
                    <p>{metaData?.scripts_size}</p>
                    <p>Scripts Size</p>
                </CustomBox>
                <CustomBox>
                    <p>{metaData?.content?.plain_text_size}</p>
                    <p>Plain Text Size</p>
                </CustomBox> 
                <CustomBox>
                    <p>{metaData?.content?.plain_text_rate.toFixed(3)}</p>
                    <p>Plain Text Rate</p>
                </CustomBox>
                <CustomBox>
                    <p>{metaData?.content?.plain_text_word_count}</p>
                    <p>Plain Text Word Count</p>
                </CustomBox> 
                <CustomBox>
                    <p>{metaData?.content?.automated_readability_index?.toFixed(3)}</p>
                    <p>Automated Readability Index</p>
                </CustomBox> 
                <CustomBox>
                    <p>{metaData?.content?.coleman_liau_readability_index?.toFixed(3)}</p>
                    <p>Coleman Liau Readability Index</p>
                </CustomBox> 
                <CustomBox>
                    <p>{metaData?.content?.dale_chall_readability_index?.toFixed(3)}</p>
                    <p>Dale Chall Readability Index</p>
                </CustomBox> 
                <CustomBox>
                    <p>{metaData?.content?.description_to_content_consistency?.toFixed(3)}</p>
                    <p>Description to Content Consistency</p>
                </CustomBox> 
                <CustomBox>
                    <p>{metaData?.content?.flesch_kincaid_readability_index?.toFixed(3)}</p>
                    <p>Flesch Kincaid Readability Index</p>
                </CustomBox> 
                <CustomBox>
                    <p>{metaData?.content?.meta_keywords_to_content_consistency?.toFixed(3)}</p>
                    <p>Meta Keywords to Content Consistency</p>
                </CustomBox> 
            </div>
            <div className='onpage-results__text-content'>
                <CustomBox className="text-content__item">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}} >
                        {items.duplicate_content ? <BsCheckCircleFill style={{background: 'white', color: "green"}}/> : <BsFillXCircleFill style={{background: 'white', color: 'red'}}/>}
                    </div>
                    <div>
                        <h4>Duplicate Title</h4>
                        <p>Duplicate title tags are bad for SEO. They confuse search engines and make it harder to rank for specific keywords.</p>
                    </div>
                </CustomBox>
                <CustomBox className="text-content__item">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}} >
                        {items.duplicate_description ? <BsCheckCircleFill style={{background: 'white', color: "green"}}/> : <BsFillXCircleFill style={{background: 'white', color: 'red'}}/>}
                    </div>
                    <div>
                        <h4>Duplicate Description</h4>
                        <p>Duplicate meta descriptions are bad for SEO. They confuse search engines and make it harder to rank for specific keywords.</p>
                    </div>
                </CustomBox>
                <CustomBox className="text-content__item">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}} >
                        {items.duplicate_content ? <BsCheckCircleFill style={{background: 'white', color: "green"}}/> : <BsFillXCircleFill style={{background: 'white', color: 'red'}}/>}
                    </div>
                    <div>
                        <h4>Duplicate Content</h4>
                        <p>Duplicate content is bad for SEO. It confuses search engines and makes it harder to rank for specific keywords.</p>
                    </div>
                </CustomBox>
                <CustomBox className="text-content__item">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}} >
                        {items.size < 20000 ? <BsCheckCircleFill style={{background: 'white', color: "green"}}/> : <BsFillXCircleFill style={{background: 'white', color: 'red'}}/>}
                    </div>
                    <div>
                        <h4>Size</h4>
                        <p>The size of your page is too large. This can negatively impact your page load speed and user experience.</p>
                    </div>
                </CustomBox>
                <CustomBox className="text-content__item">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}} >
                        {items.cache_control?.cachable ? <BsCheckCircleFill style={{background: 'white', color: "green"}}/> : <BsFillXCircleFill style={{background: 'white', color: 'red'}}/>}
                    </div>
                    <div>
                        <h4>Cache Control</h4>
                        <p>Your page does not have a cache control header. This can negatively impact your page load speed and user experience.</p>
                    </div>
                </CustomBox>
                <CustomBox className="text-content__item">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px'}} >
                        {items.broken_links ? <BsCheckCircleFill style={{background: 'white', color: "green"}}/> : <BsFillXCircleFill style={{background: 'white', color: 'red'}}/>}
                    </div>
                    <div>
                        <h4>Is Broken</h4>
                        <p>Your page has broken links. This can negatively impact your page load speed and user experience.</p>
                    </div>
                </CustomBox>
            </div>
        </div>


        <div className="tags container">
            <h2 style={{marginTop: '20px', padding: '20px 0px'}}>H Tags</h2>
            <div className="h-tags">
                {metaData?.htags?.h1 && <CustomBox>
                    <h3>We found #{metaData.htags.h1.length} H1 tags on this page.</h3>
                    {metaData.htags.h1.length > 0 && 
                    metaData.htags.h1.map((tags, i) => (
                            <p key={i}><span>{i+1}. </span>{tags}</p>
                            ))}
                </CustomBox>}
                {metaData?.htags?.h2 && <CustomBox>
                    <h3>We found #{metaData.htags.h2.length} H2 tags on this page.</h3>
                    {metaData.htags.h2.length > 0 && 
                    metaData.htags.h1.map((tags, i) => (
                            <p key={i}><span>{i+1}. </span>{tags}</p>
                            ))}
                </CustomBox>}
                {metaData?.htags?.h3 && <CustomBox>
                    <h3>We found #{metaData.htags.h3.length} H3 tags on this page.</h3>
                    {metaData.htags.h3.length > 0 && 
                    metaData.htags.h3.map((tags, i) => (
                            <p key={i}><span>{i+1}. </span>{tags}</p>
                            ))}
                </CustomBox>}
                {metaData?.htags?.h4 && <CustomBox>
                    <h3>We found #{metaData.htags.h4.length} H4 tags on this page.</h3>
                    {metaData.htags.h4.length > 0 && 
                    metaData.htags.h4.map((tags, i) => (
                            <p key={i}><span>{i+1}. </span>{tags}</p>
                            ))}
                </CustomBox>}
                {metaData?.htags?.h5 && <CustomBox>
                    <h3>We found #{metaData.htags.h5.length} H5 tags on this page.</h3>
                    {metaData.htags.h5.length > 0 && 
                    metaData.htags.h5.map((tags, i) => (
                            <p key={i}><span>{i+1}. </span>{tags}</p>
                            ))}
                </CustomBox>}
                {metaData?.htags?.h6 && <CustomBox>
                    <h3>We found #{metaData.htags.h6.length} H6 tags on this page.</h3>
                    {metaData.htags.h6.length > 0 && 
                    metaData.htags.h6.map((tags, i) => (
                            <p key={i}><span>{i+1}. </span>{tags}</p>
                            ))}
                </CustomBox>}
            </div>
        </div>


        {items?.page_timing && 
        <div className="container">
            <h2>Speed Insights</h2>
            <div className='speed-insights'>
                <CustomBox>
                    <p>{items?.page_timing?.time_to_secure_connection}ms</p>
                    <p>Time to Secure Connection</p>
                </CustomBox>
                <CustomBox>
                    <p>{items?.page_timing?.waiting_time}ms</p>
                    <p>Waiting Time</p>
                </CustomBox>
                <CustomBox>
                    <p>{items?.page_timing?.download_time}ms</p>
                    <p>Download Time</p>
                </CustomBox>
                <CustomBox>
                    <p>{items?.page_timing?.time_to_interactive}ms</p>
                    <p>Time to Interactive</p>
                </CustomBox>
                <CustomBox>
                    <p>{items?.page_timing?.dom_complete}ms</p>
                    <p>DOM Complete</p>
                </CustomBox>
                <CustomBox>
                    <p>{items?.page_timing?.largest_contentful_paint}ms</p>
                    <p>Largest Contentful Paint</p>
                </CustomBox>
            </div>
        </div>}
        <div style={{marginBottom: '100px'}}></div>
        </>
  )
}

export default AnalizedResult