import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CobrancaStatus } from '@/features/cobranca/types';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Search } from "lucide-react";

interface Props {
  onFilterChange: (filters: { status: CobrancaStatus | 'todos'; dateRange?: DateRange }) => void;
}

export const CobrancasReportFilters = ({ onFilterChange }: Props) => {
  // O componente agora gerencia seu próprio estado interno
  const [status, setStatus] = useState<CobrancaStatus | 'todos'>('todos');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Ação é disparada apenas no clique do botão
  const handleApplyFilters = () => {
    onFilterChange({ status, dateRange });
  };

  return (
    <Card className="rounded-2xl shadow-sm border">
        <CardHeader>
            <CardTitle>Filtros do Relatório</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Filtro de Status */}
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Status de Pagamento</label>
                    <Select onValueChange={(value) => setStatus(value as CobrancaStatus | 'todos')} defaultValue="todos">
                        <SelectTrigger className="h-12"><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos os Status</SelectItem>
                            <SelectItem value="Pago">Pago</SelectItem>
                            <SelectItem value="Atrasado">Atrasado</SelectItem>
                            <SelectItem value="Em Aberto">Em Aberto</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* Filtro de Data */}
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Período</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} className={cn("w-full h-12 justify-start text-left font-normal", !dateRange && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? ( dateRange.to ? ( <> {format(dateRange.from, "dd/MM/yy", { locale: ptBR })} - {format(dateRange.to, "dd/MM/yy", { locale: ptBR })} </> ) : ( format(dateRange.from, "dd/MM/yy", { locale: ptBR }) ) ) : ( <span>Selecione um período</span> )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar initialFocus mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} locale={ptBR}/>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* Botão de Ação */}
                <div className="flex items-end">
                    <Button className="w-full h-12 bg-gold hover:bg-gold-hover" onClick={handleApplyFilters}>
                        <Search className="mr-2 h-4 w-4" /> Aplicar Filtros
                    </Button>
                </div>
            </div>
      </CardContent>
    </Card>
  );
};