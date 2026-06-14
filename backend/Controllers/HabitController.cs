using Microsoft.AspNetCore.Mvc;
using DailyXP.API.Data;
using DailyXP.API.Models;

namespace DailyXP.API.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        return Ok(_context.Habits.ToList());
    }

    [HttpPost]
    public IActionResult CreateHabit(Habit habit)
    {
        _context.Habits.Add(habit);
        _context.SaveChanges();

        return Ok(habit);
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteHabit(int id)
    {
        var habit = _context.Habits.Find(id);

        if (habit == null)
        {
            return NotFound();
        }

        _context.Habits.Remove(habit);
        _context.SaveChanges();

        return NoContent();
    }
    [HttpDelete]
    public IActionResult DeleteAllHabits()
    {
        _context.Habits.RemoveRange(_context.Habits);

        _context.SaveChanges();

        return NoContent();
    }
    
    [HttpPut("{id}")]
    public IActionResult UpdateHabit(int id, Habit updatedHabit)
    {
        var habit = _context.Habits.Find(id);

        if (habit == null)
        {
            return NotFound();
        }

        habit.Progress = updatedHabit.Progress;
        habit.Completed = updatedHabit.Completed;

        _context.SaveChanges();

        return Ok(habit);
    }
}