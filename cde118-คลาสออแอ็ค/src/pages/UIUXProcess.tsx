import { motion } from "motion/react";
import { Users, Target, Lightbulb, LayoutTemplate, CheckCircle } from "lucide-react";

const processSteps = [
  {
    id: "01",
    title: "Empathize",
    icon: <Users size={28} />,
    color: "text-zen-wood",
    bg: "bg-zen-wood/10",
    desc: "ทำความเข้าใจผู้ใช้และปัญหาอย่างลึกซึ้ง",
    content: [
      { title: "User-Centric Research", desc: "เรียนรู้เกี่ยวกับผู้ใช้และความต้องการของพวกเขา เพื่อเข้าใจปัญหาที่แท้จริง" },
      { title: "User Interviews", desc: "การสนทนาแบบตัวต่อตัวเพื่อเข้าใจความต้องการ แรงจูงใจ และพฤติกรรม" },
      { title: "SAYS / THINKS / DOES / FEELS", desc: "สิ่งที่พูด, ความคิดภายใน, การกระทำที่สังเกตได้, และสถานะทางอารมณ์" }
    ]
  },
  {
    id: "02",
    title: "Define",
    icon: <Target size={28} />,
    color: "text-zen-matcha",
    bg: "bg-zen-matcha/10",
    desc: "ระบุปัญหาและกำหนดเป้าหมายที่ชัดเจน",
    content: [
      { title: "User", desc: "ควรสอดคล้องกับ persona เฉพาะ หรือ segment ผู้ใช้จริง ไม่ควรเป็น 'user' ทั่วไป" },
      { title: "Need", desc: "ควรเป็นจริง ควรเป็นของผู้ใช้ ไม่ควรถูกสร้างขึ้นโดยทีม" },
      { title: "Insight/Goal", desc: "คิดเกี่ยวกับความหวัง ความกลัว และแรงจูงใจของผู้ใช้" }
    ]
  },
  {
    id: "03",
    title: "Ideate",
    icon: <Lightbulb size={28} />,
    color: "text-zen-wood",
    bg: "bg-zen-wood/10",
    desc: "ระดมสมองเพื่อหาทางออกที่หลากหลาย",
    content: [
      { title: "Meaning", desc: "กระบวนการสร้างไอเดียจำนวนมากเพื่อแก้ปัญหาที่นิยามไว้ เน้นปริมาณก่อนคุณภาพ" },
      { title: "Technique", desc: "พยายามเน้นการระดมสมอง (Brainstorming) เป็นหลัก" },
      { title: "Foundation", desc: "ยิ่งมีไอเดียมาก โอกาสได้ทางออกที่ดีก็ยิ่งสูง ใช้แนวคิด 'Yes, and...' แทน 'No, but...'" }
    ]
  },
  {
    id: "04",
    title: "Prototype",
    icon: <LayoutTemplate size={28} />,
    color: "text-zen-matcha",
    bg: "bg-zen-matcha/10",
    desc: "สร้างต้นแบบเพื่อทดสอบไอเดีย",
    content: [
      { title: "Meaning", desc: "เวอร์ชันย่อยของผลิตภัณฑ์หรือฟีเจอร์ เพื่อใช้เรียนรู้และตัดสินใจ ไม่ใช่เวอร์ชันสุดท้าย" },
      { title: "Foundation", desc: "ทำให้เร็วและกว้างๆ บนกระดาษ, wireframe, clickable prototype ใน Figma" },
      { title: "Technique", desc: "สร้างหลายทางเลือก ด้วยการทำหลายเวอร์ชันเพื่อเปรียบเทียบ ลด bias" }
    ]
  },
  {
    id: "05",
    title: "Test",
    icon: <CheckCircle size={28} />,
    color: "text-zen-wood",
    bg: "bg-zen-wood/10",
    desc: "ทดสอบกับผู้ใช้จริงและนำผลมาปรับปรุง",
    content: [
      { title: "Meaning", desc: "นำ prototype ที่ดีที่สุดบางแบบไปให้ผู้ใช้จริงทดลอง เพื่อเก็บ feedback" },
      { title: "Technique", desc: "ผู้ใช้ทดสอบประมาณ 5 คนต่อรอบ เพียงพอจะพบปัญหา usability ส่วนใหญ่" },
      { title: "Foundation", desc: "สังเกตจุดที่ผู้ใช้ลังเล, งง, หรือทำผิด และบันทึกคำพูด/ความรู้สึก" }
    ]
  }
];

export default function UIUXProcess() {
  return (
    <div className="space-y-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zen-wood/10 text-zen-wood mb-4"
        >
          <Users size={36} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif text-zen-text tracking-tight"
        >
          กระบวนการออกแบบ UI/UX
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-zen-text-light max-w-2xl mx-auto leading-relaxed"
        >
          เป็นวิธีการแก้ปัญหาที่มุ่งเน้นผู้ใช้เป็นศูนย์กลาง (Human-Centered Design) 
          ที่ได้รับการพิสูจน์แล้วว่าสามารถสร้างผลิตภัณฑ์และบริการที่ประสบความสำเร็จได้
        </motion.p>
      </header>

      {/* Process Steps */}
      <div className="space-y-16">
        {processSteps.map((step, index) => (
          <motion.section
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Connecting Line */}
            {index !== processSteps.length - 1 && (
              <div className="absolute left-10 top-24 bottom-[-64px] w-0.5 bg-zen-text/10 hidden md:block" />
            )}

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              {/* Step Number & Icon */}
              <div className="flex items-start gap-6 md:w-1/3 shrink-0">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-sm ${step.bg} ${step.color} relative z-10`}>
                  {step.icon}
                </div>
                <div className="pt-2">
                  <div className="text-sm font-bold tracking-widest text-zen-text-light/50 mb-1">STEP {step.id}</div>
                  <h2 className="text-3xl font-serif text-zen-text">{step.title}</h2>
                  <p className="text-zen-text-light mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {/* Step Content */}
              <div className="md:w-2/3 bg-white p-8 rounded-3xl shadow-sm border border-zen-text/5">
                <div className="grid gap-6">
                  {step.content.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${index % 2 === 0 ? 'bg-zen-wood' : 'bg-zen-matcha'}`} />
                      <div>
                        <h3 className="font-medium text-zen-text text-lg">{item.title}</h3>
                        <p className="text-zen-text-light mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Quote */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-zen-text leading-tight italic">
          "I'm designing for the user. <br />
          <span className="text-zen-wood">The user is not me.</span>"
        </h2>
        <p className="text-zen-text-light mt-6">
          — Micah Bowers, Verified Expert in Design
        </p>
      </motion.section>
    </div>
  );
}
