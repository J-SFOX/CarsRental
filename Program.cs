using Microsoft.EntityFrameworkCore;
using CarsRental.Data;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = "server=localhost;user=root;password=;database=carsrent";
builder.Services.AddDbContext<CarsRentalContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});
// var  MyCorsOrigin = "_myAllowSpecificOrigins";

builder.Services.AddControllersWithViews();

var devCorsPolicy = "devCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(devCorsPolicy, builder => {
        //builder.WithOrigins("http://localhost:800").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        //builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        //builder.SetIsOriginAllowed(origin => true);
    });
});
var app = builder.Build();

// app.UseRouting();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}else{
     app.UseCors(devCorsPolicy);
    
}





app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
