import React, { useContext, useEffect, useState } from "react";
import { CrowdFundingContext } from "../../context/CrowdFunding";
import Card from "../../components/Card";
// import PopUp from "../../components/PopUp"; // Nếu bạn đã sửa PopUp thành code thực tế, hãy bỏ comment này

const Project = () => {
  const {
    currentAccount,
    connectWallet,
    createCampaign,
    getCampaigns,
    donate,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [donateData, setDonateData] = useState(null);
  // const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    };
    fetchData();
  }, []);

  // Lọc theo category (giả lập)
  const filteredCampaigns = campaigns.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    // Nếu có category, lọc theo category (giả lập: title chứa category)
    const matchCategory = category
      ? c.title.toLowerCase().includes(category.toLowerCase())
      : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">Crowdfunding Projects</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="border rounded px-3 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="charity">Charity</option>
            <option value="startup">Startup</option>
          </select>
          {currentAccount ? (
            <span className="text-green-600 font-semibold">Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Tạo campaign mới */}
      <section className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Create New Campaign</h2>
        <CreateCampaignForm createCampaign={createCampaign} />
      </section>

      {/* Danh sách campaign */}
      <section className="flex-1">
        <Card
          allcampaign={filteredCampaigns}
          setOpenModel={setOpenModel}
          setDonate={setDonateData}
          title="All Campaigns"
        />
      </section>

      {/* Popup donate */}
      {/* {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          donate={donateData}
          donateFunction={donate}
          getDonations={getDonations}
        />
      )} */}
    </div>
  );
};

// Form tạo campaign
const CreateCampaignForm = ({ createCampaign }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await createCampaign(form);
      setSuccess("Campaign created successfully!");
      setForm({ title: "", description: "", amount: "", deadline: "" });
    } catch (err) {
      setError("Failed to create campaign.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="border rounded px-3 py-2 w-full"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="border rounded px-3 py-2 w-full"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Target Amount (ETH)"
        className="border rounded px-3 py-2 w-full"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
        min="0.01"
        step="0.01"
      />
      <input
        type="date"
        className="border rounded px-3 py-2 w-full"
        value={form.deadline}
        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Campaign"}
      </button>
      {success && <div className="text-green-600">{success}</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
};

export default Project;
