import React, { useState } from 'react';
import { X, Calendar, Users, MessageCircle, Check, ArrowRight } from 'lucide-react';
import { POUSADA_INFO } from '../../data/pousadaData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [nome, setNome] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adultos, setAdultos] = useState('2');
  const [criancas, setCriancas] = useState('0');
  const [tipoChale, setTipoChale] = useState('Casal (1 Cama Casal)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensagem = `Olá, meu nome é ${nome || 'Hóspede'}. Gostaria de solicitar reserva na Pousada Vila de Santa Marina:\n\n` +
      `📅 Check-in: ${checkIn || 'A definir'}\n` +
      `📅 Check-out: ${checkOut || 'A definir'}\n` +
      `👥 Hóspedes: ${adultos} adulto(s) e ${criancas} criança(s)\n` +
      `🏡 Chalé: ${tipoChale}\n\n` +
      `Poderiam me informar a disponibilidade e valores?`;

    const url = `https://wa.me/${POUSADA_INFO.phoneClean}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="h-[1.5px] w-5 bg-[#b48a3c]" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b48a3c]">
              RESERVA DIRETA
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0c2f33]">
            Simular Reserva no Chalé
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Preencha os dados e receba resposta imediata com os melhores valores da pousada.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Seu Nome Completo
            </label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Carlos Eduardo"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#157347] focus:ring-1 focus:ring-[#157347]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data de Check-in
              </label>
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#157347]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data de Check-out
              </label>
              <input
                type="date"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#157347]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adultos
              </label>
              <select
                value={adultos}
                onChange={(e) => setAdultos(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#157347]"
              >
                <option value="1">1 Adulto</option>
                <option value="2">2 Adultos (Casal)</option>
                <option value="3">3 Adultos</option>
                <option value="4">4 Adultos</option>
                <option value="5">5+ Adultos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Crianças
              </label>
              <select
                value={criancas}
                onChange={(e) => setCriancas(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#157347]"
              >
                <option value="0">Nenhuma</option>
                <option value="1">1 Criança</option>
                <option value="2">2 Crianças</option>
                <option value="3">3+ Crianças</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tipo de Acomodação
            </label>
            <select
              value={tipoChale}
              onChange={(e) => setTipoChale(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#157347]"
            >
              <option value="Chalé Casal (1 Cama Casal + Cozinha)">Chalé Casal (com cozinha e ar-condicionado)</option>
              <option value="Chalé Família até 4 pessoas">Chalé Família (até 4 pessoas com cozinha)</option>
              <option value="Chalé Família até 6 pessoas">Chalé Master (até 6 pessoas com cozinha)</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#157347] hover:bg-[#115e3a] active:scale-95 shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Consultar Valores no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
            <span>🛡️ Sem taxas extras de intermediação</span>
            <span>&middot;</span>
            <span>Reserva direta e segura</span>
          </div>
        </form>
      </div>
    </div>
  );
};
