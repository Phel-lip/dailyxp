using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DailyXP.API.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        optionsBuilder.UseNpgsql(
            "Host=ep-curly-paper-acl3mocd-pooler.sa-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=npg_cmF9BIyf7ZtX;SSL Mode=VerifyFull;Channel Binding=Require;"
        );

        return new AppDbContext(optionsBuilder.Options);
    }
}