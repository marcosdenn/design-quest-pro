import React, { useState, useEffect } from 'react';
import { Trophy, Star, Users, Award, TrendingUp, Zap, Target, Crown, Plus, Minus, LogOut, User, Lock, Mail, Eye, EyeOff, CheckCircle, AlertCircle, Flame } from 'lucide-react';

const DesignQuestAuth = () => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'student-dashboard', 'admin-dashboard'
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  // Credenciais do administrador (hardcoded)
  const ADMIN_CREDENTIALS = {
    email: 'admin@designquest.com',
    password: 'admin123',
    name: 'Administrador'
  };

  // Carregar usuários do localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('designQuestUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Salvar usuários no localStorage
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('designQuestUsers', JSON.stringify(users));
    }
  }, [users]);

  // Validação de email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Função de login
  const handleLogin = () => {
    setError('');
    
    // Verificar se é o admin
    if (loginEmail === ADMIN_CREDENTIALS.email && loginPassword === ADMIN_CREDENTIALS.password) {
      setCurrentUser({
        type: 'admin',
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email
      });
      setView('admin-dashboard');
      setLoginEmail('');
      setLoginPassword('');
      return;
    }

    // Verificar usuários normais
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    
    if (user) {
      setCurrentUser(user);
      setView('student-dashboard');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setError('Email ou senha incorretos');
    }
  };

  // Função de criar conta
  const handleSignup = () => {
    setError('');
    setSuccess('');

    // Validações
    if (!signupName.trim()) {
      setError('Por favor, digite seu nome completo');
      return;
    }

    if (!isValidEmail(signupEmail)) {
      setError('Por favor, digite um email válido');
      return;
    }

    if (signupPassword.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // Verificar se email já existe
    if (users.find(u => u.email === signupEmail)) {
      setError('Este email já está cadastrado');
      return;
    }

    // Criar novo usuário
    const newUser = {
      id: Date.now(),
      type: 'student',
      name: signupName.trim(),
      email: signupEmail.trim().toLowerCase(),
      password: signupPassword,
      avatar: '👤',
      pt: 0,
      pc: 0,
      co: 0,
      streak: 0,
      badges: [],
      lastActive: new Date().toISOString(),
      history: [],
      createdAt: new Date().toISOString()
    };

    setUsers([...users, newUser]);
    setSuccess('Conta criada com sucesso! Faça login para continuar.');
    
    // Limpar campos
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');

    // Voltar para login após 2 segundos
    setTimeout(() => {
      setView('login');
      setSuccess('');
    }, 2000);
  };

  // Funções auxiliares para o sistema de pontos
  const getTotalPoints = (student) => student.pt + student.pc + student.co;
  
  const getLevelInfo = (totalXP) => {
    const level = Math.floor(totalXP / 200) + 1;
    const xpForCurrentLevel = (level - 1) * 200;
    const xpForNextLevel = level * 200;
    const progress = ((totalXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;
    return { level, progress, xpForNextLevel, xpNeeded: xpForNextLevel - totalXP };
  };

  const getRanking = () => {
    return [...users]
      .filter(u => u.type === 'student')
      .sort((a, b) => getTotalPoints(b) - getTotalPoints(a));
  };

  const addPoints = (userId, points, type, activity) => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          const newHistory = [
            {
              date: new Date().toISOString(),
              activity,
              points,
              type
            },
            ...(user.history || [])
          ];
          return {
            ...user,
            [type]: user[type] + points,
            history: newHistory,
            lastActive: new Date().toISOString()
          };
        }
        return user;
      })
    );
  };

  // ==================== TELA DE LOGIN/SIGNUP ====================
  const AuthView = () => {
    const isLoginView = view === 'login';

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Lado Esquerdo - Hero Section */}
          <div className="hidden lg:block space-y-6">
            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm">
              <p className="text-sm font-semibold text-blue-600 flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>JANEIRO 2026</span>
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl font-black leading-tight">
                <span className="text-gray-900">Rápido,</span>{' '}
                <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-2xl inline-block transform -rotate-1">
                  fácil
                </span>
                <br />
                <span className="text-gray-900">e digital</span>
              </h1>

              <p className="text-2xl text-gray-600 font-medium">
                PLATAFORMA DE GAMIFICAÇÃO EDUCACIONAL
              </p>

              <div className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold">
                DESIGN QUEST • SENAI
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="relative mt-12">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 rounded-3xl opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-400 rounded-3xl opacity-20 blur-2xl"></div>
            </div>
          </div>

          {/* Lado Direito - Form */}
          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                  <Trophy className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Design Quest</h2>
                <p className="text-blue-100">Sua jornada criativa</p>
              </div>

              {/* Toggle Login/Signup */}
              <div className="p-2 bg-gray-100 flex space-x-2">
                <button
                  onClick={() => {
                    setView('login');
                    setError('');
                    setSuccess('');
                  }}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    isLoginView
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Entrar
                </button>
                <button
                  onClick={() => {
                    setView('signup');
                    setError('');
                    setSuccess('');
                  }}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    !isLoginView
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Criar Conta
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8 space-y-6">
                
                {/* Mensagens de erro e sucesso */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 text-sm font-medium">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 text-sm font-medium">{success}</p>
                  </div>
                )}

                {/* LOGIN FORM */}
                {isLoginView ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
                          placeholder="seu@email.com"
                          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Senha
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
                          placeholder="••••••••"
                          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleLogin}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-lg"
                    >
                      Entrar
                    </button>

                    {/* Dica de admin */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-xs text-center text-gray-500 mb-2">💡 Acesso de Administrador:</p>
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <code className="text-xs text-purple-700 font-mono">admin@designquest.com</code>
                        <span className="text-gray-400 mx-2">•</span>
                        <code className="text-xs text-purple-700 font-mono">admin123</code>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SIGNUP FORM */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
                          placeholder="João Silva"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
                          placeholder="joao@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Senha (mínimo 6 caracteres)
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirmar Senha
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
                          placeholder="••••••••"
                          onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSignup}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-lg"
                    >
                      Criar Conta
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      Ao criar uma conta, você concorda com os termos de uso da plataforma.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: Logo/Title */}
            <div className="lg:hidden text-center mt-8">
              <h1 className="text-3xl font-black text-gray-800 mb-2">Design Quest</h1>
              <p className="text-gray-600">Plataforma de Gamificação Educacional</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== DASHBOARD DO ALUNO ====================
  const StudentDashboard = () => {
    const student = users.find(u => u.id === currentUser.id) || currentUser;
    const totalPoints = getTotalPoints(student);
    const ranking = getRanking();
    const position = ranking.findIndex(s => s.id === student.id) + 1;
    const levelInfo = getLevelInfo(totalPoints);
    const [activeTab, setActiveTab] = useState('overview');

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm shadow-lg">
                  {student.avatar || '👤'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{student.name}</h1>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                      <Crown className="w-4 h-4" />
                      <span>#{position}</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                      <Flame className="w-4 h-4" />
                      <span>{student.streak || 0} dias</span>
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setView('login');
                }}
                className="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Level Progress */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="bg-white/20 px-3 py-1 rounded-lg">
                    <span className="font-bold">Level {levelInfo.level}</span>
                  </div>
                  <span className="text-sm text-white/80">{totalPoints} XP</span>
                </div>
                <span className="text-sm text-white/80">{levelInfo.xpNeeded} XP para próximo nível</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${levelInfo.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-4 pb-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6 -mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-blue-100 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-blue-500" />
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">PT</span>
              </div>
              <p className="text-3xl font-black text-gray-800">{student.pt}</p>
              <p className="text-xs text-gray-500 mt-1">Técnicos</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-purple-100 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-purple-500" />
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">PC</span>
              </div>
              <p className="text-3xl font-black text-gray-800">{student.pc}</p>
              <p className="text-xs text-gray-500 mt-1">Criativos</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-green-100 transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-green-500" />
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">CO</span>
              </div>
              <p className="text-3xl font-black text-gray-800">{student.co}</p>
              <p className="text-xs text-gray-500 mt-1">Colaborativos</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6 bg-white rounded-2xl p-2 shadow-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('ranking')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'ranking'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Ranking
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'badges'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Conquistas
            </button>
          </div>

          {/* Tab Content - Overview */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                Atividades Recentes
              </h2>
              <div className="space-y-3">
                {student.history && student.history.length > 0 ? (
                  student.history.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.type === 'pt' ? 'bg-blue-100' :
                          item.type === 'pc' ? 'bg-purple-100' : 'bg-green-100'
                        }`}>
                          {item.type === 'pt' ? <Target className="w-5 h-5 text-blue-600" /> :
                           item.type === 'pc' ? <Zap className="w-5 h-5 text-purple-600" /> :
                           <Users className="w-5 h-5 text-green-600" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{item.activity}</p>
                          <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className={`text-2xl font-bold ${item.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.points >= 0 ? '+' : ''}{item.points}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhuma atividade ainda. Comece sua jornada!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab Content - Ranking */}
          {activeTab === 'ranking' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Crown className="w-6 h-6 mr-2 text-yellow-600" />
                  Ranking Global
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {ranking.map((rankedStudent, index) => (
                  <div
                    key={rankedStudent.id}
                    className={`p-4 transition-all ${
                      rankedStudent.id === student.id
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' :
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg' :
                          index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>

                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl">
                            {rankedStudent.avatar || '👤'}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{rankedStudent.name}</p>
                            <p className="text-sm text-gray-500">{getTotalPoints(rankedStudent)} XP total</p>
                          </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                            {rankedStudent.pt} PT
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
                            {rankedStudent.pc} PC
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                            {rankedStudent.co} CO
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          {(rankedStudent.badges || []).slice(0, 3).map((_, i) => (
                            <Award key={i} className="w-5 h-5 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content - Badges */}
          {activeTab === 'badges' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-500" />
                Suas Conquistas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {student.badges && student.badges.length > 0 ? (
                  student.badges.map((badge, index) => (
                    <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform shadow-sm">
                      <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                      <p className="font-bold text-gray-800">{badge}</p>
                      <p className="text-xs text-gray-500 mt-2">Conquistado</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Continue se dedicando para desbloquear conquistas!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==================== DASHBOARD DO ADMIN ====================
  const AdminDashboard = () => {
    const ranking = getRanking();
    const [showPointsModal, setShowPointsModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const PointsModal = ({ student, onClose }) => {
      const [points, setPoints] = useState('');
      const [type, setType] = useState('pt');
      const [activity, setActivity] = useState('');

      const handleSubmit = (isAdding) => {
        if (points && activity) {
          const pointValue = isAdding ? parseInt(points) : -parseInt(points);
          addPoints(student.id, pointValue, type, activity);
          onClose();
        }
      };

      return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Gerenciar Pontos</h3>
                <button onClick={onClose} className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  {student.avatar || '👤'}
                </div>
                <div>
                  <p className="font-bold">{student.name}</p>
                  <p className="text-sm text-white/80">{getTotalPoints(student)} XP total</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Ponto</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setType('pt')}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      type === 'pt' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Target className="w-5 h-5 mx-auto mb-1" />
                    PT
                  </button>
                  <button
                    onClick={() => setType('pc')}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      type === 'pc' ? 'bg-purple-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Zap className="w-5 h-5 mx-auto mb-1" />
                    PC
                  </button>
                  <button
                    onClick={() => setType('co')}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      type === 'co' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1" />
                    CO
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantidade</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                  placeholder="Ex: 50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Atividade</label>
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all"
                  placeholder="Ex: Projeto Logo Concluído"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => handleSubmit(true)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform active:scale-95 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Adicionar</span>
                </button>
                <button
                  onClick={() => handleSubmit(false)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all transform active:scale-95 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Minus className="w-5 h-5" />
                  <span>Remover</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black">Painel do Administrador</h1>
                <p className="text-white/80 mt-1">Design Quest - Sistema de Gestão</p>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setView('login');
                }}
                className="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-blue-500">
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <p className="text-3xl font-black text-gray-800">{users.filter(u => u.type === 'student').length}</p>
              <p className="text-sm text-gray-500 mt-1">Alunos Ativos</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-green-500">
              <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
              <p className="text-3xl font-black text-gray-800">
                {ranking.length > 0 ? Math.round(ranking.reduce((acc, s) => acc + getTotalPoints(s), 0) / ranking.length) : 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Média de XP</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-yellow-500">
              <Award className="w-8 h-8 text-yellow-500 mb-2" />
              <p className="text-3xl font-black text-gray-800">
                {users.filter(u => u.type === 'student').reduce((acc, s) => acc + ((s.badges || []).length), 0)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Badges Total</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-purple-500">
              <Crown className="w-8 h-8 text-purple-500 mb-2" />
              <p className="text-lg font-black text-gray-800">{ranking[0]?.name.split(' ')[0] || '-'}</p>
              <p className="text-sm text-gray-500 mt-1">Líder Atual</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Ranking dos Alunos</h2>
            </div>

            <div className="p-4 space-y-3">
              {ranking.length > 0 ? (
                ranking.map((student, index) => (
                  <div key={student.id} className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-all group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' :
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg' :
                          index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-3xl">
                            {student.avatar || '👤'}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-lg">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="hidden md:flex items-center space-x-2">
                          <div className="text-center">
                            <p className="text-2xl font-black text-blue-600">{student.pt}</p>
                            <p className="text-xs text-gray-500">PT</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-black text-purple-600">{student.pc}</p>
                            <p className="text-xs text-gray-500">PC</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-black text-green-600">{student.co}</p>
                            <p className="text-xs text-gray-500">CO</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowPointsModal(true);
                          }}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center space-x-2"
                        >
                          <Plus className="w-5 h-5" />
                          <span>Pontos</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum aluno cadastrado ainda</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {showPointsModal && selectedStudent && (
          <PointsModal
            student={selectedStudent}
            onClose={() => {
              setShowPointsModal(false);
              setSelectedStudent(null);
            }}
          />
        )}
      </div>
    );
  };

  // Render principal
  return (
    <div className="font-sans antialiased">
      {(view === 'login' || view === 'signup') && <AuthView />}
      {view === 'student-dashboard' && <StudentDashboard />}
      {view === 'admin-dashboard' && <AdminDashboard />}
    </div>
  );
};

export default DesignQuestAuth;

