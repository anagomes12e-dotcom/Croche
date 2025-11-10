'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Bookmark, Search, Filter, Plus, Home, Book, Users, User, Scissors, Zap, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Dados mockados para demonstração
const projetos = [
  {
    id: 1,
    titulo: "Manta de Bebê em Crochê",
    autor: "Maria Silva",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c9c5b1b2?w=100&h=100&fit=crop&crop=face",
    foto: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    tipo: "crochê",
    curtidas: 24,
    comentarios: 8,
    tempo: "2 dias atrás",
    materiais: "Fio Círculo Cisne, Agulha 4mm",
    nivel: "Iniciante"
  },
  {
    id: 2,
    titulo: "Cachecol de Tricô Trançado",
    autor: "Ana Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    foto: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=300&fit=crop",
    tipo: "tricô",
    curtidas: 18,
    comentarios: 5,
    tempo: "1 semana atrás",
    materiais: "Lã Pingouin, Agulhas 5mm",
    nivel: "Intermediário"
  },
  {
    id: 3,
    titulo: "Bordado Floral em Bastidor",
    autor: "Carla Mendes",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    foto: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop",
    tipo: "bordado",
    curtidas: 31,
    comentarios: 12,
    tempo: "3 dias atrás",
    materiais: "Linha Anchor, Bastidor 20cm",
    nivel: "Avançado"
  }
]

const receitas = [
  {
    id: 1,
    nome: "Amigurumi Gatinho",
    tecnica: "crochê",
    nivel: "Iniciante",
    tempo: "4 horas",
    autor: "Lucia Santos",
    curtidas: 156
  },
  {
    id: 2,
    nome: "Gorro de Tricô Básico",
    tecnica: "tricô",
    nivel: "Iniciante",
    tempo: "6 horas",
    autor: "Rosa Lima",
    curtidas: 89
  },
  {
    id: 3,
    nome: "Bordado Ponto Cruz Flores",
    tecnica: "bordado",
    nivel: "Intermediário",
    tempo: "8 horas",
    autor: "Helena Rocha",
    curtidas: 203
  }
]

const materiais = [
  {
    id: 1,
    nome: "Círculo Cisne",
    marca: "Círculo",
    tipo: "Algodão",
    agulha: "3-4mm",
    preco: "R$ 8,90"
  },
  {
    id: 2,
    nome: "Pingouin Lã Natural",
    marca: "Pingouin",
    tipo: "Lã",
    agulha: "4-5mm",
    preco: "R$ 12,50"
  },
  {
    id: 3,
    nome: "EuroRoma Colorido",
    marca: "EuroRoma",
    tipo: "Acrílico",
    agulha: "4mm",
    preco: "R$ 6,80"
  }
]

export default function ArtesanApp() {
  const [activeTab, setActiveTab] = useState('feed')
  const [filtroTecnica, setFiltroTecnica] = useState('todos')
  const [projetoSelecionado, setProjetoSelecionado] = useState(null)
  const [curtidas, setCurtidas] = useState({})

  const handleCurtir = (id) => {
    setCurtidas(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const projetosFiltrados = filtroTecnica === 'todos' 
    ? projetos 
    : projetos.filter(p => p.tipo === filtroTecnica)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FioAmigo
                </h1>
                <p className="text-sm text-purple-600">Sua comunidade de artesanato</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm rounded-2xl p-1 mb-6">
            <TabsTrigger value="feed" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Home className="w-4 h-4 mr-2" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="receitas" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Book className="w-4 h-4 mr-2" />
              Receitas
            </TabsTrigger>
            <TabsTrigger value="materiais" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Zap className="w-4 h-4 mr-2" />
              Materiais
            </TabsTrigger>
            <TabsTrigger value="comunidade" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Comunidade
            </TabsTrigger>
            <TabsTrigger value="perfil" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Oi, crocheteira! 👋</h2>
              <p className="text-purple-600 mb-4">Veja os projetos incríveis da nossa comunidade</p>
              
              {/* Filtros */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button 
                  variant={filtroTecnica === 'todos' ? 'default' : 'outline'}
                  onClick={() => setFiltroTecnica('todos')}
                  className={filtroTecnica === 'todos' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'border-purple-200 text-purple-600 hover:bg-purple-50'}
                >
                  Todos
                </Button>
                <Button 
                  variant={filtroTecnica === 'crochê' ? 'default' : 'outline'}
                  onClick={() => setFiltroTecnica('crochê')}
                  className={filtroTecnica === 'crochê' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'border-purple-200 text-purple-600 hover:bg-purple-50'}
                >
                  Crochê
                </Button>
                <Button 
                  variant={filtroTecnica === 'tricô' ? 'default' : 'outline'}
                  onClick={() => setFiltroTecnica('tricô')}
                  className={filtroTecnica === 'tricô' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'border-purple-200 text-purple-600 hover:bg-purple-50'}
                >
                  Tricô
                </Button>
                <Button 
                  variant={filtroTecnica === 'bordado' ? 'default' : 'outline'}
                  onClick={() => setFiltroTecnica('bordado')}
                  className={filtroTecnica === 'bordado' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'border-purple-200 text-purple-600 hover:bg-purple-50'}
                >
                  Bordado
                </Button>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {projetosFiltrados.map((projeto) => (
                <Card key={projeto.id} className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <div className="relative">
                    <img 
                      src={projeto.foto} 
                      alt={projeto.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-purple-600 capitalize">
                      {projeto.tipo}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={projeto.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs">
                          {projeto.autor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-purple-800">{projeto.autor}</p>
                        <p className="text-xs text-purple-500">{projeto.tempo}</p>
                      </div>
                    </div>
                    <h3 className="font-bold text-purple-900 text-lg">{projeto.titulo}</h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCurtir(projeto.id)}
                          className="text-purple-600 hover:text-pink-600 hover:bg-pink-50"
                        >
                          <Heart className={`w-4 h-4 mr-1 ${curtidas[projeto.id] ? 'fill-pink-500 text-pink-500' : ''}`} />
                          {projeto.curtidas + (curtidas[projeto.id] ? 1 : 0)}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {projeto.comentarios}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm text-purple-600">
                      <p><strong>Materiais:</strong> {projeto.materiais}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-purple-200 text-purple-600">
                          {projeto.nivel}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setProjetoSelecionado(projeto)}
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Receitas Tab */}
          <TabsContent value="receitas" className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Receitas da Comunidade</h2>
              <p className="text-purple-600 mb-4">Descubra tutoriais incríveis feitos pelas nossas artesãs</p>
              
              <div className="flex gap-3 mb-6">
                <Input 
                  placeholder="Buscar receitas..." 
                  className="flex-1 border-purple-200 focus:border-purple-400"
                />
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {receitas.map((receita) => (
                <Card key={receita.id} className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300 rounded-2xl">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white capitalize">
                        {receita.tecnica}
                      </Badge>
                      <div className="flex items-center text-purple-600">
                        <Heart className="w-4 h-4 mr-1" />
                        <span className="text-sm">{receita.curtidas}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-purple-900">{receita.nome}</h3>
                    <p className="text-sm text-purple-600">por {receita.autor}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-purple-600">
                        <Star className="w-4 h-4 mr-2" />
                        <span>{receita.nivel}</span>
                      </div>
                      <div className="flex items-center text-purple-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{receita.tempo}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      Ver Receita
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Materiais Tab */}
          <TabsContent value="materiais" className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Catálogo de Materiais</h2>
              <p className="text-purple-600 mb-4">Encontre os melhores fios e materiais do Brasil</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {materiais.map((material) => (
                <Card key={material.id} className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300 rounded-2xl">
                  <CardHeader>
                    <h3 className="font-bold text-purple-900">{material.nome}</h3>
                    <p className="text-purple-600">{material.marca}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-purple-600">
                      <p><strong>Tipo:</strong> {material.tipo}</p>
                      <p><strong>Agulha recomendada:</strong> {material.agulha}</p>
                      <p className="text-lg font-bold text-purple-800">{material.preco}</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4 border-purple-200 text-purple-600 hover:bg-purple-50">
                      Ver detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Comunidade Tab */}
          <TabsContent value="comunidade" className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">Nossa Comunidade</h2>
              <p className="text-purple-600 mb-4">Converse, tire dúvidas e compartilhe experiências</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <h3 className="font-bold text-purple-900">💡 Dicas de Fios</h3>
                  <p className="text-purple-600">Compartilhe suas descobertas sobre fios e marcas</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-600 mb-4">142 discussões ativas</p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Participar
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <h3 className="font-bold text-purple-900">🧶 Técnicas de Crochê</h3>
                  <p className="text-purple-600">Aprenda novos pontos e técnicas</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-600 mb-4">89 discussões ativas</p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Participar
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <h3 className="font-bold text-purple-900">🧵 Tricô para Iniciantes</h3>
                  <p className="text-purple-600">Primeiros passos no mundo do tricô</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-600 mb-4">67 discussões ativas</p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Participar
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <h3 className="font-bold text-purple-900">🌸 Bordado Artístico</h3>
                  <p className="text-purple-600">Técnicas avançadas de bordado</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-600 mb-4">34 discussões ativas</p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Participar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Perfil Tab */}
          <TabsContent value="perfil" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100 rounded-2xl">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616c9c5b1b2?w=200&h=200&fit=crop&crop=face" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-2xl">
                    MS
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-purple-900">Maria Silva</h2>
                <p className="text-purple-600">Apaixonada por crochê há 15 anos ❤️</p>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-800">24</p>
                    <p className="text-sm text-purple-600">Projetos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-800">156</p>
                    <p className="text-sm text-purple-600">Seguidores</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-800">342</p>
                    <p className="text-sm text-purple-600">Curtidas</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Editar Perfil
                  </Button>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                    Meus Projetos Salvos
                  </Button>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                    Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modal de Detalhes do Projeto */}
      {projetoSelecionado && (
        <Dialog open={!!projetoSelecionado} onOpenChange={() => setProjetoSelecionado(null)}>
          <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-purple-200">
            <DialogHeader>
              <DialogTitle className="text-2xl text-purple-900">{projetoSelecionado.titulo}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img 
                src={projetoSelecionado.foto} 
                alt={projetoSelecionado.titulo}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={projetoSelecionado.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                    {projetoSelecionado.autor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-purple-800">{projetoSelecionado.autor}</p>
                  <p className="text-sm text-purple-600">{projetoSelecionado.tempo}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Materiais utilizados:</h4>
                  <p className="text-purple-600">{projetoSelecionado.materiais}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Nível de dificuldade:</h4>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {projetoSelecionado.nivel}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  onClick={() => handleCurtir(projetoSelecionado.id)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${curtidas[projetoSelecionado.id] ? 'fill-current' : ''}`} />
                  Curtir
                </Button>
                <Button variant="outline" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comentar
                </Button>
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}