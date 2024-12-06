import { FacebookOutlined, GooglePlusCircleFilled, InstagramFilled, LinkedinFilled, Loading3QuartersOutlined, LogoutOutlined, MailOutlined, PhoneFilled, PhoneOutlined, PinterestFilled, SearchOutlined, TwitterOutlined, UserOutlined } from "@ant-design/icons"
import Logo from '../../assets/images/big-logo_light-1.png'
import { Button, Image, Input ,Dropdown, Space, Spin, message} from "antd"
import { SettingOutlined,DownOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { fetchRecords } from "../common"
import { clearUserDetails } from "../../app/reducers/userdetails"
import { LOGOUT } from "../../constant/ServerUrl"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchModal from '../util/modal'

const items = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Logout',
      icon: <LogoutOutlined />,
      extra: '⌘L',
    },
   
    {
      key: '3',
      label: 'Settings',
      icon: <SettingOutlined />,
      extra: '⌘S',
    },
  ];
const Index = ()=>{
    const {userdetails} = useSelector((state)=>state.userdetails);
    const[loading,isLoading] = useState(false)
    const [show,isShow] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(userdetails?.user)

    const handleSearch = ()=>{
      isShow(true)
    }

    

    
    const handleMenuClick = (e) => {
        console.log('Item clicked:', e.key); // Logs the key of the clicked item
        switch (e.key) {
          case '1':
            // LogoutUser();
            // break;
          case '2':
            LogoutUser();
            break;
          case '3':
            navigate('/user/settings')
            break;
          default:
            console.log('Unknown action');
        }
      };

      const LogoutUser = ()=>{
        isLoading(true)
        fetchRecords(LOGOUT,userdetails?.token).then(res=>{
            console.log(res)
            isLoading(false)
            if(res.success){
                dispatch(clearUserDetails());
                localStorage.clear();
                message.success('User successfully logout')
                
            }
            else{
                message.error('An error occurred, pls try again')
            }
           
        })
        .catch(error=>{
                isLoading(false)

                if (error.response) {
                    // Capture validation or server error
                    message.error('Cannot Logout @ this time')
                    //setErrorMessage(error.response.data.message || 'Something went wrong!');
                  }
                
        })
      }
    return(
        <>
          <SearchModal visible={show} isVisible={isShow}/>        
            <div className="w-full h-10 bg-custom-gray px-20 flex items-center">
                <div className="flex flex-1">
                    <div className="flex items-center">
                        <div className="mr-2"><PhoneOutlined className="text-red-700" /></div><span className="text-sm">01-90988878</span>
                    </div>

                    <div className="flex items-center ml-4">
                        <div className="mr-2"><MailOutlined className="text-red-700" /></div><span className="text-sm">infor@barta-new.com</span>
                    </div>
                </div>
                <div className="flex flex-1 justify-end items-center">
                    <div className="w-[25%] flex ">
                    <FacebookOutlined className="flex-1 cursor-pointer"/>
                    <TwitterOutlined className="flex-1 cursor-pointer"/>
                    <GooglePlusCircleFilled className="flex-1 cursor-pointer"/>
                    <LinkedinFilled className="flex-1 cursor-pointer"/>
                    <PinterestFilled className="flex-1 cursor-pointer"/>
                    <InstagramFilled className="flex-1 cursor-pointer"/>
                    </div>
                    
                </div>


            <div>
            
            </div>
                
            </div>
            
            <div className="w-full min-h-28 h-full bg-black px-20 flex items-center">  
                <div className="flex-[0.4]">
                    <Link to='/'><img src={Logo} className="w-[25%]"/></Link>
                </div>
                <div className="flex-[0.6] flex items-center ">
                    <Link to='/' className="flex-[0.5] flex justify-center text-white text-sm font-semibold">HOME</Link>
                    <Link className="flex-[0.5] flex justify-center text-white text-sm font-semibold">WORLD</Link>
                    <Link className="flex-[0.5] flex justify-center text-white text-sm font-semibold">POLITICS</Link>
                    <Link className="flex-[0.5] flex justify-center text-white text-sm font-semibold">BUSINESS</Link>
                    <Link className="flex-[0.5] flex justify-center text-white text-sm font-semibold">SPORT</Link>
                    <Link className="flex-[0.5] flex justify-center text-white text-sm font-semibold">HEALTH</Link>
                    <Link className="flex-[0.5] flex justify-center text-white text-sm font-semibold">ENTERTAINMENT</Link>
                    
                    <div className="flex-[0.7] flex items-center bg-white ml-4 rounded-md p-1">
                        <Input className="flex-grow outline-none border-none focus:outline-none focus:ring-0" onClick={()=>handleSearch()} />
                        <SearchOutlined className="text-black ml-2" />
                    </div>

                   
                    {
                        userdetails  ? <Dropdown
                        menu={{
                          items,
                          onClick: handleMenuClick,
                        }}
                      >
                        <Spin spinning={loading}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                          <div className="cursor-pointer ml-4 w-10 h-10 rounded-full bg-white justify-center items-center flex"><UserOutlined className="text-2xl"/></div> 
                            
                            <DownOutlined className="text-white"/>
                          </Space>
                        </a>
                        </Spin>
                      </Dropdown>
                       
                        : <div className="ml-2">
                        <Link to={'user/login'} > <Button type="primary" className="bg-red-700 hover:bg-red-700 active:bg-red-700 focus:bg-red-700">Sign in</Button></Link>
                     </div>
                    }
                    
                </div>
            </div>
        </>
        
    )
}

export default Index