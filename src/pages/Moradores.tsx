import { useState, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useMoradores } from '@/features/moradores/hooks/useMoradores';
import { MoradoresTable } from '@/features/moradores/components/MoradoresTable';
import { MoradoresActions } from '@/features/moradores/components/MoradoresActions';
import { MoradorForm } from '@/features/moradores/components/MoradorForm';
import { MoradorFormData } from '@/features/moradores/types';
import { MoradoresFilters } from '@/features/moradores/components/MoradoresFilters';

const MoradoresPage = () => {
    const { moradores, loading, error } = useMoradores();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const filteredMoradores = useMemo(() => {
        return moradores.filter(morador => {
            const searchMatch = !searchTerm ||
                morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                morador.unidade.toLowerCase().includes(searchTerm.toLowerCase());

            const dateMatch = !dateRange?.from || !morador.ultimaCobrancaData || (
                new Date(morador.ultimaCobrancaData) >= dateRange.from &&
                new Date(morador.ultimaCobrancaData) <= (dateRange.to || dateRange.from)
            );
            return searchMatch && dateMatch;
        });
    }, [moradores, searchTerm, dateRange]);

    const handleSaveMorador = (data: MoradorFormData) => { /* ... */ };

    return (
        <>
            <div className="flex h-screen bg-bg-secondary">
                <Sidebar />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Header title="Gestão de Moradores" />
                    <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
                        <MoradoresActions 
                            onAddClick={() => setIsFormOpen(true)}
                            onSearchChange={setSearchTerm}
                        />
                        <Card className="rounded-2xl shadow-sm border">
                            <CardHeader>
                                <CardTitle>Lista de Moradores</CardTitle>
                                <div className="flex justify-between items-center">
                                  <CardDescription>Visualize e gerencie todos os moradores cadastrados.</CardDescription>
                                  <MoradoresFilters dateRange={dateRange} onDateChange={setDateRange} />
                                </div>
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
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}><DialogContent><MoradorForm onSave={handleSaveMorador} /></DialogContent></Dialog>
        </>
    );
};

export default MoradoresPage;