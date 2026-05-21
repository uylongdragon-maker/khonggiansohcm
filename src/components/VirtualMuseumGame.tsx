"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, 
  Info, 
  X, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Heart, 
  Award, 
  Sparkles, 
  Filter, 
  Lightbulb, 
  Eye, 
  Sun, 
  Snowflake,
  BookOpen
} from 'lucide-react';

// Cabinet Interface structure
interface Cabinet {
  id: string;
  name: string;
  category: string;
  type: 'relic' | 'daily' | 'book';
  description: string;
  image: string;
  year: string;
  source: string;
  dimensions: string;
  details: string[];
  xrayNote: string;
  infraNote: string;
}

export default function VirtualMuseumGame() {
  const [selectedCabinet, setSelectedCabinet] = useState<Cabinet | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Custom Interactive States for Cabinets
  const [cabinetLights, setCabinetLights] = useState<{[key: string]: 'warm' | 'cool'}>({
    'cab-trung-tam': 'warm',
    'cab-doc-bvat': 'warm',
    'cab-dep-cao-su': 'cool',
    'cab-nhat-ky-trong-tu': 'warm',
  });

  const [tributeCounts, setTributeCounts] = useState<{[key: string]: number}>({
    'cab-trung-tam': 1945,
    'cab-doc-bvat': 1969,
    'cab-dep-cao-su': 2026,
    'cab-nhat-ky-trong-tu': 1943,
  });

  const [activeTributeId, setActiveTributeId] = useState<string | null>(null);

  // Inspector Spectrograph state
  const [scanLayer, setScanLayer] = useState<'optical' | 'infra' | 'xray'>('optical');
  const [scanIntensity, setScanIntensity] = useState<number>(75);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Load tribute counts from localStorage if available
  useEffect(() => {
    try {
      const savedCount = localStorage.getItem('hcm_museum_tributes');
      if (savedCount) {
        setTributeCounts(JSON.parse(savedCount));
      }
    } catch (e) {
      console.warn("Storage parsing error", e);
    }
  }, []);

  const saveTributeCount = (updated: {[key: string]: number}) => {
    setTributeCounts(updated);
    try {
      localStorage.setItem('hcm_museum_tributes', JSON.stringify(updated));
    } catch (e) {
      console.warn("Saving error", e);
    }
  };

  const handleTribute = (id: string) => {
    const updated = {
      ...tributeCounts,
      [id]: tributeCounts[id] + 1
    };
    saveTributeCount(updated);
    
    // Play sweet tribute animation trigger
    setActiveTributeId(id);
    setTimeout(() => {
      setActiveTributeId(null);
    }, 1200);
  };

  const toggleLighting = (id: string) => {
    setCabinetLights(prev => ({
      ...prev,
      [id]: prev[id] === 'warm' ? 'cool' : 'warm'
    }));
  };

  // List of high-fidelity replica cabinets
  const cabinets: Cabinet[] = [
    {
      id: 'cab-trung-tam',
      name: 'Di sản tượng đồng chân dung Bác',
      category: 'Tượng thờ & Ảnh tư liệu',
      type: 'relic',
      description: 'Cụm tủ lớn trung tâm trang trọng trưng bày các bức tượng chân dung bằng đồng tạc họa dung mạo hiền từ, dung cảm của Chủ tịch Hồ Chí Minh tại các thời điểm lịch sử khác nhau, kèm các khung hình tư liệu gốc ghi lại hành trạng cách mạng hiển hách của Người.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/President_Ho_Chi_Minh_reading_the_Declaration_of_Independence_of_Vietnam.jpg',
      year: 'Thế kỷ XX (Đúc nghệ thuật phục dựng)',
      source: 'Khu Di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch',
      dimensions: 'Tượng đồng đặc tả tỷ lệ 1:1, bệ đỡ lập thể gỗ đặc',
      details: [
        'Bao gồm 3 bộ tượng bán thân đúc đồng đỏ nguyên chất bền bỉ.',
        'Chi tiết đặc tả nếp trán cao biểu trưng cho trí tuệ sáng láng của vĩ nhân.',
        'Kèm bản thảo gốc Tuyên ngôn Độc lập đọc ngày 2/9/1945.'
      ],
      xrayNote: 'Quét X-Ray mật độ kim loại đồng đều, không phát hiện rỗ khí bên trong thớ vật liệu, kỹ thuật đúc sáp ong truyền thống đạt độ tinh xảo cực cao.',
      infraNote: 'Bản đồ nhiệt độ bề mặt ổn định 24°C, bảo quản dưới kính chân không kiểm soát ẩm độ tối đa dưới 45%.'
    },
    {
      id: 'cab-doc-bvat',
      name: 'Kỷ vật viết lách & Sách báo di sản',
      category: 'Kỷ vật thiêng liêng',
      type: 'relic',
      description: 'Tủ kính đặt trưng bày trân quý các kỷ vật sinh thời gắn liền với hoạt động cứu nước vĩ đại và sự nghiệp báo chí chí công vô tư của Người: sách nghiên cứu chủ nghĩa yêu nước tự do, chiếc bút máy mực xanh thanh tao Bác ký những sắc lệnh lập quốc tối khẩn, và bộ trang phục kaki dung dị trường tồn.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Ho_Chi_Minh_1946.jpg', // Chân dung làm việc vĩ đại
      year: '1945 - 1969',
      source: 'Bảo tàng Lịch sử Quốc gia Việt Nam',
      dimensions: 'Bút máy kim loại 14cm, Sách báo in thạch bản xưa',
      details: [
        'Bút máy Parker ngòi vàng có khắc chữ tượng trưng cho ý chí cách mạng.',
        'Bản thảo báo Thanh niên viết bằng tay sắc nét từng đường nét mực sắc sảo.',
        'Tủ kín phun khí Nitơ khô khử trùng chống phân rã xơ cen-lu-lô.'
      ],
      xrayNote: 'Cơ cấu bơm xi-phông bình mực bút máy vẫn hoạt động nguyên vẹn, lò xo bằng thép không gỉ giữ nguyên tính đàn hồi gốc sau hơn 70 năm.',
      infraNote: 'Phát hiện tỳ vết hấp thụ quang phổ hồng ngoại ở nếp gấp sách báo biểu thị vết ố tự nhiên theo thời gian, chứng thực nguồn gốc cổ sử đích thực.'
    },
    {
      id: 'cab-dep-cao-su',
      name: 'Kỷ vật đôi dép cao su lịch sử',
      category: 'Đời sống thường nhật',
      type: 'daily',
      description: 'Đôi dép cao su huyền thoại được chế tác thủ công từ chiếc lốp xe máy bay của thực dân bị quân ta thu giữ trong chiến dịch Thu Đông năm 1947 tại Việt Bắc. Đôi dép dung dị gắn bó trung kiên theo gót chân Người trên vạn dặm hành quân sương gió.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Ho_Chi_Minh%27s_House_on_stilts.jpg', // Nhà sàn nơi lưu giữ hiện vật dép cao su
      year: 'Chế tạo từ năm 1947',
      source: 'Nhà sàn Phủ Chủ tịch',
      dimensions: 'Chất liệu cao su lưu hóa, quai bản ròng chống trượt',
      details: [
        'Được cắt thủ công từ lốp lình chiến lợi phẩm dẻo dai phi thường.',
        'Hệ thống quai ôm khít chắc chắn vững chãi qua đầm lầy, vách đá.',
        'Kỷ vật bất tử hóa lối sống tối giản bậc thầy của Chủ tịch nước.'
      ],
      xrayNote: 'Mật độ các lớp xơ thép dệt bên trong cốt lốp xe quân sự đạt độ liên kết dẻo 100%, bảo vệ dép tuyệt đối khỏi xé rách.',
      infraNote: 'Hồng ngoại quét cho thấy độ ẩm sợi xơ tự nhiên trong lòng dép cực thấp, các quai gài còn nguyên độ co giãn chịu lực.'
    },
    {
      id: 'cab-nhat-ky-trong-tu',
      name: 'Di cảo Nhật ký trong tù',
      category: 'Áng văn cách mạng vĩ đại',
      type: 'book',
      description: 'Tập thơ chữ Hán ngục trung nhật ký (Nhật ký trong tù) gồm 133 bài thơ hào sảng viết trong suốt những tháng ngày bị chính quyền Tưởng Giới Thạch giam giữ vô cớ tại các nhà lao Quảng Tây từ năm 1942 đến 1943. Áng văn thể hiện cốt cách thi nhân phi thường bất khuất của Người.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Nhat_ky_trong_tu_cover.jpg',
      year: '1942 - 1943 (Bản thảo viết tay gốc)',
      source: 'Bảo tàng Cách mạng Việt Nam',
      dimensions: 'Tập giấy bản tay đóng gáy chỉ thô cổ điển',
      details: [
        'Bản chép tay chữ Hán có nhiều tranh vẽ phác thảo nhỏ của Bác.',
        'Được chứng nhận là Bảo vật Quốc Gia tối thượng của dân tộc.',
        'Được lưu giữ trong tủ gia nhiệt vi mô thông minh kiểm soát độ ẩm 35%.'
      ],
      xrayNote: 'Sự phân bố mực muội than cổ của Trung Hoa trên thớ giấy bản lọt thấu mịn màng, dệt gáy sách thô bằng xơ đay bền chắc tuyệt hảo.',
      infraNote: 'Bước sóng hồng ngoại bắt trọn dấu mờ các nét vẽ chìm nhạt từng bị mài đè bên dưới trang giấy tả thực cảnh xích xiềng bóng tối lao tù khốc liệt.'
    }
  ];

  const filteredCabinets = activeFilter === 'all' 
    ? cabinets 
    : cabinets.filter(c => c.type === activeFilter);

  // Stimulate a scientific scan progress
  const runSpectralScan = (layer: 'optical' | 'infra' | 'xray') => {
    setIsScanning(true);
    setScanLayer(layer);
    
    // Auto reset scanning line sound visual behavior after 1 second
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#030712] rounded-3xl border-2 border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
      
      {/* 1. Header & Interactive HUD Telemetry Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest bg-emerald-950/55 px-2.5 py-1 rounded-md border border-emerald-500/30">
              TRỰC QUAN KHÔNG GIAN SỐ
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold font-sans text-amber-100 tracking-tight flex items-center gap-2">
            <Layers className="w-5.5 h-5.5 text-amber-500" />
            Hệ Thống Tủ Trưng Bày Hiện Vật
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-sans">
            Giao diện đã được khóa cố định trực quan để vận hành cuộn trang mượt mà. Ứng dụng kỹ nghệ trưng bày cao cấp, thay đổi hệ thống quang phổ tủ kính và kính thực tế ảo tri ân Bác.
          </p>
        </div>
        
        {/* Quick overall statistics */}
        <div className="bg-slate-950/80 p-3 rounded-2xl border border-white/10 flex items-center gap-3.5 max-w-xs shrink-0 self-start md:self-center">
          <Compass className="w-8 h-8 text-amber-500" />
          <div className="font-mono text-[10px]">
            <span className="text-slate-400 block uppercase font-bold tracking-wider">Hội trường số:</span>
            <span className="text-white font-bold text-xs">CĂN HỘ DI SẢN CHÒNG 04</span>
            <span className="text-amber-400 block mt-0.5">{cabinets.length} TỦ KÍNH CAO CẤP</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Navigation Filters inside Museum */}
      <div className="px-6 py-4 bg-slate-950/40 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'TẤT CẢ DI SẢN', icon: Layers },
            { id: 'relic', label: 'Ý CHÍ & KỶ VẬT', icon: Award },
            { id: 'daily', label: 'ĐỜI SỐNG THƯỜNG NHẬT', icon: Heart },
            { id: 'book', label: 'ÁNG VĂN BẤT HỦ', icon: BookOpen },
          ].map((btn) => {
            const Icon = btn.icon;
            const active = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-3.5 py-2 rounded-xl text-[10px] font-sans font-bold tracking-wider flex items-center gap-2 duration-300 pointer-events-auto cursor-pointer ${
                  active 
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.45)]' 
                    : 'bg-slate-900 text-slate-400 border border-white/5 hover:border-amber-500/30 hover:text-amber-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {btn.label}
              </button>
            );
          })}
        </div>

        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-amber-500" />
          <span>Lọc tìm kiếm nhanh tác phẩm di sản</span>
        </div>
      </div>

      {/* 3. Luxury Scrollable Showcase Hall */}
      <div className="p-6 overflow-y-auto max-h-[750px] space-y-6 custom-scrollbar bg-slate-950/10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
          {filteredCabinets.map((cab) => {
            const lightMode = cabinetLights[cab.id];
            const isTributing = activeTributeId === cab.id;
            
            return (
              <motion.div
                layout
                key={cab.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative bg-slate-900/90 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  lightMode === 'warm' 
                    ? 'border-amber-500/25 hover:border-amber-400 shadow-[0_8px_30px_rgba(217,119,6,0.06)] hover:shadow-[0_12px_40px_rgba(217,119,6,0.18)]' 
                    : 'border-blue-500/20 hover:border-blue-400 shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.18)]'
                }`}
              >
                
                {/* Showcase glass light header */}
                <div className={`p-4 flex justify-between items-center bg-slate-950/60 border-b border-white/5 relative z-10 ${
                  lightMode === 'warm' ? 'text-amber-300' : 'text-blue-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      lightMode === 'warm' ? 'bg-amber-400 animate-pulse' : 'bg-cyan-400'
                    }`} />
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest">
                      {cab.category}
                    </span>
                  </div>
                  
                  {/* Digital status display */}
                  <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-white/10 font-mono text-[9px] text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>BẢO QUẢN ĐẠT CHUẨN</span>
                  </div>
                </div>

                {/* Display Body */}
                <div className="p-4 flex-1 flex flex-col">
                  
                  {/* Realistic digital glass frame container */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center group mb-4">
                    
                    {/* The image inside glass shelf */}
                    <img
                      src={cab.image}
                      alt={cab.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Highly futuristic physical glass reflection overlays */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
                    <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                    
                    {/* Spotlight glow simulator overlay */}
                    <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
                      lightMode === 'warm' 
                        ? 'bg-amber-500/10 mix-blend-color-dodge shadow-[inset_0_0_30px_rgba(217,119,6,0.25)]' 
                        : 'bg-indigo-500/10 mix-blend-color-dodge shadow-[inset_0_0_30px_rgba(59,130,246,0.2)]'
                    }`} />

                    {/* Miniature physical indicator nodes on the glass */}
                    <div className="absolute top-2 left-2 flex gap-1 relative z-10">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono border ${
                        lightMode === 'warm' 
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/30' 
                          : 'bg-blue-950/80 text-blue-300 border-blue-500/30'
                      }`}>
                        {lightMode === 'warm' ? 'QUANG PHỔ ẤM CHÂN KHÔNG' : 'QUANG PHỔ UV KHỬ KHUẨN'}
                      </span>
                    </div>

                    {/* Tribute Floating pop heart animation */}
                    <AnimatePresence>
                      {isTributing && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={{ opacity: 1, scale: 1.5, y: -40 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 1 }}
                          className="absolute z-30 flex items-center justify-center pointer-events-none text-red-500"
                        >
                          <div className="relative">
                            <Heart className="w-12 h-12 fill-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                            <span className="absolute -top-3 text-[10px] font-mono font-extrabold text-white bg-red-600 px-1.5 py-0.5 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                              +1 Tri Ân
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Click zoom hint */}
                    <div 
                      onClick={() => setSelectedCabinet(cab)}
                      className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center backdrop-blur-[1px] cursor-pointer"
                    >
                      <span className="bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 shadow-[0_4px_12px_rgba(245,158,11,0.5)]">
                        <ZoomIn className="w-3.5 h-3.5" />
                        Mở Tủ Trưng Bày
                      </span>
                    </div>
                  </div>

                  {/* Cabinet Title & Metadata */}
                  <div className="mb-3.5">
                    <h3 className="text-sm font-extrabold text-amber-100 flex items-center gap-1.5 group-hover:text-amber-400 duration-200">
                      {cab.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-sans leading-relaxed text-justify">
                      {cab.description}
                    </p>
                  </div>

                  {/* Relic miniature specifications card */}
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 space-y-1 font-mono text-[9px] text-slate-400 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[8px] uppercase font-bold tracking-wider text-slate-500">Thời đại:</span>
                      <span className="text-white font-sans">{cab.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[8px] uppercase font-bold tracking-wider text-slate-500">Nơi lưu giữ cách mạng:</span>
                      <span className="text-amber-200 font-sans text-right max-w-[160px] truncate">{cab.source}</span>
                    </div>
                  </div>

                </div>

                {/* Cabinet bottom interactive footer actions bar */}
                <div className="p-3 bg-slate-950/80 border-t border-white/5 flex items-center justify-between gap-2.5 relative z-10">
                  
                  {/* Light source toggler action */}
                  <button
                    onClick={() => toggleLighting(cab.id)}
                    className="p-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white flex items-center gap-1 duration-200 text-[10px] pointer-events-auto cursor-pointer"
                    title="Thay đổi phổ ánh sáng bảo tồn tủ kính"
                  >
                    {lightMode === 'warm' ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">Phổ ấm</span>
                      </>
                    ) : (
                      <>
                        <Snowflake className="w-3.5 h-3.5 text-blue-400" />
                        <span className="hidden sm:inline">Phổ hàn</span>
                      </>
                    )}
                  </button>

                  {/* Double Tributing Buttons representing core values */}
                  <div className="flex items-center gap-2">
                    
                    {/* Heart tribute tribute counter */}
                    <button
                      onClick={() => handleTribute(cab.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-950/45 hover:bg-red-900/80 border border-red-500/30 hover:border-red-500 text-red-300 font-sans font-bold text-[10px] tracking-wide flex items-center gap-1.5 duration-200 pointer-events-auto cursor-pointer shadow-sm shadow-red-950"
                    >
                      <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400 animate-pulse" />
                      <span>Thắp hương tri ân</span>
                      <span className="bg-red-900/60 px-1.5 py-0.2 rounded text-[8px] font-mono text-white">
                        {tributeCounts[cab.id]}
                      </span>
                    </button>

                    {/* Pure detail interactive showcase trigger */}
                    <button
                      onClick={() => setSelectedCabinet(cab)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-sans font-extrabold text-[10px] tracking-wide flex items-center gap-1 duration-200 hover:bg-amber-400 pointer-events-auto cursor-pointer shadow-md"
                    >
                      <span>Xem cổ vật</span>
                      <ZoomIn className="w-3 h-3" />
                    </button>
                    
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 4. Telemetry Standard Footer */}
      <div className="w-full bg-slate-950/90 border-t border-white/5 py-3 px-6 flex items-center justify-between text-[10px] text-slate-400 pointer-events-none shrink-0 font-sans">
        <span className="flex items-center gap-1.5 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>HỘI TRƯỜNG ĐƯỢC BẢO VỆ CHỐNG RUNG LẮC - CUỘN TRANG THOẢI MÁI</span>
        </span>
        <span className="italic text-slate-500 hidden sm:inline">Thắp hương, dâng hoa kỹ thuật số tỏ lòng kính dâng Người</span>
      </div>

      {/* 5. Detailed Close-Up examination showcase Spectrograph Analyzer Modal */}
      <AnimatePresence>
        {selectedCabinet && (
          <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 relative shadow-[0_0_80px_rgba(245,158,11,0.2)] text-left my-8"
            >
              
              {/* Top panel closes */}
              <button 
                onClick={() => setSelectedCabinet(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-full duration-200 cursor-pointer flex items-center gap-1 text-xs"
              >
                <X className="w-4 h-4" /> Đóng
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono border border-amber-500/20">
                  {selectedCabinet.category}
                </span>
                <span className="text-[9px] bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider font-mono border border-purple-500/20">
                  HỆ PHỔ KÍNH UV-SPECTRA-V4
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-amber-400 flex items-center gap-1.5">
                <Award className="w-5.5 h-5.5 text-amber-400" />
                {selectedCabinet.name}
              </h2>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xl font-sans">
                Khai thác mô hình phân tích hồng ngoại và X-quang kết cấu để thấu triệt phương thức phục chế di sản văn hiến cách mạng Hồ Chí Minh.
              </p>

              {/* ----------------- CORE INTERACTIVE SPECTROGRAPH LAB ----------------- */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4.5">
                
                {/* Visualizer Display Box */}
                <div className="col-span-12 md:col-span-7 bg-slate-950 rounded-xl overflow-hidden border border-white/10 p-3 flex flex-col justify-between relative shadow-inner">
                  
                  <div className="relative h-56 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    
                    {/* Simulated Scanner Line Sweeping */}
                    {isScanning && (
                      <motion.div 
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,1)] z-20 pointer-events-none"
                      />
                    )}

                    {/* Optical Real Photo View */}
                    {scanLayer === 'optical' && (
                      <img 
                        src={selectedCabinet.image} 
                        alt={selectedCabinet.name}
                        className="w-full h-full object-cover transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Infrared Spectrum Analyzer Layer */}
                    {scanLayer === 'infra' && (
                      <div className="w-full h-full relative">
                        <img 
                          src={selectedCabinet.image} 
                          alt={selectedCabinet.name}
                          className="w-full h-full object-cover filter saturate-[2] hue-rotate-[140deg] contrast-[1.4] transition-opacity duration-300 pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-red-950/40 mix-blend-color pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 via-transparent to-red-500/20 pointer-events-none" />
                      </div>
                    )}

                    {/* X-Ray Structural Layer */}
                    {scanLayer === 'xray' && (
                      <div className="w-full h-full relative">
                        <img 
                          src={selectedCabinet.image} 
                          alt={selectedCabinet.name}
                          className="w-full h-full object-cover filter invert-[0.9] grayscale contrast-[2.2] transition-opacity duration-300 pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-indigo-950/50 mix-blend-screen pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/10 pointer-events-none" />
                      </div>
                    )}

                    {/* Overlay Grid lines resembling high tech laboratory scopes */}
                    <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
                    
                    {/* Spec scan metrics status */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
                      <span className="text-[8px] font-mono text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/30 uppercase tracking-widest">
                        LAYER: {scanLayer}
                      </span>
                      <span className="text-[8px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-white/10 uppercase">
                        RESOLUTION: {scanIntensity}%
                      </span>
                    </div>

                  </div>

                  {/* Adjust Scan Intensity Slider */}
                  <div className="mt-3 bg-slate-900 p-2 rounded-lg border border-white/5 flex items-center gap-3">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase shrink-0">Phân giải bảo tồn:</span>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={scanIntensity}
                      onChange={(e) => setScanIntensity(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-slate-950 rounded-lg cursor-pointer" 
                    />
                  </div>

                </div>

                {/* Scan Diagnostics Pane */}
                <div className="col-span-12 md:col-span-5 flex flex-col justify-between space-y-3">
                  
                  {/* Select Diagnostic Layer Button Group */}
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 space-y-2">
                    <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest font-extrabold block mb-1">Cấu hình quang phổ:</span>
                    
                    {[
                      { id: 'optical', label: 'Hình ảnh tháp thực', desc: 'Ảnh màu có độ nét cao 4K', icon: Eye },
                      { id: 'infra', label: 'Hồng ngoại nhiệt', desc: 'Bản đồ bảo tồn hữu cơ', icon: Sun },
                      { id: 'xray', label: 'X-Ray thấu thị', desc: 'Hệ thống composite kết cấu', icon: Sparkles }
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const active = scanLayer === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => runSpectralScan(opt.id as any)}
                          className={`w-full py-1.5 px-3 rounded-lg flex items-center gap-2.5 duration-200 text-left cursor-pointer border ${
                            active 
                              ? 'bg-amber-500/10 text-amber-200 border-amber-500/40 shadow-inner' 
                              : 'bg-slate-900/50 text-slate-400 border-transparent hover:border-white/5 hover:text-slate-200'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 duration-300 ${active ? 'text-amber-400 scale-110' : 'text-slate-500'}`} />
                          <div className="font-sans leading-tight">
                            <span className="text-[10px] font-bold block">{opt.label}</span>
                            <span className="text-[8px] text-slate-500 block">{opt.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Specific diagnostics details text outputting from sensor readings */}
                  <div className="bg-slate-950/90 p-3 rounded-xl border border-white/5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-bold block mb-1">Chẩn đoán thấu thị bảo vật:</span>
                      <p className="text-[10px] text-slate-300 leading-normal font-sans italic text-justify transition-all duration-300">
                        {scanLayer === 'optical' && "Hiện vật mô phỏng chân xác 100% tỷ lệ hình học và màu sắc sinh động, được kiểm định bởi Hội đồng Giám định Cổ vật di sản quốc gia Việt Nam."}
                        {scanLayer === 'infra' && selectedCabinet.infraNote}
                        {scanLayer === 'xray' && selectedCabinet.xrayNote}
                      </p>
                    </div>
                    
                    <div className="h-[1px] bg-white/5 my-2" />

                    <div className="flex items-center gap-1.5 text-[8px] text-white font-mono bg-slate-900/80 px-2 py-1 rounded inline-block self-start border border-white/5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>QUÉT KIỂM ĐỊNH HOÀN TẤT - OK</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Story outline & contextual bullets of President Ho Chi Minh */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 space-y-2.5 font-sans mb-5">
                <h4 className="text-xs font-bold text-amber-100 flex items-center gap-1.5 uppercase tracking-wide">
                  <Info className="w-4 h-4 text-amber-500" />
                  Hồ sơ tư liệu lịch sử di cảo:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed text-justify">
                  {selectedCabinet.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1.5 border-t border-white/5">
                  {selectedCabinet.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed text-justify">
                      <span className="text-amber-500 leading-none text-xs select-none mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-lg border border-white/5 space-y-1.5 font-mono text-[10px] text-slate-400">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Thời đại xuất phát:</span>
                  <span className="text-white font-sans font-bold text-right">{selectedCabinet.year}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Kích thước hiện vật:</span>
                  <span className="text-white font-sans text-right">{selectedCabinet.dimensions}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span>Nơi bảo quản gốc:</span>
                  <span className="text-amber-200 font-sans text-right">{selectedCabinet.source}</span>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => handleTribute(selectedCabinet.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-sans font-bold px-4 py-1.5 rounded-lg text-xs duration-200 pointer-events-auto cursor-pointer shadow-md inline-flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  Thắp hương tri ân Bác
                </button>
                <button
                  onClick={() => setSelectedCabinet(null)}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans font-extrabold px-4 py-1.5 rounded-lg text-xs duration-200 pointer-events-auto cursor-pointer shadow-md"
                >
                  Xác nhận tìm hiểu xong
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

