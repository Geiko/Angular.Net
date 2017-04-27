using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.DAL.Entities
{
    public class WorkList
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public virtual ICollection<Work> Works { get; set; }

        public WorkList()
        {
            Works = new List<Work>();
        }
    }
}
