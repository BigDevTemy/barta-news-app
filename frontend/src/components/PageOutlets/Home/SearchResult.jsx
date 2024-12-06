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
    return(
        <div className="w-full h-full min-h-[50vh] flex flex-col px-20">
            <h1 className="text-2xl mb-4 mt-10">Search Result(s)</h1>
            {
                data && data?.length > 0 ?
                    <>
                             <List
                                bordered
                                dataSource={currentData}
                                renderItem={(item) => (
                                    <List.Item>
                                        <div className="w-full flex h-full">
                                                <div className="rounded-xl border-2 border-black"><img src={item?.image} className="w-[80px] h-[80px] rounded-md "/></div>
                                                <div className="text-md font-bold ml-2">{item?.title}</div>
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