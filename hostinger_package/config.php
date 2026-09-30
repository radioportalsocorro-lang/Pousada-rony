<?php
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
        'whatsapp_numero' => '5512997345678',
        'whatsapp_mensagem_padrao' => 'Olá! Gostaria de consultar reservas na Pousada Vila de Santa Marina.',
        'instagram' => '@pousadaviladesantamarina',
        'google_maps_url' => 'https://maps.google.com/?q=Pousada+Vila+de+Santa+Marina+Caraguatatuba',
        'hero_tag' => 'POUSADA VILA DE SANTA MARINA · CARAGUATATUBA',
        'hero_titulo' => 'Fique perto do mar com o conforto que você merece',
        'hero_subtitulo' => 'Chalés completos para casais e famílias com piscina, área de churrasqueiras e a tranquilidade que você procura no litoral de Caraguatatuba.',
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
    $numero = preg_replace('/\D/', '', $cfg['whatsapp_numero']);
    $msg = $mensagemCustom ? $mensagemCustom : $cfg['whatsapp_mensagem_padrao'];
    return "https://wa.me/" . $numero . "?text=" . urlencode($msg);
}
