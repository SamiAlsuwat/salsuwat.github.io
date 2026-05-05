import React, { useState } from 'react';

const WeekLesson = ({ weekNum, user, onNavigate, onExerciseComplete, onLogout }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showExercise, setShowExercise] = useState(false);
  const [exerciseAnswers, setExerciseAnswers] = useState({});
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [exerciseScore, setExerciseScore] = useState(0);

  // Week content data with YouTube videos
  const weekData = {
    1: {
      titleEn: "Introduction to Databases",
      titleAr: "مقدمة في قواعد البيانات",
      icon: "🗄️",
      video: {
        title: "What is a Database?",
        titleAr: "ما هي قاعدة البيانات؟",
        youtubeId: "wR0jg0eQsZA",
        description: "Learn the fundamentals of databases and why they're essential for modern applications."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 1!",
          titleAr: "مرحباً بك في الأسبوع الأول!",
          contentEn: "This week we'll learn the fundamentals of databases and Database Management Systems (DBMS). By the end, you'll understand what databases are and how to install MySQL.",
          contentAr: "هذا الأسبوع سنتعلم أساسيات قواعد البيانات وأنظمة إدارة قواعد البيانات. في النهاية، ستفهم ما هي قواعد البيانات وكيفية تثبيت MySQL."
        },
        {
          type: "concept",
          titleEn: "What is a Database?",
          titleAr: "ما هي قاعدة البيانات؟",
          contentEn: "A database is an organized collection of structured data stored electronically. Think of it like a digital filing cabinet where information is stored in tables (like spreadsheets) that can be easily searched, updated, and managed.",
          contentAr: "قاعدة البيانات هي مجموعة منظمة من البيانات المهيكلة المخزنة إلكترونياً. فكر فيها مثل خزانة ملفات رقمية حيث يتم تخزين المعلومات في جداول يمكن البحث فيها وتحديثها وإدارتها بسهولة.",
          keyPoints: [
            { en: "Stores data in organized tables", ar: "تخزن البيانات في جداول منظمة" },
            { en: "Allows quick searching and retrieval", ar: "تسمح بالبحث والاسترجاع السريع" },
            { en: "Maintains data integrity and security", ar: "تحافظ على سلامة البيانات وأمانها" },
            { en: "Supports multiple users simultaneously", ar: "تدعم مستخدمين متعددين في وقت واحد" }
          ]
        },
        {
          type: "concept",
          titleEn: "What is a DBMS?",
          titleAr: "ما هو نظام إدارة قواعد البيانات؟",
          contentEn: "A Database Management System (DBMS) is software that manages databases. It provides tools to create, read, update, and delete data (CRUD operations). Popular examples include MySQL, PostgreSQL, SQL Server, and Oracle.",
          contentAr: "نظام إدارة قواعد البيانات هو برنامج يدير قواعد البيانات. يوفر أدوات لإنشاء البيانات وقراءتها وتحديثها وحذفها. الأمثلة الشائعة تشمل MySQL و PostgreSQL و SQL Server و Oracle.",
          keyPoints: [
            { en: "MySQL - Free, open-source, widely used", ar: "MySQL - مجاني، مفتوح المصدر، واسع الاستخدام" },
            { en: "PostgreSQL - Advanced features, enterprise-ready", ar: "PostgreSQL - ميزات متقدمة، جاهز للمؤسسات" },
            { en: "SQL Server - Microsoft's enterprise solution", ar: "SQL Server - حل مايكروسوفت للمؤسسات" },
            { en: "Oracle - Industry leader for large enterprises", ar: "Oracle - رائد الصناعة للمؤسسات الكبيرة" }
          ]
        },
        {
          type: "hands-on",
          titleEn: "Install MySQL & MySQL Workbench",
          titleAr: "تثبيت MySQL و MySQL Workbench",
          steps: [
            { en: "Download MySQL from dev.mysql.com/downloads/mysql", ar: "قم بتنزيل MySQL من dev.mysql.com/downloads/mysql" },
            { en: "Run the installer and select 'Developer Default'", ar: "قم بتشغيل المثبت واختر 'Developer Default'" },
            { en: "Set a root password (remember it!)", ar: "قم بتعيين كلمة مرور root (تذكرها!)" },
            { en: "Download MySQL Workbench from dev.mysql.com/downloads/workbench", ar: "قم بتنزيل MySQL Workbench" },
            { en: "Open Workbench and connect to localhost:3306", ar: "افتح Workbench واتصل بـ localhost:3306" }
          ]
        }
      ],
      exercises: [
        { q: "What does DBMS stand for?", qAr: "ماذا يعني DBMS؟", options: ["Database Management System", "Data Base Main Server", "Digital Base Memory System", "Data Binary Management Software"], correct: 0 },
        { q: "Which is NOT a DBMS?", qAr: "أي مما يلي ليس DBMS؟", options: ["MySQL", "PostgreSQL", "Microsoft Word", "Oracle"], correct: 2 },
        { q: "What is the default MySQL port?", qAr: "ما هو منفذ MySQL الافتراضي؟", options: ["8080", "3306", "80", "443"], correct: 1 },
        { q: "A database stores data:", qAr: "قاعدة البيانات تخزن البيانات:", options: ["On paper", "Electronically", "In memory only", "Temporarily"], correct: 1 },
        { q: "MySQL Workbench is used to:", qAr: "يستخدم MySQL Workbench لـ:", options: ["Write documents", "Create spreadsheets", "Manage MySQL databases", "Browse the internet"], correct: 2 }
      ]
    },
    2: {
      titleEn: "Creating a Database",
      titleAr: "إنشاء قاعدة بيانات",
      icon: "📁",
      video: {
        title: "MySQL CREATE DATABASE Tutorial",
        titleAr: "شرح إنشاء قاعدة البيانات",
        youtubeId: "EN6Dx22cPRI",
        description: "Learn how to create and manage databases in MySQL using SQL commands."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 2!",
          titleAr: "مرحباً بك في الأسبوع الثاني!",
          contentEn: "This week we'll learn how to create databases and use basic SQL commands. You'll create your first database called 'UniversityDB'.",
          contentAr: "هذا الأسبوع سنتعلم كيفية إنشاء قواعد البيانات واستخدام أوامر SQL الأساسية. ستنشئ قاعدة بياناتك الأولى باسم 'UniversityDB'."
        },
        {
          type: "sql",
          titleEn: "CREATE DATABASE Command",
          titleAr: "أمر CREATE DATABASE",
          code: "CREATE DATABASE UniversityDB;",
          explanation: "This command creates a new database named 'UniversityDB'. Database names are case-sensitive on Linux but not on Windows.",
          explanationAr: "هذا الأمر ينشئ قاعدة بيانات جديدة باسم 'UniversityDB'. أسماء قواعد البيانات حساسة لحالة الأحرف على Linux."
        },
        {
          type: "sql",
          titleEn: "SHOW DATABASES Command",
          titleAr: "أمر SHOW DATABASES",
          code: "SHOW DATABASES;",
          explanation: "Lists all databases on your MySQL server. You should see UniversityDB in the list after creating it.",
          explanationAr: "يعرض جميع قواعد البيانات على خادم MySQL الخاص بك."
        },
        {
          type: "sql",
          titleEn: "USE Database Command",
          titleAr: "أمر USE",
          code: "USE UniversityDB;",
          explanation: "Selects the database you want to work with. All subsequent commands will apply to this database.",
          explanationAr: "يحدد قاعدة البيانات التي تريد العمل معها. جميع الأوامر اللاحقة ستطبق على هذه القاعدة."
        },
        {
          type: "sql",
          titleEn: "DROP DATABASE Command",
          titleAr: "أمر DROP DATABASE",
          code: "DROP DATABASE UniversityDB;",
          explanation: "⚠️ CAUTION: This permanently deletes the database and ALL its data! Use with extreme care.",
          explanationAr: "⚠️ تحذير: هذا يحذف قاعدة البيانات وجميع بياناتها نهائياً! استخدمه بحذر شديد."
        }
      ],
      exercises: [
        { q: "Which command creates a new database?", qAr: "أي أمر ينشئ قاعدة بيانات جديدة؟", options: ["NEW DATABASE", "CREATE DATABASE", "MAKE DATABASE", "ADD DATABASE"], correct: 1 },
        { q: "What does USE command do?", qAr: "ماذا يفعل أمر USE؟", options: ["Creates a database", "Deletes a database", "Selects a database", "Shows databases"], correct: 2 },
        { q: "SQL statements end with:", qAr: "تنتهي أوامر SQL بـ:", options: ["Period (.)", "Semicolon (;)", "Colon (:)", "Comma (,)"], correct: 1 },
        { q: "DROP DATABASE will:", qAr: "DROP DATABASE سوف:", options: ["Pause the database", "Delete the database permanently", "Rename the database", "Copy the database"], correct: 1 },
        { q: "To see all databases, use:", qAr: "لعرض جميع قواعد البيانات، استخدم:", options: ["LIST DATABASES", "SHOW DATABASES", "VIEW DATABASES", "GET DATABASES"], correct: 1 }
      ]
    },
    3: {
      titleEn: "Creating Tables (Part 1)",
      titleAr: "إنشاء الجداول (الجزء 1)",
      icon: "📋",
      video: {
        title: "MySQL CREATE TABLE Tutorial",
        titleAr: "شرح إنشاء الجداول",
        youtubeId: "EaRj0S3K32Y",
        description: "Learn how to create tables with columns, data types, and primary keys in MySQL."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 3!",
          titleAr: "مرحباً بك في الأسبوع الثالث!",
          contentEn: "This week we'll learn how to create tables with different data types. Tables are the core of databases - they store all your data in rows and columns.",
          contentAr: "هذا الأسبوع سنتعلم كيفية إنشاء الجداول بأنواع بيانات مختلفة. الجداول هي جوهر قواعد البيانات - فهي تخزن جميع بياناتك في صفوف وأعمدة."
        },
        {
          type: "concept",
          titleEn: "Understanding Data Types",
          titleAr: "فهم أنواع البيانات",
          contentEn: "Every column in a table must have a data type that defines what kind of data it can store.",
          contentAr: "كل عمود في الجدول يجب أن يكون له نوع بيانات يحدد نوع البيانات التي يمكن تخزينها.",
          keyPoints: [
            { en: "INT - Integer numbers (1, 2, 100, -50)", ar: "INT - أرقام صحيحة (1، 2، 100، -50)" },
            { en: "VARCHAR(n) - Variable text up to n characters", ar: "VARCHAR(n) - نص متغير حتى n حرف" },
            { en: "DATE - Date values (YYYY-MM-DD)", ar: "DATE - قيم التاريخ (YYYY-MM-DD)" },
            { en: "DECIMAL(p,s) - Decimal numbers with precision", ar: "DECIMAL(p,s) - أرقام عشرية بدقة محددة" },
            { en: "BOOLEAN - True/False values", ar: "BOOLEAN - قيم صح/خطأ" }
          ]
        },
        {
          type: "sql",
          titleEn: "CREATE TABLE Students",
          titleAr: "إنشاء جدول الطلاب",
          code: `CREATE TABLE Students (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    DateOfBirth DATE,
    EnrollmentDate DATE DEFAULT CURRENT_DATE
);`,
          explanation: "Creates a Students table with ID as primary key, required names, unique email, and dates.",
          explanationAr: "ينشئ جدول الطلاب مع المعرف كمفتاح أساسي، والأسماء المطلوبة، والبريد الإلكتروني الفريد، والتواريخ."
        },
        {
          type: "concept",
          titleEn: "Key Constraints",
          titleAr: "قيود المفاتيح",
          contentEn: "Constraints are rules that enforce data integrity in your tables.",
          contentAr: "القيود هي قواعد تفرض سلامة البيانات في جداولك.",
          keyPoints: [
            { en: "PRIMARY KEY - Unique identifier for each row", ar: "PRIMARY KEY - معرف فريد لكل صف" },
            { en: "AUTO_INCREMENT - Automatically generates sequential numbers", ar: "AUTO_INCREMENT - يولد أرقام متتالية تلقائياً" },
            { en: "NOT NULL - Column cannot be empty", ar: "NOT NULL - العمود لا يمكن أن يكون فارغاً" },
            { en: "UNIQUE - No duplicate values allowed", ar: "UNIQUE - لا يسمح بقيم مكررة" },
            { en: "DEFAULT - Sets a default value if none provided", ar: "DEFAULT - يعين قيمة افتراضية إذا لم يتم تقديم قيمة" }
          ]
        }
      ],
      exercises: [
        { q: "PRIMARY KEY ensures:", qAr: "PRIMARY KEY يضمن:", options: ["Values can be null", "Each row is unique", "Values are text", "Values are dates"], correct: 1 },
        { q: "AUTO_INCREMENT does what?", qAr: "ماذا يفعل AUTO_INCREMENT؟", options: ["Decreases value", "Automatically increases ID", "Deletes rows", "Creates tables"], correct: 1 },
        { q: "VARCHAR(50) means:", qAr: "VARCHAR(50) يعني:", options: ["Exactly 50 characters", "Up to 50 characters", "50 numbers", "50 rows"], correct: 1 },
        { q: "NOT NULL means:", qAr: "NOT NULL يعني:", options: ["Can be empty", "Must have a value", "Is zero", "Is text"], correct: 1 },
        { q: "INT type stores:", qAr: "نوع INT يخزن:", options: ["Text", "Integer numbers", "Decimal numbers", "Dates"], correct: 1 }
      ]
    },
    4: {
      titleEn: "Creating Tables (Part 2) - Foreign Keys",
      titleAr: "إنشاء الجداول (الجزء 2) - المفاتيح الخارجية",
      icon: "🔗",
      video: {
        title: "MySQL Foreign Keys Explained",
        titleAr: "شرح المفاتيح الخارجية",
        youtubeId: "4q-keGvUnag",
        description: "Understanding relationships between tables using foreign keys in MySQL."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 4!",
          titleAr: "مرحباً بك في الأسبوع الرابع!",
          contentEn: "This week we'll learn about foreign keys - the way to link tables together and create relationships in our database.",
          contentAr: "هذا الأسبوع سنتعلم عن المفاتيح الخارجية - طريقة ربط الجداول معاً وإنشاء علاقات في قاعدة بياناتنا."
        },
        {
          type: "concept",
          titleEn: "What is a Foreign Key?",
          titleAr: "ما هو المفتاح الخارجي؟",
          contentEn: "A foreign key is a column that creates a link between two tables. It references the primary key of another table, ensuring data consistency.",
          contentAr: "المفتاح الخارجي هو عمود ينشئ رابطاً بين جدولين. يشير إلى المفتاح الأساسي لجدول آخر، مما يضمن تناسق البيانات.",
          keyPoints: [
            { en: "Links child table to parent table", ar: "يربط الجدول الفرعي بالجدول الأب" },
            { en: "Values must exist in referenced table", ar: "القيم يجب أن تكون موجودة في الجدول المرجعي" },
            { en: "Maintains referential integrity", ar: "يحافظ على التكامل المرجعي" },
            { en: "Prevents orphan records", ar: "يمنع السجلات اليتيمة" }
          ]
        },
        {
          type: "sql",
          titleEn: "Create Departments Table (Parent)",
          titleAr: "إنشاء جدول الأقسام (الأب)",
          code: `CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY AUTO_INCREMENT,
    DepartmentName VARCHAR(100) NOT NULL,
    Location VARCHAR(100)
);`,
          explanation: "First, create the parent table that will be referenced by other tables.",
          explanationAr: "أولاً، أنشئ الجدول الأب الذي ستشير إليه الجداول الأخرى."
        },
        {
          type: "sql",
          titleEn: "Create Instructors Table with Foreign Key",
          titleAr: "إنشاء جدول المدرسين مع مفتاح خارجي",
          code: `CREATE TABLE Instructors (
    InstructorID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);`,
          explanation: "Creates Instructors table linked to Departments. ON DELETE SET NULL means if a department is deleted, instructor's DepartmentID becomes NULL.",
          explanationAr: "ينشئ جدول المدرسين مرتبطاً بالأقسام. ON DELETE SET NULL يعني إذا حُذف القسم، يصبح DepartmentID للمدرس NULL."
        }
      ],
      exercises: [
        { q: "FOREIGN KEY is used to:", qAr: "يستخدم FOREIGN KEY لـ:", options: ["Create unique values", "Link tables together", "Store dates", "Delete data"], correct: 1 },
        { q: "REFERENCES keyword specifies:", qAr: "كلمة REFERENCES تحدد:", options: ["Column name", "Parent table and column", "Data type", "Row number"], correct: 1 },
        { q: "ON DELETE CASCADE means:", qAr: "ON DELETE CASCADE يعني:", options: ["Prevent deletion", "Delete related rows too", "Set to NULL", "Do nothing"], correct: 1 },
        { q: "Parent table must be created:", qAr: "الجدول الأب يجب إنشاؤه:", options: ["After child table", "Before child table", "At same time", "Never"], correct: 1 },
        { q: "A foreign key value must exist in:", qAr: "قيمة المفتاح الخارجي يجب أن توجد في:", options: ["Same table", "Referenced table", "Any table", "No table"], correct: 1 }
      ]
    },
    5: {
      titleEn: "Creating Tables (Part 3) - Junction Tables",
      titleAr: "إنشاء الجداول (الجزء 3) - جداول الربط",
      icon: "📊",
      video: {
        title: "Many-to-Many Relationships in MySQL",
        titleAr: "علاقات متعدد لمتعدد",
        youtubeId: "1eUn6lsZ7c4",
        description: "Learn how to create junction tables for many-to-many relationships."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 5!",
          titleAr: "مرحباً بك في الأسبوع الخامس!",
          contentEn: "This week we'll learn about junction tables - special tables that connect two other tables in a many-to-many relationship.",
          contentAr: "هذا الأسبوع سنتعلم عن جداول الربط - جداول خاصة تربط جدولين آخرين في علاقة متعدد لمتعدد."
        },
        {
          type: "concept",
          titleEn: "Many-to-Many Relationships",
          titleAr: "علاقات متعدد لمتعدد",
          contentEn: "When one student can enroll in many courses, and one course can have many students, we have a many-to-many relationship. This requires a junction table.",
          contentAr: "عندما يمكن لطالب واحد التسجيل في عدة مقررات، ويمكن لمقرر واحد أن يضم عدة طلاب، لدينا علاقة متعدد لمتعدد. هذا يتطلب جدول ربط.",
          keyPoints: [
            { en: "Student → Many Courses", ar: "طالب ← عدة مقررات" },
            { en: "Course → Many Students", ar: "مقرر ← عدة طلاب" },
            { en: "Junction table connects both", ar: "جدول الربط يربط كليهما" },
            { en: "Contains foreign keys to both tables", ar: "يحتوي على مفاتيح خارجية لكلا الجدولين" }
          ]
        },
        {
          type: "sql",
          titleEn: "Create Courses Table",
          titleAr: "إنشاء جدول المقررات",
          code: `CREATE TABLE Courses (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    CourseName VARCHAR(100) NOT NULL,
    CourseCode VARCHAR(10) UNIQUE,
    Credits INT DEFAULT 3,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);`,
          explanation: "Creates a Courses table with a link to Departments.",
          explanationAr: "ينشئ جدول المقررات مع رابط للأقسام."
        },
        {
          type: "sql",
          titleEn: "Create Enrollments Junction Table",
          titleAr: "إنشاء جدول التسجيلات (جدول الربط)",
          code: `CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT NOT NULL,
    CourseID INT NOT NULL,
    EnrollmentDate DATE DEFAULT CURRENT_DATE,
    Grade CHAR(2),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
        ON DELETE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
        ON DELETE CASCADE,
    UNIQUE(StudentID, CourseID)  -- Prevent duplicate enrollments
);`,
          explanation: "Junction table linking Students and Courses with enrollment details.",
          explanationAr: "جدول ربط يصل الطلاب والمقررات مع تفاصيل التسجيل."
        }
      ],
      exercises: [
        { q: "A junction table:", qAr: "جدول الربط:", options: ["Has no keys", "Links two tables in M:N relationship", "Stores only dates", "Has one column"], correct: 1 },
        { q: "UNIQUE(StudentID, CourseID) prevents:", qAr: "UNIQUE(StudentID, CourseID) يمنع:", options: ["All enrollments", "Duplicate enrollments", "New students", "New courses"], correct: 1 },
        { q: "CHAR(2) for Grade stores:", qAr: "CHAR(2) للدرجة يخزن:", options: ["Two numbers", "Exactly 2 characters", "Two words", "Two rows"], correct: 1 },
        { q: "Many-to-Many requires:", qAr: "علاقة متعدد لمتعدد تتطلب:", options: ["One table", "Two tables", "Three tables (including junction)", "No tables"], correct: 2 },
        { q: "ON DELETE CASCADE in junction table:", qAr: "ON DELETE CASCADE في جدول الربط:", options: ["Keeps orphan records", "Deletes enrollment if student/course deleted", "Prevents all deletions", "Does nothing"], correct: 1 }
      ]
    },
    6: {
      titleEn: "Inserting Data (Part 1)",
      titleAr: "إدراج البيانات (الجزء 1)",
      icon: "✏️",
      video: {
        title: "MySQL INSERT Statement Tutorial",
        titleAr: "شرح إدراج البيانات",
        youtubeId: "D2_3MbakK9Q",
        description: "Learn how to insert data into MySQL tables using the INSERT statement."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 6!",
          titleAr: "مرحباً بك في الأسبوع السادس!",
          contentEn: "Now that we have our tables, let's learn how to add data to them using the INSERT command.",
          contentAr: "الآن بعد أن أنشأنا جداولنا، دعنا نتعلم كيفية إضافة البيانات إليها باستخدام أمر INSERT."
        },
        {
          type: "sql",
          titleEn: "Basic INSERT Statement",
          titleAr: "عبارة INSERT الأساسية",
          code: `-- Insert a department first (parent table)
INSERT INTO Departments (DepartmentName, Location)
VALUES ('Computer Science', 'Building A');

-- Insert a student
INSERT INTO Students (FirstName, LastName, Email, DateOfBirth)
VALUES ('Ahmed', 'Al-Saud', 'ahmed@university.edu', '2000-05-15');`,
          explanation: "Always insert into parent tables first, then child tables. Specify column names for clarity.",
          explanationAr: "دائماً أدرج في الجداول الأب أولاً، ثم الجداول الفرعية. حدد أسماء الأعمدة للوضوح."
        },
        {
          type: "sql",
          titleEn: "Insert Multiple Rows",
          titleAr: "إدراج صفوف متعددة",
          code: `INSERT INTO Students (FirstName, LastName, Email, DateOfBirth)
VALUES 
    ('Mohammed', 'Ali', 'mohammed@university.edu', '2001-03-20'),
    ('Fatima', 'Hassan', 'fatima@university.edu', '2000-11-08'),
    ('Omar', 'Ibrahim', 'omar@university.edu', '2002-01-25');`,
          explanation: "Insert multiple rows in a single statement for better performance.",
          explanationAr: "أدرج صفوفاً متعددة في عبارة واحدة لأداء أفضل."
        },
        {
          type: "concept",
          titleEn: "INSERT Best Practices",
          titleAr: "أفضل ممارسات INSERT",
          contentEn: "Follow these guidelines for successful data insertion.",
          contentAr: "اتبع هذه الإرشادات لإدراج بيانات ناجح.",
          keyPoints: [
            { en: "Text values use single quotes: 'Ahmed'", ar: "القيم النصية تستخدم علامات اقتباس مفردة: 'Ahmed'" },
            { en: "Dates use format: 'YYYY-MM-DD'", ar: "التواريخ تستخدم الصيغة: 'YYYY-MM-DD'" },
            { en: "Numbers don't need quotes: 100", ar: "الأرقام لا تحتاج علامات اقتباس: 100" },
            { en: "NULL means no value: NULL (no quotes)", ar: "NULL تعني لا قيمة: NULL (بدون علامات)" },
            { en: "AUTO_INCREMENT columns are skipped", ar: "أعمدة AUTO_INCREMENT يتم تخطيها" }
          ]
        }
      ],
      exercises: [
        { q: "INSERT INTO adds:", qAr: "INSERT INTO يضيف:", options: ["Tables", "Databases", "Records/Rows", "Columns"], correct: 2 },
        { q: "VALUES keyword contains:", qAr: "كلمة VALUES تحتوي:", options: ["Column names", "Data to insert", "Table names", "Conditions"], correct: 1 },
        { q: "Date format in MySQL:", qAr: "صيغة التاريخ في MySQL:", options: ["DD-MM-YYYY", "YYYY-MM-DD", "MM/DD/YYYY", "YYYY/DD/MM"], correct: 1 },
        { q: "Text values are enclosed in:", qAr: "القيم النصية تحاط بـ:", options: ["Double quotes", "Parentheses", "Single quotes", "Brackets"], correct: 2 },
        { q: "AUTO_INCREMENT columns:", qAr: "أعمدة AUTO_INCREMENT:", options: ["Must be specified", "Are auto-filled", "Cannot be used", "Store text"], correct: 1 }
      ]
    },
    7: {
      titleEn: "Inserting Data (Part 2) - Foreign Keys",
      titleAr: "إدراج البيانات (الجزء 2) - المفاتيح الخارجية",
      icon: "📝",
      video: {
        title: "Inserting Data with Foreign Keys",
        titleAr: "إدراج البيانات مع المفاتيح الخارجية",
        youtubeId: "9WEn-BJSpKM",
        description: "Learn the correct order for inserting data when tables have foreign key relationships."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 7!",
          titleAr: "مرحباً بك في الأسبوع السابع!",
          contentEn: "This week we'll learn the correct order for inserting data when tables are linked with foreign keys.",
          contentAr: "هذا الأسبوع سنتعلم الترتيب الصحيح لإدراج البيانات عندما تكون الجداول مرتبطة بالمفاتيح الخارجية."
        },
        {
          type: "concept",
          titleEn: "Insertion Order Matters!",
          titleAr: "ترتيب الإدراج مهم!",
          contentEn: "When tables are linked, you must insert data in the correct order to avoid foreign key errors.",
          contentAr: "عندما تكون الجداول مرتبطة، يجب إدراج البيانات بالترتيب الصحيح لتجنب أخطاء المفتاح الخارجي.",
          keyPoints: [
            { en: "1. Departments (no dependencies)", ar: "1. الأقسام (بدون تبعيات)" },
            { en: "2. Students (no dependencies)", ar: "2. الطلاب (بدون تبعيات)" },
            { en: "3. Instructors (depends on Departments)", ar: "3. المدرسون (يعتمد على الأقسام)" },
            { en: "4. Courses (depends on Departments)", ar: "4. المقررات (يعتمد على الأقسام)" },
            { en: "5. Enrollments (depends on Students & Courses)", ar: "5. التسجيلات (يعتمد على الطلاب والمقررات)" }
          ]
        },
        {
          type: "sql",
          titleEn: "Insert Course (with Foreign Key)",
          titleAr: "إدراج مقرر (مع مفتاح خارجي)",
          code: `-- First, check DepartmentID exists
SELECT * FROM Departments;  -- See ID 1 = 'Computer Science'

-- Insert course with valid DepartmentID
INSERT INTO Courses (CourseName, CourseCode, Credits, DepartmentID)
VALUES ('Database Systems', 'CS301', 3, 1);

-- This will FAIL - Department 999 doesn't exist!
INSERT INTO Courses (CourseName, CourseCode, Credits, DepartmentID)
VALUES ('Invalid Course', 'XX999', 3, 999);  -- ERROR!`,
          explanation: "Foreign key values MUST exist in the parent table, or you'll get an error.",
          explanationAr: "قيم المفتاح الخارجي يجب أن تكون موجودة في الجدول الأب، وإلا ستحصل على خطأ."
        },
        {
          type: "sql",
          titleEn: "Insert Enrollment (Junction Table)",
          titleAr: "إدراج تسجيل (جدول الربط)",
          code: `-- Enroll StudentID 1 in CourseID 1
INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate)
VALUES (1, 1, '2024-09-01');

-- Enroll same student in another course
INSERT INTO Enrollments (StudentID, CourseID)
VALUES (1, 2);  -- Uses default date

-- Add grade later
UPDATE Enrollments SET Grade = 'A' 
WHERE StudentID = 1 AND CourseID = 1;`,
          explanation: "Junction tables require valid foreign keys from BOTH related tables.",
          explanationAr: "جداول الربط تتطلب مفاتيح خارجية صالحة من كلا الجدولين المرتبطين."
        }
      ],
      exercises: [
        { q: "Foreign key values must:", qAr: "قيم المفتاح الخارجي يجب:", options: ["Be null", "Exist in parent table", "Be text", "Be auto-generated"], correct: 1 },
        { q: "Inserting invalid FK causes:", qAr: "إدراج FK غير صالح يسبب:", options: ["Success", "Warning", "Error", "Nothing"], correct: 2 },
        { q: "Parent table must be filled:", qAr: "الجدول الأب يجب ملؤه:", options: ["Last", "First", "Never", "Randomly"], correct: 1 },
        { q: "Enrollments table requires:", qAr: "جدول التسجيلات يتطلب:", options: ["StudentID only", "CourseID only", "Both StudentID and CourseID", "Neither"], correct: 2 },
        { q: "To add grade after enrollment:", qAr: "لإضافة الدرجة بعد التسجيل:", options: ["INSERT new row", "UPDATE existing row", "DELETE and re-add", "Not possible"], correct: 1 }
      ]
    },
    8: {
      titleEn: "SELECT Queries (Part 1)",
      titleAr: "استعلامات SELECT (الجزء 1)",
      icon: "🔍",
      video: {
        title: "MySQL SELECT Statement Tutorial",
        titleAr: "شرح استعلام SELECT",
        youtubeId: "7S_tz1z_5bA",
        description: "Master the SELECT statement - the most important SQL command for retrieving data."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 8!",
          titleAr: "مرحباً بك في الأسبوع الثامن!",
          contentEn: "SELECT is the most used SQL command. It retrieves data from your database without modifying anything.",
          contentAr: "SELECT هو أكثر أوامر SQL استخداماً. يسترجع البيانات من قاعدة بياناتك دون تعديل أي شيء."
        },
        {
          type: "sql",
          titleEn: "Basic SELECT",
          titleAr: "SELECT الأساسي",
          code: `-- Select all columns from Students
SELECT * FROM Students;

-- Select specific columns
SELECT FirstName, LastName, Email FROM Students;

-- Select with alias
SELECT FirstName AS 'First Name', LastName AS 'Last Name' 
FROM Students;`,
          explanation: "* means all columns. Specify column names to retrieve only what you need.",
          explanationAr: "* تعني جميع الأعمدة. حدد أسماء الأعمدة لاسترجاع ما تحتاجه فقط."
        },
        {
          type: "sql",
          titleEn: "WHERE Clause - Filtering Data",
          titleAr: "جملة WHERE - تصفية البيانات",
          code: `-- Find student by ID
SELECT * FROM Students WHERE StudentID = 1;

-- Find students born after 2000
SELECT * FROM Students WHERE DateOfBirth > '2000-01-01';

-- Find students with specific email domain
SELECT * FROM Students WHERE Email LIKE '%@university.edu';

-- Multiple conditions
SELECT * FROM Students 
WHERE DateOfBirth > '2000-01-01' AND Email IS NOT NULL;`,
          explanation: "WHERE filters which rows are returned. Use AND/OR to combine conditions.",
          explanationAr: "WHERE تصفي الصفوف المرتجعة. استخدم AND/OR لدمج الشروط."
        },
        {
          type: "concept",
          titleEn: "WHERE Operators",
          titleAr: "عوامل WHERE",
          contentEn: "Common operators for filtering data in WHERE clause.",
          contentAr: "العوامل الشائعة لتصفية البيانات في جملة WHERE.",
          keyPoints: [
            { en: "= Equal to", ar: "= يساوي" },
            { en: "<>, != Not equal to", ar: "<>, != لا يساوي" },
            { en: "> Greater than, < Less than", ar: "> أكبر من، < أصغر من" },
            { en: "BETWEEN x AND y (range)", ar: "BETWEEN x AND y (مدى)" },
            { en: "LIKE 'pattern%' (wildcard search)", ar: "LIKE 'pattern%' (بحث بالنمط)" },
            { en: "IN (value1, value2, ...) (list)", ar: "IN (value1, value2, ...) (قائمة)" },
            { en: "IS NULL, IS NOT NULL", ar: "IS NULL, IS NOT NULL" }
          ]
        }
      ],
      exercises: [
        { q: "SELECT * returns:", qAr: "SELECT * يرجع:", options: ["One column", "All columns", "No columns", "First column"], correct: 1 },
        { q: "WHERE clause is used to:", qAr: "جملة WHERE تستخدم لـ:", options: ["Sort data", "Filter rows", "Delete data", "Insert data"], correct: 1 },
        { q: "LIKE '%ahmed%' finds:", qAr: "LIKE '%ahmed%' يجد:", options: ["Exact 'ahmed'", "Starts with ahmed", "Contains ahmed anywhere", "Ends with ahmed"], correct: 2 },
        { q: "IS NULL checks for:", qAr: "IS NULL يتحقق من:", options: ["Zero value", "Empty string", "Missing value", "Any value"], correct: 2 },
        { q: "AND combines conditions as:", qAr: "AND يدمج الشروط كـ:", options: ["Either can be true", "Both must be true", "Neither needed", "Opposite"], correct: 1 }
      ]
    },
    9: {
      titleEn: "SELECT Queries (Part 2) - JOINs",
      titleAr: "استعلامات SELECT (الجزء 2) - الربط",
      icon: "🔗",
      video: {
        title: "MySQL JOINs Explained",
        titleAr: "شرح ربط الجداول JOIN",
        youtubeId: "Jh_pvk48jHA",
        description: "Learn all types of JOINs to combine data from multiple tables."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 9!",
          titleAr: "مرحباً بك في الأسبوع التاسع!",
          contentEn: "JOINs are essential for combining data from multiple related tables. This is where relational databases really shine!",
          contentAr: "الربط (JOIN) ضروري لدمج البيانات من عدة جداول مرتبطة. هذا هو المكان الذي تتألق فيه قواعد البيانات العلائقية!"
        },
        {
          type: "sql",
          titleEn: "INNER JOIN - Matching Records Only",
          titleAr: "INNER JOIN - السجلات المتطابقة فقط",
          code: `-- Get student names with their enrolled courses
SELECT 
    s.FirstName,
    s.LastName,
    c.CourseName,
    e.Grade
FROM Students s
INNER JOIN Enrollments e ON s.StudentID = e.StudentID
INNER JOIN Courses c ON e.CourseID = c.CourseID;`,
          explanation: "INNER JOIN returns only rows that have matching values in both tables.",
          explanationAr: "INNER JOIN يرجع فقط الصفوف التي لها قيم متطابقة في كلا الجدولين."
        },
        {
          type: "sql",
          titleEn: "LEFT JOIN - Include All From Left Table",
          titleAr: "LEFT JOIN - شمل الكل من الجدول الأيسر",
          code: `-- Get all students, even those not enrolled in any course
SELECT 
    s.FirstName,
    s.LastName,
    c.CourseName
FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
LEFT JOIN Courses c ON e.CourseID = c.CourseID;`,
          explanation: "LEFT JOIN returns all rows from left table, with NULLs where no match exists.",
          explanationAr: "LEFT JOIN يرجع جميع الصفوف من الجدول الأيسر، مع NULL حيث لا يوجد تطابق."
        },
        {
          type: "concept",
          titleEn: "Types of JOINs",
          titleAr: "أنواع الربط",
          contentEn: "Different JOINs for different needs.",
          contentAr: "أنواع مختلفة من الربط لاحتياجات مختلفة.",
          keyPoints: [
            { en: "INNER JOIN - Only matching rows", ar: "INNER JOIN - الصفوف المتطابقة فقط" },
            { en: "LEFT JOIN - All from left + matches", ar: "LEFT JOIN - الكل من اليسار + المتطابقات" },
            { en: "RIGHT JOIN - All from right + matches", ar: "RIGHT JOIN - الكل من اليمين + المتطابقات" },
            { en: "FULL JOIN - All rows from both tables", ar: "FULL JOIN - جميع الصفوف من الجدولين" }
          ]
        }
      ],
      exercises: [
        { q: "INNER JOIN returns:", qAr: "INNER JOIN يرجع:", options: ["All rows", "Only matching rows", "Non-matching rows", "Empty result"], correct: 1 },
        { q: "LEFT JOIN includes:", qAr: "LEFT JOIN يشمل:", options: ["Right table only", "Matching only", "All from left table", "Nothing"], correct: 2 },
        { q: "ON specifies:", qAr: "ON تحدد:", options: ["Table name", "Join condition", "Column type", "Sort order"], correct: 1 },
        { q: "Table alias 's' in 's.FirstName':", qAr: "الاسم المستعار 's' في 's.FirstName':", options: ["Creates new table", "References table", "Deletes table", "Copies table"], correct: 1 },
        { q: "Multiple JOINs in one query is:", qAr: "عدة JOINs في استعلام واحد:", options: ["Not allowed", "Allowed and common", "Causes errors", "Not recommended"], correct: 1 }
      ]
    },
    10: {
      titleEn: "Aggregate Functions & GROUP BY",
      titleAr: "الدوال التجميعية و GROUP BY",
      icon: "📈",
      video: {
        title: "MySQL GROUP BY and Aggregate Functions",
        titleAr: "الدوال التجميعية و GROUP BY",
        youtubeId: "DWFHpOkLzLo",
        description: "Learn to summarize data using COUNT, SUM, AVG, MIN, MAX and GROUP BY."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 10!",
          titleAr: "مرحباً بك في الأسبوع العاشر!",
          contentEn: "Aggregate functions summarize data - count rows, calculate averages, find maximum values, and more!",
          contentAr: "الدوال التجميعية تلخص البيانات - عد الصفوف، حساب المتوسطات، إيجاد القيم القصوى، والمزيد!"
        },
        {
          type: "sql",
          titleEn: "Aggregate Functions",
          titleAr: "الدوال التجميعية",
          code: `-- Count all students
SELECT COUNT(*) AS TotalStudents FROM Students;

-- Count students per department (with JOIN)
SELECT d.DepartmentName, COUNT(s.StudentID) AS StudentCount
FROM Departments d
LEFT JOIN Students s ON d.DepartmentID = s.DepartmentID
GROUP BY d.DepartmentID;

-- Average, Min, Max for numeric data
SELECT 
    AVG(Credits) AS AvgCredits,
    MIN(Credits) AS MinCredits,
    MAX(Credits) AS MaxCredits,
    SUM(Credits) AS TotalCredits
FROM Courses;`,
          explanation: "COUNT, AVG, SUM, MIN, MAX summarize data. Use with GROUP BY for grouped results.",
          explanationAr: "COUNT, AVG, SUM, MIN, MAX تلخص البيانات. استخدمها مع GROUP BY لنتائج مجمعة."
        },
        {
          type: "sql",
          titleEn: "GROUP BY with HAVING",
          titleAr: "GROUP BY مع HAVING",
          code: `-- Find departments with more than 5 students
SELECT DepartmentID, COUNT(*) AS StudentCount
FROM Students
GROUP BY DepartmentID
HAVING COUNT(*) > 5;

-- Courses with average enrollment > 10 students
SELECT c.CourseName, COUNT(e.StudentID) AS Enrolled
FROM Courses c
JOIN Enrollments e ON c.CourseID = e.CourseID
GROUP BY c.CourseID
HAVING COUNT(e.StudentID) > 10
ORDER BY Enrolled DESC;`,
          explanation: "HAVING filters grouped results (like WHERE but for groups). ORDER BY sorts the output.",
          explanationAr: "HAVING تصفي النتائج المجمعة (مثل WHERE لكن للمجموعات). ORDER BY ترتب المخرجات."
        }
      ],
      exercises: [
        { q: "COUNT(*) returns:", qAr: "COUNT(*) يرجع:", options: ["Sum of values", "Average", "Number of rows", "Maximum value"], correct: 2 },
        { q: "GROUP BY groups:", qAr: "GROUP BY يجمع:", options: ["Tables", "Databases", "Rows with same values", "Columns"], correct: 2 },
        { q: "HAVING filters:", qAr: "HAVING تصفي:", options: ["Individual rows", "Grouped results", "Tables", "Databases"], correct: 1 },
        { q: "AVG() calculates:", qAr: "AVG() تحسب:", options: ["Sum", "Count", "Average", "Maximum"], correct: 2 },
        { q: "ORDER BY DESC means:", qAr: "ORDER BY DESC يعني:", options: ["Ascending order", "Descending order", "No order", "Random order"], correct: 1 }
      ]
    },
    11: {
      titleEn: "UPDATE & DELETE Operations",
      titleAr: "عمليات UPDATE و DELETE",
      icon: "🔄",
      video: {
        title: "MySQL UPDATE and DELETE Tutorial",
        titleAr: "شرح UPDATE و DELETE",
        youtubeId: "a8yrFVPwtAc",
        description: "Learn how to safely modify and delete data in MySQL tables."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 11!",
          titleAr: "مرحباً بك في الأسبوع الحادي عشر!",
          contentEn: "UPDATE modifies existing data, DELETE removes data. Both are powerful - use with caution!",
          contentAr: "UPDATE يعدل البيانات الموجودة، DELETE يحذف البيانات. كلاهما قوي - استخدمهما بحذر!"
        },
        {
          type: "sql",
          titleEn: "UPDATE Statement",
          titleAr: "عبارة UPDATE",
          code: `-- Update one student's email
UPDATE Students 
SET Email = 'new.email@university.edu'
WHERE StudentID = 1;

-- Update multiple columns
UPDATE Students 
SET 
    FirstName = 'Mohammed',
    LastName = 'Al-Rashid',
    Email = 'mohammed.r@university.edu'
WHERE StudentID = 2;

-- Update based on condition
UPDATE Enrollments
SET Grade = 'A+'
WHERE CourseID = 1 AND StudentID IN (
    SELECT StudentID FROM Students WHERE EnrollmentDate < '2024-01-01'
);`,
          explanation: "⚠️ ALWAYS use WHERE with UPDATE! Without it, ALL rows will be modified.",
          explanationAr: "⚠️ دائماً استخدم WHERE مع UPDATE! بدونها، سيتم تعديل جميع الصفوف."
        },
        {
          type: "sql",
          titleEn: "DELETE Statement",
          titleAr: "عبارة DELETE",
          code: `-- Delete one enrollment
DELETE FROM Enrollments WHERE EnrollmentID = 5;

-- Delete student (will fail if has enrollments with ON DELETE RESTRICT)
DELETE FROM Students WHERE StudentID = 10;

-- Delete old enrollments
DELETE FROM Enrollments 
WHERE EnrollmentDate < '2020-01-01';

-- ⚠️ DANGEROUS: Delete ALL rows (use TRUNCATE instead for speed)
-- DELETE FROM Students;  -- Don't run this!
-- TRUNCATE TABLE Students;  -- Faster but can't rollback`,
          explanation: "⚠️ ALWAYS use WHERE with DELETE! Test with SELECT first to see what will be deleted.",
          explanationAr: "⚠️ دائماً استخدم WHERE مع DELETE! اختبر بـ SELECT أولاً لترى ما سيُحذف."
        },
        {
          type: "concept",
          titleEn: "Safety Tips",
          titleAr: "نصائح السلامة",
          contentEn: "Protect your data from accidental modification or deletion.",
          contentAr: "احمِ بياناتك من التعديل أو الحذف العرضي.",
          keyPoints: [
            { en: "Always use WHERE clause", ar: "دائماً استخدم جملة WHERE" },
            { en: "Test with SELECT first", ar: "اختبر بـ SELECT أولاً" },
            { en: "Use transactions for safety", ar: "استخدم المعاملات للسلامة" },
            { en: "Backup before bulk changes", ar: "انسخ احتياطياً قبل التغييرات الكبيرة" },
            { en: "Use LIMIT to restrict affected rows", ar: "استخدم LIMIT لتقييد الصفوف المتأثرة" }
          ]
        }
      ],
      exercises: [
        { q: "UPDATE without WHERE:", qAr: "UPDATE بدون WHERE:", options: ["Updates nothing", "Updates one row", "Updates ALL rows", "Causes error"], correct: 2 },
        { q: "DELETE removes:", qAr: "DELETE يحذف:", options: ["Columns", "Tables", "Rows", "Databases"], correct: 2 },
        { q: "To test before DELETE, use:", qAr: "للاختبار قبل DELETE، استخدم:", options: ["INSERT", "UPDATE", "SELECT with same WHERE", "DROP"], correct: 2 },
        { q: "TRUNCATE TABLE:", qAr: "TRUNCATE TABLE:", options: ["Deletes table structure", "Deletes all rows quickly", "Updates rows", "Creates table"], correct: 1 },
        { q: "SET in UPDATE specifies:", qAr: "SET في UPDATE تحدد:", options: ["Which rows", "New values", "Table name", "Conditions"], correct: 1 }
      ]
    },
    12: {
      titleEn: "Database Design & Normalization",
      titleAr: "تصميم قواعد البيانات والتطبيع",
      icon: "🏗️",
      video: {
        title: "Database Normalization Explained",
        titleAr: "شرح تطبيع قواعد البيانات",
        youtubeId: "UrYLYV7WSHM",
        description: "Learn the principles of database normalization: 1NF, 2NF, 3NF explained simply."
      },
      content: [
        {
          type: "intro",
          titleEn: "Welcome to Week 12!",
          titleAr: "مرحباً بك في الأسبوع الثاني عشر!",
          contentEn: "Good database design prevents data problems. Normalization is the process of organizing data to reduce redundancy.",
          contentAr: "التصميم الجيد لقاعدة البيانات يمنع مشاكل البيانات. التطبيع هو عملية تنظيم البيانات لتقليل التكرار."
        },
        {
          type: "concept",
          titleEn: "Why Normalize?",
          titleAr: "لماذا نُطبّع؟",
          contentEn: "Normalization solves common data problems.",
          contentAr: "التطبيع يحل مشاكل البيانات الشائعة.",
          keyPoints: [
            { en: "Eliminates duplicate data", ar: "يزيل البيانات المكررة" },
            { en: "Prevents update anomalies", ar: "يمنع شذوذات التحديث" },
            { en: "Prevents insert anomalies", ar: "يمنع شذوذات الإدراج" },
            { en: "Prevents delete anomalies", ar: "يمنع شذوذات الحذف" },
            { en: "Saves storage space", ar: "يوفر مساحة التخزين" }
          ]
        },
        {
          type: "concept",
          titleEn: "Normal Forms",
          titleAr: "أشكال التطبيع",
          contentEn: "Three main levels of normalization.",
          contentAr: "ثلاثة مستويات رئيسية من التطبيع.",
          keyPoints: [
            { en: "1NF: Each cell has one value (no lists)", ar: "1NF: كل خلية لها قيمة واحدة (بدون قوائم)" },
            { en: "1NF: No repeating groups of columns", ar: "1NF: لا مجموعات أعمدة متكررة" },
            { en: "2NF: Must be in 1NF + No partial dependencies", ar: "2NF: يجب أن يكون في 1NF + لا تبعيات جزئية" },
            { en: "3NF: Must be in 2NF + No transitive dependencies", ar: "3NF: يجب أن يكون في 2NF + لا تبعيات متعدية" }
          ]
        },
        {
          type: "sql",
          titleEn: "Bad vs Good Design Example",
          titleAr: "مثال تصميم سيء مقابل جيد",
          code: `-- BAD: Repeating groups, redundant data
CREATE TABLE BadDesign (
    StudentID INT,
    StudentName VARCHAR(100),
    Course1 VARCHAR(100),
    Course1Instructor VARCHAR(100),
    Course2 VARCHAR(100),
    Course2Instructor VARCHAR(100)
);

-- GOOD: Normalized - separate tables, no redundancy
-- Students table, Courses table, Instructors table, Enrollments table
-- Each piece of data stored once!`,
          explanation: "Normalized design: change instructor name in ONE place, affects all courses.",
          explanationAr: "التصميم المُطبّع: غيّر اسم المدرس في مكان واحد، يؤثر على جميع المقررات."
        }
      ],
      exercises: [
        { q: "1NF requires:", qAr: "1NF يتطلب:", options: ["Lists in cells", "One value per cell", "Empty cells", "Multiple tables"], correct: 1 },
        { q: "Normalization reduces:", qAr: "التطبيع يقلل:", options: ["Tables", "Columns", "Data redundancy", "Performance"], correct: 2 },
        { q: "3NF depends on:", qAr: "3NF يعتمد على:", options: ["1NF only", "2NF only", "Both 1NF and 2NF", "Nothing"], correct: 2 },
        { q: "Update anomaly means:", qAr: "شذوذ التحديث يعني:", options: ["Can't update", "Must update same data in multiple places", "Automatic updates", "No updates needed"], correct: 1 },
        { q: "Good design has:", qAr: "التصميم الجيد لديه:", options: ["Redundant data", "No relationships", "Each fact stored once", "No keys"], correct: 2 }
      ]
    }
  };

  const week = weekData[weekNum];
  if (!week) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">Week {weekNum} not found</p>
          <button onClick={() => onNavigate('home')} className="px-6 py-2 bg-amber-600 rounded-lg">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const totalSteps = week.content.length + (week.video ? 1 : 0) + 1; // video + content + summary

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (!exerciseSubmitted) {
      setExerciseAnswers({ ...exerciseAnswers, [questionIndex]: answerIndex });
    }
  };

  const handleSubmitExercise = () => {
    let correct = 0;
    week.exercises.forEach((ex, i) => {
      if (exerciseAnswers[i] === ex.correct) correct++;
    });
    const score = Math.round((correct / week.exercises.length) * 100);
    setExerciseScore(score);
    setExerciseSubmitted(true);
    onExerciseComplete(weekNum, score);
  };

  const renderContent = () => {
    if (showExercise) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            📝 Week {weekNum} Exercise | تمرين الأسبوع {weekNum}
          </h2>

          {exerciseSubmitted ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className={`text-6xl mb-4 ${exerciseScore >= 80 ? '🎉' : exerciseScore >= 60 ? '👍' : '📚'}`}>
                {exerciseScore >= 80 ? '🎉' : exerciseScore >= 60 ? '👍' : '📚'}
              </div>
              <h3 className="text-3xl font-bold mb-2">
                <span className={exerciseScore >= 80 ? 'text-emerald-400' : exerciseScore >= 60 ? 'text-amber-400' : 'text-red-400'}>
                  {exerciseScore}%
                </span>
              </h3>
              <p className="text-slate-400 mb-6">
                {exerciseScore >= 80 ? 'Excellent! Great job!' : exerciseScore >= 60 ? 'Good work! Keep practicing.' : 'Keep studying and try again!'}
              </p>

              <div className="space-y-4 text-left mb-8">
                {week.exercises.map((ex, i) => (
                  <div key={i} className={`p-4 rounded-lg ${exerciseAnswers[i] === ex.correct ? 'bg-emerald-900/30 border border-emerald-500/50' : 'bg-red-900/30 border border-red-500/50'}`}>
                    <p className="text-white font-medium mb-2">{i + 1}. {ex.q}</p>
                    <p className="text-sm text-slate-400">Your answer: {ex.options[exerciseAnswers[i]] || 'Not answered'}</p>
                    {exerciseAnswers[i] !== ex.correct && (
                      <p className="text-sm text-emerald-400">Correct: {ex.options[ex.correct]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button onClick={() => { setShowExercise(false); setCurrentStep(0); setExerciseAnswers({}); setExerciseSubmitted(false); }} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl">
                  Review Lesson
                </button>
                <button onClick={() => onNavigate('home')} className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl">
                  Back to Course
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              {week.exercises.map((ex, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <p className="text-white font-medium mb-1">{i + 1}. {ex.q}</p>
                  <p className="text-amber-300/70 text-sm font-arabic mb-4" dir="rtl">{ex.qAr}</p>
                  <div className="space-y-2">
                    {ex.options.map((opt, j) => (
                      <button key={j} onClick={() => handleAnswerSelect(i, j)} className={`w-full text-left px-4 py-3 rounded-lg transition-all ${exerciseAnswers[i] === j ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={handleSubmitExercise} disabled={Object.keys(exerciseAnswers).length < week.exercises.length} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl">
                Submit Answers | تسليم الإجابات
              </button>
            </div>
          )}
        </div>
      );
    }

    // Video step (step 0 if video exists)
    if (week.video && currentStep === 0) {
      return (
        <div className="p-6">
          <div className="text-center mb-6">
            <span className="px-3 py-1 bg-red-600/30 rounded-full text-red-300 text-sm">
              🎬 Video Tutorial
            </span>
            <h2 className="text-2xl font-bold text-white mt-4 mb-1">{week.video.title}</h2>
            <p className="text-amber-300/70 font-arabic">{week.video.titleAr}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-600 mb-4">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${week.video.youtubeId}`}
                title={week.video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4">
              <p className="text-slate-300">{week.video.description}</p>
            </div>
          </div>
        </div>
      );
    }

    const contentIndex = week.video ? currentStep - 1 : currentStep;

    if (contentIndex >= 0 && contentIndex < week.content.length) {
      const content = week.content[contentIndex];
      return (
        <div className="p-6">
          <div className="text-center mb-6">
            <span className="px-3 py-1 bg-blue-600/30 rounded-full text-blue-300 text-sm">
              {content.type === 'sql' ? '💻 SQL' : content.type === 'hands-on' ? '🛠️ Hands-On' : content.type === 'intro' ? '👋 Introduction' : '📖 Concept'}
            </span>
            <h2 className="text-2xl font-bold text-white mt-4 mb-1">{content.titleEn}</h2>
            <p className="text-amber-300/70 font-arabic">{content.titleAr}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {content.type === 'sql' && (
              <>
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-600 mb-4">
                  <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-slate-400 text-sm">SQL</span>
                  </div>
                  <pre className="p-6 text-cyan-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                    {content.code}
                  </pre>
                </div>
                <div className="bg-slate-700/30 rounded-xl p-4 space-y-2">
                  <p className="text-slate-300">{content.explanation}</p>
                  {content.explanationAr && <p className="text-slate-400 font-arabic" dir="rtl">{content.explanationAr}</p>}
                </div>
              </>
            )}

            {(content.type === 'concept' || content.type === 'intro') && (
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <p className="text-lg text-slate-200 mb-4">{content.contentEn}</p>
                  <p className="text-lg text-slate-400 font-arabic" dir="rtl">{content.contentAr}</p>
                </div>
                {content.keyPoints && (
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-amber-400 font-semibold mb-4">Key Points | النقاط الرئيسية</h3>
                    <div className="space-y-3">
                      {content.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-amber-500 mt-1">•</span>
                          <div>
                            <p className="text-slate-200">{point.en}</p>
                            <p className="text-slate-400 text-sm font-arabic" dir="rtl">{point.ar}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {content.type === 'hands-on' && content.steps && (
              <div className="space-y-3">
                {content.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 bg-slate-700/30 rounded-lg p-4">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-white">{typeof step === 'string' ? step : step.en}</p>
                      {typeof step === 'object' && step.ar && (
                        <p className="text-slate-400 text-sm font-arabic mt-1" dir="rtl">{step.ar}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Summary step
    return (
      <div className="p-6 text-center">
        <span className="text-5xl block mb-4">✅</span>
        <h2 className="text-2xl font-bold text-white mb-2">Lesson Complete!</h2>
        <p className="text-amber-300/70 font-arabic mb-6">اكتمل الدرس!</p>
        
        <div className="max-w-md mx-auto">
          <p className="text-slate-400 mb-6">
            Now take the exercise to test your knowledge and earn your grade!
          </p>
          <button
            onClick={() => setShowExercise(true)}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl text-lg"
          >
            📝 Start Exercise | ابدأ التمرين
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
            >
              ← Back
            </button>
            <div>
              <h1 className="font-bold text-white">Week {weekNum}: {week.titleEn}</h1>
              <p className="text-xs text-amber-300/70 font-arabic">{week.titleAr}</p>
            </div>
          </div>
          <span className="text-3xl">{week.icon}</span>
        </div>
      </header>

      {/* Progress */}
      {!showExercise && (
        <div className="bg-slate-800/50 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full overflow-y-auto">
        {renderContent()}
      </div>

      {/* Navigation */}
      {!showExercise && (
        <div className="bg-slate-800/80 border-t border-slate-700 p-4 sticky bottom-0">
          <div className="max-w-6xl mx-auto flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg ${currentStep === 0 ? 'bg-slate-700 text-slate-500' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
            >
              ← Previous
            </button>
            
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setShowExercise(true)}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
              >
                📝 Take Exercise
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekLesson;
