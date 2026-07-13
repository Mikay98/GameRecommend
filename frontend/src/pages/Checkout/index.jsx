// pages/Checkout/index.jsx — Checkout page with interactive 3D bank card mockup

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, CreditCard as CardIcon, Landmark, Truck, ArrowLeft, ArrowRight, ShoppingCart, Terminal } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export default function CheckoutPage() {
  const { items, cartTotal, purchaseCart } = useCart();

  // Order Code generated once on mount to avoid impurity warning
  const [orderCode] = useState(() => `GV${Math.floor(Math.random() * 90000) + 10000}`);

  // Form states
  const [fullName, setFullName] = useState('MINH KHOI');
  const [email, setEmail] = useState('minhkhoi@example.com');
  const [phone, setPhone] = useState('0987654321');
  const [address, setAddress] = useState('123 Duong Lang, Dong Da, Ha Noi');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod | bank | wallet

  // Interactive Card States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Order status
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const savings = items.reduce((acc, item) => {
    if (item.originalPrice) acc += item.originalPrice - item.price;
    return acc;
  }, 0);

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email không hợp lệ';
    if (!phone.trim() || phone.length < 9) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ nhận hàng';
    
    if (paymentMethod !== 'cod') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 12) {
        newErrors.cardNumber = 'Số thẻ/Tài khoản không hợp lệ';
      }
      if (!cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        newErrors.cardExpiry = 'Hạn dùng phải có dạng MM/YY';
      }
      if (!cardCvv.trim() || cardCvv.length < 3) {
        newErrors.cardCvv = 'CVV gồm 3 chữ số';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Execute context checkout logic
      purchaseCart();
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }
  };

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s?/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  // Format Expiration Date (adds slash after month)
  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length >= 2) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    } else {
      setCardExpiry(value);
    }
  };

  // Get Card theme classes based on payment method
  const getCardTheme = () => {
    switch (paymentMethod) {
      case 'bank':
        return 'bg-gradient-to-br from-[#E2A227] via-[#B87A14] to-[#7B4E04] text-white shadow-[0_10px_25px_rgba(226,162,39,0.3)] border border-[#FFD078]/20';
      case 'wallet':
        return 'bg-gradient-to-br from-[#1E88E5] via-[#1565C0] to-[#0D47A1] text-white shadow-[0_10px_25px_rgba(30,136,229,0.3)] border border-[#64B5F6]/20';
      case 'cod':
      default:
        return 'bg-gradient-to-br from-[#2E3C4E] via-[#1C2836] to-[#0F1923] text-text-primary shadow-[0_10px_25px_rgba(0,0,0,0.4)] border border-border-default/50';
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center py-32 gap-6 text-center px-6">
        <div className="w-20 h-20 border border-border-default bg-bg-surface flex items-center justify-center">
          <ShoppingCart size={32} className="text-text-dim" />
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-text-primary mb-2">Không tìm thấy đơn hàng</p>
          <p className="text-text-secondary text-sm">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
        </div>
        <Link to="/catalog"
          className="bg-accent-coral text-bg-deep font-display font-bold text-sm
                     tracking-widest px-6 py-3 hover:bg-accent-amber transition-colors">
          ĐẾN CỬA HÀNG
        </Link>
      </main>
    );
  }

  if (isSuccess) {
    return (
      <main className="flex-1 max-w-3xl mx-auto px-6 py-20 w-full text-center animate-fade-up animate-delay-1 relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-status-success/10 border border-status-success mb-6">
          <CheckCircle2 size={40} className="text-status-success animate-bounce-once" />
        </div>
        
        <h1 className="font-display text-4xl font-extrabold text-text-primary mb-4 tracking-tight">
          ĐẶT HÀNG THÀNH CÔNG!
        </h1>
        
        <p className="text-text-secondary text-base max-w-md mx-auto mb-8 leading-relaxed text-sm">
          Cảm ơn bạn đã mua hàng tại <span className="text-text-primary font-semibold">GameVault</span>. 
          Các tựa game đã mua đã được kích hoạt trực tiếp vào thư viện tài khoản của bạn.
        </p>

        <div className="border border-border-default bg-bg-surface p-6 text-left mb-10 relative">
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-status-success" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-status-success" />
          
          <p className="font-display text-[10px] tracking-widest text-text-dim mb-4 font-bold">
            <span className="text-accent-coral mr-2">//</span>THÔNG TIN NHẬN CODE & HÓA ĐƠN
          </p>
          <div className="grid gap-2.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-text-secondary">&gt; KHÁCH HÀNG:</span>
              <span className="font-semibold text-text-primary">{fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">&gt; EMAIL KÍCH HOẠT:</span>
              <span className="font-semibold text-text-primary">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">&gt; PHƯƠNG THỨC:</span>
              <span className="font-semibold text-accent-amber uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t border-border-default/40 pt-2 mt-1">
              <span className="text-text-secondary">&gt; MÃ GIAO DỊCH:</span>
              <span className="font-bold text-accent-coral">{orderCode}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/"
            className="bg-accent-coral text-bg-deep font-display font-bold text-xs
                       tracking-widest px-8 py-4 hover:bg-accent-amber transition-colors">
            TRANG CHỦ
          </Link>
          <Link to="/account?tab=history"
            className="border border-border-default text-text-secondary hover:border-accent-coral
                       hover:text-accent-coral font-display text-xs tracking-widest px-8 py-4 transition-colors">
            THƯ VIỆN GAME ĐÃ MUA
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full relative z-10">
      {/* Page Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link to="/cart" className="text-text-dim hover:text-accent-coral transition-colors p-1">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="font-display text-3xl font-extrabold text-text-primary tracking-tight">
          <span className="text-accent-coral text-sm tracking-widest mr-2">//</span>
          Thanh Toán
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="flex flex-col gap-6 animate-fade-up">
          
          {/* Section 1: Contact Info */}
          <div className="border border-border-default/80 bg-bg-surface p-6 relative">
            {/* Design anchor lines */}
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-border-default/60" />
            
            <h2 className="font-display text-base font-bold text-text-primary mb-5 flex items-center gap-2 tracking-wide">
              <span className="text-accent-coral font-display text-sm font-semibold">// 01</span>
              Thông tin khách hàng
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-display font-bold tracking-wider text-text-secondary mb-2 uppercase">
                  Họ và tên (chữ không dấu)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value.toUpperCase())}
                  placeholder="VD: NGUYEN VAN A"
                  className={`w-full border bg-bg-deep px-4 py-2.5 text-xs text-text-primary placeholder:text-text-dim focus:outline-none transition-colors font-mono
                             ${errors.fullName ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-coral'}`}
                />
                {errors.fullName && <span className="text-[10px] text-status-error mt-1 block font-mono">{errors.fullName}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-wider text-text-secondary mb-2 uppercase">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className={`w-full border bg-bg-deep px-4 py-2.5 text-xs text-text-primary placeholder:text-text-dim focus:outline-none transition-colors font-mono
                             ${errors.email ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-coral'}`}
                />
                {errors.email && <span className="text-[10px] text-status-error mt-1 block font-mono">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-wider text-text-secondary mb-2 uppercase">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0987xxxxxx"
                  className={`w-full border bg-bg-deep px-4 py-2.5 text-xs text-text-primary placeholder:text-text-dim focus:outline-none transition-colors font-mono
                             ${errors.phone ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-coral'}`}
                />
                {errors.phone && <span className="text-[10px] text-status-error mt-1 block font-mono">{errors.phone}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-display font-bold tracking-wider text-text-secondary mb-2 uppercase">
                  Địa chỉ nhận hóa đơn
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Số nhà, Tên đường, Quận/Huyện..."
                  className={`w-full border bg-bg-deep px-4 py-2.5 text-xs text-text-primary placeholder:text-text-dim focus:outline-none transition-colors font-mono
                             ${errors.address ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-coral'}`}
                />
                {errors.address && <span className="text-[10px] text-status-error mt-1 block font-mono">{errors.address}</span>}
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="border border-border-default/80 bg-bg-surface p-6 relative">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-border-default/60" />
            
            <h2 className="font-display text-base font-bold text-text-primary mb-5 flex items-center gap-2 tracking-wide">
              <span className="text-accent-amber font-display text-sm font-semibold">// 02</span>
              Phương thức thanh toán
            </h2>

            <div className="grid gap-3 mb-6">
              {/* COD */}
              <label className={`flex items-start gap-4 border p-4 cursor-pointer transition-all duration-300
                                ${paymentMethod === 'cod' ? 'border-accent-coral bg-accent-coral/5 shadow-[0_0_12px_rgba(255,107,74,0.15)]' : 'border-border-default bg-bg-deep hover:border-text-dim'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-accent-coral cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-display text-sm font-bold text-text-primary flex items-center gap-2 tracking-wide">
                    <Truck size={15} className="text-accent-coral" />
                    Thanh toán khi nhận hàng (COD)
                  </span>
                  <p className="text-xs text-text-secondary mt-1">
                    Nhận mã thẻ cào/code game giấy giao tận nơi qua bưu điện.
                  </p>
                </div>
              </label>

              {/* Bank Transfer */}
              <label className={`flex items-start gap-4 border p-4 cursor-pointer transition-all duration-300
                                ${paymentMethod === 'bank' ? 'border-accent-amber bg-accent-amber/5 shadow-[0_0_12px_rgba(255,184,48,0.15)]' : 'border-border-default bg-bg-deep hover:border-text-dim'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="mt-1 accent-accent-coral cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-display text-sm font-bold text-text-primary flex items-center gap-2 tracking-wide">
                    <Landmark size={15} className="text-accent-amber" />
                    Thẻ ngân hàng / Chuyển khoản trực tiếp
                  </span>
                  <p className="text-xs text-text-secondary mt-1">
                    Chuyển khoản quét QR nhanh. Code game sẽ được gửi qua email ngay lập tức.
                  </p>
                </div>
              </label>

              {/* E-wallet */}
              <label className={`flex items-start gap-4 border p-4 cursor-pointer transition-all duration-300
                                ${paymentMethod === 'wallet' ? 'border-accent-sky bg-accent-sky/5 shadow-[0_0_12px_rgba(56,189,248,0.15)]' : 'border-border-default bg-bg-deep hover:border-text-dim'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="mt-1 accent-accent-coral cursor-pointer"
                />
                <div className="flex-1">
                  <span className="font-display text-sm font-bold text-text-primary flex items-center gap-2 tracking-wide">
                    <CardIcon size={15} className="text-accent-sky" />
                    Ví điện tử (Momo / ZaloPay / AirPay)
                  </span>
                  <p className="text-xs text-text-secondary mt-1">
                    Thanh toán tức thời qua cổng liên kết ví điện tử tiện lợi.
                  </p>
                </div>
              </label>
            </div>

            {/* Interactive Card Input Fields (displayed when online payment is selected) */}
            {paymentMethod !== 'cod' && (
              <div className="border-t border-border-default/40 pt-5 mt-4 flex flex-col gap-4 animate-fade-up">
                <p className="font-display text-[10px] tracking-widest text-text-dim font-bold flex items-center gap-2">
                  <Terminal size={11} className="text-accent-sky" />
                  <span>// CẤU HÌNH THẺ THANH TOÁN ONLINE</span>
                </p>

                <div className="grid gap-4 sm:grid-cols-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[9px] font-display font-bold tracking-wider text-text-secondary mb-1.5 uppercase">
                      Số thẻ / Số tài khoản
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      placeholder="4000 1234 5678 9010"
                      className={`w-full border bg-bg-deep px-4 py-2.5 text-xs text-text-primary placeholder:text-text-dim focus:outline-none transition-colors font-mono
                                 ${errors.cardNumber ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-coral'}`}
                    />
                    {errors.cardNumber && <span className="text-[9px] text-status-error mt-1 block font-mono">{errors.cardNumber}</span>}
                  </div>

                  <div>
                    <label className="block text-[9px] font-display font-bold tracking-wider text-text-secondary mb-1.5 uppercase">
                      Hạn dùng (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      maxLength="5"
                      placeholder="12/29"
                      className={`w-full border bg-bg-deep px-4 py-2.5 text-xs text-text-primary placeholder:text-text-dim focus:outline-none transition-colors font-mono
                                 ${errors.cardExpiry ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-coral'}`}
                    />
                    {errors.cardExpiry && <span className="text-[9px] text-status-error mt-1 block font-mono">{errors.cardExpiry}</span>}
                  </div>

                  <div>
                    <label className="block text-[9px] font-display font-bold tracking-wider text-text-secondary mb-1.5 uppercase">
                      Mã CVV
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
                      maxLength="3"
                      placeholder="***"
                      className={`w-full border bg-bg-deep px-4 py-2.5 text-xs text-text-primary placeholder:text-text-dim focus:outline-none transition-colors font-mono
                                 ${errors.cardCvv ? 'border-status-error focus:border-status-error' : 'border-border-default focus:border-accent-coral'}`}
                    />
                    {errors.cardCvv && <span className="text-[9px] text-status-error mt-1 block font-mono">{errors.cardCvv}</span>}
                  </div>
                </div>
              </div>
            )}
            
            {/* Simulated Bank QR Code view */}
            {paymentMethod === 'bank' && (
              <div className="mt-5 border border-dashed border-border-default/60 p-4 flex flex-col sm:flex-row items-center gap-5 bg-bg-deep/50 animate-fade-up">
                {/* Simulated QR Code box */}
                <div className="w-24 h-24 border border-accent-amber p-1.5 shrink-0 bg-white flex items-center justify-center select-none">
                  {/* Styled block QR */}
                  <div className="w-full h-full bg-bg-deep grid grid-cols-4 grid-rows-4 gap-1 p-1">
                    <div className="bg-white"></div>
                    <div className="bg-white col-span-2"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white col-span-2"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white col-span-2"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white col-span-2"></div>
                  </div>
                </div>
                
                <div className="text-[11px] font-mono">
                  <p className="font-display font-semibold text-accent-amber uppercase mb-1.5 tracking-wider">
                    THÔNG TIN CHUYỂN KHOẢN NHANH
                  </p>
                  <p className="text-text-secondary">Ngân hàng: <strong className="text-text-primary">VIETCOMBANK</strong></p>
                  <p className="text-text-secondary">Số TK: <strong className="text-text-primary">1023456789</strong></p>
                  <p className="text-text-secondary">Nội dung CK: <strong className="text-accent-coral">{orderCode}</strong></p>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent-coral text-bg-deep font-display font-bold
                       text-xs tracking-widest py-4 hover:bg-accent-amber hover:shadow-[0_0_20px_rgba(255,107,74,0.4)] transition-all duration-300
                       flex items-center justify-center gap-2 cursor-pointer"
          >
            XÁC NHẬN ĐẶT HÀNG <ArrowRight size={16} />
          </button>
        </form>

        {/* Sidebar Summary + Interactive Card */}
        <aside className="animate-fade-up animate-delay-1 flex flex-col gap-6 self-start">
          
          {/* Interactive Credit Card Mockup */}
          <div className="perspective-1000">
            <div className={`w-full aspect-[1.58/1] p-5 flex flex-col justify-between font-mono transition-all duration-500 transform relative overflow-hidden shadow-2xl ${getCardTheme()}`}>
              {/* Card Hologram chip / Grid line Deco */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
              <div className="absolute top-[-20%] right-[-10%] w-36 h-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[10px] font-display tracking-widest font-extrabold uppercase opacity-80">
                  {paymentMethod === 'cod' ? 'GV PAY' : paymentMethod === 'bank' ? 'GV PLATINUM' : 'GV WALLET'}
                </span>
                {paymentMethod === 'bank' ? (
                  <Landmark size={20} className="text-accent-amber/90" />
                ) : (
                  <CardIcon size={20} className="text-accent-coral/95" />
                )}
              </div>

              {/* Chip Visual */}
              <div className="w-8 h-6 bg-gradient-to-r from-amber-300 to-amber-100 rounded-sm relative z-10 overflow-hidden opacity-90 border border-amber-500/20">
                <div className="absolute top-0 bottom-0 left-[30%] right-[30%] border-l border-r border-amber-800/30" />
                <div className="absolute left-0 right-0 top-[30%] bottom-[30%] border-t border-b border-amber-800/30" />
              </div>

              {/* Card Number */}
              <div className="text-sm font-semibold tracking-widest text-center my-1 relative z-10">
                {cardNumber || '•••• •••• •••• ••••'}
              </div>

              {/* Card Footer: Holder + Expiry */}
              <div className="flex justify-between items-end relative z-10">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[7px] text-text-secondary uppercase tracking-widest opacity-60">CHỦ THẺ</span>
                  <span className="text-[10px] font-bold tracking-wide truncate max-w-[150px] uppercase">
                    {fullName.trim() || 'YOUR NAME'}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[7px] text-text-secondary uppercase tracking-widest opacity-60">HẠN DÙNG</span>
                  <span className="text-[10px] font-bold tracking-wider">
                    {cardExpiry || 'MM/YY'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary sidebar */}
          <div className="border border-border-default/80 bg-bg-surface p-5 relative">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-border-default/60" />
            
            <p className="font-display text-sm font-bold text-text-primary mb-4 pb-3 border-b border-border-default/40 tracking-wide">
              <span className="text-accent-amber mr-2">//</span>
              ĐƠN HÀNG CỦA BẠN
            </p>

            <div className="flex flex-col gap-3 mb-5 max-h-52 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 text-xs py-1.5 border-b border-border-default/20 last:border-b-0">
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="w-7 h-9 object-cover border border-border-default"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-text-primary truncate">{item.title}</h4>
                    <span className="text-[10px] text-text-dim font-display">SL: 1</span>
                  </div>
                  <span className="font-display font-bold text-accent-amber self-center">
                    {item.price.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 text-xs border-t border-border-default/40 pt-4 font-mono">
              <div className="flex justify-between">
                <span className="text-text-secondary">&gt; Tạm tính:</span>
                <span className="font-medium text-text-primary">
                  {(cartTotal + savings).toLocaleString('vi-VN')}₫
                </span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between">
                  <span className="text-status-success">&gt; Giảm giá:</span>
                  <span className="font-bold text-status-success">
                    -{savings.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-secondary">&gt; Vận chuyển:</span>
                <span className="text-status-success font-display font-bold uppercase">MIỄN PHÍ</span>
              </div>
              
              <div className="border-t border-border-default/40 mt-2.5 pt-3 flex justify-between">
                <span className="font-display font-bold text-text-primary text-sm uppercase">Tổng cộng:</span>
                <span className="font-display text-base font-extrabold text-accent-amber [text-shadow:0_0_8px_rgba(255,184,48,0.15)]">
                  {cartTotal.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
