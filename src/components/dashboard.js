// AdminPanel.js
import React from 'react';
import Content from './dashboardcomp/content';
import Sidebar from './dashboardcomp/sidebar';
import Header from './header';

function Dashboard() {
  return (
    <>
    <Header/>
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Content />
    </div>
    </>
  );
}

export default Dashboard;