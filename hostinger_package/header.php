<?php
require_once __DIR__ . '/config.php';
$configs = getConfiguracoes();
$menus = getMenusComSubmenus();
$linkWhatsApp = getLinkWhatsApp();
$paginaAtual = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($configs['nome_pousada']) ?> | Caraguatatuba - SP</title>
    <meta name="description" content="Chalés completos com cozinha, piscina, ar-condicionado e área gourmet em Caraguatatuba no Litoral Norte de São Paulo.">
    
    <!-- Fontes Google Playfair & Plus Jakarta -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN para renderização moderna e rápida -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0c2f33',
                        accent: '#157347',
                        gold: '#b48a3c',
                    },
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                        serif: ['"Playfair Display"', 'serif'],
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="bg-white text-slate-800 antialiased selection:bg-[#157347] selection:text-white">

    <?php if (getDbConnection() === null): ?>
    <!-- Alerta amigável de primeira instalação na Hostinger -->
    <div class="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold text-center border-b border-amber-600">
        📢 <strong>Aviso Hostinger:</strong> Conecte seu banco de dados MySQL editando o arquivo <code>config.php</code> com os dados do hPanel para ativar a edição completa via painel administrativo!
    </div>
    <?php endif; ?>

    <!-- Topo / Navbar com Submenus Dinâmicos -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            
            <!-- Logotipo Oficial da Pousada -->
            <a href="index.php" class="flex items-center gap-2.5 group">
                <div class="w-10 h-10 rounded-xl bg-[#0c2f33] text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm">
                    🌴
                </div>
                <div class="leading-none">
                    <span class="block text-[9.5px] font-bold tracking-[0.2em] text-slate-400 uppercase">POUSADA</span>
                    <span class="font-serif text-lg sm:text-xl font-bold text-[#0c2f33] group-hover:text-[#157347] transition-colors">
                        <?= htmlspecialchars($configs['nome_pousada']) ?>
                    </span>
                    <span class="block text-[8.5px] font-bold tracking-[0.22em] text-[#b48a3c] uppercase mt-0.5">
                        CARAGUATATUBA &middot; SP
                    </span>
                </div>
            </a>

            <!-- Menus Desktop com Dropdown Hover para Temporada -->
            <nav class="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-slate-600">
                <?php foreach ($menus as $m): ?>
                    <?php $temSub = !empty($m['subItems']); ?>
                    <?php if ($temSub): ?>
                        <div class="relative group py-2">
                            <button class="flex items-center gap-1 hover:text-[#0c2f33] font-semibold text-slate-700 transition-colors cursor-pointer">
                                <span><?= htmlspecialchars($m['label']) ?></span>
                                <svg class="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <!-- Menu Suspenso (Dropdown) -->
                            <div class="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all animate-in fade-in">
                                <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                                    Períodos Especiais
                                </div>
                                <?php foreach ($m['subItems'] as $sub): ?>
                                    <a href="<?= htmlspecialchars($sub['href']) ?>" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#0c2f33] hover:bg-slate-50 transition-colors">
                                        <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                                        <span><?= htmlspecialchars($sub['label']) ?></span>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php else: ?>
                        <a href="<?= htmlspecialchars($m['href']) ?>" class="hover:text-[#0c2f33] transition-colors">
                            <?= htmlspecialchars($m['label']) ?>
                        </a>
                    <?php endif; ?>
                <?php endforeach; ?>
            </nav>

            <!-- Botões Direita: Painel Admin + WhatsApp -->
            <div class="flex items-center gap-2.5">
                <a href="admin.php" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all" title="Acessar Painel Hostinger">
                    ⚙️ <span>Painel</span>
                </a>

                <a href="<?= $linkWhatsApp ?>" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all">
                    <span>💬</span>
                    <span>Reservar no WhatsApp</span>
                </a>
            </div>
        </div>
    </header>
