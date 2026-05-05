import React, { useState } from 'react';

const LoginPage = ({ onNavigate, onLogin }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await onLogin(studentNumber, password);
      if (!result.success) {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again. | فشل تسجيل الدخول. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* University Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-2xl">TU</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Taif University</h1>
          <p className="text-amber-300 font-arabic">جامعة الطائف</p>
          <p className="text-slate-400 text-sm mt-2">College of Computers & Information Technology</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-8 border border-slate-700">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white">Student Login</h2>
            <p className="text-amber-300/70 font-arabic">تسجيل دخول الطالب</p>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <p className="text-amber-400 font-semibold text-sm">0502241-3</p>
            <p className="text-white">Introduction to Database</p>
            <p className="text-slate-400 font-arabic text-sm">مقدمة في قواعد البيانات</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">
                Student Number | الرقم الجامعي
              </label>
              <input
                type="text"
                value={studentNumber}
                onChange={(e) => {
                  setStudentNumber(e.target.value);
                  setError('');
                }}
                placeholder="e.g., 44012345"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-1">
                Password | كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? 'Logging in... | جاري الدخول...' : 'Login | تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account? | ليس لديك حساب؟
            </p>
            <button
              onClick={() => onNavigate('register')}
              className="text-amber-400 hover:text-amber-300 font-semibold mt-1"
            >
              Register Now | سجّل الآن
            </button>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Prepared By: Sami Alsuwat | إعداد: سامي السواط
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
