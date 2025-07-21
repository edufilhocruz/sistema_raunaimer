import { useState, useMemo } from 'react';
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

import { useCondominios } from '@/features/condominio/hooks/useCondominios';
import { CondominiosTable } from '@/features/condominio/components/CondominiosTable';
import { CondominiosActions } from '@/features/condominio/components/CondominiosActions';
import { CondominioForm } from '@/features/condominio/components/CondominioForm';
import { CondominioFormData } from '@/features/condominio/types';
import condominioService from '@/features/condominio/services/condominioService';

const CondominiosPage = () => {
    const { condominios, loading, error, refresh } = useCondominios();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCondominios = useMemo(() => {
        if (!searchTerm) return condominios;
        return condominios.filter(condo =>
            condo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            condo.cnpj.includes(searchTerm)
        );
    }, [condominios, searchTerm]);

    const handleSave = async (data: CondominioFormData) => {
        setIsSaving(true);
        try {
            await condominioService.createCondominio(data);
            toast({
                title: "Sucesso!",
                description: `O condomínio "${data.nome}" foi criado.`,
            });
            setIsFormOpen(false);
            refresh(); // Atualiza a lista na tela
        } catch (err) {
            console.error("Falha ao criar condomínio:", err);
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Não foi possível criar o condomínio. Verifique os dados e tente novamente.",
            });
        } finally {
            setIsSaving(false);
        }
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
                    <CondominioForm 
                        onSave={handleSave} 
                        isSaving={isSaving} 
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CondominiosPage;