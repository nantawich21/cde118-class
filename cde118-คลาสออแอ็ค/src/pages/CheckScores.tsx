import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Swal from "sweetalert2";
import Papa from "papaparse";
import { Search, User, BookOpen, BarChart3, Users } from "lucide-react";

interface StudentData {
  "รหัสนักศึกษา": string;
  "ชื่อนามสกุล": string;
  "Section": string;
  "คะแนนรวม (50)": string;
  "คะแนนเข้าห้อง (10)": string;
  "คะแนนงานเดี่ยว (40)": string;
}

interface OverallStats {
  totalAverage: number;
  attendanceAverage: number;
  assignmentAverage: number;
  totalStudents: number;
}

export default function CheckScores() {
  const [studentId, setStudentId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const SHEET_URL = "https://docs.google.com/spreadsheets/d/1X5XRaNDwWpwAGvHL2Tpt_HMCPTNUHSZHQkXMPZ2Ewsw/export?format=csv";

  const fetchData = async (silent = false) => {
    try {
      if (!silent) setIsSearching(true);
      const response = await fetch(SHEET_URL);
      const csvText = await response.text();
      
      Papa.parse<StudentData>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;
          
          // Calculate overall stats
          let totalScoreSum = 0;
          let attendanceSum = 0;
          let assignmentSum = 0;
          let validStudents = 0;

          data.forEach(row => {
            const total = parseFloat(row["คะแนนรวม (50)"]);
            const attendance = parseFloat(row["คะแนนเข้าห้อง (10)"]);
            const assignment = parseFloat(row["คะแนนงานเดี่ยว (40)"]);

            if (!isNaN(total) && !isNaN(attendance) && !isNaN(assignment)) {
              totalScoreSum += total;
              attendanceSum += attendance;
              assignmentSum += assignment;
              validStudents++;
            }
          });

          if (validStudents > 0) {
            setOverallStats({
              totalAverage: totalScoreSum / validStudents,
              attendanceAverage: attendanceSum / validStudents,
              assignmentAverage: assignmentSum / validStudents,
              totalStudents: validStudents
            });
          }

          // Update student data if already searched
          if (studentData) {
            const updatedStudent = data.find(row => row["รหัสนักศึกษา"]?.trim() === studentData["รหัสนักศึกษา"]);
            if (updatedStudent) {
              setStudentData(updatedStudent);
            }
          }

          setLastUpdated(new Date());
          if (!silent) setIsSearching(false);
        },
        error: (error: any) => {
          console.error("Error parsing CSV:", error);
          if (!silent) {
            setIsSearching(false);
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถอ่านข้อมูลจากระบบได้",
              confirmButtonColor: "#5A5A40",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      if (!silent) {
        setIsSearching(false);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเชื่อมต่อกับระบบได้ในขณะนี้",
          confirmButtonColor: "#5A5A40",
        });
      }
    }
  };

  // Initial fetch for overall stats
  useEffect(() => {
    fetchData(true);
    
    // Set up polling for real-time updates (every 10 seconds for more "live" feel)
    const intervalId = setInterval(() => {
      fetchData(true);
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

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
      const response = await fetch(SHEET_URL);
      const csvText = await response.text();
      
      Papa.parse<StudentData>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;
          const foundStudent = data.find(row => row["รหัสนักศึกษา"]?.trim() === studentId.trim());
          
          if (foundStudent) {
            setStudentData(foundStudent);
            setLastUpdated(new Date());
          } else {
            setStudentData(null);
            Swal.fire({
              icon: "error",
              title: "ไม่พบข้อมูล",
              text: "ไม่พบข้อมูลนักเรียนในระบบ ขอให้คุณกรอกรหัสนักศึกษาให้ถูกต้อง",
              confirmButtonColor: "#5A5A40",
            });
          }
          setIsSearching(false);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsSearching(false);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับระบบได้ในขณะนี้",
        confirmButtonColor: "#5A5A40",
      });
    }
  };

  const ProgressBar = ({ label, value, max, colorClass }: { label: string, value: number, max: number, colorClass: string }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    return (
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-zen-text">{label}</span>
          <span className="text-sm font-bold text-zen-text">
            {value.toFixed(1)} / {max}
          </span>
        </div>
        <div className="w-full h-4 bg-zen-text/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${colorClass}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-zen-text mb-6">
          ตรวจสอบคะแนนเก็บ
        </h1>
        <p className="text-lg text-zen-text-light max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zen-matcha opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-zen-matcha"></span>
          </span>
          Live Score - อัปเดตล่าสุด: {lastUpdated.toLocaleTimeString('th-TH')}
        </p>
      </motion.div>

      {/* Search Section */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-zen-text/5"
        >
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zen-text/10">
            <User className="w-6 h-6 text-zen-wood" />
            <h2 className="text-2xl font-serif text-zen-text">ผลคะแนนรายบุคคล</h2>
          </div>

          {studentData ? (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-8 bg-zen-bg p-6 rounded-2xl">
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm text-zen-text-light mb-1">ชื่อ-นามสกุล</p>
                  <p className="font-medium text-zen-text">{studentData["ชื่อนามสกุล"]}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm text-zen-text-light mb-1">รหัสนักศึกษา</p>
                  <p className="font-medium text-zen-text">{studentData["รหัสนักศึกษา"]}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-zen-text-light mb-1">Section</p>
                  <p className="font-medium text-zen-text">{studentData["Section"]}</p>
                </div>
              </div>

              <div className="space-y-6">
                <ProgressBar 
                  label="คะแนนรวม" 
                  value={parseFloat(studentData["คะแนนรวม (50)"]) || 0} 
                  max={50} 
                  colorClass="bg-zen-wood" 
                />
                <ProgressBar 
                  label="คะแนนเข้าห้อง" 
                  value={parseFloat(studentData["คะแนนเข้าห้อง (10)"]) || 0} 
                  max={10} 
                  colorClass="bg-zen-matcha" 
                />
                <ProgressBar 
                  label="คะแนนงานเดี่ยว" 
                  value={parseFloat(studentData["คะแนนงานเดี่ยว (40)"]) || 0} 
                  max={40} 
                  colorClass="bg-[#8B7355]" 
                />
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-zen-text-light opacity-50">
              <BookOpen className="w-16 h-16 mb-4" />
              <p>กรุณาค้นหารหัสนักศึกษาเพื่อดูผลคะแนน</p>
            </div>
          )}
        </motion.div>

        {/* Overall Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-zen-text/5"
        >
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-zen-text/10">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-zen-matcha" />
              <h2 className="text-2xl font-serif text-zen-text">ภาพรวมคะแนนทั้งคลาส</h2>
            </div>
            {overallStats && (
              <div className="flex items-center gap-2 text-sm text-zen-text-light bg-zen-bg px-3 py-1 rounded-full">
                <Users className="w-4 h-4" />
                <span>{overallStats.totalStudents} คน</span>
              </div>
            )}
          </div>

          {overallStats ? (
            <div>
              <div className="mb-8 bg-zen-bg p-6 rounded-2xl text-center">
                <p className="text-sm text-zen-text-light mb-2">คะแนนเฉลี่ยรวมทั้งคลาส</p>
                <div className="text-4xl font-serif text-zen-wood font-bold">
                  {overallStats.totalAverage.toFixed(1)} <span className="text-xl text-zen-text-light font-sans font-normal">/ 50</span>
                </div>
              </div>

              <div className="space-y-6">
                <ProgressBar 
                  label="ค่าเฉลี่ยคะแนนรวม" 
                  value={overallStats.totalAverage} 
                  max={50} 
                  colorClass="bg-zen-wood opacity-80" 
                />
                <ProgressBar 
                  label="ค่าเฉลี่ยคะแนนเข้าห้อง" 
                  value={overallStats.attendanceAverage} 
                  max={10} 
                  colorClass="bg-zen-matcha opacity-80" 
                />
                <ProgressBar 
                  label="ค่าเฉลี่ยคะแนนงานเดี่ยว" 
                  value={overallStats.assignmentAverage} 
                  max={40} 
                  colorClass="bg-[#8B7355] opacity-80" 
                />
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-zen-text-light opacity-50">
              <div className="w-8 h-8 border-4 border-zen-matcha/30 border-t-zen-matcha rounded-full animate-spin mb-4" />
              <p>กำลังโหลดข้อมูลภาพรวม...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
