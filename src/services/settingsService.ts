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
}

export const INITIAL_HERO_PRESETS: HeroPresetItem[] = [
  { id: '1', name: 'Vista Aérea da Costa de Caraguatatuba', url: POUSADA_IMAGES.hero, active: true },
  { id: '2', name: 'Piscina Ensolarada da Pousada', url: POUSADA_IMAGES.pool, active: true },
  { id: '3', name: 'Chalés & Jardim Tropical', url: POUSADA_IMAGES.chalets, active: true },
  { id: '4', name: 'Área Gourmet e Churrasqueira', url: POUSADA_IMAGES.gourmet, active: true },
  { id: '5', name: 'Praia e Mar Azul Paradisíaco', url: POUSADA_IMAGES.sunnyBeach, active: true },
  { id: '6', name: 'Quarto & Chalé Casal', url: POUSADA_IMAGES.room, active: true },
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
};

const SETTINGS_DOC_ID = 'main';

// Inicializa o banco com dados padrão se ainda não existirem
export async function initializeDatabaseIfEmpty(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data() as Partial<SiteSettings>;
      return { 
        ...DEFAULT_SETTINGS, 
        ...data,
        heroPresets: data.heroPresets && data.heroPresets.length > 0 ? data.heroPresets : INITIAL_HERO_PRESETS,
        menuItems: data.menuItems && data.menuItems.length > 0 ? data.menuItems : INITIAL_MENU_ITEMS
      };
    } else {
      // Salva configurações padrão no Firestore
      const initial = { ...DEFAULT_SETTINGS, updatedAt: new Date().toISOString() };
      await setDoc(docRef, initial);

      // Também inicializa a galeria se vazia
      const galCollection = collection(db, 'gallery');
      const galSnap = await getDocs(galCollection);
      if (galSnap.empty) {
        for (const item of GALLERY_ITEMS) {
          const itemRef = doc(db, 'gallery', String(item.id));
          await setDoc(itemRef, {
            title: item.title,
            tag: item.tag,
            desc: item.desc,
            image: item.image,
            order: item.id,
          });
        }
      }

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
      callback({ 
        ...DEFAULT_SETTINGS, 
        ...data,
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
