<?php
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
