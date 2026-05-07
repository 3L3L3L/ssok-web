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

  // 🚀 휴대폰 인증 및 서버 전송 상태 변수들
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  // 📱 1. 인증번호 발송 요청 (ON/OFF 테스트 모드 지원)
  const handleSendCode = async () => {
    if (formPhone.length < 10) {
      alert("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }

    // 💡 환경변수 스위치: 테스트 모드일 때 (문자 비용 절감)
    if (process.env.NEXT_PUBLIC_USE_SMS_AUTH !== 'true') {
      setIsCodeSent(true);
      setVerifyCode('000000'); // 테스트용 번호 세팅
      alert('테스트 모드입니다. 인증번호 칸에 000000을 입력하거나 [인증확인]을 바로 눌러주세요.');
      return;
    }

    // 🔥 실제 운영 모드 (기존 앱 API 호출)
    try {
      const res = await fetch('https://ssok-app.vercel.app/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formPhone }),
      });
      if (res.ok) {
        setIsCodeSent(true);
        alert('인증번호가 발송되었습니다.');
      } else {
        alert('발송 실패. 번호를 다시 확인해주세요.');
      }
    } catch (e) {
      alert('발송 실패. 네트워크를 확인해주세요.');
    }
  };

  // 📱 2. 인증번호 검증
  const handleVerifyCode = async () => {
    // 💡 테스트 모드일 때
    if (process.env.NEXT_PUBLIC_USE_SMS_AUTH !== 'true') {
      if (verifyCode === '000000') {
        setIsVerified(true);
        alert('테스트 인증이 완료되었습니다.');
      } else {
        alert('인증번호가 일치하지 않습니다.');
      }
      return;
    }

    // 🔥 실제 운영 모드 검증
    setIsVerifying(true);
    try {
      const res = await fetch('https://ssok-app.vercel.app/api/verify-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formPhone, code: verifyCode }),
      });
      const data = await res.json();
      if (data.success) {
        setIsVerified(true);
        alert('본인 인증이 완료되었습니다!');
      } else {
        alert('인증번호가 일치하지 않습니다.');
      }
    } catch (e) {
      alert('검증 중 오류가 발생했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  // ✅ 3. 최종 제출 (Airtable 전송)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formName || !formAge || !formGender || !formPhone) {
      alert("필수 항목을 모두 입력해 주세요.");
      return;
    }
    if (!isVerified) {
      alert("휴대폰 번호 인증을 먼저 완료해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 기존 ssok-app 의 에어테이블 연동 API로 데이터 쏘기
      const res = await fetch('https://ssok-app.vercel.app/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          age: formAge,
          gender: formGender === '남성' ? 'male' : 'female', // 앱 백엔드 규격에 맞춤
          phone: formPhone,
          kakaoId: formKakao
        }),
      });

      if (res.ok) {
        alert("상담 신청이 완료되었습니다! 전담 매니저가 곧 연락드릴 예정입니다.");
        // 제출 완료 후 초기화 및 메인 이동
        setFormName(''); setFormAge(''); setFormGender(null); setFormPhone(''); setFormKakao('');
        setIsCodeSent(false); setVerifyCode(''); setIsVerified(false);
        navigateTo('home');
      } else {
        alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
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
  // 📝 내부 신청 폼(Form) 상세 페이지 (Airtable 연동)
  // ==========================================
  const renderApplyForm = () => (
    <div className="pt-36 pb-28 px-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-[#F0EBEB] shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A]"></div>
        <h2 className="text-[28px] md:text-[36px] font-black text-[#4A3B3D] text-center mb-10 leading-tight">
          매니저 상담을 위한<br />정보를 입력해 주세요.
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
              className="w-full p-4 rounded-xl border border-[#E5E0E0] bg-[#FAFAFA] focus:bg-white focus:border-[#FF2E63] outline-none transition-all placeholder:text-[#A69C9E]"
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
              className="w-full p-4 rounded-xl border border-[#E5E0E0] bg-[#FAFAFA] focus:bg-white focus:border-[#FF2E63] outline-none transition-all placeholder:text-[#A69C9E]"
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

          {/* 4. 휴대폰 번호 & 인증 시스템 */}
          <div>
            <label className="block text-[15px] font-bold text-[#4A3B3D] mb-3">휴대폰 번호 <span className="text-[#FF2E63]">*</span></label>
            <div className="flex gap-3 mb-3">
              <input 
                type="tel" 
                placeholder="010-0000-0000" 
                value={formPhone} 
                onChange={(e) => setFormPhone(e.target.value)}
                disabled={isVerified}
                className="flex-1 p-4 rounded-xl border border-[#E5E0E0] bg-[#FAFAFA] focus:bg-white focus:border-[#FF2E63] outline-none transition-all placeholder:text-[#A69C9E] disabled:bg-gray-100 disabled:text-gray-400"
              />
              <button 
                type="button" 
                onClick={handleSendCode}
                disabled={isVerified}
                className={`px-6 rounded-xl font-bold transition-colors shrink-0 ${isVerified ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#4A3B3D] text-white hover:bg-[#322729]'}`}
              >
                {isVerified ? "인증완료" : (isCodeSent ? "재발송" : "인증요청")}
              </button>
            </div>

            {/* 인증번호 입력 칸 */}
            {isCodeSent && !isVerified && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <input 
                  type="text" 
                  placeholder="인증번호 입력" 
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="flex-1 p-4 rounded-xl border border-[#FF2E63] bg-[#FFF0F2] text-[#FF2E63] font-bold outline-none placeholder:text-rose-300"
                />
                <button 
                  type="button" 
                  onClick={handleVerifyCode}
                  disabled={isVerifying}
                  className="px-6 rounded-xl bg-[#FF2E63] text-white font-bold hover:bg-[#E01E4D] transition-colors shrink-0 disabled:opacity-50"
                >
                  {isVerifying ? "확인중..." : "인증확인"}
                </button>
              </div>
            )}
            
            {/* 인증 완료 시 노출 */}
            {isVerified && (
              <p className="text-green-500 text-[13px] font-bold flex items-center mt-2 pl-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> 본인 인증이 완료되었습니다.
              </p>
            )}
          </div>

          {/* 5. 카카오톡 아이디 */}
          <div>
            <label className="block text-[15px] font-bold text-[#4A3B3D] mb-3">카카오톡 아이디 (선택)</label>
            <input 
              type="text" 
              placeholder="카톡 아이디 입력" 
              value={formKakao} 
              onChange={(e) => setFormKakao(e.target.value)}
              className="w-full p-4 rounded-xl border border-[#E5E0E0] bg-[#FAFAFA] focus:bg-white focus:border-[#FF2E63] outline-none transition-all placeholder:text-[#A69C9E]"
            />
          </div>

          {/* 제출 버튼 */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting || !isVerified}
              className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white py-5 rounded-xl text-[18px] font-black shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? "전송 중..." : "상담 신청 완료하기"}
            </button>
            <p className="text-center text-[#A69C9E] text-[13px] mt-4">
              입력하신 정보는 상담 목적으로만 사용되며, 외부에 절대 유출되지 않습니다.
            </p>
          </div>
        </form>
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

      {currentPage !== 'apply' && (
        <section className="py-28 bg-gradient-to-b from-[#FFF5F7] to-[#FFF0F2] text-center px-6 border-t border-[#FFF0F2]">
          <h2 className="text-[32px] md:text-[46px] font-black text-[#4A3B3D] mb-6 tracking-tight">리스크 없이, 진짜 인연을 만나세요</h2>
          <p className="text-[16px] md:text-[20px] text-[#8C7A7D] mb-12 font-medium">가입비 0원. 연애 코칭 전문가 팀이 지금 바로 1:1 상담을 도와드립니다.</p>
          <button onClick={() => navigateTo('apply')} className="bg-gradient-to-r from-[#4A3B3D] to-[#322729] text-white px-12 py-5 md:px-14 md:py-6 rounded-full text-[18px] md:text-[20px] font-bold shadow-2xl hover:-translate-y-1 transition-all">
            매니저 상담 신청하기
          </button>
        </section>
      )}

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