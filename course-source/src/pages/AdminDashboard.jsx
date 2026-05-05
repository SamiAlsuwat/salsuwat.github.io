import React, { useState, useMemo } from 'react';

const AdminDashboard = ({ students, onNavigate, onLogout, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterSection, setFilterSection] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const weeks = [
    { week: 1, titleEn: "Introduction to Databases" },
    { week: 2, titleEn: "Creating a Database" },
    { week: 3, titleEn: "Creating Tables (Part 1)" },
    { week: 4, titleEn: "Creating Tables (Part 2)" },
    { week: 5, titleEn: "Creating Tables (Part 3)" },
    { week: 6, titleEn: "Inserting Data (Part 1)" },
    { week: 7, titleEn: "Inserting Data (Part 2)" },
    { week: 8, titleEn: "Query Basics (Part 1)" },
    { week: 9, titleEn: "Query Basics (Part 2)" },
    { week: 10, titleEn: "Advanced Queries (Part 1)" },
    { week: 11, titleEn: "Advanced Queries (Part 2)" },
    { week: 12, titleEn: "Database Design & Normalization" },
  ];

  // Get unique sections
  const sections = useMemo(() => {
    if (!students || students.length === 0) return ['all'];
    const sectionSet = new Set(students.map(s => s.sectionNumber));
    return ['all', ...Array.from(sectionSet).sort()];
  }, [students]);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    if (!students || students.length === 0) return [];
    let result = [...students];

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.studentName?.toLowerCase().includes(term) ||
        s.studentNumber?.toLowerCase().includes(term)
      );
    }

    // Filter by section
    if (filterSection !== 'all') {
      result = result.filter(s => s.sectionNumber === filterSection);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.studentName || '').localeCompare(b.studentName || '');
        case 'id':
          return (a.studentNumber || '').localeCompare(b.studentNumber || '');
        case 'grade':
          return (b.totalScore || 0) - (a.totalScore || 0);
        case 'progress':
          const aProgress = a.progress ? Object.values(a.progress).filter(w => w.completed).length : 0;
          const bProgress = b.progress ? Object.values(b.progress).filter(w => w.completed).length : 0;
          return bProgress - aProgress;
        default:
          return 0;
      }
    });

    return result;
  }, [students, searchTerm, sortBy, filterSection]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!students || students.length === 0) return { total: 0, avgScore: 0, avgProgress: 0, gradeDistribution: {} };

    const totalScore = students.reduce((sum, s) => sum + (s.totalScore || 0), 0);
    const totalProgress = students.reduce((sum, s) => {
      const completed = s.progress ? Object.values(s.progress).filter(w => w.completed).length : 0;
      return sum + (completed / 12) * 100;
    }, 0);

    const gradeDistribution = { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'D+': 0, 'D': 0, 'F': 0, 'N/A': 0 };
    students.forEach(s => {
      const grade = s.overallGrade || 'N/A';
      if (gradeDistribution.hasOwnProperty(grade)) {
        gradeDistribution[grade]++;
      }
    });

    return {
      total: students.length,
      avgScore: students.length > 0 ? Math.round(totalScore / students.length) : 0,
      avgProgress: students.length > 0 ? Math.round(totalProgress / students.length) : 0,
      gradeDistribution
    };
  }, [students]);

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-emerald-400';
    if (grade === 'B+' || grade === 'B') return 'text-blue-400';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-400';
    if (grade === 'D+' || grade === 'D') return 'text-orange-400';
    if (grade === 'F') return 'text-red-400';
    return 'text-slate-400';
  };

  const getGradeBg = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'bg-emerald-500/20 border-emerald-500/50';
    if (grade === 'B+' || grade === 'B') return 'bg-blue-500/20 border-blue-500/50';
    if (grade === 'C+' || grade === 'C') return 'bg-yellow-500/20 border-yellow-500/50';
    if (grade === 'D+' || grade === 'D') return 'bg-orange-500/20 border-orange-500/50';
    if (grade === 'F') return 'bg-red-500/20 border-red-500/50';
    return 'bg-slate-500/20 border-slate-500/50';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  // Refresh data from Supabase
  const handleRefresh = async () => {
    setRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    setRefreshing(false);
  };

  const StudentDetailModal = ({ student, onClose }) => {
    const completedWeeks = student.progress 
      ? Object.entries(student.progress)
          .filter(([key, val]) => val.completed && parseInt(key.replace('week', '')) <= 12)
          .length
      : 0;
    const progressPercent = Math.round((completedWeeks / 12) * 100);

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {student.studentName?.charAt(0) || '?'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{student.studentName}</h2>
                <p className="text-slate-400 text-sm">ID: {student.studentNumber} | Section: {student.sectionNumber}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="p-6 grid grid-cols-3 gap-4 border-b border-slate-700">
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Overall Grade</p>
              <p className={`text-3xl font-bold ${getGradeColor(student.overallGrade)}`}>{student.overallGrade || 'N/A'}</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Average Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(student.totalScore || 0)}`}>{student.totalScore || 0}%</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-sm mb-1">Progress</p>
              <p className="text-3xl font-bold text-amber-400">{progressPercent}%</p>
            </div>
          </div>

          {/* Week by Week Progress */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Week-by-Week Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {weeks.map(week => {
                const weekProgress = student.progress?.[`week${week.week}`];
                const isCompleted = weekProgress?.completed;
                const score = weekProgress?.score || 0;
                const attempts = weekProgress?.attempts || 0;

                return (
                  <div key={week.week} className={`p-3 rounded-lg border ${isCompleted ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-slate-700/30 border-slate-600'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-amber-400 text-xs font-semibold">Week {week.week}</span>
                      {isCompleted && <span className={`font-bold text-sm ${getScoreColor(score)}`}>{score}%</span>}
                    </div>
                    <p className="text-white text-xs truncate">{week.titleEn}</p>
                    {isCompleted ? (
                      <p className="text-emerald-400 text-xs mt-1">✓ Completed ({attempts} attempt{attempts !== 1 ? 's' : ''})</p>
                    ) : (
                      <p className="text-slate-500 text-xs mt-1">Not started</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/30">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black">TU</span>
              </div>
              <div>
                <h1 className="text-white font-bold">Admin Dashboard</h1>
                <p className="text-amber-300/70 text-xs font-arabic">لوحة تحكم المدير</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-600/20 rounded-lg border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-xs">Connected to Supabase</span>
              </div>
              <button 
                onClick={handleRefresh} 
                disabled={refreshing}
                className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button onClick={onLogout} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-slate-400 text-sm">Total Students</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-slate-400 text-sm">Avg Score</span>
            </div>
            <p className={`text-3xl font-bold ${getScoreColor(stats.avgScore)}`}>{stats.avgScore}%</p>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-slate-400 text-sm">Avg Progress</span>
            </div>
            <p className="text-3xl font-bold text-blue-400">{stats.avgProgress}%</p>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-slate-400 text-sm">Sections</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">{Math.max(0, sections.length - 1)}</p>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Grade Distribution | توزيع الدرجات</h3>
          <div className="flex flex-wrap gap-3">
            {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'].map(grade => (
              <div key={grade} className={`px-4 py-2 rounded-lg border ${getGradeBg(grade)} flex items-center gap-2`}>
                <span className={`font-bold ${getGradeColor(grade)}`}>{grade}</span>
                <span className="text-slate-400 text-sm">({stats.gradeDistribution[grade] || 0})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Section Filter */}
            <select
              value={filterSection}
              onChange={e => setFilterSection(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500/50"
            >
              {sections.map(section => (
                <option key={section} value={section}>
                  {section === 'all' ? 'All Sections' : `Section ${section}`}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="name">Sort by Name</option>
              <option value="id">Sort by ID</option>
              <option value="grade">Sort by Grade</option>
              <option value="progress">Sort by Progress</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Students | الطلاب</h3>
            <span className="text-slate-400 text-sm">{filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}</span>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-slate-400 text-lg mb-2">No students found</p>
              <p className="text-slate-500 text-sm mb-4">Students will appear here once they register.</p>
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm transition-colors"
              >
                Click to Refresh Data
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Student</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Section</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-slate-400">Progress</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-slate-400">Score</th>
                    <th className="text-center px-4 py-3 text-sm font-medium text-slate-400">Grade</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredStudents.map(student => {
                    const completedWeeks = student.progress
                      ? Object.entries(student.progress)
                          .filter(([key, val]) => val.completed && parseInt(key.replace('week', '')) <= 12)
                          .length
                      : 0;
                    const progressPercent = Math.round((completedWeeks / 12) * 100);

                    return (
                      <tr key={student.id || student.studentNumber} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {student.studentName?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p className="text-white font-medium">{student.studentName}</p>
                              <p className="text-slate-400 text-xs font-mono">{student.studentNumber}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-slate-700 rounded text-amber-400 text-sm">{student.sectionNumber}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all" 
                                style={{ width: `${progressPercent}%` }} 
                              />
                            </div>
                            <span className="text-slate-400 text-sm">{completedWeeks}/12</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-semibold ${getScoreColor(student.totalScore || 0)}`}>
                            {student.totalScore || 0}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getGradeBg(student.overallGrade || 'N/A')} ${getGradeColor(student.overallGrade || 'N/A')}`}>
                            {student.overallGrade || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 rounded-lg text-sm transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-slate-800 mt-8">
        <p className="text-slate-500 text-sm">0502241-3 | Taif University | جامعة الطائف</p>
        <p className="text-slate-600 text-xs mt-2">Admin Dashboard - College of Computers & Information Technology</p>
      </footer>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;
