import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { ModelosDeCartaProvider } from '@/features/modelos/hooks/useModelosDeCarta';

// Lazy Loading das Páginas
const IndexPage = React.lazy(() => import("./pages/Index"));
const CondominiosPage = React.lazy(() => import("./pages/Condominio")); // CORREÇÃO AQUI
const MoradoresPage = React.lazy(() => import("./pages/Moradores"));
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));
const EnviarCobrancaPage = React.lazy(() => import("./pages/cobrancas/Enviar"));
const ImportacaoEmMassaPage = React.lazy(() => import("./pages/cobrancas/Importacao"));
const ModelosDeCartaPage = React.lazy(() => import("./pages/cobrancas/Modelos"));
const EnvioEmMassaPage = React.lazy(() => import("./pages/cobrancas/EnvioEmMassa"));
const HistoricoInadimplenciaPage = React.lazy(() => import("./pages/relatorios/HistoricoInadimplencia"));
const SemCobrancaPage = React.lazy(() => import("./pages/relatorios/SemCobranca"));
const HistoricoCobrancasPage = React.lazy(() => import("./pages/relatorios/HistoricoCobrancas"));
const ConfiguracaoPage = React.lazy(() => import("./pages/Configuracao"));


const queryClient = new QueryClient();

const App = () => {
  const suspenseFallback = (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ModelosDeCartaProvider>
          <BrowserRouter>
            <React.Suspense fallback={suspenseFallback}>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/condominios" element={<CondominiosPage />} />
                <Route path="/moradores" element={<MoradoresPage />} />

                <Route path="/cobranca/nova" element={<EnviarCobrancaPage />} />
                <Route path="/cobrancas/importacao" element={<ImportacaoEmMassaPage />} />
                <Route path="/cobrancas/modelos" element={<ModelosDeCartaPage />} />
                <Route path="/cobrancas/envio-em-massa" element={<EnvioEmMassaPage />} />
                <Route path="/cobrancas/historico" element={<HistoricoCobrancasPage />} />

                <Route path="/inadimplencia/relatorio" element={<HistoricoInadimplenciaPage />} />
                
                <Route path="/relatorios/sem-cobranca" element={<SemCobrancaPage />} />
                <Route path="/configuracoes" element={<ConfiguracaoPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </ModelosDeCartaProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;