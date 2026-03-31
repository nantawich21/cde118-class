import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, User, CheckCircle2, XCircle, AlertCircle, ChevronRight, ChevronLeft, Save } from "lucide-react";
import Swal from "sweetalert2";
import Papa from "papaparse";
import { cn } from "../lib/utils";

// Mock questions based on the provided Google Doc
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "ในการพัฒนาแอปพลิเคชันซื้อของออนไลน์ หากผู้ใช้กล่าวว่า \"แอปนี้มีสีสันที่สวยงามมาก แต่ฉันหาปุ่มชำระเงินไม่เจอและไม่รู้ว่าต้องทำอย่างไรต่อ\" สถานการณ์นี้สะท้อนถึงปัญหาในด้านใดชัดเจนที่สุด?",
    options: [
      "ปัญหาด้าน UI (User Interface) เพียงอย่างเดียว",
      "ปัญหาด้าน UX (User Experience) เพียงอย่างเดียว",
      "UI มีประสิทธิภาพสูง แต่ UX มีประสิทธิภาพต่ำ",
      "UX มีประสิทธิภาพสูง แต่ UI มีประสิทธิภาพต่ำ"
    ],
    answer: 2
  },
  {
    id: 2,
    question: "หากคุณกำลังทำ User Research เพื่อหา \"เหตุผลและแรงจูงใจ\" ว่าทำไมผู้ใช้ถึงเลิกใช้งานแอปพลิเคชันกลางคัน คุณควรใช้วิธีการเก็บข้อมูลแบบใดจึงจะเหมาะสมที่สุด?",
    options: [
      "Quantitative Data ผ่านการทำ Online Survey จำนวน 500 คน",
      "Qualitative Data ผ่านการทำ In-depth Interview และ Observation",
      "Analytics Data ผ่านการดู Heatmap และ Click-through Rate",
      "Big Data โดยการวิเคราะห์พฤติกรรมการซื้อย้อนหลัง 1 ปี"
    ],
    answer: 1
  },
  {
    id: 3,
    question: "ในขั้นตอนการทำ Empathy Map หากผู้ใช้ระบุว่า \"ฉันรู้สึกกังวลเมื่อต้องกรอกรหัสบัตรเครดิตในแอปที่ไม่คุ้นเคย\" ข้อมูลนี้ควรจัดอยู่ในส่วนใดเพื่อให้นำไปวิเคราะห์ Pain Point ได้แม่นยำที่สุด?",
    options: [
      "Says",
      "Thinks",
      "Does",
      "Feels"
    ],
    answer: 3
  },
  {
    id: 4,
    question: "การเขียน \"User Need Statement\" ในขั้นตอน Define ข้อใดต่อไปนี้เป็นการเขียนที่มุ่งเน้น \"เป้าหมายที่แท้จริง\" (Insight) มากกว่าการระบุแค่ฟีเจอร์?",
    options: [
      "ผู้ใช้ต้องการปุ่มสแกนใบหน้าเพื่อความรวดเร็วในการเข้าระบบ",
      "ผู้ใช้ต้องการระบบแจ้งเตือนเมื่อยอดเงินในบัญชีต่ำกว่า 500 บาท",
      "พนักงานออฟฟิศที่ทำงานหนักต้องการวิธีการจัดการตารางเวลาที่ยืดหยุ่นเพราะตารางงานมักเปลี่ยนกะทันหัน",
      "นักศึกษาต้องการแอปพลิเคชันที่มีฟอนต์ขนาดใหญ่และสีสันสดใสเพื่อให้อ่านง่าย"
    ],
    answer: 2
  },
  {
    id: 5,
    question: "ในช่วง Ideate หากทีมเกิดความขัดแย้งเรื่องไอเดียที่ดูเหมือนจะเป็นไปไม่ได้ในทางเทคนิค ผู้ออกแบบควรใช้ทัศนคติ (Mindset) ใดเพื่อประคับประคองกระบวนการสร้างสรรค์?",
    options: [
      "\"No, but...\" เพื่อดึงทีมกลับมาสู่ความเป็นจริงทันที",
      "\"Yes, and...\" เพื่อต่อยอดไอเดียให้ไปสุดทางก่อนจะคัดเลือกภายหลัง",
      "การใช้ระบบโหวตเสียงข้างมากเพื่อตัดไอเดียที่ไม่สมเหตุสมผลออกไป",
      "การให้หัวหน้าโครงการเป็นผู้ตัดสินใจเลือกไอเดียที่ประหยัดงบที่สุด"
    ],
    answer: 1
  },
  {
    id: 6,
    question: "คุณต้องการทดสอบ \"User Flow\" ของแอปพลิเคชันใหม่ โดยต้องการแก้ไขได้ทันทีและเสียค่าใช้จ่ายน้อยที่สุด คุณควรเลือกทำ Prototype รูปแบบใด?",
    options: [
      "High-fidelity Prototype ที่ใส่สีและรูปภาพจริงทั้งหมด",
      "Interactive Prototype ในโปรแกรม Figma ที่กดเปลี่ยนหน้าได้จริง",
      "Low-fidelity Paper Prototype หรือการวาด Wireframe บนกระดาษ",
      "HTML/CSS Prototype เพื่อดูการแสดงผลบน Browser จริง"
    ],
    answer: 2
  },
  {
    id: 7,
    question: "ตามหลักการ Usability Testing การทดสอบกับผู้ใช้จำนวน 5 คนต่อรอบ มีความสำคัญอย่างไรในเชิงการออกแบบ?",
    options: [
      "เป็นจำนวนขั้นต่ำตามกฎหมายของการทำวิจัยในระดับสากล",
      "เพียงพอที่จะพบปัญหาด้านการใช้งาน (Usability Issues) ส่วนใหญ่ได้ถึง 85%",
      "เพื่อให้ได้ผลลัพธ์ทางสถิติที่แม่นยำและเป็นตัวแทนของคนทั้งประเทศ",
      "เป็นจำนวนที่เหมาะสมกับงบประมาณของบริษัทขนาดเล็กเท่านั้น"
    ],
    answer: 1
  },
  {
    id: 8,
    question: "หลักการ \"Simplicity\" (ความเรียบง่าย) ในการออกแบบ UI มักถูกนำมาประยุกต์ใช้กับกฎ 80/20 อย่างไร?",
    options: [
      "พื้นที่ 80% ต้องเป็นสีขาว และ 20% เป็นเนื้อหา",
      "ผู้ใช้ 80% จะใช้งานฟีเจอร์เพียง 20% ของทั้งหมด จึงควรเน้นฟีเจอร์ที่จำเป็น (Essentials)",
      "ควรใช้ฟอนต์เพียง 20% ของขนาดหน้าจอทั้งหมดเพื่อความสะอาดตา",
      "การออกแบบต้องเสร็จ 80% ภายในเวลา 20% ของโปรเจกต์"
    ],
    answer: 1
  },
  {
    id: 9,
    question: "หากปุ่ม \"ตกลง\" ในหน้าแรกของแอปเป็นสีน้ำเงินและวางไว้ด้านขวา แต่ในหน้าถัดไปกลับเป็นสีเขียวและวางไว้ด้านซ้าย สถานการณ์นี้ถือว่าละเมิดหลักการออกแบบข้อใด?",
    options: [
      "Internal Consistency",
      "External Consistency",
      "Visual Hierarchy",
      "Accessibility"
    ],
    answer: 0
  },
  {
    id: 10,
    question: "การจัดวางเนื้อหาบนเว็บไซต์ที่มีข้อมูลจำนวนมาก (เช่น เว็บไซต์ข่าว) ควรจัดลำดับสายตาผู้ใช้ตามรูปแบบใดจึงจะสอดคล้องกับพฤติกรรมธรรมชาติมากที่สุด?",
    options: [
      "Z-Pattern",
      "F-Pattern",
      "Radial Pattern",
      "Circular Pattern"
    ],
    answer: 1
  },
  {
    id: 11,
    question: "ในการออกแบบระบบเพื่อรองรับ \"ผู้ตาบอดสี\" (Accessibility) ข้อใดคือวิธีการแจ้งเตือนข้อผิดพลาด (Error Message) ที่ดีที่สุด?",
    options: [
      "เปลี่ยนขอบช่องกรอกข้อมูลเป็นสีแดงเพียงอย่างเดียว",
      "ใช้สีแดงร่วมกับไอคอนเครื่องหมายตกใจและข้อความระบุสาเหตุ",
      "ใช้ตัวอักษรสีเขียวเพื่อให้ดูเป็นมิตรและไม่น่ากลัว",
      "ใช้การสั่นของโทรศัพท์เพียงอย่างเดียวโดยไม่แสดงผลบนหน้าจอ"
    ],
    answer: 1
  },
  {
    id: 12,
    question: "หากผู้ใช้กดปุ่ม \"อัปโหลดไฟล์\" แล้วระบบนิ่งไป 2 วินาทีโดยไม่มีการเปลี่ยนแปลงใดๆ บนหน้าจอ ปัญหานี้เกี่ยวข้องกับหลักการใดใน Fundamental Principles?",
    options: [
      "Simplicity (ความเรียบง่าย)",
      "Response (การตอบสนอง)",
      "Hierarchy (ลำดับชั้น)",
      "Consistency (ความสม่ำเสมอ)"
    ],
    answer: 1
  },
  {
    id: 13,
    question: "ในการกำหนด Mood & Tone หากคุณต้องการสื่อถึงความ \"มั่นคง น่าเชื่อถือ และเป็นทางการ\" สำหรับแอปพลิเคชันธนาคาร คุณควรเลือกคู่สีและฟอนต์สไตล์ใด?",
    options: [
      "สีเหลืองสดใส คู่กับฟอนต์ลายมือ (Handwriting)",
      "สีชมพูพาสเทล คู่กับฟอนต์ Sans-serif แบบบาง",
      "สีน้ำเงินเข้ม คู่กับฟอนต์ที่มีหัว (Serif) หรือ Sans-serif ที่มีน้ำหนักมั่นคง",
      "สีเขียวนีออน คู่กับฟอนต์ Script (ตัวเขียน)"
    ],
    answer: 2
  },
  {
    id: 14,
    question: "ฟอนต์ประเภท \"Sans-serif\" (ไม่มีหัว) มักถูกเลือกใช้ในงานออกแบบ UI สมัยใหม่ด้วยเหตุผลหลักในข้อใด?",
    options: [
      "ให้ความรู้สึกหรูหราและคลาสสิกเหมือนหนังสือพิมพ์",
      "อ่านง่ายบนหน้าจอดิจิทัลและให้ความรู้สึกทันสมัย (Modern)",
      "ช่วยประหยัดพื้นที่ในการจัดวางมากกว่าฟอนต์ประเภทอื่น",
      "เป็นฟอนต์ประเภทเดียวที่รองรับการทำ Responsive Design"
    ],
    answer: 1
  },
  {
    id: 15,
    question: "การใช้พื้นที่ว่างแบบ \"Micro White Space\" ส่งผลต่อการออกแบบอย่างไรชัดเจนที่สุด?",
    options: [
      "ช่วยแยกส่วนเนื้อหาขนาดใหญ่ (Content Blocks) ออกจากกัน",
      "เพิ่มความสามารถในการอ่าน (Readability) เช่น ระยะห่างระหว่างบรรทัดและตัวอักษร",
      "ทำให้แอปพลิเคชันดูมีราคาแพงและหรูหราขึ้น",
      "ช่วยลดจำนวนหน้าจอที่ต้องออกแบบใน User Journey"
    ],
    answer: 1
  },
  {
    id: 16,
    question: "การเลือกใช้ภาพประกอบ (Imagery) สไตล์ \"Authentic & Candid\" (ภาพที่เป็นธรรมชาติ) เหมาะกับธุรกิจประเภทใดมากที่สุด?",
    options: [
      "ธุรกิจเทคโนโลยี AI ขั้นสูง",
      "ธุรกิจประกันภัยที่เน้นความคุ้มครองชีวิต",
      "ธุรกิจ Social Media หรือ Lifestyle ที่เน้นความเป็นมนุษย์และความจริงใจ",
      "ธุรกิจก่อสร้างและเครื่องจักรหนัก"
    ],
    answer: 2
  },
  {
    id: 17,
    question: "ระยะเวลา (Duration) ที่เหมาะสมสำหรับ \"Transitions\" หรือการเคลื่อนไหวระหว่างหน้าจอ เพื่อไม่ให้ผู้ใช้รู้สึกว่าระบบ \"ช้า\" หรือ \"เร็ว\" เกินไป ควรอยู่ที่ประมาณเท่าใด?",
    options: [
      "10 - 50 ms",
      "200 - 400 ms",
      "1,000 - 1,500 ms",
      "มากกว่า 2,000 ms ขึ้นไป"
    ],
    answer: 1
  },
  {
    id: 18,
    question: "หากต้องการออกแบบหน้า Home Page ของบริษัทที่เน้น \"ความมั่นคง และความเป็นทางการ\" (เช่น หน่วยงานราชการ) ควรเลือกใช้ Balance แบบใด?",
    options: [
      "Asymmetrical Balance (ความสมดุลแบบไม่สมมาตร)",
      "Symmetrical Balance (ความสมดุลแบบสมมาตร)",
      "Radial Balance (ความสมดุลแบบรัศมี)",
      "Mosaic Balance (ความสมดุลแบบกระจาย)"
    ],
    answer: 1
  },
  {
    id: 19,
    question: "ข้อใดคือความแตกต่างที่สำคัญที่สุดระหว่าง \"User Flow\" และ \"User Journey\"?",
    options: [
      "User Flow เน้นอารมณ์ผู้ใช้ แต่ User Journey เน้นขั้นตอนในระบบ",
      "User Flow เน้นเส้นทางทางเทคนิคในแอป แต่ User Journey เน้นประสบการณ์ภาพรวมตั้งแต่ก่อนเริ่มจนจบงาน",
      "User Flow ใช้ในขั้นตอน Empathize แต่ User Journey ใช้ในขั้นตอน Prototype",
      "ทั้งสองอย่างไม่มีความแตกต่างกัน สามารถใช้แทนกันได้"
    ],
    answer: 1
  },
  {
    id: 20,
    question: "เมื่อผู้ออกแบบทำให้ปุ่ม \"ซื้อเลย\" มีขนาดใหญ่และสีเด่นกว่าปุ่ม \"ยกเลิก\" วัตถุประสงค์หลักคืออะไร?",
    options: [
      "เพื่อความสวยงามตามหลักศิลปะ",
      "เพื่อลดขั้นตอนการทำงานของโปรแกรมเมอร์",
      "เพื่อชี้นำสายตา (Guiding the Eye) ไปยังจุดที่สำคัญที่สุด (Primary Action)",
      "เพื่อให้หน้าจอดูไม่ว่างจนเกินไป"
    ],
    answer: 2
  }
];

interface StudentData {
  id: string;
  name: string;
  section: string;
  score?: string;
}

export default function MockExam() {
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [hasPreviousScore, setHasPreviousScore] = useState(false);
  
  // Exam State
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [questions, setQuestions] = useState<typeof MOCK_QUESTIONS>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1D-MAKJixakJEpnM9moz7w_A-iGa2aj6yXYRb7idAXQc/export?format=csv";
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyC7kiHu8CttBVgszZsuR8UV3sLzga7B3_1okqu3CKQ9b8_dmYtlsiJ1qPp1K5vfSek/exec";

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

    setIsLoading(true);
    try {
      const response = await fetch(SHEET_CSV_URL);
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as any[];
          // Find student by ID. Assuming columns: "รหัสนักศึกษา", "ชื่อ นามสกุล", "Section", "คะแนนสอบ"
          const student = data.find(row => 
            row["รหัสนักศึกษา"]?.toString().trim() === studentId.trim() ||
            row["รหัสนักศึกษา"]?.toString().trim() === studentId.trim().replace(/-/g, '')
          );

          if (student) {
            const parsedStudent: StudentData = {
              id: student["รหัสนักศึกษา"],
              name: student["ชื่อนามสกุล"] || student["ชื่อ นามสกุล"] || student["ชื่อ-นามสกุล"],
              section: student["Section"] || student["เซคชั่น"],
              score: student["คะแนนสอบ"]
            };
            
            setHasPreviousScore(!!parsedStudent.score && parsedStudent.score.trim() !== "");
            setStudentData(parsedStudent);
            
            Swal.fire({
              icon: "info",
              title: "ข้อมูลส่วนบุคคลถูกต้อง เริ่มทำการทดสอบได้",
              html: `
                <div class="text-left space-y-2 mt-4">
                  <p><strong>ชื่อ-นามสกุล:</strong> ${parsedStudent.name}</p>
                  <p><strong>รหัสนักศึกษา:</strong> ${parsedStudent.id}</p>
                  <p><strong>Section:</strong> ${parsedStudent.section}</p>
                </div>
              `,
              showCancelButton: true,
              confirmButtonText: "ยืนยัน",
              cancelButtonText: "ปฏิเสธ",
              confirmButtonColor: "#5A5A40",
              cancelButtonColor: "#d33",
            }).then((result) => {
              if (result.isConfirmed) {
                startExam();
              } else {
                resetAll();
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "ไม่พบข้อมูลนักเรียนในระบบ",
              text: "ขอให้คุณกรอกรหัสนักศึกษาให้ถูกต้อง",
              confirmButtonColor: "#5A5A40",
            });
          }
          setIsLoading(false);
        },
        error: () => {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
            confirmButtonColor: "#5A5A40",
          });
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้",
        confirmButtonColor: "#5A5A40",
      });
      setIsLoading(false);
    }
  };

  const startExam = () => {
    // Randomize questions
    const shuffled = [...MOCK_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsExamStarted(true);
    setIsExamFinished(false);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      checkCompletion();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const checkCompletion = () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      Swal.fire({
        icon: "warning",
        title: "คุณยังทำข้อสอบไม่ครบทุกข้อ",
        text: `เหลืออีก ${unansweredCount} ข้อที่ยังไม่ได้ทำ`,
        confirmButtonColor: "#5A5A40",
      });
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score += 1;
      }
    });
    setFinalScore(score);
    setIsExamFinished(true);
    setIsExamStarted(false);
  };

  const handleConfirmSaveScore = () => {
    const confirmText = hasPreviousScore 
      ? "ข้อมูลส่วนบุคคลถูกต้อง ระบบจะบันทึกคะแนนสอบของคุณ โดยคะแนนจะทำการบันทึกซ้ำคะแนนก่อนหน้านี้"
      : "ข้อมูลส่วนบุคคลถูกต้อง ระบบจะบันทึกคะแนนสอบของคุณ";

    Swal.fire({
      icon: "question",
      title: "ยืนยันการบันทึกคะแนน",
      text: confirmText,
      showCancelButton: true,
      confirmButtonText: "บันทึกคะแนน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#5A5A40",
      cancelButtonColor: "#d33",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        saveScore(finalScore);
      }
    });
  };

  const saveScore = (score: number) => {
    if (!studentData) return;

    Swal.fire({
      title: 'กำลังบันทึกข้อมูล...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Create a unique callback name
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    
    // Create script element for JSONP
    const script = document.createElement('script');
    
    // Define the callback function globally
    (window as any)[callbackName] = (response: any) => {
      // Clean up
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      
      if (response.status === 'success') {
        Swal.fire({
          icon: "success",
          title: "บันทึกคะแนนสำเร็จ",
          text: `คุณได้คะแนน ${score} / ${questions.length}`,
          confirmButtonColor: "#5A5A40",
        }).then(() => {
          resetAll();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: response.message || "ไม่สามารถบันทึกข้อมูลได้",
          confirmButtonColor: "#5A5A40",
        });
      }
    };

    // Handle script load error
    script.onerror = () => {
      delete (window as any)[callbackName];
      document.body.removeChild(script);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonColor: "#5A5A40",
      });
    };

    // Construct URL with parameters
    const params = new URLSearchParams({
      action: 'saveScore',
      studentId: studentData.id,
      name: studentData.name,
      section: studentData.section,
      score: score.toString(),
      callback: callbackName
    });

    script.src = `${SCRIPT_URL}?${params.toString()}`;
    document.body.appendChild(script);
  };

  const resetAll = () => {
    setStudentId("");
    setStudentData(null);
    setIsExamStarted(false);
    setIsExamFinished(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setHasPreviousScore(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zen-wood/10 text-zen-wood text-sm font-medium"
        >
          MOCK EXAM
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif text-zen-text tracking-tight"
        >
          ทดสอบความรู้ของตนเอง
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zen-text-light max-w-2xl mx-auto flex items-center justify-center gap-2"
        >
          <AlertCircle size={18} className="text-amber-500 shrink-0" />
          ข้อสอบดังกล่าวเป็นรูปแบบของ Mock Exam มีไว้เพื่อทดสอบพื้นฐานความรู้ของผู้เรียนเท่านั้น ไม่มีผลกับคะแนนเก็บใด ๆ ทั้งสิ้น
        </motion.p>
      </div>

      {!isExamStarted && !isExamFinished && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-zen-text/5"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="studentId" className="block text-sm font-medium text-zen-text">
                รหัสนักศึกษา
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zen-text-light" />
                </div>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-zen-text/20 rounded-xl focus:ring-2 focus:ring-zen-matcha focus:border-transparent outline-none transition-all"
                  placeholder="กรอกรหัสนักศึกษาของคุณ"
                  disabled={isLoading}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-zen-wood text-white py-3 px-4 rounded-xl hover:bg-zen-wood/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search size={18} />
                  <span>ค้นหา</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      )}

      {isExamStarted && (
        <div className="grid md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-zen-text/5 h-fit sticky top-24">
            <h3 className="font-serif text-lg text-zen-text mb-4">ข้อสอบทั้งหมด</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined;
                const isCurrent = currentQuestionIndex === idx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors",
                      isCurrent ? "ring-2 ring-zen-wood ring-offset-2" : "",
                      isAnswered 
                        ? "bg-zen-matcha text-white" 
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zen-matcha" />
                <span className="text-zen-text-light">ทำแล้ว</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200" />
                <span className="text-zen-text-light">ยังไม่ได้ทำ / ข้าม</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zen-text/10">
              <div className="text-sm text-zen-text-light mb-2">ความคืบหน้า</div>
              <div className="h-2 w-full bg-zen-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-zen-matcha transition-all duration-300"
                  style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                />
              </div>
              <div className="text-right text-xs text-zen-text-light mt-1">
                {Object.keys(answers).length} / {questions.length}
              </div>
            </div>
          </div>

          {/* Question Area */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-zen-text/5">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-zen-bg text-zen-wood rounded-full text-sm font-medium mb-4">
                ข้อที่ {currentQuestionIndex + 1} จาก {questions.length}
              </span>
              <h2 className="text-xl font-medium text-zen-text leading-relaxed">
                {questions[currentQuestionIndex].question}
              </h2>
            </div>

            <div className="space-y-3 mb-10">
              {questions[currentQuestionIndex].options.map((option, idx) => {
                const isSelected = answers[currentQuestionIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all",
                      isSelected 
                        ? "border-zen-matcha bg-zen-matcha/5 text-zen-text" 
                        : "border-zen-text/10 hover:border-zen-wood/50 hover:bg-zen-bg text-zen-text-light"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                        isSelected ? "border-zen-matcha" : "border-zen-text/30"
                      )}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-zen-matcha" />}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-zen-text/10">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-4 py-2 text-zen-text-light hover:text-zen-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
                <span>ย้อนกลับ</span>
              </button>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSkip}
                  className="px-4 py-2 text-zen-text-light hover:text-zen-text transition-colors"
                >
                  ข้าม
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 bg-zen-wood text-white rounded-xl hover:bg-zen-wood/90 transition-colors"
                >
                  <span>{currentQuestionIndex === questions.length - 1 ? 'ส่งคำตอบ' : 'ถัดไป'}</span>
                  {currentQuestionIndex !== questions.length - 1 && <ChevronRight size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isExamFinished && studentData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-zen-text/5 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-zen-matcha/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} className="text-zen-matcha" />
          </div>
          
          <div>
            <h2 className="text-2xl font-serif text-zen-text mb-2">ผลการทดสอบ</h2>
            <p className="text-zen-text-light">
              {studentData.name} ({studentData.id})
            </p>
            <p className="text-zen-text-light text-sm mt-1">
              Section: {studentData.section}
            </p>
          </div>

          <div className="py-6 border-y border-zen-text/10">
            <div className="text-5xl font-serif text-zen-wood mb-2">
              {finalScore} <span className="text-2xl text-zen-text-light">/ {questions.length}</span>
            </div>
            <div className="text-sm text-zen-text-light">คะแนนของคุณ</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleConfirmSaveScore}
              className="w-full flex items-center justify-center gap-2 py-3 bg-zen-wood text-white font-medium rounded-xl hover:bg-zen-wood/90 transition-colors"
            >
              <Save size={20} />
              ยืนยันและบันทึกคะแนน
            </button>
            <button
              onClick={resetAll}
              className="w-full py-3 bg-zen-bg text-zen-text font-medium rounded-xl hover:bg-zen-text/5 transition-colors"
            >
              กลับสู่หน้าเริ่มต้นโดยไม่บันทึก
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
