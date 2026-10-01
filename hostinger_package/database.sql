-- ==============================================================
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
CREATE TABLE IF NOT EXISTS `configuracoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chave` varchar(64) NOT NULL UNIQUE,
  `valor` text NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `configuracoes` (`chave`, `valor`, `descricao`) VALUES
('nome_pousada', 'Pousada Vila de Santa Marina', 'Nome oficial da pousada'),
('cidade_uf', 'Caraguatatuba · SP', 'Localização resumida'),
('endereco', 'Rua Manoel Ricardo de Vasconcelos, 100 - Jaraguazinho, Caraguatatuba - SP, 11674-000', 'Endereço completo'),
('telefone_exibicao', '(12) 99734-5678', 'Telefone formatado para exibição'),
('whatsapp_numero', '5512997345678', 'Número limpo do WhatsApp com DDI (Ex: 5512997345678)'),
('whatsapp_mensagem_padrao', 'Olá! Gostaria de consultar reservas na Pousada Vila de Santa Marina.', 'Mensagem inicial do WhatsApp'),
('instagram', '@pousadaviladesantamarina', 'Perfil do Instagram'),
('google_maps_url', 'https://maps.google.com/?q=Pousada+Vila+de+Santa+Marina+Caraguatatuba', 'Link do Google Maps'),
('hero_tag', 'POUSADA VILA DE SANTA MARINA · CARAGUATATUBA', 'Tag no topo do banner'),
('hero_titulo', 'Fique perto do mar com o conforto que você merece', 'Título principal da Home'),
('hero_subtitulo', 'Chalés completos para casais e famílias com piscina, área de churrasqueiras e a tranquilidade que você procura no litoral de Caraguatatuba.', 'Subtítulo da Home'),
('hero_imagem', 'images/caragua_hero.jpg', 'Imagem de fundo da Home');

-- --------------------------------------------------------
-- 2. Tabela de Menus e Navegação
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` varchar(64) NOT NULL UNIQUE,
  `label` varchar(100) NOT NULL,
  `href` varchar(255) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `is_home` tinyint(1) NOT NULL DEFAULT 0,
  `ordem` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `menus` (`menu_id`, `label`, `href`, `visible`, `is_home`, `ordem`) VALUES
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
CREATE TABLE IF NOT EXISTS `submenus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` varchar(64) NOT NULL,
  `sub_id` varchar(64) NOT NULL,
  `label` varchar(100) NOT NULL,
  `href` varchar(255) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `ordem` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `submenus` (`menu_id`, `sub_id`, `label`, `href`, `visible`, `ordem`) VALUES
('temporada', 'fim-de-ano', 'Fim de Ano & Réveillon', 'reveillon.php', 1, 1),
('temporada', 'carnaval', 'Carnaval 2026', 'carnaval.php', 1, 2),
('temporada', 'alta-temporada-verao', 'Verão & Férias', 'verao.php', 1, 3);

-- --------------------------------------------------------
-- 4. Tabela de Chalés / Acomodações
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `chales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(120) NOT NULL,
  `capacidade` varchar(80) NOT NULL,
  `descricao` text NOT NULL,
  `badge` varchar(60) DEFAULT NULL,
  `imagem_url` text NOT NULL,
  `itens_json` text NOT NULL,
  `ordem` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `chales` (`titulo`, `capacidade`, `descricao`, `badge`, `imagem_url`, `itens_json`, `ordem`) VALUES
('Chalé Casal Aconchego', 'Até 2 Pessoas', 'Ambiente privativo e acolhedor, perfeito para descansar a dois com ar-condicionado, TV e cozinha compacta prática.', 'Ideal para Casais', 'images/foto12.webp', '["Cama Queen Size", "Ar-Condicionado Split", "Cozinha Compacta com Frigobar", "TV SKY e Wi-Fi", "1 Vaga de Garagem"]', 1),
('Chalé Família Confort', 'Até 4 Pessoas', 'Espaçoso e versátil para a família inteira. Cozinha completa equipada com fogão, geladeira e utensílios.', 'Mais Procurado', 'images/foto1.webp', '["1 Cama Casal + 1 Bicama", "Ar-Condicionado e Ventilador", "Cozinha Completa c/ Fogão e Geladeira", "Varanda com Vista para o Jardim", "Estacionamento Privativo"]', 2),
('Chalé Master Família & Amigos', 'Até 6 Pessoas', 'O máximo de espaço e comodidade para grupos maiores curtirem férias inesquecíveis juntos no Litoral Norte.', 'Espaço Amplo', 'images/foto4.webp', '["Dormitório Privativo + Sala", "Cozinha Grande Completa", "TV SKY, Wi-Fi Fibra Rápida", "Churrasqueiras Próximas", "Até 2 Vagas de Garagem"]', 3);

-- --------------------------------------------------------
-- 5. Tabela de Galeria de Fotos
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `galeria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(120) NOT NULL,
  `categoria` varchar(60) NOT NULL DEFAULT 'Geral',
  `imagem_url` text NOT NULL,
  `ordem` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `galeria` (`titulo`, `categoria`, `imagem_url`, `ordem`) VALUES
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
-- 6. Tabela de Usuários do Painel Admin (Hostinger)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(60) NOT NULL UNIQUE,
  `senha_hash` varchar(255) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Usuário padrão: admin / Senha padrão: admin123
INSERT INTO `usuarios_admin` (`usuario`, `senha_hash`, `nome`) VALUES
('admin', '$2y$10$wE0v1KkL9uWq6y7u7kQyZeCj15kGqVw1oZbj8n45VlXvPj2lS8h2y', 'Administrador Pousada');

COMMIT;
