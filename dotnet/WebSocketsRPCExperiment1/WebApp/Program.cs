using System;
using System.IO;
using MyLib;
using WebSocketRPC;

namespace WebApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Calc calc = new Calc();
            Console.WriteLine(calc.Add(1, 2));

            File.WriteAllText($"./wwwroot/{nameof(Calc)}.js", RPCJs.GenerateCallerWithDoc<Calc>());

            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();
            app.UseStaticFiles();
            app.UseWebSocketRPC(new WebSocketRPCOptions("/calc", (hc, c) => c.Bind<Calc>(new Calc())));
            app.MapGet("/", () => $"{Directory.GetCurrentDirectory()}");
            app.Run();
        }
    }
}