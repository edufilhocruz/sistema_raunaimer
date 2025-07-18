import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useUsuarios } from '../hooks/useUsuarios';
import { UsuariosTable } from './Usuarios/UsuariosTable';
import { UsuarioForm } from './Usuarios/UsuarioForm';
import { UsuarioFormData } from '../types';

export const UsuariosTab = () => {
  const { usuarios, loading, refresh } = useUsuarios();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSave = (data: UsuarioFormData) => {
    console.log("Salvando usuário:", data);
    setIsFormOpen(false);
    refresh();
  };

  return (
    <div className="space-y-6">
       <div>
        <h3 className="text-xl font-bold">Usuários e Permissões</h3>
        <p className="text-muted-foreground">Gerencie quem pode acessar e o que pode fazer no sistema.</p>
      </div>
      <div className="flex items-center justify-end">
        <Button className="bg-gold hover:bg-gold-hover" onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Usuário
        </Button>
      </div>
      {loading ? <Skeleton className="h-64 w-full" /> : <UsuariosTable users={usuarios} />}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <UsuarioForm onSave={handleSave} />
        </DialogContent>
      </Dialog>
    </div>
  );
};