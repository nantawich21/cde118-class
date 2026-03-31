import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Briefcase, Award, BookOpen, Star, Mail, Phone, Facebook, Mic, ChevronDown, ChevronUp, X } from "lucide-react";

const guestSpeaker2026 = [
  {
    topic: "หลักสูตร AI Literacy",
    event: "สถาบันอุทยานการเรียนรู้ (TK Park)",
  },
  {
    topic: "การใช้ปัญญาประดิษฐ์ในการช่วยผลิตงานสร้างสรรค์",
    event: "หลักสูตรศิลปดุษฎีบัณฑิต สาขาวิชาดุริยางคศิลป์ สถาบันบัณฑิตพัฒนศิลป์",
  },
  {
    topic: "โครงการ AI NEXT พลิกโฉมทักษะดิจิทัลด้วย Generative AI",
    event: "คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก",
  },
  {
    topic: "Generative AI : เทคนิคการเขียน Prompt เพื่อสร้างสื่อใหม่อย่างมืออาชีพ",
    event: "ภาควิชาเทคโนโลยีทางการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยรามคำแหง",
  },
  {
    topic: "DEBI Creator Camp : AI for Content Marketing",
    event: "สาขาวิชาการตลาดดิจิทัล คณะบริหารธุรกิจ มหาวิทยาลัยกรุงเทพ",
  },
  {
    topic: "Generative AI for HR",
    event: "ฝ่ายทรัพยากรบุคคล THAIRATH GROUP",
  },
  {
    topic: "การใช้เทคโนโลยีเพื่อการประชาสัมพันธ์เชิงรุกยุคดิจิทัล",
    event: "สถาบันพัฒนาการประชาสัมพันธ์ กรมประชาสัมพันธ์",
  },
  {
    topic: "การใช้งาน AI เพื่อการสร้างสรรค์สื่อสำหรับ SME พลิกโฉมธุรกิจให้เติบโตอย่างยั่งยืน",
    event: "คณะบริหารธุรกิจ มหาวิทยาลัยรามคำแหง",
  }
];

const guestSpeaker2025 = [
  {
    topic: "เทคโนโลยีในยุค Next Normal ปฐมนิเทศข้าราชการใหม่ รุ่นที่ 15 16 17",
    event: "สถาบันพัฒนาบุคลากรด้านการพัฒนาผังเมือง กรมโยธาธิการและผังเมือง",
  },
  {
    topic: "อบรมทักษะดิจิทัล สำหรับการทำงานสมัยใหม่ 2023",
    event: "มหาวิทยาลัยกรุงเทพ",
  },
  {
    topic: "Virtual Reality “พลิกโฉมห้องเรียนแห่งอนาคต”",
    event: "มหาวิทยาลัยรามคำแหง",
  },
  {
    topic: "“การสร้างและพัฒนาสื่อการเรียนรู้ด้วยนวัตกรรมสุดล้ำ AI”",
    event: "โรงเรียนสันติราษฎร์วิทยาลัย",
  },
  {
    topic: "“การสื่อสารและ Workshop ในยุค AI”",
    event: "เจ้าหน้าที่ประชาสัมพันธ์ของกรุงเทพมหานคร",
  },
  {
    topic: "AI ในชีวิตประจำวัน ปฐมนิเทศข้าราชการใหม่ รุ่นที่ 19 20 21",
    event: "สถาบันพัฒนาบุคลากรด้านการพัฒนาผังเมือง กรมโยธาธิการและผังเมือง",
  },
  {
    topic: "Exclusive Live Talk - Gen AI ChatBot ผู้ช่วยคนใหม่ทำได้ง่ายกว่าที่คิด",
    event: "LINE OpenChat",
  },
  {
    topic: "“ฝึกปฏิบัติออกแบบสื่อการสอน ระบบ E-Learning ในแนวคิด Entrepreneurship Education ด้วย AI",
    event: "มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก",
  },
  {
    topic: "\"AI Tools for Creativity & Production\" ในโครงการ D.O.T Project",
    event: "มหาวิทยาลัยกรุงเทพ",
  },
  {
    topic: "“ChatGPT ผู้ช่วยอัจฉริยะเพื่อเพิ่มศักยภาพการเกษตรในยุคดิจิทัล”",
    event: "เกษตรกร พิพิธภัณฑ์การเกษตรเฉลิมพระเกียรติ",
  },
  {
    topic: "การประยุกต์ใช้ AI ในงานตำรวจ",
    event: "วิทยาลัยการตำรวจ สำนักงานตำรวจแห่งชาติ",
  },
  {
    topic: "การใช้เทคโนโลยีผลิตสื่อนำเสนอให้น่าสนใจ ในหลักสูตรวิทยากรยาเสพติดมืออาชีพ รุ่นที่ 2",
    event: "สำนักงานคณะกรรมการป้องกันและปราบปรามยาเสพติด",
  },
  {
    topic: "การอบรมเชิงปฏิบัติการพัฒนาครูผู้สอนเพื่อส่งเสริมการนำเทคโนโลยี AI มาใช้ในการจัดการเรียนการสอนของสถานศึกษา",
    event: "สำนักงานศึกษาธิการจังหวัดนนทบุรี",
  },
  {
    topic: "การผลิตและการใช้สื่อเทคโนโลยีในการจัดการเรียนรู้",
    event: "สำนักงานส่งเสริมการเรียนรู้ประจำจังหวัดนนทบุรี",
  },
  {
    topic: "ครูไทยรัฐวิทยากับการสร้างและพัฒนาสื่อการเรียนรู้ด้วยนวัตกรรมสุดล้ำ",
    event: "มูลนิธิไทยรัฐ",
  },
  {
    topic: "บรรยายพิเศษเรื่องการใช้งาน AI เพื่อสร้างสรรค์งานวิดีโอ",
    event: "นักศึกษาปริญญาโท สถาบันบัณฑิตพัฒนบริหารศาสตร์",
  },
  {
    topic: "บรรยายพิเศษเรื่องการใช้งาน AI กับการสื่อข่าวเชิงสืบสวนสอบสวน",
    event: "นักศึกษาคณะนิเทศศาสตร์ มหาวิทยาลัยกรุงเทพ",
  },
  {
    topic: "ฝึกอบรมเชิงปฏิบัติการ Integrating AI for Next-Gen Teaching",
    event: "คณาจารย์มหาวิทยาลัยกรุงเทพ โดยสำนักพัฒนาการเรียนรู้",
  },
  {
    topic: "ปลดล็อกศักยภาพการเรียนรู้ด้วยปัญญาประดิษฐ์",
    event: "ครูโรงเรียนไทยรัฐวิทยา โดยมูลนิธิไทยรัฐ",
  },
  {
    topic: "Generative AI for Creatives",
    event: "นักศึกษาคณะมนุษยศาสตร์ มหาวิทยาลัยราชภัฏนครปฐม",
  },
  {
    topic: "การสร้างสื่อสร้างสรรค์ด้วย AI",
    event: "คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชมงคลตะวันออก",
  },
  {
    topic: "การสร้างสรรค์งานวิดีโอในพิพิธภัณฑ์ด้วยเทคโนโลยี AI",
    event: "มิวเซียมสยาม",
  }
];

export default function Instructor() {
  const [openYear, setOpenYear] = useState<string | null>(null);

  return (
    <div className="space-y-24 max-w-5xl mx-auto">
      {/* Header / Profile */}
      <section className="relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zen-text/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-zen-matcha/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-zen-wood/5 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-zen-bg shadow-xl"
          >
            {/* Using the uploaded image from the public folder */}
            <img
              src="/NTW.jpg?v=2"
              alt="Asst.Prof. Nantawich Laowishaya"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="text-center md:text-left space-y-6 flex-grow">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zen-wood/10 text-zen-wood text-sm font-medium mb-4"
              >
                INSTRUCTOR
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-serif text-zen-text tracking-tight mb-2"
              >
                Asst.Prof. NANTAWICH LAOWISHAYA
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-zen-text-light font-medium"
              >
                (ออแอ็ค)
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center md:justify-start gap-4 text-zen-text-light/80"
            >
              <div className="flex items-center gap-2">
                <Phone size={16} /> <span>087-671-3559</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} /> <span>nantawich.l@bu.ac.th</span>
              </div>
              <div className="flex items-center gap-2">
                <Facebook size={16} /> <span>Nantawich Laowishaya</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-12">
          {/* Experience */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-zen-text/10 pb-4">
              <Briefcase className="text-zen-wood" size={24} />
              <h2 className="text-2xl font-serif text-zen-text">Work Experience</h2>
            </div>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zen-text/10 before:to-transparent">
              {[
                {
                  period: "2020 - present",
                  role: "Creative content production and Digital Experience Department",
                  org: "School Of Communication Arts, Bangkok University"
                },
                {
                  period: "2001 - 2020",
                  role: "Journalism Department",
                  org: "School Of Communication Arts, Bangkok University"
                }
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white bg-zen-wood group-[.is-active]:bg-zen-matcha text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-2xl bg-white shadow-sm border border-zen-text/5">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-zen-text">{item.role}</div>
                    </div>
                    <div className="text-sm text-zen-matcha font-medium mb-2">{item.period}</div>
                    <div className="text-sm text-zen-text-light">{item.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Guest Speaker */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-zen-text/10 pb-4">
              <Mic className="text-zen-matcha" size={24} />
              <h2 className="text-2xl font-serif text-zen-text">Guest Speaker (2025 - 2026)</h2>
            </div>
            <div className="space-y-4">
              {/* 2026 Accordion */}
              <div className="bg-white rounded-2xl border border-zen-text/5 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setOpenYear(openYear === "2026" ? null : "2026")}
                  className="w-full flex items-center justify-between p-5 hover:bg-zen-bg/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-zen-matcha/10 text-zen-matcha rounded-full text-sm font-bold">
                      ปี 2026
                    </span>
                    <span className="text-zen-text-light text-sm">{guestSpeaker2026.length} รายการ</span>
                  </div>
                  {openYear === "2026" ? <ChevronUp className="text-zen-text-light" /> : <ChevronDown className="text-zen-text-light" />}
                </button>
                
                <AnimatePresence>
                  {openYear === "2026" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 space-y-3 border-t border-zen-text/5 mt-2">
                        {guestSpeaker2026.map((item, i) => (
                          <div key={i} className="p-4 rounded-xl bg-zen-bg-alt border border-zen-text/5">
                            <h3 className="font-medium text-zen-text leading-tight mb-1">{item.topic}</h3>
                            <div className="text-sm text-zen-wood font-medium">{item.event}</div>
                          </div>
                        ))}
                        <button 
                          onClick={() => setOpenYear(null)}
                          className="w-full py-3 mt-4 flex items-center justify-center gap-2 text-sm font-medium text-zen-text-light bg-zen-bg rounded-xl hover:bg-zen-text/5 transition-colors"
                        >
                          <X size={16} /> ปิดหน้าต่างปี 2026
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2025 Accordion */}
              <div className="bg-white rounded-2xl border border-zen-text/5 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setOpenYear(openYear === "2025" ? null : "2025")}
                  className="w-full flex items-center justify-between p-5 hover:bg-zen-bg/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-zen-matcha/10 text-zen-matcha rounded-full text-sm font-bold">
                      ปี 2025
                    </span>
                    <span className="text-zen-text-light text-sm">{guestSpeaker2025.length} รายการ</span>
                  </div>
                  {openYear === "2025" ? <ChevronUp className="text-zen-text-light" /> : <ChevronDown className="text-zen-text-light" />}
                </button>
                
                <AnimatePresence>
                  {openYear === "2025" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 space-y-3 border-t border-zen-text/5 mt-2">
                        {guestSpeaker2025.map((item, i) => (
                          <div key={i} className="p-4 rounded-xl bg-zen-bg-alt border border-zen-text/5">
                            <h3 className="font-medium text-zen-text leading-tight mb-1">{item.topic}</h3>
                            <div className="text-sm text-zen-wood font-medium">{item.event}</div>
                          </div>
                        ))}
                        <button 
                          onClick={() => setOpenYear(null)}
                          className="w-full py-3 mt-4 flex items-center justify-center gap-2 text-sm font-medium text-zen-text-light bg-zen-bg rounded-xl hover:bg-zen-text/5 transition-colors"
                        >
                          <X size={16} /> ปิดหน้าต่างปี 2025
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* Education */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-zen-text/10 pb-4">
              <GraduationCap className="text-zen-wood" size={24} />
              <h2 className="text-2xl font-serif text-zen-text">Education</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  period: "2001 - 2003",
                  degree: "Master's degree, School Of Communication Arts",
                  uni: "Bangkok University"
                },
                {
                  period: "1997 - 2001",
                  degree: "Bachelor's degree, School Of Communication Arts",
                  uni: "Bangkok University"
                }
              ].map((item, i) => (
                <div key={i} className="bg-zen-bg-alt p-5 rounded-2xl border border-zen-text/5">
                  <div className="text-sm text-zen-wood font-medium mb-1">{item.period}</div>
                  <div className="font-medium text-zen-text mb-1">{item.degree}</div>
                  <div className="text-sm text-zen-text-light">{item.uni}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Expertise Skills */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-zen-text/10 pb-4">
              <Star className="text-zen-matcha" size={24} />
              <h2 className="text-2xl font-serif text-zen-text">Expertise Skills</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Content Creator",
                "Technology",
                "Video Editing",
                "Data Visualization",
                "Artificial Intelligence for Communication Arts",
                "Storytelling"
              ].map((skill, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-zen-text/5 text-sm font-medium text-zen-text text-center flex items-center justify-center min-h-[80px]">
                  {skill}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Subjects */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-zen-text/10 pb-4">
              <BookOpen className="text-zen-wood" size={24} />
              <h2 className="text-2xl font-serif text-zen-text">List of Subjects</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Trends in Communication Technology",
                "Marketing Technology",
                "Artificial Intelligence for Communication Arts",
                "Creative Scriptwriting and Storytelling",
                "Digital Media Narrative"
              ].map((subject, i) => (
                <li key={i} className="flex items-start gap-3 text-zen-text-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-zen-matcha mt-2 shrink-0" />
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Awards */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-zen-text/10 pb-4">
              <Award className="text-zen-matcha" size={24} />
              <h2 className="text-2xl font-serif text-zen-text">Awards</h2>
            </div>
            <div className="bg-gradient-to-br from-zen-wood/10 to-zen-matcha/10 p-6 rounded-2xl border border-zen-wood/20">
              <div className="font-serif text-lg text-zen-text mb-2">
                Bangkok University Innovative Teaching Award 2024
              </div>
              <div className="text-sm text-zen-text-light">
                Recognized for excellence and innovation in teaching methodologies.
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
