using Newtonsoft.Json;
using Repositories.Entity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.BusinessModel
{
    public class LoginGoogle
    {
        public class GoogleAccessTokenResponse
        {
            [JsonProperty("access_token")]
            public string AccessToken { get; set; }

            [JsonProperty("expires_in")]
            public int ExpiresIn { get; set; }

            [JsonProperty("token_type")]
            public string TokenType { get; set; }

            [JsonProperty("refresh_token")]
            public string RefreshToken { get; set; }

            [JsonProperty("id_token")]
            public string IdToken { get; set; }
        }

        public class UserInfo
        {
            [JsonProperty("sub")]
            public string Sub { get; set; }

            [JsonProperty("email")]
            public string Email { get; set; }

            [JsonProperty("given_name")]
            public string GivenName { get; set; }

            [JsonProperty("family_name")]
            public string FamilyName { get; set; }

            [JsonProperty("picture")]
            public string Picture { get; set; }
            public string? Password { get; set; }

            public int? RoleId { get; set; }
            public Role Role { get; set; } 
        }
        public class TokenRequest
        {
            public string token { get; set; }
        }
        public class GoogleApiHelper
        {
            private readonly HttpClient _httpClient;

            public GoogleApiHelper()
            {
                _httpClient = new HttpClient();
            }

            public async Task<UserInfo> GetUserInfoAsync(string clientId, string clientSecret, string code, string redirectUri)
            {
                var tokenEndpoint = "https://oauth2.googleapis.com/token";

                var tokenRequest = new Dictionary<string, string>
        {
            { "client_id", clientId },
            { "client_secret", clientSecret },
            { "code", code },
            { "grant_type", "authorization_code" },
            { "redirect_uri", redirectUri }
        };

                var response = await _httpClient.PostAsync(tokenEndpoint, new FormUrlEncodedContent(tokenRequest));

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var accessTokenResponse = JsonConvert.DeserializeObject<GoogleAccessTokenResponse>(responseContent);

                    var userInfo = await GetGoogleUserInfo(accessTokenResponse.AccessToken);
                   
                    return userInfo;
                }
                else
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Failed to get access token. Status code: {response.StatusCode}, Response: {responseContent}");
                }
            }

            /* private UserInfo DecodeIdToken(string idToken)
             {
                 var handler = new JwtSecurityTokenHandler();
                 var jwtToken = handler.ReadJwtToken(idToken);

                 var payload = jwtToken.Claims.ToDictionary(c => c.Type, c => c.Value);

                 var userInfoJson = JsonConvert.SerializeObject(payload);
                 var userInfo = JsonConvert.DeserializeObject<UserInfo>(userInfoJson);

                 return userInfo;
             }*/
            private async Task<UserInfo> GetGoogleUserInfo(string accessToken)
            {
                var userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

                var response = await _httpClient.GetAsync(userInfoEndpoint);
                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseContent);
                if (response.IsSuccessStatusCode)
                {
                    var userInfo = JsonConvert.DeserializeObject<UserInfo>(responseContent);
                    return userInfo;
                }
                else
                {
                    throw new Exception($"Failed to get user info. Status code: {response.StatusCode}, Response: {responseContent}");
                }
            }
        }
    }
}
