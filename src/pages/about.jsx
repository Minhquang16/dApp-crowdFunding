import React from "react";

const team = [
  {
    name: "Alice Nguyen",
    role: "Founder & CEO",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    desc: "10+ years in blockchain & fintech. Định hướng chiến lược và phát triển sản phẩm."
  },
  {
    name: "Bob Tran",
    role: "CTO",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    desc: "Chuyên gia smart contract, bảo mật và kiến trúc hệ thống phi tập trung."
  },
  {
    name: "Linh Pham",
    role: "CMO",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    desc: "Marketing, truyền thông và phát triển cộng đồng blockchain."
  }
];

const stats = [
  { label: "Total Campaigns", value: "1,200+" },
  { label: "Funds Raised", value: "$5M+" },
  { label: "Active Users", value: "10,000+" },
  { label: "Countries", value: "30+" }
];

const About = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
    <div className="w-full h-full min-h-screen bg-white rounded-lg shadow-lg p-2 md:p-8 lg:p-16 flex-1 flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">About Us</h1>
      <p className="text-lg text-gray-900 mb-6 text-center">
        Chào mừng bạn đến với nền tảng Crowdfunding phi tập trung! Chúng tôi kết nối cộng đồng với các dự án ý nghĩa, minh bạch và an toàn nhờ công nghệ blockchain.
      </p>
      <div className="mb-8 px-2 md:px-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Our Mission</h2>
        <p className="text-gray-900 mb-2">Tạo ra môi trường gây quỹ minh bạch, công bằng và hiệu quả cho mọi người trên toàn thế giới.</p>
        <ul className="list-disc ml-6 text-gray-900">
          <li>Minh bạch tài chính nhờ blockchain</li>
          <li>Bảo vệ quyền lợi nhà đầu tư & người nhận quỹ</li>
          <li>Khuyến khích đổi mới sáng tạo</li>
        </ul>
      </div>
      <div className="mb-8 px-2 md:px-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Core Values</h2>
        <ul className="list-disc ml-6 text-gray-900">
          <li>Minh bạch & Trung thực</li>
          <li>Đổi mới công nghệ</li>
          <li>Hỗ trợ cộng đồng</li>
        </ul>
      </div>
      <div className="mb-8 px-2 md:px-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Our Team</h2>
        <div className="flex flex-wrap gap-6 justify-center items-center">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col items-center bg-gray-100 rounded-lg p-4 w-60 shadow-md">
              <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mb-2" />
            <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-900 mb-1">{member.role}</p>
              <p className="text-xs text-gray-900 text-center">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8 px-2 md:px-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Blockchain Technology</h2>
        <p className="text-gray-900 mb-2">
          Nền tảng sử dụng smart contract trên Ethereum/Sepolia để đảm bảo mọi giao dịch đều công khai, không thể chỉnh sửa và kiểm tra dễ dàng. Tất cả dữ liệu về campaign, donation đều lưu trên blockchain, loại bỏ gian lận và tăng niềm tin cho cộng đồng.
        </p>
      </div>
      <div className="mb-8 px-2 md:px-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Our Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-900 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

export default About;
