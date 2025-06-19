using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularSPAWebAPI.Data;
using AngularSPAWebAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using AngularSPAWebAPI.Services;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace AngularSPAWebAPI
{
    public class Startup
    {
        private readonly IWebHostEnvironment currentEnvironment;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            currentEnvironment = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // SQLite & Identity.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Identity options.
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
                // Lockout settings.
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.MaxFailedAccessAttempts = 3;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromDays(1);
            });

            // Adds application services.
            services.AddTransient<IDbInitializer, DbInitializer>();

            services.Configure<AdOptions>(Configuration.GetSection("LocalAd"));

            // Cookie authentication.
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Manage Accounts", policy => policy.RequireRole("administrator"));
                options.AddPolicy("Access Resources", policy => policy.RequireRole("administrator", "user"));
            });

            services.AddControllersWithViews();

            services.AddSpaStaticFiles(configuration =>
            {
                if (currentEnvironment.IsDevelopment())
                {
                    configuration.RootPath = "ClientApp/dist/ClientApp";
                }
                else
                {
                    configuration.RootPath = "wwwroot";
                }
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            // Microsoft.AspNetCore.StaticFiles: API for starting the application from wwwroot.
            // Uses default files as index.html.
            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
