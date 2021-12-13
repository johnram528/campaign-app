import React from 'react';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core'
import './App.css';
import CreateCampaign from './components/pages/CreateCampaign';
import { Route, Routes } from 'react-router';
import Home from './components/pages/Home';
import EditCampaign from './components/pages/EditCampaign';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <div className="App">
        <div className={'container'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/campaign/new"} element={<CreateCampaign />}/>
            <Route path={"/campaign/:campaignId/edit"} element={<EditCampaign />}/>
            {/* <Route path={"/campaign/:campaignId/edit"} element={<ViewCampaign />}/> */}
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
