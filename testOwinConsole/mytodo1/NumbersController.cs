using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace mytodo1
{
    public class NumbersController : ApiController
    {
        public IEnumerable<int> Get()
        {
            return Enumerable.Range(0, 10);
        }
    }
}
