import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { QUERY } from '../../constant/ServerUrl';
import { saveRecords } from '../common';
import { useNavigate } from 'react-router-dom';
const App = ({visible,isVisible}) => {
  const[form] = Form.useForm();
  const [loading,isLoading] = useState(false)
  const navigate = useNavigate();
 
  const handleOk = (e) => {

    // navigate('/user/search-results')
   

    form.validateFields().then((values)=>{
        console.log(values)
        isLoading(true)
        saveRecords(QUERY,values).then(res=>{
        console.log(res)
        isLoading(false)
            if(res.success){
               console.log()
               navigate("/user/search-results", { state: { data: res.data } });
                // form.resetFields();
            }
           
        })
        .catch(error=>{
            isLoading(false)
            console.log(error)
            
        })
    }).catch(err=>{
        //console.log(err)
    })
  };
  const handleCancel = (e) => {
    console.log(e);
    isVisible(false)
  };
  return (
    <>
     
      <Modal
        title="Search News"
        open={visible}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: false,
          loading:loading
        }}
        cancelButtonProps={{
          disabled: false,
        }}
      >
       <Form
            className='mt-4 w-full'
            name='search-form'
            form={form}
            labelCol={{ span: 44 }} // Set the label column to span the entire width
            wrapperCol={{ span: 44 }} // Set the wrapper column to span the entire width
            layout="vertical" // Use vertical layout
           
        >
            <Form.Item label='Keyword'  name='query' className='w-full' rules={[{
                                message:'Search keyword is required',
                                required:true
                            }]}>
                <Input  className='p-2 w-full h-12'/>
            </Form.Item>


        </Form>
      </Modal>
    </>
  );
};
export default App;