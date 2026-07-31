USE [HospitalMSDB]
GO
/****** Object:  Schema [Administration]    Script Date: 7/29/2026 11:16:09 AM ******/
CREATE SCHEMA [Administration]
GO
/****** Object:  Schema [Hospital]    Script Date: 7/29/2026 11:16:09 AM ******/
CREATE SCHEMA [Hospital]
GO
/****** Object:  Schema [Patient]    Script Date: 7/29/2026 11:16:09 AM ******/
CREATE SCHEMA [Patient]
GO
/****** Object:  Table [Administration].[LoginHistory]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[LoginHistory](
	[LoginHistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[LoginTime] [datetime2](7) NULL,
	[LogoutTime] [datetime2](7) NULL,
	[LoginStatus] [varchar](30) NULL,
	[Browser] [nvarchar](200) NULL,
	[Device] [nvarchar](200) NULL,
	[IPAddress] [varchar](50) NULL,
	[FailureReason] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[LoginHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Administration].[PasswordHistory]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[PasswordHistory](
	[PasswordHistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[ChangedDate] [datetime2](7) NULL,
	[ChangedBy] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[PasswordHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Administration].[Permissions]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[Permissions](
	[PermissionId] [bigint] IDENTITY(1,1) NOT NULL,
	[ModuleName] [varchar](100) NOT NULL,
	[PermissionCode] [varchar](100) NOT NULL,
	[PermissionName] [nvarchar](150) NULL,
	[Description] [nvarchar](500) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Administration].[RefreshTokens]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[RefreshTokens](
	[RefreshTokenId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[Token] [nvarchar](max) NULL,
	[Expires] [datetime2](7) NULL,
	[Created] [datetime2](7) NULL,
	[Revoked] [datetime2](7) NULL,
	[ReplacedByToken] [nvarchar](max) NULL,
	[IsExpired] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[RefreshTokenId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Administration].[RolePermissions]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[RolePermissions](
	[RolePermissionId] [bigint] IDENTITY(1,1) NOT NULL,
	[RoleId] [bigint] NOT NULL,
	[PermissionId] [bigint] NOT NULL,
	[CanView] [bit] NULL,
	[CanCreate] [bit] NULL,
	[CanEdit] [bit] NULL,
	[CanDelete] [bit] NULL,
	[CanApprove] [bit] NULL,
	[CanExport] [bit] NULL,
	[CanPrint] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[RolePermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Administration].[Roles]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[Roles](
	[RoleId] [bigint] IDENTITY(1,1) NOT NULL,
	[RoleCode] [varchar](20) NOT NULL,
	[RoleName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[IsSystemRole] [bit] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [bigint] NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedBy] [bigint] NULL,
	[UpdatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Administration].[UserDevices]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[UserDevices](
	[DeviceId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[DeviceName] [nvarchar](200) NULL,
	[DeviceType] [varchar](50) NULL,
	[Browser] [nvarchar](200) NULL,
	[IPAddress] [varchar](50) NULL,
	[IsTrusted] [bit] NULL,
	[LastLogin] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[DeviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Administration].[UserNotifications]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[UserNotifications](
	[NotificationId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[Title] [nvarchar](200) NULL,
	[Message] [nvarchar](max) NULL,
	[NotificationType] [varchar](50) NULL,
	[IsRead] [bit] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[NotificationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Administration].[UserRoles]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[UserRoles](
	[UserRoleId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[RoleId] [bigint] NOT NULL,
	[EffectiveDate] [datetime2](7) NULL,
	[ExpiryDate] [datetime2](7) NULL,
	[IsPrimaryRole] [bit] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserRoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Administration].[Users]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[Users](
	[UserId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[EmployeeCode] [varchar](20) NOT NULL,
	[Username] [varchar](100) NOT NULL,
	[Email] [varchar](150) NOT NULL,
	[MobileNumber] [varchar](20) NULL,
	[PasswordHash] [nvarchar](max) NOT NULL,
	[PasswordSalt] [nvarchar](500) NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[MiddleName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[Gender] [varchar](20) NULL,
	[DateOfBirth] [date] NULL,
	[ProfilePhoto] [nvarchar](500) NULL,
	[DepartmentId] [bigint] NULL,
	[Designation] [nvarchar](100) NULL,
	[IsEmailVerified] [bit] NULL,
	[IsMobileVerified] [bit] NULL,
	[TwoFactorEnabled] [bit] NULL,
	[FailedLoginAttempts] [int] NULL,
	[IsLocked] [bit] NULL,
	[LockoutEnd] [datetime2](7) NULL,
	[LastLogin] [datetime2](7) NULL,
	[Status] [tinyint] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
	[CreatedBy] [bigint] NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedBy] [bigint] NULL,
	[UpdatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Administration].[UserSessions]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[UserSessions](
	[SessionId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[SessionToken] [nvarchar](max) NULL,
	[DeviceName] [nvarchar](200) NULL,
	[Browser] [nvarchar](200) NULL,
	[IPAddress] [varchar](50) NULL,
	[LoginTime] [datetime2](7) NULL,
	[LastActivity] [datetime2](7) NULL,
	[LogoutTime] [datetime2](7) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[SessionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Administration].[UserStatusHistory]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[UserStatusHistory](
	[HistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[OldStatus] [tinyint] NULL,
	[NewStatus] [tinyint] NULL,
	[Reason] [nvarchar](500) NULL,
	[ChangedBy] [bigint] NULL,
	[ChangedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_AdminLogin]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_AdminLogin](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Pasword] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[tbl_AdminLogin] WHERE [Username] = 'admin@gmail.com')
BEGIN
    INSERT INTO [dbo].[tbl_AdminLogin] ([Username], [Pasword], [IsActive])
    VALUES ('admin@gmail.com', 'Admin@123', 1);
END
GO

/****** Object:  Table [Hospital].[HospitalAddresses]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalAddresses](
	[AddressId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[AddressLine1] [nvarchar](250) NOT NULL,
	[AddressLine2] [nvarchar](250) NULL,
	[Country] [nvarchar](100) NOT NULL,
	[State] [nvarchar](100) NOT NULL,
	[City] [nvarchar](100) NOT NULL,
	[PinCode] [varchar](10) NULL,
	[Latitude] [decimal](10, 7) NULL,
	[Longitude] [decimal](10, 7) NULL,
	[IsPrimary] [bit] NULL,
	[CreatedBy] [bigint] NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedBy] [bigint] NULL,
	[UpdatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[HospitalAuditLogs]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalAuditLogs](
	[AuditId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NULL,
	[ModuleName] [varchar](100) NULL,
	[ActionName] [varchar](100) NULL,
	[RecordId] [bigint] NULL,
	[OldValue] [nvarchar](max) NULL,
	[NewValue] [nvarchar](max) NULL,
	[PerformedBy] [bigint] NULL,
	[PerformedDate] [datetime2](7) NULL,
	[IPAddress] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[AuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[HospitalBranches]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalBranches](
	[BranchId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[BranchCode] [varchar](20) NOT NULL,
	[BranchName] [nvarchar](150) NOT NULL,
	[Phone] [varchar](20) NULL,
	[Email] [varchar](150) NULL,
	[NumberOfBeds] [int] NULL,
	[IsMainBranch] [bit] NULL,
	[Status] [tinyint] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[BranchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[HospitalContacts]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalContacts](
	[ContactId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[ContactPerson] [nvarchar](150) NOT NULL,
	[Designation] [nvarchar](100) NULL,
	[MobileNumber] [varchar](20) NOT NULL,
	[AlternateMobile] [varchar](20) NULL,
	[Email] [varchar](150) NULL,
	[Website] [varchar](250) NULL,
	[Facebook] [varchar](250) NULL,
	[LinkedIn] [varchar](250) NULL,
	[Instagram] [varchar](250) NULL,
	[Twitter] [varchar](250) NULL,
	[IsPrimary] [bit] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[ContactId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[HospitalDepartments]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalDepartments](
	[DepartmentId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[BranchId] [bigint] NULL,
	[DepartmentCode] [varchar](20) NULL,
	[DepartmentName] [nvarchar](150) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[Status] [bit] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[HospitalDocuments]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalDocuments](
	[DocumentId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[DocumentType] [varchar](50) NULL,
	[DocumentNumber] [varchar](100) NULL,
	[FileName] [nvarchar](300) NULL,
	[FilePath] [nvarchar](500) NULL,
	[ExpiryDate] [date] NULL,
	[Remarks] [nvarchar](500) NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[DocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[Hospitals]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[Hospitals](
	[HospitalId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalCode] [varchar](20) NOT NULL,
	[HospitalName] [nvarchar](200) NOT NULL,
	[RegistrationNumber] [varchar](100) NOT NULL,
	[HospitalType] [varchar](50) NOT NULL,
	[EstablishedYear] [smallint] NULL,
	[TotalBeds] [int] NULL,
	[EmergencyAvailable] [bit] NOT NULL,
	[ICUAvailable] [bit] NOT NULL,
	[AmbulanceAvailable] [bit] NOT NULL,
	[BloodBankAvailable] [bit] NOT NULL,
	[LogoUrl] [nvarchar](500) NULL,
	[Description] [nvarchar](max) NULL,
	[Status] [tinyint] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedBy] [bigint] NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[UpdatedBy] [bigint] NULL,
	[UpdatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[HospitalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[HospitalSettings]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalSettings](
	[SettingId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[SettingKey] [varchar](100) NULL,
	[SettingValue] [nvarchar](max) NULL,
	[Description] [nvarchar](500) NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[SettingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[HospitalStatusHistory]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalStatusHistory](
	[HistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[OldStatus] [tinyint] NULL,
	[NewStatus] [tinyint] NULL,
	[Reason] [nvarchar](500) NULL,
	[ChangedBy] [bigint] NULL,
	[ChangedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Hospital].[HospitalSubscriptions]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Hospital].[HospitalSubscriptions](
	[SubscriptionId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[PlanName] [varchar](100) NULL,
	[PlanType] [varchar](50) NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[RenewalDate] [date] NULL,
	[Amount] [decimal](18, 2) NULL,
	[Currency] [varchar](10) NULL,
	[PaymentStatus] [varchar](30) NULL,
	[MaxDoctors] [int] NULL,
	[MaxStaff] [int] NULL,
	[MaxPatients] [int] NULL,
	[StorageLimitGB] [int] NULL,
	[Status] [tinyint] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[SubscriptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientAddresses]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientAddresses](
	[AddressId] [bigint] IDENTITY(1,1) NOT NULL,
	[PatientId] [bigint] NOT NULL,
	[AddressLine1] [nvarchar](250) NOT NULL,
	[AddressLine2] [nvarchar](250) NULL,
	[City] [nvarchar](100) NULL,
	[State] [nvarchar](100) NULL,
	[Country] [nvarchar](100) NULL,
	[PinCode] [varchar](10) NULL,
	[IsPrimary] [bit] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientAllergies]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientAllergies](
	[AllergyId] [bigint] IDENTITY(1,1) NOT NULL,
	[MedicalHistoryId] [bigint] NOT NULL,
	[AllergyName] [nvarchar](200) NULL,
	[Severity] [varchar](30) NULL,
	[Remarks] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[AllergyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientChronicDiseases]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientChronicDiseases](
	[DiseaseId] [bigint] IDENTITY(1,1) NOT NULL,
	[MedicalHistoryId] [bigint] NOT NULL,
	[DiseaseName] [nvarchar](200) NULL,
	[DiagnosisDate] [date] NULL,
	[Status] [varchar](30) NULL,
	[Remarks] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[DiseaseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientDocuments]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientDocuments](
	[DocumentId] [bigint] IDENTITY(1,1) NOT NULL,
	[PatientId] [bigint] NOT NULL,
	[DocumentType] [varchar](50) NULL,
	[FileName] [nvarchar](300) NULL,
	[FilePath] [nvarchar](500) NULL,
	[UploadedBy] [bigint] NULL,
	[UploadedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[DocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientEmergencyContacts]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientEmergencyContacts](
	[EmergencyContactId] [bigint] IDENTITY(1,1) NOT NULL,
	[PatientId] [bigint] NOT NULL,
	[ContactName] [nvarchar](150) NOT NULL,
	[Relationship] [varchar](50) NULL,
	[MobileNumber] [varchar](20) NULL,
	[AlternateNumber] [varchar](20) NULL,
	[Address] [nvarchar](300) NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[EmergencyContactId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientFamilyHistory]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientFamilyHistory](
	[FamilyHistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[MedicalHistoryId] [bigint] NOT NULL,
	[Relationship] [varchar](50) NULL,
	[DiseaseName] [nvarchar](200) NULL,
	[Remarks] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[FamilyHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientInsurance]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientInsurance](
	[InsuranceId] [bigint] IDENTITY(1,1) NOT NULL,
	[PatientId] [bigint] NOT NULL,
	[InsuranceProvider] [nvarchar](150) NULL,
	[PolicyNumber] [varchar](100) NULL,
	[MemberId] [varchar](100) NULL,
	[CoverageAmount] [decimal](18, 2) NULL,
	[ValidFrom] [date] NULL,
	[ValidTo] [date] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[InsuranceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientMedicalHistory]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientMedicalHistory](
	[MedicalHistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[PatientId] [bigint] NOT NULL,
	[Height] [decimal](5, 2) NULL,
	[Weight] [decimal](5, 2) NULL,
	[BMI] [decimal](5, 2) NULL,
	[SmokingStatus] [varchar](30) NULL,
	[AlcoholConsumption] [varchar](30) NULL,
	[OrganDonor] [bit] NULL,
	[Notes] [nvarchar](max) NULL,
	[CreatedBy] [bigint] NULL,
	[CreatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[MedicalHistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientMedications]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientMedications](
	[MedicationId] [bigint] IDENTITY(1,1) NOT NULL,
	[MedicalHistoryId] [bigint] NOT NULL,
	[MedicineName] [nvarchar](200) NULL,
	[Dosage] [varchar](100) NULL,
	[Frequency] [varchar](100) NULL,
	[Duration] [varchar](100) NULL,
	[PrescribedBy] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[MedicationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[Patients]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[Patients](
	[PatientId] [bigint] IDENTITY(1,1) NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[RegistrationNo] [varchar](30) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[MiddleName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[Gender] [varchar](20) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
	[BloodGroup] [varchar](10) NULL,
	[MaritalStatus] [varchar](30) NULL,
	[Nationality] [nvarchar](100) NULL,
	[AadhaarNumber] [varchar](20) NULL,
	[PassportNumber] [varchar](30) NULL,
	[MobileNumber] [varchar](20) NOT NULL,
	[AlternateMobile] [varchar](20) NULL,
	[Email] [varchar](150) NULL,
	[PhotoUrl] [nvarchar](500) NULL,
	[RegistrationDate] [datetime2](7) NULL,
	[RegistrationType] [varchar](30) NULL,
	[ReferredBy] [nvarchar](150) NULL,
	[Status] [tinyint] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
	[CreatedBy] [bigint] NULL,
	[CreatedDate] [datetime2](7) NULL,
	[UpdatedBy] [bigint] NULL,
	[UpdatedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientStatusHistory]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientStatusHistory](
	[HistoryId] [bigint] IDENTITY(1,1) NOT NULL,
	[PatientId] [bigint] NOT NULL,
	[OldStatus] [tinyint] NULL,
	[NewStatus] [tinyint] NULL,
	[Reason] [nvarchar](500) NULL,
	[ChangedBy] [bigint] NULL,
	[ChangedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[HistoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientVaccinations]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientVaccinations](
	[VaccinationId] [bigint] IDENTITY(1,1) NOT NULL,
	[MedicalHistoryId] [bigint] NOT NULL,
	[VaccineName] [nvarchar](200) NULL,
	[DoseNumber] [int] NULL,
	[VaccinationDate] [date] NULL,
	[NextDueDate] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[VaccinationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientVisitHistory]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientVisitHistory](
	[VisitId] [bigint] IDENTITY(1,1) NOT NULL,
	[PatientId] [bigint] NOT NULL,
	[HospitalId] [bigint] NOT NULL,
	[DoctorId] [bigint] NULL,
	[DepartmentId] [bigint] NULL,
	[VisitDate] [datetime2](7) NULL,
	[VisitType] [varchar](30) NULL,
	[ChiefComplaint] [nvarchar](max) NULL,
	[Diagnosis] [nvarchar](max) NULL,
	[Treatment] [nvarchar](max) NULL,
	[FollowUpDate] [date] NULL,
	[Status] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[VisitId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Patient].[PatientVitals]    Script Date: 7/29/2026 11:16:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Patient].[PatientVitals](
	[VitalId] [bigint] IDENTITY(1,1) NOT NULL,
	[MedicalHistoryId] [bigint] NOT NULL,
	[Temperature] [decimal](5, 2) NULL,
	[BloodPressure] [varchar](20) NULL,
	[PulseRate] [int] NULL,
	[RespiratoryRate] [int] NULL,
	[OxygenSaturation] [decimal](5, 2) NULL,
	[Height] [decimal](5, 2) NULL,
	[Weight] [decimal](5, 2) NULL,
	[BMI] [decimal](5, 2) NULL,
	[RecordedDate] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[VitalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [UQ_RolePermission]    Script Date: 7/29/2026 11:16:09 AM ******/
ALTER TABLE [Administration].[RolePermissions] ADD  CONSTRAINT [UQ_RolePermission] UNIQUE NONCLUSTERED 
(
	[RoleId] ASC,
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_User_Email]    Script Date: 7/29/2026 11:16:09 AM ******/
ALTER TABLE [Administration].[Users] ADD  CONSTRAINT [UQ_User_Email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_User_Employee]    Script Date: 7/29/2026 11:16:09 AM ******/
ALTER TABLE [Administration].[Users] ADD  CONSTRAINT [UQ_User_Employee] UNIQUE NONCLUSTERED 
(
	[EmployeeCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_User_Username]    Script Date: 7/29/2026 11:16:09 AM ******/
ALTER TABLE [Administration].[Users] ADD  CONSTRAINT [UQ_User_Username] UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_Hospital_Code]    Script Date: 7/29/2026 11:16:09 AM ******/
ALTER TABLE [Hospital].[Hospitals] ADD  CONSTRAINT [UQ_Hospital_Code] UNIQUE NONCLUSTERED 
(
	[HospitalCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_Hospital_Registration]    Script Date: 7/29/2026 11:16:09 AM ******/
ALTER TABLE [Hospital].[Hospitals] ADD  CONSTRAINT [UQ_Hospital_Registration] UNIQUE NONCLUSTERED 
(
	[RegistrationNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_Patient_Registration]    Script Date: 7/29/2026 11:16:09 AM ******/
ALTER TABLE [Patient].[Patients] ADD  CONSTRAINT [UQ_Patient_Registration] UNIQUE NONCLUSTERED 
(
	[RegistrationNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [Administration].[Permissions] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Administration].[RefreshTokens] ADD  DEFAULT ((0)) FOR [IsExpired]
GO
ALTER TABLE [Administration].[RolePermissions] ADD  DEFAULT ((0)) FOR [CanView]
GO
ALTER TABLE [Administration].[RolePermissions] ADD  DEFAULT ((0)) FOR [CanCreate]
GO
ALTER TABLE [Administration].[RolePermissions] ADD  DEFAULT ((0)) FOR [CanEdit]
GO
ALTER TABLE [Administration].[RolePermissions] ADD  DEFAULT ((0)) FOR [CanDelete]
GO
ALTER TABLE [Administration].[RolePermissions] ADD  DEFAULT ((0)) FOR [CanApprove]
GO
ALTER TABLE [Administration].[RolePermissions] ADD  DEFAULT ((0)) FOR [CanExport]
GO
ALTER TABLE [Administration].[RolePermissions] ADD  DEFAULT ((0)) FOR [CanPrint]
GO
ALTER TABLE [Administration].[Roles] ADD  DEFAULT ((0)) FOR [IsSystemRole]
GO
ALTER TABLE [Administration].[Roles] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Administration].[Roles] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Administration].[UserDevices] ADD  DEFAULT ((0)) FOR [IsTrusted]
GO
ALTER TABLE [Administration].[UserNotifications] ADD  DEFAULT ((0)) FOR [IsRead]
GO
ALTER TABLE [Administration].[UserNotifications] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Administration].[UserRoles] ADD  DEFAULT ((1)) FOR [IsPrimaryRole]
GO
ALTER TABLE [Administration].[UserRoles] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT ((0)) FOR [IsEmailVerified]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT ((0)) FOR [IsMobileVerified]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT ((0)) FOR [TwoFactorEnabled]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT ((0)) FOR [FailedLoginAttempts]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT ((0)) FOR [IsLocked]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [Administration].[Users] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Administration].[UserSessions] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Administration].[UserStatusHistory] ADD  DEFAULT (getdate()) FOR [ChangedDate]
GO
ALTER TABLE [dbo].[tbl_AdminLogin] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Hospital].[HospitalAddresses] ADD  DEFAULT ((1)) FOR [IsPrimary]
GO
ALTER TABLE [Hospital].[HospitalAddresses] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Hospital].[HospitalAuditLogs] ADD  DEFAULT (getdate()) FOR [PerformedDate]
GO
ALTER TABLE [Hospital].[HospitalBranches] ADD  DEFAULT ((0)) FOR [IsMainBranch]
GO
ALTER TABLE [Hospital].[HospitalBranches] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [Hospital].[HospitalBranches] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Hospital].[HospitalContacts] ADD  DEFAULT ((1)) FOR [IsPrimary]
GO
ALTER TABLE [Hospital].[HospitalContacts] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Hospital].[HospitalDepartments] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [Hospital].[HospitalDepartments] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Hospital].[HospitalDocuments] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT ((0)) FOR [TotalBeds]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT ((0)) FOR [EmergencyAvailable]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT ((0)) FOR [ICUAvailable]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT ((0)) FOR [AmbulanceAvailable]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT ((0)) FOR [BloodBankAvailable]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [Hospital].[Hospitals] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Hospital].[HospitalSettings] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Hospital].[HospitalStatusHistory] ADD  DEFAULT (getdate()) FOR [ChangedDate]
GO
ALTER TABLE [Hospital].[HospitalSubscriptions] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Patient].[PatientAddresses] ADD  DEFAULT ((1)) FOR [IsPrimary]
GO
ALTER TABLE [Patient].[PatientAddresses] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Patient].[PatientDocuments] ADD  DEFAULT (getdate()) FOR [UploadedDate]
GO
ALTER TABLE [Patient].[PatientEmergencyContacts] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Patient].[PatientInsurance] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Patient].[PatientMedicalHistory] ADD  DEFAULT ((0)) FOR [OrganDonor]
GO
ALTER TABLE [Patient].[PatientMedicalHistory] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Patient].[Patients] ADD  DEFAULT (getdate()) FOR [RegistrationDate]
GO
ALTER TABLE [Patient].[Patients] ADD  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [Patient].[Patients] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Patient].[Patients] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [Patient].[Patients] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [Patient].[PatientStatusHistory] ADD  DEFAULT (getdate()) FOR [ChangedDate]
GO
ALTER TABLE [Patient].[PatientVitals] ADD  DEFAULT (getdate()) FOR [RecordedDate]
GO
ALTER TABLE [Administration].[LoginHistory]  WITH CHECK ADD  CONSTRAINT [FK_LoginHistory_User] FOREIGN KEY([UserId])
REFERENCES [Administration].[Users] ([UserId])
GO
ALTER TABLE [Administration].[LoginHistory] CHECK CONSTRAINT [FK_LoginHistory_User]
GO
ALTER TABLE [Administration].[PasswordHistory]  WITH CHECK ADD  CONSTRAINT [FK_PasswordHistory_User] FOREIGN KEY([UserId])
REFERENCES [Administration].[Users] ([UserId])
GO
ALTER TABLE [Administration].[PasswordHistory] CHECK CONSTRAINT [FK_PasswordHistory_User]
GO
ALTER TABLE [Administration].[RefreshTokens]  WITH CHECK ADD  CONSTRAINT [FK_RefreshToken_User] FOREIGN KEY([UserId])
REFERENCES [Administration].[Users] ([UserId])
GO
ALTER TABLE [Administration].[RefreshTokens] CHECK CONSTRAINT [FK_RefreshToken_User]
GO
ALTER TABLE [Administration].[RolePermissions]  WITH CHECK ADD  CONSTRAINT [FK_RP_Permission] FOREIGN KEY([PermissionId])
REFERENCES [Administration].[Permissions] ([PermissionId])
GO
ALTER TABLE [Administration].[RolePermissions] CHECK CONSTRAINT [FK_RP_Permission]
GO
ALTER TABLE [Administration].[RolePermissions]  WITH CHECK ADD  CONSTRAINT [FK_RP_Role] FOREIGN KEY([RoleId])
REFERENCES [Administration].[Roles] ([RoleId])
GO
ALTER TABLE [Administration].[RolePermissions] CHECK CONSTRAINT [FK_RP_Role]
GO
ALTER TABLE [Administration].[UserDevices]  WITH CHECK ADD  CONSTRAINT [FK_UserDevice_User] FOREIGN KEY([UserId])
REFERENCES [Administration].[Users] ([UserId])
GO
ALTER TABLE [Administration].[UserDevices] CHECK CONSTRAINT [FK_UserDevice_User]
GO
ALTER TABLE [Administration].[UserNotifications]  WITH CHECK ADD  CONSTRAINT [FK_UserNotification_User] FOREIGN KEY([UserId])
REFERENCES [Administration].[Users] ([UserId])
GO
ALTER TABLE [Administration].[UserNotifications] CHECK CONSTRAINT [FK_UserNotification_User]
GO
ALTER TABLE [Administration].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_Role] FOREIGN KEY([RoleId])
REFERENCES [Administration].[Roles] ([RoleId])
GO
ALTER TABLE [Administration].[UserRoles] CHECK CONSTRAINT [FK_UserRole_Role]
GO
ALTER TABLE [Administration].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRole_User] FOREIGN KEY([UserId])
REFERENCES [Administration].[Users] ([UserId])
GO
ALTER TABLE [Administration].[UserRoles] CHECK CONSTRAINT [FK_UserRole_User]
GO
ALTER TABLE [Administration].[Users]  WITH CHECK ADD  CONSTRAINT [FK_User_Hospital] FOREIGN KEY([HospitalId])
REFERENCES [Hospital].[Hospitals] ([HospitalId])
GO
ALTER TABLE [Administration].[Users] CHECK CONSTRAINT [FK_User_Hospital]
GO
ALTER TABLE [Administration].[UserSessions]  WITH CHECK ADD  CONSTRAINT [FK_UserSession_User] FOREIGN KEY([UserId])
REFERENCES [Administration].[Users] ([UserId])
GO
ALTER TABLE [Administration].[UserSessions] CHECK CONSTRAINT [FK_UserSession_User]
GO
ALTER TABLE [Administration].[UserStatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_UserStatus_User] FOREIGN KEY([UserId])
REFERENCES [Administration].[Users] ([UserId])
GO
ALTER TABLE [Administration].[UserStatusHistory] CHECK CONSTRAINT [FK_UserStatus_User]
GO
ALTER TABLE [Hospital].[HospitalAddresses]  WITH CHECK ADD  CONSTRAINT [FK_HospitalAddress_Hospital] FOREIGN KEY([HospitalId])
REFERENCES [Hospital].[Hospitals] ([HospitalId])
GO
ALTER TABLE [Hospital].[HospitalAddresses] CHECK CONSTRAINT [FK_HospitalAddress_Hospital]
GO
ALTER TABLE [Hospital].[HospitalBranches]  WITH CHECK ADD  CONSTRAINT [FK_Branch_Hospital] FOREIGN KEY([HospitalId])
REFERENCES [Hospital].[Hospitals] ([HospitalId])
GO
ALTER TABLE [Hospital].[HospitalBranches] CHECK CONSTRAINT [FK_Branch_Hospital]
GO
ALTER TABLE [Hospital].[HospitalContacts]  WITH CHECK ADD  CONSTRAINT [FK_HospitalContact_Hospital] FOREIGN KEY([HospitalId])
REFERENCES [Hospital].[Hospitals] ([HospitalId])
GO
ALTER TABLE [Hospital].[HospitalContacts] CHECK CONSTRAINT [FK_HospitalContact_Hospital]
GO
ALTER TABLE [Hospital].[HospitalDepartments]  WITH CHECK ADD  CONSTRAINT [FK_Department_Branch] FOREIGN KEY([BranchId])
REFERENCES [Hospital].[HospitalBranches] ([BranchId])
GO
ALTER TABLE [Hospital].[HospitalDepartments] CHECK CONSTRAINT [FK_Department_Branch]
GO
ALTER TABLE [Hospital].[HospitalDepartments]  WITH CHECK ADD  CONSTRAINT [FK_Department_Hospital] FOREIGN KEY([HospitalId])
REFERENCES [Hospital].[Hospitals] ([HospitalId])
GO
ALTER TABLE [Hospital].[HospitalDepartments] CHECK CONSTRAINT [FK_Department_Hospital]
GO
ALTER TABLE [Patient].[PatientAddresses]  WITH CHECK ADD  CONSTRAINT [FK_PatientAddress_Patient] FOREIGN KEY([PatientId])
REFERENCES [Patient].[Patients] ([PatientId])
GO
ALTER TABLE [Patient].[PatientAddresses] CHECK CONSTRAINT [FK_PatientAddress_Patient]
GO
ALTER TABLE [Patient].[PatientAllergies]  WITH CHECK ADD  CONSTRAINT [FK_Allergy_MedicalHistory] FOREIGN KEY([MedicalHistoryId])
REFERENCES [Patient].[PatientMedicalHistory] ([MedicalHistoryId])
GO
ALTER TABLE [Patient].[PatientAllergies] CHECK CONSTRAINT [FK_Allergy_MedicalHistory]
GO
ALTER TABLE [Patient].[PatientChronicDiseases]  WITH CHECK ADD  CONSTRAINT [FK_Disease_MedicalHistory] FOREIGN KEY([MedicalHistoryId])
REFERENCES [Patient].[PatientMedicalHistory] ([MedicalHistoryId])
GO
ALTER TABLE [Patient].[PatientChronicDiseases] CHECK CONSTRAINT [FK_Disease_MedicalHistory]
GO
ALTER TABLE [Patient].[PatientDocuments]  WITH CHECK ADD  CONSTRAINT [FK_Document_Patient] FOREIGN KEY([PatientId])
REFERENCES [Patient].[Patients] ([PatientId])
GO
ALTER TABLE [Patient].[PatientDocuments] CHECK CONSTRAINT [FK_Document_Patient]
GO
ALTER TABLE [Patient].[PatientEmergencyContacts]  WITH CHECK ADD  CONSTRAINT [FK_EmergencyContact_Patient] FOREIGN KEY([PatientId])
REFERENCES [Patient].[Patients] ([PatientId])
GO
ALTER TABLE [Patient].[PatientEmergencyContacts] CHECK CONSTRAINT [FK_EmergencyContact_Patient]
GO
ALTER TABLE [Patient].[PatientFamilyHistory]  WITH CHECK ADD  CONSTRAINT [FK_FamilyHistory_MedicalHistory] FOREIGN KEY([MedicalHistoryId])
REFERENCES [Patient].[PatientMedicalHistory] ([MedicalHistoryId])
GO
ALTER TABLE [Patient].[PatientFamilyHistory] CHECK CONSTRAINT [FK_FamilyHistory_MedicalHistory]
GO
ALTER TABLE [Patient].[PatientInsurance]  WITH CHECK ADD  CONSTRAINT [FK_Insurance_Patient] FOREIGN KEY([PatientId])
REFERENCES [Patient].[Patients] ([PatientId])
GO
ALTER TABLE [Patient].[PatientInsurance] CHECK CONSTRAINT [FK_Insurance_Patient]
GO
ALTER TABLE [Patient].[PatientMedicalHistory]  WITH CHECK ADD  CONSTRAINT [FK_MedicalHistory_Patient] FOREIGN KEY([PatientId])
REFERENCES [Patient].[Patients] ([PatientId])
GO
ALTER TABLE [Patient].[PatientMedicalHistory] CHECK CONSTRAINT [FK_MedicalHistory_Patient]
GO
ALTER TABLE [Patient].[PatientMedications]  WITH CHECK ADD  CONSTRAINT [FK_Medication_MedicalHistory] FOREIGN KEY([MedicalHistoryId])
REFERENCES [Patient].[PatientMedicalHistory] ([MedicalHistoryId])
GO
ALTER TABLE [Patient].[PatientMedications] CHECK CONSTRAINT [FK_Medication_MedicalHistory]
GO
ALTER TABLE [Patient].[Patients]  WITH CHECK ADD  CONSTRAINT [FK_Patient_Hospital] FOREIGN KEY([HospitalId])
REFERENCES [Hospital].[Hospitals] ([HospitalId])
GO
ALTER TABLE [Patient].[Patients] CHECK CONSTRAINT [FK_Patient_Hospital]
GO
ALTER TABLE [Patient].[PatientStatusHistory]  WITH CHECK ADD  CONSTRAINT [FK_StatusHistory_Patient] FOREIGN KEY([PatientId])
REFERENCES [Patient].[Patients] ([PatientId])
GO
ALTER TABLE [Patient].[PatientStatusHistory] CHECK CONSTRAINT [FK_StatusHistory_Patient]
GO
ALTER TABLE [Patient].[PatientVaccinations]  WITH CHECK ADD  CONSTRAINT [FK_Vaccination_MedicalHistory] FOREIGN KEY([MedicalHistoryId])
REFERENCES [Patient].[PatientMedicalHistory] ([MedicalHistoryId])
GO
ALTER TABLE [Patient].[PatientVaccinations] CHECK CONSTRAINT [FK_Vaccination_MedicalHistory]
GO
ALTER TABLE [Patient].[PatientVisitHistory]  WITH CHECK ADD  CONSTRAINT [FK_Visit_Hospital] FOREIGN KEY([HospitalId])
REFERENCES [Hospital].[Hospitals] ([HospitalId])
GO
ALTER TABLE [Patient].[PatientVisitHistory] CHECK CONSTRAINT [FK_Visit_Hospital]
GO
ALTER TABLE [Patient].[PatientVisitHistory]  WITH CHECK ADD  CONSTRAINT [FK_Visit_Patient] FOREIGN KEY([PatientId])
REFERENCES [Patient].[Patients] ([PatientId])
GO
ALTER TABLE [Patient].[PatientVisitHistory] CHECK CONSTRAINT [FK_Visit_Patient]
GO
ALTER TABLE [Patient].[PatientVitals]  WITH CHECK ADD  CONSTRAINT [FK_Vitals_MedicalHistory] FOREIGN KEY([MedicalHistoryId])
REFERENCES [Patient].[PatientMedicalHistory] ([MedicalHistoryId])
GO
ALTER TABLE [Patient].[PatientVitals] CHECK CONSTRAINT [FK_Vitals_MedicalHistory]
GO
ALTER TABLE [Hospital].[Hospitals]  WITH CHECK ADD  CONSTRAINT [CK_Hospital_Status] CHECK  (([Status]=(5) OR [Status]=(4) OR [Status]=(3) OR [Status]=(2) OR [Status]=(1)))
GO
ALTER TABLE [Hospital].[Hospitals] CHECK CONSTRAINT [CK_Hospital_Status]
GO


