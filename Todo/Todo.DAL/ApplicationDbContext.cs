using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.DAL
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext()
            : base("Data Source=(LocalDb)\\MSSQLLocalDB;Initial Catalog=TodoDB_2;Integrated Security=True")
        {

        }

        public virtual IDbSet<Entities.Todo> Todos { get; set; }
        public virtual IDbSet<Entities.TodoList> TodoLists { get; set; }

        public virtual IDbSet<Entities.Work> Works { get; set; }
        public virtual IDbSet<Entities.WorkList> WorkLists { get; set; }
    }
}
