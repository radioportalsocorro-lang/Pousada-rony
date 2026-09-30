<?php
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
