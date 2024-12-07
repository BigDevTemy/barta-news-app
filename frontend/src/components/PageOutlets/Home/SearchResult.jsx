import { Pagination,List } from "antd"
import { useLocation } from "react-router-dom";
import { useState } from "react";
const Index = ()=>{
    const location = useLocation();
    const {data} = location.state || []
    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
      };

      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 5; // Number of items per page
  
      // Calculate the total number of pages
      const totalPages = Math.ceil(data?.length / pageSize);
  
      // Calculate the current data to display
      const currentData = data?.length > 0 ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize):[];
  
      const handlePageChange = (page) => {
          setCurrentPage(page);
      };

      const  truncate=(str, length = 200, ending = '...')=> {
        if (str?.length > length) {
          return str.slice(0, length) + ending;
        }
        return str;
      }
    return(
        <div className="w-full h-full lg:min-h-[50vh] flex flex-col lg:px-20 px-5">
            <h1 className="text-2xl mb-4 mt-10 text-md sm:text-sm">Search Result(s)</h1>
            {
                data && data?.length > 0 ?
                    <>
                             <List
                                bordered
                                dataSource={currentData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div className="w-full flex h-full flex items-center">
                                                <div className=""><img src={item?.image} className="w-[40px] h-[40px] flex-1 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 "/></div>
                                                <div className="w-full">
                                                    <div className="text-md font-bold ml-2 lg:w-1/2 w-full">{item?.title}</div>
                                                    <div className="text-sm  ml-2 lg:w-2/3 w-full" >{truncate(item?.body)}</div>
                                                    
                                                </div>
                                                
                                        </div>
                                        
                                    </List.Item>
                                )}
                            />

                            <Pagination
                            className="mt-10 mb-10"
                                current={currentPage}
                                pageSize={pageSize}
                                total={data.length}
                                onChange={handlePageChange}
                                showSizeChanger={false} // Optional: hide page size changer
                            />

                    </>:
                    <div className="text-xl font-semibold">No Result Found</div>
               
            }
           
        </div>
    )
}

export default Index