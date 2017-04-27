using System.Web.Http;
using Owin;

namespace mytodo1
{
    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // cofig WebApi for self-host
            HttpConfiguration config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            app.UseWebApi(config);
        }
    }
}
