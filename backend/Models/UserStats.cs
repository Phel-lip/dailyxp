namespace DailyXP.API.Models;
public class UserStats
{
    
    public int Id { get; set; }

    public int UserId { get; set; }

    public User? User { get; set; }

    public int Streak { get; set; }

    public string RewardName { get; set; } = "";

    public int RewardGoal { get; set; } = 1000;

    public string CompletedDays { get; set; } = "[]";

    public DateTime? LastCompletedDate { get; set; }
}