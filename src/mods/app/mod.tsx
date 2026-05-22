import { AnchorChip } from "@/libs/anchors/mod.tsx";
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
  const [closed, setClosed] = useState(false)

  const path = usePathContext().getOrThrow()
  const apps = useAnchorWithCoords(path, "/apps")

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
    {path.url.pathname === "/apps" &&
      <PathBoard>
        <AppsBoard />
      </PathBoard>}
    <div className="p-safe h-full w-full flex flex-col overflow-y-scroll animate-opacity-in">
      <div className="grow flex flex-col w-full p-8">
        <div className="grow flex flex-col justify-center items-center">
          <div className="text-default-contrast whitespace-pre-wrap font-[monospace] text-[min(1vw,1vh)] leading-[min(1vw,1vh)]"
            dir="ltr">
            {closed ? ascii.closed : ascii.open}
          </div>
        </div>
        <div className="h-4 shrink-0" />
        <div className="flex flex-col w-full max-w-6xl m-auto">
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
              Apps
            </AnchorChip>
            <AnchorChip
              href="https://dexscreener.com/ethereum/0xD0EbFe04Adb5Ef449Ec5874e450810501DC53ED5"
              rel="noreferrer"
              target="_blank"
              dir="ltr">
              $BRUME
            </AnchorChip>
            <AnchorChip
              href="https://x.com/i/communities/1687556820900999168"
              rel="noreferrer"
              target="_blank"
              dir="ltr">
              X.com
            </AnchorChip>
            <AnchorChip
              href="https://discord.gg/7drcScm8xQ"
              rel="noreferrer"
              target="_blank"
              dir="ltr">
              Discord
            </AnchorChip>
            <AnchorChip
              href="https://github.com/brumeproject"
              rel="noreferrer"
              target="_blank"
              dir="ltr">
              GitHub
            </AnchorChip>
          </div>
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
    <div className="text-default-contrast">
      {Lang.match({ en: "All our apps have the highest security standards and are designed to protect your privacy.", zh: "我们所有的应用都具有最高的安全标准，并旨在保护您的隐私。", hi: "हमारे सभी ऐप्स में उच्चतम सुरक्षा मानक हैं और आपकी गोपनीयता की रक्षा के लिए डिज़ाइन किए गए हैं।", es: "Todas nuestras aplicaciones tienen los más altos estándares de seguridad y están diseñadas para proteger su privacidad.", ar: "جميع تطبيقاتنا تتمتع بأعلى معايير الأمان وتم تصميمها لحماية خصوصيتك.", fr: "Toutes nos applications respectent les normes de sécurité les plus élevées et sont conçues pour protéger votre vie privée.", de: "Alle unsere Apps haben die höchsten Sicherheitsstandards und sind darauf ausgelegt, Ihre Privatsphäre zu schützen.", ru: "Все наши приложения соответствуют самым высоким стандартам безопасности и разработаны для защиты вашей конфиденциальности.", pt: "Todos os nossos aplicativos têm os mais altos padrões de segurança e são projetados para proteger sua privacidade.", ja: "私たちのすべてのアプリは最高のセキュリティ基準を満たしており、あなたのプライバシーを保護するために設計されています。", pa: "ਸਾਡੇ ਸਾਰੇ ਐਪਸ ਵਿੱਚ ਉੱਚਤਮ ਸੁਰੱਖਿਆ ਮਿਆਰ ਹਨ ਅਤੇ ਤੁਹਾਡੀ ਗੋਪਨੀਯਤਾ ਦੀ ਰੱਖਿਆ ਕਰਨ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤੇ ਗਏ ਹਨ।", bn: "আমাদের সমস্ত অ্যাপস সর্বোচ্চ নিরাপত্তা মানদণ্ড পূরণ করে এবং আপনার গোপনীয়তা রক্ষা করার জন্য ডিজাইন করা হয়েছে।", id: "Semua aplikasi kami memiliki standar keamanan tertinggi dan dirancang untuk melindungi privasi Anda.", ur: "ہمارے تمام ایپس میں اعلی ترین حفاظتی معیارات ہیں اور آپ کی رازداری کی حفاظت کے لیے ڈیزائن کیے گئے ہیں۔", ms: "Semua aplikasi kami memiliki standar keamanan tertinggi dan dirancang untuk melindungi privasi Anda.", it: "Tutte le nostre app hanno i più alti standard di sicurezza e sono progettate per proteggere la tua privacy.", tr: "Tüm uygulamalarımız en yüksek güvenlik standartlarına sahiptir ve gizliliğinizi korumak için tasarlanmıştır.", ta: "எங்கள் அனைத்து செயலிகளும் மிக உயர்ந்த பாதுகாப்பு தரநிலைகளைக் கொண்டுள்ளன மற்றும் உங்கள் தனியுரிமையை பாதுகாக்க வடிவமைக்கப்பட்டுள்ளன.", te: "మా అన్ని యాప్స్ అత్యున్నత భద్రతా ప్రమాణాలను కలిగి ఉంటాయి మరియు మీ గోప్యతను రక్షించడానికి రూపొందించబడ్డాయి.", ko: "우리의 모든 앱은 최고 수준의 보안 표준을 갖추고 있으며 귀하의 개인 정보를 보호하도록 설계되었습니다.", vi: "Tất cả ứng dụng của chúng tôi đều có tiêu chuẩn bảo mật cao nhất và được thiết kế để bảo vệ quyền riêng tư của bạn.", pl: "Wszystkie nasze aplikacje spełniają najwyższe standardy bezpieczeństwa i zostały zaprojektowane, aby chronić Twoją prywatność.", ro: "Toate aplicațiile noastre au cele mai înalte standarde de securitate și sunt concepute pentru a vă proteja confidențialitatea.", nl: "Al onze apps hebben de hoogste beveiligingsnormen en zijn ontworpen om uw privacy te beschermen.", el: "Όλες οι εφαρμογές μας έχουν τα υψηλότερα πρότυπα ασφαλείας και έχουν σχεδιαστεί για να προστατεύουν το απόρρητό σας.", th: "แอปของเราทั้งหมดมีมาตรฐานความปลอดภัยสูงสุดและออกแบบมาเพื่อปกป้องความเป็นส่วนตัวของคุณ", cs: "Všechny naše aplikace mají nejvyšší bezpečnostní standardy a jsou navrženy tak, aby chránily vaše soukromí.", hu: "Minden alkalmazásunk a legmagasabb biztonsági szabványokkal rendelkezik, és úgy vannak kialakítva, hogy megvédjék a magánéletét.", sv: "Alla våra appar har de högsta säkerhetsstandarderna och är utformade för att skydda din integritet.", da: "Alle vores apps har de højeste sikkerhedsstandarder og er designet til at beskytte dit privatliv." })}
    </div>
    <div className="h-6" />
    <div className="flex flex-col gap-4">
      <AppsRow
        title="Brume Wallet"
        subtitle={Lang.match({ en: "Secure and private wallet", zh: "安全且私密的钱包", hi: "सुरक्षित और निजी वॉलेट", es: "Billetera segura y privada", ar: "محفظة آمنة وخاصة", fr: "Portefeuille sécurisé et privé", de: "Sichere und private Brieftasche", ru: "Безопасный и приватный кошелек", pt: "Carteira segura e privada", ja: "安全でプライベートなウォレット", pa: "ਸੁਰੱਖਿਅਤ ਅਤੇ ਨਿੱਜੀ ਵਾਲਿਟ", bn: "নিরাপদ এবং ব্যক্তিগত ওয়ালেট", id: "Dompet aman dan pribadi", ur: "محفوظ اور نجی والیٹ", ms: "Dompet selamat dan peribadi", it: "Portafoglio sicuro e privato", tr: "Güvenli ve özel cüzdan", ta: "பாதுகாப்பான மற்றும் தனிப்பட்ட வாலெட்", te: "సురక్షిత మరియు ప్రైవేట్ వాలెట్", ko: "안전하고 개인적인 지갑", vi: "Ví an toàn và riêng tư", pl: "Bezpieczny i prywatny portfel", ro: "Portofel sigur și privat", nl: "Veilige en privéportemonnee", el: "Ασφαλές και ιδιωτικό πορτοφόλι", th: "กระเป๋าเงินที่ปลอดภัยและเป็นส่วนตัว", cs: "Bezpečná a soukromá peněženka", hu: "Biztonságos és privát pénztárca", sv: "Säker och privat plånbok", da: "Sikker og privat tegnebog" })}
        href="https://wallet.brume.tech" />
      <AppsRow disabled
        title="Brume Link"
        subtitle={Lang.match({ en: "One-click wallet login", zh: "一键钱包登录", hi: "एक-क्लिक वॉलेट लॉगिन", es: "Inicio de sesión en billetera con un clic", ar: "تسجيل الدخول إلى المحفظة بنقرة واحدة", fr: "Connexion au portefeuille en un clic", de: "Ein-Klick-Wallet-Anmeldung", ru: "Вход в кошелек одним кликом", pt: "Login de carteira com um clique", ja: "ワンクリックウォレットログイン", pa: "ਇੱਕ-ਕਲਿੱਕ ਵਾਲਿਟ ਲੌਗਇਨ", bn: "এক-ক্লিক ওয়ালেট লগইন", id: "Login dompet dengan satu klik", ur: "ون کلک والیٹ لاگ ان", ms: "Log masuk dompet dengan satu klik", it: "Accesso al portafoglio con un clic", tr: "Tek tıklamayla cüzdan girişi", ta: "ஒரு கிளிக் வாலெட் லாகின்", te: "ఒక క్లిక్ వాలెట్ లాగిన్", ko: "원클릭 지갑 로그인", vi: "Đăng nhập ví một lần nhấp", pl: "Logowanie do portfela jednym kliknięciem", ro: "Autentificare în portofel cu un clic", nl: "Eenmalige portemonnee-login", el: "Σύνδεση πορτοφολιού με ένα κλικ", th: "เข้าสู่ระบบกระเป๋าเงินด้วยคลิกเดียว", cs: "Přihlášení do peněženky jedním kliknutím", hu: "Egykattintásos pénztárca bejelentkezés", sv: "Enklicks plånboksinloggning", da: "Én-klik-tegnebog login" })} />
      <AppsRow disabled
        title="Brume Pay"
        subtitle={Lang.match({ en: "Private payments for everyday use", zh: "日常使用的私人支付", hi: "दैनिक उपयोग के लिए निजी भुगतान", es: "Pagos privados para uso diario", ar: "مدفوعات خاصة للاستخدام اليومي", fr: "Paiements privés pour un usage quotidien", de: "Private Zahlungen für den täglichen Gebrauch", ru: "Частные платежи для повседневного использования", pt: "Pagamentos privados para uso diário", ja: "日常使用のためのプライベート支払い", pa: "ਰੋਜ਼ਾਨਾ ਵਰਤੋਂ ਲਈ ਨਿੱਜੀ ਭੁਗਤਾਨ", bn: "দৈনন্দিন ব্যবহারের জন্য ব্যক্তিগত পেমেন্ট", id: "Pembayaran pribadi untuk penggunaan sehari-hari", ur: "روزانہ کے استعمال کے لیے نجی ادائیگیاں", ms: "Pembayaran peribadi untuk kegunaan harian", it: "Pagamenti privati per l'uso quotidiano", tr: "Günlük kullanım için özel ödemeler", ta: "தினசரி பயன்பாட்டிற்கான தனிப்பட்ட பணப்பரிவர்த்தனைகள்", te: "రోజువారీ ఉపయోగానికి ప్రైవేట్ చెల్లింపులు", ko: "일상적인 사용을 위한 개인 결제", vi: "Thanh toán riêng tư cho việc sử dụng hàng ngày", pl: "Prywatne płatności do codziennego użytku", ro: "Plăți private pentru utilizarea zilnică", nl: "Privébetalingen voor dagelijks gebruik", el: "Ιδιωτικές πληρωμές για καθημερινή χρήση", th: "การชำระเงินส่วนตัวสำหรับการใช้งานประจำวัน", cs: "Soukromé platby pro každodenní použití", hu: "Privát fizetések mindennapi használatra", sv: "Privata betalningar för daglig användning", da: "Private betalinger til daglig brug" })} />
      <AppsRow disabled
        title="Brume Tunnel"
        subtitle={Lang.match({ en: "Hide your metadata online", zh: "在线隐藏您的元数据", hi: "ऑनलाइन अपने मेटाडेटा को छिपाएं", es: "Oculta tus metadatos en línea", ar: "إخفاء بياناتك الوصفية عبر الإنترنت", fr: "Masquez vos métadonnées en ligne", de: "Verstecken Sie Ihre Metadaten online", ru: "Скрывайте свои метаданные в сети", pt: "Oculte seus metadados online", ja: "オンラインでメタデータを隠す", pa: "ਆਨਲਾਈਨ ਆਪਣੇ ਮੈਟਾਡੇਟਾ ਨੂੰ ਛੁਪਾਓ", bn: "অনলাইনে আপনার মেটাডেটা লুকান", id: "Sembunyikan metadata Anda secara online", ur: "اپنے میٹا ڈیٹا کو آن لائن چھپائیں", ms: "Sembunyikan metadata anda dalam talian", it: "Nascondi i tuoi metadati online", tr: "Çevrimiçi meta verilerinizi gizleyin", ta: "உங்கள் மெட்டாடேட்டாவை ஆன்லைனில் மறைக்கவும்", te: "మీ మెటాడేటాను ఆన్‌లైన్‌లో దాచండి", ko: "온라인에서 메타데이터 숨기기", vi: "Ẩn siêu dữ liệu của bạn trực tuyến", pl: "Ukryj swoje metadane online", ro: "Ascundeți metadatele dvs. online", nl: "Verberg uw metadata online", el: "Απόκρυψη των μεταδεδομένων σας στο διαδίκτυο", th: "ซ่อนเมตาดาต้าของคุณออนไลน์", cs: "Skryjte své metadata online", hu: "Rejtsd el az online metaadataidat", sv: "Dölj dina metadata online", da: "Skjul dine metadata online" })} />
    </div>
  </div>
}

export function AppsRow(props: { title: string } & { subtitle: string } & { href?: string } & { disabled?: boolean }) {
  const { title, subtitle, href, disabled } = props

  return <a className="p-6 bg-default-contrast rounded-xl flex items-center gap-4 aria-disabled:opacity-50 not-aria-disabled:hover:bg-default-double-contrast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-contrast transition-transform"
    aria-disabled={disabled}
    href={href}
    rel="noreferrer"
    target="_blank">
    <img className="size-16 rounded-xl"
      src="/appicon.png" />
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