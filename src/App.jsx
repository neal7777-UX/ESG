import React from 'react';
import { Layout } from 'antd';
import CarbonForm from './components/CarbonForm';
import './components/CarbonForm/styles.css';
import './styles/layout.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Header>
        <h1 style={{ color: '#fff', margin: 0 }}>ESG碳管理系統</h1>
      </Header>
      <Content>
        <CarbonForm />
      </Content>
      <Footer>
        ©{new Date().getFullYear()} ESG碳管理系統 - 版權所有
      </Footer>
    </Layout>
  );
};

export default App;