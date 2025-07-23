import React, { useState, useContext } from "react";
import { CrowdFundingContext } from "../../context/CrowdFunding";

const WhitePaper = () => {
  const { createCampaign, currentAccount } = useContext(CrowdFundingContext);
  const [form, setForm] = useState({
    title: "",
    category: "",
    address: "",
    description: "",
    amount: "",
    deadline: "",
    imageUrl: ""
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setForm({ ...form, imageUrl: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Nếu có file ảnh, upload lên IPFS ở đây (chưa tích hợp)
    // Sau đó lấy link ảnh và setForm({ ...form, imageUrl: link })
    await createCampaign({
      title: form.title,
      description: form.description,
      amount: form.amount,
      deadline: form.deadline,
      // Có thể truyền thêm imageUrl nếu contract hỗ trợ
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">Create New Campaign</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Campaign Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter campaign title"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select category</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="charity">Charity</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Wallet Address</label>
          <input
            type="text"
            name="address"
            value={currentAccount || form.address}
            onChange={handleChange}
            placeholder="0x..."
            className="w-full border rounded px-3 py-2"
            disabled={!!currentAccount}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your project in detail..."
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Funding Target ($)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border rounded px-3 py-2"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Campaign Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Campaign Image URL (Optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Upload Image (Optional)</label>
          <div className="border-2 border-dashed rounded p-4 flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            <span className="text-gray-400 text-sm">Click to upload or drag and drop<br/>PNG, JPG, GIF up to 10MB</span>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded bg-teal-600 text-white font-semibold hover:bg-teal-700"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default WhitePaper;
