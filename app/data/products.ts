export type Product = {
  id: string
  slug: string
  name: string
  category: "huile" | "creme" | "gommage" | "kit"
  price: number
  description: string
  details: string
  image: string
  images: string[]
  badge?: string
  inStock: boolean
}

export const products: Product[] = [
  {
    id: "1",
    slug: "huile-corps-hydra",
    name: "Huile Corps Hydra",
    category: "huile",
    price: 8500,
    description: "Huile corporelle nourrissante aux extraits naturels pour une peau douce et lumineuse.",
    details: "Formulée avec des huiles essentielles soigneusement sélectionnées, cette huile corps pénètre rapidement pour hydrater et nourrir la peau en profondeur. Idéale après le hammam ou le gommage.",
    image: "/images/flyer-main1.jpg",
    images: ["/images/flyer-main1.jpg", "/images/flyer-main2.jpg"],
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: "2",
    slug: "creme-visage-eclat",
    name: "Crème Visage Éclat",
    category: "creme",
    price: 12000,
    description: "Crème visage illuminatrice pour un teint éclatant et unifié au quotidien.",
    details: "Notre crème visage signature combine des actifs hydratants et illuminateurs pour révéler l'éclat naturel de votre peau. Convient à tous les types de peau.",
    image: "/images/face-care.jpg",
    images: ["/images/face-care.jpg"],
    badge: "Nouveau",
    inStock: true,
  },
  {
    id: "3",
    slug: "gommage-corps-cafe",
    name: "Gommage Corps Café",
    category: "gommage",
    price: 6500,
    description: "Gommage exfoliant au café et sucre brun pour une peau parfaitement lisse.",
    details: "Ce gommage naturel à base de café et sucre brun élimine les cellules mortes en douceur, stimule la circulation et laisse la peau incroyablement douce. À utiliser 2 fois par semaine.",
    image: "/images/demgn0ma.jpg",
    images: ["/images/demgn0ma.jpg"],
    inStock: true,
  },
  {
    id: "4",
    slug: "kit-soin-complet",
    name: "Kit Soin Complet",
    category: "kit",
    price: 25000,
    description: "Kit complet incluant huile, crème et gommage pour une routine beauté parfaite.",
    details: "Notre kit soin complet regroupe nos produits phares : l'huile corps Hydra, la crème visage éclat et le gommage corps café. Le cadeau parfait ou le début d'une routine beauté complète.",
    image: "/images/pedicure1.jpg",
    images: ["/images/pedicure1.jpg", "/images/flyer-main2.jpg"],
    badge: "Meilleure Valeur",
    inStock: true,
  },
  {
    id: "5",
    slug: "huile-argan-pure",
    name: "Huile d'Argan Pure",
    category: "huile",
    price: 15000,
    description: "Huile d'argan 100% pure et naturelle pour le visage, le corps et les cheveux.",
    details: "L'or liquide du Maroc. Notre huile d'argan pure est extraite à froid pour préserver toutes ses propriétés nutritives et réparatrices. Multi-usages : visage, corps, cheveux et ongles.",
    image: "/images/hairs.jpg",
    images: ["/images/hairs.jpg"],
    inStock: true,
  },
  {
    id: "6",
    slug: "creme-corps-karité",
    name: "Crème Corps Karité",
    category: "creme",
    price: 9000,
    description: "Crème corps au beurre de karité pour une hydratation intense et durable.",
    details: "Enrichie en beurre de karité pur du Cameroun, cette crème corps offre une hydratation intense qui dure toute la journée. Idéale pour les peaux sèches et déshydratées.",
    image: "/images/femmeha1r.jpg",
    images: ["/images/femmeha1r.jpg"],
    inStock: true,
  },
]

export const categories = [
  { value: "all", label: "Tous" },
  { value: "huile", label: "Huiles" },
  { value: "creme", label: "Crèmes" },
  { value: "gommage", label: "Gommages" },
  { value: "kit", label: "Kits" },
]