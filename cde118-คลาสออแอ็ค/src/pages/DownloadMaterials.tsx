import { useState } from "react";
import { motion } from "motion/react";
import Swal from "sweetalert2";
import { Search, FileText, Download, BookOpen, Layout, Layers, Monitor } from "lucide-react";

const materials = [
  {
    title: "CDE118 - Course Syllabus",
    url: "https://drive.google.com/file/d/1VHz2yh_Q_TX-slgEJigHYhKM47TO6I5K/view?usp=sharing",
    icon: <FileText className="w-8 h-8 text-zen-wood" />,
    description: "รายละเอียดวิชาและแผนการสอนตลอดภาคการศึกษา",
  },
  {
    title: "พื้นฐานของ UIUX",
    url: "https://drive.google.com/file/d/1Y3TBGaTwq32XWLNJ3YnIDG69I3BbyIvp/view?usp=sharing",
    icon: <BookOpen className="w-8 h-8 text-zen-matcha" />,
    description: "ความเข้าใจเบื้องต้นเกี่ยวกับ User Interface และ User Experience",
  },
  {
    title: "กระบวนการออกแบบ UIUX",
    url: "https://drive.google.com/file/d/11wFKm4lREpcFxmpCIaE3GZCOAYWpbGtI/view?usp=sharing",
    icon: <Layers className="w-8 h-8 text-zen-wood" />,
    description: "ขั้นตอนและวิธีการทำงานในการออกแบบผลิตภัณฑ์ดิจิทัล",
  },
  {
    title: "หลักการออกแบบ UIUX ครั้งที่ 1",
    url: "https://drive.google.com/file/d/1zwvnXxKiHQMnjhL9-TyFBnvmMQWjYcTs/view?usp=sharing",
    icon: <Layout className="w-8 h-8 text-zen-matcha" />,
    description: "หลักการออกแบบเบื้องต้น การจัดวาง และการใช้สี",
  },
  {
    title: "หลักการออกแบบ UIUX ครั้งที่ 2",
    url: "https://drive.google.com/file/d/17IR25cadwLPg0yL_GBx4kDKHct6tsHjI/view?usp=sharing",
    icon: <Monitor className="w-8 h-8 text-zen-wood" />,
    description: "การออกแบบเชิงลึก การโต้ตอบ และการทดสอบผู้ใช้",
  },
];

export default function DownloadMaterials() {
  const [studentId, setStudentId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFound, setIsFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกรหัสนักศึกษา",
        confirmButtonColor: "#5A5A40",
      });
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1z-GhVBht6QRFwhGae2Dn9kEWygytHJLRuY2t_M2vw-E/export?format=csv"
      );
      const text = await response.text();
      
      // Simple check if the student ID exists anywhere in the CSV
      if (text.includes(studentId.trim())) {
        setIsFound(true);
      } else {
        setIsFound(false);
        Swal.fire({
          icon: "error",
          title: "ไม่พบข้อมูล",
          text: "ไม่พบข้อมูลนักเรียนในระบบ ขอให้คุณกรอกรหัสนักศึกษาให้ถูกต้อง",
          confirmButtonColor: "#5A5A40",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับระบบได้ในขณะนี้",
        confirmButtonColor: "#5A5A40",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-zen-text mb-6">
          ดาวน์โหลดเอกสารประกอบการเรียน
        </h1>
        <p className="text-lg text-zen-text-light max-w-2xl mx-auto">
          กรุณากรอกรหัสนักศึกษาเพื่อเข้าถึงเอกสารประกอบการเรียนทั้งหมด
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-zen-text/5 mb-12"
      >
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div className="flex-grow relative">
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="รหัสนักศึกษา (เช่น 1640000000)"
              className="w-full px-6 py-4 rounded-full bg-zen-bg border border-zen-text/10 focus:outline-none focus:ring-2 focus:ring-zen-matcha/50 focus:border-zen-matcha transition-all text-zen-text"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-8 py-4 rounded-full bg-zen-wood text-white font-medium hover:bg-zen-wood/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search size={20} />
            )}
            <span>ค้นหา</span>
          </button>
        </form>
      </motion.div>

      {isFound && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {materials.map((material, index) => (
            <motion.a
              key={index}
              href={material.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="group bg-white rounded-3xl p-6 shadow-sm border border-zen-text/5 hover:shadow-md hover:border-zen-matcha/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-zen-bg group-hover:bg-zen-matcha/10 transition-colors">
                  {material.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-zen-text group-hover:text-zen-matcha transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-sm text-zen-text-light mt-1">
                    {material.description}
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-end text-zen-wood group-hover:text-zen-matcha transition-colors font-medium text-sm">
                <span className="flex items-center gap-1">
                  ดาวน์โหลด <Download size={16} />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}
    </div>
  );
}
