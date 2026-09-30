<?php
/**
 * POUSADA VILA DE SANTA MARINA - CARAGUATATUBA - SP
 * Arquivo Principal: index.php
 * Executar localmente: php -S localhost:8000
 */

date_default_timezone_set('America/Sao_Paulo');

$nomeHospede = isset($_GET['nome']) && !empty(trim($_GET['nome'])) 
    ? htmlspecialchars(trim($_GET['nome']), ENT_QUOTES, 'UTF-8') 
    : 'Hóspede';

$hora = (int)date('H');
if ($hora >= 5 && $hora < 12) {
    $saudacao = 'Bom dia';
} elseif ($hora >= 12 && $hora < 18) {
    $saudacao = 'Boa tarde';
} else {
    $saudacao = 'Boa noite';
}

$telefoneWhatsApp = '5512997345678';
$telefoneFormatado = '(12) 99734-5678';
$mensagemWhatsApp = urlencode("Olá! Gostaria de consultar disponibilidade e valores na Pousada Vila de Santa Marina em Caraguatatuba.");
$linkWhatsApp = "https://wa.me/{$telefoneWhatsApp}?text={$mensagemWhatsApp}";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pousada Vila de Santa Marina | Caraguatatuba - SP</title>
    <meta name="description" content="Chalés completos para casais e famílias com piscina, área gourmet e ar-condicionado em Caraguatatuba - SP.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-script { font-family: 'Caveat', cursive; }
    </style>
</head>
<body class="bg-white text-slate-800 antialiased selection:bg-[#157347] selection:text-white">

    <!-- Header / Navbar -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 py-3.5 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <span class="text-2xl text-[#124d45]">🌴</span>
                <div>
                    <span class="block text-[9px] tracking-widest text-slate-400 uppercase font-bold">POUSADA</span>
                    <span class="font-serif text-lg font-bold text-[#0c2f33] leading-none">Vila de Santa Marina</span>
                    <span class="block text-[8px] tracking-widest text-[#b48a3c] font-bold mt-0.5">CARAGUATATUBA &middot; SP</span>
                </div>
            </div>

            <nav class="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-slate-600">
                <a href="#inicio" class="text-[#0c2f33] font-semibold border-b-2 border-[#b48a3c] pb-0.5">Início</a>
                <a href="#a-pousada" class="hover:text-[#0c2f33]">A Pousada</a>
                <a href="#acomodacoes" class="hover:text-[#0c2f33]">Acomodações</a>
                <a href="#estrutura" class="hover:text-[#0c2f33]">Estrutura</a>
                <a href="#localizacao" class="hover:text-[#0c2f33]">Localização</a>
                <a href="#depoimentos" class="hover:text-[#0c2f33]">Depoimentos</a>
            </nav>

            <a href="<?= $linkWhatsApp ?>" target="_blank" class="bg-[#157347] hover:bg-[#115e3a] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-all">
                <span>💬 Fale no WhatsApp</span>
            </a>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="inicio" class="relative min-h-[580px] flex items-center bg-slate-900 text-white px-4 sm:px-8 py-20 overflow-hidden">
        <div class="max-w-7xl mx-auto w-full relative z-10">
            <div class="max-w-2xl text-left">
                <div class="inline-flex items-center gap-2 mb-3">
                    <span class="h-[1.5px] w-6 bg-[#d4a853]"></span>
                    <span class="text-xs font-bold tracking-widest uppercase text-[#e9bf68]">CARAGUATATUBA TE ESPERA</span>
                    <span class="h-[1.5px] w-6 bg-[#d4a853]"></span>
                </div>
                <h1 class="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold leading-tight mb-5">
                    Fique perto do mar com o conforto que você merece
                </h1>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                    Chalés completos para casais e famílias, com piscina, área gourmet e todo o conforto que você precisa, para viver dias únicos em Caraguatatuba.
                </p>
                <div class="flex flex-wrap gap-4 mb-10">
                    <a href="<?= $linkWhatsApp ?>" class="bg-[#157347] hover:bg-[#115e3a] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg">
                        📅 Reservar Agora
                    </a>
                    <a href="<?= $linkWhatsApp ?>" class="border border-white/30 bg-black/35 hover:bg-black/55 text-white px-6 py-3.5 rounded-xl font-semibold text-sm">
                        💬 Fale no WhatsApp
                    </a>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/15 text-xs text-slate-200">
                    <div>📍 A poucos minutos das praias</div>
                    <div>👥 Ideal para casais e famílias</div>
                    <div>🛡️ Ambiente seguro e acolhedor</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Sobre / A Pousada -->
    <section id="a-pousada" class="py-20 bg-[#faf8f5] px-4 sm:px-8">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <div class="bg-white p-6 rounded-3xl shadow-md border border-slate-200/80">
                    <span class="font-script text-3xl font-bold text-[#9d7328] block mb-2">Conforto em cada detalhe ✨</span>
                    <p class="text-xs text-slate-500">Pousada Vila de Santa Marina em Caraguatatuba - SP</p>
                </div>
            </div>
            <div class="space-y-4">
                <div class="text-xs font-bold tracking-widest text-[#b48a3c] uppercase">— SUA ESTADIA EM CARAGUATATUBA</div>
                <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33]">
                    Conforto, lazer e boas lembranças te esperam
                </h2>
                <p class="text-slate-600 text-sm leading-relaxed">
                    Nossos chalés oferecem o equilíbrio perfeito entre conforto e lazer. Com opções para casais e também para famílias maiores, cada acomodação conta com cozinha equipada, utensílios domésticos, geladeira, fogão, TV com SKY e ar-condicionado.
                </p>
                <div class="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs font-semibold text-[#0c2f33]">
                    <div>🌴 Pertinho do mar</div>
                    <div>🤍 Ambiente familiar</div>
                    <div>⭐ Conforto em tudo</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Nossa Estrutura -->
    <section id="estrutura" class="py-20 bg-white px-4 sm:px-8">
        <div class="max-w-7xl mx-auto text-center">
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33] mb-2">Nossa Estrutura</h2>
            <p class="text-slate-500 text-sm mb-12">Tudo o que faz diferença na sua viagem</p>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                <div class="p-5 rounded-2xl bg-[#faf8f5] border border-slate-100">
                    <div class="text-2xl mb-2">🏊</div>
                    <h3 class="font-bold text-sm text-[#0c2f33] mb-1">Piscina</h3>
                    <p class="text-xs text-slate-500">Espaço para relaxar e se refrescar.</p>
                </div>
                <div class="p-5 rounded-2xl bg-[#faf8f5] border border-slate-100">
                    <div class="text-2xl mb-2">🍖</div>
                    <h3 class="font-bold text-sm text-[#0c2f33] mb-1">Área gourmet</h3>
                    <p class="text-xs text-slate-500">Churrasqueira para reunir a família.</p>
                </div>
                <div class="p-5 rounded-2xl bg-[#faf8f5] border border-slate-100">
                    <div class="text-2xl mb-2">🚗</div>
                    <h3 class="font-bold text-sm text-[#0c2f33] mb-1">Estacionamento</h3>
                    <p class="text-xs text-slate-500">Vagas disponíveis com segurança.</p>
                </div>
                <div class="p-5 rounded-2xl bg-[#faf8f5] border border-slate-100">
                    <div class="text-2xl mb-2">❄️</div>
                    <h3 class="font-bold text-sm text-[#0c2f33] mb-1">Ar-condicionado</h3>
                    <p class="text-xs text-slate-500">Em todas as acomodações.</p>
                </div>
                <div class="p-5 rounded-2xl bg-[#faf8f5] border border-slate-100">
                    <div class="text-2xl mb-2">🍳</div>
                    <h3 class="font-bold text-sm text-[#0c2f33] mb-1">Cozinha equipada</h3>
                    <p class="text-xs text-slate-500">Fogão, geladeira e utensílios.</p>
                </div>
                <div class="p-5 rounded-2xl bg-[#faf8f5] border border-slate-100">
                    <div class="text-2xl mb-2">📺</div>
                    <h3 class="font-bold text-sm text-[#0c2f33] mb-1">TV e Wi-Fi</h3>
                    <p class="text-xs text-slate-500">Canais variados e internet rápida.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Depoimentos -->
    <section id="depoimentos" class="py-20 bg-[#faf8f5] px-4 sm:px-8">
        <div class="max-w-7xl mx-auto">
            <div class="mb-10 text-center">
                <div class="text-xs font-bold tracking-widest text-[#b48a3c] uppercase">— DEPOIMENTOS —</div>
                <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33]">Quem veio, quer voltar —</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-2xl border border-slate-200">
                    <div class="font-bold text-sm text-[#0c2f33]">Gabi Cardoso</div>
                    <div class="text-amber-400 text-xs my-2">★★★★★</div>
                    <p class="text-xs text-slate-600">"Lugar super aconchegante, sossegado, tem uma área de lazer completa e a pousada é pertinho da praia."</p>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200">
                    <div class="font-bold text-sm text-[#0c2f33]">Marcelo Valério de Sousa</div>
                    <div class="text-amber-400 text-xs my-2">★★★★★</div>
                    <p class="text-xs text-slate-600">"Foi muito bom, fiquei com minha família e fui muito bem recebido uma estrutura maravilhosa."</p>
                </div>
                <div class="bg-white p-6 rounded-2xl border border-slate-200">
                    <div class="font-bold text-sm text-[#0c2f33]">Patrícia Lima</div>
                    <div class="text-amber-400 text-xs my-2">★★★★★</div>
                    <p class="text-xs text-slate-600">"Chalés limpos, organizados e com tudo que precisamos. Meus filhos amaram a piscina!"</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Localização & Contato -->
    <section id="localizacao" class="py-20 bg-white px-4 sm:px-8">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
                <div class="text-xs font-bold tracking-widest text-[#b48a3c] uppercase mb-2">— NOSSA LOCALIZAÇÃO</div>
                <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0c2f33] mb-4">Estamos em Caraguatatuba</h2>
                <p class="text-slate-600 text-sm mb-4">📍 Rua Canjós, Loteamento Jardim Britânia, Caraguatatuba - SP</p>
                <a href="<?= $linkWhatsApp ?>" class="inline-block bg-[#157347] text-white px-5 py-3 rounded-xl font-bold text-sm">
                    Fale no WhatsApp: <?= $telefoneFormatado ?>
                </a>
            </div>
            <div class="p-6 rounded-3xl bg-[#faf8f5] border border-slate-200 text-center">
                <span class="text-4xl">🗺️</span>
                <h3 class="font-bold text-[#0c2f33] mt-2">Próximo às Melhores Praias</h3>
                <p class="text-xs text-slate-500 mt-1">Praia do Indaiá e Praia Martim de Sá a poucos minutos de distância.</p>
            </div>
        </div>
    </section>

    <!-- Rodapé -->
    <footer class="bg-[#071d20] text-slate-400 text-xs py-8 text-center border-t border-white/10 px-4">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <strong class="text-white font-serif text-sm">Pousada Vila de Santa Marina</strong> &middot; Caraguatatuba - SP
            </div>
            <div>
                &copy; <?= date('Y') ?> Todos os direitos reservados.
            </div>
        </div>
    </footer>

</body>
</html>
