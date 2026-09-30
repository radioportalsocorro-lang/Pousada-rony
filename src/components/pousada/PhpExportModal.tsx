import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Database, 
  Server, 
  Code2, 
  FileText, 
  FolderArchive, 
  ExternalLink,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SiteSettings } from '../../services/settingsService';
import { generateHostingerFiles, downloadHostingerZip, HostingerFileItem } from '../../services/hostingerExportService';

interface PhpExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: SiteSettings;
}

export const PhpExportModal: React.FC<PhpExportModalProps> = ({ 
  isOpen, 
  onClose,
  settings = {} as SiteSettings
}) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [activeStepTab, setActiveStepTab] = useState<'files' | 'guide'>('files');

  if (!isOpen) return null;

  const files = generateHostingerFiles(settings);
  const currentFile = files[selectedFileIndex] || files[0];

  const handleCopy = (content: string, filename: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 2500);
  };

  const handleDownloadSingle = (file: HostingerFileItem) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      await downloadHostingerZip(settings);
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar o arquivo ZIP. Você pode baixar os arquivos individualmente pelas abas.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topo do Modal */}
        <div className="px-6 py-5 bg-[#0c2f33] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-xl shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold">
                  Exportador Completo Hostinger (PHP + MySQL)
                </h3>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  Pronto para Produção
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Gere os arquivos PHP e o banco de dados SQL para subir na pasta public_html e phpMyAdmin da Hostinger.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Ações Rápidas & Abas */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveStepTab('files')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeStepTab === 'files'
                  ? 'bg-[#0c2f33] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Arquivos do Pacote ({files.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStepTab('guide')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeStepTab === 'guide'
                  ? 'bg-[#0c2f33] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Passo a Passo Hostinger</span>
            </button>
          </div>

          {/* Botão de Download do Pacote ZIP */}
          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <FolderArchive className="w-4 h-4" />
            <span>{isZipping ? 'Compactando...' : 'Baixar Pacote Completo (.ZIP)'}</span>
          </button>
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeStepTab === 'files' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-0">
              {/* Coluna Esquerda: Lista de Arquivos */}
              <div className="md:col-span-4 border-r border-slate-200 p-4 overflow-y-auto space-y-1.5 bg-slate-50/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block px-2 mb-2">
                  Arquivos Prontos para Hostinger:
                </span>
                {files.map((file, idx) => {
                  const isSelected = selectedFileIndex === idx;
                  const isSql = file.filename.endsWith('.sql');
                  const isConfig = file.filename === 'config.php';
                  const isManual = file.filename.includes('INSTRUCOES');

                  return (
                    <button
                      key={file.filename}
                      type="button"
                      onClick={() => setSelectedFileIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-white border-2 border-[#157347] shadow-sm text-slate-900'
                          : 'bg-white/80 border border-slate-200 hover:bg-white text-slate-700'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isSql ? (
                          <Database className="w-4 h-4 text-amber-600" />
                        ) : isConfig ? (
                          <Server className="w-4 h-4 text-emerald-600" />
                        ) : isManual ? (
                          <FileText className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Code2 className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold truncate">
                            {file.filename}
                          </span>
                          {isSql && (
                            <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                              SQL
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {file.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Coluna Direita: Prévia do Código */}
              <div className="md:col-span-8 flex flex-col min-h-0 bg-[#0d1117] text-slate-200">
                {/* Cabeçalho do arquivo ativo */}
                <div className="px-5 py-3 bg-[#161b22] border-b border-slate-800 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {currentFile.filename}
                    </span>
                    <span className="text-xs text-slate-400 truncate">
                      &bull; {currentFile.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(currentFile.content, currentFile.filename)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                    >
                      {copiedFile === currentFile.filename ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(currentFile)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar</span>
                    </button>
                  </div>
                </div>

                {/* Editor / Visualizador de Código */}
                <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed select-text">
                  <pre className="whitespace-pre text-slate-300">
                    {currentFile.content}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            /* Guia Ilustrado Passo a Passo Hostinger */
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
              <div className="text-center space-y-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#157347] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  Guia Prático Hostinger
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0c2f33]">
                  Como Subir o Site para a Hostinger em 4 Passos
                </h3>
                <p className="text-sm text-slate-600">
                  Siga estas 4 etapas simples usando o painel <strong>hPanel da Hostinger</strong>:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Passo 1 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0c2f33] text-white flex items-center justify-center font-bold text-base shrink-0">
                    1
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-bold text-sm text-[#0c2f33]">
                      Criar Banco de Dados MySQL na Hostinger
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      No <strong>hPanel da Hostinger</strong>, vá em <strong>Bancos de Dados &rarr; Bancos de Dados MySQL</strong>. Crie um novo banco (Ex: <code className="bg-slate-100 px-1 py-0.5 rounded">u123456789_pousada</code>) e um usuário com senha. Guarde esses 3 dados!
                    </p>
                  </div>
                </div>

                {/* Passo 2 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-base shrink-0">
                    2
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-bold text-sm text-[#0c2f33]">
                      Importar o arquivo database.sql no phpMyAdmin
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ao lado do banco recém-criado, clique em <strong>"Entrar no phpMyAdmin"</strong>. Clique na aba superior <strong>Importar</strong>, selecione o arquivo <code className="bg-slate-100 px-1 py-0.5 rounded">database.sql</code> baixado deste pacote e clique em <strong>Executar</strong>.
                    </p>
                  </div>
                </div>

                {/* Passo 3 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#157347] text-white flex items-center justify-center font-bold text-base shrink-0">
                    3
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-bold text-sm text-[#0c2f33]">
                      Ajustar as credenciais no arquivo config.php
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Abra o arquivo <code className="bg-slate-100 px-1 py-0.5 rounded">config.php</code> e preencha as linhas com o Nome do Banco, Usuário e Senha que você criou no Passo 1:
                    </p>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono mt-2">
{`define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_pousada');
define('DB_USER', 'u123456789_admin');
define('DB_PASS', 'SuaSenhaForteAqui123');`}
                    </pre>
                  </div>
                </div>

                {/* Passo 4 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0">
                    4
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-bold text-sm text-[#0c2f33]">
                      Enviar os arquivos para a pasta public_html
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      No hPanel, vá em <strong>Arquivos &rarr; Gerenciador de Arquivos</strong>. Abra a pasta <strong>public_html</strong> e envie todos os arquivos (<code className="bg-slate-100 px-1 py-0.5 rounded">index.php</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">reveillon.php</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">carnaval.php</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">verao.php</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">admin.php</code>, etc.). Pronto! O site estará online no seu domínio!
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica do Painel Admin */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
                <div className="text-xs text-amber-900">
                  <strong>Painel Administrativo da Hostinger:</strong> Acesse <code className="bg-amber-100 px-1 py-0.5 rounded">seudominio.com.br/admin.php</code> com usuário <strong>admin</strong> e senha <strong>admin123</strong> para alterar textos e WhatsApp direto pelo navegador.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Pacote 100% autônomo &bull; Compatível com Hostinger, cPanel e qualquer servidor Apache/PHP
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#157347] hover:bg-[#115e3a] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isZipping ? 'Baixando...' : 'Baixar Arquivos para Hostinger (.ZIP)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
