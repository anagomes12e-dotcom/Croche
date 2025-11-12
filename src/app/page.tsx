'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Lock, Crown, Check, X, Download, Filter, Search, AlertCircle } from 'lucide-react'

// Tipos
interface ColoringBook {
  id: number
  title: string
  category: 'infantil' | 'adulto'
  ageRecommendation: string
  thumbnail: string
  pdfUrl: string
  isFree: boolean
  description: string
}

interface UserPlan {
  type: 'free' | 'mensal' | 'anual'
  expiresAt?: string
}

interface DownloadHistory {
  bookId: number
  downloadedAt: string
}

// Dados de exemplo dos livros (com URLs de PDFs simuladas)
const sampleBooks: ColoringBook[] = [
  {
    id: 1,
    title: 'Animais da Floresta',
    category: 'infantil',
    ageRecommendation: '3-6 anos',
    thumbnail: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: true,
    description: 'Desenhos de animais fofos da floresta para colorir'
  },
  {
    id: 2,
    title: 'Mandalas Relaxantes',
    category: 'adulto',
    ageRecommendation: '16+ anos',
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: true,
    description: 'Mandalas complexas para meditação e relaxamento'
  },
  {
    id: 3,
    title: 'Dinossauros Incríveis',
    category: 'infantil',
    ageRecommendation: '5-10 anos',
    thumbnail: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: true,
    description: 'Dinossauros pré-históricos para aventuras coloridas'
  },
  {
    id: 4,
    title: 'Jardim Secreto',
    category: 'adulto',
    ageRecommendation: '14+ anos',
    thumbnail: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: true,
    description: 'Flores e plantas detalhadas para colorir'
  },
  {
    id: 5,
    title: 'Princesas e Castelos',
    category: 'infantil',
    ageRecommendation: '4-8 anos',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: false,
    description: 'Mundo mágico de princesas e castelos encantados'
  },
  {
    id: 6,
    title: 'Padrões Geométricos',
    category: 'adulto',
    ageRecommendation: '16+ anos',
    thumbnail: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: false,
    description: 'Designs geométricos complexos e modernos'
  },
  {
    id: 7,
    title: 'Fundo do Mar',
    category: 'infantil',
    ageRecommendation: '3-7 anos',
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: false,
    description: 'Criaturas marinhas e corais coloridos'
  },
  {
    id: 8,
    title: 'Natureza Zen',
    category: 'adulto',
    ageRecommendation: '18+ anos',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: false,
    description: 'Paisagens naturais para relaxamento profundo'
  },
  {
    id: 9,
    title: 'Super-Heróis',
    category: 'infantil',
    ageRecommendation: '6-12 anos',
    thumbnail: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: false,
    description: 'Heróis poderosos em ação para colorir'
  },
  {
    id: 10,
    title: 'Arte Abstrata',
    category: 'adulto',
    ageRecommendation: '16+ anos',
    thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: false,
    description: 'Formas abstratas e expressivas para explorar'
  }
]

export default function Home() {
  const [books, setBooks] = useState<ColoringBook[]>([])
  const [userPlan, setUserPlan] = useState<UserPlan>({ type: 'free' })
  const [showPlansModal, setShowPlansModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'infantil' | 'adulto'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBook, setSelectedBook] = useState<ColoringBook | null>(null)
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([])
  const [freeDownloadsUsed, setFreeDownloadsUsed] = useState(0)
  const [showDownloadLimitModal, setShowDownloadLimitModal] = useState(false)

  // Inicializar dados
  useEffect(() => {
    // Carregar plano do usuário
    const savedPlan = localStorage.getItem('userPlan')
    if (savedPlan) {
      const plan = JSON.parse(savedPlan)
      // Verificar se o plano expirou
      if (plan.expiresAt && new Date(plan.expiresAt) < new Date()) {
        setUserPlan({ type: 'free' })
        localStorage.setItem('userPlan', JSON.stringify({ type: 'free' }))
      } else {
        setUserPlan(plan)
      }
    }

    // Carregar histórico de downloads
    const savedHistory = localStorage.getItem('downloadHistory')
    if (savedHistory) {
      const history = JSON.parse(savedHistory)
      setDownloadHistory(history)
      
      // Contar downloads gratuitos únicos
      const uniqueFreeDownloads = new Set(
        history
          .filter((h: DownloadHistory) => {
            const book = sampleBooks.find(b => b.id === h.bookId)
            return book?.isFree
          })
          .map((h: DownloadHistory) => h.bookId)
      )
      setFreeDownloadsUsed(uniqueFreeDownloads.size)
    }

    setBooks(sampleBooks)
  }, [])

  // Verificar se o usuário pode acessar o livro
  const canAccessBook = (book: ColoringBook) => {
    // Usuários premium têm acesso ilimitado
    if (userPlan.type !== 'free') return true
    
    // Livros gratuitos sempre acessíveis
    if (book.isFree) return true
    
    // Usuários free não podem acessar livros premium
    return false
  }

  // Verificar se pode fazer download
  const canDownload = (book: ColoringBook) => {
    // Usuários premium podem baixar ilimitadamente
    if (userPlan.type !== 'free') return { allowed: true, reason: '' }
    
    // Para usuários free, verificar se é livro gratuito
    if (!book.isFree) {
      return { 
        allowed: false, 
        reason: 'Este livro requer assinatura Premium' 
      }
    }
    
    // Verificar se já baixou este livro gratuito antes
    const alreadyDownloaded = downloadHistory.some(h => h.bookId === book.id)
    if (alreadyDownloaded) {
      return { allowed: true, reason: '' }
    }
    
    // Verificar limite de downloads gratuitos (1 download único)
    if (freeDownloadsUsed >= 1) {
      return { 
        allowed: false, 
        reason: 'Você já usou seu download gratuito. Assine Premium para downloads ilimitados!' 
      }
    }
    
    return { allowed: true, reason: '' }
  }

  // Realizar download do PDF
  const handleDownload = async (book: ColoringBook) => {
    const downloadCheck = canDownload(book)
    
    if (!downloadCheck.allowed) {
      setShowDownloadLimitModal(true)
      return
    }

    try {
      // Criar elemento de link temporário para download
      const link = document.createElement('a')
      link.href = book.pdfUrl
      link.download = `${book.title.replace(/\s+/g, '_')}.pdf`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Registrar download no histórico
      const newDownload: DownloadHistory = {
        bookId: book.id,
        downloadedAt: new Date().toISOString()
      }
      
      const updatedHistory = [...downloadHistory, newDownload]
      setDownloadHistory(updatedHistory)
      localStorage.setItem('downloadHistory', JSON.stringify(updatedHistory))

      // Atualizar contador de downloads gratuitos se for livro gratuito e primeira vez
      if (book.isFree && !downloadHistory.some(h => h.bookId === book.id)) {
        setFreeDownloadsUsed(prev => prev + 1)
      }

      // Fechar modal de visualização
      setSelectedBook(null)
    } catch (error) {
      console.error('Erro ao fazer download:', error)
      alert('Erro ao fazer download do PDF. Tente novamente.')
    }
  }

  // Filtrar livros
  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Ativar plano
  const activatePlan = (planType: 'mensal' | 'anual') => {
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + (planType === 'mensal' ? 1 : 12))
    
    const newPlan: UserPlan = {
      type: planType,
      expiresAt: expiresAt.toISOString()
    }
    
    setUserPlan(newPlan)
    localStorage.setItem('userPlan', JSON.stringify(newPlan))
    setShowPlansModal(false)
    setShowDownloadLimitModal(false)
  }

  // Abrir livro
  const openBook = (book: ColoringBook) => {
    if (canAccessBook(book)) {
      setSelectedBook(book)
    } else {
      setShowPlansModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ColorBook
                </h1>
                <p className="text-xs text-gray-600">Livros de Colorir Digitais</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {userPlan.type === 'free' ? (
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <span className="text-xs text-gray-600 font-medium">
                    Downloads: {freeDownloadsUsed}/1
                  </span>
                  <button
                    onClick={() => setShowPlansModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-semibold">Assinar Premium</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {userPlan.type === 'mensal' ? 'Premium Mensal' : 'Premium Anual'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filtros e Busca */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar livros de colorir..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              />
            </div>

            {/* Filtro de Categoria */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedCategory('infantil')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === 'infantil'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Infantil
              </button>
              <button
                onClick={() => setSelectedCategory('adulto')}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === 'adulto'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Adulto
              </button>
            </div>
          </div>

          {/* Info do Plano Gratuito */}
          {userPlan.type === 'free' && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-xl p-4">
              <p className="text-sm text-purple-900">
                <strong>Plano Gratuito:</strong> Você tem direito a 1 download gratuito. 
                <button
                  onClick={() => setShowPlansModal(true)}
                  className="ml-2 underline font-semibold hover:text-purple-700"
                >
                  Assine Premium para downloads ilimitados!
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Grid de Livros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const hasAccess = canAccessBook(book)
            const downloadCheck = canDownload(book)
            const alreadyDownloaded = downloadHistory.some(h => h.bookId === book.id)
            
            return (
              <div
                key={book.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => openBook(book)}
              >
                {/* Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Badge de Categoria */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    book.category === 'infantil'
                      ? 'bg-blue-500 text-white'
                      : 'bg-purple-500 text-white'
                  }`}>
                    {book.category === 'infantil' ? 'Infantil' : 'Adulto'}
                  </div>

                  {/* Badge de Idade */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {book.ageRecommendation}
                  </div>

                  {/* Overlay de Bloqueio */}
                  {!hasAccess && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                        <p className="text-white font-semibold text-sm">Premium</p>
                      </div>
                    </div>
                  )}

                  {/* Badge Gratuito */}
                  {book.isFree && (
                    <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Grátis
                    </div>
                  )}

                  {/* Badge de Já Baixado */}
                  {alreadyDownloaded && (
                    <div className="absolute bottom-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Baixado
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {book.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum livro encontrado</p>
          </div>
        )}
      </main>

      {/* Modal de Limite de Downloads */}
      {showDownloadLimitModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Limite Atingido</h2>
                    <p className="text-sm text-gray-600">Você já usou seu download gratuito</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDownloadLimitModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 text-sm mb-4">
                  Usuários gratuitos têm direito a <strong>1 download</strong>. 
                  Para ter acesso ilimitado a todos os livros, assine nosso plano Premium!
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Downloads ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Acesso a todos os livros
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    Novos conteúdos toda semana
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setShowDownloadLimitModal(false)
                  setShowPlansModal(true)
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5" />
                Ver Planos Premium
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Planos */}
      {showPlansModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Header do Modal */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Escolha seu Plano Premium
                  </h2>
                  <p className="text-gray-600">Acesso ilimitado a todos os livros de colorir</p>
                </div>
                <button
                  onClick={() => setShowPlansModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Planos */}
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {/* Plano Mensal */}
                <div className="border-2 border-purple-200 rounded-2xl p-6 hover:border-purple-400 transition-all hover:shadow-xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Mensal</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-purple-600">R$ 19,90</span>
                      <span className="text-gray-600">/mês</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Downloads ilimitados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Acesso a todos os livros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Novos livros toda semana</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">PDFs em alta qualidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Cancele quando quiser</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => activatePlan('mensal')}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Assinar Mensal
                  </button>
                </div>

                {/* Plano Anual */}
                <div className="border-2 border-purple-400 rounded-2xl p-6 relative bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Anual</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-purple-600">R$ 179,90</span>
                      <span className="text-gray-600">/ano</span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      Economize R$ 58,90 (25% OFF)
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Downloads ilimitados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Acesso a todos os livros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Novos livros toda semana</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">PDFs em alta qualidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Suporte prioritário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold">Conteúdo exclusivo</span>
                    </li>
                  </ul>

                  <button
                    onClick={() => activatePlan('anual')}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Assinar Anual
                  </button>
                </div>
              </div>

              {/* Garantia */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-green-800 text-sm">
                  <strong>Garantia de 7 dias:</strong> Não gostou? Devolvemos seu dinheiro sem perguntas!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Visualização do Livro */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedBook.title}</h2>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedBook.category === 'infantil'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedBook.category === 'infantil' ? 'Infantil' : 'Adulto'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {selectedBook.ageRecommendation}
                    </span>
                    {downloadHistory.some(h => h.bookId === selectedBook.id) && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Já baixado
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <img
                src={selectedBook.thumbnail}
                alt={selectedBook.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <p className="text-gray-700 mb-6">{selectedBook.description}</p>

              {userPlan.type === 'free' && !selectedBook.isFree && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-orange-900 font-semibold mb-1">
                      Conteúdo Premium
                    </p>
                    <p className="text-xs text-orange-800">
                      Este livro requer assinatura Premium para download
                    </p>
                  </div>
                </div>
              )}

              {userPlan.type === 'free' && selectedBook.isFree && freeDownloadsUsed >= 1 && !downloadHistory.some(h => h.bookId === selectedBook.id) && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-orange-900 font-semibold mb-1">
                      Limite de downloads atingido
                    </p>
                    <p className="text-xs text-orange-800">
                      Você já usou seu download gratuito. Assine Premium para downloads ilimitados!
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleDownload(selectedBook)}
                disabled={!canDownload(selectedBook).allowed}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  canDownload(selectedBook).allowed
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Download className="w-5 h-5" />
                {downloadHistory.some(h => h.bookId === selectedBook.id) ? 'Baixar Novamente' : 'Baixar PDF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
