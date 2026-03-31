import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Users, Lightbulb, LayoutTemplate } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-zen-bg-alt border border-zen-text/5 shadow-2xl shadow-zen-wood/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-multiply" />
        <div className="relative z-10 px-8 py-24 sm:px-16 sm:py-32 lg:px-24 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zen-matcha/10 text-zen-matcha font-medium text-sm mb-8 border border-zen-matcha/20"
          >
            <span className="w-2 h-2 rounded-full bg-zen-matcha animate-pulse" />
            ยินดีต้อนรับสู่ CDE118
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif text-zen-text tracking-tight leading-tight mb-8"
          >
            ออกแบบประสบการณ์ <br />
            <span className="italic text-zen-wood font-light">ที่ผู้คนหลงรัก</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl text-zen-text-light leading-relaxed max-w-2xl mb-12"
          >
            สำหรับชาวนิเทศศาสตร์ การสื่อสารไม่ได้จำกัดอยู่แค่คำพูดหรือภาพถ่าย 
            แต่คือการสร้าง "ประสบการณ์" ที่เข้าถึงใจผู้คน คลาสนี้จะพาคุณก้าวเข้าสู่โลกของ UX/UI Design 
            เปลี่ยนความซับซ้อนให้เป็นความเรียบง่าย และเปลี่ยนผู้ใช้งานให้กลายเป็นแฟนคลับ
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Link
              to="/overview"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zen-text text-zen-bg hover:bg-zen-wood transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 font-medium"
            >
              เริ่มสำรวจเนื้อหา <ArrowRight size={18} />
            </Link>
            <Link
              to="/basics"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border border-zen-text/20 text-zen-text hover:bg-zen-text/5 transition-all duration-300 font-medium"
            >
              ทำความรู้จัก UI/UX
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-zen-text mb-4">สิ่งที่คุณจะได้เรียนรู้ในคลาสนี้</h2>
          <p className="text-zen-text-light max-w-2xl mx-auto">
            เราไม่ได้สอนแค่การใช้โปรแกรม แต่เราสอนวิธีคิดแบบนักออกแบบที่เข้าใจมนุษย์
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <LayoutTemplate size={32} className="text-zen-wood" />,
              title: "พื้นฐาน UI/UX",
              desc: "เข้าใจความแตกต่างและจุดเชื่อมโยงระหว่างหน้าตาที่สวยงาม (UI) และประสบการณ์ที่ลื่นไหล (UX)",
              link: "/basics"
            },
            {
              icon: <Users size={32} className="text-zen-matcha" />,
              title: "กระบวนการออกแบบ",
              desc: "เรียนรู้วิธีคิดแบบ Human-Centered Design เอาใจเขามาใส่ใจเรา เพื่อแก้ปัญหาได้ตรงจุด",
              link: "/process"
            },
            {
              icon: <Palette size={32} className="text-zen-wood" />,
              title: "หลักการออกแบบ",
              desc: "เจาะลึกกฎเหล็กของการออกแบบ ตั้งแต่ความเรียบง่าย การจัดลำดับข้อมูล ไปจนถึงจิตวิทยาสี",
              link: "/principles"
            },
            {
              icon: <Lightbulb size={32} className="text-zen-matcha" />,
              title: "ลงมือปฏิบัติจริง",
              desc: "เปลี่ยนไอเดียให้เป็นรูปธรรมผ่านการทำ Prototype และทดสอบกับผู้ใช้งานจริง",
              link: "/overview"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-zen-text/5 hover:border-zen-wood/20 flex flex-col h-full"
            >
              <div className="w-16 h-16 rounded-2xl bg-zen-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-medium text-zen-text mb-3">{item.title}</h3>
              <p className="text-zen-text-light text-sm leading-relaxed mb-6 flex-grow">
                {item.desc}
              </p>
              <Link
                to={item.link}
                className="inline-flex items-center text-sm font-medium text-zen-wood group-hover:text-zen-matcha transition-colors mt-auto"
              >
                อ่านเพิ่มเติม <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-zen-matcha/5 rounded-3xl border border-zen-matcha/10 px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-multiply" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-zen-text leading-tight mb-8 italic">
            "UI ที่ดีทำให้สวย <br />
            <span className="text-zen-wood">UX ที่ดีทำให้ใช้ง่ายและอยากใช้ซ้ำ</span>"
          </h2>
          <p className="text-zen-text-light">
            — หัวใจสำคัญของ CDE118
          </p>
        </div>
      </section>
    </div>
  );
}
