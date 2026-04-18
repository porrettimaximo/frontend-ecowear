import React from "react";

export function LoadingSpinner({ fullPage = true }: { fullPage?: boolean }) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="h-12 w-12 animate-spin border-4 border-outline/20 border-t-inverse-surface rounded-none"></div>
      <div>
        <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-tertiary">
          Respirando...
        </p>
        <p className="mt-1 text-xs text-on-surface-variant uppercase tracking-widest">
          Cargando experiencia consciente
        </p>
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-5 py-24">
        {content}
      </main>
    );
  }

  return content;
}
