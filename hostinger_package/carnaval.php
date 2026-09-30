<?php
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
