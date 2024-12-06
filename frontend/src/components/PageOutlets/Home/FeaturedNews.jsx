import {useSelector} from 'react-redux'
import { useState } from 'react';
import { Image } from 'antd';
import {FieldTimeOutlined} from '@ant-design/icons'
const Index = () =>{
    const {featurednews} = useSelector((state)=>state.topnewsheadline)
    const [loading,isLoading] = useState(false)
    
    
    return (
        <>
            <div className='w-1/4 h-12 bg-gray-700 p-4 text-white text-xl mt-12 mb-8'>
                Featured News
            </div>
            <div className="w-full h-[80vh] flex gap-4 mb-10">
                <div className='flex-[0.3] relative'>
                    <div className="bg-black h-full cursor-pointer">
                        <img 
                            src={featurednews[0]?.image} 
                            className="flex-1 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                        {featurednews[0]?.title}
                    </div>
                </div>
                <div className='flex-[0.7] grid grid-cols-3 gap-2'>
                    <div className='flex-1 flex flex-col w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={featurednews[1]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {featurednews[1]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{featurednews[1]?.title} </div>
                                </div>
                    </div>
                    <div className='flex-1 flex flex-col w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={featurednews[2]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {featurednews[2]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{featurednews[2]?.title} </div>
                                </div>
                        </div>
                        <div className='flex-1 flex flex-col w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={featurednews[3]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {featurednews[3]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{featurednews[3]?.title} </div>
                                </div>
                        </div>
                        <div className='flex-1 flex flex-col w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={featurednews[4]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {featurednews[4]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{featurednews[4]?.title} </div>
                                </div>
                        </div>
                        <div className='flex-1 flex flex-col w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={featurednews[5]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {featurednews[5]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{featurednews[5]?.title} </div>
                                </div>
                        </div>
                        <div className='flex-1 flex flex-col w-full gap-2 items-center mb-4'>
                                <div className='flex-1'>
                                   <img src={featurednews[6]?.image} className='rounded-md'/>
                                </div>
                                <div className='flex-1'>
                                    <div className='text-gray-700 text-md'><FieldTimeOutlined /> {featurednews[6]?.date} </div>
                                    <div className='text-gray text-sm font-semibold'>{featurednews[6]?.title} </div>
                                </div>
                        </div>
                </div>
            </div>
        </>
        
    )
}

export default Index