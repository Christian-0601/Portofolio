import React from 'react';

export const BottomBar = () => {
  return (
    <div className="py-6 md:h-20 md:py-0 border-t border-border-main mt-auto flex flex-col md:flex-row items-center justify-between shrink-0 relative z-20 gap-4 md:gap-0">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:space-x-6 md:gap-0 text-[#666] text-xs font-mono uppercase tracking-widest">
        <a href="#" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2 md:p-0 md:min-h-0 md:min-w-0 hover:text-white cursor-pointer transition-colors">Github</a>
        <a href="#" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2 md:p-0 md:min-h-0 md:min-w-0 hover:text-white cursor-pointer transition-colors">LinkedIn</a>
        <a href="#" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2 md:p-0 md:min-h-0 md:min-w-0 hover:text-white cursor-pointer transition-colors">Instagram</a>
        <a href="#" className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2 md:p-0 md:min-h-0 md:min-w-0 hover:text-white cursor-pointer transition-colors">Discord</a>
      </div>
      <div className="flex items-center bg-bg-card border border-border-main rounded-full px-4 py-2 space-x-3">
        <span className="text-[10px] font-bold text-[#666] uppercase">Current Project</span>
        <div className="w-1 h-1 bg-[#666] rounded-full"></div>
        <span className="text-[10px] font-mono text-accent">CMS_V2_PROD</span>
      </div>
    </div>
  );
};
