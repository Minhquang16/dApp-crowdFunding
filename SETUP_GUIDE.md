# CrowdFunding DApp - Setup Guide

## Vấn đề đã được sửa ✅

**Lỗi "all list campaign trả về undefined"** đã được khắc phục hoàn toàn!

## Các vấn đề đã fix:

1. **Lỗi typo trong import Web3Modal** - Đã sửa `Wenb3Modal` thành `Web3Modal`
2. **Thiếu error handling** - Đã thêm try-catch cho tất cả functions
3. **Vấn đề với RPC provider** - Đã cấu hình đúng JsonRpcProvider
4. **Thiếu contract address** - Đã cấu hình biến môi trường
5. **Vấn đề với loading state** - Đã thêm loading state và validation

## Cách chạy ứng dụng:

### 1. Chạy Local Hardhat Network
```bash
npx hardhat node
```

### 2. Deploy Smart Contract
```bash
npx hardhat run scripts/modules/deploy.js --network localhost
```

### 3. Cập nhật Contract Address
Cập nhật địa chỉ contract mới vào file `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=<địa_chỉ_contract_mới>
```

### 4. Chạy Development Server
```bash
npm run dev
```

### 5. Truy cập ứng dụng
Mở trình duyệt và truy cập: `http://localhost:3000`

## Cấu hình MetaMask:

1. **Network Settings:**
   - Network Name: Localhost 8545
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 1337
   - Currency Symbol: ETH

2. **Import Account:**
   - Sử dụng private key từ hardhat node để import account test

## Các tính năng đã hoạt động:

✅ **Hiển thị danh sách campaigns** - Không còn trả về undefined  
✅ **Tạo campaign mới** - Hoạt động bình thường  
✅ **Donate to campaigns** - Chức năng donate hoạt động  
✅ **Loading states** - Hiển thị loading khi fetch data  
✅ **Error handling** - Xử lý lỗi một cách graceful  

## Lưu ý quan trọng:

- Đảm bảo Hardhat node đang chạy trước khi sử dụng ứng dụng
- Cấu hình MetaMask đúng với local network
- Contract address phải được cập nhật sau mỗi lần deploy mới

## Troubleshooting:

**Nếu vẫn gặp lỗi "undefined":**
1. Kiểm tra console browser để xem lỗi chi tiết
2. Đảm bảo contract address trong .env.local đúng
3. Kiểm tra Hardhat node có đang chạy không
4. Refresh page sau khi thay đổi cấu hình

**Nếu MetaMask không kết nối được:**
1. Kiểm tra network settings trong MetaMask
2. Reset account trong MetaMask nếu cần
3. Đảm bảo đã import account từ Hardhat

---

🎉 **Ứng dụng CrowdFunding DApp đã sẵn sàng sử dụng!**