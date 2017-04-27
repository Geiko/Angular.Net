using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.DAL
{
    public interface IApplicationDbContext : IDisposable
    {
        IDbSet<Entities.Todo> Todos { get; set; }
        IDbSet<Entities.TodoList> TodoLists { get; set; }

        IDbSet<Entities.Work> Works { get; set; }
        IDbSet<Entities.WorkList> WorkLists { get; set; }

        int SaveChanges();
    }
}
