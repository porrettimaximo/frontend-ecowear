import { useState, useEffect } from "react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
    
    if (isIOSDevice && !isStandalone) {
      setIsIOS(true);
      // Show iOS prompt after a small delay
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    const handler = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Show prompt after a small delay to not annoy immediately
      const timer = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[100] md:left-auto md:right-8 md:w-96 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="relative overflow-hidden rounded-2xl bg-[#0c0f0f] p-6 shadow-2xl ring-1 ring-white/10">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
        
        <div className="relative flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <img src="/icon-192.png" alt="App Icon" className="h-10 w-10 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white">
                  Instalar ECOWEAR
                </h3>
                <button 
                  onClick={() => setShowPrompt(false)}
                  className="material-symbols-outlined text-white/30 hover:text-white transition-colors text-lg"
                >
                  close
                </button>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/50">
                {isIOS 
                  ? "Para instalar, toca el botón compartir y luego 'Agregar a inicio'."
                  : "Accede más rápido y disfruta de una experiencia optimizada instalando la app."
                }
              </p>
            </div>
          </div>

          {!isIOS && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowPrompt(false)}
                className="flex-1 rounded-xl px-4 py-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/40 hover:bg-white/5 hover:text-white transition-all"
              >
                Ahora no
              </button>
              <button
                onClick={handleInstallClick}
                className="flex-1 rounded-xl bg-white px-4 py-3 text-[0.65rem] font-black uppercase tracking-[0.2em] text-black hover:bg-[#f2f4f4] active:scale-95 transition-all shadow-lg shadow-white/5"
              >
                Instalar App
              </button>
            </div>
          )}
          
          {isIOS && (
            <div className="flex items-center justify-center gap-2 border-t border-white/5 pt-4">
              <span className="material-symbols-outlined text-white/40 text-sm">ios_share</span>
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-white/40">
                Compartir {">"} Agregar a inicio
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
