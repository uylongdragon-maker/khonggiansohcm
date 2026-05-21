import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Lazily initialize GooleGenAI to avoid startup crashes if API key is not yet set up
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Return a dummy client or throw a soft warning without crashing the entire Node process
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. Chat will use rule-based fallback responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route first: AI Virtual Curator dialogue proxy
  app.post('/api/curator', async (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message payload is required' });
    }

    try {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error('Key missing');
      }

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: message,
        config: {
          systemInstruction: `Bạn là Hướng dẫn viên ảo giàu chuyên môn và học thức của Triển lãm "Không gian Văn hóa Hồ Chí Minh".
          Bạn am hiểu sâu sắc về lịch sử cách mạng, cuộc đời bôn ba cứu nước của Chủ tịch Hồ Chí Minh (Nguyễn Sinh Cung, Nguyễn Tất Thành, Nguyễn Ái Quốc), 
          các tác phẩm kiệt xuất như Nhật ký trong tù, Đường Kách mệnh, Bản Tuyên ngôn Độc lập (1945), và Bản Di chúc lịch sử (1969).
          Nhiệm vụ của bạn là giải đáp một cách kình cẩn, đầy trang trọng, thân thiện và chính xác tuyệt đối các câu hỏi của khách tham quan bằng Tiếng Việt. 
          Giữ câu trả lời cô đọng dưới 3 câu dài, giàu chiều sâu lịch sử, không trả lời lan man ngoài phạm vi đề tài di sản Hồ Chí Minh.
          Nếu câu hỏi hoàn toàn không liên quan đến cuộc đời cách mạng hoặc di sản văn hóa của Người (ví dụ: code web, giải bài tập khoa học, v.v.), hãy kéo khách tham quan về đúng chủ đề triển lãm tôn kính một cách lịch sự nhất.`,
          temperature: 0.7,
        }
      });

      const reply = response.text || 'Tôi chưa nhận được thông tin phản hồi từ hệ thống tư liệu. Xin hãy đặt câu hỏi cụ thể hơn.';
      res.json({ reply });
    } catch (err: any) {
      console.error('Error contacting Gemini API:', err.message);
      // Fallback rule-based intelligent curator responses when API is unreachable or key not set
      const lower = message.toLowerCase();
      let reply = 'Cảm ơn sự quan tâm sâu sắc của quý khách đối với di sản văn hóa Cách mạng. Tôi rất sẵn lòng thuyết minh về hành trình cứu nước của Bác.';
      
      if (lower.includes('nhà rồng') || lower.includes('nha rong') || lower.includes('1911')) {
        reply = 'Ngày 5/6/1911 tại Cảng Nhà Rồng, người thanh niên yêu nước Nguyễn Tất Thành bước lên tàu Amiral Latouche-Tréville ra đi bôn ba bốn biển năm châu cứu nước. Đây là dấu mốc thiêng liêng khai mở tương lai cách mạng Việt Nam.';
      } else if (lower.includes('pác bó') || lower.includes('pac bo') || lower.includes('1941')) {
        reply = 'Tháng 2/1941, Người vượt biên giới trở về Tổ quốc qua cột mốc 108 tại Pác Bó (Cao Bằng) trực tiếp lãnh đạo trực tiếp phong trào kháng chiến, đặt tên suối Lê-nin và núi Các-Mác.';
      } else if (lower.includes('tuyên ngôn') || lower.includes('độc lập') || lower.includes('1945')) {
        reply = 'Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời trịnh trọng đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.';
      } else if (lower.includes('nhật ký trong tù') || lower.includes('bảo vật') || lower.includes('tác phẩm')) {
        reply = 'Tập thơ "Nhật ký trong tù" gồm 133 bài thơ bằng chữ Hán viết năm 1942-1943 trong nhà lao Tưởng Giới Thạch, khắc họa rõ nét chân dung lý tưởng yêu nước và ý chí bất khuất của Người.';
      }
      
      res.json({ reply });
    }
  });

  // Hot module replacement or static hosting configuration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server fully operational on http://localhost:${PORT}`);
  });
}

startServer();
