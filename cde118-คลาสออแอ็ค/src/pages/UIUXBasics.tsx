import { motion } from "motion/react";
import { Layout, MousePointerClick, Palette, Search, Smartphone, Type } from "lucide-react";

export default function UIUXBasics() {
  return (
    <div className="space-y-24 max-w-6xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zen-matcha/10 text-zen-matcha mb-4"
        >
          <Layout size={36} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-zen-text tracking-tight leading-tight"
        >
          พื้นฐานของ <span className="text-zen-wood italic">UI/UX</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zen-text-light leading-relaxed"
        >
          ทำความเข้าใจความแตกต่างและจุดเชื่อมโยงระหว่างหน้าตาที่สวยงาม (UI) 
          และประสบการณ์ที่ลื่นไหล (UX)
        </motion.p>
      </header>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-zen-wood/5 rounded-3xl p-12 text-center border border-zen-wood/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-multiply" />
        <h2 className="relative z-10 text-3xl md:text-4xl font-serif text-zen-text leading-relaxed italic">
          "UI ที่ดีทำให้<span className="text-zen-wood">สวย</span> <br className="hidden md:block" />
          UX ที่ดีทำให้<span className="text-zen-matcha">ใช้ง่ายและอยากใช้ซ้ำ</span>"
        </h2>
      </motion.div>

      {/* Comparison Section */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* UI Section */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-zen-text/5"
        >
          <div className="flex items-center gap-4 border-b border-zen-text/10 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-zen-wood/10 flex items-center justify-center text-zen-wood">
              <Palette size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-zen-text">User Interface (UI)</h2>
              <p className="text-zen-text-light">การออกแบบหน้าตา</p>
            </div>
          </div>
          
          <p className="text-zen-text-light leading-relaxed text-lg">
            คือการออกแบบอินเทอร์เฟซหรือหน้าตาของระบบ ที่ผู้ใช้มองเห็นและโต้ตอบโดยตรง 
            ครอบคลุมตั้งแต่สี ฟอนต์ ไอคอน ปุ่ม Layout และการจัดวาง (Visual Design) 
            รวมถึงการตอบสนองทางภาพ (Visual Feedback) เช่น ปุ่มเปลี่ยนสีเมื่อกด
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-zen-text mb-6">องค์ประกอบหลัก (Key Elements)</h3>
            {[
              { icon: <Layout size={20} />, title: "Layout", desc: "การจัดวางองค์ประกอบบนหน้าจอ" },
              { icon: <Palette size={20} />, title: "Colors", desc: "ชุดสีที่ใช้และอารมณ์ที่สร้างในงาน" },
              { icon: <Type size={20} />, title: "Typography", desc: "ตัวอักษร ขนาด ความหนา บาง เข้ม" },
              { icon: <Smartphone size={20} />, title: "Responsiveness", desc: "ความเหมาะสมในการใช้งานกับอุปกรณ์ที่แตกต่าง" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-zen-bg-alt">
                <div className="text-zen-wood mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-medium text-zen-text">{item.title}</h4>
                  <p className="text-sm text-zen-text-light mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* UX Section */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-zen-text/5"
        >
          <div className="flex items-center gap-4 border-b border-zen-text/10 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-zen-matcha/10 flex items-center justify-center text-zen-matcha">
              <MousePointerClick size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-zen-text">User Experience (UX)</h2>
              <p className="text-zen-text-light">การออกแบบประสบการณ์</p>
            </div>
          </div>
          
          <p className="text-zen-text-light leading-relaxed text-lg">
            คือการออกแบบประสบการณ์ของผู้ใช้ทั้งหมด ตั้งแต่เริ่มต้นจนจบ 
            เมื่อผู้ใช้โต้ตอบกับสินค้า บริการ แอปพลิเคชัน หรือเว็บไซต์ 
            ครอบคลุมความง่ายในการใช้งาน ความสะดวก ความพึงพอใจ และการตอบสนองความต้องการ
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-medium text-zen-text mb-6">องค์ประกอบหลัก (Key Elements)</h3>
            {[
              { icon: <Search size={20} />, title: "User Research", desc: "การวิจัยเพื่อสืบค้นข้อมูลทั้งเชิงคุณภาพและปริมาณ" },
              { icon: <MousePointerClick size={20} />, title: "User Journey", desc: "กระบวนการทั้งหมดตั้งแต่ปัญหาจนถึงขั้นตอนสุดท้าย" },
              { icon: <Layout size={20} />, title: "Deliverables", desc: "Personas, Journey maps, Wireframes, Prototypes" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-zen-bg-alt">
                <div className="text-zen-matcha mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-medium text-zen-text">{item.title}</h4>
                  <p className="text-sm text-zen-text-light mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Example Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-zen-text/80 mix-blend-multiply z-10" />
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant Analogy"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 p-12 md:p-20 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">เปรียบเทียบให้เห็นภาพ</h2>
          <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed">
            <p>
              <strong className="font-medium text-zen-matcha-light">UX</strong> = การออกแบบร้านอาหารและประสบการณ์ลูกค้า 
              (การที่ผู้ใช้สามารถเลือกเมนูได้ง่าย ค้นหาร้านได้เร็ว จ่ายเงินสะดวก และได้รับอาหารตรงเวลา)
            </p>
            <p>
              <strong className="font-medium text-zen-wood-light">UI</strong> = หน้าตาเมนูอาหาร โต๊ะ และการตกแต่งภายในร้าน 
              (ปุ่ม "เพิ่มลงตะกร้า" สีที่เห็นชัดเจน, ฟอนต์ที่อ่านง่าย, ภาพอาหารที่คมชัด, การจัดวางตำแหน่งต่างๆ)
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
