using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

User? currentUser = null;

string eventFileName = "events.json";
List<Event> events = new();
if (File.Exists(eventFileName))
{
    try
    {
        var json = File.ReadAllText(eventFileName);
        events.AddRange(JsonSerializer.Deserialize<List<Event>>(json));
    }
    catch (System.Exception)
    {
        //nuh uh
    }

}

string userFileName = "users.json";
List<User> users = new();
if (File.Exists(userFileName))
{
    try
    {
        var json = File.ReadAllText(userFileName);
        users.AddRange(JsonSerializer.Deserialize<List<User>>(json));
    }
    catch (System.Exception)
    {
        //nuh uh
    }

}

app.MapGet("/events", () => events);
app.MapPost("/events", (Event msg) =>
{
    events.Add(msg);
    var json = JsonSerializer.Serialize(events);
    File.WriteAllText(eventFileName, json);
});

app.MapGet("/users", () => users);
app.MapPost("/users", (User msg) =>
{
    users.Add(msg);
    var json = JsonSerializer.Serialize(users);
    File.WriteAllText(userFileName, json);
});

app.MapGet("/currentUser", () => currentUser);
app.MapPost("/currentUser", (User msg) =>
{
    currentUser = msg;
});

app.Run();

public record User(string userName, string password);
public record Event(string eventName, DateTime startTime, DateTime endTime, string hostingUser, string[] invitedUsers, string[] usersRSVP);