import React from 'react';
import { Form, Input, Select, Upload, Checkbox, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CarbonForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success('表单提交成功！');
  };

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    maxCount: 10,
    accept: '.pdf,.xlsx',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <div className="carbon-form">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        scrollToFirstError
      >
        <h2>ESG碳管理需求申請表</h2>
        <h3>（企業用戶版）</h3>

        <h3>1. 企業基本資訊</h3>
        <Form.Item
          label="公司名稱"
          name="companyName"
          rules={[{ required: true, message: '請輸入公司名稱' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="統一編號"
          name="unifiedNumber"
          rules={[{
            required: true,
            pattern: /^[0-9]{8}$/,
            message: '請輸入8位數字的統一編號'
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="行業類別"
          name="industry"
          rules={[{ required: true, message: '請選擇行業類別' }]}
        >
          <Select>
            <Option value="metal">金屬製造業</Option>
            <Option value="electronic">電子零組件業</Option>
            <Option value="food">食品加工業</Option>
            <Option value="textile">紡織業</Option>
            <Option value="other">其他</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="聯絡人郵箱"
          name="email"
          rules={[{
            required: true,
            type: 'email',
            message: '請輸入有效的電子郵箱'
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="聯絡人手機"
          name="phone"
          rules={[{
            required: true,
            pattern: /^[0-9]{10}$/,
            message: '請輸入有效的手機號碼'
          }]}
        >
          <Input />
        </Form.Item>

        <h3>2. 電子發票數據上傳</h3>
        <Form.Item
          label="上傳最近3個月電子發票（PDF/Excel）"
          name="invoices"
          extra="僅用於碳排放試算，處理後立即刪除"
        >
          <Upload {...fileUploadProps}>
            <Button icon={<UploadOutlined />}>選擇檔案</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="貴公司每月平均發票張數"
          name="invoiceCount"
          rules={[{
            required: true,
            type: 'number',
            min: 1,
            max: 2000,
            message: '請輸入1-2000之間的數字'
          }]}
        >
          <Input type="number" />
        </Form.Item>

        <h3>3. 能源消耗數據（選填）</h3>
        <Form.Item
          label="台電電號"
          name="electricityNumber"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="主要燃油類型"
          name="fuelTypes"
        >
          <Checkbox.Group>
            <Checkbox value="diesel">柴油</Checkbox>
            <Checkbox value="gasoline">汽油</Checkbox>
            <Checkbox value="naturalGas">天然氣</Checkbox>
            <Checkbox value="biofuel">生質燃料</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <h3>4. 服務需求偏好</h3>
        <Form.Item
          label="您需要哪些附加功能？"
          name="additionalServices"
        >
          <Checkbox.Group>
            <Checkbox value="supplyChain">供應鏈碳排分析</Checkbox>
            <Checkbox value="cbam">歐盟CBAM試算報告</Checkbox>
            <Checkbox value="iso14064">ISO14064格式輸出</Checkbox>
            <Checkbox value="greenEnergy">綠電採購建議</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <h3>5. 數據使用同意書</h3>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[{
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('請閱讀並同意相關條款'),
          }]}
        >
          <Checkbox>
            我同意：
            <ul>
              <li>授權系統使用本數據生成碳管理報告</li>
              <li>接收每月ESG合規新知電子報</li>
              <li>隱私權政策已閱讀（<a href="/privacy-policy" target="_blank" rel="noopener noreferrer" aria-label="開啟隱私權政策">連結</a>）</li>
            </ul>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CarbonForm;