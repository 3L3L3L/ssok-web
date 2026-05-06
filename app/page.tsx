"use client";

import React, { useState, useEffect } from 'react';
import { 
  Heart, ShieldCheck, BadgeCheck, Sparkles, ArrowRight, Star, 
  ChevronDown, CheckCircle2, TrendingUp, Lock, ArrowLeft, 
  FileText, Building2, GraduationCap, UserCheck, Briefcase,
  CalendarClock, ShieldAlert, Wallet, RefreshCcw, Quote,
  EyeOff, UserSearch, ThumbsUp, CalendarRange, Cpu, Users,
  Zap, BellRing
} from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const goToApp = () => {
    window.open('https://ssok-app.vercel.app', '_blank');
  };

  const reviews = [
    {
      name: "이OO 회원님", info: "30대 초반 / 전문직",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      text: "결정사의 기계적인 스펙 매칭에 지쳤었는데, 단계별 전담 매니저분들이 제 가치관과 대화 코드를 정확히 파악해주셨어요. 무엇보다 제 사진이 유출되지 않는다는 점이 제일 안심됐습니다."
    },
    {
      name: "김OO 회원님", info: "30대 중반 / IT 사업가",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      text: "바쁜 일정 중에 매번 카톡을 확인하기 힘든데, 딱 필요한 순간에만 전담 매니저가 등판해서 매칭을 도와주니 효율적입니다. 지인 차단 기능 덕분에 마음 편히 이용 중입니다."
    },
    {
      name: "박OO 회원님", info: "20대 후반 / 대기업 재직",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
      text: "밤늦게 알람이 울리지 않고 딱 정해진 시간에만 호감을 확인할 수 있는 시스템이 정말 배려 깊다고 느꼈어요. VIP 매칭 단계에서의 세심한 케어는 결정사 그 이상입니다."
    },
    {
      name: "최OO 회원님", info: "30대 초반 / 공기업",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150",
      text: "일반 데이팅 앱은 가벼운 만남이 많아 꺼려졌는데, SSOK은 진지한 분들만 모여있어 신뢰가 갔습니다. 매니저님이 중간에서 조율해주시니 거절의 부담도 없고 너무 편안했어요."
    },
    {
      name: "정OO 회원님", info: "30대 후반 / 금융권",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      text: "철저한 신원 인증 시스템과 프라이빗한 진행 방식 덕분에 온전히 상대방과의 대화에만 집중할 수 있었습니다. 가입비 없이 이 정도 퀄리티의 소개를 받는다는 게 놀랍네요."
    }
  ];

  // ==========================================
  // 1️⃣ 메인 홈 화면
  // ==========================================
  const renderHome = () => (
    <div className="animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:pt-52 md:pb-40 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="inline-flex items-center px-4 py-2 bg-white border border-rose-100 text-[#FF2E63] rounded-full text-[13px] font-bold mb-8 shadow-sm tracking-wide">
          <Sparkles className="w-4 h-4 mr-2" /> V.I.P 하이엔드 프라이빗 매칭
        </div>
        <h1 className="text-[36px] md:text-[56px] font-black tracking-tight leading-[1.3] text-[#4A3B3D] mb-8 break-keep">
          가벼운 만남은 이제 그만.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#FF8FA3]">수준이 맞는 인연</span>을 만나세요.
        </h1>
        <p className="text-[16px] md:text-[20px] text-[#8C7A7D] max-w-2xl mx-auto mb-12 leading-[1.7] break-keep font-medium">
          단순한 자동 매칭이 아닙니다. 안내부터 큐레이션, VIP 매칭까지<br className="hidden md:block" />
          분야별 전문 매니저 팀이 협업하여 당신의 성공적인 인연을 설계합니다.
        </p>
        <button onClick={goToApp} className="bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white px-10 py-4 md:px-12 md:py-5 rounded-full text-[16px] md:text-[18px] font-bold shadow-[0_8px_25px_rgb(255,46,99,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center group w-full sm:w-auto">
          전담 팀 상담 신청하기
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* Target Audience */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] md:text-[40px] font-black text-center text-[#4A3B3D] mb-14 tracking-tight">이런 분들을 위해 만들었습니다</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              "데이팅 앱에 내 얼굴이 팔리는 게 싫으신 분",
              "직장/학교 지인을 마주칠까 봐 걱정되시는 분",
              "스펙뿐만 아니라 가치관, 결이 맞는 사람을 찾고 싶은 분",
              "결혼정보회사의 높은 가입비가 부담스러우신 분"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center bg-[#FAFAFA] p-6 rounded-2xl border border-[#F0EBEB]">
                <CheckCircle2 className="w-6 h-6 text-rose-400 shrink-0 mr-4" />
                <p className="text-[16px] md:text-[17px] font-bold text-[#4A3B3D] leading-snug break-keep">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSOK Guarantee (SOP 반영: 숫자 디자인 분리) */}
      <section className="py-24 bg-[#322729] text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <ShieldAlert className="w-14 h-14 text-[#FF2E63] mx-auto mb-6" />
          <h2 className="text-[32px] md:text-[46px] font-black tracking-tight mb-6">
            만남이 성사되지 않으면,<br className="md:hidden"/> <span className="text-[#FF2E63]">단 1원도 받지 않습니다.</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-white/80 leading-[1.8] break-keep mb-16 max-w-2xl mx-auto font-medium">
            SSOK은 고객의 불안감을 100% 해소하는 <span className="text-white font-bold border-b border-[#FF2E63]">안심 보장제</span>를 실시합니다.<br/>
            분야별 전문가들이 당신의 매칭을 성공시키기 위해 유기적으로 움직입니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <Wallet className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-black text-[32px] mr-3 tracking-tighter leading-none italic">01</span>
                <span className="text-white font-black text-[22px] leading-none">가입비 0원</span>
              </div>
              <p className="text-white/70 text-[15.5px] leading-[1.7] break-keep">매니저 상담, 서류 검증, 이상형 분석까지. 만남을 결정하기 전까지의 모든 과정은 100% 무료입니다.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <Heart className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-black text-[32px] mr-3 tracking-tighter leading-none italic">02</span>
                <span className="text-white font-black text-[22px] leading-none">완전 후불제</span>
              </div>
              <p className="text-white/70 text-[15.5px] leading-[1.7] break-keep">상호 호감이 확인되어 실제 만남 약속이 확정된 시점에만 합리적인 매칭 비용이 발생합니다.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <RefreshCcw className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-black text-[32px] mr-3 tracking-tighter leading-none italic">03</span>
                <span className="text-white font-black text-[22px] leading-none">100% 환불 보장</span>
              </div>
              <p className="text-white/70 text-[15.5px] leading-[1.7] break-keep">결제 후 상대방의 일방적 노쇼나 잠수 등으로 만남이 무산될 경우 무조건 100% 전액 환불을 보장합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}} />

      {/* Real Reviews (Marquee) */}
      <section className="py-28 bg-[#FDFBFB] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[12px] font-bold mb-4">
            <Lock className="w-3 h-3 mr-1.5" /> 프라이버시 보호를 위해 블러 처리되었습니다
          </div>
          <h2 className="text-[32px] md:text-[44px] font-black text-[#4A3B3D] tracking-tight mb-5">
            먼저 경험한 <span className="text-[#FF2E63]">회원들의 이야기</span>
          </h2>
        </div>

        <div className="relative w-full">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#FDFBFB] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#FDFBFB] to-transparent z-10 pointer-events-none"></div>
          <div className="animate-marquee gap-6 px-6">
            {[...reviews, ...reviews].map((review, idx) => (
              <div key={idx} className="w-[320px] md:w-[420px] shrink-0 bg-white p-8 md:p-10 rounded-[2rem] border border-[#F0EBEB] shadow-sm relative whitespace-normal">
                <Quote className="absolute top-8 right-8 w-8 h-8 text-rose-100 rotate-180" />
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-rose-100 shrink-0">
                    <img src={review.img} className="w-full h-full object-cover blur-[4px] scale-110" />
                  </div>
                  <div>
                    <div className="font-black text-[#4A3B3D] text-[18px]">{review.name}</div>
                    <div className="text-[#8C7A7D] text-[13px] font-bold mt-0.5">{review.info}</div>
                  </div>
                </div>
                <p className="text-[#4A3B3D] text-[15px] leading-[1.7] break-keep font-medium">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routing Cards (SOP 반영) */}
      <section className="py-28 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[32px] md:text-[44px] font-black text-[#4A3B3D] tracking-tight mb-5">
              분야별 <span className="text-[#FF2E63]">전문 매니저 팀</span>의 시너지
            </h2>
            <p className="text-[#8C7A7D] text-[16px] md:text-[18px]">한 명의 알바가 아닌, 각 단계별 전문가가 당신의 매칭을 전담합니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div onClick={() => navigateTo('verification')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
              <div>
                <BadgeCheck className="w-12 h-12 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[22px] md:text-[24px] font-black text-[#4A3B3D] mb-4">전담 가입/검증 팀</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] md:text-[16px] mb-8">상위 1% 신원 검증을 통과한 회원만 엄선하여 매칭 파이프라인으로 안전하게 인도합니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-4 rounded-xl font-bold flex items-center justify-center text-[16px] group-hover:bg-[#FF2E63] group-hover:text-white transition-all">
                검증 시스템 자세히 보기 <ArrowRight className="w-5 h-5 ml-1.5" />
              </div>
            </div>
            
            <div onClick={() => navigateTo('manager')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
              <div>
                <UserSearch className="w-12 h-12 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[22px] md:text-[24px] font-black text-[#4A3B3D] mb-4">매칭/큐레이션 팀</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] md:text-[16px] mb-8">이상형 분석 데이터를 기반으로 당신의 결에 맞는 상대를 선제적으로 발굴하여 제안합니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-4 rounded-xl font-bold flex items-center justify-center text-[16px] group-hover:bg-[#FF2E63] group-hover:text-white transition-all">
                매칭 시스템 자세히 보기 <ArrowRight className="w-5 h-5 ml-1.5" />
              </div>
            </div>
            
            <div onClick={() => navigateTo('membership')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between">
              <div>
                <Star className="w-12 h-12 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[22px] md:text-[24px] font-black text-[#4A3B3D] mb-4">VIP 전담 컨시어지</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] md:text-[16px] mb-8">상호 호감이 확인된 결정적 순간, VIP 매니저가 등판하여 최종 성사와 일정 조율을 담당합니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-4 rounded-xl font-bold flex items-center justify-center text-[16px] group-hover:bg-[#FF2E63] group-hover:text-white transition-all">
                이용 프로세스 확인 <ArrowRight className="w-5 h-5 ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // ==========================================
  // 2️⃣ 신원 검증 상세 페이지
  // ==========================================
  const renderVerification = () => (
    <div className="pt-36 pb-28 px-6 max-w-5xl mx-auto animate-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-1.5 bg-[#FFF0F2] text-[#FF2E63] rounded-full text-[13px] font-bold mb-6">
          <BadgeCheck className="w-4 h-4 mr-2" /> SSOK Trust System
        </div>
        <h1 className="text-[36px] md:text-[56px] font-black text-[#4A3B3D] leading-[1.2] mb-6 tracking-tight break-keep">
          단 하나의 거짓도 허용하지 않는<br />
          <span className="text-[#FF2E63]">상위 1% 철벽 검증 시스템</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#8C7A7D] leading-[1.7] break-keep font-medium max-w-2xl mx-auto">
          SSOK은 전담 가입 매니저가 국가 발급 증명서와 사원증 등 법적 효력이 있는 서류만을 취급하여 가장 확실하고 안전한 인연만을 주선합니다.
        </p>
      </div>

      <div className="bg-[#FAFAFA] border border-[#F0EBEB] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-24 shadow-sm">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <EyeOff className="w-10 h-10 text-rose-400" />
        </div>
        <div>
          <h3 className="font-black text-[#4A3B3D] text-[20px] md:text-[24px] mb-3">제출하신 서류는 즉시 영구 파기됩니다.</h3>
          <p className="text-[#8C7A7D] text-[15px] md:text-[16px] leading-[1.6] break-keep">
            SSOK은 회원의 개인정보 보호를 최우선으로 합니다. 검증 서류는 전담 매니저의 <span className="font-bold text-[#FF2E63]">확인 즉시 시스템에서 영구적으로 파기</span>됩니다.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[2.5rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-rose-100 -translate-x-1/2"></div>
        {[
          { icon: <UserCheck className="w-6 h-6 text-white"/>, title: "1. 본인 및 싱글 인증", desc: "통신사 본인 인증 및 혼인관계증명서 검토를 통해 법적으로 완벽한 싱글임을 교차 검증합니다." },
          { icon: <Briefcase className="w-6 h-6 text-white"/>, title: "2. 직장 및 직업 인증", desc: "사원증, 건강보험자격득실확인서, 재직증명서 등 확실한 서류로 현재 종사하는 직업을 검증합니다." },
          { icon: <GraduationCap className="w-6 h-6 text-white"/>, title: "3. 학력 인증", desc: "대학교 또는 대학원의 졸업증명서 원본 서류를 통해 기재된 학력의 진위를 대조합니다." },
          { icon: <Building2 className="w-6 h-6 text-white"/>, title: "4. 자산 및 소득 인증 (선택)", desc: "근로소득원천징수영수증, 부동산 등기부등본 등을 통해 '상위 1% 인증 배지'를 부여받을 수 있습니다." },
          { icon: <FileText className="w-6 h-6 text-white"/>, title: "5. 매니저 최종 인터뷰", desc: "서류 통과 후 전담 매니저의 최종 평가를 통해 가입 목적의 건전성과 매너를 확인합니다." }
        ].map((item, idx) => (
          <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between mb-16 last:mb-0 group">
            <div className={`w-full md:w-[45%] bg-white p-8 rounded-3xl border border-[#F0EBEB] shadow-sm hover:border-rose-200 transition-all z-10 pl-24 md:pl-8 ${idx % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-3 md:text-left'}`}>
              <h3 className="font-black text-[20px] md:text-[22px] text-[#4A3B3D] mb-4">{item.title}</h3>
              <p className="text-[15.5px] md:text-[16px] text-[#8C7A7D] leading-[1.7] break-keep">{item.desc}</p>
            </div>
            <div className="absolute left-[2.5rem] md:left-1/2 top-8 md:top-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#FF2E63] to-[#FF5C8A] border-4 border-white shadow-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20">
              {item.icon}
            </div>
            <div className="hidden md:block w-[45%] md:order-2"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==========================================
  // 3️⃣ 매니저 시스템 상세 페이지 (SOP 반영)
  // ==========================================
  const renderManager = () => (
    <div className="pt-36 pb-28 px-6 max-w-5xl mx-auto animate-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-1.5 bg-[#FFF0F2] text-[#FF2E63] rounded-full text-[13px] font-bold mb-6">
          <Heart className="w-4 h-4 mr-2" /> Specialized Matchmaker Team
        </div>
        <h1 className="text-[36px] md:text-[56px] font-black text-[#4A3B3D] leading-[1.2] mb-6 tracking-tight break-keep">
          기계는 사람의 결을 읽을 수 없습니다.<br />
          <span className="text-[#FF2E63]">단계별 페르소나 매니지먼트</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#8C7A7D] leading-[1.7] break-keep font-medium max-w-2xl mx-auto">
          안내부터 최종 성사까지, 당신의 성별과 상황에 최적화된<br/> 전문 매니저 팀이 유기적으로 당신의 인연을 책임집니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div className="bg-[#322729] p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
          <Zap className="w-12 h-12 text-[#FF2E63] mb-6" />
          <h3 className="text-[26px] font-black mb-4">남성 회원: 도파민 즉각 충전</h3>
          <p className="text-white/70 text-[16px] leading-[1.8] break-keep">
            기다림의 지루함을 없앴습니다. 나를 직접 선택(YES)한 여성이 생기면, VIP 전담 매니저가 **실시간으로 등판하여** 즉각적인 소식을 전해드립니다.
          </p>
        </div>
        <div className="bg-[#322729] p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
          <BellRing className="w-12 h-12 text-[#FF2E63] mb-6" />
          <h3 className="text-[26px] font-black mb-4">여성 회원: 8 PM 프라이버시</h3>
          <p className="text-white/70 text-[16px] leading-[1.8] break-keep">
            무분별한 알림에 피로를 느끼시나요? SSOK은 여성 회원님의 소중한 일상을 위해, 도착한 모든 호감을 모아 **매일 저녁 8시에만 일괄 발송**해 드립니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#FAFAFA] p-10 rounded-[2rem] border border-[#F0EBEB] shadow-sm">
          <UserPlus className="w-12 h-12 text-rose-400 mb-6" />
          <h3 className="font-black text-[#4A3B3D] text-[22px] mb-4">"1:1 초정밀 상담"</h3>
          <p className="text-[#8C7A7D] text-[15.5px] leading-[1.7] break-keep">안내 매니저가 당신의 취향과 가치관을 깊이 있게 파악하여 최적의 파이프라인으로 연결합니다.</p>
        </div>
        <div className="bg-[#FAFAFA] p-10 rounded-[2rem] border border-[#F0EBEB] shadow-sm">
          <ThumbsUp className="w-12 h-12 text-rose-400 mb-6" />
          <h3 className="font-black text-[#4A3B3D] text-[22px] mb-4">"거절 부담 제로"</h3>
          <p className="text-[#8C7A7D] text-[15.5px] leading-[1.7] break-keep">수락과 거절의 모든 과정은 담당 매니저가 정중하게 대신 전달하여 감정 소모가 전혀 없습니다.</p>
        </div>
        <div className="bg-[#FAFAFA] p-10 rounded-[2rem] border border-[#F0EBEB] shadow-sm">
          <CalendarRange className="w-12 h-12 text-rose-400 mb-6" />
          <h3 className="font-black text-[#4A3B3D] text-[22px] mb-4">"올인원 컨시어지"</h3>
          <p className="text-[#8C7A7D] text-[15.5px] leading-[1.7] break-keep">상호 호감 시 일정 조율부터 장소 예약까지 VIP 전담 팀이 비서처럼 완벽하게 세팅합니다.</p>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 4️⃣ 이용 안내 및 멤버십 상세 페이지 (SOP 반영)
  // ==========================================
  const renderMembership = () => (
    <div className="pt-36 pb-28 px-6 max-w-5xl mx-auto animate-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-20">
        <h1 className="text-[32px] md:text-[52px] font-black text-[#4A3B3D] mb-8 tracking-tight break-keep">
          마찰 제로 <span className="text-[#FF2E63]">이용 프로세스</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#8C7A7D] mb-20 leading-[1.7] break-keep font-medium">
          복잡한 가입 절차는 뺐습니다. 오직 보상이 주어지는 결정적 순간에만 다음 단계로 이동하는 SSOK만의 효율적인 시스템입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {[
          { step: "01", title: "가입 및 서류 검증", desc: "안내 매니저의 도움을 받아 프로필을 작성합니다. 검증 전까지 비용은 0원입니다." },
          { step: "02", title: "전담 큐레이션 매칭", desc: "추천 매니저가 데이터 기반으로 당신의 이상형 조건에 맞는 상대를 매일 선별해 발송합니다." },
          { step: "03", title: "VIP 호감 알림", desc: "상대방이 당신을 직접 선택했다면, VIP 매니저가 등판하여 특별 매칭을 진행합니다." },
          { step: "04", title: "성사 시에만 결제", desc: "상호 수락이 완료되어 실제 약속이 확정된 최종 단계에서만 결제가 발생합니다." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 md:p-10 rounded-3xl border border-[#F0EBEB] shadow-sm flex items-start">
            <span className="text-[#FF2E63] font-black text-[24px] mr-6 mt-1 italic">{item.step}</span>
            <div>
              <h3 className="font-bold text-[22px] text-[#4A3B3D] mb-3">{item.title}</h3>
              <p className="text-[#8C7A7D] text-[16px] leading-[1.6] break-keep">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#322729] p-10 md:p-16 rounded-[3rem] text-center text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF2E63]/20 rounded-full blur-2xl"></div>
        <ShieldAlert className="w-14 h-14 text-[#FF2E63] mx-auto mb-6 relative z-10" />
        <h3 className="font-black text-[24px] md:text-[34px] mb-6 relative z-10 tracking-tight">"성사되지 않으면 단 1원도 받지 않습니다."</h3>
        <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.8] break-keep relative z-10">
          약속 당일 상대방의 일방적인 노쇼나 잠수, 개인 사정으로 인한 취소 등<br className="hidden md:block"/>
          <span className="text-[#FF2E63] font-bold">정상적인 만남이 이루어지지 않았다면 100% 환불을 보장</span>합니다.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-[#222] font-sans selection:bg-rose-200">
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 md:py-5' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {currentPage === 'home' ? (
            <div className="text-[24px] font-black text-[#FF2E63] tracking-tighter cursor-pointer" onClick={() => navigateTo('home')}>SSOK</div>
          ) : (
            <button onClick={() => navigateTo('home')} className="flex items-center text-[#4A3B3D] font-bold hover:text-[#FF2E63] transition-colors text-[16px]">
              <ArrowLeft className="w-5 h-5 mr-2" /> 메인으로
            </button>
          )}
          <button onClick={goToApp} className="bg-[#4A3B3D] text-white px-6 py-3 rounded-full text-[14px] md:text-[15px] font-bold hover:bg-[#322729] transition-colors shadow-md">
            전담 팀 상담 신청
          </button>
        </div>
      </nav>

      {currentPage === 'home' && renderHome()}
      {currentPage === 'verification' && renderVerification()}
      {currentPage === 'manager' && renderManager()}
      {currentPage === 'membership' && renderMembership()}

      <section className="py-28 bg-gradient-to-b from-[#FFF5F7] to-[#FFF0F2] text-center px-6 border-t border-[#FFF0F2]">
        <h2 className="text-[32px] md:text-[46px] font-black text-[#4A3B3D] mb-6 tracking-tight">리스크 없이, 진짜 인연을 만나세요</h2>
        <p className="text-[16px] md:text-[20px] text-[#8C7A7D] mb-12 font-medium">가입비 0원. 분야별 전문가들이 당신의 인연을 위해 협업합니다.</p>
        <button onClick={goToApp} className="bg-gradient-to-r from-[#4A3B3D] to-[#322729] text-white px-12 py-5 md:px-14 md:py-6 rounded-full text-[18px] md:text-[20px] font-bold shadow-2xl hover:-translate-y-1 transition-all">
          SSOK 무료 가입 신청하기
        </button>
      </section>

      <footer className="w-full bg-[#FAFAFA] pt-20 pb-28 md:pb-16 px-6 text-[#A69C9E] text-[14px] border-t border-[#F0EBEB]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-black text-[#FF2E63] text-[22px] mb-5">SSOK</h4>
            <p className="leading-[1.8] mb-4">상호명 : 폴리오(FOLIO) | 대표자 : 문민오<br />
            주소 : 서울특별시 구로구 오류로8길 57, 6층 601-209호 (대성빌딩)<br />
            사업자등록번호 : 630-05-03517 | 고객센터 : helpssok@gmail.com</p>
          </div>
          <div className="md:text-right flex flex-col md:items-end justify-center">
            <p className="text-[#D4B8BC] font-medium">Copyright © 폴리오(FOLIO). ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-[#F0EBEB] md:hidden z-50">
        <button onClick={goToApp} className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white py-4 rounded-xl text-[16px] font-bold shadow-lg flex justify-center items-center">
          가입비 0원으로 시작하기
        </button>
      </div>
    </div>
  );
}