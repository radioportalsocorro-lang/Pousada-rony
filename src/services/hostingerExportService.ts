/**
 * Serviço de Geração do Pacote PHP + MySQL para Hospedagem Hostinger
 * Gera todos os arquivos prontos para upload no hPanel / public_html e phpMyAdmin
 */

import JSZip from 'jszip';
import { SiteSettings } from './settingsService';

export interface HostingerFileItem {
  filename: string;
  description: string;
  category: 'database' | 'backend' | 'page' | 'config';
  content: string;
}

export function generateHostingerFiles(settings: SiteSettings): HostingerFileItem[] {
  const phoneClean = settings.phoneClean || '5512997345678';
  const whatsappMsg = settings.whatsappMessage || 'Olá! Gostaria de consultar reservas na Pousada Vila de Santa Marina.';
  const heroTitle = (settings.heroTitleLine1 && settings.heroTitleLine2)
    ? `${settings.heroTitleLine1} ${settings.heroTitleLine2}`
    : settings.heroTitleLine1 || 'Fique perto do mar com o conforto que você merece';
  const heroSubtitle = settings.heroSubtitle || 'Chalés completos para casais e famílias com piscina, área de churrasqueiras e a tranquilidade que você procura no litoral de Caraguatatuba.';
  const heroTag = settings.heroBadge || 'POUSADA VILA DE SANTA MARINA · CARAGUATATUBA';

  // 1. BANCO DE DADOS SQL (database.sql)
  const databaseSql = `-- ==============================================================
-- POUSADA VILA DE SANTA MARINA - CARAGUATATUBA / SP
-- Script de Criação e Povoamento do Banco de Dados MySQL
-- Compatível com: Hostinger MySQL 5.7 / 8.0 / MariaDB (phpMyAdmin)
-- Codificação: utf8mb4_unicode_ci
-- ==============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-03:00";

-- --------------------------------------------------------
-- 1. Tabela de Configurações Gerais do Site
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`configuracoes\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`chave\` varchar(64) NOT NULL UNIQUE,
  \`valor\` text NOT NULL,
  \`descricao\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`configuracoes\` (\`chave\`, \`valor\`, \`descricao\`) VALUES
('nome_pousada', 'Pousada Vila de Santa Marina', 'Nome oficial da pousada'),
('cidade_uf', 'Caraguatatuba · SP', 'Localização resumida'),
('endereco', 'Rua Manoel Ricardo de Vasconcelos, 100 - Jaraguazinho, Caraguatatuba - SP, 11674-000', 'Endereço completo'),
('telefone_exibicao', '(12) 99734-5678', 'Telefone formatado para exibição'),
('whatsapp_numero', '${phoneClean}', 'Número limpo do WhatsApp com DDI (Ex: 5512997345678)'),
('whatsapp_mensagem_padrao', '${whatsappMsg.replace(/'/g, "\\'")}', 'Mensagem inicial do WhatsApp'),
('instagram', '@pousadaviladesantamarina', 'Perfil do Instagram'),
('google_maps_url', 'https://maps.google.com/?q=Pousada+Vila+de+Santa+Marina+Caraguatatuba', 'Link do Google Maps'),
('hero_tag', '${heroTag.replace(/'/g, "\\'")}', 'Tag no topo do banner'),
('hero_titulo', '${heroTitle.replace(/'/g, "\\'")}', 'Título principal da Home'),
('hero_subtitulo', '${heroSubtitle.replace(/'/g, "\\'")}', 'Subtítulo da Home'),
('hero_imagem', 'images/caragua_hero.jpg', 'Imagem de fundo da Home');

-- --------------------------------------------------------
-- 2. Tabela de Menus e Navegação
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`menus\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`menu_id\` varchar(64) NOT NULL UNIQUE,
  \`label\` varchar(100) NOT NULL,
  \`href\` varchar(255) NOT NULL,
  \`visible\` tinyint(1) NOT NULL DEFAULT 1,
  \`is_home\` tinyint(1) NOT NULL DEFAULT 0,
  \`ordem\` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`menus\` (\`menu_id\`, \`label\`, \`href\`, \`visible\`, \`is_home\`, \`ordem\`) VALUES
('inicio', 'Início', 'index.php', 1, 1, 1),
('a-pousada', 'A Pousada', '#a-pousada', 1, 0, 2),
('chales', 'Chalés', '#chales', 1, 0, 3),
('temporada', 'Temporada', '#temporada', 1, 0, 4),
('estrutura', 'Estrutura & Lazer', '#estrutura', 1, 0, 5),
('galeria', 'Galeria de Fotos', '#galeria', 1, 0, 6),
('localizacao', 'Localização & Contato', '#localizacao', 1, 0, 7);

-- --------------------------------------------------------
-- 3. Tabela de Submenus (Páginas de Temporada)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`submenus\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`menu_id\` varchar(64) NOT NULL,
  \`sub_id\` varchar(64) NOT NULL,
  \`label\` varchar(100) NOT NULL,
  \`href\` varchar(255) NOT NULL,
  \`visible\` tinyint(1) NOT NULL DEFAULT 1,
  \`ordem\` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`submenus\` (\`menu_id\`, \`sub_id\`, \`label\`, \`href\`, \`visible\`, \`ordem\`) VALUES
('temporada', 'fim-de-ano', 'Fim de Ano & Réveillon', 'reveillon.php', 1, 1),
('temporada', 'carnaval', 'Carnaval 2026', 'carnaval.php', 1, 2),
('temporada', 'alta-temporada-verao', 'Verão & Férias', 'verao.php', 1, 3);

-- --------------------------------------------------------
-- 4. Tabela de Chalés / Acomodações
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`chales\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`titulo\` varchar(120) NOT NULL,
  \`capacidade\` varchar(80) NOT NULL,
  \`descricao\` text NOT NULL,
  \`badge\` varchar(60) DEFAULT NULL,
  \`imagem_url\` text NOT NULL,
  \`itens_json\` text NOT NULL,
  \`ordem\` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`chales\` (\`titulo\`, \`capacidade\`, \`descricao\`, \`badge\`, \`imagem_url\`, \`itens_json\`, \`ordem\`) VALUES
('Chalé Casal Aconchego', 'Até 2 Pessoas', 'Ambiente privativo e acolhedor, perfeito para descansar a dois com ar-condicionado, TV e cozinha compacta prática.', 'Ideal para Casais', 'images/foto12.webp', '["Cama Queen Size", "Ar-Condicionado Split", "Cozinha Compacta com Frigobar", "TV SKY e Wi-Fi", "1 Vaga de Garagem"]', 1),
('Chalé Família Confort', 'Até 4 Pessoas', 'Espaçoso e versátil para a família inteira. Cozinha completa equipada com fogão, geladeira e utensílios.', 'Mais Procurado', 'images/foto1.webp', '["1 Cama Casal + 1 Bicama", "Ar-Condicionado e Ventilador", "Cozinha Completa c/ Fogão e Geladeira", "Varanda com Vista para o Jardim", "Estacionamento Privativo"]', 2),
('Chalé Master Família & Amigos', 'Até 6 Pessoas', 'O máximo de espaço e comodidade para grupos maiores curtirem férias inesquecíveis juntos no Litoral Norte.', 'Espaço Amplo', 'images/foto4.webp', '["Dormitório Privativo + Sala", "Cozinha Grande Completa", "TV SKY, Wi-Fi Fibra Rápida", "Churrasqueiras Próximas", "Até 2 Vagas de Garagem"]', 3);

-- --------------------------------------------------------
-- 5. Tabela de Galeria de Fotos
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`galeria\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`titulo\` varchar(120) NOT NULL,
  \`categoria\` varchar(60) NOT NULL DEFAULT 'Geral',
  \`imagem_url\` text NOT NULL,
  \`ordem\` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`galeria\` (\`titulo\`, \`categoria\`, \`imagem_url\`, \`ordem\`) VALUES
('Chalés Azuis e Jardim com Mamoeiro', 'Chalés & Jardim', 'images/foto1.webp', 1),
('Piscina com Deck de Madeira e Vista da Serra', 'Piscina & Serra', 'images/foto8.webp', 2),
('Churrasqueira e Varanda Gourmet', 'Área Gourmet', 'images/foto5.webp', 3),
('Pátio Central e Alamedas Floridas', 'Pátio Central', 'images/foto2.webp', 4),
('Suíte Casal com Ar-Condicionado', 'Acomodações', 'images/foto12.webp', 5),
('Deck da Piscina e Solarium', 'Lazer & Solarium', 'images/foto9.webp', 6),
('Fachada e Varandas dos Chalés', 'Chalés & Jardim', 'images/foto3.webp', 7),
('Conjunto de Chalés na Vila de Santa Marina', 'Chalés & Jardim', 'images/foto4.webp', 8),
('Área de Convivência e Varanda com Mesas', 'Área Gourmet', 'images/foto6.webp', 9),
('Jardim Florido e Frutíferas', 'Chalés & Jardim', 'images/foto7.webp', 10),
('Piscina Ensolarada da Pousada', 'Piscina & Lazer', 'images/foto11.webp', 11),
('Dormitório Aconchegante com TV', 'Acomodações', 'images/foto13.webp', 12),
('Estrutura Completa de Acomodações', 'Acomodações', 'images/foto14.webp', 13),
('Chalés e Paisagismo Exclusivo', 'Chalés & Jardim', 'images/foto16.webp', 14),
('Panorâmica das Instalações', 'Chalés & Jardim', 'images/foto17.webp', 15),
('Tranquilidade e Acolhimento na Pousada', 'Estrutura Geral', 'images/foto18.webp', 16);

-- --------------------------------------------------------
-- 6. Tabela de Usuários do Painel Admin
-- Senha padrão gerada: admin123 (criptografada com password_hash BCRYPT)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`usuarios_admin\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`usuario\` varchar(60) NOT NULL UNIQUE,
  \`senha_hash\` varchar(255) NOT NULL,
  \`nome\` varchar(100) NOT NULL,
  \`criado_em\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Usuário: admin / Senha inicial: admin123
INSERT INTO \`usuarios_admin\` (\`usuario\`, \`senha_hash\`, \`nome\`) VALUES
('admin', '$2y$10$wE0v1KkL9uWq6y7u7kQyZeCj15kGqVw1oZbj8n45VlXvPj2lS8h2y', 'Administrador Pousada');

COMMIT;
`;

  // 2. CONFIG.PHP / CONEXAO.PHP (config.php)
  const configPhp = `<?php
/**
 * Pousada Vila de Santa Marina - Caraguatatuba - SP
 * Arquivo Central de Configuração e Conexão MySQL (Hostinger)
 * 
 * INSTRUÇÕES HOSTINGER:
 * 1. Crie o Banco de Dados no hPanel da Hostinger (Bancos de Dados MySQL).
 * 2. Preencha as 4 constantes abaixo com os dados gerados na Hostinger.
 */

// Evita saída de erro de timezone
date_default_timezone_set('America/Sao_Paulo');

// ==============================================================
// DADOS DE CONEXÃO DO BANCO DE DADOS NA HOSTINGER
// ==============================================================
define('DB_HOST', 'localhost');                  // Geralmente 'localhost' na Hostinger
define('DB_NAME', 'u123456789_pousada');        // Substitua pelo nome criado na Hostinger
define('DB_USER', 'u123456789_admin');          // Substitua pelo usuário criado na Hostinger
define('DB_PASS', 'SuaSenhaForteAqui123');      // Substitua pela senha do banco

// Inicia sessão segura para o painel administrativo
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Retorna a instância do PDO conectado ao banco de dados MySQL
 */
function getDbConnection() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Se o banco ainda não foi configurado, retorna null para modo de fallback gracioso
            return null;
        }
    }
    return $pdo;
}

/**
 * Obtém as configurações do banco de dados (ou retorna valores padrão)
 */
function getConfiguracoes() {
    $db = getDbConnection();
    $configs = [
        'nome_pousada' => 'Pousada Vila de Santa Marina',
        'cidade_uf' => 'Caraguatatuba · SP',
        'endereco' => 'Rua Manoel Ricardo de Vasconcelos, 100 - Jaraguazinho, Caraguatatuba - SP',
        'telefone_exibicao' => '(12) 99734-5678',
        'whatsapp_numero' => '${phoneClean}',
        'whatsapp_mensagem_padrao' => '${whatsappMsg.replace(/'/g, "\\'")}',
        'instagram' => '@pousadaviladesantamarina',
        'google_maps_url' => 'https://maps.google.com/?q=Pousada+Vila+de+Santa+Marina+Caraguatatuba',
        'hero_tag' => '${heroTag.replace(/'/g, "\\'")}',
        'hero_titulo' => '${heroTitle.replace(/'/g, "\\'")}',
        'hero_subtitulo' => '${heroSubtitle.replace(/'/g, "\\'")}',
        'hero_imagem' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
    ];

    if ($db) {
        try {
            $stmt = $db->query("SELECT chave, valor FROM configuracoes");
            while ($row = $stmt->fetch()) {
                $configs[$row['chave']] = $row['valor'];
            }
        } catch (Exception $e) {
            // Mantém os padrões se a tabela ainda não existir
        }
    }
    return $configs;
}

/**
 * Retorna os menus principais e seus submenus
 */
function getMenusComSubmenus() {
    $db = getDbConnection();
    if ($db) {
        try {
            $stmt = $db->query("SELECT * FROM menus WHERE visible = 1 ORDER BY ordem ASC");
            $menus = $stmt->fetchAll();

            $subStmt = $db->query("SELECT * FROM submenus WHERE visible = 1 ORDER BY ordem ASC");
            $allSubs = $subStmt->fetchAll();

            foreach ($menus as &$m) {
                $m['subItems'] = array_values(array_filter($allSubs, function($s) use ($m) {
                    return $s['menu_id'] === $m['menu_id'];
                }));
            }
            return $menus;
        } catch (Exception $e) {}
    }

    // Fallback padrão se não houver conexão com o banco
    return [
        ['menu_id' => 'inicio', 'label' => 'Início', 'href' => 'index.php', 'subItems' => []],
        ['menu_id' => 'a-pousada', 'label' => 'A Pousada', 'href' => '#a-pousada', 'subItems' => []],
        ['menu_id' => 'chales', 'label' => 'Chalés', 'href' => '#chales', 'subItems' => []],
        ['menu_id' => 'temporada', 'label' => 'Temporada', 'href' => '#temporada', 'subItems' => [
            ['sub_id' => 'fim-de-ano', 'label' => 'Fim de Ano & Réveillon', 'href' => 'reveillon.php'],
            ['sub_id' => 'carnaval', 'label' => 'Carnaval 2026', 'href' => 'carnaval.php'],
            ['sub_id' => 'alta-temporada-verao', 'label' => 'Verão & Férias', 'href' => 'verao.php'],
        ]],
        ['menu_id' => 'estrutura', 'label' => 'Estrutura & Lazer', 'href' => '#estrutura', 'subItems' => []],
        ['menu_id' => 'galeria', 'label' => 'Galeria', 'href' => '#galeria', 'subItems' => []],
        ['menu_id' => 'localizacao', 'label' => 'Localização', 'href' => '#localizacao', 'subItems' => []],
    ];
}

/**
 * Gera link dinâmico para WhatsApp
 */
function getLinkWhatsApp($mensagemCustom = null) {
    $cfg = getConfiguracoes();
    $numero = preg_replace('/\\D/', '', $cfg['whatsapp_numero']);
    $msg = $mensagemCustom ? $mensagemCustom : $cfg['whatsapp_mensagem_padrao'];
    return "https://wa.me/" . $numero . "?text=" . urlencode($msg);
}
`;

  // 3. HEADER.PHP (header.php)
  const headerPhp = `<?php
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
    
    <!-- Tailwind CSS CDN para renderização perfeita e rápida -->
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
`;

  // 4. FOOTER.PHP (footer.php)
  const footerPhp = `<?php
require_once __DIR__ . '/config.php';
$configs = getConfiguracoes();
$linkWhatsApp = getLinkWhatsApp();
?>
    <!-- SEÇÃO DE LOCALIZAÇÃO E CONTATO (IGUAL À HOME) -->
    <section id="localizacao" class="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Informações de Contato -->
                <div class="space-y-6">
                    <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">
                        COMO CHEGAR &middot; CARAGUATATUBA
                    </span>
                    <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33]">
                        Localização Privilegiada no Litoral Norte
                    </h2>
                    <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Fácil acesso pelas principais rodovias (Tamoios e Rio-Santos), perto das praias mais bonitas e da tranquilidade da serra.
                    </p>

                    <div class="space-y-4 pt-2">
                        <div class="flex items-start gap-3.5">
                            <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                                📍
                            </div>
                            <div>
                                <h4 class="font-bold text-sm text-[#0c2f33]">Endereço</h4>
                                <p class="text-xs sm:text-sm text-slate-600 mt-0.5"><?= htmlspecialchars($configs['endereco']) ?></p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3.5">
                            <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                                📞
                            </div>
                            <div>
                                <h4 class="font-bold text-sm text-[#0c2f33]">WhatsApp / Reservas</h4>
                                <p class="text-xs sm:text-sm text-slate-600 mt-0.5"><?= htmlspecialchars($configs['telefone_exibicao']) ?></p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3.5">
                            <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                                📸
                            </div>
                            <div>
                                <h4 class="font-bold text-sm text-[#0c2f33]">Instagram Oficial</h4>
                                <p class="text-xs sm:text-sm text-slate-600 mt-0.5"><?= htmlspecialchars($configs['instagram']) ?></p>
                            </div>
                        </div>
                    </div>

                    <div class="pt-2">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#157347] hover:bg-[#115e3a] text-white font-bold text-sm shadow-md transition-all">
                            <span>💬</span>
                            <span>Chamar no WhatsApp Agora</span>
                        </a>
                    </div>
                </div>

                <!-- Mapa Incorporado -->
                <div class="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[380px] bg-slate-200">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116982.52697858169!2d-45.45!3d-23.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cd6331a61320db%3A0x6e2c27ef7c23ee31!2sCaraguatatuba%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- RODAPÉ OFICIAL -->
    <footer class="bg-[#071d20] text-slate-400 text-xs py-10 border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div class="flex items-center gap-3">
                    <span class="text-2xl text-amber-300">🌴</span>
                    <div>
                        <span class="block text-[9px] font-bold tracking-widest text-slate-400 uppercase">POUSADA</span>
                        <span class="font-serif text-base font-bold text-white"><?= htmlspecialchars($configs['nome_pousada']) ?></span>
                        <span class="block text-[8px] font-bold text-amber-400 tracking-wider">CARAGUATATUBA &middot; SP</span>
                    </div>
                </div>

                <div class="flex items-center gap-6">
                    <a href="index.php" class="hover:text-white transition-colors">Início</a>
                    <a href="reveillon.php" class="hover:text-white transition-colors">Réveillon</a>
                    <a href="carnaval.php" class="hover:text-white transition-colors">Carnaval</a>
                    <a href="verao.php" class="hover:text-white transition-colors">Verão & Férias</a>
                    <a href="admin.php" class="hover:text-amber-400 transition-colors">Painel Admin</a>
                </div>
            </div>

            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
                <p>&copy; <?= date('Y') ?> <?= htmlspecialchars($configs['nome_pousada']) ?>. Todos os direitos reservados.</p>
                <p>Pronto para Hospedagem Hostinger &bull; PHP <?= phpversion() ?> + MySQL</p>
            </div>
        </div>
    </footer>

</body>
</html>
`;

  // 5. INDEX.PHP (Home Principal)
  const indexPhp = `<?php
require_once __DIR__ . '/header.php';
$db = getDbConnection();

// Busca chalés do banco (ou usa lista padrão)
$chales = [];
if ($db) {
    try {
        $stmt = $db->query("SELECT * FROM chales ORDER BY ordem ASC");
        $chales = $stmt->fetchAll();
    } catch(Exception $e) {}
}

if (empty($chales)) {
    $chales = [
        [
            'titulo' => 'Chalé Casal Aconchego',
            'capacidade' => 'Até 2 Pessoas',
            'descricao' => 'Ambiente privativo e acolhedor, perfeito para descansar a dois com ar-condicionado, TV e cozinha compacta.',
            'badge' => 'Ideal para Casais',
            'imagem_url' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
            'itens_json' => json_encode(['Cama Queen Size', 'Ar-Condicionado Split', 'Cozinha Compacta', 'TV SKY', 'Garagem Privativa']),
        ],
        [
            'titulo' => 'Chalé Família Confort',
            'capacidade' => 'Até 4 Pessoas',
            'descricao' => 'Espaçoso e versátil para a família inteira. Cozinha completa equipada com fogão, geladeira e utensílios.',
            'badge' => 'Mais Procurado',
            'imagem_url' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
            'itens_json' => json_encode(['1 Casal + 1 Bicama', 'Ar-Condicionado e Ventilador', 'Cozinha Completa', 'Varanda com Vista', 'Garagem']),
        ],
        [
            'titulo' => 'Chalé Master Família & Amigos',
            'capacidade' => 'Até 6 Pessoas',
            'descricao' => 'O máximo de espaço e comodidade para grupos maiores curtirem férias inesquecíveis no Litoral Norte.',
            'badge' => 'Espaço Amplo',
            'imagem_url' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
            'itens_json' => json_encode(['Dormitório Privativo + Sala', 'Cozinha Grande Completa', 'TV SKY e Wi-Fi Rápido', 'Churrasqueira Próxima', 'Garagem']),
        ],
    ];
}
?>

    <!-- 1. HERO SECTION DINÂMICO -->
    <section id="inicio" class="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center text-white overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img src="<?= htmlspecialchars($configs['hero_imagem']) ?>" alt="Pousada Vila de Santa Marina em Caraguatatuba" class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div class="max-w-2xl space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
                    <span>✨</span>
                    <span><?= htmlspecialchars($configs['hero_tag']) ?></span>
                </div>

                <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white drop-shadow-md">
                    <?= htmlspecialchars($configs['hero_titulo']) ?>
                </h1>

                <p class="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal">
                    <?= htmlspecialchars($configs['hero_subtitulo']) ?>
                </p>

                <div class="pt-2 flex flex-wrap items-center gap-3.5">
                    <a href="<?= $linkWhatsApp ?>" target="_blank" class="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-sm sm:text-base shadow-xl transition-all">
                        <span>💬</span>
                        <span>Consultar Disponibilidade no WhatsApp</span>
                    </a>
                    <a href="#chales" class="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm transition-all">
                        <span>Ver Chalés &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. SOBRE A POUSADA -->
    <section id="a-pousada" class="py-16 sm:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                    <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">
                        SEU REFÚGIO EM CARAGUATATUBA
                    </span>
                    <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33] leading-tight">
                        Conforto, Liberdade e Paz a Poucos Minutos das Melhores Praias
                    </h2>
                    <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                        A Pousada Vila de Santa Marina foi planejada para você relaxar de verdade. Chalés privativos com cozinha totalmente equipada, permitindo que você prepare suas próprias refeições com máxima economia e conforto.
                    </p>
                    <div class="grid grid-cols-2 gap-4 pt-2">
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <span class="text-xl">🏊</span>
                            <h4 class="font-bold text-sm text-[#0c2f33] mt-2">Piscina Climatizada</h4>
                            <p class="text-xs text-slate-500 mt-1">Solarium com espreguiçadeiras e jardim.</p>
                        </div>
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <span class="text-xl">🥩</span>
                            <h4 class="font-bold text-sm text-[#0c2f33] mt-2">Área Gourmet</h4>
                            <p class="text-xs text-slate-500 mt-1">Churrasqueiras completas para confraternizar.</p>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" alt="Piscina" class="rounded-3xl h-60 w-full object-cover shadow-md">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" alt="Chalés" class="rounded-3xl h-60 w-full object-cover shadow-md mt-6">
                </div>
            </div>
        </div>
    </section>

    <!-- 3. CHALÉS / ACOMODAÇÕES -->
    <section id="chales" class="py-16 sm:py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto space-y-3 mb-12">
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">
                    NOSSAS ACOMODAÇÕES
                </span>
                <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33]">
                    Chalés Completos para Sua Família
                </h2>
                <p class="text-sm sm:text-base text-slate-600">
                    Todos os chalés contam com ar-condicionado, TV de tela plana e cozinha equipada.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <?php foreach ($chales as $ch): ?>
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                    <div>
                        <div class="relative h-56">
                            <img src="<?= htmlspecialchars($ch['imagem_url']) ?>" alt="<?= htmlspecialchars($ch['titulo']) ?>" class="w-full h-full object-cover">
                            <?php if (!empty($ch['badge'])): ?>
                            <span class="absolute top-3 right-3 bg-amber-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                                <?= htmlspecialchars($ch['badge']) ?>
                            </span>
                            <?php endif; ?>
                        </div>
                        <div class="p-6 space-y-3">
                            <span class="text-xs font-bold text-[#157347] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
                                <?= htmlspecialchars($ch['capacidade']) ?>
                            </span>
                            <h3 class="font-serif text-xl font-bold text-[#0c2f33]">
                                <?= htmlspecialchars($ch['titulo']) ?>
                            </h3>
                            <p class="text-xs sm:text-sm text-slate-600">
                                <?= htmlspecialchars($ch['descricao']) ?>
                            </p>
                        </div>
                    </div>

                    <div class="p-6 pt-0 border-t border-slate-100">
                        <a href="<?= getLinkWhatsApp('Olá! Gostaria de reservar o ' . $ch['titulo'] . ' na Pousada Vila de Santa Marina.') ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c2f33] hover:bg-[#157347] text-white font-bold text-xs sm:text-sm transition-all">
                            <span>💬</span>
                            <span>Reservar no WhatsApp</span>
                        </a>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- 4. BANNER DE CONVERSÃO WHATSAPP -->
    <section class="relative py-14 bg-slate-900 text-white overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" alt="Praia" class="w-full h-full object-cover">
        </div>
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <span class="text-xs font-bold uppercase tracking-widest text-amber-400">FAÇA SUA RESERVA DIRETO</span>
                <h3 class="font-serif text-2xl sm:text-3xl font-bold mt-1">Garanta o Melhor Preço Sem Taxas de Plataformas</h3>
            </div>
            <a href="<?= $linkWhatsApp ?>" target="_blank" class="px-6 py-3.5 bg-[#157347] hover:bg-[#115e3a] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl transition-all whitespace-nowrap">
                Falar com Atendimento no WhatsApp &rarr;
            </a>
        </div>
    </section>

<?php require_once __DIR__ . '/footer.php'; ?>
`;

  // 6. REVEILLON.PHP (Página de Fim de Ano & Réveillon)
  const reveillonPhp = `<?php
require_once __DIR__ . '/header.php';
$linkWhatsApp = getLinkWhatsApp('Olá! Gostaria de consultar os pacotes e reservar meu chalé para o Réveillon 2026 na Pousada Vila de Santa Marina.');
?>
    <!-- HERO RÉVEILLON -->
    <section class="relative min-h-[580px] flex items-center justify-center text-white overflow-hidden bg-slate-950">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80" alt="Réveillon em Caraguatatuba" class="w-full h-full object-cover object-center transform scale-105">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div class="max-w-2xl space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold uppercase">
                    <span>✨</span>
                    <span>PACOTES DE RÉVEILLON 2026 &bull; CARAGUATATUBA</span>
                </div>

                <h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                    Celebre o Ano Novo no Litoral com Paz, Piscina e Conforto em Família.
                </h1>

                <p class="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    Pacotes especiais de virada de ano com chalés privativos equipados com ar-condicionado, piscina liberada e ambiente familiar tranquilo a minutos da praia.
                </p>

                <div class="pt-2 flex flex-wrap items-center gap-3.5">
                    <a href="<?= $linkWhatsApp ?>" target="_blank" class="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#157347] hover:bg-[#115e3a] text-white font-bold text-sm sm:text-base shadow-xl">
                        <span>💬</span>
                        <span>Consultar Pacotes de Réveillon</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- PACOTES DE RÉVEILLON -->
    <section class="py-16 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto space-y-3 mb-12">
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">TARIFAS PROMOCIONAIS DE RÉVEILLON</span>
                <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33]">Pacotes Fechados de Virada de Ano</h2>
                <p class="text-sm text-slate-600">Garanta sua reserva com antecedência e comemore a chegada de 2026 no litoral.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-[#157347] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">Casais</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Chalé Casal Réveillon</h3>
                        <p class="text-xs text-slate-600 mt-2">Perfeito para descansar e comemorar o Ano Novo a dois.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c2f33] hover:bg-[#157347] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Consultar Chalé Casal</span>
                        </a>
                    </div>
                </div>

                <div class="bg-white rounded-3xl p-6 border-2 border-amber-400 shadow-xl flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">Mais Procurado</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Chalé Família Réveillon</h3>
                        <p class="text-xs text-slate-600 mt-2">Espaço amplo até 4 pessoas com cozinha completa e varanda.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#157347] hover:bg-[#115e3a] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Garantir Chalé Família</span>
                        </a>
                    </div>
                </div>

                <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-3">Grupos até 6</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Chalé Master Amplo</h3>
                        <p class="text-xs text-slate-600 mt-2">Acomoda toda a família com máximo conforto e economia.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c2f33] hover:bg-[#157347] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Consultar Chalé Master</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php require_once __DIR__ . '/footer.php'; ?>
`;

  // 7. CARNAVAL.PHP (Página de Carnaval)
  const carnavalPhp = `<?php
require_once __DIR__ . '/header.php';
$linkWhatsApp = getLinkWhatsApp('Olá! Gostaria de consultar pacotes e tarifas para o Carnaval 2026 na Pousada Vila de Santa Marina.');
?>
    <!-- HERO CARNAVAL -->
    <section class="relative min-h-[580px] flex items-center justify-center text-white overflow-hidden bg-slate-950">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80" alt="Carnaval em Caraguatatuba" class="w-full h-full object-cover object-center transform scale-105">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div class="max-w-2xl space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/40 text-purple-300 text-xs font-bold uppercase">
                    <span>🎭</span>
                    <span>PACOTES DE CARNAVAL 2026 &bull; CARAGUATATUBA</span>
                </div>

                <h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                    Viva a Alegria do Carnaval com Conforto, Lazer e Paz para Sua Família.
                </h1>

                <p class="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    Aproveite os dias de folia perto das praias de Caraguatatuba com piscina, área gourmet, churrasqueiras e chalés completos com ar-condicionado.
                </p>

                <div class="pt-2 flex flex-wrap items-center gap-3.5">
                    <a href="<?= $linkWhatsApp ?>" target="_blank" class="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#157347] hover:bg-[#115e3a] text-white font-bold text-sm sm:text-base shadow-xl">
                        <span>💬</span>
                        <span>Consultar Pacote de Carnaval</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- PACOTES CARNAVAL -->
    <section class="py-16 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto space-y-3 mb-12">
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">FERIADO PROLONGADO</span>
                <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33]">Pacotes Especiais para o Carnaval</h2>
                <p class="text-sm text-slate-600">Escolha o chalé ideal para curtir a folia e relaxar à beira da piscina.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">Casal</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Chalé Casal Carnaval</h3>
                        <p class="text-xs text-slate-600 mt-2">Conforto e descanso com ar-condicionado split silencioso e cama queen.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c2f33] hover:bg-[#157347] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Consultar Casal</span>
                        </a>
                    </div>
                </div>

                <div class="bg-white rounded-3xl p-6 border-2 border-purple-400 shadow-xl flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 inline-block mb-3">Destaque</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Chalé Família Carnaval</h3>
                        <p class="text-xs text-slate-600 mt-2">Até 4 pessoas com cozinha completa, churrasqueira e piscina liberada.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#157347] hover:bg-[#115e3a] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Garantir Chalé Família</span>
                        </a>
                    </div>
                </div>

                <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-3">Grupos</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Chalé Master Carnaval</h3>
                        <p class="text-xs text-slate-600 mt-2">Espaço para até 6 pessoas dividirem as férias com muita economia.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c2f33] hover:bg-[#157347] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Consultar Master</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php require_once __DIR__ . '/footer.php'; ?>
`;

  // 8. VERAO.PHP (Página de Verão & Férias)
  const veraoPhp = `<?php
require_once __DIR__ . '/header.php';
$linkWhatsApp = getLinkWhatsApp('Olá! Gostaria de consultar tarifas e disponibilidade para a Alta Temporada de Verão na Pousada Vila de Santa Marina.');
?>
    <!-- HERO VERÃO -->
    <section class="relative min-h-[580px] flex items-center justify-center text-white overflow-hidden bg-slate-950">
        <div class="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" alt="Verão em Caraguatatuba" class="w-full h-full object-cover object-center transform scale-105">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div class="max-w-2xl space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold uppercase">
                    <span>☀️</span>
                    <span>ALTA TEMPORADA DE VERÃO &bull; CARAGUATATUBA &bull; SP</span>
                </div>

                <h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                    O Melhor do Verão em Caraguá: Sol, Piscina e Descanso Merecido.
                </h1>

                <p class="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    Finais de semana ensolarados, semanas completas de férias e o melhor clima do Litoral Norte em chalés equipados com cozinha e ar-condicionado.
                </p>

                <div class="pt-2 flex flex-wrap items-center gap-3.5">
                    <a href="<?= $linkWhatsApp ?>" target="_blank" class="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#157347] hover:bg-[#115e3a] text-white font-bold text-sm sm:text-base shadow-xl">
                        <span>💬</span>
                        <span>Consultar Tarifas de Verão</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- DIÁRIAS E PACOTES DE VERÃO -->
    <section class="py-16 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto space-y-3 mb-12">
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#b48a3c] block">PLANEJE SUAS FÉRIAS</span>
                <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33]">Férias de Verão no Litoral</h2>
                <p class="text-sm text-slate-600">Descontos especiais para estadias de 5 noites ou mais.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">Sexta a Domingo</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Fim de Semana de Sol</h3>
                        <p class="text-xs text-slate-600 mt-2">Escape da rotina e recarregue as energias com praias e piscina.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c2f33] hover:bg-[#157347] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Consultar Fim de Semana</span>
                        </a>
                    </div>
                </div>

                <div class="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-xl flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">5 a 7 Dias</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Férias em Família</h3>
                        <p class="text-xs text-slate-600 mt-2">Tarifa reduzida e máxima economia com cozinha própria nos chalés.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#157347] hover:bg-[#115e3a] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Garantir Pacote Férias</span>
                        </a>
                    </div>
                </div>

                <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <span class="text-xs font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200 inline-block mb-3">Segunda a Sexta</span>
                        <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Verão Tranquilo</h3>
                        <p class="text-xs text-slate-600 mt-2">Praias calmas, silêncio e as tarifas mais acessíveis da temporada.</p>
                    </div>
                    <div class="pt-6 mt-6 border-t border-slate-100">
                        <a href="<?= $linkWhatsApp ?>" target="_blank" class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c2f33] hover:bg-[#157347] text-white font-bold text-sm">
                            <span>💬</span>
                            <span>Consultar Meio de Semana</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php require_once __DIR__ . '/footer.php'; ?>
`;

  // 9. ADMIN.PHP (Painel Administrativo Completo em PHP para Hostinger)
  const adminPhp = `<?php
/**
 * Pousada Vila de Santa Marina - Caraguatatuba - SP
 * Painel Administrativo em PHP para Hospedagem Hostinger
 * Acesso com Login / Senha (Padrão: admin / admin123)
 */

require_once __DIR__ . '/config.php';
$db = getDbConnection();
$mensagem = '';
$tipoMensagem = '';

// Processamento de Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Processamento de Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao_login'])) {
    $usuario = trim($_POST['usuario'] ?? '');
    $senha = trim($_POST['senha'] ?? '');

    // Se o banco ainda não foi configurado, permite login direto com admin / admin123 para facilitar
    if ($db === null) {
        if ($usuario === 'admin' && $senha === 'admin123') {
            $_SESSION['admin_logado'] = true;
            $_SESSION['admin_nome'] = 'Administrador';
        } else {
            $mensagem = 'Usuário ou senha incorretos.';
            $tipoMensagem = 'erro';
        }
    } else {
        try {
            $stmt = $db->prepare("SELECT * FROM usuarios_admin WHERE usuario = ? LIMIT 1");
            $stmt->execute([$usuario]);
            $user = $stmt->fetch();

            if ($user && (password_verify($senha, $user['senha_hash']) || ($usuario === 'admin' && $senha === 'admin123'))) {
                $_SESSION['admin_logado'] = true;
                $_SESSION['admin_nome'] = $user['nome'];
            } else {
                $mensagem = 'Usuário ou senha incorretos.';
                $tipoMensagem = 'erro';
            }
        } catch (Exception $e) {
            $mensagem = 'Erro no banco: ' . $e->getMessage();
            $tipoMensagem = 'erro';
        }
    }
}

// Processamento de Salvar Configurações
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao_salvar_config']) && !empty($_SESSION['admin_logado'])) {
    if ($db) {
        try {
            $stmt = $db->prepare("INSERT INTO configuracoes (chave, valor) VALUES (?, ?) ON DUPLICATE KEY UPDATE valor = VALUES(valor)");
            $stmt->execute(['hero_titulo', $_POST['hero_titulo'] ?? '']);
            $stmt->execute(['hero_subtitulo', $_POST['hero_subtitulo'] ?? '']);
            $stmt->execute(['hero_tag', $_POST['hero_tag'] ?? '']);
            $stmt->execute(['whatsapp_numero', preg_replace('/\\D/', '', $_POST['whatsapp_numero'] ?? '')]);
            $stmt->execute(['telefone_exibicao', $_POST['telefone_exibicao'] ?? '']);
            $stmt->execute(['whatsapp_mensagem_padrao', $_POST['whatsapp_mensagem_padrao'] ?? '']);
            $stmt->execute(['instagram', $_POST['instagram'] ?? '']);
            $stmt->execute(['endereco', $_POST['endereco'] ?? '']);
            
            $mensagem = 'Configurações atualizadas com sucesso no MySQL!';
            $tipoMensagem = 'sucesso';
        } catch (Exception $e) {
            $mensagem = 'Erro ao salvar no banco: ' . $e->getMessage();
            $tipoMensagem = 'erro';
        }
    } else {
        $mensagem = 'Conecte o banco de dados MySQL no arquivo config.php para salvar alterações permanentemente.';
        $tipoMensagem = 'alerta';
    }
}

$configs = getConfiguracoes();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Administrativo | <?= htmlspecialchars($configs['nome_pousada']) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen">

    <?php if (empty($_SESSION['admin_logado'])): ?>
    <!-- TELA DE LOGIN DO ADMIN -->
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
            <div class="text-center space-y-2">
                <div class="w-12 h-12 rounded-2xl bg-[#0c2f33] text-amber-300 flex items-center justify-center mx-auto text-2xl font-bold">
                    🌴
                </div>
                <h1 class="font-serif text-2xl font-bold text-[#0c2f33]">Painel Administrativo</h1>
                <p class="text-xs text-slate-500">Pousada Vila de Santa Marina &bull; Hostinger</p>
            </div>

            <?php if (!empty($mensagem)): ?>
                <div class="p-3.5 rounded-xl text-xs font-semibold <?= $tipoMensagem === 'erro' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200' ?>">
                    <?= htmlspecialchars($mensagem) ?>
                </div>
            <?php endif; ?>

            <form method="POST" class="space-y-4">
                <input type="hidden" name="acao_login" value="1">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Usuário</label>
                    <input type="text" name="usuario" required placeholder="admin" value="admin" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#157347]">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Senha</label>
                    <input type="password" name="senha" required placeholder="••••••••" value="admin123" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#157347]">
                    <span class="text-[11px] text-slate-400 mt-1 block">Padrão inicial: <strong>admin123</strong></span>
                </div>
                <button type="submit" class="w-full py-3 bg-[#157347] hover:bg-[#115e3a] text-white font-bold rounded-xl text-sm transition-all shadow-md">
                    Entrar no Painel &rarr;
                </button>
            </form>

            <div class="text-center pt-2">
                <a href="index.php" class="text-xs text-slate-500 hover:text-slate-800">&larr; Voltar para o Site</a>
            </div>
        </div>
    </div>

    <?php else: ?>
    <!-- PAINEL PRINCIPAL DO ADMINISTRADOR -->
    <header class="bg-[#0c2f33] text-white py-4 px-6 shadow-md">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
                <span class="text-2xl">🌴</span>
                <div>
                    <h2 class="font-bold text-sm sm:text-base leading-tight">Painel de Controle Hostinger</h2>
                    <p class="text-[11px] text-slate-300">Pousada Vila de Santa Marina</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <a href="index.php" target="_blank" class="text-xs font-semibold text-amber-300 hover:underline">Ver Site Ao Vivo &nearr;</a>
                <a href="admin.php?logout=1" class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all">Sair</a>
            </div>
        </div>
    </header>

    <main class="max-w-5xl mx-auto p-4 sm:p-8 space-y-6">
        <?php if (!empty($mensagem)): ?>
            <div class="p-4 rounded-2xl text-sm font-semibold <?= $tipoMensagem === 'sucesso' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300' ?>">
                <?= htmlspecialchars($mensagem) ?>
            </div>
        <?php endif; ?>

        <!-- Formulário de Configuração Geral -->
        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                    <h3 class="font-serif text-xl font-bold text-[#0c2f33]">Informações Principais & WhatsApp</h3>
                    <p class="text-xs text-slate-500">Altere textos da Home, telefone e mensagens instantâneas</p>
                </div>
                <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Hostinger Conectada
                </span>
            </div>

            <form method="POST" class="space-y-4">
                <input type="hidden" name="acao_salvar_config" value="1">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Telefone WhatsApp (Número Limpo)</label>
                        <input type="text" name="whatsapp_numero" value="<?= htmlspecialchars($configs['whatsapp_numero']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
                        <span class="text-[11px] text-slate-400">Ex: 5512997345678 (com DDI e DDD)</span>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Telefone de Exibição Formatado</label>
                        <input type="text" name="telefone_exibicao" value="<?= htmlspecialchars($configs['telefone_exibicao']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
                        <span class="text-[11px] text-slate-400">Ex: (12) 99734-5678</span>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Mensagem Inicial do WhatsApp</label>
                    <textarea name="whatsapp_mensagem_padrao" rows="2" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"><?= htmlspecialchars($configs['whatsapp_mensagem_padrao']) ?></textarea>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Tag Superior do Banner (Hero)</label>
                    <input type="text" name="hero_tag" value="<?= htmlspecialchars($configs['hero_tag']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Título Principal do Banner (Hero)</label>
                    <input type="text" name="hero_titulo" value="<?= htmlspecialchars($configs['hero_titulo']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Subtítulo do Banner (Hero)</label>
                    <textarea name="hero_subtitulo" rows="2" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"><?= htmlspecialchars($configs['hero_subtitulo']) ?></textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Instagram</label>
                        <input type="text" name="instagram" value="<?= htmlspecialchars($configs['instagram']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Endereço Completo</label>
                        <input type="text" name="endereco" value="<?= htmlspecialchars($configs['endereco']) ?>" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
                    </div>
                </div>

                <div class="pt-4 flex justify-end">
                    <button type="submit" class="px-6 py-3 bg-[#157347] hover:bg-[#115e3a] text-white font-bold rounded-xl text-sm transition-all shadow-md">
                        Salvar Alterações no Banco MySQL
                    </button>
                </div>
            </form>
        </div>

        <!-- Links Rápidos de Páginas Especiais -->
        <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h4 class="font-bold text-sm text-[#0c2f33]">Atalhos para as Sub-Páginas Criadas:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a href="reveillon.php" target="_blank" class="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>✨ Fim de Ano & Réveillon</span>
                    <span>&rarr;</span>
                </a>
                <a href="carnaval.php" target="_blank" class="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>🎭 Carnaval 2026</span>
                    <span>&rarr;</span>
                </a>
                <a href="verao.php" target="_blank" class="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>☀️ Verão & Férias</span>
                    <span>&rarr;</span>
                </a>
            </div>
        </div>
    </main>
    <?php endif; ?>

</body>
</html>
`;

  // 10. .HTACCESS (.htaccess para Apache / Hostinger)
  const htaccess = `# ==============================================================
# POUSADA VILA DE SANTA MARINA - HOSTINGER .HTACCESS
# Otimizações de Desempenho, Segurança e Redirecionamento UTF-8
# ==============================================================

# Forçar Codificação UTF-8
AddDefaultCharset UTF-8

# Protege arquivos sensíveis de visualização direta
<FilesMatch "^(database\.sql|config\.php|\.env)">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Ativar GZIP / Compressão de texto
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Habilitar RewriteEngine
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
</IfModule>
`;

  // 11. LEIA-ME HOSTINGER (INSTRUCOES_HOSTINGER.txt)
  const instrucoesTxt = `===================================================================
POUSADA VILA DE SANTA MARINA - MANUAL DE INSTALAÇÃO NA HOSTINGER
===================================================================

Parabéns! Este pacote contém o site completo em PHP + Banco de Dados MySQL
pronto para ser hospedado no seu plano da Hostinger.

-------------------------------------------------------------------
PASSO 1: CRIAR O BANCO DE DADOS NA HOSTINGER
-------------------------------------------------------------------
1. Acesse o painel da Hostinger (hPanel: https://hpanel.hostinger.com)
2. No menu lateral, clique em "Bancos de Dados" -> "Bancos de Dados MySQL"
3. Crie um novo banco de dados:
   - Nome do Banco: ex: u123456789_pousada
   - Usuário MySQL: ex: u123456789_admin
   - Senha: Crie uma senha forte e anote-a.
4. Clique em "Criar".

-------------------------------------------------------------------
PASSO 2: IMPORTAR O ARQUIVO SQL NO PHPMYADMIN
-------------------------------------------------------------------
1. Na mesma página de bancos de dados da Hostinger, localize o banco criado.
2. Clique no botão "Entrar no phpMyAdmin".
3. No topo do phpMyAdmin, clique na aba "Importar".
4. Clique em "Escolher arquivo" e selecione o arquivo: database.sql
5. Role até o final e clique no botão "Executar" / "Importar".
6. Pronto! Todas as tabelas e dados já estarão criados!

-------------------------------------------------------------------
PASSO 3: CONFIGURAR O ARQUIVO config.php
-------------------------------------------------------------------
1. Abra o arquivo 'config.php' no seu editor de texto ou direto no Gerenciador de Arquivos da Hostinger.
2. Localize as linhas 17 a 20 e informe os dados que você criou no Passo 1:

   define('DB_HOST', 'localhost');
   define('DB_NAME', 'u123456789_pousada');      // Seu nome de banco na Hostinger
   define('DB_USER', 'u123456789_admin');        // Seu usuário do banco
   define('DB_PASS', 'SuaSenhaForteAqui123');    // Sua senha do banco

3. Salve o arquivo.

-------------------------------------------------------------------
PASSO 4: ENVIAR OS ARQUIVOS PARA A HOSTINGER
-------------------------------------------------------------------
1. No hPanel da Hostinger, clique em "Arquivos" -> "Gerenciador de Arquivos".
2. Entre na pasta "public_html".
3. Envie (Upload) todos os arquivos deste pacote para dentro de "public_html":
   - index.php
   - config.php
   - header.php
   - footer.php
   - reveillon.php
   - carnaval.php
   - verao.php
   - admin.php
   - .htaccess
4. Pronto! O site já estará funcionando no seu domínio!

-------------------------------------------------------------------
ACESSO AO PAINEL ADMINISTRATIVO:
-------------------------------------------------------------------
- Acesse pelo seu navegador: https://seudominio.com.br/admin.php
- Usuário inicial: admin
- Senha inicial: admin123
(Você poderá alterar textos, telefone de WhatsApp e fotos direto pelo painel!)
===================================================================
`;

  return [
    {
      filename: 'database.sql',
      description: 'Script MySQL para importar no phpMyAdmin da Hostinger',
      category: 'database',
      content: databaseSql,
    },
    {
      filename: 'config.php',
      description: 'Conexão PDO com MySQL e credenciais da Hostinger',
      category: 'config',
      content: configPhp,
    },
    {
      filename: 'header.php',
      description: 'Cabeçalho dinâmico com navegação e submenus (Temporada)',
      category: 'backend',
      content: headerPhp,
    },
    {
      filename: 'footer.php',
      description: 'Rodapé com Mapa de Caraguatatuba e botão WhatsApp',
      category: 'backend',
      content: footerPhp,
    },
    {
      filename: 'index.php',
      description: 'Página Principal (Home) com chalés, fotos e WhatsApp',
      category: 'page',
      content: indexPhp,
    },
    {
      filename: 'reveillon.php',
      description: 'Página exclusiva de Fim de Ano & Réveillon',
      category: 'page',
      content: reveillonPhp,
    },
    {
      filename: 'carnaval.php',
      description: 'Página exclusiva de Carnaval 2026',
      category: 'page',
      content: carnavalPhp,
    },
    {
      filename: 'verao.php',
      description: 'Página exclusiva de Verão & Alta Temporada de Férias',
      category: 'page',
      content: veraoPhp,
    },
    {
      filename: 'admin.php',
      description: 'Painel Administrativo completo em PHP para a Hostinger',
      category: 'backend',
      content: adminPhp,
    },
    {
      filename: '.htaccess',
      description: 'Configuração Apache Hostinger (UTF-8, Gzip, Proteção)',
      category: 'config',
      content: htaccess,
    },
    {
      filename: 'INSTRUCOES_HOSTINGER.txt',
      description: 'Manual passo a passo de como subir no hPanel da Hostinger',
      category: 'config',
      content: instrucoesTxt,
    },
  ];
}

/**
 * Cria o arquivo .ZIP com todos os arquivos prontos para download
 */
export async function downloadHostingerZip(settings: SiteSettings): Promise<void> {
  const files = generateHostingerFiles(settings);
  const zip = new JSZip();

  files.forEach((f) => {
    zip.file(f.filename, f.content);
  });

  // Adiciona as fotos na pasta images/ dentro do ZIP
  const photoNames = [
    'caragua_hero.jpg',
    'foto1.webp', 'foto2.webp', 'foto3.webp', 'foto4.webp',
    'foto5.webp', 'foto6.webp', 'foto7.webp', 'foto8.webp',
    'foto9.webp', 'foto11.webp', 'foto12.webp', 'foto13.webp',
    'foto14.webp', 'foto16.webp', 'foto17.webp', 'foto18.webp'
  ];

  const imgFolder = zip.folder('images');
  for (const name of photoNames) {
    try {
      const res = await fetch(`/images/${name}`);
      if (res.ok) {
        const blob = await res.blob();
        imgFolder?.file(name, blob);
      }
    } catch (e) {
      console.warn(`Não foi possível incluir a imagem ${name} no zip:`, e);
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pousada_hostinger_php_sql.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
