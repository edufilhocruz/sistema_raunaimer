import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Importações atualizadas
import { useMoradores } from '@/features/moradores/hooks/useMoradores';
import { MoradoresTable } from '@/features/moradores/components/MoradoresTable';
import { MoradorForm } from '@/features/moradores/components/MoradorForm';
import { MoradoresActions } from '@/features/moradores/components/MoradoresActions'; // <-- NOVO IMPORT
import { MoradorFormData } from '@/features/moradores/types';
import { useMemo } from 'react';

const MoradoresPage = () => {
    const { moradores, loading, error } = useMoradores();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Memoiza a filtragem para otimizar a performance
    const filteredMoradores = useMemo(() => {
        if (!searchTerm) {
            return moradores;
        }
        return moradores.filter(morador =>
            morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            morador.unidade.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [moradores, searchTerm]);

    const handleSaveMorador = (data: MoradorFormData) => {
        console.log("Salvando novo morador:", data);
        setIsFormOpen(false);
        // Aqui chamaríamos uma função do hook para adicionar/atualizar
    };

    return (
        <>
            <div className="flex h-screen bg-bg-secondary">
                <Sidebar />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Header title="Gestão de Moradores" />
                    <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
                        {/* Componente MoradoresActions renderizado aqui */}
                        <MoradoresActions 
                            onAddClick={() => setIsFormOpen(true)}
                            onSearchChange={(value) => setSearchTerm(value)}
                        />

                        <Card className="rounded-2xl shadow-sm border">
                            <CardHeader>
                                <CardTitle>Lista de Moradores</CardTitle>
                                <CardDescription>Visualize e gerencie todos os moradores cadastrados.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loading && <Skeleton className="h-[300px] w-full" />}
                                {!loading && !error && <MoradoresTable moradores={filteredMoradores} />}
                                {error && <p className="text-destructive text-center py-10">{error}</p>}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <MoradorForm onSave={handleSaveMorador} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MoradoresPage;