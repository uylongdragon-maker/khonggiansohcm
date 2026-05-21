import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
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

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ error: 'Message payload is required' }, { status: 400 });
    }

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
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('Error contacting Gemini API:', err.message);
    
    // Attempting to parse body again for fallback if first parse failed (though shouldn't happen here if it threw on missing key)
    // We already parsed it above
    let message = '';
    try {
        const body = await request.clone().json();
        message = body.message || '';
    } catch (e) {
        // Ignore clone errors
    }

    const lower = message.toLowerCase();
    let reply = 'Cảm ơn sự quan tâm sâu sắc của quý khách đối với di sản văn hóa Cách mạng. Tôi rất sẵn lòng thuyết minh về hành trình cứu nước của Bác.';
    
    if (lower.includes('nhà rồng') || lower.includes('nha rong') || lower.includes('1911')) {
      reply = 'Ngày 5/6/1911 tại Cảng Nhà Rồng, người thanh niên yêu nước Nguyễn Tất Thành bước lên tàu Amiral Latouche-Tréville ra đi bôn ba bốn biển năm châu cứu nước. Đây là dấu mốc thiêng liêng khai mở tương lai cách mạng Việt Nam.';
    } else if (lower.includes('pác bó') || lower.includes('pac bo') || lower.includes('1941')) {
      reply = 'Tháng 2/1941, Người vượt biên giới trở về Tổ quốc qua cột mốc 108 tại Pác Bó (Cao Bằng) trực tiếp lãnh đạo phong trào kháng chiến, đặt tên suối Lê-nin và núi Các-Mác.';
    } else if (lower.includes('tuyên ngôn') || lower.includes('độc lập') || lower.includes('1945')) {
      reply = 'Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh thay mặt Chính phủ lâm thời trịnh trọng đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.';
    } else if (lower.includes('nhật ký trong tù') || lower.includes('bảo vật') || lower.includes('tác phẩm')) {
      reply = 'Tập thơ "Nhật ký trong tù" gồm 133 bài thơ bằng chữ Hán viết năm 1942-1943 trong nhà lao Tưởng Giới Thạch, khắc họa rõ nét chân dung lý tưởng yêu nước và ý chí bất khuất của Người.';
    }
    
    return NextResponse.json({ reply });
  }
}
