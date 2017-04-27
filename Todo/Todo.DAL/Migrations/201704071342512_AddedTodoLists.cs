namespace Todo.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedTodoLists : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TodoLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Todoes", "TodoListId", c => c.Int(nullable: false));
            CreateIndex("dbo.Todoes", "TodoListId");
            AddForeignKey("dbo.Todoes", "TodoListId", "dbo.TodoLists", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Todoes", "TodoListId", "dbo.TodoLists");
            DropIndex("dbo.Todoes", new[] { "TodoListId" });
            DropColumn("dbo.Todoes", "TodoListId");
            DropTable("dbo.TodoLists");
        }
    }
}
