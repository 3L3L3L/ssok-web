"use client";

import React, { useState, useEffect } from 'react';
import { 
  Heart, BadgeCheck, Sparkles, ArrowRight, Star, 
  CheckCircle2, Lock, ArrowLeft, ChevronDown,
  FileText, Building2, GraduationCap, UserCheck, Briefcase,
  CalendarClock, ShieldAlert, Wallet, RefreshCcw, Quote,
  EyeOff, UserSearch, ThumbsUp, CalendarRange, Cpu, Users,
  Zap, BellRing, X
} from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  
  // 📜 약관 모달 상태
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

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
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      window.scrollTo(0, 0);
    }
    setCurrentPage(page);
  };

  // 📱 1. 인증번호 발송 요청
  const handleSendCode = async () => {
    if (formPhone.length < 10) {
      alert("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }
    if (process.env.NEXT_PUBLIC_USE_SMS_AUTH !== 'true') {
      setIsCodeSent(true);
      setVerifyCode('000000');
      alert('테스트 모드입니다. 인증번호 칸에 000000을 입력하거나 [인증확인]을 바로 눌러주세요.');
      return;
    }
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
    if (process.env.NEXT_PUBLIC_USE_SMS_AUTH !== 'true') {
      if (verifyCode === '000000') {
        setIsVerified(true);
        alert('테스트 인증이 완료되었습니다.');
      } else {
        alert('인증번호가 일치하지 않습니다.');
      }
      return;
    }
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
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          age: formAge,
          gender: formGender === '남성' ? 'male' : 'female',
          phone: formPhone,
          kakaoId: formKakao
        }),
      });
      if (res.ok) {
        alert("상담 신청이 완료되었습니다! 전담 매니저가 곧 연락드릴 예정입니다.");
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

  // 📜 약관 및 개인정보처리방침 텍스트 (상세 레퍼런스 반영)
  const termsText = `SSOK 서비스 이용약관

제1조 (목적)
본 이용약관은 폴리오(FOLIO)(이하 "회사")가 운영하는 V.I.P 프라이빗 매칭 서비스 SSOK(이하 "서비스")의 이용조건과 운영에 관한 제반 사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
① 회원 : 본 약관에 동의하고 개인정보를 제공하여 가입을 신청한 자로서, 회사의 엄격한 신원 검증 절차를 통과하여 서비스 이용 승낙을 받은 자를 말합니다.
② 매칭 : 회사가 회원의 성향과 조건을 분석하여 상호 간 프로필을 제안하고, 양측이 수락하여 연락처 교환 및 실제 만남이 이루어지는 과정을 말합니다.
③ 매니저 : 회원의 신원 검증, 프로필 큐레이션, 매칭 진행 및 일정 조율 등 서비스 전반을 1:1로 전담하여 지원하는 회사의 소속 또는 위탁 전문가를 말합니다.

제3조 (이용계약 체결 및 가입)
① 이용계약은 서비스를 이용하려는 자의 가입 신청 및 본 약관에 대한 동의와 회사의 서류 검증에 따른 이용 승낙으로 성립합니다.
② 가입 신청자는 회사가 요구하는 제반 정보 및 증빙 서류(혼인관계증명서, 재직증명서 등)를 진실하게 제공해야 합니다.
③ 타인의 정보를 도용하거나 허위 서류를 제출한 경우, 즉시 회원 자격이 박탈되며 관련 법령에 따라 민형사상 책임을 질 수 있습니다.

제4조 (서비스 이용 및 요금 결제)
① 본 서비스의 가입, 프로필 분석 및 매니저의 추천 프로필 제안까지의 과정은 전면 무료로 진행됩니다.
② 매칭 비용(요금)은 상호 프로필을 확인한 후 양측 모두 만남을 수락하여 '실제 만남 약속'이 확정되는 시점에만 청구되는 100% 후불제로 운영됩니다.

제5조 (취소 및 환불 보장)
① 결제 완료 후, 상대방의 일방적인 연락 두절(잠수), 약속 당일 무단 불참(노쇼) 등 상대방의 전적인 귀책사유로 인하여 정상적인 만남이 7일 이내에 이루어지지 않은 경우, 회사는 회원에게 매칭 비용 전액을 환불하거나 1회 무료 재매칭을 보장합니다.
② 단, 회원 본인의 귀책사유(단순 변심, 연락 두절, 비매너 행위 등)로 인해 만남이 무산된 경우에는 환불이 불가합니다.

제6조 (회원의 의무 및 서비스 이용 제한)
① 회원은 매칭 상대방에게 정중하고 예의 바른 태도를 유지해야 하며, 불쾌감을 주는 언행이나 스토킹, 과도한 개인정보 요구 등의 행위를 해서는 안 됩니다.
② 회원이 제1항의 의무를 위반하거나, 허위 정보 제공, 회사의 명예를 훼손하는 등 부적절한 행위를 한 경우 회사는 서비스 이용 제한, 영구 제명 및 손해배상을 청구할 수 있습니다.

제7조 (면책 조항)
① 회사는 회원이 제출한 서류의 진위 여부를 최선을 다해 검증하나, 회원이 고의로 위조·변조한 정보로 인해 발생한 문제나 상대방과의 만남 이후 발생하는 개인적인 분쟁에 대해서는 책임을 지지 않습니다.
② 회사는 천재지변, 서버 장애 등 불가항력적인 사유로 서비스가 중단된 경우 책임을 지지 않습니다.`;

  const privacyText = `SSOK 개인정보처리방침

폴리오(FOLIO)(이하 "회사")는 개인정보 보호법 제30조에 따라 회원의 개인정보를 보호하고 관련 고충을 신속하게 처리하기 위해 다음과 같이 개인정보 처리방침을 수립·공개합니다.

제1조 (개인정보의 처리목적)
회사는 다음의 목적을 위하여 개인정보를 처리합니다.
1. 회원 가입 및 관리: 회원 가입 의사 확인, V.I.P 철벽 신원 검증(본인 식별 및 혼인, 재직, 학력 등 확인), 서비스 부정이용 방지
2. 서비스 제공: 1:1 맞춤형 이성 프로필 큐레이션, 매칭 제안, 성사 시 연락처 교환, 요금 결제 및 정산
3. 고충 처리: 민원인의 신원 확인, 사실조사 및 결과 통보

제2조 (처리하는 개인정보 항목)
1. 필수항목: 이름, 나이, 성별, 휴대폰 번호
2. 선택항목: 카카오톡 아이디, 이상형 조건, 직업/학력/자산 증빙 서류 (가입 심사 목적)
3. 자동수집항목: IP 주소, 쿠키, 서비스 이용기록 등

제3조 (개인정보의 제3자 제공 및 공유 금지)
① 회사는 회원의 사전 동의 없이 불특정 다수(웹사이트, 오픈된 앱 공간 등)에게 프로필이나 사진을 절대 공개하지 않습니다.
② 매니저가 엄선한 매칭 상대방에게만 사전 동의를 거쳐 최소한의 큐레이션 정보가 제공되며, 개인 연락처는 양측이 매칭을 수락하고 결제가 완료된 이후에만 교환됩니다.
③ 회사는 원칙적으로 회원의 개인정보를 외부에 제공하지 않으나, 법령에 따른 관련 기관의 적법한 요청이 있는 경우는 예외로 합니다.

제4조 (민감 서류의 즉시 영구 파기)
회원의 직업, 학력, 혼인 여부 등을 증명하기 위해 제출된 모든 인증 서류 원본 및 사본은, 회사의 전담 매니저가 진위 여부 확인 및 심사를 완료한 즉시 회사의 서버 및 데이터베이스에서 '로우레벨포맷(Low Level Format)' 등의 방법으로 복구 불가능하게 영구 파기됩니다.

제5조 (개인정보의 처리 및 보유기간)
① 회사는 회원이 탈퇴를 요청하거나 개인정보 수집 및 이용 목적이 달성된 경우, 해당 정보를 지체 없이 파기합니다.
② 단, 다음의 정보에 대해서는 관계 법령에 따라 일정 기간 보존합니다.
- 계약 또는 청약철회, 대금결제 등에 관한 기록: 5년 (전자상거래법)
- 소비자 불만 또는 분쟁 처리에 관한 기록: 3년 (전자상거래법)

제6조 (정보주체의 권리와 그 행사 방법)
회원은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입 해지(동의 철회)를 요청할 수 있습니다. 개인정보 관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.

제7조 (개인정보 보호책임자)
회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 관련 불만 처리를 위하여 아래와 같이 보호책임자를 지정하고 있습니다.
- 상호명: 폴리오(FOLIO)
- 대표자: 문민오
- 이메일: helpssok@gmail.com`;

  // 팝업 렌더링
  const renderModal = () => {
    if (!modalType) return null;
    const isPrivacy = modalType === 'privacy';
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between p-6 border-b border-[#FFF0F2]">
            <h3 className="font-bold text-[#4A3B3D] text-[17px]">{isPrivacy ? '개인정보처리방침' : '서비스 이용약관'}</h3>
            <button onClick={() => setModalType(null)} className="p-1"><X className="w-5 h-5 text-[#A69C9E]" /></button>
          </div>
          <div className="p-6 overflow-y-auto text-[14px] text-[#8C7A7D] leading-relaxed whitespace-pre-wrap font-light">
            {isPrivacy ? privacyText : termsText}
          </div>
          <div className="p-5 bg-[#FAFAFA] border-t border-[#FFF0F2]">
            <button onClick={() => setModalType(null)} className="w-full py-4 bg-[#4A3B3D] text-white font-medium rounded-xl text-[15px] hover:bg-[#322729] transition-colors">확인했습니다</button>
          </div>
        </div>
      </div>
    );
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
    { q: "매칭 제안이 얼마나 자주 오나요?", a: "기계적인 대량 발송 대신 조건에 완벽히 부합하는 분이 있을 때만 엄선하여 (일 평균 0~3명) 신중하게 프로필을 제안해 드립니다." },
    { q: "상대방이 잠수타면 어떡하나요?", a: "결제 후 7일 내 상대방의 일방적인 잠수 등 정상적인 만남이 이루어지지 않을 경우, 전액 환불 또는 1회 무료 재매칭을 보장해 드립니다." },
  ];

  const targetAudiences = [
    { title: "Absolute Privacy", desc: "내 얼굴이 모르는 이들에게 노출되지 않는 프라이빗 매칭" },
    { title: "Zero Exposure", desc: "지인이나 직장 동료를 마주칠 걱정 없는 철저한 보안" },
    { title: "Value Matching", desc: "단순한 조건을 넘어 삶의 태도와 가치관이 일치하는 만남" },
    { title: "Reasonable Premium", desc: "결정사의 과도한 선불 비용 대신 합리적인 성과 중심 서비스" }
  ];

  // ==========================================
  // 1️⃣ 메인 홈 화면
  // ==========================================
  const renderHome = () => (
    <div className="animate-in fade-in duration-500">
      <section className="relative pt-36 pb-24 md:pt-52 md:pb-40 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-100/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="inline-flex items-center px-4 py-2 bg-white border border-rose-100 text-[#FF2E63] rounded-full text-[12px] font-medium mb-8 shadow-sm tracking-wide">
          <Sparkles className="w-4 h-4 mr-2" /> V.I.P 하이엔드 프라이빗 매칭
        </div>
        <h1 className="text-[34px] md:text-[52px] font-bold tracking-tight leading-[1.3] text-[#4A3B3D] mb-8 break-keep">
          가벼운 스와이프는 그만,<br />
          당신의 가치를 이해하는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#FF8FA3]">단 하나의 인연.</span>
        </h1>
        <p className="text-[16px] md:text-[19px] text-[#8C7A7D] max-w-2xl mx-auto mb-12 leading-[1.7] break-keep font-light">
          숫자로 표현되지 않는 분위기와 결까지 읽어내는 전문가 팀이,<br className="hidden md:block" />
          당신의 온전한 인연을 책임집니다.
        </p>
        <button onClick={() => navigateTo('apply')} className="bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white px-10 py-4 md:px-12 md:py-5 rounded-full text-[16px] md:text-[18px] font-medium shadow-[0_8px_25px_rgb(255,46,99,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center group w-full sm:w-auto">
          매니저 상담 신청하기
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[28px] md:text-[38px] font-bold text-center text-[#4A3B3D] mb-14 tracking-tight">이런 피로감에서 벗어나세요</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {targetAudiences.map((item, idx) => (
              <div key={idx} className="flex flex-col bg-[#FAFAFA] p-6 rounded-[1.5rem] border border-[#F0EBEB] min-h-[100px] justify-center transition-colors hover:border-rose-100">
                <div className="flex items-center mb-2.5">
                  <CheckCircle2 className="w-5 h-5 text-rose-300 mr-2 shrink-0" />
                  <span className="font-bold text-rose-400 text-[14px] tracking-wide">{item.title}</span>
                </div>
                <p className="text-[15.5px] md:text-[16.5px] font-medium text-[#4A3B3D] leading-[1.6] break-keep">
                  {item.desc}
                </p>
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
          <h2 className="text-[30px] md:text-[44px] font-bold tracking-tight mb-6">
            확신이 드는 순간 시작하세요.<br className="md:hidden"/> <span className="text-[#FF2E63]">가입비 0원 안심 보장제.</span>
          </h2>
          <p className="text-[15.5px] md:text-[17px] text-white/80 leading-[1.8] break-keep mb-16 max-w-2xl mx-auto font-light">
            수백만 원의 선가입비로 고객을 구속하지 않습니다.<br className="hidden md:block"/>
            상담부터 프로필 제안까지 전 과정은 0원입니다.<br className="hidden md:block"/>
            오직 서로의 마음이 닿은 순간에만 서비스의 가치를 지불하세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <Wallet className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-bold text-[28px] mr-3 tracking-tighter leading-none">01</span>
                <span className="text-white font-semibold text-[20px] leading-none">가입비 0원</span>
              </div>
              <p className="text-white/70 text-[15px] leading-[1.7] font-light break-keep">매니저 상담, 서류 검증, 이상형 분석, 그리고 프로필 제안까지. 만남을 결정하기 전까지의 모든 과정은 100% 무료입니다.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <Heart className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-bold text-[28px] mr-3 tracking-tighter leading-none">02</span>
                <span className="text-white font-semibold text-[20px] leading-none">100% 후불제</span>
              </div>
              <p className="text-white/70 text-[15px] leading-[1.7] font-light break-keep">상대방의 프로필을 확인하고 서로가 만남을 수락하여, '실제 약속'이 확정된 시점에만 합리적인 매칭 비용이 발생합니다.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
              <RefreshCcw className="w-10 h-10 text-[#FF2E63] mb-6" />
              <div className="flex items-center mb-4">
                <span className="text-[#FF2E63] font-bold text-[28px] mr-3 tracking-tighter leading-none">03</span>
                <span className="text-white font-semibold text-[20px] leading-none">환불/재매칭 보장</span>
              </div>
              <p className="text-white/70 text-[15px] leading-[1.7] font-light break-keep">결제 후 7일 내 상대방의 일방적인 잠수, 약속 취소 등으로 무산될 경우 환불 또는 무료 재매칭을 보장합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#FDFBFB] overflow-hidden border-b border-[#F0EBEB]">
        <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-[#8C7A7D] rounded-full text-[11px] font-medium mb-4">
            <Lock className="w-3 h-3 mr-1.5" /> 프라이버시 보호를 위해 블러 처리되었습니다
          </div>
          <h2 className="text-[30px] md:text-[42px] font-bold text-[#4A3B3D] tracking-tight mb-5">먼저 경험한 <span className="text-[#FF2E63]">회원들의 이야기</span></h2>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#FDFBFB] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#FDFBFB] to-transparent z-10 pointer-events-none"></div>
          <div className="animate-marquee gap-6 px-6">
            {[...reviews, ...reviews].map((review, idx) => (
              <div key={idx} className="w-[320px] md:w-[420px] shrink-0 bg-white p-8 md:p-10 rounded-[2rem] border border-[#F0EBEB] shadow-sm relative whitespace-normal">
                <Quote className="absolute top-8 right-8 w-8 h-8 text-rose-50 rotate-180" />
                <div className="flex items-center mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border border-rose-50 shrink-0">
                    <img src={review.img} alt="회원 사진" className="w-full h-full object-cover blur-[4px] scale-110" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#4A3B3D] text-[17px]">{review.name}</div>
                    <div className="text-[#8C7A7D] text-[12.5px] font-medium mt-0.5">{review.info}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#FF2E63] text-[#FF2E63]" />)}
                </div>
                <p className="text-[#4A3B3D] text-[15px] leading-[1.7] break-keep font-light">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[30px] md:text-[42px] font-bold text-[#4A3B3D] tracking-tight mb-5">전문가 팀의 <span className="text-[#FF2E63]">프리미엄 시너지</span></h2>
            <p className="text-[#8C7A7D] text-[16px] md:text-[18px] font-light">각 단계별 전문가가 모여 당신의 온전한 인연을 책임집니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div onClick={() => navigateTo('verification')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer">
              <div>
                <BadgeCheck className="w-10 h-10 text-rose-300 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#4A3B3D] mb-4 tracking-tight">STEP 1. 전담 안내 팀</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] mb-8 break-keep font-light">초기 프로필 작성을 돕고, 상위 1% 서류 검증을 통과한 확실한 분들만 매칭 파이프라인으로 안전하게 인도합니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-3.5 rounded-xl font-medium flex items-center justify-center text-[15px] group-hover:bg-[#FF2E63] group-hover:text-white transition-colors">
                검증 시스템 자세히 보기 <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div onClick={() => navigateTo('manager')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer">
              <div>
                <Heart className="w-10 h-10 text-rose-300 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#4A3B3D] mb-4 tracking-tight">STEP 2. 맞춤 추천 팀</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] mb-8 break-keep font-light">상대방이 회원님과 같은 스타일을 '이상형'으로 찾고 있을 때, 선제적으로 프로필을 분석하여 제안합니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-3.5 rounded-xl font-medium flex items-center justify-center text-[15px] group-hover:bg-[#FF2E63] group-hover:text-white transition-colors">
                전문가 시스템 자세히 보기 <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div onClick={() => navigateTo('membership')} className="bg-white rounded-[2rem] p-8 md:p-10 border border-[#F0EBEB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer">
              <div>
                <CalendarClock className="w-10 h-10 text-rose-300 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#4A3B3D] mb-4 tracking-tight">STEP 3. VIP 컨시어지</h3>
                <p className="text-[#8C7A7D] leading-[1.7] text-[15px] mb-8 break-keep font-light">이성이 나를 콕 집어 선택한 결정적 순간, 연애 전문가가 서프라이즈 등판하여 가장 높은 수락률로 성사를 이끌어냅니다.</p>
              </div>
              <div className="w-full bg-[#FFF5F7] text-[#FF2E63] py-3.5 rounded-xl font-medium flex items-center justify-center text-[15px] group-hover:bg-[#FF2E63] group-hover:text-white transition-colors">
                마찰 제로 프로세스 보기 <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[30px] md:text-[42px] font-bold text-[#4A3B3D] tracking-tight mb-5">자주 묻는 질문</h2>
            <p className="text-[#8C7A7D] text-[16px] md:text-[18px] font-light">SSOK 서비스에 대해 궁금하신 점을 확인해 보세요.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#F0EBEB] rounded-2xl overflow-hidden transition-all duration-300">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-6 bg-[#FAFAFA] hover:bg-[#FFF5F7] transition-colors text-left">
                  <span className="font-medium text-[16px] text-[#4A3B3D] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-rose-300 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 bg-white text-[#8C7A7D] leading-[1.7] border-t border-[#F0EBEB] break-keep font-light">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // ==========================================
  // 2️⃣ 신원 검증 상세 페이지 (Trust: 타협 없는 검증)
  // ==========================================
  const renderVerification = () => (
    <div className="pt-36 pb-28 px-6 max-w-5xl mx-auto animate-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-1.5 bg-[#FFF0F2] text-[#FF2E63] rounded-full text-[12px] font-medium mb-6">
          <BadgeCheck className="w-4 h-4 mr-2" /> SSOK Trust System
        </div>
        <h1 className="text-[34px] md:text-[52px] font-bold text-[#4A3B3D] leading-[1.3] mb-6 tracking-tight break-keep">
          신뢰를 넘어 확신으로,<br />
          <span className="text-[#FF2E63]">상위 1% 철벽 검증 시스템</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#8C7A7D] leading-[1.7] break-keep font-light max-w-2xl mx-auto">
          SSOK은 모호한 신원 확인을 거부합니다.<br className="hidden md:block"/>
          국가 발급 증명서와 재직 증빙 등 법적 효력을 가진 서류만을 기반으로,<br className="hidden md:block"/>
          가장 확실하고 안전한 인연의 장을 만듭니다.
        </p>
      </div>
      <div className="bg-[#FAFAFA] border border-[#F0EBEB] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-24 shadow-sm">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <EyeOff className="w-8 h-8 text-rose-300" />
        </div>
        <div>
          <h3 className="font-semibold text-[#4A3B3D] text-[19px] md:text-[22px] mb-3">제출하신 서류는 즉시 영구 파기됩니다.</h3>
          <p className="text-[#8C7A7D] text-[15px] md:text-[16px] leading-[1.6] break-keep font-light">
            SSOK은 회원의 개인정보 보호를 최우선으로 합니다. 검증을 위해 제출하신 모든 민감 서류는 전담 안내 매니저의 <span className="font-medium text-[#FF2E63]">확인 즉시 시스템에서 영구적으로 파기</span>되며, 외부로 절대 유출되지 않으니 안심하세요.
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-[2.5rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-rose-50 -translate-x-1/2"></div>
        {[
          { icon: <UserCheck className="w-5 h-5 text-white"/>, title: "01. 본인 및 혼인 여부 인증", desc: "통신사 본인 인증을 통한 실명 확인은 물론, 혼인관계증명서(상세)를 필수적으로 검토하여 법적으로 완벽한 싱글(미혼/돌싱)임을 교차 검증합니다." },
          { icon: <Briefcase className="w-5 h-5 text-white"/>, title: "02. 직장 및 직업 인증", desc: "명함만으로는 부족합니다. 사원증, 건강보험자격득실확인서, 재직증명서, 전문직 자격증명원 등 확실한 증빙 서류를 요구합니다." },
          { icon: <GraduationCap className="w-5 h-5 text-white"/>, title: "03. 학력 인증", desc: "대학교 또는 대학원의 졸업증명서 원본 서류를 통해 프로필에 기재된 학력의 진위 여부를 꼼꼼하게 대조합니다." },
          { icon: <Building2 className="w-5 h-5 text-white"/>, title: "04. 자산 및 소득 인증 (선택)", desc: "근로소득원천징수영수증, 부동산 등기부등본, 고급 차량등록증 등을 매니저에게 제출하여 '상위 1% 인증 배지'를 부여받을 수 있습니다." },
          { icon: <FileText className="w-5 h-5 text-white"/>, title: "05. 리드 확보 및 토스", desc: "서류와 인터뷰를 통과하면 가입이 완료되며, 매칭을 위해 곧바로 2단계 추천 전담 매니저에게 안전하게 바톤을 넘깁니다." }
        ].map((item, idx) => (
          <div key={idx} className="relative flex flex-col md:flex-row items-center justify-between mb-16 last:mb-0 group">
            <div className={`w-full md:w-[45%] bg-white p-8 rounded-[2rem] border border-[#F0EBEB] shadow-sm hover:shadow-md hover:border-rose-100 transition-all z-10 pl-24 md:pl-8 ${idx % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-3 md:text-left'}`}>
              <h3 className="font-semibold text-[19px] md:text-[21px] text-[#4A3B3D] mb-3">{item.title}</h3>
              <p className="text-[15px] text-[#8C7A7D] leading-[1.7] break-keep font-light">{item.desc}</p>
            </div>
            <div className="absolute left-[2.5rem] md:left-1/2 top-8 md:top-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-[#FF2E63] to-[#FF5C8A] border-[3px] border-white shadow-md flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div className="hidden md:block w-[45%] md:order-2"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==========================================
  // 3️⃣ 매니저 시스템 상세 페이지 (Expertise: 전문가의 영역)
  // ==========================================
  const renderManager = () => (
    <div className="pt-36 pb-28 px-6 max-w-5xl mx-auto animate-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-20">
        <div className="inline-flex items-center px-4 py-1.5 bg-[#FFF0F2] text-[#FF2E63] rounded-full text-[12px] font-medium mb-6">
          <Heart className="w-4 h-4 mr-2" /> Expert Matchmaker System
        </div>
        <h1 className="text-[34px] md:text-[52px] font-bold text-[#4A3B3D] leading-[1.3] mb-6 tracking-tight break-keep">
          알고리즘이 놓치는 1%의 온도까지,<br />
          <span className="text-[#FF2E63]">베테랑 매치메이커 1:1 큐레이션</span>
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#8C7A7D] leading-[1.7] break-keep font-light max-w-2xl mx-auto">
          데이터는 정보를 보지만, 전문가는 당신의 온도와 말투, 살아온 환경을 봅니다.<br className="hidden md:block"/>
          수많은 성혼을 이끌어낸 베테랑 팀이 당신에게 가장 '쏙' 맞는 상대를 직접 선별합니다.
        </p>
      </div>

      <div className="bg-[#322729] rounded-[3rem] p-10 md:p-16 text-white mb-24 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="border-b md:border-b-0 md:border-r border-white/10 pb-10 md:pb-0 md:pr-12">
            <Zap className="w-10 h-10 text-[#FF2E63] mb-6" />
            <h3 className="text-[22px] font-semibold mb-4 text-white">👨 남성 고객: 즉각적인 알림</h3>
            <ul className="space-y-4 text-[15px] text-white/70 leading-relaxed break-keep font-light">
              <li>회원님을 '선택(YES)'한 여성이 생기면, VIP 매니저가 즉시 연락을 드려 가장 빠른 매칭 소식을 전해드립니다. 기다림 없는 매칭을 경험하세요.</li>
            </ul>
          </div>
          <div className="pt-4 md:pt-0 md:pl-4">
            <BellRing className="w-10 h-10 text-[#FF2E63] mb-6" />
            <h3 className="text-[22px] font-semibold mb-4 text-white">👩 여성 고객: 프라이버시 맞춤 알림</h3>
            <ul className="space-y-4 text-[15px] text-white/70 leading-relaxed break-keep font-light">
              <li>일상 중 무분별한 카톡 알람으로 인한 피로도를 막아드립니다. 조건에 맞는 분이 있을 때만 신중하게 선별하여 프로필을 전달해 드립니다.</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-[26px] md:text-[36px] font-bold text-center text-[#4A3B3D] mb-12 tracking-tight">연애 전문가가 제공하는 3가지 VIP 케어</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#FAFAFA] p-8 md:p-10 rounded-[2rem] border border-[#F0EBEB] transition-all hover:border-rose-100">
          <UserSearch className="w-10 h-10 text-rose-300 mb-6" />
          <h3 className="font-semibold text-[#4A3B3D] text-[20px] mb-3">"협업 타겟팅 큐레이션"</h3>
          <p className="text-[#8C7A7D] text-[15px] leading-[1.7] break-keep font-light">단순한 무작위 전송이 아닙니다. 추천 매니저가 회원님과 완벽히 부합하는 조건을 가진 상대를 마스터 데이터로 분석하여 발송합니다.</p>
        </div>
        <div className="bg-[#FAFAFA] p-8 md:p-10 rounded-[2rem] border border-[#F0EBEB] transition-all hover:border-rose-100">
          <ThumbsUp className="w-10 h-10 text-rose-300 mb-6" />
          <h3 className="font-semibold text-[#4A3B3D] text-[20px] mb-3">"거절의 부담 제로"</h3>
          <p className="text-[#8C7A7D] text-[15px] leading-[1.7] break-keep font-light">프로필을 제안받고 거절하기 껄끄러우신가요? 제안, 수락, 거절의 모든 과정은 담당 매니저가 정중하게 대신하여 전달합니다.</p>
        </div>
        <div className="bg-[#FAFAFA] p-8 md:p-10 rounded-[2rem] border border-[#F0EBEB] transition-all hover:border-rose-100">
          <CalendarRange className="w-10 h-10 text-rose-300 mb-6" />
          <h3 className="font-semibold text-[#4A3B3D] text-[20px] mb-3">"특수 클로징 컨시어지"</h3>
          <p className="text-[#8C7A7D] text-[15px] leading-[1.7] break-keep font-light">서로 호감이 맞은 결정적 순간엔 VIP 전담 매니저가 등판하여 일정 조율과 만남 세팅을 완벽하게 마무리합니다.</p>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // 4️⃣ 이용 안내 및 멤버십 상세 페이지 (Process: 마찰 없는 경험)
  // ==========================================
  const renderMembership = () => (
    <div className="pt-36 pb-28 px-6 max-w-5xl mx-auto animate-in slide-in-from-right-8 duration-500">
      <div className="inline-flex items-center px-4 py-1.5 bg-[#FFF0F2] text-[#FF2E63] rounded-full text-[12px] font-medium mb-8">
        SSOK Frictionless Process
      </div>
      <h1 className="text-[34px] md:text-[52px] font-bold text-[#4A3B3D] leading-[1.3] mb-8 tracking-tight break-keep">
        불필요한 피로감은 빼고 설렘만 남겼습니다.<br />
        <span className="text-[#FF2E63]">VIP Frictionless 매칭 여정</span>
      </h1>
      <p className="text-[16px] md:text-[18px] text-[#8C7A7D] mb-20 leading-[1.7] break-keep font-light">
        가입비 명목으로 선결제를 요구하는 결혼정보회사와 다릅니다.<br className="hidden md:block"/>
        초기 가입 시 여러 명을 한꺼번에 친추하게 만드는 귀찮은 숙제 없이, 보상이 주어지는 순간에만 다음 단계로 이동합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {[
          { step: "STEP 01", title: "스마트 프로필 빌딩", desc: "전담 매니저의 가이드로 당신만의 매력을 정교하게 기록합니다. 완료 즉시, 당신의 취향을 완벽히 이해할 '전용 매치메이커'가 배정됩니다." },
          { step: "STEP 02", title: "데일리 맞춤 큐레이션", desc: "추천 매니저가 매일 엄선된 프로필을 발송합니다. '아무나 보내는 게 아니라, 회원님 조건을 이상형으로 찾는 분'들만 발굴하여 제안합니다." },
          { step: "STEP 03", title: "결정적 순간, VIP 바톤터치", desc: "누군가 나를 직접 선택(YES)했다면? VIP 매니저가 흥분과 정중함을 담아 연결을 요청드리며 프로필을 즉시 오픈해 드립니다." },
          { step: "STEP 04", title: "방 이동 없는 듀얼 클로징", desc: "결제를 위해 번거롭게 다른 방으로 넘기지 않습니다. 마지막 'YES' 호감을 받아낸 매니저가 해당 톡방에서 즉시 과금 및 만남 일정을 조율합니다." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#F0EBEB] shadow-sm flex flex-col">
            <span className="text-[#FF2E63] font-semibold text-[13px] tracking-wide mb-3">{item.step}</span>
            <h3 className="font-semibold text-[20px] text-[#4A3B3D] mb-3">{item.title}</h3>
            <p className="text-[#8C7A7D] text-[15px] leading-[1.6] break-keep font-light">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#322729] p-10 md:p-16 rounded-[3rem] text-center text-white shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF2E63]/20 rounded-full blur-2xl"></div>
        <ShieldAlert className="w-12 h-12 text-[#FF2E63] mx-auto mb-6 relative z-10" />
        <h3 className="font-semibold text-[24px] md:text-[34px] mb-6 relative z-10 tracking-tight">"만남 무산 시, 환불 및 재매칭 보장"</h3>
        <p className="text-white/80 text-[15.5px] md:text-[17px] leading-[1.8] break-keep relative z-10 font-light">
          만남이 성사되어 결제를 완료하셨더라도 걱정하지 마세요.<br className="hidden md:block"/>
          결제 후 상대방의 일방적인 잠수, 당일 노쇼(No-show) 등<br className="hidden md:block"/>
          <span className="text-[#FF2E63] font-medium">정상적인 만남이 이루어지지 않았다면 환불 또는 무료 재매칭을 보장</span>합니다.
        </p>
      </div>
    </div>
  );

  // ==========================================
  // 📝 내부 신청 폼(Form) 상세 페이지
  // ==========================================
  const renderApplyForm = () => (
    <div className="pt-40 pb-28 px-6 max-w-xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl shadow-rose-100/20 border border-rose-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A]"></div>
        <h2 className="text-[26px] md:text-[32px] font-semibold text-center mb-10 text-[#4A3B3D] leading-tight">
          매니저 상담을 위한<br />정보를 입력해 주세요.
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-[14px] font-medium text-[#4A3B3D] mb-2.5 ml-1">이름 <span className="text-[#FF2E63]">*</span></label>
            <input type="text" placeholder="이름을 입력해주세요" value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-rose-200 outline-none transition-all placeholder:text-[#A69C9E] font-light" />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#4A3B3D] mb-2.5 ml-1">나이 <span className="text-[#FF2E63]">*</span></label>
            <input type="number" placeholder="숫자만 입력 (예: 31)" value={formAge} onChange={(e) => setFormAge(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-rose-200 outline-none transition-all placeholder:text-[#A69C9E] font-light" />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#4A3B3D] mb-2.5 ml-1">성별 <span className="text-[#FF2E63]">*</span></label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setFormGender('남성')} className={`flex-1 py-4 rounded-2xl border transition-all font-medium text-[15px] ${formGender === '남성' ? 'border-rose-300 bg-rose-50 text-rose-500' : 'border-gray-100 bg-gray-50 text-gray-400 hover:bg-white'}`}>남성</button>
              <button type="button" onClick={() => setFormGender('여성')} className={`flex-1 py-4 rounded-2xl border transition-all font-medium text-[15px] ${formGender === '여성' ? 'border-rose-300 bg-rose-50 text-rose-500' : 'border-gray-100 bg-gray-50 text-gray-400 hover:bg-white'}`}>여성</button>
            </div>
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#4A3B3D] mb-2.5 ml-1">휴대폰 번호 <span className="text-[#FF2E63]">*</span></label>
            <div className="flex gap-2">
              <input type="tel" placeholder="010-0000-0000" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} disabled={isVerified} className="flex-1 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-rose-200 outline-none transition-all placeholder:text-[#A69C9E] disabled:bg-gray-100 disabled:text-gray-400 font-light" />
              <button type="button" onClick={handleSendCode} disabled={isVerified} className={`px-5 rounded-2xl text-[13px] font-medium transition-colors shrink-0 ${isVerified ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#4A3B3D] text-white hover:bg-[#322729]'}`}>
                {isVerified ? "인증완료" : (isCodeSent ? "재발송" : "인증요청")}
              </button>
            </div>
            {isCodeSent && !isVerified && (
              <div className="flex gap-2 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <input type="text" placeholder="인증번호 입력" value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} className="flex-1 p-4 rounded-2xl border border-rose-100 bg-rose-50/30 text-rose-500 font-medium outline-none placeholder:text-rose-200" />
                <button type="button" onClick={handleVerifyCode} disabled={isVerifying} className="px-5 rounded-2xl bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors shrink-0 disabled:opacity-50">
                  {isVerifying ? "확인중..." : "인증확인"}
                </button>
              </div>
            )}
            {isVerified && (
              <p className="text-emerald-500 text-[13px] font-medium flex items-center mt-3 pl-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> 본인 인증이 완료되었습니다.
              </p>
            )}
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#4A3B3D] mb-2.5 ml-1">카카오톡 아이디 (선택)</label>
            <input type="text" placeholder="카톡 아이디 입력" value={formKakao} onChange={(e) => setFormKakao(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-rose-200 outline-none transition-all placeholder:text-[#A69C9E] font-light" />
          </div>
          <div className="pt-6">
            <button type="submit" disabled={isSubmitting || !isVerified} className="w-full bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white py-4.5 rounded-2xl text-[17px] font-semibold shadow-lg shadow-rose-200 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none">
              {isSubmitting ? "전송 중..." : "상담 신청 완료하기"}
            </button>
            <p className="text-center text-[#A69C9E] text-[12px] mt-5 font-light">
              입력하신 정보는 상담 목적으로만 사용되며, 외부에 절대 유출되지 않습니다.
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-[#4A3B3D] selection:bg-rose-100 font-pretendard">
      {/* 💡 여리여리한 느낌을 위한 글로벌 폰트 스타일 주입 */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        .font-pretendard { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif; }
        body { letter-spacing: -0.02em; }
        h1, h2, h3 { letter-spacing: -0.03em; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 40s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}} />
      
      {renderModal()}

      {/* 네비게이션 */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {currentPage === 'home' ? (
            <div className="text-[22px] font-bold text-[#FF2E63] tracking-tighter cursor-pointer" onClick={() => navigateTo('home')}>SSOK</div>
          ) : (
            <button onClick={() => navigateTo('home')} className="flex items-center text-[#4A3B3D] font-semibold hover:text-[#FF2E63] transition-colors text-[15px]">
              <ArrowLeft className="w-5 h-5 mr-2" /> 메인으로
            </button>
          )}
          <button onClick={() => navigateTo('apply')} className="bg-[#4A3B3D] text-white px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-[#322729] transition-all">무료 상담 신청</button>
        </div>
      </nav>

      {/* 동적 페이지 렌더링 */}
      {currentPage === 'home' && renderHome()}
      {currentPage === 'verification' && renderVerification()}
      {currentPage === 'manager' && renderManager()}
      {currentPage === 'membership' && renderMembership()}
      {currentPage === 'apply' && renderApplyForm()}

      {/* 🚀 하단 유도 (신청 폼 화면일 땐 숨김) */}
      {currentPage !== 'apply' && (
        <section className="py-28 bg-gradient-to-b from-[#FFF5F7] to-[#FFF0F2] text-center px-6 border-t border-[#FFF0F2]">
          <h2 className="text-[30px] md:text-[42px] font-bold text-[#4A3B3D] mb-6 tracking-tight">리스크 없이, 진짜 인연을 만나세요</h2>
          <p className="text-[16px] md:text-[19px] text-[#8C7A7D] mb-12 font-light">가입비 0원. 연애 코칭 전문가 팀이 지금 바로 1:1 상담을 도와드립니다.</p>
          <button onClick={() => navigateTo('apply')} className="bg-gradient-to-r from-[#FF2E63] to-[#FF5C8A] text-white px-12 py-4.5 rounded-full text-[17px] font-semibold shadow-xl shadow-rose-200 hover:-translate-y-1 transition-all">
            매니저 상담 신청하기
          </button>
        </section>
      )}

      {/* Footer 및 약관 버튼 */}
      <footer className="w-full bg-[#FAFAFA] pt-20 pb-28 md:pb-16 px-6 text-[#A69C9E] text-[13px] border-t border-[#F0EBEB]">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="font-bold text-[#FF2E63] text-[20px] mb-5">SSOK</h4>
          <div className="leading-[1.8] font-light space-y-1 mb-8">
            <p>상호명 : 폴리오(FOLIO) | 대표자 : 문민오</p>
            <p>주소 : 서울특별시 구로구 오류로8길 57, 6층 601-209호 (대성빌딩)</p>
            <p>사업자등록번호 : 630-05-03517 | 고객센터 : helpssok@gmail.com</p>
            <p className="pt-3">Copyright © 폴리오(FOLIO). ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex justify-center gap-6 font-medium text-[#8C7A7D]">
            <button onClick={() => setModalType('terms')} className="hover:text-[#FF2E63] transition-colors underline underline-offset-4">이용약관</button>
            <button onClick={() => setModalType('privacy')} className="hover:text-[#FF2E63] transition-colors underline underline-offset-4">개인정보처리방침</button>
          </div>
        </div>
      </footer>

      {/* 모바일 하단 고정 신청 버튼 */}
      {currentPage !== 'apply' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md z-40 md:hidden">
          <button onClick={() => navigateTo('apply')} className="w-full bg-[#FF2E63] text-white py-4 rounded-2xl font-semibold shadow-2xl shadow-rose-300 animate-in slide-in-from-bottom-4">
            매니저 상담 신청하기
          </button>
        </div>
      )}

    </div>
  );
}