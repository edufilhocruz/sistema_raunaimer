import { useState, useMemo } from 'react';
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { useCondominios } from '@/features/condominio/hooks/useCondominios';
import { CondominiosTable } from '@/features/condominio/components/CondominiosTable';
import { CondominiosActions } from '@/features/condominio/components/CondominiosActions';
import { CondominioForm } from '@/features/condominio/components/CondominioForm';
import { CondominioFormData } from '@/features/condominio/types';

const CondominiosPage = () => {
    const { condominios, loading, error } = useCondominios();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCondominios = useMemo(() => {
        if (!searchTerm) return condominios;
        return condominios.filter(condo =>
            condo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            condo.cnpj.includes(searchTerm)
        );
    }, [condominios, searchTerm]);

    const handleSave = (data: CondominioFormData) => {
        console.log("Salvando condomínio:", data);
        setIsFormOpen(false);
        // Futuramente, aqui chamaremos uma função do hook para salvar os dados na API
        // e depois chamar a função `refresh()` do hook useCondominios
    };

    return (
        <>
            <div className="flex h-screen bg-bg-secondary">
                <Sidebar />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Header title="Gestão de Condomínios" />
                    <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
                        <CondominiosActions 
                            onAddClick={() => setIsFormOpen(true)}
                            onSearchChange={setSearchTerm}
                        />
                        <Card className="rounded-2xl shadow-sm border">
                            <CardHeader>
                                <CardTitle>Lista de Condomínios</CardTitle>
                                <CardDescription>Visualize e gerencie todos os condomínios cadastrados.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loading && <Skeleton className="h-[300px] w-full" />}
                                {!loading && !error && <CondominiosTable condominios={filteredCondominios} />}
                                {error && <p className="text-destructive text-center py-10">{error}</p>}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-4xl">
                    <CondominioForm onSave={handleSave} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CondominiosPage;