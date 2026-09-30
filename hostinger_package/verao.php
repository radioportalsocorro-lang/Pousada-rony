<?php
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
