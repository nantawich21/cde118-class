import { motion } from "motion/react";
import { Palette, Type, Image as ImageIcon, Maximize, Play, CheckCircle2, LayoutGrid, MousePointerClick, Eye, ShieldCheck } from "lucide-react";

export default function UIUXPrinciples() {
  return (
    <div className="space-y-32 max-w-6xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zen-wood/10 text-zen-wood mb-4"
        >
          <LayoutGrid size={36} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-zen-text tracking-tight leading-tight"
        >
          หลักการออกแบบ <span className="text-zen-wood italic">UI/UX</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zen-text-light leading-relaxed"
        >
          กฎเหล็กของการออกแบบ ตั้งแต่ความเรียบง่าย การจัดลำดับข้อมูล 
          ไปจนถึงการสร้าง Mood and Tone ที่เหมาะสม
        </motion.p>
      </header>

      {/* Fundamental Principles */}
      <section className="space-y-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-zen-text mb-4">Fundamental Principles</h2>
          <p className="text-zen-text-light">หลักการพื้นฐาน 5 ประการของการออกแบบ UI/UX</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              num: "1",
              title: "ความเรียบง่าย",
              desc: "ลดความซับซ้อน เน้นการเข้าถึงง่าย ตัดสิ่งรบกวนและทำให้เส้นทางการใช้งานชัดเจนที่สุด (80/20 Rule)",
              icon: <LayoutGrid size={24} />
            },
            {
              num: "2",
              title: "ความสม่ำเสมอ",
              desc: "ทำให้ 'สิ่งเดิม' แสดงผลและทำงาน 'แบบเดิม' ตลอดทั้งหมด ประกอบด้วย ฟอนต์ สี ปุ่มกด รูปแบบการโต้ตอบ",
              icon: <CheckCircle2 size={24} />
            },
            {
              num: "3",
              title: "ลำดับชั้นของข้อมูล",
              desc: "ทำให้ผู้ใช้รู้ว่า 'อะไรสำคัญที่สุด' โดยไม่ต้องอ่านทุกอย่าง (F-Pattern, Z-Pattern)",
              icon: <Eye size={24} />
            },
            {
              num: "4",
              title: "การตอบสนอง",
              desc: "การกดปุ่ม/การโต้ตอบ ต้องมีการตอบสนองทันที หรือระบบต้องแจ้งสถานะให้ผู้ใช้ทราบเสมอ (Micro-interactions)",
              icon: <MousePointerClick size={24} />
            },
            {
              num: "5",
              title: "การเข้าถึง",
              desc: "รองรับผู้ใช้ทุกกลุ่ม การออกแบบให้ 'ทุกคน' ใช้งานได้ ไม่ว่าผู้ใช้จะมีข้อจำกัดถาวร ชั่วคราว หรืออยู่ในสถานการณ์ที่ไม่เอื้อ",
              icon: <ShieldCheck size={24} />
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-zen-text/5 hover:border-zen-matcha/30 transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-9xl font-serif font-bold text-zen-bg-alt -mt-8 -mr-4 z-0 transition-transform group-hover:scale-110">
                {item.num}
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zen-matcha/10 text-zen-matcha flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-medium text-zen-text mb-4">{item.title}</h3>
                <p className="text-zen-text-light leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mood and Tone */}
      <section className="space-y-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-zen-text mb-4">Mood and Tone</h2>
          <p className="text-zen-text-light">บรรยากาศหรือความรู้สึกที่ต้องการสื่อผ่านการออกแบบ</p>
        </div>

        <div className="bg-zen-bg-alt rounded-3xl p-8 md:p-12 border border-zen-text/5 shadow-inner">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Color Psychology",
                desc: "จิตวิทยาสี สร้างความประทับใจได้ตั้งแต่ครั้งแรกของการใช้งาน (90%)",
                icon: <Palette size={28} className="text-zen-wood" />,
                points: ["Warm Colors (สีอุ่น) สีแดง สีส้ม สีเหลือง", "Cool Colors (สีเย็น) สีน้ำเงิน สีเขียว สีม่วง"]
              },
              {
                title: "Typography",
                desc: "ศิลปะแห่งตัวอักษร มีผลต่อการรับรู้เวลา ประสิทธิภาพการรับรู้ และอัตราการมีส่วนร่วม",
                icon: <Type size={28} className="text-zen-matcha" />,
                points: ["Serif Fonts (ดั้งเดิม, น่าเชื่อถือ)", "Sans-Serif Fonts (ทันสมัย, สะอาดตา)"]
              },
              {
                title: "Imagery",
                desc: "การเลือกภาพประกอบ กระตุ้นอารมณ์มากกว่าข้อความ (Verbal Thought)",
                icon: <ImageIcon size={28} className="text-zen-wood" />,
                points: ["Golden Hour (อบอุ่น, โหยหาอดีต)", "สีสันสดใส (มีพลัง, สนุกสนาน)"]
              },
              {
                title: "Whitespace",
                desc: "การจัดการกับพื้นที่ว่าง พื้นที่ว่างระหว่าง/รอบองค์ประกอบ ไม่จำเป็นต้องเป็น 'สีขาว'",
                icon: <Maximize size={28} className="text-zen-matcha" />,
                points: ["Macro White Space (ระยะห่างใหญ่)", "Micro White Space (ระยะห่างเล็ก)"]
              },
              {
                title: "Motion",
                desc: "การเคลื่อนไหว การใช้ความเร็ว จังหวะ และรูปแบบการเคลื่อนที่เพื่อสื่ออารมณ์",
                icon: <Play size={28} className="text-zen-wood" />,
                points: ["Micro-interactions", "Transitions (Smooth / Cut)"]
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-zen-text/5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-zen-text mb-2">{item.title}</h3>
                  <p className="text-zen-text-light mb-4 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-zen-text-light/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-zen-text/20" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
