import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CobrancasTable } from "@/features/cobranca/components/CobrancasTable";

/**
 * Documentação: HistoricoCobrancasPage
 * Esta é a página que exibe o histórico de cobranças.
 * Ela monta o layout principal e renderiza o componente da tabela.
 */
const HistoricoCobrancasPage = () => {
    return (
        <div className="flex h-screen bg-bg-secondary">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
                <Header title="Histórico de Cobranças" />
                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <CobrancasTable />
                </div>
            </main>
        </div>
    );
};

export default HistoricoCobrancasPage;