<?php
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
