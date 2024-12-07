import {useSelector} from 'react-redux'
import { useState } from 'react';
import { Image } from 'antd';
import {FieldTimeOutlined} from '@ant-design/icons'
const Index = () =>{
    const breaker = useSelector((state)=>state.topnewsheadline.break)
    const [loading,isLoading] = useState(false)
    
    const  truncate=(str, length = 50, ending = '...')=> {
        if (str?.length > length) {
          return str.slice(0, length) + ending;
        }
        return str;
      }

    return (
        <>
            <div className='w-full h-full lg:w-1/4 lg:h-12 bg-green-700  p-4 text-white text-xl mt-8 mb-8'>
                Recent News
            </div>
            {
                breaker && 
                <div className="w-full h-full flex flex-col lg:flex-row gap-2 ">
                <div className="flex-1 relative">
                    <div>
                            <img 
                                src={breaker[0]?.image} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                            {truncate(breaker[0]?.title)}
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div>
                            <img 
                                src={breaker[1]?.image} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                           
                            {truncate(breaker[1]?.title)}
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div>
                            <img 
                                src={breaker[2]?.image} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-opacity-75 bg-black text-white p-2 transition-colors duration-300 group-hover:text-red-500">
                            
                            {truncate(breaker[2]?.title)}
                    </div>
                </div>
            </div>
            }
            {
                 !breaker && <div className='text-black font-bold'>No Data Found!</div>
            }
            
        </>
        
    )
}

export default Index