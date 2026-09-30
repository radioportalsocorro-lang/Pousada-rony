import heroImg from '../assets/images/caragua_hero_1790379348617.jpg';
import chaletsImg from '../assets/images/pousada_chalets_1790379374449.jpg';
import poolImg from '../assets/images/pousada_pool_1790379361251.jpg';
import gourmetImg from '../assets/images/pousada_gourmet_1790379387215.jpg';
import roomImg from '../assets/images/pousada_room_1790379399687.jpg';
import ctaBeachImg from '../assets/images/cta_beach_1790379410587.jpg';
import palmCornerImg from '../assets/images/palm_branch_corner_1790380197628.jpg';
import monsteraLeftImg from '../assets/images/monstera_foliage_left_1790380210430.jpg';
import bgPalmBannerImg from '../assets/images/bg_pousada_palm_1790380889508.jpg';
import sunnyBeachImg from '../assets/images/caragua_sunny_beach_1790384056861.jpg';

export const POUSADA_IMAGES = {
  hero: heroImg,
  chalets: chaletsImg,
  pool: poolImg,
  gourmet: gourmetImg,
  room: roomImg,
  ctaBeach: ctaBeachImg,
  sunnyBeach: sunnyBeachImg,
  palmCorner: palmCornerImg,
  monsteraLeft: monsteraLeftImg,
  bgPalmBanner: bgPalmBannerImg,
};

export const POUSADA_INFO = {
  name: 'Pousada Vila de Santa Marina',
  location: 'Caraguatatuba - SP',
  address: 'Rua Canjós, Loteamento Jardim Britânia, Caraguatatuba - SP',
  phone: '(12) 99734-5678',
  phoneClean: '5512997345678',
  email: 'contato@vilasantamarina.com.br',
  instagram: '@vilasantamarina',
  facebook: 'Pousada Vila de Santa Marina',
  whatsappMessage: 'Olá! Gostaria de consultar disponibilidade e valores de diárias na Pousada Vila de Santa Marina.',
};

export const GALLERY_ITEMS = [
  {
    id: 1,
    tag: 'Jardim',
    title: 'Jardim Tropical e Alamedas',
    desc: 'Área verde com palmeiras e flores tropicais para caminhadas relaxantes.',
    image: chaletsImg,
  },
  {
    id: 2,
    tag: 'Área externa',
    title: 'Pátio e Área de Lazer Externa',
    desc: 'Espaço aberto com mesas, bancos e iluminação aconchegante para as noites.',
    image: heroImg,
  },
  {
    id: 3,
    tag: 'Piscina',
    title: 'Piscina para Adultos e Crianças',
    desc: 'Água cristalina, solarium e espreguiçadeiras para aproveitar o dia de sol.',
    image: poolImg,
  },
  {
    id: 4,
    tag: 'Área gourmet',
    title: 'Churrasqueira e Espaço Gourmet',
    desc: 'Churrasqueira completa com mesas de apoio para reunir a família e amigos.',
    image: gourmetImg,
  },
  {
    id: 5,
    tag: 'Acomodações',
    title: 'Chalés Completos e Aconchegantes',
    desc: 'Quarto com cama confortável, ar-condicionado, TV com canais SKY e cozinha privativa.',
    image: roomImg,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Gabi Cardoso',
    date: '1 semana atrás',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Lugar super aconchegante, sossegado, tem uma área de lazer completa e a pousada é pertinho da praia. Voltaremos com certeza!',
  },
  {
    id: 2,
    name: 'Marcelo Valério de Sousa',
    date: '1 mês atrás',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Foi muito bom, fiquei com minha família e fui muito bem recebido uma estrutura maravilhosa.',
  },
  {
    id: 3,
    name: 'Patrícia Lima',
    date: '2 meses atrás',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Chalés limpos, organizados e com tudo que precisamos. Meus filhos amaram a piscina! Atendimento excelente.',
  },
];
