using System.Text.Json.Nodes;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyAllowSpecificOrigins",
        policy  =>
        {
            policy.WithOrigins("http://localhost:5262",
                "http://localhost:5000", 
                "http://localhost:8080",
                "http://localhost:4200");
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("MyAllowSpecificOrigins");

app.UseStaticFiles();

//app.MapControllers();

// Fallback: for any route not handled by the backend, serve index.html (Angular entry point).
app.MapFallbackToFile("index.html");

// A simple GET endpoint returning a JSON response.
app.MapGet("/api/weather", () =>
{
    var winddirections = new[] { "n", "ne", "e", "se", "s", "sw", "w", "nw" };
    var cities = new[] { "hannover", "berlin", "köln", "bonn", "eisenach", "dresden", "saarbrücken", "münchen", "hamburg", "flensburg", "stuttgart" };
    return Results.Json(new JsonObject()
    {
        { "location", cities[Random.Shared.Next(0, cities.Length)] },
        { "temperature", Random.Shared.Next(-20, 55) },
        { "humidity", Random.Shared.Next(-20, 55) },
        { "pressure", Random.Shared.Next(-20, 55) },
        { "wind", Random.Shared.Next(-20, 55) },
        { "windspeed", Random.Shared.Next(-20, 55) },
        { "winddirection", winddirections[Random.Shared.Next(0, winddirections.Length)] },
    });
});

app.Run();

