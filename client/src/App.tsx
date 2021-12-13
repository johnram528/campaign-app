import React from 'react';
import { theme, ThemeProvider, CSSReset, Box } from '@chakra-ui/core'
import './App.css';
import CreateCampaign from './components/pages/CreateCampaign';
import { Route, Routes } from 'react-router';
import Home from './components/pages/Home';
import EditCampaign from './components/pages/EditCampaign';
import ViewCampaign from './components/pages/ViewCampaign';
import { Link } from 'react-router-dom';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            borderBottom="1px solid green.900"
            height="60px"
            backgroundColor="teal.400"
            paddingTop="30px"
            paddingLeft="10px"
      >
          <Link to='/'>HOME</Link>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/campaign/new"} element={<CreateCampaign />}/>
            <Route path={"/campaign/:campaignId/edit"} element={<EditCampaign />}/>
            <Route path={"/campaign/:campaignId/view"} element={<ViewCampaign />}/>
          </Routes>

      </Box>
    </ThemeProvider>
  );
}

export default App;
