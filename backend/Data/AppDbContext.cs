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
    public DbSet<UserStats> UserStats { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Habit>()
            .HasOne(h => h.User)
            .WithMany(u => u.Habits)
            .HasForeignKey(h => h.UserId);

        modelBuilder.Entity<UserStats>()
            .HasOne(s => s.User)
            .WithOne()
            .HasForeignKey<UserStats>(s => s.UserId);
    }
}