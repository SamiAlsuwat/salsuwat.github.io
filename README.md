from pathlib import Path

html = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>الجدول الدراسي العملي</title>
  <style>
    :root{
      --bg1:#eef2f3;
      --bg2:#d9e2ec;
      --panel:#5a3d0c;
      --panel-dark:#4a320a;
      --card:#ffffff;
      --text:#1f2937;
      --muted:#6b7280;
      --line:#e5e7eb;
      --row:#f8fafc;
      --chip:#f3f4f6;
      --shadow:0 10px 30px rgba(0,0,0,.08);
      --radius:18px;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family: Tahoma, Arial, sans-serif;
      color:var(--text);
      background: linear-gradient(135deg,var(--bg1),var(--bg2));
      min-height:100vh;
    }
    .layout{
      display:grid;
      grid-template-columns: 280px 1fr;
      min-height:100vh;
    }
    .sidebar{
      background: linear-gradient(180deg,var(--panel),var(--panel-dark));
      color:#fff;
      padding:28px 22px;
      position:sticky;
      top:0;
      height:100vh;
      box-shadow: var(--shadow);
    }
    .brand{
      font-size:26px;
      font-weight:700;
      margin:0 0 8px;
    }
    .subtitle{
      margin:0 0 24px;
      color:rgba(255,255,255,.85);
      line-height:1.8;
      font-size:14px;
    }
    .nav{
      display:flex;
      flex-direction:column;
      gap:10px;
      margin-top:18px;
    }
    .nav a{
      color:#fff;
      text-decoration:none;
      padding:12px 14px;
      border-radius:12px;
      background:rgba(255,255,255,.08);
      transition:.2s ease;
    }
    .nav a:hover{
      background:rgba(255,255,255,.16);
      transform:translateY(-1px);
    }
    .sidebar-note{
      margin-top:28px;
      padding:14px;
      border:1px solid rgba(255,255,255,.15);
      border-radius:14px;
      background:rgba(255,255,255,.06);
      font-size:13px;
      line-height:1.9;
      color:rgba(255,255,255,.9);
    }
    .main{
      padding:28px;
    }
    .hero{
      background:rgba(255,255,255,.75);
      backdrop-filter: blur(8px);
      border:1px solid rgba(255,255,255,.6);
      border-radius:24px;
      box-shadow: var(--shadow);
      padding:26px;
      margin-bottom:22px;
    }
    .hero h1{
      margin:0 0 10px;
      font-size:32px;
    }
    .hero p{
      margin:0;
      color:var(--muted);
      line-height:1.9;
    }
    .stats{
      display:grid;
      grid-template-columns: repeat(4, minmax(0,1fr));
      gap:14px;
      margin-top:18px;
    }
    .stat{
      background:var(--card);
      border:1px solid var(--line);
      border-radius:18px;
      padding:18px;
    }
    .stat .label{
      color:var(--muted);
      font-size:13px;
      margin-bottom:8px;
    }
    .stat .value{
      font-size:28px;
      font-weight:700;
    }
    .card{
      background:var(--card);
      border:1px solid var(--line);
      border-radius:24px;
      box-shadow: var(--shadow);
      overflow:hidden;
    }
    .card-header{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      padding:22px 22px 14px;
      flex-wrap:wrap;
    }
    .card-header h2{
      margin:0;
      font-size:24px;
    }
    .card-header p{
      margin:6px 0 0;
      color:var(--muted);
      font-size:14px;
    }
    .tools{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
    }
    .search{
      min-width:240px;
      padding:12px 14px;
      border-radius:12px;
      border:1px solid var(--line);
      outline:none;
      font-size:14px;
    }
    .btn{
      border:none;
      background:var(--panel);
      color:#fff;
      padding:12px 16px;
      border-radius:12px;
      cursor:pointer;
      font-size:14px;
    }
    .table-wrap{
      padding:0 22px 22px;
      overflow:auto;
    }
    table{
      width:100%;
      border-collapse:separate;
      border-spacing:0;
      min-width:700px;
    }
    th, td{
      padding:15px 14px;
      text-align:right;
      border-bottom:1px solid var(--line);
      vertical-align:middle;
    }
    th{
      position:sticky;
      top:0;
      background:#f8fafc;
      color:#374151;
      font-size:14px;
      z-index:1;
    }
    tbody tr:nth-child(even){
      background:var(--row);
    }
    tbody tr:hover{
      background:#eef6ff;
    }
    .code{
      font-family: Arial, sans-serif;
      font-weight:700;
      color:#4b5563;
      white-space:nowrap;
    }
    .course-link{
      color:#0f3d91;
      text-decoration:none;
      font-weight:700;
    }
    .course-link:hover{
      text-decoration:underline;
    }
    .chip{
      display:inline-block;
      background:var(--chip);
      border:1px solid var(--line);
      padding:7px 12px;
      border-radius:999px;
      font-size:13px;
      white-space:nowrap;
    }
    .footer{
      margin-top:18px;
      color:var(--muted);
      font-size:13px;
      text-align:center;
    }
    @media (max-width: 980px){
      .layout{grid-template-columns:1fr}
      .sidebar{
        position:relative;
        height:auto;
      }
      .stats{grid-template-columns: repeat(2, minmax(0,1fr));}
      .main{padding:18px;}
    }
    @media (max-width: 640px){
      .stats{grid-template-columns:1fr}
      .hero h1{font-size:26px}
      .card-header{padding:18px 18px 10px}
      .table-wrap{padding:0 18px 18px}
      .search{min-width:100%}
    }
  </style>
</head>
<body>
  <div class="layout">
    <aside class="sidebar">
      <h2 class="brand">📘 صفحة الجدول</h2>
      <p class="subtitle">نسخة احترافية بسيطة مناسبة للنشر على GitHub Pages، مع بحث سريع داخل المقررات والشعب.</p>

      <nav class="nav">
        <a href="#overview">نظرة عامة</a>
        <a href="#schedule">الجدول الدراسي</a>
      </nav>

      <div class="sidebar-note">
        <strong>ملاحظة:</strong><br>
        يمكنك لاحقًا ربط كل اسم مقرر بصفحة مستقلة، مثل صفحة توصيف أو محاضرات أو سلايدات خاصة بالمقرر نفسه.
      </div>
    </aside>

    <main class="main">
      <section class="hero" id="overview">
        <h1>الجدول الدراسي العملي</h1>
        <p>هذه الصفحة تعرض المقررات العملية والشعب بشكل منظم وقابل للبحث، ويمكن استخدامها مباشرة كموقع بسيط على GitHub.</p>

        <div class="stats">
          <div class="stat">
            <div class="label">إجمالي الصفوف</div>
            <div class="value">19</div>
          </div>
          <div class="stat">
            <div class="label">عدد المقررات</div>
            <div class="value">10</div>
          </div>
          <div class="stat">
            <div class="label">نوع النشاط</div>
            <div class="value">عملي</div>
          </div>
          <div class="stat">
            <div class="label">اللغة</div>
            <div class="value">العربية</div>
          </div>
        </div>
      </section>

      <section class="card" id="schedule">
        <div class="card-header">
          <div>
            <h2>📅 الجدول الدراسي</h2>
            <p>اكتب اسم مقرر أو رمز مقرر أو رقم شعبة للبحث داخل الجدول.</p>
          </div>
          <div class="tools">
            <input id="searchInput" class="search" type="text" placeholder="ابحث هنا..." />
            <button class="btn" onclick="clearSearch()">مسح البحث</button>
          </div>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>رمز المقرر</th>
                <th>اسم المقرر</th>
                <th>النشاط</th>
                <th>الشعبة</th>
              </tr>
            </thead>
            <tbody id="scheduleBody">
              <tr>
                <td class="code">501224-4</td>
                <td><a class="course-link" href="#">البرمجة الشيئية</a></td>
                <td><span class="chip">عملي</span></td>
                <td>268</td>
              </tr>
              <tr>
                <td class="code">5021201-4</td>
                <td><a class="course-link" href="#">أساسيات قواعد البيانات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>2925</td>
              </tr>
              <tr>
                <td class="code">502315-3</td>
                <td><a class="course-link" href="#">نظم الويب</a></td>
                <td><span class="chip">عملي</span></td>
                <td>484</td>
              </tr>
              <tr>
                <td class="code">502321-3</td>
                <td><a class="course-link" href="#">أساسيات نظم التشغيل</a></td>
                <td><span class="chip">عملي</span></td>
                <td>472</td>
              </tr>
              <tr>
                <td class="code">502321-3</td>
                <td><a class="course-link" href="#">أساسيات نظم التشغيل</a></td>
                <td><span class="chip">عملي</span></td>
                <td>486</td>
              </tr>
              <tr>
                <td class="code">502321-3</td>
                <td><a class="course-link" href="#">أساسيات نظم التشغيل</a></td>
                <td><span class="chip">عملي</span></td>
                <td>487</td>
              </tr>
              <tr>
                <td class="code">502321-3</td>
                <td><a class="course-link" href="#">أساسيات نظم التشغيل</a></td>
                <td><span class="chip">عملي</span></td>
                <td>498</td>
              </tr>
              <tr>
                <td class="code">502321-3</td>
                <td><a class="course-link" href="#">أساسيات نظم التشغيل</a></td>
                <td><span class="chip">عملي</span></td>
                <td>499</td>
              </tr>
              <tr>
                <td class="code">502372-3</td>
                <td><a class="course-link" href="#">أساسيات قواعد البيانات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>567</td>
              </tr>
              <tr>
                <td class="code">502373-3</td>
                <td><a class="course-link" href="#">نظم إدارة قواعد البيانات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>504</td>
              </tr>
              <tr>
                <td class="code">502373-3</td>
                <td><a class="course-link" href="#">نظم إدارة قواعد البيانات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>505</td>
              </tr>
              <tr>
                <td class="code">502482-3</td>
                <td><a class="course-link" href="#">أساسيات الشبكات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>2518</td>
              </tr>
              <tr>
                <td class="code">502510-3</td>
                <td><a class="course-link" href="#">معمارية ودمج الأنظمة</a></td>
                <td><span class="chip">عملي</span></td>
                <td>2812</td>
              </tr>
              <tr>
                <td class="code">502576-3</td>
                <td><a class="course-link" href="#">قواعد بيانات ذات أغراض خاصة</a></td>
                <td><span class="chip">عملي</span></td>
                <td>549</td>
              </tr>
              <tr>
                <td class="code">502576-3</td>
                <td><a class="course-link" href="#">قواعد بيانات ذات أغراض خاصة</a></td>
                <td><span class="chip">عملي</span></td>
                <td>2875</td>
              </tr>
              <tr>
                <td class="code">502583-3</td>
                <td><a class="course-link" href="#">الخوادم والبنية التحتية للشبكات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>2516</td>
              </tr>
              <tr>
                <td class="code">502584-3</td>
                <td><a class="course-link" href="#">موضوعات متقدمة في الشبكات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>543</td>
              </tr>
              <tr>
                <td class="code">502584-3</td>
                <td><a class="course-link" href="#">موضوعات متقدمة في الشبكات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>554</td>
              </tr>
              <tr>
                <td class="code">502584-3</td>
                <td><a class="course-link" href="#">موضوعات متقدمة في الشبكات</a></td>
                <td><span class="chip">عملي</span></td>
                <td>555</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div class="footer">تم تصميم الصفحة بصيغة HTML جاهزة للنشر على GitHub Pages.</div>
    </main>
  </div>

  <script>
    const searchInput = document.getElementById('searchInput');
    const rows = Array.from(document.querySelectorAll('#scheduleBody tr'));

    searchInput.addEventListener('input', function () {
      const term = this.value.trim().toLowerCase();
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
      });
    });

    function clearSearch() {
      searchInput.value = '';
      rows.forEach(row => row.style.display = '');
      searchInput.focus();
    }
  </script>
</body>
</html>
"""

path = Path("/mnt/data/index.html")
path.write_text(html, encoding="utf-8")
print(f"Saved to {path}")
