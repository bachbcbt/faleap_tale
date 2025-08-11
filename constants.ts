import { UserData } from './types';

const IMAGES = {
  male: [
    'https://i.postimg.cc/vHHWpmVT/nam-2.png',    
    'https://i.postimg.cc/fT2xZhcK/nam-1.png',
    'https://i.postimg.cc/tTQ3ft3G/nam-4.png',
    'https://i.postimg.cc/YCPfNwj9/nam-3.png',
    'https://i.postimg.cc/HnTQWYvS/nam-5.png',
    'https://i.postimg.cc/5yp86hZf/nam-6.png'
  ],
  female: [
    'https://i.postimg.cc/fW2RHWjM/nu-1.png',
    'https://i.postimg.cc/Y09qpTkc/nu-2.png',
    'https://i.postimg.cc/fLMRPJrR/nu-3.png',
    'https://i.postimg.cc/YqPjS2hd/nu-4.png',
    'https://i.postimg.cc/tg3gDhDc/nu-5.png',
    'https://i.postimg.cc/k4wgPq0F/nu-6.png'
  ]
};

export const STORY_CHAPTER_TEXTS = [
    (data: UserData) => `Đây là câu chuyện về ${data.name}, một sinh viên ${data.year} tại ${data.school}. ${data.name} là một người có điểm mạnh ${data.strength}, nhưng đôi lúc lại cảm thấy cần cải thiện ${data.weakness}. Với niềm đam mê lớn trong lĩnh vực ${data.interest}, ${data.name} luôn ấp ủ ước mơ ${data.dream}.`,
    (data: UserData) => `Một ngày nọ, ${data.name} khám phá ra FaLeap - một nền tảng học tập và phát triển bản thân. Nhận thấy đây là cơ hội để khắc phục điểm yếu về ${data.weakness}, ${data.name} đã bắt đầu hành trình học tập online, tiếp thu kiến thức mới và rèn luyện những kỹ năng còn thiếu.`,
    (data: UserData) => `Không chỉ dừng lại ở lý thuyết, ${data.name} đã áp dụng ngay kiến thức vào thực tế bằng cách tham gia một dự án xã hội về ${data.interest} ngay trên FaLeap. Đây là lúc kỹ năng về ${data.strength} của bạn thực sự tỏa sáng, góp phần tạo nên những giá trị tích cực.`,
    (data: UserData) => `Qua mỗi dự án, hồ sơ năng lực của ${data.name} trên FaLeap ngày càng ấn tượng. Mỗi kỹ năng, mỗi kinh nghiệm đều được chứng thực và gắn liền với các hoạt động thực tế. Những câu chuyện tạo tác động xã hội được ghi lại, trở thành minh chứng rõ nét cho hành trình trưởng thành của bạn.`,
    (data: UserData) => `Hồ sơ năng lực ấn tượng này đã mở ra cho ${data.name} vô vàn cơ hội. Các nhà tuyển dụng và những dự án lớn đã tìm đến bạn. Cuối cùng, ${data.name} đã đạt được trải nghiệm ao ước, một bước đệm vững chắc trên con đường sự nghiệp.`,
    (data: UserData) => `Nhưng ${data.name} không dừng lại. Với kinh nghiệm và sự tự tin đã có, bạn quyết định tự tạo một dự án của riêng mình trên FaLeap, hiện thực hóa ước mơ ${data.dream} và tiếp tục lan tỏa giá trị cho cộng đồng. Hành trình của ${data.name} là nguồn cảm hứng cho rất nhiều bạn trẻ khác.`
];

export const getImagesByGender = (gender: 'male' | 'female'): string[] => {
    return IMAGES[gender];
}