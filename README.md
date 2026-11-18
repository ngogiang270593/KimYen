# Kim Yến website

Website được chia thành hai project độc lập:

- `frontend/`: React + Vite, trang giới thiệu và giao diện thích ứng điện thoại.
- `backend/`: ASP.NET Core 8 Web API, cung cấp health check và nội dung website.

## Chạy trong môi trường phát triển

Mở hai cửa sổ terminal tại thư mục project.

```powershell
cd backend
dotnet run --urls http://localhost:5080
```

```powershell
cd frontend
npm install
npm run dev
```

Mở `http://localhost:5173`. Vite chuyển tiếp các request `/api` sang API tại `http://localhost:5080`.

API:

- `GET /api/health`
- `GET /api/site-info`

Thông tin sản phẩm và năng lực trên trang lấy từ nội dung doanh nghiệp công bố tại Vietnam Starch; vui lòng xác nhận trước khi dùng cho báo giá hoặc hồ sơ kỹ thuật.
