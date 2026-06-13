namespace DailyXP.API.Models;

public class Habit
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public bool Completed { get; set; }

    public int Progress { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}