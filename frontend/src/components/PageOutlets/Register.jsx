import { Image,Form,Input, Button, message } from 'antd'
import Logo from '../../assets/images/big-logo_light-1.png'
import { Link } from 'react-router-dom'
import { GooglePlusOutlined } from '@ant-design/icons'
import { REGISTER } from '../../constant/ServerUrl'
import { saveRecords } from '../common'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Index = ()=>{
    const [form] = Form.useForm()
    const [loading,isLoading] = useState(false)
    const [errorMessage,setErrorMessage] = useState(null)
    const navigate = useNavigate();
    const handleRegister = ()=>{
        form.validateFields ().then(async (values) => {
            console.log(values)
            isLoading(true)
            setErrorMessage(null)
            saveRecords(REGISTER,values).then(res=>{
                console.log(res)
                isLoading(false)
                if(res.success){
                    message.success('User successfully created')
                    form.resetFields();
                    navigate('/user/login')
                    
                }
                else{
                    message.error('An error occurred, pls try again')
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
        <div className="w-full  h-full flex justify-center bg-custom-gray p-10">
            <div className="mt-10 w-full lg:w-[50%] h-full bg-black/40 flex flex-col items-center p-4">
                    <img src={Logo} className='w-1/4 lg:w-1/6' />
                    <div className='w-full font-bold lg:text-2xl text-white flex justify-center'>Sign up For Barta News Account </div>
                    <div className='font-semibold text-white text-sm'>Already have an Account? <Link to='/user/login'>Sign In</Link></div>
                    {errorMessage && <div className="w-[50%] mt-4 h-10 bg-red-200 text-sm text-black flex justify-center items-center text-semibold">{errorMessage}</div>}
                    <Form
                        className='mt-4 w-2/3'
                        name='register-form'
                        form={form}
                        labelCol={{ span: 44 }} // Set the label column to span the entire width
                        wrapperCol={{ span: 44 }} // Set the wrapper column to span the entire width
                        layout="vertical" // Use vertical layout
                        onFinish={handleRegister}
                     >
                        <Form.Item label='Full name'  name='fullname' className='w-full' rules={[{
                                message:'Full name is required',
                                required:true
                            }]}>
                     
                                <Input type="text"  className='p-2'/>

                        </Form.Item>
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
                                <Button loading={loading} disabled={loading} htmlType='submit' className='w-full h-12 bg-red-700 text-white' >Register</Button>
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