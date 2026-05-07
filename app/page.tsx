"use client";

import React, { useState, useEffect } from 'react';
import { 
  Heart, BadgeCheck, Sparkles, ArrowRight, Star, 
  CheckCircle2, Lock, ArrowLeft, ChevronDown,
  FileText, Building2, GraduationCap, UserCheck, Briefcase,
  CalendarClock, ShieldAlert, Wallet, RefreshCcw, Quote,
  EyeOff, UserSearch, ThumbsUp, CalendarRange, Cpu, Users,
  Zap, BellRing
} from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  // 📝 폼(Form) 상태 관리 변수들
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formGender, setFormGender] = useState<'남성' | '여성' | null>(null);
  const [formPhone, setFormPhone] = useState('');
  const [formKakao, setFormKakao] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formName || !formAge || !formGender || !formPhone) {
      alert("필수 항목을 모두 입력해 주세요.");
      return;
    }
    // TODO: 나중에 여기에 백엔드 서버로 데이터 보내는 코드 추가
    alert("상담 신청이 완료되었습니다! 전담 매니저가 곧 연락드릴 예정입니다.");
    navigateTo('home');
  };

  const reviews = [
    {
      name: "이OO 회원님", info: "30대 초반 / 전문직",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      text: "결정사의 기계적인 스펙 매칭에 지쳤었는데, 연애 코칭 경험이 풍부한 매니저분들이 배정되어 제 가치관을 완벽히 분석해주셨어요. 사진이 무분별하게 유출되지 않는다는 점이 제일 안심됐습니다."
    },
    {
      name: "김OO 회원님", info: "30대 중반 / IT 사업가",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      text: "사업하느라 바쁜데, 제 조건에 맞는 분을 찾는 이성에게만 선별해서 프로필을 제안해 주니 매칭 수락률이 체감상 훨씬 높습니다. 시간 낭비가 전혀 없네요."
    },
    {
      name: "박OO 회원님", info: "20대 후반 / 대기업 재직",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
      text: "불필요한 톡방 이동 없이, 저를 선택한 호감 알림부터 매칭 성사 결제까지 한 방에서 스무스하게 진행되는 마찰 없는 시스템이 정말 합리적이에요."
    },
    {
      name: "최OO 회원님", info: "30대 초반 / 공기업",
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150",
      text: "일상에 방해되지 않게 저와 딱 맞는 분이 있을 때만 프로필을 엄선해서 보내주어 피로감이 덜했습니다. VIP 매니저님이 등판하는 순간은 정말 서프라이즈였어요."
    },
    {
      name: "정OO 회원님", info: "30대 후반 / 금융권",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      text: "단순 알바생이 아니라 진짜 연애 전문가들이 1:1로 붙어주는 느낌이었습니다. 딱 저에게 필요한 타이밍에만 매니저가 소통해주어 심리적 부담이 전혀 없었습니다."
    }
  ];

  const faqs = [
    { q: "가입비나 매칭 비용은 어떻게 되나요?", a: "가입 및 프로필 검증, 매니저의 맞춤 큐레이션까지는 100% 무료입니다. 상호 호감이 확인되어 '실제 만남 약속'이 확정된 최종 시점에만 합리적인 매칭 비용이 발생합니다." },
    { q: "정말 제 사진이 다른 사람들에게 유출되지 않나요?", a: "네, 절대 불특정 다수에게 공개되지 않습니다. 담당 매니저가 회원님의 이상형 조건과 부합하는 소수의 검증된 분에게만 1:1로 정중하게 제안합니다." },
    { q: "연락을 바로바로 확인하기 힘든데 매칭 제안이 많이 오나요?", a: "걱정하지 않으셔도 됩니다. 회원님의 일상에 방해가 되지 않도록, 기계적인 대량 발송 대신 조건에 완벽히 부합하는 분이 있을 때만 엄선하여 프로필을 제안해 드립니다." },
    { q: "결제 후 상대방이 잠수타거나 안 나오면 어떡하나요?", a: "결제 후 약속 당일 노쇼(No-show)나 7일 내 상대방의 일방적인 잠수 등 정상적인 만남이 이루어지지 않을 경우, 전액 환불 또는 1회 무료 재매칭을 보장해 드립니다." },
  ];

  // ==========================================
  // 1️⃣ 메인 홈 화면
  // ==========================================
  const renderHome = () => (
    <div className="animate-in fade-in duration-500">
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
          기계적인 알고리즘이 아닙니다. 남녀의 심리를 완벽히 분석하는<br className="hidden md:block" />
          베테랑 연애 코칭 전문가 팀이 단계별로 협업하여 당신의 인연을 책임집니다.
        </p>
        <button onClick={() => navigateTo('apply')} className="bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white px-10 py-4 md:px-12 md:py-5 rounded-full text-[16px] md:text-[18px] font-bold shadow-[0_8px_25px_rgb(255,46,99,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center group w-full sm:w-auto">
          매니저 상담 신청하기
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

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

      <section className="py-24 bg-[#322729] text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <ShieldAlert className="w-14 h-14 text-[#FF2E63] mx-auto mb-6" />
          <h2 className="text-[32px] md:text-[46px] font-black tracking-tight mb-6">
            안심 보장제로<br className="md:hidden"/> <span className="text-[#FF2E63]">부담 없이 시작하세요.</span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-white/80 leading-[1.8] break-keep mb-16 max-w-2xl mx-auto font-medium">
            수백만 원의 선가입비만 챙기고 연락이 두절되는 결정사,<br className="hidden md:block"/>
            결제만 유도하고 유령 회원만 보여주는 데이팅 앱에 지치셨나요?<br/>
            SSOK은 고객의 불안감을 해소하는 <span className="text-white font-bold border-b border-[#FF2E63]">안전 장치</span>를 제공합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <Wallet className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-black text-[28px] mr-3 tracking-tighter leading-none">01</span>
                <span className="text-white font-black text-[22px] leading-none">가입비 0원</span>
              </div>
              <p className="text-white/70 text-[15.5px] leading-[1.7] break-keep">매니저 상담, 서류 검증, 이상형 분석, 그리고 프로필 제안까지. 만남을 결정하기 전까지의 모든 과정은 100% 무료입니다.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <Heart className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-black text-[28px] mr-3 tracking-tighter leading-none">02</span>
                <span className="text-white font-black text-[22px] leading-none">100% 후불제</span>
              </div>
              <p className="text-white/70 text-[15.5px] leading-[1.7] break-keep">상대방의 프로필을 확인하고 서로가 만남을 수락하여, '실제 약속'이 확정된 시점에만 합리적인 매칭 비용이 발생합니다.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <RefreshCcw className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-black text-[28px] mr-3 tracking-tighter leading-none">03</span>
                <span className="text-white font-black text-[22px] leading-none">환불/재매칭 보장</span>
              </div>
              <p className="text-white/70 text-[15.5px] leading-[1.7] break-keep">결제 후 7일 내 상대방의 일방적인 잠수, 약속 취소 등으로 무산될 경우 환불 또는 무료 재매칭을 보장합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}} />

      <section className="py-28 bg-[#FDFBFB] overflow-hidden border-b border-[#F0EBEB]">
        <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[12px] font-bold mb-4">
            <Lock className="w-3 h-3 mr-1.5" /> 프라이버시 보호를 위해 블러 처리되었습니다
          </div>
          <h2 className="text-[32px] md:text-[44px] font-black text-[#4A3B3D] tracking-tight mb-5">먼저 경험한 <span className="text-[#FF2E63]">회원들의 이야기</span></h2>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#FDFBFB] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#FDFBFB] to-transparent z-10 pointer-events-none"></div>
          <div className="animate-marquee gap-6 px-6">
            {[...reviews, ...reviews].map((review, idx) => (
              <div key={idx} className="w-[320px] md:w-[420px] shrink-0 bg-white p-8 md:p-10 rounded-[2rem] border border-[#F0EBEB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative whitespace-normal">
                <Quote className="absolute top-8 right-8 w-8 h-8 text-rose-100 rotate-180" />
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-rose-100 shrink-0">
                    <img src={review.img} alt="회원 사진" className="w-full h-full object-cover blur-[4px] scale-110" />
                  </div>
                  <div>
                    <div className="font-black text-[#4A3B3D] text-[18px]">{review.name}</div>
                    <div className="text-[#8C7A7D] text-[13px] font-bold mt-0.5">{review.info}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FF2E63] text-[#FF2E63]" />)}
                </div>
                <p className="text-[#4A3B3D] text-[15px] leading-[1.7] break-keep font-medium">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[32px] md:text-[44px] font-black text-[#4A3B3D] tracking-tight mb-5">연애 코칭 <span className="text-[#FF2E63]">전문가 팀</span>의 시너지</h2>
            <p className="text-[#8C7A7D] text-[16px] md:text-[18px]">수많은 남녀의 심리를 분석하고 성혼을 이끌어온 베테랑 전문가들이 당신의 매칭을 전담합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div onClick={() => navigateTo('verification')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer">
              <div>
                <BadgeCheck className="w-12 h-12 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[22px] md:text-[24px] font-black text-[#4A3B3D] mb-4 tracking-tight">STEP 1. 전담 안내 팀</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] md:text-[16px] mb-8 break-keep">초기 프로필 작성을 돕고, 상위 1% 서류 검증을 통과한 확실한 분들만 매칭 파이프라인으로 안전하게 인도합니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-4 rounded-xl font-bold flex items-center justify-center text-[16px] group-hover:bg-[#FF2E63] group-hover:text-white transition-colors">
                검증 시스템 자세히 보기 <ArrowRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div onClick={() => navigateTo('manager')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer">
              <div>
                <Heart className="w-12 h-12 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[22px] md:text-[24px] font-black text-[#4A3B3D] mb-4 tracking-tight">STEP 2. 맞춤 추천 팀</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] md:text-[16px] mb-8 break-keep">상대방이 회원님과 같은 스타일을 '이상형'으로 찾고 있을 때, 선제적으로 프로필을 분석하여 제안합니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-4 rounded-xl font-bold flex items-center justify-center text-[16px] group-hover:bg-[#FF2E63] group-hover:text-white transition-colors">
                매니저 시스템 자세히 보기 <ArrowRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div onClick={() => navigateTo('membership')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer">
              <div>
                <CalendarClock className="w-12 h-12 text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[22px] md:text-[24px] font-black text-[#4A3B3D] mb-4 tracking-tight">STEP 3. VIP 컨시어지</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] md:text-[16px] mb-8 break-keep">이성이 나를 콕 집어 선택한 결정적 순간, 연애 전문가가 서프라이즈 등판하여 가장 높은 수락률로 성사를 이끌어냅니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-4 rounded-xl font-bold flex items-center justify-center text-[16px] group-hover:bg-[#FF2E63] group-hover:text-white transition-colors">
                마찰 제로 프로세스 보기 <ArrowRight className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[44px] font-black text-[#4A3B3D] tracking-tight mb-5">자주 묻는 질문</h2>
            <p className="text-[#8C7A7D] text-[16px] md:text-[18px]">SSOK 서비스에 대해 궁금하신 점을 확인해 보세요.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#F0EBEB] rounded-2xl overflow-hidden transition-all duration-300">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-6 bg-[#FAFAFA] hover:bg-[#FFF5F7] transition-colors text-left">
                  <span className="font-bold text-[17px] text-[#4A3B3D] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-rose-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 bg-white text-[#8C7A7D] leading-[1.7] border-t border-[#F0EBEB] break-keep">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // ==========================================
  // 📝 신규: 내부 신청 폼(Form) 상세 페이지
  // ==========================================
  const renderApplyForm = () => (
    <div className="pt-36 pb-28 px-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-[#F0EBEB] shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <h2 className="text-[28px] md:text-[36px] font-black text-[#4A3B3D] text-center mb-10 leading-tight">
          상담을 위한 정보들<br />입력해 주세요.
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. 이름 */}
          <div>
            <label className="block text-[15px] font-bold text-[#4A3B3D] mb-3">이름 <span className="text-[#FF2E63]">*</span></label>
            <input 
              type="text" 
              placeholder="이름을 입력해주세요" 
              value={formName} 
              onChange={(e) => setFormName(e.target.value)}
              className="w-full p-4 rounded-xl border border-[#E5E0E0] bg-[#FAFAFA] focus:bg-white focus:border-[#FF2E63] focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-[#A69C9E]"
            />
          </div>

          {/* 2. 나이 */}
          <div>
            <label className="block text-[15px] font-bold text-[#4A3B3D] mb-3">나이 <span className="text-[#FF2E63]">*</span></label>
            <input 
              type="number" 
              placeholder="숫자만 입력 (예: 31)" 
              value={formAge} 
              onChange={(e) => setFormAge(e.target.value)}
              className="w-full p-4 rounded-xl border border-[#E5E0E0] bg-[#FAFAFA] focus:bg-white focus:border-[#FF2E63] focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-[#A69C9E]"
            />
          </div>

          {/* 3. 성별 */}
          <div>
            <label className="block text-[15px] font-bold text-[#4A3B3D] mb-3">성별 <span className="text-[#FF2E63]">*</span></label>
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setFormGender('남성')}
                className={`flex-1 py-4 rounded-xl font-bold border transition-all ${formGender === '남성' ? 'border-[#FF2E63] text-[#FF2E63] bg-[#FFF0F2]' : 'border-[#E5E0E0] text-[#A69C9E] bg-[#FAFAFA] hover:bg-white'}`}
              >
                남성
              </button>
              <button 
                type="button"
                onClick={() => setFormGender('여성')}
                className={`flex-1 py-4 rounded-xl font-bold border transition-all ${formGender === '여성' ? 'border-[#FF2E63] text-[#FF2E63] bg-[#FFF0F2]' : 'border-[#E5E0E0] text-[#A69C9E] bg-[#FAFAFA] hover:bg-white'}`}
              >
                여성
              </button>
            </div>
          </div>

          {/* 4. 휴대폰 번호 */}
          <div>
            <label className="block text-[15px] font-bold text-[#4A3B3D] mb-3">휴대폰 번호 <span className="text-[#FF2E63]">*</span></label>
            <div className="flex gap-3">
              <input 
                type="tel" 
                placeholder="010-0000-0000" 
                value={formPhone} 
                onChange={(e) => setFormPhone(e.target.value)}
                className="flex-1 p-4 rounded-xl border border-[#E5E0E0] bg-[#FAFAFA] focus:bg-white focus:border-[#FF2E63] focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-[#A69C9E]"
              />
              <button type="button" className="px-6 rounded-xl bg-[#4A3B3D] text-white font-bold hover:bg-[#322729] transition-colors shrink-0">
                인증요청
              </button>
            </div>
          </div>

          {/* 5. 카카오톡 아이디 */}
          <div>
            <label className="block text-[15px] font-bold text-[#4A3B3D] mb-3">카카오톡 아이디 (선택)</label>
            <input 
              type="text" 
              placeholder="카톡 아이디 입력" 
              value={formKakao} 
              onChange={(e) => setFormKakao(e.target.value)}
              className="w-full p-4 rounded-xl border border-[#E5E0E0] bg-[#FAFAFA] focus:bg-white focus:border-[#FF2E63] focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-[#A69C9E]"
            />
          </div>

          {/* 제출 버튼 */}
          <div className="pt-6">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white py-5 rounded-xl text-[18px] font-black shadow-lg hover:-translate-y-1 transition-all"
            >
              상담 신청 완료하기
            </button>
            <p className="text-center text-[#A69C9E] text-[13px] mt-4">
              입력하신 정보는 상담 목적으로만 사용되며, 외부에 절대 유출되지 않습니다.
            </p>
          </div>
        </form>
      </div>
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
          소개팅 앱의 허위 프로필, 결정사의 부풀려진 스펙에 지치셨나요?<br className="hidden md:block"/>
          SSOK 전담 매니저팀은 국가 발급 증명서와 사원증 등 법적 효력이 있는 서류만을 취급하여 가장 확실하고 안전한 만남을 시작합니다.
        </p>
      </div>
      <div className="bg-[#FAFAFA] border border-[#F0EBEB] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-24 shadow-sm">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <EyeOff className="w-10 h-10 text-rose-400" />
        </div>
        <div>
          <h3 className="font-black text-[#4A3B3D] text-[20px] md:text-[24px] mb-3">제출하신 서류는 즉시 영구 파기됩니다.</h3>
          <p className="text-[#8C7A7D] text-[15px] md:text-[16px] leading-[1.6] break-keep">
            SSOK은 회원의 개인정보 보호를 최우선으로 합니다. 검증을 위해 제출하신 모든 민감 서류는 전담 안내 매니저의 <span className="font-bold text-[#FF2E63]">확인 즉시 시스템에서 영구적으로 파기</span>되며, 외부로 절대 유출되지 않으니 안심하세요.
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-[2.5rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-rose-100 -translate-x-1/2"></div>
        {[
          { icon: <UserCheck className="w-6 h-6 text-white"/>, title: "01. 본인 및 혼인 여부 인증", desc: "통신사 본인 인증을 통한 실명 확인은 물론, 혼인관계증명서(상세)를 필수적으로 검토하여 법적으로 완벽한 싱글(미혼/돌싱)임을 교차 검증합니다." },
          { icon: <Briefcase className="w-6 h-6 text-white"/>, title: "02. 직장 및 직업 인증", desc: "명함만으로는 부족합니다. 사원증, 건강보험자격득실확인서, 재직증명서, 전문직 자격증명원 등 확실한 증빙 서류를 요구합니다." },
          { icon: <GraduationCap className="w-6 h-6 text-white"/>, title: "03. 학력 인증", desc: "대학교 또는 대학원의 졸업증명서 원본 서류를 통해 프로필에 기재된 학력의 진위 여부를 꼼꼼하게 대조합니다." },
          { icon: <Building2 className="w-6 h-6 text-white"/>, title: "04. 자산 및 소득 인증 (선택)", desc: "근로소득원천징수영수증, 부동산 등기부등본, 고급 차량등록증 등을 매니저에게 제출하여 '상위 1% 인증 배지'를 부여받을 수 있습니다." },
          { icon: <FileText className="w-6 h-6 text-white"/>, title: "05. 리드 확보 및 토스", desc: "서류와 인터뷰를 통과하면 가입이 완료되며, 매칭을 위해 곧바로 2단계 추천 전담 매니저에게 안전하게 바톤을 넘깁니다." }
        ].map((item, idx) => (
          <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between mb-16 last:mb-0 group">
            <div className={`w-full md:w-[45%] bg-white p-8 rounded-3xl border border-[#F0EBEB] shadow-sm hover:shadow-xl hover:border-rose-200 transition-all z-10 pl-24 md:pl-8 ${idx % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-3 md:text-left'}`}>
              <h3 className="font-black text-[20px] md:text-[22px] text-[#4A3B3D] mb-4">{item.title}</h3>
              <p className="text-[15.5px] md:text-[16px] text-[#8C7A7D] leading-[1.7] break-keep">{item.desc}</p>
            </div>
            <div className="absolute left-[2.5rem] md:left-1/2 top-8 md:top-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#FF2E63] to-[#FF5C8A] border-4 border-white shadow-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div className="hidden md:block w-[45%] md:order-2"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==========================================
  // 3️⃣ 매니저 시스템 상세 페이지
  // ==========================================
  const renderManager = () => (
    <div className="pt-36 pb-28 px-6 max-w-5xl mx-auto animate-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-1.5 bg-[#FFF0F2] text-[#FF2E63] rounded-full text-[13px] font-bold mb-6">
          <Heart className="w-4 h-4 mr-2" /> Expert Matchmaker System
        </div>
        <h1 className="text-[36px] md:text-[56px] font-black text-[#4A3B3D] leading-[1.2] mb-6 tracking-tight break-keep">
          기계는 사람의 마음을 읽을 수 없습니다.<br />
          <span className="text-[#FF2E63]">연애 코칭 전문가의 1:1 큐레이션</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#8C7A7D] leading-[1.7] break-keep font-medium max-w-2xl mx-auto">
          말투, 웃음소리, 연애 가치관, 살아온 환경까지.<br className="hidden md:block"/>
          수많은 성혼을 이끌어낸 베테랑 연애 전문가 팀이 내부 데이터베이스를 기반으로 완벽한 타겟팅 매칭을 진행합니다.
        </p>
      </div>

      <div className="bg-[#322729] rounded-[3rem] p-10 md:p-16 text-white mb-24 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="border-b md:border-b-0 md:border-r border-white/10 pb-10 md:pb-0 md:pr-12">
            <Zap className="w-12 h-12 text-[#FF2E63] mb-6" />
            <h3 className="text-[24px] font-black mb-4 text-white">👨 남성 고객: 즉각적인 알림</h3>
            <ul className="space-y-4 text-[16px] text-white/80 leading-relaxed break-keep">
              <li>회원님을 '선택(YES)'한 여성이 생기면, VIP 매니저가 즉시 연락을 드려 가장 빠른 매칭 소식을 전해드립니다. 기다림 없는 매칭을 경험하세요.</li>
            </ul>
          </div>
          <div className="pt-4 md:pt-0 md:pl-4">
            <BellRing className="w-12 h-12 text-[#FF2E63] mb-6" />
            <h3 className="text-[24px] font-black mb-4 text-white">👩 여성 고객: 프라이버시 맞춤 알림</h3>
            <ul className="space-y-4 text-[16px] text-white/80 leading-relaxed break-keep">
              <li>일상 중 무분별한 카톡 알람으로 인한 피로도를 막아드립니다. 조건에 맞는 분이 있을 때만 신중하게 선별하여 프로필을 전달해 드립니다.</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-[28px] md:text-[36px] font-black text-center text-[#4A3B3D] mb-12 tracking-tight">연애 전문가가 제공하는 3가지 VIP 케어</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#FAFAFA] p-10 rounded-[2rem] border border-[#F0EBEB] hover:-translate-y-2 transition-transform duration-300">
          <UserSearch className="w-12 h-12 text-rose-400 mb-6" />
          <h3 className="font-black text-[#4A3B3D] text-[22px] mb-4">"협업 타겟팅 큐레이션"</h3>
          <p className="text-[#8C7A7D] text-[15.5px] leading-[1.7] break-keep">단순한 무작위 전송이 아닙니다. 추천 매니저가 회원님과 완벽히 부합하는 조건을 가진 상대를 마스터 데이터로 분석하여 발송합니다.</p>
        </div>
        <div className="bg-[#FAFAFA] p-10 rounded-[2rem] border border-[#F0EBEB] hover:-translate-y-2 transition-transform duration-300">
          <ThumbsUp className="w-12 h-12 text-rose-400 mb-6" />
          <h3 className="font-black text-[#4A3B3D] text-[22px] mb-4">"거절의 부담 제로"</h3>
          <p className="text-[#8C7A7D] text-[15.5px] leading-[1.7] break-keep">프로필을 제안받고 거절하기 껄끄러우신가요? 제안, 수락, 거절의 모든 과정은 담당 매니저가 정중하게 대신하여 전달합니다.</p>
        </div>
        <div className="bg-[#FAFAFA] p-10 rounded-[2rem] border border-[#F0EBEB] hover:-translate-y-2 transition-transform duration-300">
          <CalendarRange className="w-12 h-12 text-rose-400 mb-6" />
          <h3 className="font-black text-[#4A3B3D] text-[22px] mb-4">"특수 클로징 컨시어지"</h3>
          <p className="text-[#8C7A7D] text-[15.5px] leading-[1.7] break-keep">서로 호감이 맞은 결정적 순간엔 VIP 전담 매니저가 등판하여 일정 조율과 만남 세팅을 완벽하게 마무리합니다.</p>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 4️⃣ 이용 안내 및 멤버십 상세 페이지
  // ==========================================
  const renderMembership = () => (
    <div className="pt-36 pb-28 px-6 max-w-5xl mx-auto animate-in slide-in-from-right-8 duration-500">
      <div className="inline-flex items-center px-4 py-1.5 bg-[#FFF0F2] text-[#FF2E63] rounded-full text-[13px] font-bold mb-8">
        SSOK Frictionless Process
      </div>
      <h1 className="text-[32px] md:text-[52px] font-black text-[#4A3B3D] leading-[1.2] mb-8 tracking-tight break-keep">
        마찰 제로 시스템,<br />
        <span className="text-[#FF2E63]">합리적인 VIP 멤버십</span>
      </h1>
      <p className="text-[16px] md:text-[18px] text-[#8C7A7D] mb-20 leading-[1.7] break-keep font-medium">
        가입비 명목으로 선결제를 요구하는 결혼정보회사와 다릅니다.<br className="hidden md:block"/>
        초기 가입 시 여러 명을 한꺼번에 친추하게 만드는 귀찮은 숙제 없이, 보상이 주어지는 순간에만 다음 단계로 이동합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {[
          { step: "STEP 01", title: "가입 유도 및 안내", desc: "안내 매니저의 도움을 받아 프로필을 작성합니다. 작성이 완료되면 곧바로 나에게 맞는 상대를 쏙 뽑아줄 '추천 전담 매니저' 단 1명만 연결해 드립니다." },
          { step: "STEP 02", title: "데일리 맞춤 큐레이션", desc: "추천 매니저가 매일 엄선된 프로필을 발송합니다. '아무나 보내는 게 아니라, 회원님 조건을 이상형으로 찾는 분'들만 발굴하여 제안합니다." },
          { step: "STEP 03", title: "결정적 순간, VIP 바톤터치", desc: "누군가 나를 직접 선택(YES)했다면? VIP 매니저가 흥분과 정중함을 담아 연결을 요청드리며 프로필을 즉시 오픈해 드립니다." },
          { step: "STEP 04", title: "방 이동 없는 듀얼 클로징", desc: "결제를 위해 번거롭게 다른 방으로 넘기지 않습니다. 마지막 'YES' 호감을 받아낸 매니저가 해당 톡방에서 즉시 과금 및 만남 일정을 조율합니다." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 md:p-10 rounded-3xl border border-[#F0EBEB] shadow-sm flex flex-col">
            <span className="text-[#FF2E63] font-black text-[14px] mb-3">{item.step}</span>
            <h3 className="font-bold text-[22px] text-[#4A3B3D] mb-4">{item.title}</h3>
            <p className="text-[#8C7A7D] text-[15px] md:text-[16px] leading-[1.6] break-keep">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#322729] p-10 md:p-16 rounded-[3rem] text-center text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF2E63]/20 rounded-full blur-2xl"></div>
        <ShieldAlert className="w-14 h-14 text-[#FF2E63] mx-auto mb-6 relative z-10" />
        <h3 className="font-black text-[24px] md:text-[34px] mb-6 relative z-10 tracking-tight">"만남 무산 시, 환불 및 재매칭 보장"</h3>
        <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.8] break-keep relative z-10">
          만남이 성사되어 결제를 완료하셨더라도 걱정하지 마세요.<br className="hidden md:block"/>
          결제 후 상대방의 일방적인 잠수, 당일 노쇼(No-show) 등<br className="hidden md:block"/>
          <span className="text-[#FF2E63] font-bold">정상적인 만남이 이루어지지 않았다면 환불 또는 무료 재매칭을 보장</span>합니다.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-[#222] font-sans selection:bg-rose-200">
      
      {/* 🧭 공통 네비게이션 바 */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 md:py-5' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {currentPage === 'home' ? (
            <div className="text-[24px] font-black text-[#FF2E63] tracking-tighter cursor-pointer" onClick={() => navigateTo('home')}>SSOK</div>
          ) : (
            <button onClick={() => navigateTo('home')} className="flex items-center text-[#4A3B3D] font-bold hover:text-[#FF2E63] transition-colors text-[16px]">
              <ArrowLeft className="w-5 h-5 mr-2" /> 메인으로
            </button>
          )}
          
          <button onClick={() => navigateTo('apply')} className="bg-[#4A3B3D] text-white px-6 py-3 rounded-full text-[14px] md:text-[15px] font-bold hover:bg-[#322729] transition-colors shadow-md">
            매니저 상담 신청
          </button>
        </div>
      </nav>

      {/* 동적 페이지 렌더링 */}
      {currentPage === 'home' && renderHome()}
      {currentPage === 'verification' && renderVerification()}
      {currentPage === 'manager' && renderManager()}
      {currentPage === 'membership' && renderMembership()}
      {currentPage === 'apply' && renderApplyForm()}

      {/* 🚀 전 페이지 공통 하단 유도 (신청 폼은 예외 처리) */}
      {currentPage !== 'apply' && (
        <section className="py-28 bg-gradient-to-b from-[#FFF5F7] to-[#FFF0F2] text-center px-6 border-t border-[#FFF0F2]">
          <h2 className="text-[32px] md:text-[46px] font-black text-[#4A3B3D] mb-6 tracking-tight">리스크 없이, 진짜 인연을 만나세요</h2>
          <p className="text-[16px] md:text-[20px] text-[#8C7A7D] mb-12 font-medium">가입비 0원. 연애 코칭 전문가 팀이 지금 바로 1:1 상담을 도와드립니다.</p>
          <button onClick={() => navigateTo('apply')} className="bg-gradient-to-r from-[#4A3B3D] to-[#322729] text-white px-12 py-5 md:px-14 md:py-6 rounded-full text-[18px] md:text-[20px] font-bold shadow-2xl hover:-translate-y-1 transition-all">
            매니저 상담 신청하기
          </button>
        </section>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#FAFAFA] pt-20 pb-28 md:pb-16 px-6 text-[#A69C9E] text-[14px] border-t border-[#F0EBEB]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-black text-[#FF2E63] text-[22px] mb-5">SSOK</h4>
            <p className="leading-[1.8] mb-4">상호명 : 폴리오(FOLIO) | 대표자 : 문민오<br />
            주소 : 서울특별시 구로구 오류로8길 57, 6층 601-209호 (대성빌딩)<br />
            사업자등록번호 : 630-05-03517<br />
            고객센터 : helpssok@gmail.com</p>
          </div>
          <div className="md:text-right flex flex-col md:items-end justify-center">
            <p className="text-[#D4B8BC] font-medium">Copyright © 폴리오(FOLIO). ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {/* 모바일 전용 하단 고정 신청 버튼 */}
      {currentPage !== 'apply' && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-[#F0EBEB] md:hidden z-50">
          <button onClick={() => navigateTo('apply')} className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white py-4 rounded-xl text-[16px] font-bold shadow-lg flex justify-center items-center">
            매니저 상담 신청하기
          </button>
        </div>
      )}

    </div>
  );
}