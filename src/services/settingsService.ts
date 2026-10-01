import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { POUSADA_INFO, POUSADA_IMAGES, GALLERY_ITEMS } from '../data/pousadaData';

export interface HeroPresetItem {
  id: string;
  name: string;
  url: string;
  active: boolean; // se está visível / ativo na lista
}

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  visible?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string; // ex: '#inicio', '#a-pousada', '#acomodacoes', etc.
  visible: boolean; // se mostra ou não no menu
  isHome: boolean; // se é a página principal / home do site
  content?: string; // conteúdo personalizado opcional caso seja página interna
  order: number;
  subItems?: SubMenuItem[]; // Submenus suspensos (dropdown)
}

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  { id: 'inicio', label: 'Início', href: '#inicio', visible: true, isHome: true, order: 1 },
  { 
    id: 'temporada', 
    label: 'Temporada', 
    href: '#temporada', 
    visible: true, 
    isHome: false, 
    order: 2,
    subItems: [
      { id: 'fim-de-ano', label: 'Fim de Ano', href: '#fim-de-ano', visible: true },
      { id: 'carnaval', label: 'Carnaval', href: '#carnaval', visible: true },
      { id: 'alta-temporada-verao', label: 'Verão & Férias', href: '#alta-temporada-verao', visible: true },
    ]
  },
  { id: 'a-pousada', label: 'A Pousada', href: '#a-pousada', visible: true, isHome: false, order: 3 },
  { id: 'acomodacoes', label: 'Acomodações', href: '#acomodacoes', visible: true, isHome: false, order: 4 },
  { id: 'estrutura', label: 'Estrutura', href: '#estrutura', visible: true, isHome: false, order: 5 },
  { id: 'localizacao', label: 'Localização', href: '#localizacao', visible: true, isHome: false, order: 6 },
  { id: 'depoimentos', label: 'Depoimentos', href: '#depoimentos', visible: true, isHome: false, order: 7 },
  { id: 'privacidade', label: 'Privacidade', href: '#privacidade', visible: true, isHome: false, order: 8 },
];

export interface SiteSettings {
  pousadaName: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  heroPresets?: HeroPresetItem[];
  menuItems?: MenuItem[];
  bgPalmBanner: string;
  ctaBannerImage: string;
  phone: string;
  phoneClean: string;
  whatsappMessage: string;
  address: string;
  instagram: string;
  updatedAt?: string;
  aboutPhoto1?: string;
  aboutPhoto2?: string;
  aboutPhoto3?: string;
  aboutPhoto4?: string;
  aboutPhoto5?: string;
  aboutPhoto6?: string;
}

export const INITIAL_HERO_PRESETS: HeroPresetItem[] = [
  { id: '1', name: 'Vista Panorâmica do Mar de Caraguatatuba (Original)', url: POUSADA_IMAGES.hero, active: true },
  { id: '2', name: 'Chalés Azuis & Jardim com Mamoeiro (Original)', url: POUSADA_IMAGES.chalets, active: true },
  { id: '3', name: 'Piscina com Deck e Vista para a Serra (Original)', url: POUSADA_IMAGES.pool, active: true },
  { id: '4', name: 'Área Gourmet e Churrasqueira (Original)', url: POUSADA_IMAGES.gourmet, active: true },
  { id: '5', name: 'Pátio Central e Alamedas Floridas (Original)', url: POUSADA_IMAGES.foto2, active: true },
  { id: '6', name: 'Suíte Casal com Ar-Condicionado (Original)', url: POUSADA_IMAGES.room, active: true },
  { id: '7', name: 'Deck da Piscina e Solarium (Original)', url: POUSADA_IMAGES.sunnyBeach, active: true },
  { id: '8', name: 'Fachada e Varandas dos Chalés (Original)', url: POUSADA_IMAGES.foto3, active: true },
  { id: '9', name: 'Conjunto de Chalés na Natureza (Original)', url: POUSADA_IMAGES.foto4, active: true },
  { id: '10', name: 'Área de Convivência e Varanda (Original)', url: POUSADA_IMAGES.foto6, active: true },
  { id: '11', name: 'Piscina Ensolarada da Pousada (Original)', url: POUSADA_IMAGES.foto11, active: true },
  { id: '12', name: 'Dormitório Aconchegante com TV (Original)', url: POUSADA_IMAGES.foto13, active: true },
  { id: '13', name: 'Panorâmica da Pousada Vila de Santa Marina (Original)', url: POUSADA_IMAGES.foto17, active: true },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  pousadaName: POUSADA_INFO.name,
  heroTitleLine1: 'Fique perto do mar com o conforto que você merece',
  heroTitleLine2: 'Seu refúgio a poucos passos do mar',
  heroSubtitle: 'Chalés completos para casais e famílias, com piscina, área gourmet e todo o conforto que você precisa, para viver dias únicos em Caraguatatuba.',
  heroBadge: 'CARAGUATATUBA TE ESPERA',
  heroImage: POUSADA_IMAGES.hero,
  heroPresets: INITIAL_HERO_PRESETS,
  menuItems: INITIAL_MENU_ITEMS,
  bgPalmBanner: POUSADA_IMAGES.bgPalmBanner,
  ctaBannerImage: POUSADA_IMAGES.sunnyBeach,
  phone: POUSADA_INFO.phone,
  phoneClean: POUSADA_INFO.phoneClean,
  whatsappMessage: POUSADA_INFO.whatsappMessage,
  address: POUSADA_INFO.address,
  instagram: POUSADA_INFO.instagram,
  aboutPhoto1: POUSADA_IMAGES.chalets,
  aboutPhoto2: POUSADA_IMAGES.foto2,
  aboutPhoto3: POUSADA_IMAGES.pool,
  aboutPhoto4: POUSADA_IMAGES.gourmet,
  aboutPhoto5: POUSADA_IMAGES.room,
  aboutPhoto6: POUSADA_IMAGES.sunnyBeach,
};

const SETTINGS_DOC_ID = 'main';

// Limpa URLs antigas de imagens geradas por IA se ainda existirem no banco
function sanitizePhotoUrl(currentUrl?: string, fallbackUrl: string = ''): string {
  if (!currentUrl) return fallbackUrl;
  // Preserva a foto do mar da hero
  if (currentUrl.includes('caragua_hero') || currentUrl.includes('caragua_sunny_beach')) {
    return currentUrl;
  }
  if (
    currentUrl.includes('1790811') ||
    currentUrl.includes('unsplash.com') ||
    currentUrl.includes('chalets_blue_garden') ||
    currentUrl.includes('pool_mountains') ||
    currentUrl.includes('gourmet_churrasqueira') ||
    currentUrl.includes('courtyard_lawn') ||
    currentUrl.includes('chalet_bedroom') ||
    currentUrl.includes('pool_terrace') ||
    currentUrl.includes('pousada_chalets')
  ) {
    return fallbackUrl;
  }
  return currentUrl;
}

// Inicializa o banco com dados padrão se ainda não existirem e sincroniza as novas fotos
export async function initializeDatabaseIfEmpty(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);

    // Sincroniza todas as 16 fotos oficiais na coleção gallery do Firestore
    for (const item of GALLERY_ITEMS) {
      const itemRef = doc(db, 'gallery', String(item.id));
      await setDoc(itemRef, {
        title: item.title,
        tag: item.tag,
        desc: item.desc,
        image: item.image,
        order: item.id,
      }, { merge: true });
    }

    if (snap.exists()) {
      const data = snap.data() as Partial<SiteSettings>;

      // O usuário solicitou explicitamente a foto do mar na Hero
      const cleanHeroImage = (data.heroImage && data.heroImage.includes('caragua_hero'))
        ? data.heroImage
        : POUSADA_IMAGES.hero;

      const cleanAboutPhoto1 = sanitizePhotoUrl(data.aboutPhoto1, POUSADA_IMAGES.chalets);
      const cleanAboutPhoto2 = sanitizePhotoUrl(data.aboutPhoto2, POUSADA_IMAGES.foto2);
      const cleanAboutPhoto3 = sanitizePhotoUrl(data.aboutPhoto3, POUSADA_IMAGES.pool);
      const cleanAboutPhoto4 = sanitizePhotoUrl(data.aboutPhoto4, POUSADA_IMAGES.gourmet);
      const cleanAboutPhoto5 = sanitizePhotoUrl(data.aboutPhoto5, POUSADA_IMAGES.room);
      const cleanAboutPhoto6 = sanitizePhotoUrl(data.aboutPhoto6, POUSADA_IMAGES.sunnyBeach);

      const mergedSettings: SiteSettings = { 
        ...DEFAULT_SETTINGS, 
        ...data,
        heroPresets: INITIAL_HERO_PRESETS,
        heroImage: cleanHeroImage,
        aboutPhoto1: cleanAboutPhoto1,
        aboutPhoto2: cleanAboutPhoto2,
        aboutPhoto3: cleanAboutPhoto3,
        aboutPhoto4: cleanAboutPhoto4,
        aboutPhoto5: cleanAboutPhoto5,
        aboutPhoto6: cleanAboutPhoto6,
        menuItems: data.menuItems && data.menuItems.length > 0 ? data.menuItems : INITIAL_MENU_ITEMS
      };

      // Atualiza o Firestore com as novas fotos oficiais e a foto do mar na hero
      await setDoc(docRef, {
        heroPresets: INITIAL_HERO_PRESETS,
        heroImage: cleanHeroImage,
        aboutPhoto1: cleanAboutPhoto1,
        aboutPhoto2: cleanAboutPhoto2,
        aboutPhoto3: cleanAboutPhoto3,
        aboutPhoto4: cleanAboutPhoto4,
        aboutPhoto5: cleanAboutPhoto5,
        aboutPhoto6: cleanAboutPhoto6,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return mergedSettings;
    } else {
      // Salva configurações padrão no Firestore
      const initial = { ...DEFAULT_SETTINGS, updatedAt: new Date().toISOString() };
      await setDoc(docRef, initial);
      return initial;
    }
  } catch (err) {
    console.warn('Erro ao inicializar Firestore ou rodando offline:', err);
    return DEFAULT_SETTINGS;
  }
}

// Salva as configurações editadas no Dashboard
export async function saveSiteSettings(newSettings: SiteSettings): Promise<void> {
  const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
  await setDoc(docRef, {
    ...newSettings,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

// Escuta alterações em tempo real no Firestore
export function subscribeToSiteSettings(callback: (settings: SiteSettings) => void) {
  const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data() as Partial<SiteSettings>;
      const cleanHeroImage = (data.heroImage && (data.heroImage.includes('caragua_hero') || data.heroImage.includes('data:image')))
        ? data.heroImage
        : POUSADA_IMAGES.hero;

      const cleanAboutPhoto1 = sanitizePhotoUrl(data.aboutPhoto1, POUSADA_IMAGES.chalets);
      const cleanAboutPhoto2 = sanitizePhotoUrl(data.aboutPhoto2, POUSADA_IMAGES.foto2);
      const cleanAboutPhoto3 = sanitizePhotoUrl(data.aboutPhoto3, POUSADA_IMAGES.pool);
      const cleanAboutPhoto4 = sanitizePhotoUrl(data.aboutPhoto4, POUSADA_IMAGES.gourmet);
      const cleanAboutPhoto5 = sanitizePhotoUrl(data.aboutPhoto5, POUSADA_IMAGES.room);
      const cleanAboutPhoto6 = sanitizePhotoUrl(data.aboutPhoto6, POUSADA_IMAGES.sunnyBeach);

      callback({ 
        ...DEFAULT_SETTINGS, 
        ...data,
        heroImage: cleanHeroImage,
        aboutPhoto1: cleanAboutPhoto1,
        aboutPhoto2: cleanAboutPhoto2,
        aboutPhoto3: cleanAboutPhoto3,
        aboutPhoto4: cleanAboutPhoto4,
        aboutPhoto5: cleanAboutPhoto5,
        aboutPhoto6: cleanAboutPhoto6,
        heroPresets: data.heroPresets && data.heroPresets.length > 0 ? data.heroPresets : INITIAL_HERO_PRESETS,
        menuItems: data.menuItems && data.menuItems.length > 0 ? data.menuItems : INITIAL_MENU_ITEMS
      });
    } else {
      callback(DEFAULT_SETTINGS);
    }
  }, (err) => {
    console.warn('Falha na assinatura do Firestore:', err);
    callback(DEFAULT_SETTINGS);
  });
}
