import React, { useState } from 'react';
import { Button, Form,Select, Modal,Input,Space} from 'antd';


function formModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { TextArea } = Input;

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  return (
    <>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal title="تسویه کیف پول"
         open={isModalOpen}
          onOk={handleOk} 
          onCancel={handleCancel}
          okText="ثبت درخواست تسویه"
          cancelText="انصراف"
        style={{border_button:'1px solid #262626'}} >
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={(values) => {
            console.log({ values });
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
            <p>موجودی فعلی:</p>
            <p>15000 ریال</p>
            <Button type="primary">به حساب</Button>
            <Button> به کیف پول</Button>
            <Form.Item name="price" label="مقصد تسویه" rules={[
                {
                  required: true,
                  message:'مقصد تسویه را وارد کنید'
                },
              ]}>
                <Select placeholder="انتخاب شماره شبا" style={{width:'100px'}}>
                <Select.Option value="shomare">25847899332145877</Select.Option>
                <Select.Option value="shomare">255878962414778</Select.Option>
                <Select.Option value="shomare">255878962414778</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="price" label="مبلغ تسویه" rules={[{required: true, message:'لطفا مبلغ را وارد کنید'}]}>
              <Input placeholder=" ریال"  />
            </Form.Item>
            <Form.Item label="یادداشت">
                <TextArea rows={2} />
            </Form.Item>
        </Form>
        </Modal>
    </>
  )
}

export default formModal

