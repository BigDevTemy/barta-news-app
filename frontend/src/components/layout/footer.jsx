import { FacebookOutlined, GooglePlusCircleFilled, InstagramFilled, LinkedinFilled, MailOutlined, PhoneFilled, PhoneOutlined, PinterestFilled, SearchOutlined, TwitterOutlined } from "@ant-design/icons"
import { Image } from "antd"
import Logo from '../../assets/images/big-logo_light-1.png'

const Index = ()=>{
    return(
        <div className="w-full min-h-48 h-full bg-black px-20">
           <div className="w-full flex mt-10">
            <div className="flex-1  flex-column">
                <div className="text-white text-xl">
                    About Company
                    <hr className="w-20 mt-4 border-2 border-red-500"/>
                </div>
                
                <div className="text-white text-sm mt-4">
                
                    On August 8, 1970, Barta-new (Nigeria) Limited was registered under the Companies Act of 1968 to engage in the business of publishing newspapers, magazines and other periodicals. It was designed to inform, educate and entertain Nigerians and the world at large.
                </div>
                <div className="w-full flex w-[100%] mt-10">
               
                    <FacebookOutlined className="flex-1 cursor-pointer text-white"/>
                    <TwitterOutlined className="flex-1 cursor-pointer text-white"/>
                    <GooglePlusCircleFilled className="flex-1 cursor-pointer text-white"/>
                    <LinkedinFilled className="flex-1 cursor-pointer text-white"/>
                    <PinterestFilled className="flex-1 cursor-pointer text-white"/>
                    <InstagramFilled className="flex-1 cursor-pointer text-white"/>
                    
                </div>
            </div>
            <div className="flex-1 flex-column">
                <div className="text-white text-xl">
                    Recent Blog Post
                    <hr className="w-20 mt-4 border-2 border-red-500"/>

                </div>
                <div className="">
                        No Post(s)
                </div>
            </div>
            <div className="flex-1 flex-column">
                <div className="text-white text-xl">
                    Popular Categories
                    <hr className="w-20 mt-4 border-2 border-red-500"/>

                </div>
                <div className="mt-4">
                        <div className="text-white text-sm mb-2">Sports</div>
                        <div className="text-white text-sm mb-2">Entertainment</div>
                        <div className="text-white text-sm mb-2">Business</div>
                        <div className="text-white text-sm mb-2">World News</div>
                        <div className="text-white text-sm mb-2">Fashion/Style</div>
                        <div className="text-white text-sm mb-2">Travel</div>
                </div>
            </div>
            <div className="flex-1 flex-column">
                <div className="text-white text-xl">
                    Tags
                    <hr className="w-20 mt-4 border-2 border-red-500"/>

                </div>
                <div className="mt-4">
                    <div className="flex justify-between cursor-pointer">
                        <div className="text-white text-sm mb-2 w-full border-2 border-blue-100 text-center p-2">Sports</div>
                        <div className="text-white text-sm mb-2 w-full border-2 border-blue-100 text-center p-2">Entertainment</div>
                    </div>
                    <div className="flex justify-between cursor-pointer">
                        <div className="text-white text-sm mb-2 w-full border-2 border-blue-100 text-center p-2">Business</div>
                        <div className="text-white text-sm mb-2 w-full border-2 border-blue-100 text-center p-2">World News</div>
                    </div>

                    <div className="flex justify-between cursor-pointer">
                        <div className="text-white text-sm mb-2 w-full border-2 border-blue-100 text-center p-2">Fashion/Style</div>
                        <div className="text-white text-sm mb-2 w-full border-2 border-blue-100 text-center p-2">Travel</div>
                    </div>
                        
                </div>
            </div>
            
           
           </div>
           <hr className="mt-4 border-custom-gray"/>
           <div className="h-48 flex flex-col items-center">
                  <div className="w-full mt-4 flex justify-center">
                    <Image src={Logo}  style={{width:'50%'}} />
                  </div>
            

                  
                  <div className="w-full text-sm text-white flex justify-center">
                        © Copyright Barta 2020. Designed and Developed by BigdevTemy
                  </div>
           </div>
        </div>
    )
}

export default Index


