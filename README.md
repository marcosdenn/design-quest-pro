# 🎨 Design Quest Professional

Sistema de Gamificação Educacional para cursos de Design Gráfico desenvolvido para o SENAI.

![Design Quest](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Sobre o Projeto

Design Quest Professional é um sistema completo de gestão educacional gamificado que transforma o aprendizado de Design Gráfico em uma jornada envolvente e mensurável.

### ✨ Principais Funcionalidades

- 🏢 **Gestão Hierárquica**: Escola → Ano Letivo → Turma → Alunos
- 📊 **Dashboard Profissional**: Estatísticas em tempo real
- 🎯 **Sistema de Pontos**: PT (Técnicos), PC (Criativos), CO (Colaborativos)
- 🏆 **Rankings Dinâmicos**: Por turma, escola ou geral
- 🎖️ **Badges e Conquistas**: Sistema de recompensas
- 📈 **Níveis e Progressão**: Gamificação visual
- 🔍 **Busca Avançada**: Filtros inteligentes
- 📱 **Design Responsivo**: Funciona em desktop, tablet e mobile

## 🚀 Demo Online

Acesse a versão de demonstração: [Design Quest Pro](https://seu-site.vercel.app)

**Contas de Teste:**
- Professor: `professor@senai.com`
- Aluno: `ana.silva@email.com`

## 💻 Tecnologias Utilizadas

- **React 18.2** - Framework JavaScript
- **Lucide React** - Ícones modernos
- **Tailwind CSS** - Estilização (via classes)
- **LocalStorage** - Persistência de dados

## 📦 Instalação

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/design-quest-pro.git
cd design-quest-pro
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em desenvolvimento**
```bash
npm start
```

O aplicativo abrirá em `http://localhost:3000`

4. **Build para produção**
```bash
npm run build
```

## 🌐 Deploy no Vercel

### Método 1: Via GitHub (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Importe seu repositório
5. Clique em "Deploy"

### Método 2: Via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 📊 Estrutura do Projeto

```
design-quest-pro/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js              # Componente principal
│   ├── index.js            # Entry point
│   └── index.css           # Estilos globais
├── package.json
├── .gitignore
└── README.md
```

## 🎯 Como Usar

### Para Professores

1. **Login**: Use `professor@senai.com`
2. **Dashboard**: Visualize estatísticas gerais
3. **Gestão de Alunos**: Acesse a seção "Alunos"
4. **Adicionar Pontos**: Clique em ➕ ao lado do aluno
5. **Visualizar Rankings**: Acesse "Rankings"

### Para Alunos

1. **Login**: Use seu email cadastrado
2. **Visualize**: Seus pontos, nível e badges
3. **Compare**: Sua posição no ranking
4. **Acompanhe**: Histórico de atividades

## 📝 Tipos de Pontos

| Tipo | Sigla | Descrição |
|------|-------|-----------|
| **Técnicos** | PT | Domínio de ferramentas e execução técnica |
| **Criativos** | PC | Originalidade e soluções inovadoras |
| **Colaborativos** | CO | Trabalho em equipe e mentoria |

## 🏗️ Estrutura de Dados

```javascript
{
  escola: {
    id: 1,
    name: "SENAI Goiânia",
    location: "Goiânia, GO",
    years: [
      {
        id: 1,
        year: "2026",
        semester: "1º Semestre",
        classes: [
          {
            id: 1,
            name: "Turma A - Matutino",
            course: "Técnico em Design Gráfico",
            students: [...]
          }
        ]
      }
    ]
  }
}
```

## 🔧 Personalização

### Adicionar Nova Escola

Edite o arquivo `src/App.js` e adicione no array `initialData`:

```javascript
{
  id: 2,
  name: 'SENAI Anápolis',
  location: 'Anápolis, GO',
  years: [...]
}
```

### Alterar Cores

Busque no código e substitua as classes Tailwind:
- `blue-600` → Cor primária
- `slate-900` → Cor da sidebar
- `green-600` → Cor de sucesso

## 🐛 Solução de Problemas

### Problema: "Module not found: lucide-react"
**Solução**: Execute `npm install lucide-react`

### Problema: Dados não salvam
**Solução**: Verifique se localStorage está habilitado no navegador

### Problema: Build falha no Vercel
**Solução**: Certifique-se de que todas as dependências estão no package.json

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📧 Contato

Desenvolvido para o SENAI - Sistema Nacional de Aprendizagem Industrial

Para dúvidas ou sugestões, abra uma [issue](https://github.com/seu-usuario/design-quest-pro/issues).

## 🙏 Agradecimentos

- SENAI pela oportunidade de transformar a educação
- Comunidade React pelo framework incrível
- Lucide pelo conjunto de ícones modernos

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!

**Design Quest Professional** - Onde gestão educacional encontra gamificação! 🎨✨
