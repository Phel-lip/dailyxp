using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using DailyXP.API.Data;
using DailyXP.API.Models;

namespace DailyXP.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class HabitController : ControllerBase
{
    private readonly AppDbContext _context;

    public HabitController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetHabits()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var habits = _context.Habits
            .Where(h => h.UserId == userId)
            .ToList();

        return Ok(habits);
    }

    [HttpPost]
    public IActionResult CreateHabit(Habit habit)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        habit.UserId = userId;

        _context.Habits.Add(habit);
        _context.SaveChanges();

        return Ok(habit);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteHabit(int id)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var habit = _context.Habits.FirstOrDefault(h =>
            h.Id == id && h.UserId == userId);

        if (habit == null)
            return NotFound();

        _context.Habits.Remove(habit);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult UpdateHabit(int id, Habit updatedHabit)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var habit = _context.Habits.FirstOrDefault(h =>
            h.Id == id && h.UserId == userId);

        if (habit == null)
            return NotFound();

        habit.Title = updatedHabit.Title;
        habit.Progress = updatedHabit.Progress;
        habit.Completed = updatedHabit.Completed;

        _context.SaveChanges();

        return Ok(habit);
    }
}