import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TimelineNode } from '../types';
import { Clock, HelpCircle, Eye, Compass } from 'lucide-react';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
  details?: string;
  category: 'tuoi-tre' | 'cuu-nuoc' | 'doc-lap' | 'di-san';
}

// Exact historical events list as requested
const timelineData: TimelineEvent[] = [
  {
    id: 'tl-1911',
    year: '1911',
    title: 'Hành trình tìm đường cứu nước',
    description: 'Người thanh niên Nguyễn Tất Thành rời bến cảng Nhà Rồng trên con tàu Đô đốc Latouche-Tréville, bắt đầu cuộc hành trình vĩ đại tìm lối đi cho độc lập dân tộc.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/C%E1%BA%A3ng_Nh%C3%A0_R%E1%BB%93ng_1920.jpg',
    details: 'Ngày 5/6/1911, với tên gọi Anh Ba, người thanh niên yêu nước quyết chí bôn ba muôn nơi để tìm lấy tự do chân chính và giải phóng đồng bào lầm than.',
    category: 'cuu-nuoc'
  },
  {
    id: 'tl-1941',
    year: '1941',
    title: 'Trở về Tổ Quốc (Pác Bó)',
    description: 'Sau 30 năm bôn ba hải ngoại, Lãnh tụ Nguyễn Ái Quốc trở về nước trực tiếp lãnh đạo phong trào cách mạng tại hang Pác Bó, Cao Bằng.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Pac_Bo_village.jpg',
    details: 'Người sống và làm việc cực nhọc trong hang đá hiểm trở, tự tay đặt tên cho Suối Lê-nin hiền hòa và Núi Các-Mác sừng sững kỳ vĩ.',
    category: 'doc-lap'
  },
  {
    id: 'tl-1945',
    year: '1945',
    title: 'Tuyên ngôn Độc lập',
    description: 'Tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập, khai sinh ra nước Việt Nam Dân chủ Cộng hòa.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/President_Ho_Chi_Minh_reading_the_Declaration_of_Independence_of_Vietnam.jpg',
    details: 'Bản tuyên ngôn hùng hồn kết tinh khát vọng ngàn năm độc lập vững bền, là mốc son chói lọi trong lịch sử thế kỷ của dân tộc Việt Nam.',
    category: 'doc-lap'
  }
];

interface TimelineZoneProps {
  onNodeSelect?: (node: TimelineNode) => void;
  selectedNodeId?: string | null;
}

export default function TimelineZone({ onNodeSelect, selectedNodeId }: TimelineZoneProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Top Header Row from the Bold Typography Theme */}
      <div className="mb-6 px-1">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-[1px] w-6 bg-amber-500/50" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">BIÊN NIÊN SỬ DI SẢN</span>
        </div>
        <h3 className="text-base md:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
          HÀNH TRÌNH HỒ CHÍ MINH
        </h3>
        <p className="text-[11px] text-slate-400 font-sans mt-1">
          Dấu ấn các mốc lịch sử cốt lõi trong sự nghiệp của Người. Di chuyển con trỏ vào từng mốc để tự động mở rộng câu chuyện.
        </p>
      </div>

      {/* Vertical Timeline Linear Path with grid transitions */}
      <div className="relative flex-1 overflow-y-auto pr-1.5 custom-scrollbar pb-8 flex flex-col gap-5">
        {/* Glow Vertical Path Line */}
        <div className="absolute left-[15px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-amber-500/80 via-amber-500/30 to-transparent shadow-[0_0_8px_rgba(245,158,11,0.4)]" />

        {timelineData.map((event) => {
          const isHovered = hoveredId === event.id;
          const isSelected = selectedNodeId === event.id;
          const isActive = isHovered || isSelected;

          return (
            <div
              key={event.id}
              className="relative pl-10 group cursor-pointer"
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                if (onNodeSelect) {
                  // Cast event to TimelineNode
                  onNodeSelect({
                    id: event.id,
                    year: event.year,
                    title: event.title,
                    description: event.description,
                    photoUrl: event.image,
                    details: event.details || event.description,
                    category: event.category
                  });
                }
              }}
            >
              {/* Point Node on the Axis Path */}
              <div className="absolute left-[7px] top-4.5 w-4.5 h-4.5 flex items-center justify-center z-20">
                {/* Unique Concentric Rippling Outer Halo for soft golden glow */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.6,
                        ease: "easeOut"
                      }}
                      className="absolute w-4 h-4 rounded-full bg-amber-500/50 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
                
                {/* Tactile Core Node with subtle pulsing glow */}
                <motion.div 
                  animate={{
                    scale: isActive ? [1, 1.25, 1] : [1, 1.08, 1],
                    boxShadow: isActive 
                      ? [
                          "0 0 4px rgba(245, 158, 11, 0.4)",
                          "0 0 14px rgba(245, 158, 11, 0.75)",
                          "0 0 4px rgba(245, 158, 11, 0.4)"
                        ]
                      : [
                          "0 0 2px rgba(245, 158, 11, 0.15)",
                          "0 0 6px rgba(245, 158, 11, 0.35)",
                          "0 0 2px rgba(245, 158, 11, 0.15)"
                        ]
                  }}
                  transition={{
                    duration: isActive ? 1.8 : 2.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-4 h-4 border-2 flex items-center justify-center rounded-full transition-colors duration-300 ${
                    isActive 
                      ? 'bg-amber-400 border-amber-300' 
                      : 'bg-[#030B1E] border-amber-500/40'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute" />
                  )}
                </motion.div>
              </div>

              {/* Glassmorphism Story Card */}
              <div 
                className={`backdrop-blur-md border rounded-xl p-4 transition-all duration-500 transform ${
                  isActive 
                    ? 'bg-white/[0.08] border-amber-500/40 translate-x-1.5 shadow-[0_6px_25px_rgba(245,158,11,0.12),inset_0_1px_3px_rgba(255,255,255,0.05)]' 
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black tracking-widest text-[#f59e0b] font-mono bg-amber-500/10 px-2 py-0.5 rounded-md">
                    NĂM {event.year}
                  </span>
                  <span className="text-[9px] uppercase text-slate-400 font-mono tracking-wider flex items-center gap-1">
                    <Compass className="w-3 h-3 text-amber-500" />
                    BẢO TỒN SỐ
                  </span>
                </div>

                <h3 className="text-sm font-bold mt-2 text-white group-hover:text-amber-300 transition-colors">
                  {event.title}
                </h3>
                
                {/* Expand Area upon Hover/Click natively using CSS and motion.div for pristine spring/slide animations */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-3">
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
                          className="text-[11px] text-slate-300 leading-relaxed font-sans text-justify"
                        >
                          {event.description}
                        </motion.p>
                        
                        {/* Grayscale hover effects which restores to color upon interaction */}
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                          className="w-full h-28 rounded-lg overflow-hidden border border-white/10 relative bg-slate-950"
                        >
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700" 
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          <div className="absolute bottom-2 right-2 text-[9px] text-amber-400 flex items-center gap-1 font-mono">
                            <Eye className="w-3 h-3" /> CLICK XEM CHI TIẾT
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
