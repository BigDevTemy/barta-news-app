import {useSelector} from 'react-redux'
import { useState } from 'react';
import { Image } from 'antd';

const Index = ()=>{
    const {topnewsheadline} = useSelector((state)=>state.topnewsheadline);
    const [loading,isLoading] = useState(false)
    const [topNews,setTopNews] = useState(topnewsheadline)
    console.log('topnewsheadlineState',topnewsheadline)
    return (
        <>
             <div className='w-1/4 h-12 bg-red-700  p-4 text-white text-xl mt-8 mb-2'>
                Top Headlines
            </div>
            <div className="w-full flex h-[80vh]">
           
          {topnewsheadline && (
            <>
           
                <div className="flex flex-col flex-1 h-full ">
                    <div className="w-full h-1/2 text-black relative border-2 border-white group overflow-hidden cursor-pointer">
                        <div>
                            <img 
                                src={topnewsheadline[0]?.url_to_image} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                            {topnewsheadline[0]?.title}
                        </div>
                    </div>
                    <div className="w-full h-1/2 text-black relative border-2 border-white group overflow-hidden cursor-pointer">
                        <div>
                            <img 
                                src={topnewsheadline[1]?.url_to_image} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                            {topnewsheadline[1]?.title}
                        </div>
                    </div>
                </div>
                <div className="flex-1 h-full text-black relative border-2 border-white group overflow-hidden">
                    <div className="bg-black h-full cursor-pointer">
                        <img 
                            src={topnewsheadline[2]?.url_to_image} 
                            className="flex-1 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                        {topnewsheadline[2]?.title}
                    </div>
                </div>
                <div className="flex-1 h-full">  
                    <div className="w-full h-1/2 text-black relative border-2 border-white group overflow-hidden cursor-pointer">
                        <div className='cursor-pointer'>
                            <img 
                                src={topnewsheadline[3]?.url_to_image} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                            {topnewsheadline[3]?.title}
                        </div>
                    </div>
                    <div className="w-full h-1/2 text-black relative border-2 border-white group overflow-hidden cursor-pointer">
                        <div>
                            <img 
                                src={topnewsheadline[4]?.url_to_image} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                            {topnewsheadline[4]?.title}
                        </div>
                    </div>
                </div>
            </>
        )}

            
        </div>
        
        
        </>
        
        
    )
}

export default Index