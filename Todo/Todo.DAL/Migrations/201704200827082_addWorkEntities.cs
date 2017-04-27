namespace Todo.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addWorkEntities : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.WorkLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Works",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        WorkListId = c.Int(nullable: false),
                        Title = c.String(),
                        IsCompleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.WorkLists", t => t.WorkListId, cascadeDelete: true)
                .Index(t => t.WorkListId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Works", "WorkListId", "dbo.WorkLists");
            DropIndex("dbo.Works", new[] { "WorkListId" });
            DropTable("dbo.Works");
            DropTable("dbo.WorkLists");
        }
    }
}
