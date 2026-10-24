import { AnchorChip } from "@/libs/anchors/mod.tsx";
import { Client } from "@/libs/client/mod.tsx";
import { Lang } from "@/libs/lang/mod.ts";
import { useAnchorWithCoords, usePathContext } from "@hazae41/chemin";
import { PathBoard } from "@hazae41/modal";
import React, { Fragment, useEffect, useState } from "react";
import * as ascii from "./ascii/mod.ts";

React;

function timeout(delay: number) {
  return new Promise(ok => setTimeout(ok, delay))
}

async function loop(callback: () => Promise<void>, signal: AbortSignal) {
  while (!signal.aborted) await callback()
}

export function App() {
  const path = usePathContext().getOrThrow()

  const apps = useAnchorWithCoords(path, "/apps")
  const tokens = useAnchorWithCoords(path, "/tokens")
  const socials = useAnchorWithCoords(path, "/socials")

  const [closed, setClosed] = useState(false)

  useEffect(() => {
    const aborter = new AbortController()

    loop(async () => {
      await timeout(4000)
      setClosed(true)
      await timeout(250)
      setClosed(false)
    }, aborter.signal).catch(console.error)

    return () => aborter.abort()
  }, [])

  return <Fragment>
    <Client>
      {path.url.pathname === "/apps" &&
        <PathBoard>
          <AppsBoard />
        </PathBoard>}
      {path.url.pathname === "/socials" &&
        <PathBoard>
          <SocialsBoard />
        </PathBoard>}
      {path.url.pathname === "/tokens" &&
        <PathBoard>
          <TokensBoard />
        </PathBoard>}
    </Client>
    <div className="h-full w-full p-safe flex flex-col">
      <div className="grow flex flex-col justify-center items-center py-4">
        <div className="text-default-contrast whitespace-pre-wrap font-[monospace] text-[min(1svw,1svh)] leading-[min(1svw,1svh)]"
          dir="ltr">
          {closed ? ascii.closed : ascii.open}
        </div>
      </div>
      <div className="flex flex-col w-full max-w-6xl m-auto p-8">
        <div className="font-medium text-6xl">
          Brume
        </div>
        <div className="h-2 shrink-0" />
        <div className="text-default-contrast text-2xl">
          {Lang.match({ en: "Technologies to hide yourself in plain sight", zh: "在明处隐藏自己的技术", hi: "सामने छुपने के लिए तकनीक", es: "Tecnologías para esconderse a plena vista", ar: "تقنيات لإخفاء نفسك في الوضوح", fr: "Technologies pour vous cacher à la vue de tous", de: "Technologien, um sich offen zu verstecken", ru: "Технологии, чтобы скрыться на виду", pt: "Tecnologias para se esconder à vista de todos", ja: "目立たないように自分を隠すための技術", pa: "ਸਾਫ ਦਿਖਾਈ ਵਿੱਚ ਆਪਣੇ ਆਪ ਨੂੰ ਛੁਪਾਉਣ ਲਈ ਤਕਨੀਕ", bn: "প্রকাশে নিজেকে লুকানোর প্রযুক্তি", id: "Teknologi untuk menyembunyikan diri di depan umum", ur: "صاف دکھائی میں خود کو چھپانے کی تکنیک", ms: "Teknologi untuk menyembunyikan diri di tempat terang", it: "Tecnologie per nascondersi alla vista di tutti", tr: "Açıkta kendini gizlemek için teknolojiler", ta: "பொதுவாக மறைக்க தெரியும் தொழில்நுட்பங்கள்", te: "ప్రకటనలో నిజాయితీకరించడానికి సాధనాలు", ko: "눈에 띄지 않게 자신을 숨기는 기술", vi: "Công nghệ để ẩn mình trong tầm nhìn", pl: "Technologie, aby schować się na widoku", ro: "Tehnologii pentru a te ascunde în plină vedere", nl: "Technologieën om jezelf in het zicht te verbergen", el: "Τεχνολογίες για να κρυφτείτε στην απλή όψη", th: "เทคโนโลยีในการซ่อนตัวในที่สาธารณะ", cs: "Technologie, jak se skrýt na očích", hu: "Technológiák, hogy elrejtsd magad a szem elől", sv: "Tekniker för att gömma sig i vanlig syn", da: "Teknologier for at skjule dig selv i almindelig syn", })}
        </div>
        <div className="h-4 shrink-0" />
        <div className="flex flex-wrap gap-2">
          <AnchorChip
            onClick={apps.onClick}
            onKeyDown={apps.onKeyDown}
            href={apps.url.hash}
            rel="noreferrer"
            target="_blank"
            dir="ltr">
            {Lang.match({ en: "Apps", zh: "应用程序", hi: "ऐप्स", es: "Aplicaciones", ar: "تطبيقات", fr: "Applications", de: "Apps", ru: "Приложения", pt: "Aplicativos", ja: "アプリ", pa: "ਐਪਸ", bn: "অ্যাপস", id: "Aplikasi", ur: "ایپس", ms: "Aplikasi", it: "App", tr: "Uygulamalar", ta: "செயலிகள்", te: "యాప్స్", ko: "앱", vi: "Ứng dụng", pl: "Aplikacje", ro: "Aplicații", nl: "Apps", el: "Εφαρμογές", th: "แอปพลิเคชัน", cs: "Aplikace", hu: "Alkalmazások", sv: "Appar", da: "Apps" })}
          </AnchorChip>
          <AnchorChip
            onClick={socials.onClick}
            onKeyDown={socials.onKeyDown}
            href={socials.url.hash}
            rel="noreferrer"
            target="_blank"
            dir="ltr">
            {Lang.match({ en: "Socials", zh: "社交", hi: "सोशल्स", es: "Redes sociales", ar: "وسائل التواصل الاجتماعي", fr: "Réseaux sociaux", de: "Soziale Netzwerke", ru: "Социальные сети", pt: "Redes sociais", ja: "ソーシャルメディア", pa: "ਸੋਸ਼ਲਜ਼", bn: "সামাজিক মাধ্যম", id: "Media sosial", ur: "سوشل میڈیا", ms: "Media sosial", it: "Social media", tr: "Sosyal medya", ta: "சமூக ஊடகம்", te: "సోషల్ మీడియా", ko: "소셜 미디어", vi: "Mạng xã hội", pl: "Media społecznościowe", ro: "Rețele sociale", nl: "Sociale media", el: "Κοινωνικά δίκτυα", th: "โซเชียลมีเดีย", cs: "Sociální sítě", hu: "Közösségi média", sv: "Sociala medier", da: "Sociale medier" })}
          </AnchorChip>
          <AnchorChip
            onClick={tokens.onClick}
            onKeyDown={tokens.onKeyDown}
            href={tokens.url.hash}
            rel="noreferrer"
            target="_blank"
            dir="ltr">
            {Lang.match({ en: "Tokens", zh: "代币", hi: "टोकन", es: "Tokens", ar: "رموز", fr: "Jetons", de: "Token", ru: "Токены", pt: "Tokens", ja: "トークン", pa: "ਟੋਕਨ", bn: "টোকেন", id: "Token", ur: "ٹوکن", ms: "Token", it: "Token", tr: "Jetonlar", ta: "டோக்கன்கள்", te: "టోకెన్లు", ko: "토큰", vi: "Mã thông báo", pl: "Tokeny", ro: "Jetoane", nl: "Tokens", el: "Διακριτικά", th: "โทเค็น", cs: "Tokeny", hu: "Tokenek", sv: "Tokens", da: "Tokens" })}
          </AnchorChip>
        </div>
      </div>
    </div>
  </Fragment>
}

export function AppsBoard() {
  return <div className="flex flex-col grow p-6">
    <h1 className="text-xl font-medium">
      {Lang.match({ en: "Our apps", zh: "我们的应用", hi: "हमारे ऐप्स", es: "Nuestras aplicaciones", ar: "تطبيقاتنا", fr: "Nos applications", de: "Unsere Apps", ru: "Наши приложения", pt: "Nossos aplicativos", ja: "私たちのアプリ", pa: "ਸਾਡੇ ਐਪਸ", bn: "আমাদের অ্যাপস", id: "Aplikasi Kami", ur: "ہمارے ایپس", ms: "Aplikasi Kami", it: "Le nostre app", tr: "Uygulamalarımız", ta: "எங்கள் செயலிகள்", te: "మా యాప్స్", ko: "우리의 앱들", vi: "Ứng dụng của chúng tôi", pl: "Nasze aplikacje", ro: "Aplicațiile noastre", nl: "Onze apps", el: "Οι εφαρμογές μας", th: "แอปของเรา", cs: "Naše aplikace", hu: "Alkalmazásaink", sv: "Våra appar", da: "Vores apps" })}
    </h1>
    <div className="h-2" />
    <div className="text-default-contrast">
      {Lang.match({ en: "Our apps are designed to protect your privacy with high security and reliability standards.", zh: "我们的应用程序旨在通过高安全性和可靠性标准来保护您的隐私。", hi: "हमारे ऐप्स उच्च सुरक्षा और विश्वसनीयता मानकों के साथ आपकी गोपनीयता की रक्षा करने के लिए डिज़ाइन किए गए हैं।", es: "Nuestras aplicaciones están diseñadas para proteger su privacidad con altos estándares de seguridad y confiabilidad.", ar: "تم تصميم تطبيقاتنا لحماية خصوصيتك بمعايير أمان وموثوقية عالية.", fr: "Nos applications sont conçues pour protéger votre vie privée avec des normes élevées de sécurité et de fiabilité.", de: "Unsere Apps sind so konzipiert, dass sie Ihre Privatsphäre mit hohen Sicherheits- und Zuverlässigkeitsstandards schützen.", ru: "Наши приложения разработаны для защиты вашей конфиденциальности с высокими стандартами безопасности и надежности.", pt: "Nossos aplicativos são projetados para proteger sua privacidade com altos padrões de segurança e confiabilidade.", ja: "私たちのアプリは、高いセキュリティと信頼性の基準であなたのプライバシーを保護するために設計されています。", pa: "ਸਾਡੇ ਐਪਸ ਉੱਚ ਸੁਰੱਖਿਆ ਅਤੇ ਭਰੋਸੇਯੋਗਤਾ ਮਿਆਰਾਂ ਨਾਲ ਤੁਹਾਡੀ ਗੋਪਨੀਯਤਾ ਦੀ ਰੱਖਿਆ ਕਰਨ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤੇ ਗਏ ਹਨ।", bn: "আমাদের অ্যাপগুলি উচ্চ নিরাপত্তা এবং নির্ভরযোগ্যতা মান সহ আপনার গোপনীয়তা রক্ষা করার জন্য ডিজাইন করা হয়েছে।", id: "Aplikasi kami dirancang untuk melindungi privasi Anda dengan standar keamanan dan keandalan yang tinggi.", ur: "ہمارے ایپس کو اعلیٰ سیکیورٹی اور قابل اعتماد معیارات کے ساتھ آپ کی پرائیویسی کی حفاظت کے لیے ڈیزائن کیا گیا ہے۔", ms: "Aplikasi kami direka untuk melindungi privasi anda dengan standard keselamatan dan kebolehpercayaan yang tinggi.", it: "Le nostre app sono progettate per proteggere la tua privacy con elevati standard di sicurezza e affidabilità.", tr: "Uygulamalarımız, yüksek güvenlik ve güvenilirlik standartlarıyla gizliliğinizi korumak için tasarlanmıştır.", ta: "எங்கள் செயலிகள் உயர் பாதுகாப்பு மற்றும் நம்பகத்தன்மை தரநிலைகளுடன் உங்கள் தனியுரிமையை பாதுகாக்க வடிவமைக்கப்பட்டுள்ளன.", te: "మా యాప్స్ అధిక భద్రత మరియు నమ్మకమైన ప్రమాణాలతో మీ గోప్యతను రక్షించడానికి రూపొందించబడ్డాయి.", ko: "우리의 앱은 높은 보안 및 신뢰성 표준으로 귀하의 개인 정보를 보호하도록 설계되었습니다.", vi: "Ứng dụng của chúng tôi được thiết kế để bảo vệ quyền riêng tư của bạn với các tiêu chuẩn bảo mật và độ tin cậy cao.", pl: "Nasze aplikacje zostały zaprojektowane, aby chronić Twoją prywatność przy wysokich standardach bezpieczeństwa i niezawodności.", ro: "Aplicațiile noastre sunt concepute pentru a vă proteja confidențialitatea cu standarde ridicate de securitate și fiabilitate.", nl: "Onze apps zijn ontworpen om uw privacy te beschermen met hoge beveiligings- en betrouwbaarheidsnormen.", el: "Οι εφαρμογές μας έχουν σχεδιαστεί για να προστατεύουν το απόρρητό σας με υψηλά πρότυπα ασφαλείας και αξιοπιστίας.", th: "แอปของเราได้รับการออกแบบมาเพื่อปกป้องความเป็นส่วนตัวของคุณด้วยมาตรฐานความปลอดภัยและความน่าเชื่อถือสูง", cs: "Naše aplikace jsou navrženy tak, aby chránily vaše soukromí s vysokými standardy bezpečnosti a spolehlivosti.", hu: "Alkalmazásaink úgy vannak kialakítva, hogy megvédjék a magánéletét magas szintű biztonsági és megbízhatósági szabványokkal.", sv: "Våra appar är utformade för att skydda din integritet med höga säkerhets- och tillförlitlighetsstandarder.", da: "Vores apps er designet til at beskytte dit privatliv med høje sikkerheds- og pålidelighedsstandarder." })}
    </div>
    <div className="h-6" />
    <div className="flex flex-col gap-4">
      <AnchorRow
        icon="/favicon.ico"
        title="Brume Wallet"
        subtitle={Lang.match({ en: "Secure and private wallet", zh: "安全且私密的钱包", hi: "सुरक्षित और निजी वॉलेट", es: "Billetera segura y privada", ar: "محفظة آمنة وخاصة", fr: "Portefeuille sécurisé et privé", de: "Sichere und private Brieftasche", ru: "Безопасный и приватный кошелек", pt: "Carteira segura e privada", ja: "安全でプライベートなウォレット", pa: "ਸੁਰੱਖਿਅਤ ਅਤੇ ਨਿੱਜੀ ਵਾਲਿਟ", bn: "নিরাপদ এবং ব্যক্তিগত ওয়ালেট", id: "Dompet aman dan pribadi", ur: "محفوظ اور نجی والیٹ", ms: "Dompet selamat dan peribadi", it: "Portafoglio sicuro e privato", tr: "Güvenli ve özel cüzdan", ta: "பாதுகாப்பான மற்றும் தனிப்பட்ட வாலெட்", te: "సురక్షిత మరియు ప్రైవేట్ వాలెట్", ko: "안전하고 개인적인 지갑", vi: "Ví an toàn và riêng tư", pl: "Bezpieczny i prywatny portfel", ro: "Portofel sigur și privat", nl: "Veilige en privéportemonnee", el: "Ασφαλές και ιδιωτικό πορτοφόλι", th: "กระเป๋าเงินที่ปลอดภัยและเป็นส่วนตัว", cs: "Bezpečná a soukromá peněženka", hu: "Biztonságos és privát pénztárca", sv: "Säker och privat plånbok", da: "Sikker og privat tegnebog" })}
        href="https://wallet.brume.tech" />
      <AnchorRow disabled
        icon="/favicon.ico"
        title="Brume Click"
        subtitle={Lang.match({ en: "The browser extension for one-click wallet login", zh: "一键钱包登录的浏览器扩展", hi: "एक-क्लिक वॉलेट लॉगिन के लिए ब्राउज़र एक्सटेंशन", es: "La extensión de navegador para el inicio de sesión de billetera con un clic", ar: "امتداد المتصفح لتسجيل الدخول إلى المحفظة بنقرة واحدة", fr: "L'extension de navigateur pour la connexion au portefeuille en un clic", de: "Die Browser-Erweiterung für die Ein-Klick-Wallet-Anmeldung", ru: "Расширение браузера для входа в кошелёк одним кликом", pt: "A extensão do navegador para login de carteira com um clique", ja: "ワンクリックウォレットログイン用のブラウザ拡張機能", pa: "ਇੱਕ-ਕਲਿੱਕ ਵਾਲਿਟ ਲੌਗਇਨ ਲਈ ਬ੍ਰਾਊਜ਼ਰ ਐਕਸਟੈਂਸ਼ਨ", bn: "এক-ক্লিক ওয়ালেট লগইনের জন্য ব্রাউজার এক্সটেনশন", id: "Ekstensi browser untuk login dompet sekali klik", ur: "ون کلک والیٹ لاگ ان کے لیے براؤزر ایکسٹینشن", ms: "Sambungan pelayar untuk log masuk dompet satu klik", it: "L'estensione del browser per l'accesso al portafoglio con un clic", tr: "Tek tıkla cüzdan girişi için tarayıcı uzantısı", ta: "ஒரே கிளிக் வாலட் உள்நுழைவுக்கான உலாவி நீட்டிப்பு", te: "ఒకే క్లిక్ వాలెట్ లాగిన్ కోసం బ్రౌజర్ ఎక్స్‌టెన్షన్", ko: "원클릭 지갑 로그인을 위한 브라우저 확장 프로그램", vi: "Tiện ích mở rộng trình duyệt để đăng nhập ví chỉ với một cú nhấp chuột", pl: "Rozszerzenie przeglądarki do logowania do portfela jednym kliknięciem", ro: "Extensia de browser pentru autentificarea portofelului cu un singur clic", nl: "De browserextensie voor portemonnee-login met één klik", el: "Η επέκταση προγράμματος περιήγησης για σύνδεση πορτοφολιού με ένα κλικ", th: "ส่วนขยายเบราว์เซอร์สำหรับการเข้าสู่ระบบกระเป๋าเงินด้วยคลิกเดียว", cs: "Rozšíření prohlížeče pro přihlášení do peněženky jedním kliknutím", hu: "A böngészőbővítmény az egykattintásos pénztárca-bejelentkezéshez", sv: "Webbläsartillägget för plånboksinloggning med ett klick", da: "Browserudvidelsen til ét-klik tegnebog-login" })}
        href="https://github.com/brume256/click" />
      <AnchorRow disabled
        icon="/favicon.ico"
        title="Brume Guard"
        subtitle={Lang.match({ en: "Transactions protected by AI", zh: "由 AI 保护的交易", hi: "एआई द्वारा सुरक्षित लेनदेन", es: "Transacciones protegidas por IA", ar: "المعاملات المحمية بواسطة الذكاء الاصطناعي", fr: "Transactions protégées par l'IA", de: "Von KI geschützte Transaktionen", ru: "Транзакции, защищенные ИИ", pt: "Transações protegidas por IA", ja: "AI によって保護されたトランザクション", pa: "ਏਆਈ ਦੁਆਰਾ ਸੁਰੱਖਿਅਤ ਲੈਣ-ਦੇਣ", bn: "এআই দ্বারা সুরক্ষিত লেনদেন", id: "Transaksi yang dilindungi oleh AI", ur: "اے آئی کے ذریعے محفوظ شدہ لین دین", ms: "Transaksi yang dilindungi oleh AI", it: "Transazioni protette dall'IA", tr: "Yapay zeka tarafından korunan işlemler", ta: "ஏ.ஐ மூலம் பாதுகாக்கப்பட்ட பரிவர்த்தனைகள்", te: "ఏఐ ద్వారా రక్షించబడిన లావాదేవీలు", ko: "AI로 보호되는 거래", vi: "Giao dịch được bảo vệ bởi AI", pl: "Transakcje chronione przez AI", ro: "Tranzacții protejate de AI", nl: "Transacties beschermd door AI", el: "Συναλλαγές προστατευμένες από AI", th: "ธุรกรรมที่ได้รับการปกป้องโดย AI", cs: "Transakce chráněné AI", hu: "AI által védett tranzakciók", sv: "Transaktioner skyddade av AI", da: "Transaktioner beskyttet af AI" })} />
      <AnchorRow disabled
        icon="/favicon.ico"
        title="Brume Pay"
        subtitle={Lang.match({ en: "Private payments for everyday use", zh: "日常使用的私人支付", hi: "दैनिक उपयोग के लिए निजी भुगतान", es: "Pagos privados para uso diario", ar: "مدفوعات خاصة للاستخدام اليومي", fr: "Paiements privés pour un usage quotidien", de: "Private Zahlungen für den täglichen Gebrauch", ru: "Частные платежи для повседневного использования", pt: "Pagamentos privados para uso diário", ja: "日常使用のためのプライベート支払い", pa: "ਰੋਜ਼ਾਨਾ ਵਰਤੋਂ ਲਈ ਨਿੱਜੀ ਭੁਗਤਾਨ", bn: "দৈনন্দিন ব্যবহারের জন্য ব্যক্তিগত পেমেন্ট", id: "Pembayaran pribadi untuk penggunaan sehari-hari", ur: "روزانہ کے استعمال کے لیے نجی ادائیگیاں", ms: "Pembayaran peribadi untuk kegunaan harian", it: "Pagamenti privati per l'uso quotidiano", tr: "Günlük kullanım için özel ödemeler", ta: "தினசரி பயன்பாட்டிற்கான தனிப்பட்ட பணப்பரிவர்த்தனைகள்", te: "రోజువారీ ఉపయోగానికి ప్రైవేట్ చెల్లింపులు", ko: "일상적인 사용을 위한 개인 결제", vi: "Thanh toán riêng tư cho việc sử dụng hàng ngày", pl: "Prywatne płatności do codziennego użytku", ro: "Plăți private pentru utilizarea zilnică", nl: "Privébetalingen voor dagelijks gebruik", el: "Ιδιωτικές πληρωμές για καθημερινή χρήση", th: "การชำระเงินส่วนตัวสำหรับการใช้งานประจำวัน", cs: "Soukromé platby pro každodenní použití", hu: "Privát fizetések mindennapi használatra", sv: "Privata betalningar för daglig användning", da: "Private betalinger til daglig brug" })} />
    </div>
  </div>
}

export function TokensBoard() {
  return <div className="flex flex-col grow p-6">
    <h1 className="text-xl font-medium">
      {Lang.match({ en: "Team-made tokens", zh: "团队制作的代币", hi: "टीम-निर्मित टोकन", es: "Tokens hechos por el equipo", ar: "الرموز التي صنعها الفريق", fr: "Jetons créés par l'équipe", de: "Von Team erstellte Token", ru: "Токены, созданные командой", pt: "Tokens feitos pela equipe", ja: "チーム製トークン", pa: "ਟੀਮ-ਬਣੇ ਟੋਕਨ", bn: "টিম-তৈরি টোকেন", id: "Token buatan tim", ur: "ٹیم کی طرف سے بنائے گئے ٹوکن", ms: "Token buatan tim", it: "Token creati dal team", tr: "Takım yapımı tokenler", ta: "குழு உருவாக்கிய டோக்கன்கள்", te: "టీమ్-తయారు టోకెన్లు", ko: "팀 제작 토큰", vi: "Token do đội tạo ra", pl: "Tokeny stworzone przez zespół", ro: "Tokenuri create de echipă", nl: "Door het team gemaakte tokens", el: "Tokens που δημιουργούνται από την ομάδα", th: "โทเค็นที่สร้างโดยทีมงาน", cs: "Tokeny vytvořené týmem", hu: "Csapat által készített tokenek", sv: "Team-tillverkade tokens", da: "Team-lavede tokens" })}
    </h1>
    <div className="h-2" />
    <div className="text-default-contrast">
      {Lang.match({ en: "All fees goes to us to fund our development.", zh: "所有费用都归我们所有，用于资助我们的开发。", hi: "सभी शुल्क हमारे पास जाते हैं ताकि हमारे विकास को वित्त पोषित किया जा सके।", es: "Todas las tarifas van a nosotros para financiar nuestro desarrollo.", ar: "تذهب جميع الرسوم إلينا لتمويل تطويرنا.", fr: "Tous les frais nous reviennent pour financer notre développement.", de: "Alle Gebühren gehen an uns, um unsere Entwicklung zu finanzieren.", ru: "Все сборы идут нам для финансирования нашей разработки.", pt: "Todas as taxas vão para nós para financiar nosso desenvolvimento.", ja: "すべての料金は私たちに行き、私たちの開発を資金提供します。", pa: "ਸਾਰੇ ਫੀਸ ਸਾਡੇ ਕੋਲ ਜਾਂਦੇ ਹਨ ਤਾਂ ਜੋ हमारे विकास को वित्त पोषित किया जा सके।", bn: "সমস্ত ফি আমাদের কাছে যায় আমাদের উন্নয়নকে অর্থায়ন করার জন্য।", id: "Semua biaya masuk ke kami untuk mendanai pengembangan kami.", ur: "تمام فیسیں ہمارے پاس جاتی ہیں تاکہ ہماری ترقی کو فنڈ کیا جا سکے۔", ms: "Semua biaya masuk ke kami untuk mendanai pengembangan kami.", it: "Tutte le commissioni vanno a noi per finanziare il nostro sviluppo.", tr: "Tüm ücretler geliştirmemizi finanse etmek için bize gider.", ta: "அனைத்து கட்டணங்களும் எங்கள் வளர்ச்சியை நிதியளிக்க எங்களுக்கு செல்கின்றன.", te: "అన్ని ఫీజులు మా అభివృద్ధిని నిధి సమకూర్చడానికి మాకు వెళ్తాయి.", ko: "모든 수수료는 우리의 개발 자금을 조달하기 위해 우리에게 갑니다.", vi: "Tất cả phí đều đi vào chúng tôi để tài trợ cho sự phát triển của chúng tôi.", pl: "Wszystkie opłaty trafiają do nas, aby sfinansować nasz rozwój.", ro: "Toate taxele merg la noi pentru a finanța dezvoltarea noastră.", nl: "Alle kosten gaan naar ons om onze ontwikkeling te financieren.", el: "Όλα τα τέλη πηγαίνουν σε εμάς για να χρηματοδοτήσουμε την ανάπτυξή μας.", th: "ค่าธรรมเนียมทั้งหมดไปที่เราเพื่อเป็นทุนในการพัฒนาของเรา", cs: "Všechny poplatky jdou nám, aby financovaly náš vývoj.", hu: "Minden díj hozzánk megy, hogy finanszírozzuk a fejlesztésünket.", sv: "Alla avgifter går till oss för att finansiera vår utveckling.", da: "Alle gebyrer går til os for at finansiere vores udvikling." })}
    </div>
    <div className="h-6" />
    <div className="flex flex-col gap-4">
      <AnchorRow
        icon="/assets/uniswap.png"
        title="Brume (BRUME)"
        subtitle="Uniswap • Ethereum • October 2024"
        href="https://dexscreener.com/ethereum/0xD0EbFe04Adb5Ef449Ec5874e450810501DC53ED5" />
    </div>
    <div className="h-6" />
    <h1 className="text-xl font-medium">
      {Lang.match({ en: "Community-made tokens", zh: "社区制作的代币", hi: "समुदाय-निर्मित टोकन", es: "Tokens hechos por la comunidad", ar: "الرموز التي صنعها المجتمع", fr: "Jetons créés par la communauté", de: "Von der Community erstellte Token", ru: "Токены, созданные сообществом", pt: "Tokens feitos pela comunidade", ja: "コミュニティ製トークン", pa: "ਕਮਿਊਨਿਟੀ-ਬਣੇ ਟੋਕਨ", bn: "কমিউনিটি-তৈরি টোকেন", id: "Token buatan komunitas", ur: "کمیونٹی کی طرف سے بنائے گئے ٹوکن", ms: "Token buatan komunitas", it: "Token creati dalla comunità", tr: "Topluluk yapımı tokenler", ta: "சமூகத்தால் உருவாக்கப்பட்ட டோக்கன்கள்", te: "కమ్యూనిటీ-తయారు టోకెన్లు", ko: "커뮤니티 제작 토큰", vi: "Token do cộng đồng tạo ra", pl: "Tokeny stworzone przez społeczność", ro: "Tokenuri create de comunitate", nl: "Door de gemeenschap gemaakte tokens", el: "Tokens που δημιουργούνται από την κοινότητα", th: "โทเค็นที่สร้างโดยชุมชน", cs: "Tokeny vytvořené komunitou", hu: "Közösség által készített tokenek", sv: "Community-tillverkade tokens", da: "Community-lavede tokens" })}
    </h1>
    <div className="h-2" />
    <div className="text-default-contrast">
      {Lang.match({ en: "All fees goes to us to fund our development.", zh: "所有费用都归我们所有，用于资助我们的开发。", hi: "सभी शुल्क हमारे पास जाते हैं ताकि हमारे विकास को वित्त पोषित किया जा सके।", es: "Todas las tarifas van a nosotros para financiar nuestro desarrollo.", ar: "تذهب جميع الرسوم إلينا لتمويل تطويرنا.", fr: "Tous les frais nous reviennent pour financer notre développement.", de: "Alle Gebühren gehen an uns, um unsere Entwicklung zu finanzieren.", ru: "Все сборы идут нам для финансирования нашей разработки.", pt: "Todas as taxas vão para nós para financiar nosso desenvolvimento.", ja: "すべての料金は私たちに行き、私たちの開発を資金提供します。", pa: "ਸਾਰੇ ਫੀਸ ਸਾਡੇ ਕੋਲ ਜਾਂਦੇ ਹਨ ਤਾਂ ਜੋ हमारे विकास को वित्त पोषित किया जा सके।", bn: "সমস্ত ফি আমাদের কাছে যায় আমাদের উন্নয়নকে অর্থায়ন করার জন্য।", id: "Semua biaya masuk ke kami untuk mendanai pengembangan kami.", ur: "تمام فیسیں ہمارے پاس جاتی ہیں تاکہ ہماری ترقی کو فنڈ کیا جا سکے۔", ms: "Semua biaya masuk ke kami untuk mendanai pengembangan kami.", it: "Tutte le commissioni vanno a noi per finanziare il nostro sviluppo.", tr: "Tüm ücretler geliştirmemizi finanse etmek için bize gider.", ta: "அனைத்து கட்டணங்களும் எங்கள் வளர்ச்சியை நிதியளிக்க எங்களுக்கு செல்கின்றன.", te: "అన్ని ఫీజులు మా అభివృద్ధిని నిధి సమకూర్చడానికి మాకు వెళ్తాయి.", ko: "모든 수수료는 우리의 개발 자금을 조달하기 위해 우리에게 갑니다.", vi: "Tất cả phí đều đi vào chúng tôi để tài trợ cho sự phát triển của chúng tôi.", pl: "Wszystkie opłaty trafiają do nas, aby sfinansować nasz rozwój.", ro: "Toate taxele merg la noi pentru a finanța dezvoltarea noastră.", nl: "Alle kosten gaan naar ons om onze ontwikkeling te financieren.", el: "Όλα τα τέλη πηγαίνουν σε εμάς για να χρηματοδοτήσουμε την ανάπτυξή μας.", th: "ค่าธรรมเนียมทั้งหมดไปที่เราเพื่อเป็นทุนในการพัฒนาของเรา", cs: "Všechny poplatky jdou nám, aby financovaly náš vývoj.", hu: "Minden díj hozzánk megy, hogy finanszírozzuk a fejlesztésünket.", sv: "Alla avgifter går till oss för att finansiera vår utveckling.", da: "Alle gebyrer går til os for at finansiere vores udvikling." })}
    </div>
    <div className="h-6" />
    <div className="flex flex-col gap-4">
      <AnchorRow
        icon="/assets/pumpfun.png"
        title="Brume (BRUME)"
        subtitle="Pumpfun • Solana • October 2026"
        href="https://pump.fun/coin/AJPertGGMDmM75fb6jiB8MPfFu61ouLDtW6UBvf3pump" />
      <AnchorRow
        deprecated
        icon="/assets/pumpfun.png"
        title="Brume (BRUME)"
        subtitle="Pumpfun • Solana • May 2026"
        href="https://pump.fun/coin/ChtH5GxPAWqFXLYuhrqy82viuMxeWBsvJXcCahT7pump" />
      <AnchorRow
        deprecated
        icon="/assets/bags.png"
        title="Brume (BRUME)"
        subtitle="Bags • Solana • January 2026"
        href="https://bags.fm/BnZnZe7dr59r9PrUZnwdhC9fEkD6UHnsZZur7xkyBAGS" />
    </div>
  </div>
}

export function SocialsBoard() {
  return <div className="flex flex-col grow p-6">
    <h1 className="text-xl font-medium">
      {Lang.match({ en: "Join us", zh: "加入我们", hi: "हमसे जुड़ें", es: "Únete a nosotros", ar: "انضم إلينا", fr: "Rejoignez-nous", de: "Schließen Sie sich uns an", ru: "Присоединяйтесь к нам", pt: "Junte-se a nós", ja: "私たちに参加してください", pa: "ਸਾਡੇ ਨਾਲ ਜੁੜੋ", bn: "আমাদের সাথে যোগ দিন", id: "Bergabunglah dengan kami", ur: "ہمارے ساتھ شامل ہوں", ms: "Sertai kami", it: "Unisciti a noi", tr: "Bize katılın", ta: "எங்களைச் சேர்ந்துகொள்ளுங்கள்", te: "మాకు చేరండి", ko: "우리와 함께하세요", vi: "Tham gia với chúng tôi", pl: "Dołącz do nas", ro: "Alăturați-vă nouă", nl: "Doe met ons mee", el: "Ελάτε μαζί μας", th: "เข้าร่วมกับเรา", cs: "Připojte se k nám", hu: "Csatlakozz hozzánk", sv: "Gå med oss", da: "Deltag med os" })}
    </h1>
    <div className="h-6" />
    <div className="flex flex-col gap-4">
      <AnchorRow
        icon="/assets/twitter.svg"
        title={Lang.match({ en: "Profile", zh: "个人资料", hi: "प्रोफ़ाइल", es: "Perfil", ar: "الملف الشخصي", fr: "Profil", de: "Profil", ru: "Профиль", pt: "Perfil", ja: "プロフィール", pa: "ਪ੍ਰੋਫ਼ਾਈਲ", bn: "প্রোফাইল", id: "Profil", ur: "پروفائل", ms: "Profil", it: "Profilo", tr: "Profil", ta: "சுயவிவரம்", te: "ప్రొఫైల్", ko: "프로필", vi: "Hồ sơ", pl: "Profil", ro: "Profil", nl: "Profiel", el: "Προφίλ", th: "โปรไฟล์", cs: "Profil", hu: "Profil", sv: "Profil", da: "Profil" })}
        subtitle={Lang.match({ en: "Follow us on X", zh: "在X上关注我们", hi: "हमें X पर फॉलो करें", es: "Síguenos en X", ar: "تابعنا على X", fr: "Suivez-nous sur X", de: "Folgen Sie uns auf X", ru: "Подписывайтесь на нас в X", pt: "Siga-nos no X", ja: "Xでフォローしてください", pa: "ਸਾਨੂੰ X 'ਤੇ ਫਾਲੋ ਕਰੋ", bn: "আমাদের এক্স-এ অনুসরণ করুন", id: "Ikuti kami di X", ur: "ہمیں ایکس پر فالو کریں", ms: "Ikuti kami di X", it: "Seguici su X", tr: "Bizi X'te takip edin", ta: "எங்களை X இல் பின்தொடருங்கள்", te: "మమ్మల్ని X లో ఫాలో చేయండి", ko: "X에서 팔로우하세요", vi: "Theo dõi chúng tôi trên X", pl: "Śledź nas na X", ro: "Urmărește-ne pe X", nl: "Volg ons op X", el: "Ακολουθήστε μας στο Χ", th: "ติดตามเราบน X", cs: "Sledujte nás na X", hu: "Kövess minket az X-en", sv: "Följ oss på X", da: "Følg os på X" })}
        href="https://x.com/brume256" />
      <AnchorRow
        icon="/assets/twitter.svg"
        title={Lang.match({ en: "Discussion group", zh: "讨论组", hi: "चर्चा समूह", es: "Grupo de discusión", ar: "مجموعة النقاش", fr: "Groupe de discussion", de: "Diskussionsgruppe", ru: "Группа обсуждения", pt: "Grupo de discussão", ja: "ディスカッショングループ", pa: "ਚਰਚਾ ਸਮੂਹ", bn: "আলোচনা গ্রুপ", id: "Grup diskusi", ur: "بحث گروپ", ms: "Kumpulan perbincangan", it: "Gruppo di discussione", tr: "Tartışma grubu", ta: "பேச்சு குழு", te: "చర్చా సమూహం", ko: "토론 그룹", vi: "Nhóm thảo luận", pl: "Grupa dyskusyjna", ro: "Grup de discuție", nl: "Discussiegroep", el: "Ομάδα συζήτησης", th: "กลุ่มอภิปราย", cs: "Diskusní skupina", hu: "Vita csoport", sv: "Diskussionsgrupp", da: "Diskussionsgruppe" })}
        subtitle={Lang.match({ en: "Follow us on X", zh: "在X上关注我们", hi: "हमें X पर फॉलो करें", es: "Síguenos en X", ar: "تابعنا على X", fr: "Suivez-nous sur X", de: "Folgen Sie uns auf X", ru: "Подписывайтесь на нас в X", pt: "Siga-nos no X", ja: "Xでフォローしてください", pa: "ਸਾਨੂੰ X 'ਤੇ ਫਾਲੋ ਕਰੋ", bn: "আমাদের এক্স-এ অনুসরণ করুন", id: "Ikuti kami di X", ur: "ہمیں ایکس پر فالو کریں", ms: "Ikuti kami di X", it: "Seguici su X", tr: "Bizi X'te takip edin", ta: "எங்களை X இல் பின்தொடருங்கள்", te: "మమ్మల్ని X లో ఫాలో చేయండి", ko: "X에서 팔로우하세요", vi: "Theo dõi chúng tôi trên X", pl: "Śledź nas na X", ro: "Urmărește-ne pe X", nl: "Volg ons op X", el: "Ακολουθήστε μας στο Χ", th: "ติดตามเราบน X", cs: "Sledujte nás na X", hu: "Kövess minket az X-en", sv: "Följ oss på X", da: "Følg os på X" })}
        href="https://x.com/i/chat/group_join/g2057856230081917371/A7l2vjGy8j" />
      <AnchorRow
        icon="/assets/twitter.svg"
        title={Lang.match({ en: "News group", zh: "新闻组", hi: "समाचार समूह", es: "Grupo de noticias", ar: "مجموعة الأخبار", fr: "Groupe de nouvelles", de: "Nachrichtengruppe", ru: "Новостная группа", pt: "Grupo de notícias", ja: "ニュースグループ", pa: "ਖ਼ਬਰਾਂ ਦਾ ਸਮੂਹ", bn: "সংবাদ গ্রুপ", id: "Grup berita", ur: "خبری گروپ", ms: "Kumpulan berita", it: "Gruppo di notizie", tr: "Haber grubu", ta: "செய்தி குழு", te: "సమాచార సమూహం", ko: "뉴스 그룹", vi: "Nhóm tin tức", pl: "Grupa informacyjna", ro: "Grup de știri", nl: "Nieuwsgroep", el: "Ομάδα ειδήσεων", th: "กลุ่มข่าว", cs: "Novinková skupina", hu: "Hír csoport", sv: "Nyhetsgrupp", da: "Nyhedsgruppe" })}
        subtitle={Lang.match({ en: "Follow us on X", zh: "在X上关注我们", hi: "हमें X पर फॉलो करें", es: "Síguenos en X", ar: "تابعنا على X", fr: "Suivez-nous sur X", de: "Folgen Sie uns auf X", ru: "Подписывайтесь на нас в X", pt: "Siga-nos no X", ja: "Xでフォローしてください", pa: "ਸਾਨੂੰ X 'ਤੇ ਫਾਲੋ ਕਰੋ", bn: "আমাদের এক্স-এ অনুসরণ করুন", id: "Ikuti kami di X", ur: "ہمیں ایکس پر فالو کریں", ms: "Ikuti kami di X", it: "Seguici su X", tr: "Bizi X'te takip edin", ta: "எங்களை X இல் பின்தொடருங்கள்", te: "మమ్మల్ని X లో ఫాలో చేయండి", ko: "X에서 팔로우하세요", vi: "Theo dõi chúng tôi trên X", pl: "Śledź nas na X", ro: "Urmărește-ne pe X", nl: "Volg ons op X", el: "Ακολουθήστε μας στο Χ", th: "ติดตามเราบน X", cs: "Sledujte nás na X", hu: "Kövess minket az X-en", sv: "Följ oss på X", da: "Følg os på X" })}
        href="https://x.com/i/chat/group_join/g2107424767871766973/2TYDaB03P5" />
      <AnchorRow
        icon="/assets/github.svg"
        title={Lang.match({ en: "GitHub", zh: "GitHub", hi: "GitHub", es: "GitHub", ar: "GitHub", fr: "GitHub", de: "GitHub", ru: "GitHub", pt: "GitHub", ja: "GitHub", pa: "GitHub", bn: "GitHub", id: "GitHub", ur: "GitHub", ms: "GitHub", it: "GitHub", tr: "GitHub", ta: "GitHub", te: "GitHub", ko: "GitHub", vi: "GitHub", pl: "GitHub", ro: "GitHub", nl: "GitHub", el: "GitHub", th: "GitHub", cs: "GitHub", hu: "GitHub", sv: "GitHub", da: "GitHub" })}
        subtitle={Lang.match({ en: "Our code is on GitHub", zh: "我们的代码在 GitHub 上", hi: "हमारा कोड GitHub पर है", es: "Nuestro código está en GitHub", ar: "رمزنا على GitHub", fr: "Notre code est sur GitHub", de: "Unser Code ist auf GitHub", ru: "Наш код на GitHub", pt: "Nosso código está no GitHub", ja: "私たちのコードは GitHub にあります", pa: "ਸਾਡਾ ਕੋਡ GitHub 'ਤੇ ਹੈ", bn: "আমাদের কোড GitHub-এ আছে", id: "Kode kami ada di GitHub", ur: "ہمارا کوڈ GitHub پر ہے", ms: "Kod kami ada di GitHub", it: "Il nostro codice è su GitHub", tr: "Kodumuz GitHub'da", ta: "எங்கள் குறியீடு GitHub இல் உள்ளது", te: "మా కోడ్ GitHub లో ఉంది", ko: "우리의 코드는 GitHub에 있습니다", vi: "Mã của chúng tôi có trên GitHub", pl: "Nasz kod jest na GitHub", ro: "Codul nostru este pe GitHub", nl: "Onze code staat op GitHub", el: "Ο κώδικάς μας είναι στο GitHub", th: "รหัสของเราบน GitHub", cs: "Náš kód je na GitHub", hu: "A kódunk a GitHubon van", sv: "Vår kod finns på GitHub", da: "Vores kode er på GitHub" })}
        href="https://github.com/brume256" />
    </div>
  </div>
}

export function AnchorRow(props: { title: string } & { subtitle: string } & { icon: string } & { href?: string } & { disabled?: boolean } & { deprecated?: boolean }) {
  const { title, subtitle, icon, href, disabled, deprecated } = props

  return <a className="p-6 bg-default-contrast rounded-xl flex items-center gap-4 aria-disabled:opacity-50 data-deprecated:opacity-50 not-aria-disabled:hover:bg-default-double-contrast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-contrast transition-transform"
    aria-disabled={disabled}
    data-deprecated={deprecated}
    href={href}
    rel="noreferrer"
    target="_blank">
    <img className="p-3 size-16 rounded-xl bg-white"
      src={icon} />
    <div className="flex flex-col">
      <div className="font-medium text-xl">
        {title}
      </div>
      <div className="h-1" />
      <div className="text-default-contrast">
        {subtitle}
      </div>
    </div>
  </a>
}