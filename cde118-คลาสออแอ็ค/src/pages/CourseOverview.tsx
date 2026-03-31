import { motion } from "motion/react";
import { BookOpen, Calendar, Award, CheckCircle2 } from "lucide-react";

export default function CourseOverview() {
  return (
    <div className="space-y-20 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zen-wood/10 text-zen-wood mb-4"
        >
          <BookOpen size={36} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif text-zen-text tracking-tight"
        >
          ภาพรวมเนื้อหา
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-zen-text-light max-w-2xl mx-auto leading-relaxed"
        >
          CDE118 UX/UI Design: หลักการและทฤษฎีการออกแบบโดยมีมนุษย์เป็นศูนย์กลาง
          ฝึกปฏิบัติการออกแบบประสบการณ์ของผู้ใช้ในรูปแบบออนไลน์และออฟไลน์
        </motion.p>
      </header>

      {/* Description Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-serif text-zen-text border-l-4 border-zen-matcha pl-4">
            คำอธิบายรายวิชา
          </h2>
          <p className="text-zen-text-light leading-relaxed">
            เรียนรู้กระบวนการคิดเชิงออกแบบ (Design Thinking) ที่ครอบคลุมทั้งกระบวนการให้สอดคล้องกับพฤติกรรมที่เปลี่ยนแปลงไปของผู้ใช้ 
            การปฏิสัมพันธ์ระหว่างผู้ใช้กับเว็บไซต์และแอปพลิเคชัน โดยคำนึงถึงเทคโนโลยีอินเทอร์เฟซร่วมกับกระบวนการคิดเชิงออกแบบ
          </p>
          <ul className="space-y-3 text-zen-text-light">
            {[
              "ประยุกต์ใช้เนื้อหาเกี่ยวกับการวางแผนการเล่าเรื่อง",
              "อธิบายหลักการและรูปแบบการเล่าเรื่องผ่านการออกแบบ",
              "จัดกลุ่มข้อมูลที่มีความสำคัญเพื่อเชื่อมโยงเรื่องราว",
              "ประยุกต์ใช้วิธีการผลิตสื่อที่ผสมผสานเทคโนโลยี"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-zen-matcha shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop"
            alt="UX/UI Design Workspace"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Evaluation & Grading */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zen-text/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-zen-text mb-4">การวัดประเมินผล</h2>
          <p className="text-zen-text-light">คะแนนเต็ม 100 คะแนน แบ่งออกเป็น 3 ส่วนหลัก</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Final Project",
              score: "50",
              desc: "ตัวงานสมบูรณ์ 40 คะแนน, นำเสนอและถามตอบ 10 คะแนน (งานกลุ่ม 4-5 คน)",
              icon: <Award size={24} className="text-zen-wood" />
            },
            {
              title: "Class Assignments",
              score: "40",
              desc: "งานเดี่ยว 4 งาน (งานละ 10 คะแนน) ส่งงานในระบบ MS Teams",
              icon: <BookOpen size={24} className="text-zen-matcha" />
            },
            {
              title: "Class Attendance",
              score: "10",
              desc: "เช็คชื่อทุกคาบเรียน ลาป่วย/ลากิจได้ไม่เกิน 3 ครั้งตลอดภาคการศึกษา",
              icon: <Calendar size={24} className="text-zen-wood" />
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zen-bg-alt rounded-2xl p-6 text-center border border-zen-text/5"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-medium text-zen-text mb-2">{item.title}</h3>
              <div className="text-4xl font-serif text-zen-wood mb-4">{item.score} <span className="text-sm font-sans text-zen-text-light">คะแนน</span></div>
              <p className="text-sm text-zen-text-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Grading Scale */}
        <div className="mt-16 pt-12 border-t border-zen-text/10">
          <h3 className="text-2xl font-serif text-center text-zen-text mb-8">เกณฑ์การตัดเกรด</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { grade: "A", range: "80+" },
              { grade: "B+", range: "75-79" },
              { grade: "B", range: "70-74" },
              { grade: "C+", range: "65-69" },
              { grade: "C", range: "60-64" },
              { grade: "D+", range: "55-59" },
              { grade: "D", range: "50-54" },
              { grade: "F", range: "0-49" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-zen-bg px-6 py-3 rounded-full border border-zen-text/5 shadow-sm">
                <span className="text-xl font-serif font-medium text-zen-wood">{item.grade}</span>
                <span className="text-zen-text-light">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section>
        <h2 className="text-3xl font-serif text-zen-text mb-12 text-center">แผนการเรียน (Class Schedule)</h2>
        <div className="space-y-6">
          {[
            { week: "W.1", title: "แนะนำรายวิชา / พื้นฐานของ UI/UX" },
            { week: "W.2", title: "กระบวนการออกแบบ UI/UX" },
            { week: "W.3-4", title: "หลักการออกแบบ UI/UX (Assignment #1)" },
            { week: "W.5", title: "ศึกษาด้วยตนเอง (ไม่ต้องเข้าเรียน)" },
            { week: "W.6-10", title: "การใช้เครื่องมือในการออกแบบ Figma (Assignment #2, #3, #4)" },
            { week: "W.11-15", title: "Final Project & Presentation" },
            { week: "W.16", title: "Assessment" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-zen-text/5 hover:border-zen-matcha/30 transition-colors"
            >
              <div className="w-16 h-16 shrink-0 rounded-full bg-zen-matcha/10 flex items-center justify-center text-zen-matcha font-serif font-medium text-lg">
                {item.week}
              </div>
              <div className="text-lg text-zen-text">{item.title}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
