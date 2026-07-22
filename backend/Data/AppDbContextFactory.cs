using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DailyXP.API.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        optionsBuilder.UseNpgsql(
        "Host=ep-quiet-feather-acpbgwt5-pooler.sa-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=npg_86YSwVhRtprE;SSL Mode=VerifyFull;Channel Binding=Require;"
    );

        return new AppDbContext(optionsBuilder.Options);
    }
}