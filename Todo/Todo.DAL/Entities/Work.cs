using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todo.DAL.Entities
{
    public class Work
    {
        [Key]
        public int Id { get; set; }

        public int WorkListId { get; set; }
        public virtual WorkList WorkList { get; set; }

        public string Title { get; set; }

        public bool IsCompleted { get; set; }
    }
}
