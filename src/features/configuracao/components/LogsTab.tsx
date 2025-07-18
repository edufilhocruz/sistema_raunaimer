import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { useLogs } from '../hooks/useLogs';
// Verifique se este caminho e nome de arquivo correspondem EXATAMENTE ao seu arquivo
import { LogsTable } from './Logs/LogsTable'; 
import { LogsFilters } from './Logs/LogsFilters';
import { LogsPagination } from './Logs/LogsPagination';

export const LogsTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { logs, pageCount, loading } = useLogs(currentPage);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold">Logs e Auditoria</h3>
        <p className="text-muted-foreground">Acompanhe os eventos importantes que ocorrem no sistema.</p>
      </div>
      <LogsFilters />
      {loading ? <Skeleton className="h-96 w-full" /> : <LogsTable logs={logs} />}
      {pageCount > 0 && (
         <LogsPagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};