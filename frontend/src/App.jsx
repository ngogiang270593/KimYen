import { useEffect, useState } from 'react'

const defaults = {
  founded: 2004,
  dailyCapacity: '150–200 tấn/ngày',
  monthlyOutput: '5.000–6.000 tấn/tháng',
  specifications: [
    { value: '≥ 85%', label: 'Hàm lượng tinh bột' },
    { value: '≥ 93%', label: 'Độ trắng' },
    { value: '5–7', label: 'Độ pH' },
    { value: '≥ 750 BU', label: 'Độ nhớt' },
  ],
  email: 'kimyencompany.tn@gmail.com',
  phone: '+84 276 375 2851',
  phoneLink: '+842763752851',
}

const productionSteps = [
  { title: 'Tiếp nhận nguyên liệu', detail: 'Củ sắn được kiểm nhận và đưa vào khu vực sơ chế theo kế hoạch sản xuất.' },
  { title: 'Rửa và làm sạch', detail: 'Nguyên liệu được làm sạch để loại bỏ đất cát và tạp chất trước khi nghiền.' },
  { title: 'Nghiền và tách lọc', detail: 'Củ sắn được nghiền; hỗn hợp được xử lý để tách phần tinh bột khỏi xơ và bã.' },
  { title: 'Tách nước và sấy', detail: 'Tinh bột được tách nước, sau đó sấy để đạt độ khô phù hợp cho khâu hoàn thiện.' },
  { title: 'Hoàn thiện và đóng gói', detail: 'Thành phẩm được kiểm tra, đóng gói và chuẩn bị cho khâu lưu kho hoặc giao hàng.' },
]
function App() {
  const [info, setInfo] = useState(defaults)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeProcess, setActiveProcess] = useState(0)

  useEffect(() => {
    fetch('/api/site-info').then((response) => {
      if (!response.ok) throw new Error('API unavailable')
      return response.json()
    }).then(setInfo).catch(() => {})
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) return

    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  useEffect(() => {
    let frame = 0
    const updateHeader = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => { const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); document.documentElement.style.setProperty("--scroll-progress", String(Math.min(window.scrollY / maxScroll, 1))); setIsScrolled(window.scrollY > 48); })
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateHeader)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <>
    <a className="skip-link" href="#trang-chu">Chuyển đến nội dung</a><div className="scroll-progress" aria-hidden="true" />
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap bar">
        <a className="brand" href="#trang-chu" aria-label="Kim Yến, về đầu trang"><span className="brand-mark">K<span>Y</span></span><span className="brand-name">KIM YẾN<small>TINH BỘT SẮN</small></span></a>
        <button className="toggle" type="button" aria-expanded={menuOpen} aria-controls="menu" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
        <nav id="menu" aria-label="Điều hướng chính" hidden={!menuOpen}>
          <a href="#trang-chu" onClick={closeMenu}>Trang chủ</a><a href="#cau-chuyen" onClick={closeMenu}>Câu chuyện</a><a href="#san-pham" onClick={closeMenu}>Sản phẩm</a><a href="#nha-may" onClick={closeMenu}>Nhà máy</a><a href="#tuyen-dung" onClick={closeMenu}>Tuyển dụng</a><a className="nav-cta" href="#lien-he" onClick={closeMenu}>Kết nối <span>↗</span></a>
        </nav>
      </div>
    </header>
    <main>
      <section className="hero" id="trang-chu">
        <div className="hero-image" aria-hidden="true"><picture><source media="(max-width: 700px)" srcSet="/cu-san-mobile.webp" /><img src="/cu-san.webp" width="1600" height="900" fetchPriority="high" alt="" /></picture></div><div className="hero-shade" />
        <div className="wrap hero-inner"><div className="hero-copy" data-reveal="hero"><p className="eyebrow"><span /> NHÀ MÁY CHẾ BIẾN TINH BỘT SẮN</p><h1><span className="hero-title-line">Tinh hoa từ</span><span className="hero-title-line"><em>củ sắn Việt.</em></span></h1><p className="hero-lead">Từ nguồn nguyên liệu mộc mạc, Kim Yến tạo nên tinh bột sắn phục vụ những nhu cầu sản xuất đa dạng.</p><div className="hero-actions"><a className="button button-light" href="#san-pham">Khám phá sản phẩm <span>↗</span></a><a className="text-link" href="#cau-chuyen">Tìm hiểu Kim Yến <span>↓</span></a></div></div><div className="hero-note" data-reveal="hero-note"><span className="note-line" /><span>CHẾ BIẾN TINH BỘT SẮN<br /><b>KIM YẾN</b></span></div><div className="hero-index">01 <span>/</span> 05</div></div>
      </section>
      <section className="intro section wrap" id="cau-chuyen"><div className="section-kicker" data-reveal><span>01</span><span className="kicker-line" /><span>CÂU CHUYỆN KIM YẾN</span></div><div className="intro-grid" data-reveal><h2>Giá trị bền vững<br />từ điều <em>tự nhiên.</em></h2><div className="intro-copy"><p>Kim Yến hoạt động trong lĩnh vực chế biến tinh bột sắn, kết nối nguồn nguyên liệu nông nghiệp với nhu cầu sản xuất và thương mại.</p><p>Chúng tôi tin rằng sự tin cậy bắt đầu từ những điều căn bản: sản phẩm rõ nguồn gốc, trao đổi minh bạch và hợp tác lâu dài.</p><a className="arrow-link" href="#nha-may">Tìm hiểu về nhà máy <span>↗</span></a></div></div></section>
      <section className="product-section" id="san-pham"><div className="wrap product-layout section"><div className="product-heading" data-reveal><div className="section-kicker"><span>02</span><span className="kicker-line" /><span>SẢN PHẨM</span></div><p className="eyebrow dark">NGUYÊN LIỆU TỰ NHIÊN · ỨNG DỤNG LINH HOẠT</p><h2>Tinh bột sắn<br /><em>Kim Yến</em></h2><p>Tinh bột sắn được chế biến từ củ sắn (củ mì), phục vụ nhu cầu chế biến thực phẩm và các ứng dụng công nghiệp. Quy cách và chỉ tiêu cụ thể được trao đổi theo đơn hàng.</p><div className="spec-grid">{info.specifications.map((spec, index) => <div data-reveal="spec-card" style={{ "--reveal-delay": `${index * 90}ms` }} key={spec.label}><strong>{spec.value}</strong><span>{spec.label}</span></div>)}</div><a className="button button-dark" href="#lien-he">Trao đổi nhu cầu <span>↗</span></a></div>
        <div className="product-visual" data-reveal><img className="product-photo" src="/tinh-bot-san-kim-yen.jpg" width="724" height="483" loading="lazy" alt="Tinh bột sắn trắng trong bát gỗ cùng củ sắn tươi" /><div className="visual-caption"><span>01 / NGUYÊN LIỆU</span><span>CỦ SẮN</span></div></div></div></section>
      <section className="process-section" aria-labelledby="process-title"><div className="wrap process-wrap"><div className="process-heading" data-reveal><div className="section-kicker"><span>HÀNH TRÌNH</span><span className="kicker-line" /><span>TỪ NGUYÊN LIỆU ĐẾN THÀNH PHẨM</span></div><h2 id="process-title">Mỗi công đoạn, một chuẩn mực.</h2><p>Chọn từng bước để xem hành trình chế biến tinh bột sắn.</p></div><ol className="process-track" data-reveal>{productionSteps.map((step, index) => <li data-reveal="process-step" style={{ "--reveal-delay": `${index * 90}ms` }} key={step.title}><button type="button" className={`process-button${activeProcess === index ? " is-active" : ""}`} aria-pressed={activeProcess === index} onClick={() => setActiveProcess(index)} onMouseEnter={() => setActiveProcess(index)} onFocus={() => setActiveProcess(index)}><span className="process-node">0{index + 1}</span><span className="process-step-title">{step.title}</span></button></li>)}</ol><div className="process-detail" key={activeProcess} aria-live="polite"><span>0{activeProcess + 1} / 05</span><p>{productionSteps[activeProcess].detail}</p></div><p className="process-note">Sơ đồ quy trình minh họa chung; các công đoạn thực tế có thể thay đổi theo dây chuyền và yêu cầu sản phẩm.</p></div></section>      <section className="factory section wrap" id="nha-may"><div className="section-kicker" data-reveal><span>03</span><span className="kicker-line" /><span>NƠI TẠO NÊN GIÁ TRỊ</span></div><div className="factory-grid"><figure className="factory-photo" data-reveal><img src="/nha-may.webp" width="960" height="720" loading="lazy" alt="Biển hiệu nhà máy Kim Yến" /><figcaption>NHÀ MÁY KIM YẾN</figcaption></figure><div className="factory-copy" data-reveal><p className="eyebrow dark">ĐỒNG HÀNH CÙNG NGÀNH NÔNG NGHIỆP</p><h2>Hơn hai thập kỷ<br />cùng <em>ngành sắn Việt.</em></h2><p>Kim Yến được thành lập năm {info.founded}, hoạt động trong lĩnh vực sản xuất và thương mại tinh bột sắn, kết nối với khách hàng trong nước và các thị trường quốc tế.</p><p>Doanh nghiệp công bố năng lực dây chuyền trung bình {info.dailyCapacity} và sản lượng {info.monthlyOutput}. Công suất thực tế có thể thay đổi theo mùa vụ và kế hoạch sản xuất.</p><a className="arrow-link" href="#lien-he">Kết nối với Kim Yến <span>↗</span></a></div></div></section>
      <section className="careers-section section" id="tuyen-dung">
  <div className="wrap careers-layout">
    <div data-reveal>
      <div className="section-kicker"><span>04</span><span className="kicker-line" /><span>CƠ HỘI NGHỀ NGHIỆP</span></div>
      <h2>Phát triển cùng<br /><em>Kim Yến.</em></h2>
    </div>
    <div className="careers-copy" data-reveal>
      <p>Tham khảo các vị trí thường có tại nhà máy chế biến tinh bột sắn. Nội dung bên dưới là mẫu minh họa, chưa phải thông báo tuyển dụng chính thức.</p>
      <a className="button button-dark" href="#vi-tri-tuyen-dung">Xem vị trí tham khảo <span>↓</span></a>
    </div>
  </div>
  <div className="wrap career-listing" id="vi-tri-tuyen-dung">
    <div className="career-listing-head"><div><p className="eyebrow dark">BÀI TUYỂN DỤNG DEMO</p><h3>Các vị trí tại nhà máy</h3></div><span className="demo-badge">NỘI DUNG MINH HỌA</span></div>
    <div className="career-roles">
      <article className="career-role"><span className="role-index">01 / SẢN XUẤT</span><h4>Nhân viên vận hành dây chuyền</h4><p>Theo dõi hoạt động thiết bị trong ca, ghi nhận thông số vận hành, phối hợp bàn giao ca và giữ khu vực làm việc sạch sẽ.</p><div className="role-requirement"><b>Phù hợp với bạn nếu</b><span>Cẩn thận, tuân thủ quy trình an toàn và sẵn sàng làm việc theo ca khi vị trí yêu cầu.</span></div><a href={`mailto:${info.email}?subject=${encodeURIComponent("Demo ứng tuyển - Vận hành dây chuyền")}`}>Quan tâm vị trí <span>↗</span></a></article>
      <article className="career-role"><span className="role-index">02 / CHẤT LƯỢNG</span><h4>Nhân viên kiểm soát chất lượng</h4><p>Lấy mẫu theo hướng dẫn, hỗ trợ kiểm tra chất lượng nguyên liệu và thành phẩm, ghi chép kết quả và báo cáo sai lệch.</p><div className="role-requirement"><b>Phù hợp với bạn nếu</b><span>Tỉ mỉ, trung thực; ưu tiên ứng viên học ngành công nghệ thực phẩm, hóa học hoặc lĩnh vực liên quan.</span></div><a href={`mailto:${info.email}?subject=${encodeURIComponent("Demo ứng tuyển - Kiểm soát chất lượng")}`}>Quan tâm vị trí <span>↗</span></a></article>
      <article className="career-role"><span className="role-index">03 / KỸ THUẬT</span><h4>Kỹ thuật viên cơ điện</h4><p>Kiểm tra, bảo dưỡng định kỳ máy móc và hệ thống điện; hỗ trợ xử lý sự cố và ghi nhận lịch sử sửa chữa thiết bị.</p><div className="role-requirement"><b>Phù hợp với bạn nếu</b><span>Có nền tảng cơ khí, điện công nghiệp hoặc tự động hóa; chú trọng an toàn khi làm việc.</span></div><a href={`mailto:${info.email}?subject=${encodeURIComponent("Demo ứng tuyển - Kỹ thuật cơ điện")}`}>Quan tâm vị trí <span>↗</span></a></article>
      <article className="career-role"><span className="role-index">04 / SẢN XUẤT</span><h4>Công nhân sản xuất</h4><p>Tham gia các công đoạn sơ chế nguyên liệu, hỗ trợ vận hành và đóng gói sản phẩm theo hướng dẫn tại nhà máy.</p><div className="role-requirement"><b>Phù hợp với bạn nếu</b><span>Chăm chỉ, có sức khỏe phù hợp, làm việc có trách nhiệm và tuân thủ quy định an toàn lao động.</span></div><a href={`mailto:${info.email}?subject=${encodeURIComponent("Demo ứng tuyển - Công nhân sản xuất")}`}>Quan tâm vị trí <span>↗</span></a></article><article className="career-role"><span className="role-index">05 / KHO VẬN</span><h4>Nhân viên kho và xuất hàng</h4><p>Hỗ trợ nhập xuất, sắp xếp hàng hóa, đối chiếu chứng từ và phối hợp chuẩn bị đơn hàng theo kế hoạch.</p><div className="role-requirement"><b>Phù hợp với bạn nếu</b><span>Có trách nhiệm, phối hợp tốt; chứng chỉ xe nâng là lợi thế nếu công việc cần vận hành xe nâng.</span></div><a href={`mailto:${info.email}?subject=${encodeURIComponent("Demo ứng tuyển - Kho và xuất hàng")}`}>Quan tâm vị trí <span>↗</span></a></article>
    </div>
    <p className="career-disclaimer">Đây là nội dung demo để tham khảo. Vị trí thực tế, mức lương, ca làm, quyền lợi và yêu cầu cụ thể cần được Kim Yến xác nhận trước khi đăng tuyển.</p>
  </div>
</section><section className="contact" id="lien-he"><div className="wrap contact-inner section"><div data-reveal><div className="section-kicker light-kicker"><span>05</span><span className="kicker-line" /><span>KẾT NỐI</span></div><p className="eyebrow">CÙNG BẮT ĐẦU MỘT CUỘC TRÒ CHUYỆN</p><h2>Chúng tôi sẵn sàng<br /><em>lắng nghe bạn.</em></h2></div><div className="contact-side" data-reveal><p>Trao đổi cùng Kim Yến về sản phẩm, quy cách và nhu cầu hợp tác.</p><a className="button button-light" href={`mailto:${info.email}`}>Gửi email <span>↗</span></a><a className="contact-detail" href={`tel:${info.phoneLink}`}>{info.phone}</a><small>Thông tin liên hệ được tham khảo từ website doanh nghiệp.</small></div></div></section>
    </main>
    <footer><div className="wrap footer-inner"><a className="brand footer-brand" href="#trang-chu"><span className="brand-mark">K<span>Y</span></span><span className="brand-name">KIM YẾN<small>TINH BỘT SẮN</small></span></a><p>Nhà máy chế biến tinh bột sắn</p><a className="back-top" href="#trang-chu">TRỞ VỀ ĐẦU TRANG ↑</a><small>© KIM YẾN</small></div></footer>
  </>
}

export default App
