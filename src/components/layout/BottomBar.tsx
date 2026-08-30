import React from 'react';

export const BottomBar = () => {
  return (
    <div className="py-6 md:h-20 md:py-0 border-t border-border-main mt-auto flex flex-col md:flex-row items-center justify-between shrink-0 relative z-20 gap-4 md:gap-0">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:space-x-6 md:gap-0 text-[#666] text-xs font-mono uppercase tracking-widest">
        <a href="https://github.com/Christian-0601" target="_blank" rel="noreferrer" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2 md:p-0 md:min-h-0 md:min-w-0 hover:text-white cursor-pointer transition-colors">Github</a>
        <a href="https://www.linkedin.com/in/aloysius-christian-putra/" target="_blank" rel="noreferrer" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2 md:p-0 md:min-h-0 md:min-w-0 hover:text-white cursor-pointer transition-colors">LinkedIn</a>
        <a href="https://linktr.ee/aloysiuschrist" target="_blank" rel="noreferrer" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2 md:p-0 md:min-h-0 md:min-w-0 hover:text-white cursor-pointer transition-colors">Linktree</a>
        <a href="https://wa.me/6285895161774" target="_blank" rel="noreferrer" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2 md:p-0 md:min-h-0 md:min-w-0 hover:text-white cursor-pointer transition-colors">WhatsApp</a>
      </div>
    </div>
  );
};
