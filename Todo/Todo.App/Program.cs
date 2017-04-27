using Microsoft.Owin.Hosting;
using System;
using System.Diagnostics;

namespace Todo.App
{
    class Program
    {
        static void Main()
        {
            string baseAddress = "http://localhost:9000/";

            // Start OWIN host 
            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Process.Start(baseAddress);
                Console.WriteLine("application started");
                Console.ReadLine();
            }
        }
    }
}
