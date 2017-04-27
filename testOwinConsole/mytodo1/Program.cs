using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

// https://habrahabr.ru/post/202018/

namespace mytodo1
{
    class Program
    {
        static void Main(string[] args)
        {
            string address = "http://localhost:9000/";

            // run host
            using(WebApp.Start<Startup> (url: address))
            {

                Process.Start(address);
                Console.WriteLine("application started");

                // create client and make a request
                HttpClient client = new HttpClient();
                var response = client.GetAsync(address + "numbers").Result;
                Console.WriteLine(response);
                Console.WriteLine(response.Content.ReadAsStringAsync().Result);
            }

            Console.ReadLine();
        }
    }
}
