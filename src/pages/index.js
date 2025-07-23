import React, { useEffect,useContext,useState } from "react";

// internal import
import { CrowdFundingContext } from "/context/CrowdFunding"
import { Hero, Card, PopUp } from "/components/index";

const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState(); 
  const [usercampaign, setUsercampaign] = useState(); 

  useEffect(() => {
  async function fetchData() {
    const allData = await getCampaigns();
    const userData = await getUserCampaigns();
    console.log("allData", allData);
    console.log("userData", userData);
    setAllcampaign(allData);
    setUsercampaign(userData);
  }
  fetchData();
}, []);

 // donate popup model

    const [openModel, setOpenModel] = useState(false);
    const [donateCampaign, setDonateCampaign] = useState();
    console.log(donateCampaign);
  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      <Card
        title="All List Campaign"
        allcampaign={allcampaign} 
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      <Card
        title="Your Create Campaign"
        allcampaign={usercampaign} 
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default index;