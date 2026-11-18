var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy("frontend", policy =>
    policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();
app.UseCors("frontend");

app.MapGet("/api/health", () => Results.Ok(new { status = "ok", service = "KimYen.Api" }));

app.MapGet("/api/site-info", () => Results.Ok(new
{
    founded = 2004,
    dailyCapacity = "150–200 tấn/ngày",
    monthlyOutput = "5.000–6.000 tấn/tháng",
    specifications = new[]
    {
        new { value = "≥ 85%", label = "Hàm lượng tinh bột" },
        new { value = "≥ 93%", label = "Độ trắng" },
        new { value = "5–7", label = "Độ pH" },
        new { value = "≥ 750 BU", label = "Độ nhớt" }
    },
    email = "kimyencompany.tn@gmail.com",
    phone = "+84 276 375 2851",
    phoneLink = "+842763752851"
}));

app.Run();
