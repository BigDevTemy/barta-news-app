import { useDispatch,useSelector } from "react-redux"
import { Button, Select, Tag ,Form, message} from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchRecords, saveRecords } from "../common"
import { NEWS_AUTHOR_SOURCES, SAVE_AUTHOR, SAVE_CATEGORY, SAVE_SOURCE } from "../../constant/ServerUrl"
import { setUserPreference } from "../../app/reducers/userdetails"
import { clearSourceAuthorDetails, setAuthor, setSource } from "../../app/reducers/author_n_source"

const categories = {
    health: ['hôpital', 'IRM', 'santé', 'médecine', 'hospital', 'health', 'wellness', 'fitness', 'doctor', 'medical'],
    logistics: ['logistique', 'supply', 'transport', 'delivery', 'shipping', 'warehouse', 'logistics'],
    politics: ['election', 'government', 'president', 'policy', 'parliament', 'law', 'politician'],
    technology: ['tech', 'ai', 'robot', 'software', 'gadget', 'innovation', 'digital', 'machine learning', 'blockchain','cyber'],
    sports: ['football', 'basketball', 'soccer', 'tennis', 'cricket', 'sports', 'team', 'athlete', 'stadium', 'game', 'tournament', 'match'],
    entertainment: ['movie', 'film', 'actor', 'actress', 'celebrity', 'music', 'concert', 'show', 'theater', 'album', 'performance', 'hollywood', 'broadway'],
    travel: ['travel', 'tourism', 'vacation', 'trip', 'holiday', 'destination', 'tourist', 'hotel', 'flight', 'airline', 'journey', 'adventure', 'explore', 'resort', 'cruise']
  };
const Index = ()=>{
    const {userdetails} = useSelector((state)=>state.userdetails)
    const {author,source} = useSelector((state)=>state.author_n_source)
    const dispatch = useDispatch();
    const [editAuthor,isEditAuthor] = useState(false)
    const [selectedAuthor,isSelectedAuthor] = useState([])
    const [editSource,isEditSource] = useState(false)
    const [selectedSource,isSelectedSource] = useState([])

    const [editCategory,isEditCategory] = useState(false)
    const [selectedCategory,isSelectedCategory] = useState([])

    const [categories,isCategory] = useState(['health','logistics','politics','technology','sport','entertainment','travel']);
    const [allAuthors,setAllAuthors] = useState(author);
    const [allSource,setAllSource] = useState(source);

    const {Option} = Select;
    const [mount,setMount] = useState(true)
    const [loading,isLoading] = useState(false)
    
    const navigate = useNavigate();
    const {form} = Form.useForm();


    // console.log("Source",userdetails)
    // console.log("Author",author)

    useEffect(()=>{
        let timeOutId
        if(!userdetails){
            navigate('/')
        }

        if(userdetails){
            
            timeOutId = setTimeout(() => {
                mountedRequests()
            }, 100);
        }

        return () => {
           
            clearTimeout(timeOutId);
            setMount(false);

        }
    },[userdetails])


    const mountedRequests = async () => {
        if (mount) {
           getNewsAuthorSources();
           //dispatch(clearSourceAuthorDetails())
        }
    }



    useEffect(() => {
        if (userdetails?.user_preference?.preferred_categories) {
          isSelectedCategory(JSON.parse(userdetails.user_preference.preferred_categories));
        }
      }, [userdetails]);

      const getNewsAuthorSources = ()=>{
        fetchRecords(NEWS_AUTHOR_SOURCES).then(res=>{
           // console.log(res.data)
            if(res.success){
                if(res?.data?.length > 0){
                    res.data?.map((d,index)=>{
                        const authors = JSON.parse(d.authors); 
                        const source = JSON.parse(d.source); 
                        if(authors?.length > 0){
                           //console.log(JSON.parse(d.authors)[0])
                           dispatch(setAuthor(JSON.parse(d.authors)[0]))
                        }
                        if(source){
                           
                            //console.log('source',JSON.parse(d.source))
                            dispatch(setSource(JSON.parse(d.source)))
                        }
                       
                    })
                }
            }
        })
        .catch(error=>{
            console.log(error)
        })
      }     
  
    

    const handleSaveCategory = ()=>{
       
        let selectedCategories = JSON.stringify(selectedCategory)
        isLoading(true)
        saveRecords(SAVE_CATEGORY,{selectedCategories}).then(res=>{
            isLoading(false)
            if(res.success){
                message.info('Category Saved');
                dispatch(setUserPreference(res.data))
                isEditCategory(false)
            }
        })
        .catch(error=>{
            isLoading(false)
                console.log(error)
        });
        
    }
    
    const handleSaveSource = ()=>{
       
        let selectedSources = JSON.stringify(selectedSource)
        isLoading(true)
        saveRecords(SAVE_SOURCE,{selectedSources}).then(res=>{
            isLoading(false)
            if(res.success){
                message.info('Prefered Source(s) Saved');
                dispatch(setUserPreference(res.data))
                isEditSource(false)
            }
        })
        .catch(error=>{
            isLoading(false)
                console.log(error)
        });
        
    }
    
    const handleSaveAuthor = ()=>{
       
        let selectedAuthors = JSON.stringify(selectedAuthor)
        isLoading(true)
        saveRecords(SAVE_AUTHOR,{selectedAuthors}).then(res=>{
            isLoading(false)
            if(res.success){
                message.info('Prefered Author(s) Saved');
                dispatch(setUserPreference(res.data))
                isEditAuthor(false)
            }
        })
        .catch(error=>{
            isLoading(false)
                console.log(error)
        });
        
    }

    const handleSelectedCategory = (e)=>{
       isSelectedCategory(e)
    }

    const handleSelectAuthor = (e)=>{
        isSelectedAuthor(e)
    }
    const handleSelectSource = (e)=>{
        isSelectedSource(e)
    }

    return (
        <div className="w-full h-full flex flex-col justify-center bg-gray-300 p-20">
            <div className="w-full min-h-48 h-full bg-white rounded-xl mb-4 p-8 mb-8">
                <div className="text-2xl font-semibold">Basic Information</div>
                <small>Manage your personal information</small>
                <hr className="mt-4"/>
                <div className="w-full flex items-center gap-12 mt-4">
                    <div className="text-md ">Display name</div>
                    <div className="text-md">{userdetails?.user?.name}</div>

                </div>
                <hr className="mt-4"/>
                <div className="w-full flex items-center gap-12 mt-4">
                    <div className="text-md">Email Address</div>
                    <div className="text-md">{userdetails?.user?.email}</div>

                </div>
                <hr className="mt-4"/>

            </div>
           
            <div className="w-full min-h-48 h-full bg-white rounded-xl mb-8 p-8">
                <div className="text-2xl font-semibold">News Preference</div>
                <small>Manage your news preference</small>
                <hr className="mt-4"/>
                <div className="w-full flex items-center mt-4">
                    <div className="text-md flex-[0.2]">Authors</div>
                    <div className="text-md flex-[0.4]">
                    {
                        userdetails?.user_preference == null  && !editAuthor && <i>No Author(s) Set</i>
                       }
                        {
                        !editAuthor && userdetails?.user_preference?.preferred_authors && JSON.parse(userdetails?.user_preference?.preferred_authors).map((d,index)=>{
                            return <Tag key={index} color="blue">{d}</Tag>
                        })
                        
                       }
                         {
                        editAuthor &&  
                        
                        <Select
                        showSearch
                        mode="multiple"
                        className="w-full flex-[0.5]"
                        optionFilterProp="children"
                        placeholder="Search author(s)"
                        onChange={handleSelectAuthor}
                        value={selectedAuthor}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA.children.toLowerCase()).localeCompare(optionB.children.toLowerCase())
                        }
                      >
                        {allAuthors && allAuthors.length > 0 && allAuthors.map((authors, index) => (
                          <Option key={index} value={authors?.name}>
                            {authors?.name}
                          </Option>
                        ))}
                      </Select>
                       }

                    </div>
                    <div className=" w-full flex-1 justify-end flex">
                        
                        {!editAuthor && <Button type="dashed" onClick={()=>isEditAuthor(true)}>Edit</Button> } 
                        {editAuthor && <Button type="dashed" loading={loading} onClick={()=>handleSaveAuthor()}>Save</Button> } 
                    </div>

                </div>
                <hr className="mt-4"/>
                <div className="w-full flex items-center  mt-4">
                    <div className="text-md flex-[0.2]">Categories</div>
                    <div className="text-md flex-[0.4]">
                       {
                        userdetails?.user_preference == null  && !editCategory && <i>No Category Set</i>
                       }
                       {
                        !editCategory && userdetails?.user_preference?.preferred_categories && JSON.parse(userdetails?.user_preference?.preferred_categories).map((d,index)=>{
                            return <Tag key={index} color="magenta">{d}</Tag>
                        })
                        
                       }
                       {
                        editCategory &&  
                        
                        <Select
                        showSearch
                        mode="multiple"
                        className="w-full flex-[0.5]"
                        optionFilterProp="children"
                        placeholder="Search category"
                        onChange={handleSelectedCategory}
                        value={selectedCategory}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA.children.toLowerCase()).localeCompare(optionB.children.toLowerCase())
                        }
                      >
                        {categories && categories.length > 0 && categories.map((category, index) => (
                          <Option key={index} value={category}>
                            {category}
                          </Option>
                        ))}
                      </Select>
                       }

                    </div>
                    <div className=" w-full flex-1 justify-end flex">
                       {!editCategory && <Button type="dashed" onClick={()=>isEditCategory(true)}>Edit</Button> } 
                       {editCategory && <Button type="dashed" loading={loading} onClick={()=>handleSaveCategory()}>Save</Button> } 
                       
                    </div>

                </div>
                <hr className="mt-4"/>

                <div className="w-full flex items-center  mt-4">
                    <div className="text-md flex-[0.2]">Source(s)</div>
                    <div className="text-md flex-[0.4]">

                    {
                        !editSource && userdetails?.user_preference?.preferred_source && JSON.parse(userdetails?.user_preference?.preferred_source).map((d,index)=>{
                            return <Tag key={index} color="green">{d}</Tag>
                        })
                        
                       }
                    {
                        editSource &&  
                        
                        <Select
                        showSearch
                        mode="multiple"
                        className="w-full flex-[0.5]"
                        optionFilterProp="children"
                        placeholder="Search source"
                        onChange={handleSelectSource}
                        value={selectedSource}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA.children.toLowerCase()).localeCompare(optionB.children.toLowerCase())
                        }
                      >
                        {allSource && allSource.length > 0 && allSource.map((allsrc, index) => (
                          <Option key={index} value={allsrc?.title}>
                            {allsrc?.title}
                          </Option>
                        ))}
                      </Select>
                       }

                    </div>
                    <div className=" w-full flex-1 justify-end flex">
                     
                        {!editSource && <Button type="dashed" onClick={()=>isEditSource(true)}>Edit</Button> } 
                        {editSource && <Button type="dashed" loading={loading} onClick={()=>handleSaveSource()}>Save</Button> } 
                    </div>

                </div>

            </div>
            <div className="w-full min-h-48 h-full bg-white rounded-xl mb-8 p-8">
                <div className="text-2xl font-semibold">Manage Account</div>
               
                <hr className="mt-4"/>
                <div className="w-full flex items-center  mt-4">
                   
                    <Button className="bg-red-500 text-white" > <DeleteOutlined/> Delete Account</Button>

                </div>
               
                

            </div>
        </div>
    )
}

export default Index