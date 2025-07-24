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

  const [allcampaign, setAllcampaign] = useState([]); 
  const [usercampaign, setUsercampaign] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      const allData = await getCampaigns();
      const userData = await getUserCampaigns();
      console.log("allData", allData);
      console.log("userData", userData);
      
      // Đảm bảo data luôn là array
      setAllcampaign(Array.isArray(allData) ? allData : []);
      setUsercampaign(Array.isArray(userData) ? userData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAllcampaign([]);
      setUsercampaign([]);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);

 // donate popup model

    const [openModel, setOpenModel] = useState(false);
    const [donateCampaign, setDonateCampaign] = useState();
    console.log(donateCampaign);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading campaigns...</div>
      </div>
    );
  }

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