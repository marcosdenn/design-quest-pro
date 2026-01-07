import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, Building2, Trophy, TrendingUp, 
  Search, Filter, Download, Plus, Edit, Trash2, Eye, Award, Target, 
  Zap, UserCircle, LogOut, Menu, X, ChevronDown, ChevronRight, 
  Calendar, Activity, BarChart3, PieChart, Settings, Bell, 
  CheckCircle2, AlertCircle, ArrowUp, ArrowDown, Minus
} from 'lucide-react';

const DesignQuestProfessional = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(null);
  const [schools, setSchools] = useState([]);

  // Inicializar dados
  useEffect(() => {
    const savedData = localStorage.getItem('designQuestProData');
    if (savedData) {
      setSchools(JSON.parse(savedData));
    } else {
      const initialData = [
        {
          id: 1,
          name: 'SENAI Goiânia',
          location: 'Goiânia, GO',
          years: [
            {
              id: 1,
              year: '2026',
              semester: '1º Semestre',
              classes: [
                {
                  id: 1,
                  name: 'Turma A - Matutino',
                  course: 'Técnico em Design Gráfico',
                  shift: 'Matutino',
                  startDate: '2026-01-20',
                  students: [
                    { 
                      id: 1, 
                      name: 'Ana Silva Costa', 
                      email: 'ana.silva@email.com',
                      registration: 'DG2026001',
                      avatar: '👩‍🎨',
                      pt: 520, 
                      pc: 480, 
                      co: 390,
                      streak: 15,
                      badges: ['Perfeccionista', 'Early Bird', 'Técnico Supremo'],
                      lastActivity: new Date().toISOString(),
                      history: [
                        { date: '2026-01-05', activity: 'Projeto Logo Empresarial', points: 85, type: 'pt' },
                        { date: '2026-01-04', activity: 'Brainstorm Criativo', points: 45, type: 'pc' },
                      ]
                    },
                    { 
                      id: 2, 
                      name: 'Bruno Costa Mendes', 
                      email: 'bruno.costa@email.com',
                      registration: 'DG2026002',
                      avatar: '👨‍💻',
                      pt: 485, 
                      pc: 510, 
                      co: 365,
                      streak: 12,
                      badges: ['Inovador', 'Designer Completo'],
                      lastActivity: new Date().toISOString(),
                      history: []
                    },
                    { 
                      id: 3, 
                      name: 'Carla Mendes Rodrigues', 
                      email: 'carla.mendes@email.com',
                      registration: 'DG2026003',
                      avatar: '👩‍🎤',
                      pt: 495, 
                      pc: 465, 
                      co: 420,
                      streak: 18,
                      badges: ['Mentor Natural', 'Colaborador Ouro'],
                      lastActivity: new Date().toISOString(),
                      history: []
                    },
                    { 
                      id: 4, 
                      name: 'Daniel Santos Lima', 
                      email: 'daniel.santos@email.com',
                      registration: 'DG2026004',
                      avatar: '👨‍🎨',
                      pt: 440, 
                      pc: 490, 
                      co: 380,
                      streak: 10,
                      badges: ['Inovador', 'Criativo'],
                      lastActivity: new Date().toISOString(),
                      history: []
                    },
                    { 
                      id: 5, 
                      name: 'Elena Rodrigues Sousa', 
                      email: 'elena.rodrigues@email.com',
                      registration: 'DG2026005',
                      avatar: '👩‍💼',
                      pt: 510, 
                      pc: 445, 
                      co: 395,
                      streak: 14,
                      badges: ['Técnico Supremo', 'Perfeccionista'],
                      lastActivity: new Date().toISOString(),
                      history: []
                    },
                  ]
                },
                {
                  id: 2,
                  name: 'Turma B - Vespertino',
                  course: 'Técnico em Design Gráfico',
                  shift: 'Vespertino',
                  startDate: '2026-01-20',
                  students: [
                    { 
                      id: 6, 
                      name: 'Fernando Alves', 
                      email: 'fernando.alves@email.com',
                      registration: 'DG2026006',
                      avatar: '👨‍🏫',
                      pt: 380, 
                      pc: 420, 
                      co: 350,
                      streak: 8,
                      badges: ['Iniciante'],
                      lastActivity: new Date().toISOString(),
                      history: []
                    },
                    { 
                      id: 7, 
                      name: 'Gabriela Martins', 
                      email: 'gabriela.martins@email.com',
                      registration: 'DG2026007',
                      avatar: '👩‍🎓',
                      pt: 405, 
                      pc: 445, 
                      co: 385,
                      streak: 11,
                      badges: ['Criativo', 'Colaborador'],
                      lastActivity: new Date().toISOString(),
                      history: []
                    },
                  ]
                }
              ]
            }
          ]
        }
      ];
      setSchools(initialData);
      localStorage.setItem('designQuestProData', JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    if (schools.length > 0) {
      localStorage.setItem('designQuestProData', JSON.stringify(schools));
    }
  }, [schools]);

  // Funções auxiliares
  const getTotalPoints = (student) => student.pt + student.pc + student.co;
  
  const getLevelInfo = (totalXP) => {
    const level = Math.floor(totalXP / 200) + 1;
    const xpForCurrentLevel = (level - 1) * 200;
    const xpForNextLevel = level * 200;
    const progress = ((totalXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;
    return { level, progress, xpForNextLevel, xpNeeded: xpForNextLevel - totalXP };
  };

  const getRanking = (students) => {
    return [...students].sort((a, b) => getTotalPoints(b) - getTotalPoints(a));
  };

  const addPoints = (studentId, points, type, activity) => {
    setSchools(prevSchools => 
      prevSchools.map(school => ({
        ...school,
        years: school.years.map(year => ({
          ...year,
          classes: year.classes.map(cls => ({
            ...cls,
            students: cls.students.map(student => {
              if (student.id === studentId) {
                return {
                  ...student,
                  [type]: student[type] + points,
                  history: [
                    { date: new Date().toISOString(), activity, points, type },
                    ...(student.history || [])
                  ],
                  lastActivity: new Date().toISOString()
                };
              }
              return student;
            })
          }))
        }))
      }))
    );
  };

  // ==================== TELA DE LOGIN ====================
  const LoginView = () => {
    const [email, setEmail] = useState('');

    const handleLogin = () => {
      if (email === 'professor@senai.com' || email === 'admin@senai.com') {
        setCurrentUser({ 
          type: 'teacher', 
          name: 'Professor',
          email: email,
          isAdmin: email === 'admin@senai.com'
        });
        setView('dashboard');
      } else {
        // Buscar aluno em todas as escolas/turmas
        let foundStudent = null;
        schools.forEach(school => {
          school.years.forEach(year => {
            year.classes.forEach(cls => {
              const student = cls.students.find(s => s.email === email);
              if (student) {
                foundStudent = { ...student, schoolId: school.id, yearId: year.id, classId: cls.id };
              }
            });
          });
        });
        
        if (foundStudent) {
          setCurrentUser({ type: 'student', ...foundStudent });
          setView('student-view');
        } else {
          alert('Email não encontrado no sistema!');
        }
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-4">
              <Trophy className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Design Quest Pro</h1>
            <p className="text-blue-200">Sistema de Gestão Educacional</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Acessar Sistema</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Entrar
              </button>
            </div>

            {/* Demo accounts */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-3">Contas de demonstração:</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">👨‍🏫 Professor</span>
                  <code className="text-blue-600 font-mono">professor@senai.com</code>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-gray-700">👩‍🎨 Aluno</span>
                  <code className="text-green-600 font-mono">ana.silva@email.com</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== SIDEBAR ====================
  const Sidebar = () => {
    const menuItems = [
      { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
      { icon: Building2, label: 'Escolas', id: 'schools' },
      { icon: Calendar, label: 'Anos Letivos', id: 'years' },
      { icon: Users, label: 'Turmas', id: 'classes' },
      { icon: GraduationCap, label: 'Alunos', id: 'students' },
      { icon: Trophy, label: 'Rankings', id: 'rankings' },
      { icon: Award, label: 'Conquistas', id: 'achievements' },
      { icon: BarChart3, label: 'Relatórios', id: 'reports' },
    ];

    return (
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 min-h-screen transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Design Quest</h2>
                  <p className="text-slate-400 text-xs">Pro System</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors ${
                view === item.id ? 'bg-slate-800 text-white border-r-4 border-blue-500' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* User section */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-slate-300" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{currentUser?.name}</p>
                <p className="text-slate-400 text-xs">{currentUser?.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setCurrentUser(null);
              setView('login');
            }}
            className="w-full mt-3 flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="text-sm">Sair</span>}
          </button>
        </div>
      </div>
    );
  };

  // ==================== DASHBOARD ====================
  const DashboardView = () => {
    const totalStudents = schools.reduce((acc, school) => 
      acc + school.years.reduce((yacc, year) => 
        yacc + year.classes.reduce((cacc, cls) => 
          cacc + cls.students.length, 0), 0), 0);

    const allStudents = schools.flatMap(school =>
      school.years.flatMap(year =>
        year.classes.flatMap(cls => cls.students)
      )
    );

    const avgPoints = Math.round(
      allStudents.reduce((acc, s) => acc + getTotalPoints(s), 0) / allStudents.length
    );

    const totalBadges = allStudents.reduce((acc, s) => acc + (s.badges?.length || 0), 0);

    return (
      <div className="flex-1 bg-slate-50 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
              <p className="text-slate-600 mt-1">Visão geral do sistema</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-green-600 text-sm font-semibold flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  12%
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">Total de Alunos</h3>
              <p className="text-3xl font-bold text-slate-800">{totalStudents}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-green-600 text-sm font-semibold flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  8%
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">Média de XP</h3>
              <p className="text-3xl font-bold text-slate-800">{avgPoints}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-green-600 text-sm font-semibold flex items-center">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  24%
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">Badges Conquistadas</h3>
              <p className="text-3xl font-bold text-slate-800">{totalBadges}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-slate-600 text-sm font-semibold flex items-center">
                  <Minus className="w-4 h-4 mr-1" />
                  0%
                </span>
              </div>
              <h3 className="text-slate-600 text-sm font-medium mb-1">Unidades Ativas</h3>
              <p className="text-3xl font-bold text-slate-800">{schools.length}</p>
            </div>
          </div>

          {/* School Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Schools List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">Unidades</h2>
              </div>
              <div className="p-6 space-y-4">
                {schools.map(school => (
                  <div key={school.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{school.name}</h3>
                        <p className="text-sm text-slate-600">{school.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSchool(school);
                        setView('schools');
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">Atividade Recente</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {allStudents.slice(0, 5).map(student => (
                    <div key={student.id} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-xl">
                        {student.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-600">Ativo há 2 horas</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-800">{getTotalPoints(student)} XP</p>
                        <p className="text-xs text-slate-600">Level {getLevelInfo(getTotalPoints(student)).level}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==================== STUDENTS VIEW ====================
  const StudentsView = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showPointsModal, setShowPointsModal] = useState(false);

    const allStudents = schools.flatMap(school =>
      school.years.flatMap(year =>
        year.classes.flatMap(cls => 
          cls.students.map(s => ({
            ...s,
            schoolName: school.name,
            className: cls.name,
            yearName: year.year
          }))
        )
      )
    );

    const filteredStudents = allStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registration.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ranking = getRanking(filteredStudents);

    return (
      <div className="flex-1 bg-slate-50 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Gestão de Alunos</h1>
              <p className="text-slate-600 mt-1">Visualize e gerencie todos os alunos do sistema</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg">
              <Plus className="w-5 h-5" />
              <span>Novo Aluno</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, email ou matrícula..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="px-6 py-3 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Filtros</span>
            </button>
            <button className="px-6 py-3 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2">
              <Download className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Exportar</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Posição</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Aluno</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Turma</span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">PT</span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">PC</span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">CO</span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total XP</span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Level</span>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ranking.map((student, index) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-lg">
                          {student.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{student.name}</p>
                          <p className="text-sm text-slate-600">{student.registration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{student.className}</p>
                        <p className="text-xs text-slate-600">{student.schoolName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                        {student.pt}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                        {student.pc}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        {student.co}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-slate-800">{getTotalPoints(student)}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">
                        Nv. {getLevelInfo(getTotalPoints(student)).level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowPointsModal(true);
                          }}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Points Modal */}
        {showPointsModal && selectedStudent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-800">Gerenciar Pontos</h3>
                  <button
                    onClick={() => setShowPointsModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl">
                    {selectedStudent.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{selectedStudent.name}</p>
                    <p className="text-sm text-slate-600">{getTotalPoints(selectedStudent)} XP total</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <PointsForm 
                  student={selectedStudent} 
                  onSubmit={(points, type, activity, isAdding) => {
                    addPoints(selectedStudent.id, isAdding ? points : -points, type, activity);
                    setShowPointsModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==================== POINTS FORM ====================
  const PointsForm = ({ student, onSubmit }) => {
    const [points, setPoints] = useState('');
    const [type, setType] = useState('pt');
    const [activity, setActivity] = useState('');

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tipo de Ponto
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'pt', label: 'PT', icon: Target, color: 'blue' },
              { value: 'pc', label: 'PC', icon: Zap, color: 'purple' },
              { value: 'co', label: 'CO', icon: Users, color: 'green' }
            ].map(({ value, label, icon: Icon, color }) => (
              <button
                key={value}
                onClick={() => setType(value)}
                className={`py-3 rounded-xl font-semibold transition-all ${
                  type === value
                    ? `bg-${color}-500 text-white shadow-lg`
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Quantidade
          </label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="Ex: 50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Atividade
          </label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="Ex: Projeto Logo Concluído"
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={() => onSubmit(parseInt(points), type, activity, true)}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar</span>
          </button>
          <button
            onClick={() => onSubmit(parseInt(points), type, activity, false)}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <Minus className="w-5 h-5" />
            <span>Remover</span>
          </button>
        </div>
      </div>
    );
  };

  // ==================== MAIN RENDER ====================
  return (
    <div className="font-sans antialiased">
      {view === 'login' && <LoginView />}
      {view !== 'login' && currentUser?.type === 'teacher' && (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          {view === 'dashboard' && <DashboardView />}
          {view === 'students' && <StudentsView />}
          {!['dashboard', 'students'].includes(view) && (
            <div className="flex-1 flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">Seção em desenvolvimento</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesignQuestProfessional;
