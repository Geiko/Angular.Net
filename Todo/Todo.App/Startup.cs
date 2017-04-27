using Owin;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using System.Net.Http.Formatting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Swashbuckle.Application;
using System;
using System.Reflection;
using System.IO;
using Autofac;
using Autofac.Integration.WebApi;
using Todo.DAL;
using Todo.BLL;

namespace Todo.App
{
    public class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public void Configuration(IAppBuilder appBuilder)
        {
            appBuilder.UseFileServer(new FileServerOptions()
            {
                RequestPath = PathString.Empty,
                FileSystem = new PhysicalFileSystem(@".\public"),
            });

            // Turns on static files, directory browsing, and default files.
            appBuilder.UseFileServer(new FileServerOptions()
            {
                RequestPath = new PathString("/public"),
                EnableDirectoryBrowsing = true,
            });

            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();
            
            // Configure Swagger
            var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var commentsFileName = Assembly.GetExecutingAssembly().GetName().Name + ".XML";
            var commentsFile = Path.Combine(baseDirectory, commentsFileName);

            config
               .EnableSwagger(c => {
                   c.SingleApiVersion("v1", "TodoApp API");
                   c.IncludeXmlComments(commentsFile);
               })
               .EnableSwaggerUi();

            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());
            config.Formatters.JsonFormatter.SerializerSettings =
            new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "TodoListsApi",
                routeTemplate: "api/todo-lists/{id}",
                defaults: new { controller = "TodoLists", id = RouteParameter.Optional },
                constraints: new { controller = "TodoLists" }
            );

            /////////////////////////////////
            config.Routes.MapHttpRoute(
                name: "WorkListsApi",
                routeTemplate: "api/work-lists/{id}",
                defaults: new { controller = "WorkLists", id = RouteParameter.Optional },
                constraints: new { controller = "WorkLists" }
            );
            config.Routes.MapHttpRoute(
                name: "WorkItemsApi",
                routeTemplate: "api/workitems/{id}",
                defaults: new { controller = "WorkItems", id = RouteParameter.Optional },
                constraints: new { controller = "WorkItems" }
            );
            /////////////////////////////////

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional },
                constraints: new {controller = "Todos"}
            );
            var builder = new ContainerBuilder();
            // Register Web API controller in executing assembly.
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<ApplicationDbContext>().As<IApplicationDbContext>();
            builder.RegisterType<DbContextFactory>().As<IDbContextFactory>();

            builder.RegisterType<TodosService>().As<ITodosService>();
            builder.RegisterType<TodoListService>().As<ITodoListService>();

            /////////////////////////////////
            builder.RegisterType<WorkItemService>().As<IWorkItemService>();
            builder.RegisterType<WorkListService>().As<IWorkListService>();
            /////////////////////////////////

            // Create and assign a dependency resolver for Web API to use.
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            appBuilder.UseAutofacMiddleware(container);

            appBuilder.UseAutofacWebApi(config);

            appBuilder.UseWebApi(config);
        }
    }
}
