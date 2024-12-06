import {useSelector} from 'react-redux'
import { useState } from 'react';
import { Image } from 'antd';
import {FieldTimeOutlined} from '@ant-design/icons'
const Index = ()=>{
    const {topstories} = useSelector((state)=>state.topnewsheadline);
    const {recentnews} = useSelector((state)=>state.topnewsheadline);
    return (
        <>
        <div className='w-1/4 h-12 bg-red-700  p-4 text-white text-xl mt-8 mb-8'>
                Top Stories
        </div>
        {
            topstories && 
            <div className="w-full h-[80vh] px-0 flex gap-3 mb-10">
                <div className="flex-[0.7] h-full flex gap-4">
                    <div className='flex-1 relative'>
                        <div className='h-full'>
                            <img 
                                src={topstories[0]?.image} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                            {topstories[0]?.title}
                        </div>
                    </div>

                    <div className='flex-1  flex-col'>
                        <div className='flex-1 flex w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={topstories[1]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {topstories[1]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{topstories[1]?.title} </div>
                                </div>
                        </div>
                        <div className='flex-1 flex w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={topstories[2]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {topstories[1]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{topstories[2]?.title} </div>
                                </div>
                        </div>
                        <div className='flex-1 flex w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={topstories[3]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {topstories[1]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{topstories[3]?.title} </div>
                                </div>
                        </div>
                        <div className='flex-1 flex w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={topstories[4]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {topstories[1]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{topstories[3]?.title} </div>
                                </div>
                        </div>
                        
                        

                    </div>
                    
                    
                    
                </div>
                <div className="flex-[0.3]  flex-col">
                    <div className='w-full h-12 bg-purple-700  p-4 text-white text-xl mt-0 mb-2'>
                            Recent News
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                        <div className='mb-2'>
                            <div>  <img src={recentnews[0]?.image} className='rounded-md'/></div>
                            <div className='text-sm'> {recentnews[0]?.title}</div>
                        </div>
                        <div className='mb-2'>
                            <div>  <img src={recentnews[1]?.image} className='rounded-md'/></div>
                            <div className='text-sm'> {recentnews[1]?.title}</div>
                        </div>
                        <div className='mb-2'>
                            <div>  <img src={recentnews[2]?.image} className='rounded-md'/></div>
                            <div className='text-sm'> {recentnews[2]?.title}</div>
                        </div>
                        <div className='mb-2'>
                            <div>  <img src={recentnews[3]?.image} className='rounded-md'/></div>
                            <div className='text-sm'> {recentnews[3]?.title}</div>
                        </div>
                        <div className='mb-2'>
                            <div>  <img src={recentnews[4]?.image} className='rounded-md'/></div>
                            <div className='text-sm'> {recentnews[4]?.title}</div>
                        </div>
                        <div className='mb-2'>
                            <div>  <img src={recentnews[5]?.image} className='rounded-md'/></div>
                            <div className='text-sm'> {recentnews[5]?.title}</div>
                        </div>
                        
                    </div>
                </div>
        </div>
        }
        
        
        </>
    )
}

export default Index;