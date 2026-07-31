using HospitalManagement.API.Helpers;
using HospitalManagement.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace HospitalManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(new { success = false, message = "Username and password are required." });

            const string sql = @"
                SELECT TOP(1) [id], [Username], [Pasword], [IsActive]
                FROM dbo.tbl_AdminLogin
                WHERE [Username] = @username AND [Pasword] = @password AND [IsActive] = 1;
            ";

            await using var conn = new SqlConnection(_connectionString);
            await using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@username", request.Username);
            cmd.Parameters.AddWithValue("@password", request.Password);

            await conn.OpenAsync();

            await using var reader = await cmd.ExecuteReaderAsync();
            if (!reader.HasRows)
                return Unauthorized(new { success = false, message = "Invalid credentials or inactive user." });

            await reader.ReadAsync();
            var userId = reader.GetInt32(reader.GetOrdinal("id"));
            var username = reader.GetString(reader.GetOrdinal("Username"));

            var token = TokenAuthHelper.CreateToken(username, userId, _configuration);

            return Ok(new { success = true, message = "Login successful.", userId, username, token });
        }
    }
}
