ALTER PROC [dbo].[Project_Insert]

		@ProjectName nvarchar(50)
		,@CompanyId int =null
		,@Description nvarchar(3000)
		,@Budget decimal(18,4) = null
		,@Deadline date = null
		,@UserIdCreated nvarchar(128)
		,@Id int OUTPUT

/* ----- TEST CODE -----

DECLARE @Id int = 0;

	DECLARE @ProjectName nvarchar(50) = 'TestProject3'
		,@CompanyId int = 1
		,@Description nvarchar(3000) = 'TestDescription3'
		,@Budget decimal(18,4) = null
		,@Deadline date = null
		,@UserIdCreated nvarchar(128) = 'TestID333'

	EXECUTE dbo.Project_Insert	
								@ProjectName
								,@CompanyId
								,@Description
								,@Budget
								,@Deadline
								,@UserIdCreated
								,@Id OUTPUT

SELECT @Id

SELECT * 
FROM dbo.Project
WHERE Id = @Id;


*/
   

AS

BEGIN



INSERT INTO [dbo].[Project]
           ([ProjectName]
           ,[CompanyId]
           ,[Description]
           ,[Budget]
           ,[Deadline]
           ,[UserIdCreated])
     VALUES
           (@ProjectName
           ,@CompanyId
           ,@Description
           ,@Budget
           ,@Deadline
		   ,@UserIdCreated)

	SET @Id = SCOPE_IDENTITY()

	INSERT INTO ProjectPerson
		(ProjectId
		, PersonId
		, IsLeader
		, HourlyRate
		, StatusId
		, UserIdCreated)
	SELECT
		@Id
		, p.Id
		, 1
		, 30
		, 4
		, @UserIdCreated
		FROM Person p
		WHERE p.AspNetUserId = @UserIdCreated