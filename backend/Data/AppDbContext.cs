using Microsoft.EntityFrameworkCore;
using DailyXP.API.Models;

namespace DailyXP.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Habit> Habits { get; set; }
    public DbSet<User> Users { get; set; }
}