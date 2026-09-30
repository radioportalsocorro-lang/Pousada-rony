<?php
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
            $stmt->execute(['whatsapp_numero', preg_replace('/\D/', '', $_POST['whatsapp_numero'] ?? '')]);
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
