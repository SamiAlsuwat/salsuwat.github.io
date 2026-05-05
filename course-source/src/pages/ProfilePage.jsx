import React from 'react';

const ProfilePage = ({ user, onNavigate, onLogout }) => {
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

  const getGradeColor = (score) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-900/30';
    if (score >= 75) return 'text-blue-400 bg-blue-900/30';
    if (score >= 60) return 'text-yellow-400 bg-yellow-900/30';
    if (score >= 50) return 'text-orange-400 bg-orange-900/30';
    return 'text-red-400 bg-red-900/30';
  };

  const getLetterGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'C+';
    if (score >= 65) return 'C';
    if (score >= 60) return 'D+';
    if (score >= 50) return 'D';
    return 'F';
  };

  const completedWeeks = Object.values(user.progress).filter(w => w.completed);
  const totalAttempts = completedWeeks.reduce((sum, w) => sum + w.attempts, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/30">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm"
            >
              ← Back to Course
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.studentName.charAt(0)}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-white">{user.studentName}</h1>
              <p className="text-amber-300 font-mono text-lg">{user.studentNumber}</p>
              <p className="text-slate-400">Section {user.sectionNumber} | الشعبة {user.sectionNumber}</p>
            </div>
            <div className="text-center">
              <div className={`text-5xl font-black ${user.overallGrade === 'N/A' ? 'text-slate-500' : 
                user.totalScore >= 90 ? 'text-emerald-400' :
                user.totalScore >= 75 ? 'text-blue-400' :
                user.totalScore >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {user.overallGrade}
              </div>
              <p className="text-slate-400 text-sm">Overall Grade</p>
              <p className="text-white font-semibold">{user.totalScore}%</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <span className="text-3xl font-bold text-white">{completedWeeks.length}</span>
            <p className="text-slate-400 text-sm">Weeks Completed</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <span className="text-3xl font-bold text-amber-400">{13 - completedWeeks.length}</span>
            <p className="text-slate-400 text-sm">Weeks Remaining</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <span className="text-3xl font-bold text-white">{totalAttempts}</span>
            <p className="text-slate-400 text-sm">Total Attempts</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <span className="text-3xl font-bold text-emerald-400">
              {Math.round((completedWeeks.length / 13) * 100)}%
            </span>
            <p className="text-slate-400 text-sm">Progress</p>
          </div>
        </div>

        {/* Grade Report */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-700/50 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Grade Report | تقرير الدرجات</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Week</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Topic</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Score</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Grade</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Attempts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {weeks.map((week) => {
                  const progress = user.progress[`week${week.week}`];
                  const isCompleted = progress?.completed;
                  const score = progress?.score || 0;

                  return (
                    <tr key={week.week} className="hover:bg-slate-700/20">
                      <td className="px-6 py-4 text-white font-semibold">
                        Week {week.week}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {week.titleEn}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isCompleted ? (
                          <span className="px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-xs">
                            ✓ Completed
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded-full text-xs">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isCompleted ? (
                          <span className={`font-bold ${getGradeColor(score).split(' ')[0]}`}>
                            {score}%
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {isCompleted ? (
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getGradeColor(score)}`}>
                            {getLetterGrade(score)}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-slate-400">
                        {progress?.attempts || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary Footer */}
          <div className="bg-slate-700/30 px-6 py-4 flex justify-between items-center">
            <div>
              <span className="text-slate-400 text-sm">Total Average:</span>
              <span className="text-white font-bold ml-2">{user.totalScore}%</span>
            </div>
            <div>
              <span className="text-slate-400 text-sm">Final Grade:</span>
              <span className={`font-bold ml-2 text-lg ${
                user.totalScore >= 90 ? 'text-emerald-400' :
                user.totalScore >= 75 ? 'text-blue-400' :
                user.totalScore >= 60 ? 'text-yellow-400' : 'text-slate-400'
              }`}>
                {user.overallGrade}
              </span>
            </div>
          </div>
        </div>

        {/* Grading Scale */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Grading Scale | مقياس الدرجات</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 text-center text-xs">
            {[
              { grade: 'A+', min: 90, color: 'bg-emerald-600' },
              { grade: 'A', min: 85, color: 'bg-emerald-500' },
              { grade: 'B+', min: 80, color: 'bg-blue-600' },
              { grade: 'B', min: 75, color: 'bg-blue-500' },
              { grade: 'C+', min: 70, color: 'bg-yellow-600' },
              { grade: 'C', min: 65, color: 'bg-yellow-500' },
              { grade: 'D+', min: 60, color: 'bg-orange-600' },
              { grade: 'D', min: 50, color: 'bg-orange-500' },
              { grade: 'F', min: 0, color: 'bg-red-600' },
            ].map((g) => (
              <div key={g.grade} className={`${g.color} rounded p-2`}>
                <div className="font-bold text-white">{g.grade}</div>
                <div className="text-white/70">{g.min}%+</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
