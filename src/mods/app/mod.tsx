import { AnchorChip } from "@/libs/anchors/mod.tsx";
import { useClientContext } from "@/libs/client/mod.tsx";
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
  const client = useClientContext().getOrNull()

  const path = usePathContext().getOrThrow()
  const apps = useAnchorWithCoords(path, "/apps")

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
    {client && path.url.pathname === "/apps" &&
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
              href="https://pump.fun/coin/ChtH5GxPAWqFXLYuhrqy82viuMxeWBsvJXcCahT7pump"
              rel="noreferrer"
              target="_blank"
              dir="ltr">
              PUMPFUN
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
    <div className="h-2" />
    <div className="text-default-contrast">
      {Lang.match({ en: "Our apps are designed to protect your privacy with high security and reliability standards.", zh: "我们的应用程序旨在通过高安全性和可靠性标准来保护您的隐私。", hi: "हमारे ऐप्स उच्च सुरक्षा और विश्वसनीयता मानकों के साथ आपकी गोपनीयता की रक्षा करने के लिए डिज़ाइन किए गए हैं।", es: "Nuestras aplicaciones están diseñadas para proteger su privacidad con altos estándares de seguridad y confiabilidad.", ar: "تم تصميم تطبيقاتنا لحماية خصوصيتك بمعايير أمان وموثوقية عالية.", fr: "Nos applications sont conçues pour protéger votre vie privée avec des normes élevées de sécurité et de fiabilité.", de: "Unsere Apps sind so konzipiert, dass sie Ihre Privatsphäre mit hohen Sicherheits- und Zuverlässigkeitsstandards schützen.", ru: "Наши приложения разработаны для защиты вашей конфиденциальности с высокими стандартами безопасности и надежности.", pt: "Nossos aplicativos são projetados para proteger sua privacidade com altos padrões de segurança e confiabilidade.", ja: "私たちのアプリは、高いセキュリティと信頼性の基準であなたのプライバシーを保護するために設計されています。", pa: "ਸਾਡੇ ਐਪਸ ਉੱਚ ਸੁਰੱਖਿਆ ਅਤੇ ਭਰੋਸੇਯੋਗਤਾ ਮਿਆਰਾਂ ਨਾਲ ਤੁਹਾਡੀ ਗੋਪਨੀਯਤਾ ਦੀ ਰੱਖਿਆ ਕਰਨ ਲਈ ਡਿਜ਼ਾਇਨ ਕੀਤੇ ਗਏ ਹਨ।", bn: "আমাদের অ্যাপগুলি উচ্চ নিরাপত্তা এবং নির্ভরযোগ্যতা মান সহ আপনার গোপনীয়তা রক্ষা করার জন্য ডিজাইন করা হয়েছে।", id: "Aplikasi kami dirancang untuk melindungi privasi Anda dengan standar keamanan dan keandalan yang tinggi.", ur: "ہمارے ایپس کو اعلیٰ سیکیورٹی اور قابل اعتماد معیارات کے ساتھ آپ کی پرائیویسی کی حفاظت کے لیے ڈیزائن کیا گیا ہے۔", ms: "Aplikasi kami direka untuk melindungi privasi anda dengan standard keselamatan dan kebolehpercayaan yang tinggi.", it: "Le nostre app sono progettate per proteggere la tua privacy con elevati standard di sicurezza e affidabilità.", tr: "Uygulamalarımız, yüksek güvenlik ve güvenilirlik standartlarıyla gizliliğinizi korumak için tasarlanmıştır.", ta: "எங்கள் செயலிகள் உயர் பாதுகாப்பு மற்றும் நம்பகத்தன்மை தரநிலைகளுடன் உங்கள் தனியுரிமையை பாதுகாக்க வடிவமைக்கப்பட்டுள்ளன.", te: "మా యాప్స్ అధిక భద్రత మరియు నమ్మకమైన ప్రమాణాలతో మీ గోప్యతను రక్షించడానికి రూపొందించబడ్డాయి.", ko: "우리의 앱은 높은 보안 및 신뢰성 표준으로 귀하의 개인 정보를 보호하도록 설계되었습니다.", vi: "Ứng dụng của chúng tôi được thiết kế để bảo vệ quyền riêng tư của bạn với các tiêu chuẩn bảo mật và độ tin cậy cao.", pl: "Nasze aplikacje zostały zaprojektowane, aby chronić Twoją prywatność przy wysokich standardach bezpieczeństwa i niezawodności.", ro: "Aplicațiile noastre sunt concepute pentru a vă proteja confidențialitatea cu standarde ridicate de securitate și fiabilitate.", nl: "Onze apps zijn ontworpen om uw privacy te beschermen met hoge beveiligings- en betrouwbaarheidsnormen.", el: "Οι εφαρμογές μας έχουν σχεδιαστεί για να προστατεύουν το απόρρητό σας με υψηλά πρότυπα ασφαλείας και αξιοπιστίας.", th: "แอปของเราได้รับการออกแบบมาเพื่อปกป้องความเป็นส่วนตัวของคุณด้วยมาตรฐานความปลอดภัยและความน่าเชื่อถือสูง", cs: "Naše aplikace jsou navrženy tak, aby chránily vaše soukromí s vysokými standardy bezpečnosti a spolehlivosti.", hu: "Alkalmazásaink úgy vannak kialakítva, hogy megvédjék a magánéletét magas szintű biztonsági és megbízhatósági szabványokkal.", sv: "Våra appar är utformade för att skydda din integritet med höga säkerhets- och tillförlitlighetsstandarder.", da: "Vores apps er designet til at beskytte dit privatliv med høje sikkerheds- og pålidelighedsstandarder." })}
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