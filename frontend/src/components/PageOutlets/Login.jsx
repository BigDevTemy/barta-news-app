import { Image,Form,Input, Button, message } from 'antd'
import Logo from '../../assets/images/big-logo_light-1.png'
import { Link } from 'react-router-dom'
import { GooglePlusOutlined } from '@ant-design/icons'
import {saveRecords} from '../common'
import { LOGIN } from '../../constant/ServerUrl'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { setUserDetails } from '../../app/reducers/userdetails'

const Index = ()=>{
    const [form] = Form.useForm()
    const[loading,isLoading]=useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userdetails} = useSelector((state)=>state.userdetails);
    const [errorMessage,setErrorMessage] = useState(null)
    useEffect(()=>{
        if(userdetails){
            navigate('/')
        }
    },[userdetails])
    // console.log(userdetails)

    const handleFinish = ()=>{
        setErrorMessage(null)
        form.validateFields ().then(async (values) => {
         
            isLoading(true)
            saveRecords(LOGIN,values).then(res=>{
            console.log(res)
            isLoading(false)
                if(res.success){
                    message.success(`Welcome back, ${res.data?.user?.name}!`);
                    localStorage.setItem('token',JSON.stringify(res.data.token))
                    dispatch(setUserDetails(res.data));
                    form.resetFields();
                    navigate('/')
                }
                else{
                    message.error('Invalid credentials')
                }
            })
            .catch(error=>{
                isLoading(false)
                
                if (error.response) {
                    // Capture validation or server error
                    setErrorMessage(error.response.data.message || 'Something went wrong!');
                  }
                
            })
        })
    }
    return (
        <div className="w-full  h-full flex justify-center bg-custom-gray lg:p-10 p-5">
            <div className="mt-10 w-full lg:w-[50%] h-full bg-black/40 flex flex-col items-center p-4">
                    <img src={Logo} className=' w-1/4 lg:w-1/6'  />
                    <div className='w-full font-bold lg:text-2xl text-white flex justify-center'>Sign in For Barta News Account </div>
                    <div className='font-semibold text-white text-sm'>Don't have an Account ? <Link to='/register/user'>Sign up</Link></div>
                    {errorMessage && <div className=" w-full lg:w-[50%] mt-4 h-10 bg-red-200 text-sm text-black flex justify-center items-center text-semibold">{errorMessage}</div>}
                    <Form
                        className='mt-4 w-2/3'
                        name='register-form'
                        form={form}
                        labelCol={{ span: 44 }} // Set the label column to span the entire width
                        wrapperCol={{ span: 44 }} // Set the wrapper column to span the entire width
                        layout="vertical" // Use vertical layout
                        onFinish={handleFinish}
                     >
                             <Form.Item label='Email Address'  name='email' className='w-full' rules={[{
                                message:'Email address is required',
                                required:true
                            }]}>
                     
                                <Input type="email"  className='p-2'/>

                             </Form.Item>
                             <Form.Item label='Password'  name='password' className='w-full' rules={[{
                                message:'Password is required',
                                required:true
                            }]}>
                     
                                <Input.Password  className='p-2'/>

                             </Form.Item>
                             <div className='text-sm text-center'>By signing up or signing in, you agree to our Terms of Use and have read our Privacy Policy.</div>
                             <div className='w-full flex justify-center items-center mt-4'>
                                <Button htmlType="submit" loading={loading} disabled={loading}  className='w-full h-12 bg-red-700 text-white' >Login</Button>
                             </div>
                             
                    </Form>
                    <div className='w-[70%] mt-4 flex items-center'>
                        <hr className='flex-1 border-1 border-black'/> <span className='ml-2 mr-2 text-white font-semibold'>Or</span> <hr className='flex-1 border-1 border-black'/></div>
                    <div className='w-full flex items-center justify-center mt-10'>
                       <Button className='w-2/3 h-12'> <GooglePlusOutlined className='text-2xl'/><span className='text-md font-semibold'>Continue with Google</span></Button> 
                    </div>
            </div>
        </div>
    )
}

export default Index