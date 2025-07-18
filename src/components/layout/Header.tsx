import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}

/**
 * Documentação: Header (com Altura Sincronizada)
 * - A altura foi padronizada para `h-20` para alinhar com o cabeçalho da Sidebar.
 */
export function Header({ title }: HeaderProps) {
  return (
    // Alteração aqui: de h-16 para h-20
    <header className="h-20 flex items-center justify-between px-6 bg-background border-b border-border">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      
      <div className="flex items-center gap-4">
        <Button className="bg-gold hover:bg-gold-hover text-white font-semibold transition-colors duration-200">
          Nova Cobrança
        </Button>
        
        <div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWNdSpoJFx52KfrdoIwyypYFYzsh8w65bPpndq3QN2dGmdARVlquzZLrF_0TEcfBFd0XQTg-ztIWNC3Q9br9VBeYc577FQWy8BbmfAMA5yHGbm3lmeRAPtBy4JIzfH6jytBmjUsPwI66v1qdjO779kgl6QCkAu-D8zlRK94rCpszZUb9-911v4kBZ6zAFrz5m27C0SBHnOHtKZBztPzsyVfPfPY_7lq2ePmLDJ2NIoSndvOXkj_sqa6RY3qe8ZeSAHrBCiocR8qjw")`
          }}
        />
      </div>
    </header>
  );
}