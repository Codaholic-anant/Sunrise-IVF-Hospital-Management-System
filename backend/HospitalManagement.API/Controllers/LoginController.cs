using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HospitalManagement.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;

namespace HospitalManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LoginRequest request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { success = false, message = "Username and password are required." });
            }

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
            {
                return Unauthorized(new { success = false, message = "Invalid credentials or inactive user." });
            }

            await reader.ReadAsync();
            var userId = reader.GetInt32(reader.GetOrdinal("id"));
            var username = reader.GetString(reader.GetOrdinal("Username"));
            var expires = DateTime.UtcNow.AddMinutes(GetTokenExpiryMinutes());
            var token = GenerateJwtToken(userId, username, expires);

            return Ok(new
            {
                success = true,
                message = "Login successful.",
                userId,
                username,
                token,
                expires
            });
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new
            {
                success = true,
                userId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                username = User.FindFirstValue(ClaimTypes.Name)
            });
        }

        private string GenerateJwtToken(int userId, string username, DateTime expires)
        {
            var jwtKey = _configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("Jwt:Key is missing from configuration.");

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "SuperAdmin"),
                new Claim("is_super_admin", "true"),
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private int GetTokenExpiryMinutes()
        {
            return int.TryParse(_configuration["Jwt:ExpiresInMinutes"], out var minutes)
                ? minutes
                : 60;
        }
    }
}
