// src/components/search.tsx
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";



export function SearchBar({ className, ...props }:any) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className={`pl-10 ${className}`}
        {...props}
      />
    </div>
  );
}