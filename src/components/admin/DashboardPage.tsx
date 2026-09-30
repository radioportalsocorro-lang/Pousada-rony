import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Save, 
  RotateCcw, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  Phone, 
  Sparkles, 
  Check, 
  AlertCircle,
  ExternalLink,
  Layers,
  Eye,
  CheckCircle2,
  Menu as MenuIcon,
  X,
  Plus,
  Trash2,
  Edit2,
  Power,
  Sliders,
  ChevronRight,
  EyeOff,
  Upload,
  FolderOpen,
  Home,
  Compass,
  ArrowUp,
  ArrowDown,
  Link as LinkIcon,
  FileText,
  ChevronDown,
  Folder,
  FolderPlus,
  PartyPopper,
  SunMedium,
  Server
} from 'lucide-react';
import { PhpExportModal } from '../pousada/PhpExportModal';
import { 
  SiteSettings, 
  saveSiteSettings, 
  DEFAULT_SETTINGS, 
  HeroPresetItem,
  INITIAL_HERO_PRESETS,
  MenuItem,
  SubMenuItem,
  INITIAL_MENU_ITEMS
} from '../../services/settingsService';
import { POUSADA_IMAGES } from '../../data/pousadaData';

interface DashboardPageProps {
  settings: SiteSettings;
  onSettingsUpdated: (newSettings: SiteSettings) => void;
  onBackToSite: () => void;
  onNavigateToPage?: (page: 'reveillon' | 'carnaval' | 'verao' | 'privacy') => void;
}

// Utilitário para comprimir e converter imagem do computador para Base64 Web-Ready
function processImageFile(file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo do computador.'));
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Formato de imagem inválido.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  settings,
  onSettingsUpdated,
  onBackToSite,
  onNavigateToPage,
}) => {
  const [form, setForm] = useState<SiteSettings>(settings);
  const [activeTab, setActiveTab] = useState<'menus' | 'hero' | 'presets' | 'images' | 'contact'>('menus');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Referências para inputs de arquivos do PC
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const presetModalFileInputRef = useRef<HTMLInputElement>(null);
  const palmFileInputRef = useRef<HTMLInputElement>(null);
  const ctaFileInputRef = useRef<HTMLInputElement>(null);

  // Estados para modal de adicionar/editar preset
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPreset, setEditingPreset] = useState<HeroPresetItem | null>(null);
  const [presetForm, setPresetForm] = useState({ name: '', url: '', active: true });

  // Estados para modal de criar/editar Página & Menu
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [menuForm, setMenuForm] = useState<{
    label: string;
    href: string;
    visible: boolean;
    isHome: boolean;
  }>({
    label: '',
    href: '',
    visible: true,
    isHome: false,
  });

  // Estados para modal de criar/editar Sub-página
  const [isSubItemModalOpen, setIsSubItemModalOpen] = useState(false);
  const [isPhpModalOpen, setIsPhpModalOpen] = useState(false);
  const [editingSubParentId, setEditingSubParentId] = useState<string | null>(null);
  const [editingSubItem, setEditingSubItem] = useState<SubMenuItem | null>(null);
  const [subItemForm, setSubItemForm] = useState<{
    label: string;
    href: string;
    visible: boolean;
  }>({
    label: '',
    href: '',
    visible: true,
  });

  React.useEffect(() => {
    let items = settings.menuItems && settings.menuItems.length > 0
      ? settings.menuItems
      : INITIAL_MENU_ITEMS;

    // Atualiza qualquer item 'final-do-ano' existente para 'Temporada' com subItems
    items = items.map((m) => {
      if (m.id === 'final-do-ano' || m.id === 'temporada' || m.label === 'Final do Ano') {
        return {
          ...m,
          id: 'temporada',
          label: 'Temporada',
          href: '#temporada',
          subItems: m.subItems && m.subItems.length > 0 ? m.subItems : [
            { id: 'fim-de-ano', label: 'Fim de Ano', href: '#fim-de-ano', visible: true },
            { id: 'carnaval', label: 'Carnaval', href: '#carnaval', visible: true },
            { id: 'alta-temporada-verao', label: 'Verão & Férias', href: '#alta-temporada-verao', visible: true },
          ]
        };
      }
      return m;
    });

    // Se o item 'temporada' ainda não estiver na lista, adiciona ele com subItems
    if (!items.some(m => m.id === 'temporada')) {
      const temporadaItem: MenuItem = {
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
      };
      items = [items[0], temporadaItem, ...items.slice(1)].map((m, idx) => ({ ...m, order: idx + 1 }));
    }

    setForm({
      ...settings,
      heroPresets: settings.heroPresets && settings.heroPresets.length > 0 
        ? settings.heroPresets 
        : INITIAL_HERO_PRESETS,
      menuItems: items,
    });
  }, [settings]);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e?: React.FormEvent, customForm?: SiteSettings) => {
    if (e) e.preventDefault();
    const dataToSave = customForm || form;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      await saveSiteSettings(dataToSave);
      onSettingsUpdated(dataToSave);
      setStatusMessage({ type: 'success', text: 'Alterações salvas com sucesso no banco de dados Firestore!' });
      setTimeout(() => {
        setStatusMessage(null);
      }, 5000);
    } catch (err: any) {
      setStatusMessage({ 
        type: 'error', 
        text: err?.message || 'Erro ao salvar configurações no Firestore.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão da pousada?')) {
      setForm(DEFAULT_SETTINGS);
      handleSave(undefined, DEFAULT_SETTINGS);
    }
  };

  // Upload de arquivo do PC direto para a Imagem Ativa da Hero
  const handleHeroFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setStatusMessage({ type: 'success', text: 'Carregando foto do computador...' });
      const base64 = await processImageFile(file, 1920, 1080, 0.82);

      const newPreset: HeroPresetItem = {
        id: Date.now().toString(),
        name: file.name.replace(/\.[^/.]+$/, "") || 'Foto Enviada do PC',
        url: base64,
        active: true,
      };

      const updatedPresets = [...(form.heroPresets || INITIAL_HERO_PRESETS), newPreset];
      const updatedForm = { ...form, heroImage: base64, heroPresets: updatedPresets };
      setForm(updatedForm);
      handleSave(undefined, updatedForm);
      setStatusMessage({ type: 'success', text: 'Foto do computador carregada e salva como Hero da Home com sucesso!' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Não foi possível carregar a imagem do computador.' });
    } finally {
      if (heroFileInputRef.current) heroFileInputRef.current.value = '';
    }
  };

  // Upload de arquivo do PC dentro do modal de adicionar Preset
  const handlePresetModalFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await processImageFile(file, 1920, 1080, 0.82);
      setPresetForm((prev) => ({
        ...prev,
        url: base64,
        name: prev.name.trim() ? prev.name : file.name.replace(/\.[^/.]+$/, "")
      }));
    } catch (err: any) {
      alert(err?.message || 'Erro ao carregar a foto do PC.');
    } finally {
      if (presetModalFileInputRef.current) presetModalFileInputRef.current.value = '';
    }
  };

  // Upload de arquivo para Coqueiros ou Banner CTA
  const handleCustomFileUpload = async (field: 'bgPalmBanner' | 'ctaBannerImage', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await processImageFile(file, 1920, 800, 0.80);
      handleChange(field, base64);
      setStatusMessage({ type: 'success', text: 'Imagem do computador carregada! Não esqueça de Salvar as Alterações.' });
    } catch (err: any) {
      alert(err?.message || 'Erro ao carregar imagem.');
    }
  };

  // ==============================================================
  // FUNÇÕES DE GERENCIAMENTO DE MENUS E PÁGINAS (NOVO SISTEMA)
  // ==============================================================
  const currentMenus: MenuItem[] = form.menuItems || INITIAL_MENU_ITEMS;

  const handleOpenAddMenuModal = () => {
    setEditingMenuItem(null);
    setMenuForm({
      label: '',
      href: '',
      visible: true,
      isHome: false,
    });
    setIsMenuModalOpen(true);
  };

  const handleOpenEditMenuModal = (item: MenuItem) => {
    setEditingMenuItem(item);
    setMenuForm({
      label: item.label,
      href: item.href,
      visible: item.visible,
      isHome: item.isHome,
    });
    setIsMenuModalOpen(true);
  };

  // Alterna visibilidade (MOSTRA / NÃO MOSTRA) no menu do site
  const handleToggleMenuVisibility = (itemId: string) => {
    const updated = currentMenus.map((item) => {
      if (item.id === itemId) {
        return { ...item, visible: !item.visible };
      }
      return item;
    });
    const updatedForm = { ...form, menuItems: updated };
    setForm(updatedForm);
    handleSave(undefined, updatedForm);
  };

  // Define uma página como a principal (HOME)
  const handleSetAsHome = (itemId: string) => {
    const updated = currentMenus.map((item) => ({
      ...item,
      isHome: item.id === itemId, // Apenas uma pode ser a página principal
    }));
    const updatedForm = { ...form, menuItems: updated };
    setForm(updatedForm);
    handleSave(undefined, updatedForm);
  };

  // Excluir item de menu
  const handleDeleteMenuItem = (itemId: string) => {
    const target = currentMenus.find((m) => m.id === itemId);
    if (target?.isHome) {
      alert('Não é possível excluir a página principal (Home). Defina outra como Home primeiro.');
      return;
    }
    if (window.confirm(`Tem certeza que deseja remover o menu "${target?.label}"?`)) {
      const updated = currentMenus.filter((m) => m.id !== itemId);
      const updatedForm = { ...form, menuItems: updated };
      setForm(updatedForm);
      handleSave(undefined, updatedForm);
    }
  };

  // Mover posição na barra de menu (ordem)
  const handleMoveMenuOrder = (index: number, direction: 'up' | 'down') => {
    const newMenus = [...currentMenus];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newMenus.length) return;

    const temp = newMenus[index];
    newMenus[index] = newMenus[targetIndex];
    newMenus[targetIndex] = temp;

    const updated = newMenus.map((item, idx) => ({ ...item, order: idx + 1 }));
    const updatedForm = { ...form, menuItems: updated };
    setForm(updatedForm);
    handleSave(undefined, updatedForm);
  };

  // Salva no Modal de Menus
  const handleSaveMenuModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuForm.label.trim()) {
      alert('Por favor, informe o nome do menu.');
      return;
    }

    let formattedHref = menuForm.href.trim();
    if (!formattedHref) {
      formattedHref = `#${menuForm.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    } else if (!formattedHref.startsWith('#') && !formattedHref.startsWith('http') && !formattedHref.startsWith('/')) {
      formattedHref = `#${formattedHref}`;
    }

    let updatedMenus: MenuItem[];

    if (editingMenuItem) {
      // Editando
      updatedMenus = currentMenus.map((item) => {
        if (item.id === editingMenuItem.id) {
          return {
            ...item,
            label: menuForm.label.trim(),
            href: formattedHref,
            visible: menuForm.visible,
            isHome: menuForm.isHome,
          };
        }
        // Se este foi marcado como Home, desmarca os outros
        if (menuForm.isHome && item.id !== editingMenuItem.id) {
          return { ...item, isHome: false };
        }
        return item;
      });
    } else {
      // Criando novo menu / página
      const newId = `menu-${Date.now()}`;
      const newItem: MenuItem = {
        id: newId,
        label: menuForm.label.trim(),
        href: formattedHref,
        visible: menuForm.visible,
        isHome: menuForm.isHome,
        order: currentMenus.length + 1,
      };

      if (menuForm.isHome) {
        updatedMenus = currentMenus.map((m) => ({ ...m, isHome: false })).concat(newItem);
      } else {
        updatedMenus = [...currentMenus, newItem];
      }
    }

    const updatedForm = { ...form, menuItems: updatedMenus };
    setForm(updatedForm);
    setIsMenuModalOpen(false);
    handleSave(undefined, updatedForm);
  };

  // Funções de gerenciamento das Sub-páginas (Temporada: Fim de Ano, Carnaval, Verão & Férias)
  const handleToggleSubItemVisibility = (parentId: string, subId: string) => {
    const updated = currentMenus.map((m) => {
      if (m.id === parentId && m.subItems) {
        return {
          ...m,
          subItems: m.subItems.map((s) =>
            s.id === subId ? { ...s, visible: s.visible === false ? true : false } : s
          ),
        };
      }
      return m;
    });
    const updatedForm = { ...form, menuItems: updated };
    setForm(updatedForm);
    handleSave(undefined, updatedForm);
  };

  const handleOpenAddSubItem = (parentId: string) => {
    setEditingSubParentId(parentId);
    setEditingSubItem(null);
    setSubItemForm({ label: '', href: '', visible: true });
    setIsSubItemModalOpen(true);
  };

  const handleOpenEditSubItem = (parentId: string, sub: SubMenuItem) => {
    setEditingSubParentId(parentId);
    setEditingSubItem(sub);
    setSubItemForm({ label: sub.label, href: sub.href, visible: sub.visible !== false });
    setIsSubItemModalOpen(true);
  };

  const handleDeleteSubItem = (parentId: string, subId: string) => {
    const parentMenu = currentMenus.find((m) => m.id === parentId);
    const subTarget = parentMenu?.subItems?.find((s) => s.id === subId);
    if (window.confirm(`Tem certeza que deseja remover a sub-página "${subTarget?.label || subId}"?`)) {
      const updated = currentMenus.map((m) => {
        if (m.id === parentId && m.subItems) {
          return {
            ...m,
            subItems: m.subItems.filter((s) => s.id !== subId),
          };
        }
        return m;
      });
      const updatedForm = { ...form, menuItems: updated };
      setForm(updatedForm);
      handleSave(undefined, updatedForm);
    }
  };

  const handleSaveSubItemModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subItemForm.label.trim()) {
      alert('Por favor, informe o nome da sub-página.');
      return;
    }
    if (!editingSubParentId) return;

    let formattedHref = subItemForm.href.trim();
    if (!formattedHref) {
      formattedHref = `#${subItemForm.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    }

    const updated = currentMenus.map((m) => {
      if (m.id === editingSubParentId) {
        const existingSubs = m.subItems || [];
        if (editingSubItem) {
          return {
            ...m,
            subItems: existingSubs.map((s) =>
              s.id === editingSubItem.id
                ? {
                    ...s,
                    label: subItemForm.label.trim(),
                    href: formattedHref,
                    visible: subItemForm.visible,
                  }
                : s
            ),
          };
        } else {
          const newSub: SubMenuItem = {
            id: `sub-${Date.now()}`,
            label: subItemForm.label.trim(),
            href: formattedHref,
            visible: subItemForm.visible,
          };
          return {
            ...m,
            subItems: [...existingSubs, newSub],
          };
        }
      }
      return m;
    });

    const updatedForm = { ...form, menuItems: updated };
    setForm(updatedForm);
    setIsSubItemModalOpen(false);
    handleSave(undefined, updatedForm);
  };

  const handlePreviewSubPage = (subId: string, href: string) => {
    if (onNavigateToPage) {
      if (subId === 'fim-de-ano' || subId === 'reveillon' || href === '#fim-de-ano' || href === '#final-do-ano') {
        onNavigateToPage('reveillon');
        return;
      }
      if (subId === 'carnaval' || href === '#carnaval') {
        onNavigateToPage('carnaval');
        return;
      }
      if (subId === 'alta-temporada-verao' || subId === 'verao' || href === '#alta-temporada-verao' || href === '#verao') {
        onNavigateToPage('verao');
        return;
      }
    }
    onBackToSite();
  };

  // Funções de gerenciamento dos presets
  const presetsList: HeroPresetItem[] = form.heroPresets || INITIAL_HERO_PRESETS;

  const handleOpenAddModal = () => {
    setEditingPreset(null);
    setPresetForm({ name: '', url: '', active: true });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (preset: HeroPresetItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPreset(preset);
    setPresetForm({ name: preset.name, url: preset.url, active: preset.active });
    setIsModalOpen(true);
  };

  const handleToggleActivePreset = (presetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedPresets = presetsList.map((item) => {
      if (item.id === presetId) {
        return { ...item, active: !item.active };
      }
      return item;
    });

    const updatedForm = { ...form, heroPresets: updatedPresets };
    setForm(updatedForm);
    handleSave(undefined, updatedForm);
  };

  const handleDeletePreset = (presetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (presetsList.length <= 1) {
      alert('É necessário manter pelo menos uma foto na galeria.');
      return;
    }
    if (window.confirm('Deseja realmente remover esta foto da galeria de presets?')) {
      const updatedPresets = presetsList.filter((item) => item.id !== presetId);
      const updatedForm = { ...form, heroPresets: updatedPresets };
      setForm(updatedForm);
      handleSave(undefined, updatedForm);
    }
  };

  const handleSavePresetModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetForm.name.trim() || !presetForm.url.trim()) {
      alert('Por favor, preencha o nome e selecione uma foto do PC ou informe uma URL.');
      return;
    }

    let updatedPresets: HeroPresetItem[];

    if (editingPreset) {
      updatedPresets = presetsList.map((item) => {
        if (item.id === editingPreset.id) {
          return {
            ...item,
            name: presetForm.name.trim(),
            url: presetForm.url.trim(),
            active: presetForm.active,
          };
        }
        return item;
      });
    } else {
      const newPreset: HeroPresetItem = {
        id: Date.now().toString(),
        name: presetForm.name.trim(),
        url: presetForm.url.trim(),
        active: presetForm.active,
      };
      updatedPresets = [...presetsList, newPreset];
    }

    const updatedForm = { ...form, heroPresets: updatedPresets };
    setForm(updatedForm);
    setIsModalOpen(false);
    handleSave(undefined, updatedForm);
  };

  const navigationItems = [
    {
      id: 'menus' as const,
      label: 'Gerenciar Menus & Páginas',
      subtitle: 'Editar, mostrar/ocultar e definir Home',
      icon: Compass,
    },
    {
      id: 'hero' as const,
      label: 'Imagem da Hero & Textos',
      subtitle: 'Foto selecionada, títulos e badges',
      icon: ImageIcon,
    },
    {
      id: 'presets' as const,
      label: 'Presets & Fotos da Hero',
      subtitle: 'Adicionar, editar e ativar/desativar fotos',
      icon: Sparkles,
    },
    {
      id: 'images' as const,
      label: 'Banners & Coqueiros',
      subtitle: 'Fundo lateral e chamada da praia',
      icon: Layers,
    },
    {
      id: 'contact' as const,
      label: 'WhatsApp & Contatos',
      subtitle: 'Telefones, Instagram e endereço',
      icon: Phone,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800">
      {/* Input de arquivo invisível para a Imagem Ativa da Hero */}
      <input
        ref={heroFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleHeroFileUpload}
        className="hidden"
      />

      {/* Input de arquivo invisível para Coqueiros */}
      <input
        ref={palmFileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleCustomFileUpload('bgPalmBanner', e)}
        className="hidden"
      />

      {/* Input de arquivo invisível para Banner CTA */}
      <input
        ref={ctaFileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleCustomFileUpload('ctaBannerImage', e)}
        className="hidden"
      />

      {/* OVERLAY MOBILE DA SIDEBAR */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* ============================================================== */}
      {/* SIDEBAR COMPLETA (FIXA / DEDICADA DE PONTA A PONTA) */}
      {/* ============================================================== */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0c2f33] text-white flex flex-col justify-between border-r border-emerald-950 shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Cabeçalho da Sidebar */}
        <div className="flex flex-col">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shadow-inner">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-base tracking-tight text-white leading-tight">
                  Painel Admin
                </h2>
                <span className="text-[11px] text-amber-300 font-medium">
                  Vila de Santa Marina
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 lg:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status do Firestore */}
          <div className="mx-4 my-3 px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/40 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="flex flex-col text-[11px]">
              <span className="font-semibold text-emerald-200">Banco de Dados Ativo</span>
              <span className="text-emerald-400/80 text-[10px]">Firestore sincronizado em tempo real</span>
            </div>
          </div>

          {/* Menu de Navegação da Sidebar */}
          <div className="px-3 py-2">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gerenciar Conteúdo
            </div>
            <nav className="space-y-1 mt-1">
              {navigationItems.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-white text-[#0c2f33] font-bold shadow-md shadow-black/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-[#157347]' : 'text-amber-300/80 group-hover:text-amber-300'
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold leading-tight">{item.label}</span>
                        <span className={`text-[10px] ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    {isActive ? (
                      <ChevronRight className="w-4 h-4 text-[#157347]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/50" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Rodapé da Sidebar */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#092427]">
          {/* Botão de Exportação para Hostinger */}
          <button
            type="button"
            onClick={() => {
              setIsPhpModalOpen(true);
              setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left bg-gradient-to-r from-amber-500/20 to-amber-600/30 border border-amber-400/40 text-amber-200 hover:text-white hover:bg-amber-500/30 transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <Server className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">Subir para Hostinger</span>
                <span className="text-[10px] text-amber-300/80">Arquivos PHP + MySQL</span>
              </div>
            </div>
            <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded">.ZIP</span>
          </button>

          <button
            type="button"
            onClick={onBackToSite}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Site da Pousada</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[11px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Valores Padrão</span>
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Barra Superior de Ações */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer"
              aria-label="Abrir Menu Lateral"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                {navigationItems.find((n) => n.id === activeTab)?.label}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Edite os campos abaixo. As alterações são sincronizadas no Firestore.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsPhpModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl transition-all shadow-xs cursor-pointer border border-amber-300"
              title="Exportar arquivos PHP e banco MySQL para a Hostinger"
            >
              <Server className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar para Hostinger (PHP / SQL)</span>
              <span className="sm:hidden">Hostinger</span>
            </button>

            <button
              type="button"
              onClick={onBackToSite}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Visualizar o site da pousada"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Ver Site</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave()}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
            </button>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="p-4 sm:p-8 max-w-5xl w-full mx-auto flex-1">
          {/* Alerta de Feedback */}
          {statusMessage && (
            <div className={`mb-6 p-4 rounded-2xl text-sm flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                : 'bg-red-50 text-red-900 border border-red-200'
            }`}>
              <div className="flex items-center gap-2.5">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                )}
                <span className="font-semibold">{statusMessage.text}</span>
              </div>
              <button
                onClick={() => setStatusMessage(null)}
                className="text-xs underline text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Dispensar
              </button>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <form onSubmit={(e) => handleSave(e)} className="space-y-6">

              {/* ============================================================== */}
              {/* ABA 0: NOVO SISTEMA DE MENUS & PÁGINAS (MOSTRAR / NÃO MOSTRAR / HOME) */}
              {/* ============================================================== */}
              {activeTab === 'menus' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-bold font-serif text-[#0c2f33] flex items-center gap-2">
                        <Compass className="w-5 h-5 text-[#157347]" />
                        <span>Gerenciador de Menus e Páginas</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Controle quais páginas e links aparecem na barra de menu superior. Você pode <strong>Editar</strong>, <strong>Mostrar/Ocultar</strong>, alterar a ordem ou <strong>definir qual é a Página Principal (Home)</strong>.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenAddMenuModal}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Criar Nova Página / Menu</span>
                    </button>
                  </div>

                  {/* Prévia Visual da Barra de Menus Atual no Topo */}
                  <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Pré-visualização da Barra Superior do Site:
                    </span>
                    <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-5">
                      {currentMenus
                        .filter((m) => m.visible)
                        .map((menu) => (
                          <div 
                            key={menu.id} 
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0c2f33]"
                          >
                            {menu.isHome && <Home className="w-3.5 h-3.5 text-amber-500" />}
                            <span>{menu.label}</span>
                            {menu.isHome && (
                              <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold uppercase">
                                Home
                              </span>
                            )}
                          </div>
                        ))}
                      {currentMenus.filter((m) => m.visible).length === 0 && (
                        <span className="text-xs text-slate-400 italic">
                          Nenhum menu visível no momento.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Páginas Especiais de Temporada (Sub-Páginas Criadas no Dashboard) */}
                  <div className="bg-gradient-to-r from-[#0c2f33] to-[#124d45] text-white p-5 rounded-2xl shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Páginas de Temporada Disponíveis</span>
                        </div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                          Páginas Exclusivas dos Períodos Especiais
                        </h3>
                        <p className="text-xs text-slate-200">
                          Estas páginas contam com estrutura completa idêntica à Home: pacotes exclusivos, chalés, área de lazer, banner WhatsApp e localização no mapa.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {/* Card 1: Réveillon */}
                      <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/15 flex flex-col justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                            <h4 className="font-bold text-sm text-white">Fim de Ano & Réveillon</h4>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-tight">
                            Pacotes de virada de ano, queima de fogos e celebração em família.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePreviewSubPage('fim-de-ano', '#fim-de-ano')}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Página Réveillon</span>
                        </button>
                      </div>

                      {/* Card 2: Carnaval */}
                      <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/15 flex flex-col justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <PartyPopper className="w-4 h-4 text-purple-300 shrink-0" />
                            <h4 className="font-bold text-sm text-white">Carnaval 2026</h4>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-tight">
                            Pacotes de 4 ou 5 noites para curtir o Carnaval com descanso e piscina.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePreviewSubPage('carnaval', '#carnaval')}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Página Carnaval</span>
                        </button>
                      </div>

                      {/* Card 3: Verão & Férias */}
                      <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/15 flex flex-col justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <SunMedium className="w-4 h-4 text-amber-300 shrink-0" />
                            <h4 className="font-bold text-sm text-white">Verão & Férias</h4>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-tight">
                            Diárias e pacotes para alta temporada de sol e praias em Caraguá.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePreviewSubPage('verao', '#alta-temporada-verao')}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Página Verão</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lista de Itens de Menu / Páginas */}
                  <div className="space-y-3">
                    {currentMenus.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            !item.visible 
                              ? 'bg-slate-50/80 border-dashed border-slate-300 opacity-60' 
                              : item.isHome
                                ? 'bg-amber-50/40 border-amber-300/80 shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {/* Informações do Menu */}
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Botões de Mover Ordem */}
                              <div className="flex flex-col gap-1 shrink-0">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleMoveMenuOrder(index, 'up')}
                                  title="Mover para esquerda/cima"
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={index === currentMenus.length - 1}
                                  onClick={() => handleMoveMenuOrder(index, 'down')}
                                  title="Mover para direita/baixo"
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="w-10 h-10 rounded-xl bg-[#0c2f33]/10 text-[#0c2f33] flex items-center justify-center shrink-0">
                                {item.isHome ? (
                                  <Home className="w-5 h-5 text-amber-600" />
                                ) : (
                                  <FileText className="w-5 h-5 text-[#157347]" />
                                )}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm text-slate-900 truncate">
                                    {item.label}
                                  </h4>
                                  {item.isHome && (
                                    <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                      <Home className="w-3 h-3" />
                                      Página Principal (Home)
                                    </span>
                                  )}
                                  {item.subItems && item.subItems.length > 0 && (
                                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                                      {item.subItems.length} Submenus: {item.subItems.map(s => s.label).join(', ')}
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                                  <LinkIcon className="w-3 h-3 text-slate-400" />
                                  {item.href}
                                </span>
                              </div>
                            </div>

                            {/* Ações: Mostrar/Não Mostrar, Definir Home, Editar, Excluir */}
                            <div className="flex items-center flex-wrap gap-2 shrink-0 self-end sm:self-center">
                              {/* Botão Definir como Home */}
                              {!item.isHome ? (
                                <button
                                  type="button"
                                  onClick={() => handleSetAsHome(item.id)}
                                  className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                                  title="Definir esta página como Página Principal (Home)"
                                >
                                  <Home className="w-3.5 h-3.5 text-amber-700" />
                                  <span>Definir como Home</span>
                                </button>
                              ) : (
                                <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5 border border-amber-200">
                                  <Check className="w-3.5 h-3.5 text-amber-700" />
                                  <span>É a Home</span>
                                </span>
                              )}

                              {/* Botão MOSTRAR / NÃO MOSTRAR */}
                              <button
                                type="button"
                                onClick={() => handleToggleMenuVisibility(item.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                                  item.visible
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    : 'bg-slate-300 hover:bg-slate-400 text-slate-700'
                                }`}
                                title={item.visible ? 'Clique para ocultar este menu no site' : 'Clique para mostrar este menu no site'}
                              >
                                <Power className="w-3.5 h-3.5" />
                                <span>{item.visible ? 'Mostrando' : 'Oculto'}</span>
                              </button>

                              {/* Botão Editar */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditMenuModal(item)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                                title="Editar nome ou link da página"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Botão Excluir */}
                              {!item.isHome && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMenuItem(item.id)}
                                  className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                                  title="Excluir página / menu"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Sub-Páginas Vinculadas (Submenus suspensos com botões de Ver Página, Mostrar/Ocultar e Editar) */}
                          {item.subItems && item.subItems.length > 0 && (
                            <div className="mt-3.5 pt-3.5 border-t border-slate-200/90 pl-2 sm:pl-6 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                  Sub-Páginas do Menu {item.label}:
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleOpenAddSubItem(item.id)}
                                  className="text-[11px] font-bold text-[#157347] hover:text-[#115e3a] flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors shadow-2xs"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Adicionar Sub-Página</span>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 gap-2">
                                {item.subItems.map((sub) => {
                                  const isFim = sub.id === 'fim-de-ano' || sub.id === 'final-do-ano';
                                  const isCarnaval = sub.id === 'carnaval';
                                  const isVerao = sub.id === 'alta-temporada-verao' || sub.id === 'verao';

                                  return (
                                    <div
                                      key={sub.id}
                                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                                        sub.visible !== false
                                          ? 'bg-slate-50/90 border-slate-200 hover:border-slate-300'
                                          : 'bg-slate-100/60 border-slate-200/70 opacity-60'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <span className="text-slate-300 font-mono text-xs select-none">└─</span>
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                                          {isFim && <Sparkles className="w-4 h-4 text-amber-500" />}
                                          {isCarnaval && <PartyPopper className="w-4 h-4 text-purple-600" />}
                                          {isVerao && <SunMedium className="w-4 h-4 text-amber-500" />}
                                          {!isFim && !isCarnaval && !isVerao && <FileText className="w-4 h-4 text-slate-500" />}
                                        </div>
                                        <div className="min-w-0">
                                          <div className="flex items-center gap-2">
                                            <h5 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                                              {sub.label}
                                            </h5>
                                            <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200/70">
                                              {sub.href}
                                            </span>
                                          </div>
                                          <p className="text-[11px] text-slate-500 line-clamp-1">
                                            {isFim && 'Página exclusiva de Réveillon / Pacotes de Virada de Ano'}
                                            {isCarnaval && 'Página exclusiva de Carnaval / Feriado e Festas'}
                                            {isVerao && 'Página exclusiva de Verão & Férias / Alta Temporada'}
                                            {!isFim && !isCarnaval && !isVerao && 'Sub-página do site'}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Ações da Sub-página */}
                                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                        {/* Botão Ver Página */}
                                        <button
                                          type="button"
                                          onClick={() => handlePreviewSubPage(sub.id, sub.href)}
                                          className="px-2.5 py-1.5 rounded-lg bg-[#0c2f33] hover:bg-[#157347] text-white text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                                          title="Visualizar esta sub-página no site"
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                          <span>Ver Página</span>
                                        </button>

                                        {/* Botão Mostrar / Ocultar Sub-página */}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleSubItemVisibility(item.id, sub.id)}
                                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                                            sub.visible !== false
                                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                              : 'bg-slate-300 hover:bg-slate-400 text-slate-700'
                                          }`}
                                          title={sub.visible !== false ? 'Ocultar esta sub-página' : 'Mostrar esta sub-página'}
                                        >
                                          <Power className="w-3 h-3" />
                                          <span>{sub.visible !== false ? 'Mostrando' : 'Oculto'}</span>
                                        </button>

                                        {/* Botão Editar Sub-página */}
                                        <button
                                          type="button"
                                          onClick={() => handleOpenEditSubItem(item.id, sub)}
                                          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                                          title="Editar nome ou link desta sub-página"
                                        >
                                          <Edit2 className="w-3.5 h-3.5" />
                                        </button>

                                        {/* Botão Excluir Sub-página */}
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteSubItem(item.id, sub.id)}
                                          className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer"
                                          title="Excluir sub-página"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* ABA 1: Hero Principal (COM BOTÃO DE ADICIONAR FOTO DO PC) */}
              {/* ============================================================== */}
              {activeTab === 'hero' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#0c2f33]">
                      Configurações da Imagem da Hero e Textos
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Você pode <strong>enviar uma foto direto do seu computador</strong> ou colar uma URL de imagem.
                    </p>
                  </div>

                  {/* Campo da Imagem da Hero com Botão Adicionar do PC */}
                  <div className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        URL DA IMAGEM DE FUNDO ATIVA
                      </label>
                      <span className="text-[11px] text-slate-500">
                        PNG, JPG, WEBP suportados
                      </span>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap gap-2">
                      <input
                        type="text"
                        value={form.heroImage.startsWith('data:') ? 'Foto enviada do computador (Armazenada localmente)' : form.heroImage}
                        onChange={(e) => handleChange('heroImage', e.target.value)}
                        placeholder="https://images.unsplash.com/... ou escolha um arquivo do PC ao lado"
                        className="flex-1 px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347] font-mono text-xs shadow-xs"
                      />

                      <button
                        type="button"
                        onClick={() => heroFileInputRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white text-xs font-bold flex items-center gap-2 shrink-0 shadow-sm transition-all cursor-pointer"
                        title="Escolha uma imagem armazenada no seu computador"
                      >
                        <FolderOpen className="w-4 h-4" />
                        <span>Adicionar Foto do PC</span>
                      </button>

                      {!form.heroImage.startsWith('data:') && form.heroImage && (
                        <a
                          href={form.heroImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs flex items-center gap-1.5 shrink-0 font-semibold shadow-xs"
                          title="Abrir imagem em nova aba"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Abrir Imagem</span>
                        </a>
                      )}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Dica: Fotos panorâmicas na horizontal (16:9 ou 1920x1080) ficam perfeitas na Hero.</span>
                      {form.heroImage.startsWith('data:') && (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Foto do PC aplicada
                        </span>
                      )}
                    </div>

                    {/* Pré-visualização Limpa sem botões sobrepostos */}
                    {form.heroImage && (
                      <div className="mt-4 relative h-56 sm:h-72 rounded-2xl overflow-hidden border border-slate-300 bg-slate-200 shadow-inner group">
                        <img 
                          src={form.heroImage} 
                          alt="Prévia Hero" 
                          className="w-full h-full object-cover transition-all duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = POUSADA_IMAGES.hero;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-5 sm:p-6">
                          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-300 mb-1">
                            {form.heroBadge || 'CARAGUATATUBA TE ESPERA'}
                          </span>
                          <h4 className="text-white text-lg sm:text-2xl font-serif font-bold drop-shadow-sm leading-tight">
                            {form.heroTitleLine1 || 'Título da Hero'}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2 max-w-2xl">
                            {form.heroSubtitle}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Kicker e Nome Oficial */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        KICKER / TAGLINE SUPERIOR (DOURADO)
                      </label>
                      <input
                        type="text"
                        value={form.heroBadge}
                        onChange={(e) => handleChange('heroBadge', e.target.value)}
                        placeholder="CARAGUATATUBA TE ESPERA"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        NOME OFICIAL DA POUSADA
                      </label>
                      <input
                        type="text"
                        value={form.pousadaName}
                        onChange={(e) => handleChange('pousadaName', e.target.value)}
                        placeholder="Pousada Vila de Santa Marina"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                      />
                    </div>
                  </div>

                  {/* Título Principal */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      TÍTULO PRINCIPAL DA HERO
                    </label>
                    <input
                      type="text"
                      value={form.heroTitleLine1}
                      onChange={(e) => handleChange('heroTitleLine1', e.target.value)}
                      placeholder="Fique perto do mar com o conforto que você merece"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                    />
                  </div>

                  {/* Subtítulo */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      TEXTO DESCRITIVO DA HERO
                    </label>
                    <textarea
                      rows={3}
                      value={form.heroSubtitle}
                      onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                    />
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* ABA 2: Presets & Galeria */}
              {/* ============================================================== */}
              {activeTab === 'presets' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-bold font-serif text-[#0c2f33]">
                        Galeria de Fotos da Hero
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Clique em uma foto para aplicar na Hero. Use os botões em cada cartão para <strong>Editar</strong>, <strong>Ativar/Desativar</strong> ou <strong>Adicionar fotos do PC</strong>.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenAddModal}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Mais Foto</span>
                    </button>
                  </div>

                  {/* Grid de Cards de Fotos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {presetsList.map((preset) => {
                      const isCurrentHeroActive = form.heroImage === preset.url;
                      const isVisible = preset.active;

                      return (
                        <div
                          key={preset.id}
                          onClick={() => {
                            if (isVisible) {
                              const updatedForm = { ...form, heroImage: preset.url };
                              setForm(updatedForm);
                              handleSave(undefined, updatedForm);
                              setStatusMessage({ 
                                type: 'success', 
                                text: `Foto "${preset.name}" aplicada como Hero da Home com sucesso!` 
                              });
                            }
                          }}
                          className={`group relative rounded-2xl overflow-hidden border-2 transition-all flex flex-col justify-between ${
                            !isVisible
                              ? 'opacity-60 border-dashed border-slate-300 bg-slate-50'
                              : isCurrentHeroActive 
                                ? 'border-[#157347] ring-4 ring-[#157347]/20 shadow-md bg-emerald-50/20' 
                                : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm'
                          } ${isVisible ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                          <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className={`w-full h-full object-cover transition-transform duration-300 ${
                                isVisible ? 'group-hover:scale-105' : 'grayscale-50'
                              }`}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = POUSADA_IMAGES.hero;
                              }}
                            />

                            {/* Badge de Ativa na Hero Atual */}
                            {isCurrentHeroActive && (
                              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#157347] text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 z-10">
                                <Check className="w-3.5 h-3.5" />
                                <span>Hero Ativa</span>
                              </div>
                            )}

                            {!isVisible && (
                              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-800/85 text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 z-10 backdrop-blur-xs">
                                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                                <span>Desativada</span>
                              </div>
                            )}

                            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                              <button
                                type="button"
                                onClick={(e) => handleToggleActivePreset(preset.id, e)}
                                title={isVisible ? 'Desativar esta foto' : 'Ativar esta foto'}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shadow-md cursor-pointer ${
                                  isVisible 
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                                }`}
                              >
                                <Power className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={(e) => handleOpenEditModal(preset, e)}
                                title="Editar título ou trocar foto"
                                className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all shadow-md cursor-pointer backdrop-blur-xs"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={(e) => handleDeletePreset(preset.id, e)}
                                title="Excluir foto"
                                className="w-8 h-8 rounded-lg bg-white/90 hover:bg-red-50 text-slate-700 hover:text-red-600 flex items-center justify-center transition-all shadow-md cursor-pointer backdrop-blur-xs"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="p-3.5 flex items-center justify-between gap-2 border-t border-slate-100">
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-slate-800 truncate block">
                                {preset.name}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {isVisible ? 'Disponível para seleção' : 'Oculta da galeria'}
                              </span>
                            </div>

                            {isCurrentHeroActive ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-[#157347] shrink-0 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                                <Check className="w-3 h-3" />
                                Em uso
                              </span>
                            ) : isVisible ? (
                              <span className="text-[11px] font-semibold text-slate-500 group-hover:text-[#157347] shrink-0 transition-colors">
                                Escolher &rarr;
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* ABA 3: Banners e Coqueiros */}
              {/* ============================================================== */}
              {activeTab === 'images' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#0c2f33]">
                      Banners Panorâmicos e Coqueiros de Fundo
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Gerencie a imagem dos coqueiros laterais e a paisagem tropical do banner de conversão.
                    </p>
                  </div>

                  {/* Coqueiros */}
                  <div className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        IMAGEM DOS COQUEIROS DE FUNDO (SEÇÃO "A POUSADA")
                      </label>
                      <button
                        type="button"
                        onClick={() => palmFileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                      >
                        <FolderOpen className="w-3.5 h-3.5 text-[#157347]" />
                        <span>Carregar do PC</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={form.bgPalmBanner.startsWith('data:') ? 'Foto do computador carregada' : form.bgPalmBanner}
                      onChange={(e) => handleChange('bgPalmBanner', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347] font-mono text-xs shadow-xs"
                    />
                    {form.bgPalmBanner && (
                      <div className="h-36 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                        <img src={form.bgPalmBanner} alt="Coqueiros" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Banner CTA */}
                  <div className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        IMAGEM DA PRAIA (BANNER CTA INFERIOR)
                      </label>
                      <button
                        type="button"
                        onClick={() => ctaFileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                      >
                        <FolderOpen className="w-3.5 h-3.5 text-[#157347]" />
                        <span>Carregar do PC</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      value={form.ctaBannerImage.startsWith('data:') ? 'Foto do computador carregada' : form.ctaBannerImage}
                      onChange={(e) => handleChange('ctaBannerImage', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347] font-mono text-xs shadow-xs"
                    />
                    {form.ctaBannerImage && (
                      <div className="h-36 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                        <img src={form.ctaBannerImage} alt="Banner CTA" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* ABA 4: WhatsApp e Contatos */}
              {/* ============================================================== */}
              {activeTab === 'contact' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#0c2f33]">
                      Canais de Atendimento e Contato
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Configure o número oficial do WhatsApp, o endereço e as mensagens pré-configuradas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Telefone Formatado (Exibição)
                      </label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(12) 99763-7182"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        WhatsApp Oficial (somente dígitos com DDD 55)
                      </label>
                      <input
                        type="text"
                        value={form.phoneClean}
                        onChange={(e) => handleChange('phoneClean', e.target.value)}
                        placeholder="5512997637182"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347] font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Mensagem Padrão do WhatsApp
                    </label>
                    <textarea
                      rows={2}
                      value={form.whatsappMessage}
                      onChange={(e) => handleChange('whatsappMessage', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Endereço Completo
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Instagram Oficial
                    </label>
                    <input
                      type="text"
                      value={form.instagram}
                      onChange={(e) => handleChange('instagram', e.target.value)}
                      placeholder="@viladesantamarinapousada"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                    />
                  </div>
                </div>
              )}

              {/* Botões Inferiores */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onBackToSite}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Voltar para o site
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Salvando no Banco...' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL PARA CRIAR / EDITAR ITEM DE MENU & PÁGINA */}
      {/* ============================================================== */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4.5 bg-[#0c2f33] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base font-serif">
                  {editingMenuItem ? 'Editar Menu / Página' : 'Criar Novo Menu / Página'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMenuModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nome do Menu (Texto Visível)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Passeios de Barco, Réveillon, Tarifas..."
                  value={menuForm.label}
                  onChange={(e) => setMenuForm({ ...menuForm, label: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Link de Destino / Seção (Âncora ou URL)
                </label>
                <input
                  type="text"
                  placeholder="#inicio, #acomodacoes ou https://..."
                  value={menuForm.href}
                  onChange={(e) => setMenuForm({ ...menuForm, href: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347] font-mono text-xs"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Deixe vazio para gerar automaticamente o link da seção.
                </span>
              </div>

              {/* Opção: MOSTRAR / NÃO MOSTRAR */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Exibição no Menu</span>
                  <span className="text-[11px] text-slate-500">
                    {menuForm.visible ? 'Visível na barra superior' : 'Oculto da navegação'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuForm({ ...menuForm, visible: !menuForm.visible })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    menuForm.visible 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{menuForm.visible ? 'Mostrar' : 'Não Mostrar'}</span>
                </button>
              </div>

              {/* Opção: DEFINIR COMO PÁGINA PRINCIPAL (HOME) */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-950 block">Página Principal da Home</span>
                  <span className="text-[11px] text-amber-800/80">
                    Define este item como o link oficial da Home
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuForm({ ...menuForm, isHome: !menuForm.isHome })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    menuForm.isHome 
                      ? 'bg-amber-600 text-white shadow-xs' 
                      : 'bg-white text-slate-600 border border-slate-300'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{menuForm.isHome ? 'É a Home' : 'Tornar Home'}</span>
                </button>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingMenuItem ? 'Salvar Menu' : 'Adicionar ao Menu'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL PARA ADICIONAR OU EDITAR UMA SUB-PÁGINA (SUBMENU) */}
      {/* ============================================================== */}
      {isSubItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4.5 bg-[#0c2f33] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base font-serif">
                  {editingSubItem ? 'Editar Sub-Página' : 'Adicionar Nova Sub-Página'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSubItemModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubItemModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nome da Sub-Página
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fim de Ano, Carnaval, Verão & Férias..."
                  value={subItemForm.label}
                  onChange={(e) => setSubItemForm({ ...subItemForm, label: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Link de Destino (#âncora ou url)
                </label>
                <input
                  type="text"
                  placeholder="#fim-de-ano, #carnaval, #alta-temporada-verao..."
                  value={subItemForm.href}
                  onChange={(e) => setSubItemForm({ ...subItemForm, href: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347] font-mono text-xs"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Deixe em branco para gerar link automaticamente.
                </span>
              </div>

              {/* Opção: MOSTRAR / NÃO MOSTRAR */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Exibição no Menu Suspenso</span>
                  <span className="text-[11px] text-slate-500">
                    {subItemForm.visible ? 'Visível no dropdown do menu' : 'Oculto da navegação'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubItemForm({ ...subItemForm, visible: !subItemForm.visible })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    subItemForm.visible 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{subItemForm.visible ? 'Mostrar' : 'Não Mostrar'}</span>
                </button>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubItemModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingSubItem ? 'Salvar Sub-Página' : 'Adicionar Sub-Página'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL PARA ADICIONAR OU EDITAR UMA FOTO DA GALERIA */}
      {/* ============================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <input
            ref={presetModalFileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePresetModalFileUpload}
            className="hidden"
          />

          <div 
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4.5 bg-[#0c2f33] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base font-serif">
                  {editingPreset ? 'Editar Foto da Galeria' : 'Adicionar Nova Foto para a Hero'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePresetModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Título / Nome da Foto
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Piscina Noturna com Iluminação"
                  value={presetForm.name}
                  onChange={(e) => setPresetForm({ ...presetForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Foto da Imagem
                  </label>
                  <button
                    type="button"
                    onClick={() => presetModalFileInputRef.current?.click()}
                    className="text-xs text-[#157347] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Escolher arquivo do PC</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://... ou clique no botão ao lado para carregar do PC"
                    value={presetForm.url.startsWith('data:') ? 'Foto selecionada do computador' : presetForm.url}
                    onChange={(e) => setPresetForm({ ...presetForm, url: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#157347] font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => presetModalFileInputRef.current?.click()}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 border border-slate-300 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload PC</span>
                  </button>
                </div>
              </div>

              {/* Prévia da Foto */}
              {presetForm.url && (
                <div className="h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={presetForm.url}
                    alt="Prévia"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = POUSADA_IMAGES.hero;
                    }}
                  />
                </div>
              )}

              {/* Status Ativa / Inativa */}
              <div className="pt-2 flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Status da Foto</span>
                  <span className="text-[11px] text-slate-500">
                    {presetForm.active ? 'Visível na lista de seleção' : 'Oculta / Desativada'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPresetForm({ ...presetForm, active: !presetForm.active })}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    presetForm.active 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{presetForm.active ? 'Ativa' : 'Desativada'}</span>
                </button>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingPreset ? 'Salvar Edição' : 'Adicionar Foto'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Exportação PHP / MySQL para Hostinger */}
      <PhpExportModal
        isOpen={isPhpModalOpen}
        onClose={() => setIsPhpModalOpen(false)}
        settings={form}
      />
    </div>
  );
};
