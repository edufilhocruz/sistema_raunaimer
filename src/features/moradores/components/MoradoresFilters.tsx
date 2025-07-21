import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

interface Props {
  dateRange?: DateRange;
  onDateChange: (dateRange?: DateRange) => void;
}

export const MoradoresFilters = ({ dateRange, onDateChange }: Props) => {
  return (
    <div className="flex items-center gap-4">
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-[280px] h-10 justify-start text-left font-normal", !dateRange && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? ( dateRange.to ? ( <> {format(dateRange.from, "dd/MM/yy")} - {format(dateRange.to, "dd/MM/yy")} </> ) : ( format(dateRange.from, "dd/MM/yy") ) ) : ( <span>Filtrar por data de envio</span> )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar initialFocus mode="range" selected={dateRange} onSelect={onDateChange} numberOfMonths={2} locale={ptBR}/>
            </PopoverContent>
        </Popover>
        <Button variant="outline" onClick={() => onDateChange(undefined)}>Limpar Filtro</Button>
    </div>
  );
};