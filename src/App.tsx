import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Provedores de UI e Contexto globais
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

// --- Lazy Loading das Páginas (com caminhos corrigidos) ---
const IndexPage = React.lazy(() => import("./pages/Index"));
const CondominioPage = React.lazy(() => import("./pages/Condominio"));
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));

// Páginas de Cobranças (caminhos verificados)
const EnviarCobrancaPage = React.lazy(() => import("./pages/cobrancas/Enviar"));
const ImportacaoEmMassaPage = React.lazy(() => import("./pages/cobrancas/Importacao"));
const ModelosDeCartaPage = React.lazy(() => import("./pages/cobrancas/Modelos"));
const EnvioEmMassaPage = React.lazy(() => import("./pages/cobrancas/EnvioEmMassa"));

// Páginas de Relatórios (caminhos verificados)
const HistoricoInadimplenciaPage = React.lazy(() => import("./pages/relatorios/HistoricoInadimplencia"));
const SemCobrancaPage = React.lazy(() => import("./pages/relatorios/SemCobranca"));
const HistoricoCobrancasRelatoriosPage = React.lazy(() => import("./pages/relatorios/HistoricoCobrancas"));

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
        <BrowserRouter>
          <React.Suspense fallback={suspenseFallback}>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/condominio" element={<CondominioPage />} />

              {/* Rotas de Cobranças */}
              <Route path="/cobranca/nova" element={<EnviarCobrancaPage />} />
              <Route path="/cobrancas/importacao" element={<ImportacaoEmMassaPage />} />
              <Route path="/cobrancas/modelos" element={<ModelosDeCartaPage />} />
              <Route path="/cobrancas/envio-em-massa" element={<EnvioEmMassaPage />} />
              {/* A rota /cobrancas/historico foi removida, pois agora está em relatórios */}

              {/* Rotas de Relatórios */}
              <Route path="/relatorios/historico-inadimplencia" element={<HistoricoInadimplenciaPage />} />
              <Route path="/relatorios/sem-cobranca" element={<SemCobrancaPage />} />
              <Route path="/relatorios/historico-cobrancas" element={<HistoricoCobrancasRelatoriosPage />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;