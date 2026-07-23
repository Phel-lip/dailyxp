using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DailyXP.API.Data;
using DailyXP.API.Models;
using System.Security.Claims;

namespace DailyXP.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserStatsController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserStatsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<UserStats>> Get()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var stats = await _context.UserStats
            .FirstOrDefaultAsync(s => s.UserId == userId);

        if (stats == null)
        {
            stats = new UserStats
            {
                UserId = userId
            };

            _context.UserStats.Add(stats);

            await _context.SaveChangesAsync();
        }

        return stats;
    }

    [HttpPut]
    public async Task<IActionResult> Update(UserStats updated)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var stats = await _context.UserStats
            .FirstOrDefaultAsync(s => s.UserId == userId);

        if (stats == null)
            return NotFound();

        stats.Streak = updated.Streak;
        stats.RewardName = updated.RewardName;
        stats.RewardGoal = updated.RewardGoal;
        stats.CompletedDays = updated.CompletedDays;
        stats.LastCompletedDate = updated.LastCompletedDate;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}