using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using HospitalManagement.API.Models;
using HospitalManagement.Core.Interfaces;
using HospitalManagement.Core.Models;
using LoginRequestModel = HospitalManagement.API.Models.LoginRequest;
using AdminLoginEntity = HospitalManagement.Core.Models.AdminLogin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace HospitalManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _uow;

        public LoginController(IConfiguration configuration, IUnitOfWork uow)
        {
            _configuration = configuration;
            _uow = uow;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LoginRequestModel request)
        {
            if (request is null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { success = false, message = "Username and password are required." });
            }

            var user = (await _uow.Repository<AdminLoginEntity>().FindAsync(x =>
                    x.Username == request.Username &&
                    x.Pasword == request.Password &&
                    x.IsActive))
                .FirstOrDefault();

            if (user == null)
            {
                return Unauthorized(new { success = false, message = "Invalid credentials or inactive user." });
            }

            var expires = DateTime.UtcNow.AddMinutes(GetTokenExpiryMinutes());
            var token = GenerateJwtToken(user.Id, user.Username, expires);

            return Ok(new
            {
                success = true,
                message = "Login successful.",
                userId = user.Id,
                username = user.Username,
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
