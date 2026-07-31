using System.Security.Cryptography;
using System.Text;

namespace HospitalManagement.API.Helpers
{
    public static class TokenAuthHelper
    {
        private const string DefaultSigningKey = "HospitalManagement-Dev-Secret";

        public static string CreateToken(string username, int userId, IConfiguration configuration)
        {
            var signingKey = configuration["Auth:SigningKey"] ?? DefaultSigningKey;
            var issuedAt = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            var payload = $"{userId}:{username}:{issuedAt}";
            var signature = ComputeSignature(signingKey, payload);

            return Convert.ToBase64String(Encoding.UTF8.GetBytes($"{payload}.{signature}"));
        }

        public static bool TryValidateToken(string? token, IConfiguration configuration, out string username, out int userId)
        {
            username = string.Empty;
            userId = 0;

            if (string.IsNullOrWhiteSpace(token))
            {
                return false;
            }

            try
            {
                var signingKey = configuration["Auth:SigningKey"] ?? DefaultSigningKey;
                var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(token));
                var parts = decoded.Split('.', 2);

                if (parts.Length != 2)
                {
                    return false;
                }

                var payload = parts[0];
                var signature = parts[1];

                if (!string.Equals(signature, ComputeSignature(signingKey, payload), StringComparison.Ordinal))
                {
                    return false;
                }

                var segments = payload.Split(':');
                if (segments.Length != 3 || !int.TryParse(segments[0], out userId))
                {
                    return false;
                }

                username = segments[1];
                return true;
            }
            catch
            {
                return false;
            }
        }

        private static string ComputeSignature(string signingKey, string payload)
        {
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(signingKey));
            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
            return Convert.ToHexString(hash);
        }
    }
}
