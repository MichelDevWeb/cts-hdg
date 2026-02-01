// Mock data for HDG website
// This file contains all placeholder data with multilingual support
// Based on docs/business-projects.md

import type { Locale } from "@/lib/i18n/config";

// ============================================
// CONTACT INFORMATION
// ============================================

export interface ContactInfo {
  company: {
    vi: string;
    en: string;
    zh: string;
  };
  address: {
    vi: string;
    en: string;
    zh: string;
  };
  phone: string;
  email: string;
  workingHours: {
    vi: string;
    en: string;
    zh: string;
  };
}

export const contactInfo: ContactInfo = {
  company: {
    vi: "CÔNG TY CỔ PHẦN TƯ VẤN THIẾT KẾ XÂY DỰNG HDG",
    en: "HDG Construction Design Consulting Joint Stock Company",
    zh: "HDG建筑设计咨询股份公司",
  },
  address: {
    vi: "125/42/27 Bùi Đình Túy, Phường Bình Thạnh, TP. Hồ Chí Minh, Việt Nam",
    en: "125/42/27 Bui Dinh Tuy Street, Binh Thanh Ward, Ho Chi Minh City, Vietnam",
    zh: "越南胡志明市平盛区裴廷推街125/42/27号",
  },
  phone: "0931313599",
  email: "info@hdgcons.com.vn",
  workingHours: {
    vi: "Thứ 2 - Thứ 6: 8:00 - 17:30",
    en: "Mon - Fri: 8:00 - 17:30",
    zh: "周一至周五: 8:00 - 17:30",
  },
};

// Office address (separate from registered address)
export const officeAddress = {
  vi: "362 Mai Chí Thọ, An Phú, TP. Hồ Chí Minh, Việt Nam",
  en: "362 Mai Chi Tho Street, An Phu Ward, Ho Chi Minh City, Vietnam",
  zh: "越南胡志明市安富区梅志寿街362号",
};

// Website
export const companyWebsite = "www.hdgcons.com.vn";

// Legal representative
export const legalRepresentative = {
  name: "Hoàng Đình Cung",
  nameEn: "Mr. Hoang Dinh Cung",
};

export function getLocalizedContactInfo(locale: Locale) {
  return {
    company: contactInfo.company[locale] || contactInfo.company.en,
    address: contactInfo.address[locale] || contactInfo.address.en,
    officeAddress: officeAddress[locale] || officeAddress.en,
    phone: contactInfo.phone,
    email: contactInfo.email,
    workingHours: contactInfo.workingHours[locale] || contactInfo.workingHours.en,
  };
}

// ============================================
// PROJECTS DATA (Based on business-projects.md)
// ============================================

export interface Project {
  slug: string;
  category: string;
  location: string;
  year: number;
  client?: string;
  scale?: string;
  services?: string[];
  coverImage: string;
  gallery?: string[];
  title: {
    vi: string;
    en: string;
    zh: string;
  };
  summary?: {
    vi: string;
    en: string;
    zh: string;
  };
  content?: {
    vi: string;
    en: string;
    zh: string;
  };
  published?: boolean;
}

export const projects: Project[] = [
  // ============================================
  // TRACODI GROUP PROJECTS (2024-Present)
  // ============================================
  {
    slug: "r-pac-factory",
    category: "industrial",
    location: "Vietnam",
    year: 2024,
    client: "Tracodi Group / ADB",
    scale: "Industrial factory complex",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy R-PAC",
      en: "R-PAC Factory",
      zh: "R-PAC工厂",
    },
    summary: {
      vi: "Dự án nhà máy công nghiệp hiện đại với thiết kế tối ưu hóa quy trình sản xuất",
      en: "Modern industrial factory with optimized production process design",
      zh: "现代化工业工厂，优化生产流程设计",
    },
    content: {
      vi: "Nhà máy R-PAC được thiết kế với công nghệ tiên tiến, tập trung vào hiệu quả sản xuất và bền vững môi trường. Dự án áp dụng các tiêu chuẩn quốc tế về an toàn lao động và quản lý chất lượng.",
      en: "R-PAC Factory is designed with cutting-edge technology, focusing on production efficiency and environmental sustainability. The project applies international standards for occupational safety and quality management.",
      zh: "R-PAC工厂采用尖端技术设计，注重生产效率和环境可持续性。项目采用国际职业安全和质量管理标准。",
    },
    published: true,
  },
  {
    slug: "hue-dormitory",
    category: "commercial",
    location: "Hue, Vietnam",
    year: 2024,
    client: "Tracodi Group / ADB",
    scale: "Student dormitory complex",
    services: ["design", "engineering", "integrated"],
    coverImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Ký túc xá Huế",
      en: "Hue Dormitory",
      zh: "顺化宿舍",
    },
    summary: {
      vi: "Khu ký túc xá sinh viên hiện đại với đầy đủ tiện nghi và không gian sống thoải mái",
      en: "Modern student dormitory with full amenities and comfortable living spaces",
      zh: "现代化学生宿舍，设施齐全，居住空间舒适",
    },
    content: {
      vi: "Ký túc xá Huế là dự án nhà ở sinh viên quy mô lớn, được thiết kế với tiêu chí tạo môi trường học tập và sinh hoạt tối ưu. Công trình tích hợp các không gian học tập chung, khu vực thể thao và các tiện ích hiện đại.",
      en: "Hue Dormitory is a large-scale student housing project designed to create optimal learning and living environments. The building integrates shared study spaces, sports areas, and modern amenities.",
      zh: "顺化宿舍是一个大型学生住房项目，旨在创造最佳的学习和生活环境。建筑整合了共享学习空间、体育区域和现代化设施。",
    },
    published: true,
  },
  {
    slug: "bestmix-ha-nam",
    category: "industrial",
    location: "Ha Nam, Vietnam",
    year: 2024,
    client: "Tracodi Group / ADB",
    scale: "Manufacturing facility",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Bestmix Hà Nam",
      en: "Bestmix Ha Nam Factory",
      zh: "Bestmix河南工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất thức ăn chăn nuôi với công nghệ hiện đại và quy trình tự động hóa",
      en: "Animal feed manufacturing plant with modern technology and automated processes",
      zh: "采用现代技术和自动化流程的动物饲料生产厂",
    },
    content: {
      vi: "Bestmix Hà Nam là nhà máy sản xuất thức ăn chăn nuôi công nghệ cao, được trang bị hệ thống tự động hóa tiên tiến. Thiết kế nhà máy tuân thủ các tiêu chuẩn an toàn thực phẩm và bảo vệ môi trường nghiêm ngặt.",
      en: "Bestmix Ha Nam is a high-tech animal feed production facility equipped with advanced automation systems. The factory design complies with strict food safety and environmental protection standards.",
      zh: "Bestmix河南是一家高科技动物饲料生产设施，配备先进的自动化系统。工厂设计符合严格的食品安全和环境保护标准。",
    },
    published: true,
  },
  {
    slug: "vn-apparel",
    category: "industrial",
    location: "Vietnam",
    year: 2024,
    client: "Tracodi Group / ADB",
    scale: "Textile manufacturing facility",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy VN Apparel",
      en: "VN Apparel Factory",
      zh: "VN Apparel工厂",
    },
    summary: {
      vi: "Nhà máy may mặc xuất khẩu với hệ thống sản xuất hiện đại và thân thiện môi trường",
      en: "Export garment factory with modern production systems and eco-friendly design",
      zh: "出口服装厂，采用现代化生产系统和环保设计",
    },
    content: {
      vi: "VN Apparel là nhà máy may mặc xuất khẩu được thiết kế theo tiêu chuẩn quốc tế, với hệ thống chiếu sáng tự nhiên tối ưu và điều hòa không khí tiên tiến. Công trình đáp ứng các yêu cầu khắt khe của các thương hiệu thời trang toàn cầu.",
      en: "VN Apparel is an export garment factory designed to international standards, with optimized natural lighting and advanced air conditioning systems. The facility meets stringent requirements of global fashion brands.",
      zh: "VN Apparel是一家按国际标准设计的出口服装厂，具有优化的自然采光和先进的空调系统。该设施满足全球时尚品牌的严格要求。",
    },
    published: true,
  },

  // ============================================
  // TUNG FENG VIETNAM PROJECTS (2022-2024)
  // ============================================
  {
    slug: "sgsu-model-house",
    category: "residential",
    location: "Ho Chi Minh City",
    year: 2023,
    client: "Tung Feng Vietnam",
    scale: "Model house showroom",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà mẫu SGSU",
      en: "SGSU Model House",
      zh: "SGSU样板房",
    },
    summary: {
      vi: "Nhà mẫu sang trọng thể hiện đẳng cấp thiết kế và chất lượng xây dựng cao cấp",
      en: "Luxurious model house showcasing premium design and construction quality",
      zh: "豪华样板房，展示高端设计和建筑质量",
    },
    content: {
      vi: "Nhà mẫu SGSU là công trình trưng bày tiêu chuẩn thiết kế và thi công của dự án bất động sản cao cấp. Mỗi chi tiết được chăm chút tỉ mỉ, từ vật liệu nội thất đến hệ thống cơ điện thông minh.",
      en: "SGSU Model House is a showcase of design and construction standards for premium real estate projects. Every detail is meticulously crafted, from interior materials to smart MEP systems.",
      zh: "SGSU样板房是高端房地产项目设计和施工标准的展示。从室内材料到智能机电系统，每个细节都精心打造。",
    },
    published: true,
  },
  {
    slug: "villa-complex",
    category: "residential",
    location: "Ho Chi Minh City",
    year: 2023,
    client: "Tung Feng Vietnam",
    scale: "Luxury villa community",
    services: ["design", "engineering", "integrated"],
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Khu biệt thự cao cấp",
      en: "Luxury Villa Complex",
      zh: "豪华别墅区",
    },
    summary: {
      vi: "Khu biệt thự đẳng cấp với thiết kế độc đáo và cảnh quan xanh mát",
      en: "Premium villa community with unique design and lush green landscapes",
      zh: "高端别墅社区，独特设计，绿意盎然",
    },
    content: {
      vi: "Khu biệt thự cao cấp được quy hoạch với mật độ xây dựng thấp, tối đa hóa không gian xanh và sự riêng tư cho cư dân. Mỗi căn biệt thự được thiết kế với phong cách kiến trúc độc đáo, hài hòa với thiên nhiên.",
      en: "The luxury villa complex is planned with low building density, maximizing green space and privacy for residents. Each villa features unique architectural style harmonized with nature.",
      zh: "豪华别墅区规划建筑密度低，最大化绿化空间和居民隐私。每栋别墅都采用独特的建筑风格，与自然和谐统一。",
    },
    published: true,
  },
  {
    slug: "chateau-project",
    category: "residential",
    location: "Ho Chi Minh City",
    year: 2022,
    client: "Tung Feng Vietnam",
    scale: "High-end residential development",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Dự án Chateau",
      en: "Chateau Project",
      zh: "城堡项目",
    },
    summary: {
      vi: "Dự án nhà ở phong cách Pháp với kiến trúc cổ điển sang trọng",
      en: "French-style residential project with elegant classical architecture",
      zh: "法式住宅项目，优雅的古典建筑",
    },
    content: {
      vi: "Chateau là dự án nhà ở mang đậm phong cách kiến trúc Pháp cổ điển, với các chi tiết trang trí tinh xảo và vật liệu cao cấp. Dự án mang đến không gian sống đẳng cấp châu Âu giữa lòng thành phố.",
      en: "Chateau is a residential project featuring classic French architecture with exquisite decorative details and premium materials. The project brings European-class living space to the heart of the city.",
      zh: "城堡是一个具有经典法式建筑风格的住宅项目，装饰细节精美，材料高档。该项目将欧洲级生活空间带到城市中心。",
    },
    published: true,
  },

  // ============================================
  // PURE VN PROJECTS (2020-2022)
  // ============================================
  {
    slug: "the-song-apartment",
    category: "residential",
    location: "Vung Tau",
    year: 2021,
    client: "Pure VN",
    scale: "Luxury residential, 30 floors",
    services: ["design", "engineering", "integrated"],
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "The Song Apartment",
      en: "The Song Apartment",
      zh: "The Song公寓",
    },
    summary: {
      vi: "Căn hộ cao cấp ven biển với tầm nhìn tuyệt đẹp ra Vịnh Vũng Tàu",
      en: "Luxury beachfront apartments with stunning views of Vung Tau Bay",
      zh: "海滨豪华公寓，俯瞰头顿湾美景",
    },
    content: {
      vi: "The Song Apartment là dự án căn hộ cao cấp tại Vũng Tàu, sở hữu vị trí đắc địa ven biển với tầm nhìn ra biển tuyệt đẹp. Thiết kế hiện đại tối ưu hóa ánh sáng tự nhiên và gió biển, mang đến trải nghiệm nghỉ dưỡng ngay trong căn hộ của bạn.",
      en: "The Song Apartment is a luxury residential project in Vung Tau, featuring prime beachfront location with stunning ocean views. Modern design optimizes natural light and sea breeze, bringing a resort experience right to your home.",
      zh: "The Song公寓是头顿的高端住宅项目，拥有优越的海滨位置和壮丽的海景。现代设计最大化自然采光和海风，为您的家带来度假体验。",
    },
    published: true,
  },
  {
    slug: "wonder-sea-office",
    category: "commercial",
    location: "Ho Chi Minh City",
    year: 2021,
    client: "Pure VN",
    scale: "Office building, 15 floors",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Tòa nhà văn phòng Wonder Sea",
      en: "Wonder Sea Office Building",
      zh: "Wonder Sea办公楼",
    },
    summary: {
      vi: "Tòa nhà văn phòng hạng A với thiết kế xanh và công nghệ tiết kiệm năng lượng",
      en: "Grade A office building with green design and energy-saving technology",
      zh: "甲级写字楼，绿色设计，节能技术",
    },
    content: {
      vi: "Wonder Sea Office là tòa nhà văn phòng hạng A tại TP.HCM, được thiết kế theo tiêu chuẩn xanh với hệ thống HVAC tiên tiến và tối ưu năng lượng. Không gian làm việc linh hoạt đáp ứng nhu cầu đa dạng của doanh nghiệp hiện đại.",
      en: "Wonder Sea Office is a Grade A office building in HCMC, designed to green standards with advanced HVAC systems and energy optimization. Flexible workspace meets diverse needs of modern businesses.",
      zh: "Wonder Sea办公楼是胡志明市的甲级写字楼，按绿色标准设计，配备先进的暖通空调系统和节能优化。灵活的工作空间满足现代企业的多样化需求。",
    },
    published: true,
  },
  {
    slug: "iml-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 2021,
    client: "Pure VN",
    scale: "Manufacturing facility, 20,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy IML",
      en: "IML Factory",
      zh: "IML工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất công nghệ cao với hệ thống tự động hóa tiên tiến",
      en: "High-tech manufacturing facility with advanced automation systems",
      zh: "高科技制造设施，配备先进的自动化系统",
    },
    content: {
      vi: "Nhà máy IML được thiết kế với công nghệ sản xuất tiên tiến, hệ thống kiểm soát chất lượng nghiêm ngặt và môi trường làm việc an toàn. Công trình đáp ứng các tiêu chuẩn quốc tế về sản xuất công nghiệp.",
      en: "IML Factory is designed with advanced manufacturing technology, strict quality control systems, and safe working environment. The facility meets international standards for industrial manufacturing.",
      zh: "IML工厂采用先进的制造技术设计，严格的质量控制系统和安全的工作环境。该设施符合工业制造的国际标准。",
    },
    published: true,
  },

  // ============================================
  // CHI THANH PROJECTS (2018-2020)
  // ============================================
  {
    slug: "newhope-factory",
    category: "industrial",
    location: "Dong Nai",
    year: 2019,
    client: "Chi Thanh / Newhope VN",
    scale: "Animal feed factory, 35,000 sqm",
    services: ["design", "engineering", "integrated"],
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Newhope VN",
      en: "Newhope VN Factory",
      zh: "新希望越南工厂",
    },
    summary: {
      vi: "Nhà máy thức ăn chăn nuôi quy mô lớn với công nghệ sản xuất tiên tiến",
      en: "Large-scale animal feed factory with advanced production technology",
      zh: "大型动物饲料厂，采用先进的生产技术",
    },
    content: {
      vi: "Newhope VN là nhà máy sản xuất thức ăn chăn nuôi hàng đầu, được trang bị dây chuyền sản xuất tự động hóa cao. Thiết kế nhà máy đảm bảo an toàn thực phẩm, kiểm soát môi trường và hiệu quả năng lượng.",
      en: "Newhope VN is a leading animal feed production facility equipped with highly automated production lines. Factory design ensures food safety, environmental control, and energy efficiency.",
      zh: "新希望越南是领先的动物饲料生产设施，配备高度自动化的生产线。工厂设计确保食品安全、环境控制和能源效率。",
    },
    published: true,
  },
  {
    slug: "nhat-pham-food",
    category: "industrial",
    location: "Binh Duong",
    year: 2019,
    client: "Chi Thanh / Nhat Pham Food",
    scale: "Food processing factory, 15,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1606836576983-8b458e75221d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606836576983-8b458e75221d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Nhat Pham Food",
      en: "Nhat Pham Food Factory",
      zh: "Nhat Pham食品厂",
    },
    summary: {
      vi: "Nhà máy chế biến thực phẩm đạt chuẩn vệ sinh an toàn thực phẩm quốc tế",
      en: "Food processing factory meeting international food safety standards",
      zh: "符合国际食品安全标准的食品加工厂",
    },
    content: {
      vi: "Nhà máy Nhat Pham Food được thiết kế theo tiêu chuẩn HACCP và ISO 22000, với hệ thống phòng sạch và kiểm soát nhiệt độ nghiêm ngặt. Công trình đảm bảo chất lượng sản phẩm từ nguyên liệu đầu vào đến thành phẩm.",
      en: "Nhat Pham Food Factory is designed to HACCP and ISO 22000 standards, with clean room systems and strict temperature control. The facility ensures product quality from raw materials to finished goods.",
      zh: "Nhat Pham食品厂按HACCP和ISO 22000标准设计，配备洁净室系统和严格的温度控制。该设施确保从原材料到成品的产品质量。",
    },
    published: true,
  },
  {
    slug: "king-yuan-tong-phase-2",
    category: "industrial",
    location: "Binh Duong",
    year: 2020,
    client: "Chi Thanh / King Yuan Tong",
    scale: "Factory expansion, 25,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy King Yuan Tong - Giai đoạn 2",
      en: "King Yuan Tong Factory - Phase 2",
      zh: "King Yuan Tong工厂 - 二期",
    },
    summary: {
      vi: "Mở rộng nhà máy sản xuất với công suất tăng gấp đôi",
      en: "Factory expansion with doubled production capacity",
      zh: "工厂扩建，产能翻倍",
    },
    content: {
      vi: "King Yuan Tong Phase 2 là dự án mở rộng nhà máy hiện hữu, tăng gấp đôi công suất sản xuất. Thiết kế tích hợp liền mạch với giai đoạn 1, đảm bảo vận hành liên tục và hiệu quả logistics.",
      en: "King Yuan Tong Phase 2 is an expansion project of the existing factory, doubling production capacity. Design integrates seamlessly with Phase 1, ensuring continuous operation and logistics efficiency.",
      zh: "King Yuan Tong二期是现有工厂的扩建项目，产能翻倍。设计与一期无缝整合，确保持续运营和物流效率。",
    },
    published: true,
  },

  // ============================================
  // SHING MARK HOSPITAL (2017)
  // ============================================
  {
    slug: "shing-mark-hospital",
    category: "commercial",
    location: "Long Binh Tan, Bien Hoa City, Dong Nai",
    year: 2017,
    client: "Shing Mark University Medical Hospital Co., Ltd",
    scale: "Hospital complex",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Bệnh viện Shing Mark",
      en: "Shing Mark Hospital",
      zh: "盛马医院",
    },
    summary: {
      vi: "Bệnh viện đại học y dược hiện đại với trang thiết bị y tế tiên tiến",
      en: "Modern university medical hospital with advanced medical equipment",
      zh: "现代化大学医院，配备先进的医疗设备",
    },
    content: {
      vi: "Bệnh viện Shing Mark là cơ sở y tế hiện đại thuộc Công ty TNHH bệnh viện Đại học Y dược Shing Mark, tọa lạc tại Long Bình Tân, TP. Biên Hòa, tỉnh Đồng Nai. Công trình được thiết kế theo tiêu chuẩn bệnh viện quốc tế với hệ thống cơ điện tiên tiến, đáp ứng các yêu cầu khắt khe về vệ sinh y tế và an toàn bệnh nhân.",
      en: "Shing Mark Hospital is a modern medical facility owned by Shing Mark University Medical Hospital Co., Ltd, located in Long Binh Tan, Bien Hoa City, Dong Nai Province. The building is designed to international hospital standards with advanced MEP systems, meeting strict requirements for medical hygiene and patient safety.",
      zh: "盛马医院是盛马大学医院有限公司拥有的现代化医疗设施，位于同奈省边和市隆平新。该建筑按国际医院标准设计，配备先进的机电系统，满足医疗卫生和患者安全的严格要求。",
    },
    published: true,
  },

  // ============================================
  // DINCO PROJECTS (2014-2018)
  // ============================================
  {
    slug: "phu-an-thanh-office",
    category: "commercial",
    location: "Ho Chi Minh City",
    year: 2017,
    client: "Dinco",
    scale: "Office building, 12 floors",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Tòa nhà văn phòng Phú An Thạnh",
      en: "Phu An Thanh Office Building",
      zh: "富安成办公楼",
    },
    summary: {
      vi: "Tòa nhà văn phòng hiện đại tại vị trí đắc địa trung tâm TP.HCM",
      en: "Modern office building in prime central HCMC location",
      zh: "位于胡志明市中心黄金地段的现代办公楼",
    },
    content: {
      vi: "Tòa nhà văn phòng Phú An Thạnh tọa lạc tại vị trí đắc địa TP.HCM, với thiết kế hiện đại và hệ thống cơ điện tiên tiến. Không gian văn phòng linh hoạt phục vụ đa dạng nhu cầu kinh doanh từ startup đến doanh nghiệp lớn.",
      en: "Phu An Thanh Office Building is located in a prime HCMC location, featuring modern design and advanced MEP systems. Flexible office space serves diverse business needs from startups to large enterprises.",
      zh: "富安成办公楼位于胡志明市黄金地段，采用现代设计和先进的机电系统。灵活的办公空间满足从初创企业到大型企业的多样化商务需求。",
    },
    published: true,
  },
  {
    slug: "heineken-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 2016,
    client: "Heineken / Dinco",
    scale: "Brewery complex, 50,000 sqm",
    services: ["engineering", "integrated"],
    coverImage: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Heineken",
      en: "Heineken Factory",
      zh: "喜力工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất bia đẳng cấp thế giới với công nghệ tiên tiến nhất",
      en: "World-class brewery with state-of-the-art technology",
      zh: "世界级啤酒厂，采用最先进的技术",
    },
    content: {
      vi: "Nhà máy Heineken tại Bình Dương là cơ sở sản xuất bia hiện đại bậc nhất Đông Nam Á, với công nghệ tiên tiến từ Hà Lan. Công trình đáp ứng tiêu chuẩn quốc tế về an toàn thực phẩm, bảo vệ môi trường và phát triển bền vững.",
      en: "Heineken Factory in Binh Duong is one of Southeast Asia's most modern breweries, featuring advanced technology from the Netherlands. The facility meets international standards for food safety, environmental protection, and sustainable development.",
      zh: "位于平阳的喜力工厂是东南亚最现代化的啤酒厂之一，采用荷兰先进技术。该设施符合食品安全、环境保护和可持续发展的国际标准。",
    },
    published: true,
  },
  {
    slug: "fukuvi-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 2015,
    client: "Fukuvi / Dinco",
    scale: "Manufacturing facility, 20,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Fukuvi",
      en: "Fukuvi Factory",
      zh: "福井工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất vật liệu xây dựng Nhật Bản với tiêu chuẩn chất lượng cao",
      en: "Japanese construction materials factory with high quality standards",
      zh: "日本建材厂，高质量标准",
    },
    content: {
      vi: "Nhà máy Fukuvi được xây dựng theo tiêu chuẩn Nhật Bản nghiêm ngặt, sản xuất các vật liệu xây dựng chất lượng cao. Thiết kế nhà máy tối ưu hóa quy trình sản xuất và đảm bảo môi trường làm việc an toàn.",
      en: "Fukuvi Factory is built to strict Japanese standards, producing high-quality construction materials. Factory design optimizes production processes and ensures safe working environment.",
      zh: "福井工厂按严格的日本标准建造，生产高质量建筑材料。工厂设计优化生产流程，确保安全的工作环境。",
    },
    published: true,
  },

  // ============================================
  // SANOFI VIETNAM (2013-2014)
  // ============================================
  {
    slug: "sanofi-pharmaceutical",
    category: "industrial",
    location: "Binh Duong",
    year: 2014,
    client: "Sanofi Vietnam",
    scale: "Pharmaceutical factory, 30,000 sqm",
    services: ["engineering", "integrated"],
    coverImage: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy dược phẩm ACE Sanofi",
      en: "ACE Sanofi Pharmaceutical Factory",
      zh: "ACE赛诺菲制药厂",
    },
    summary: {
      vi: "Nhà máy dược phẩm đạt chuẩn GMP quốc tế với hệ thống phòng sạch tiên tiến",
      en: "Pharmaceutical factory meeting international GMP standards with advanced clean room systems",
      zh: "符合国际GMP标准的制药厂，配备先进的洁净室系统",
    },
    content: {
      vi: "Nhà máy ACE Sanofi Việt Nam được xây dựng đạt tiêu chuẩn GMP quốc tế với hệ thống phòng sạch hiện đại nhất. Công trình đảm bảo môi trường sản xuất vô trùng, kiểm soát nhiệt độ và độ ẩm chính xác, đáp ứng yêu cầu khắt khe của ngành dược phẩm.",
      en: "ACE Sanofi Vietnam factory is built to international GMP standards with the most modern clean room systems. The facility ensures sterile production environment with precise temperature and humidity control, meeting stringent pharmaceutical industry requirements.",
      zh: "ACE赛诺菲越南工厂按国际GMP标准建造，配备最现代化的洁净室系统。该设施确保无菌生产环境，精确控制温度和湿度，满足制药行业的严格要求。",
    },
    published: true,
  },

  // ============================================
  // COFICO PROJECTS (2012-2013)
  // ============================================
  {
    slug: "lixil-factory",
    category: "industrial",
    location: "Dong Nai",
    year: 2013,
    client: "COFICO / Lixil",
    scale: "Manufacturing facility, 40,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Lixil",
      en: "Lixil Factory",
      zh: "骊住工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất thiết bị vệ sinh cao cấp của Nhật Bản",
      en: "Premium Japanese sanitary equipment manufacturing facility",
      zh: "日本高端卫浴设备制造厂",
    },
    content: {
      vi: "Nhà máy Lixil là cơ sở sản xuất thiết bị vệ sinh cao cấp, được thiết kế theo tiêu chuẩn Nhật Bản với dây chuyền sản xuất tự động hóa. Công trình đáp ứng các yêu cầu nghiêm ngặt về chất lượng và môi trường.",
      en: "Lixil Factory is a premium sanitary equipment production facility designed to Japanese standards with automated production lines. The facility meets stringent quality and environmental requirements.",
      zh: "骊住工厂是按日本标准设计的高端卫浴设备生产设施，配备自动化生产线。该设施满足严格的质量和环境要求。",
    },
    published: true,
  },
  {
    slug: "vina-glass-phase-3",
    category: "industrial",
    location: "Binh Duong",
    year: 2013,
    client: "COFICO / Vina Glass",
    scale: "Factory expansion, 15,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Vina Glass - Giai đoạn 3",
      en: "Vina Glass Factory - Phase 3",
      zh: "越南玻璃厂 - 三期",
    },
    summary: {
      vi: "Mở rộng nhà máy kính với công nghệ sản xuất hiện đại",
      en: "Glass factory expansion with modern production technology",
      zh: "玻璃厂扩建，采用现代生产技术",
    },
    content: {
      vi: "Vina Glass Phase 3 là dự án mở rộng nhà máy sản xuất kính, tăng cường năng lực sản xuất và đa dạng hóa sản phẩm. Thiết kế tích hợp công nghệ mới nhất trong ngành kính xây dựng.",
      en: "Vina Glass Phase 3 is a glass manufacturing expansion project, enhancing production capacity and product diversification. Design integrates latest technology in construction glass industry.",
      zh: "越南玻璃三期是玻璃制造扩建项目，提升产能和产品多样化。设计整合建筑玻璃行业最新技术。",
    },
    published: true,
  },
  {
    slug: "vina-koyei",
    category: "industrial",
    location: "Dong Nai",
    year: 2012,
    client: "COFICO / Vina Koyei",
    scale: "Steel manufacturing, 25,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Vina Koyei",
      en: "Vina Koyei Factory",
      zh: "越南Koyei工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất thép với công nghệ Nhật Bản",
      en: "Steel manufacturing plant with Japanese technology",
      zh: "采用日本技术的钢铁制造厂",
    },
    content: {
      vi: "Nhà máy Vina Koyei chuyên sản xuất các sản phẩm thép chất lượng cao, áp dụng công nghệ và quy trình quản lý của Nhật Bản. Công trình được thiết kế đảm bảo an toàn lao động và bảo vệ môi trường.",
      en: "Vina Koyei Factory specializes in high-quality steel products, applying Japanese technology and management processes. The facility is designed to ensure occupational safety and environmental protection.",
      zh: "越南Koyei工厂专门生产高质量钢铁产品，采用日本技术和管理流程。该设施的设计确保职业安全和环境保护。",
    },
    published: true,
  },
  {
    slug: "air-water-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 2012,
    client: "COFICO / Air Water",
    scale: "Industrial gas facility, 10,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Air Water",
      en: "Air Water Factory",
      zh: "Air Water工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất khí công nghiệp với tiêu chuẩn an toàn cao nhất",
      en: "Industrial gas production facility with highest safety standards",
      zh: "工业气体生产设施，最高安全标准",
    },
    content: {
      vi: "Air Water là nhà máy sản xuất khí công nghiệp được thiết kế với các tiêu chuẩn an toàn nghiêm ngặt nhất. Hệ thống kiểm soát và giám sát tự động đảm bảo vận hành an toàn 24/7.",
      en: "Air Water is an industrial gas production facility designed with the strictest safety standards. Automated control and monitoring systems ensure safe 24/7 operation.",
      zh: "Air Water是按最严格安全标准设计的工业气体生产设施。自动化控制和监控系统确保24/7安全运行。",
    },
    published: true,
  },

  // ============================================
  // COLGATE PALMOLIVE (2007-2012)
  // ============================================
  {
    slug: "colgate-palmolive-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 2011,
    client: "Colgate Palmolive",
    scale: "Factory complex, 40,000 sqm",
    services: ["engineering", "integrated"],
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Colgate Palmolive Mỹ Phước",
      en: "Colgate Palmolive My Phuoc Factory",
      zh: "高露洁棕榄美福工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất hàng tiêu dùng đẳng cấp quốc tế với dây chuyền tự động hóa",
      en: "International-class consumer goods factory with automated production lines",
      zh: "国际级日用消费品工厂，自动化生产线",
    },
    content: {
      vi: "Nhà máy Colgate Palmolive tại Mỹ Phước là cơ sở sản xuất hiện đại với dây chuyền tự động hóa cao, đáp ứng các tiêu chuẩn quốc tế về an toàn, chất lượng và môi trường. Đây là một trong những nhà máy sản xuất hàng tiêu dùng lớn nhất khu vực.",
      en: "Colgate Palmolive factory in My Phuoc is a modern production facility with highly automated lines, meeting international standards for safety, quality, and environment. This is one of the largest consumer goods factories in the region.",
      zh: "美福的高露洁棕榄工厂是现代化生产设施，采用高度自动化生产线，符合国际安全、质量和环境标准。这是该地区最大的日用消费品工厂之一。",
    },
    published: true,
  },

  // ============================================
  // CMIT PORT (2010)
  // ============================================
  {
    slug: "cmit-port",
    category: "infrastructure",
    location: "Ba Ria - Vung Tau",
    year: 2010,
    client: "CMIT",
    scale: "International container port",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Cảng quốc tế Cái Mép (CMIT)",
      en: "Cai Mep International Terminal (CMIT)",
      zh: "盖梅国际码头",
    },
    summary: {
      vi: "Cảng container nước sâu lớn nhất Việt Nam, cửa ngõ giao thương quốc tế",
      en: "Vietnam's largest deep-water container port, gateway for international trade",
      zh: "越南最大的深水集装箱港口，国际贸易门户",
    },
    content: {
      vi: "Cảng CMIT là một trong những cảng container nước sâu lớn nhất Việt Nam, có khả năng tiếp nhận tàu container siêu lớn lên đến 18,000 TEU. Cảng đóng vai trò quan trọng trong chuỗi logistics quốc tế, kết nối Việt Nam với các tuyến hàng hải toàn cầu.",
      en: "CMIT Port is one of Vietnam's largest deep-water container ports, capable of receiving ultra-large container vessels up to 18,000 TEU. The port plays a crucial role in international logistics, connecting Vietnam with global shipping routes.",
      zh: "CMIT港是越南最大的深水集装箱港口之一，能够接收高达18,000 TEU的超大型集装箱船。该港口在国际物流中发挥重要作用，将越南与全球航运线路连接起来。",
    },
    published: true,
  },

  // ============================================
  // PEB VIETNAM (2006-2007)
  // ============================================
  {
    slug: "unilever-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 2007,
    client: "PEB Vietnam / Unilever",
    scale: "Consumer goods factory, 30,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Unilever",
      en: "Unilever Factory",
      zh: "联合利华工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất hàng tiêu dùng với kết cấu thép tiền chế hiện đại",
      en: "Consumer goods factory with modern pre-engineered steel structure",
      zh: "采用现代预制钢结构的日用消费品工厂",
    },
    content: {
      vi: "Nhà máy Unilever được xây dựng với kết cấu thép tiền chế hiện đại, rút ngắn thời gian thi công và đảm bảo chất lượng cao. Thiết kế nhà máy tối ưu hóa không gian sản xuất và logistics nội bộ.",
      en: "Unilever Factory is built with modern pre-engineered steel structure, shortening construction time while ensuring high quality. Factory design optimizes production space and internal logistics.",
      zh: "联合利华工厂采用现代预制钢结构建造，缩短施工时间，确保高质量。工厂设计优化生产空间和内部物流。",
    },
    published: true,
  },

  // ============================================
  // SMEC INFRASTRUCTURE PROJECTS (2004-2006)
  // ============================================
  {
    slug: "luong-the-tran-bridge",
    category: "infrastructure",
    location: "Mekong Delta",
    year: 2005,
    client: "SMEC",
    scale: "Bridge construction",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Cầu Lương Thế Trân",
      en: "Luong The Tran Bridge",
      zh: "梁世陈桥",
    },
    summary: {
      vi: "Cầu giao thông quan trọng kết nối vùng Đồng bằng sông Cửu Long",
      en: "Important transportation bridge connecting the Mekong Delta region",
      zh: "连接湄公河三角洲地区的重要交通桥梁",
    },
    content: {
      vi: "Cầu Lương Thế Trân là công trình hạ tầng quan trọng, góp phần cải thiện giao thông và phát triển kinh tế vùng Đồng bằng sông Cửu Long. Thiết kế cầu đảm bảo khả năng chịu tải cao và tuổi thọ lâu dài.",
      en: "Luong The Tran Bridge is an important infrastructure project, contributing to improved transportation and economic development in the Mekong Delta region. Bridge design ensures high load capacity and long service life.",
      zh: "梁世陈桥是重要的基础设施项目，有助于改善湄公河三角洲地区的交通和经济发展。桥梁设计确保高承载能力和长使用寿命。",
    },
    published: true,
  },
  {
    slug: "giao-long-port",
    category: "infrastructure",
    location: "Ben Tre",
    year: 2005,
    client: "SMEC",
    scale: "River port facility",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Cảng Giao Long",
      en: "Giao Long Port",
      zh: "交龙港",
    },
    summary: {
      vi: "Cảng sông phục vụ vận chuyển hàng hóa vùng Đồng bằng sông Cửu Long",
      en: "River port serving cargo transportation in the Mekong Delta",
      zh: "服务湄公河三角洲货物运输的河港",
    },
    content: {
      vi: "Cảng Giao Long được xây dựng để phục vụ nhu cầu vận chuyển hàng hóa ngày càng tăng của vùng Đồng bằng sông Cửu Long. Thiết kế cảng đảm bảo khả năng tiếp nhận tàu thuyền đa dạng và vận hành hiệu quả.",
      en: "Giao Long Port is built to serve the growing cargo transportation needs of the Mekong Delta region. Port design ensures capability to receive diverse vessels and efficient operation.",
      zh: "交龙港的建设是为了满足湄公河三角洲地区日益增长的货物运输需求。港口设计确保能够接收多种船舶并高效运营。",
    },
    published: true,
  },

  // ============================================
  // HAZAMA VIETNAM PROJECTS (1997-2003)
  // ============================================
  {
    slug: "wacoal-factory",
    category: "industrial",
    location: "Dong Nai",
    year: 2000,
    client: "HAZAMA VN / Wacoal",
    scale: "Textile factory, 20,000 sqm",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Wacoal",
      en: "Wacoal Factory",
      zh: "华歌尔工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất đồ lót cao cấp Nhật Bản với tiêu chuẩn chất lượng khắt khe",
      en: "Premium Japanese lingerie factory with strict quality standards",
      zh: "日本高端内衣厂，严格的质量标准",
    },
    content: {
      vi: "Nhà máy Wacoal được xây dựng theo tiêu chuẩn Nhật Bản, với môi trường sản xuất sạch và hệ thống kiểm soát chất lượng nghiêm ngặt. Công trình đáp ứng yêu cầu cao về điều kiện làm việc và an toàn lao động.",
      en: "Wacoal Factory is built to Japanese standards, with clean production environment and strict quality control systems. The facility meets high requirements for working conditions and occupational safety.",
      zh: "华歌尔工厂按日本标准建造，拥有清洁的生产环境和严格的质量控制系统。该设施满足工作条件和职业安全的高要求。",
    },
    published: true,
  },
  {
    slug: "shimazu-factory",
    category: "industrial",
    location: "Dong Nai",
    year: 1999,
    client: "HAZAMA VN / Shimazu",
    scale: "Electronics factory, 15,000 sqm",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Shimazu",
      en: "Shimazu Factory",
      zh: "岛津工厂",
    },
    summary: {
      vi: "Nhà máy điện tử Nhật Bản với phòng sạch và kiểm soát môi trường chính xác",
      en: "Japanese electronics factory with clean room and precise environmental control",
      zh: "日本电子厂，配备洁净室和精确的环境控制",
    },
    content: {
      vi: "Nhà máy Shimazu chuyên sản xuất các thiết bị điện tử chính xác, yêu cầu môi trường sản xuất kiểm soát nghiêm ngặt. Hệ thống phòng sạch và kiểm soát nhiệt độ, độ ẩm đảm bảo chất lượng sản phẩm cao nhất.",
      en: "Shimazu Factory specializes in precision electronics manufacturing, requiring strictly controlled production environment. Clean room systems and temperature, humidity control ensure highest product quality.",
      zh: "岛津工厂专门生产精密电子产品，需要严格控制的生产环境。洁净室系统和温湿度控制确保最高的产品质量。",
    },
    published: true,
  },
  {
    slug: "nec-tokin-factory",
    category: "industrial",
    location: "Dong Nai",
    year: 1998,
    client: "HAZAMA VN / NEC/Tokin",
    scale: "Electronics factory, 18,000 sqm",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy NEC/Tokin",
      en: "NEC/Tokin Factory",
      zh: "NEC/Tokin工厂",
    },
    summary: {
      vi: "Nhà máy sản xuất linh kiện điện tử với công nghệ tiên tiến từ Nhật Bản",
      en: "Electronic components factory with advanced Japanese technology",
      zh: "采用日本先进技术的电子元件厂",
    },
    content: {
      vi: "Nhà máy NEC/Tokin sản xuất các linh kiện điện tử chất lượng cao, áp dụng công nghệ và quy trình quản lý tiên tiến của Nhật Bản. Thiết kế nhà máy đảm bảo môi trường sản xuất tối ưu và hiệu quả năng lượng.",
      en: "NEC/Tokin Factory produces high-quality electronic components, applying advanced Japanese technology and management processes. Factory design ensures optimal production environment and energy efficiency.",
      zh: "NEC/Tokin工厂生产高质量电子元件，采用日本先进技术和管理流程。工厂设计确保最佳生产环境和能源效率。",
    },
    published: true,
  },
  {
    slug: "ajinomoto-factory",
    category: "industrial",
    location: "Dong Nai",
    year: 2001,
    client: "HAZAMA VN / Ajinomoto",
    scale: "Food factory, 25,000 sqm",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606836576983-8b458e75221d?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Ajinomoto",
      en: "Ajinomoto Factory",
      zh: "味之素工厂",
    },
    summary: {
      vi: "Nhà máy thực phẩm Nhật Bản với tiêu chuẩn an toàn vệ sinh thực phẩm cao nhất",
      en: "Japanese food factory with highest food safety and hygiene standards",
      zh: "日本食品厂，最高的食品安全和卫生标准",
    },
    content: {
      vi: "Nhà máy Ajinomoto Việt Nam được xây dựng theo tiêu chuẩn Nhật Bản với hệ thống sản xuất hiện đại, đảm bảo chất lượng sản phẩm cao cấp. Công trình áp dụng các tiêu chuẩn an toàn vệ sinh thực phẩm nghiêm ngặt nhất.",
      en: "Ajinomoto Vietnam factory is built to Japanese standards with modern production systems, ensuring premium product quality. The facility applies the strictest food safety and hygiene standards.",
      zh: "味之素越南工厂按日本标准建造，采用现代化生产系统，确保优质产品质量。该设施采用最严格的食品安全和卫生标准。",
    },
    published: true,
  },
  {
    slug: "japanese-school",
    category: "commercial",
    location: "Ho Chi Minh City",
    year: 2002,
    client: "HAZAMA VN",
    scale: "Educational facility, 8,000 sqm",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Trường học Nhật Bản",
      en: "Japanese School",
      zh: "日本学校",
    },
    summary: {
      vi: "Cơ sở giáo dục đạt chuẩn Nhật Bản với môi trường học tập hiện đại",
      en: "Japanese-standard educational facility with modern learning environment",
      zh: "符合日本标准的教育设施，现代化学习环境",
    },
    content: {
      vi: "Trường học Nhật Bản tại TP.HCM được thiết kế theo tiêu chuẩn giáo dục Nhật Bản, với các phòng học hiện đại, không gian thể chất và khu vực sinh hoạt ngoài trời. Công trình tạo môi trường học tập an toàn và thân thiện.",
      en: "Japanese School in HCMC is designed to Japanese educational standards, with modern classrooms, physical activity spaces, and outdoor living areas. The facility creates a safe and friendly learning environment.",
      zh: "胡志明市的日本学校按日本教育标准设计，配备现代化教室、体育活动空间和户外生活区。该设施创造了安全友好的学习环境。",
    },
    published: true,
  },

  // ============================================
  // MITSUI CONSTRUCTION (1995-1997)
  // ============================================
  {
    slug: "bp-petro-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 1996,
    client: "Mitsui Construction / BP-PETRO",
    scale: "Lubricant factory, 15,000 sqm",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy dầu nhờn BP-PETRO",
      en: "BP-PETRO Lubricant Factory",
      zh: "BP-PETRO润滑油厂",
    },
    summary: {
      vi: "Nhà máy sản xuất dầu nhờn và dầu mỡ với tiêu chuẩn an toàn quốc tế",
      en: "Lubricant and grease production factory with international safety standards",
      zh: "符合国际安全标准的润滑油和润滑脂生产厂",
    },
    content: {
      vi: "Nhà máy BP-PETRO chuyên sản xuất các sản phẩm dầu nhờn và dầu mỡ chất lượng cao, được thiết kế với các tiêu chuẩn an toàn nghiêm ngặt trong ngành hóa dầu. Hệ thống phòng cháy chữa cháy và kiểm soát môi trường tiên tiến.",
      en: "BP-PETRO Factory specializes in high-quality lubricant and grease products, designed with strict safety standards in the petrochemical industry. Advanced fire protection and environmental control systems.",
      zh: "BP-PETRO工厂专门生产高质量润滑油和润滑脂产品，按石化行业严格的安全标准设计。配备先进的消防和环境控制系统。",
    },
    published: true,
  },

  // ============================================
  // GCC1 (1995)
  // ============================================
  {
    slug: "mitsubishi-motors-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 1995,
    client: "GCC1 / Mitsubishi Motors",
    scale: "Automotive assembly plant, 30,000 sqm",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Mitsubishi Motors VN",
      en: "Mitsubishi Motors VN Factory",
      zh: "三菱汽车越南工厂",
    },
    summary: {
      vi: "Nhà máy lắp ráp ô tô với dây chuyền sản xuất hiện đại từ Nhật Bản",
      en: "Automotive assembly plant with modern Japanese production lines",
      zh: "采用日本现代化生产线的汽车装配厂",
    },
    content: {
      vi: "Nhà máy Mitsubishi Motors VN là một trong những nhà máy lắp ráp ô tô đầu tiên tại Việt Nam, được trang bị dây chuyền sản xuất hiện đại từ Nhật Bản. Thiết kế nhà máy đảm bảo quy trình sản xuất hiệu quả và chất lượng cao.",
      en: "Mitsubishi Motors VN Factory is one of the first automotive assembly plants in Vietnam, equipped with modern Japanese production lines. Factory design ensures efficient production processes and high quality.",
      zh: "三菱汽车越南工厂是越南最早的汽车装配厂之一，配备日本现代化生产线。工厂设计确保高效的生产流程和高质量。",
    },
    published: true,
  },
];

// Helper function to get localized project
export function getLocalizedProject(project: Project, locale: Locale) {
  return {
    ...project,
    title: project.title[locale] || project.title.en,
    summary: project.summary?.[locale] || project.summary?.en,
    content: project.content?.[locale] || project.content?.en,
  };
}

// Get featured projects (first 3)
export function getFeaturedProjects() {
  return projects.filter(p => p.published).slice(0, 3);
}

// Get all published projects
export function getPublishedProjects() {
  return projects.filter(p => p.published);
}

// Get project by slug
export function getProjectBySlug(slug: string) {
  return projects.find(p => p.slug === slug);
}

// ============================================
// SERVICES DATA
// ============================================

export interface ServiceFeature {
  vi: string;
  en: string;
  zh: string;
}

export interface EngineeringService {
  key: string;
  icon: string;
  title: {
    vi: string;
    en: string;
    zh: string;
  };
  features: ServiceFeature[];
}

export const engineeringServices: EngineeringService[] = [
  {
    key: "architecture",
    icon: "Building2",
    title: {
      vi: "Kiến trúc",
      en: "Architecture",
      zh: "建筑",
    },
    features: [
      {
        vi: "Thiết kế ý tưởng & quy hoạch tổng thể",
        en: "Concept design & master planning",
        zh: "概念设计和总体规划",
      },
      {
        vi: "Bản vẽ kiến trúc chi tiết",
        en: "Detailed architectural drawings",
        zh: "详细建筑图纸",
      },
      {
        vi: "Tích hợp thiết kế nội thất",
        en: "Interior design integration",
        zh: "室内设计整合",
      },
      {
        vi: "Hồ sơ xin phép xây dựng",
        en: "Building permit documentation",
        zh: "建筑许可证文件",
      },
    ],
  },
  {
    key: "structure",
    icon: "Cpu",
    title: {
      vi: "Kết cấu",
      en: "Structure",
      zh: "结构",
    },
    features: [
      {
        vi: "Phân tích & thiết kế kết cấu",
        en: "Structural analysis & design",
        zh: "结构分析与设计",
      },
      {
        vi: "Thiết kế móng công trình",
        en: "Foundation engineering",
        zh: "基础工程",
      },
      {
        vi: "Kết cấu thép & bê tông",
        en: "Steel & concrete structures",
        zh: "钢结构和混凝土结构",
      },
      {
        vi: "Thiết kế chống động đất",
        en: "Seismic resistance design",
        zh: "抗震设计",
      },
    ],
  },
  {
    key: "mep",
    icon: "Zap",
    title: {
      vi: "Cơ điện (MEP)",
      en: "MEP",
      zh: "机电",
    },
    features: [
      {
        vi: "Thiết kế hệ thống HVAC",
        en: "HVAC system design",
        zh: "暖通空调系统设计",
      },
      {
        vi: "Hệ thống điện & chiếu sáng",
        en: "Electrical & lighting systems",
        zh: "电气和照明系统",
      },
      {
        vi: "Cấp thoát nước & PCCC",
        en: "Plumbing & fire protection",
        zh: "给排水和消防",
      },
      {
        vi: "Tự động hóa tòa nhà",
        en: "Building automation",
        zh: "楼宇自动化",
      },
    ],
  },
];

// Design Consultancy features
export const designConsultancyFeatures: ServiceFeature[] = [
  {
    vi: "Nghiên cứu khả thi",
    en: "Feasibility studies",
    zh: "可行性研究",
  },
  {
    vi: "Phát triển ý tưởng",
    en: "Concept development",
    zh: "概念开发",
  },
  {
    vi: "Tư vấn kỹ thuật",
    en: "Technical consultation",
    zh: "技术咨询",
  },
  {
    vi: "Tối ưu hóa thiết kế",
    en: "Design optimization",
    zh: "设计优化",
  },
];

// Engineering Design features
export const engineeringDesignFeatures: ServiceFeature[] = [
  {
    vi: "Thiết kế kiến trúc",
    en: "Architecture design",
    zh: "建筑设计",
  },
  {
    vi: "Thiết kế kết cấu",
    en: "Structural engineering",
    zh: "结构工程",
  },
  {
    vi: "Hệ thống MEP",
    en: "MEP systems",
    zh: "机电系统",
  },
  {
    vi: "Bản vẽ kỹ thuật",
    en: "Technical drawings",
    zh: "技术图纸",
  },
];

// Integrated Solutions features
export const integratedSolutionsFeatures: ServiceFeature[] = [
  {
    vi: "Hỗ trợ dự án từ đầu đến cuối",
    en: "End-to-end project support",
    zh: "端到端项目支持",
  },
  {
    vi: "Phối hợp đa ngành",
    en: "Multi-disciplinary coordination",
    zh: "多学科协调",
  },
  {
    vi: "Tối ưu hóa giá trị",
    en: "Value engineering",
    zh: "价值工程",
  },
  {
    vi: "Hỗ trợ quản lý dự án",
    en: "Project management support",
    zh: "项目管理支持",
  },
];

// Helper function to get localized feature
export function getLocalizedFeature(feature: ServiceFeature, locale: Locale): string {
  return feature[locale] || feature.en;
}

// Helper function to get localized engineering service
export function getLocalizedEngineeringService(service: EngineeringService, locale: Locale) {
  return {
    ...service,
    title: service.title[locale] || service.title.en,
    features: service.features.map((f) => getLocalizedFeature(f, locale)),
  };
}

// ============================================
// PROJECT CATEGORIES
// ============================================

export const projectCategories = {
  all: {
    vi: "Tất cả",
    en: "All",
    zh: "全部",
  },
  residential: {
    vi: "Nhà ở",
    en: "Residential",
    zh: "住宅",
  },
  commercial: {
    vi: "Thương mại",
    en: "Commercial",
    zh: "商业",
  },
  industrial: {
    vi: "Công nghiệp",
    en: "Industrial",
    zh: "工业",
  },
  infrastructure: {
    vi: "Hạ tầng",
    en: "Infrastructure",
    zh: "基础设施",
  },
};

// ============================================
// TEAM MEMBERS
// ============================================

export interface TeamMember {
  id: string;
  name: string;
  photo?: string;
  role: {
    vi: string;
    en: string;
    zh: string;
  };
  bio?: {
    vi: string;
    en: string;
    zh: string;
  };
  education?: {
    vi: string;
    en: string;
    zh: string;
  };
  certifications?: {
    vi: string[];
    en: string[];
    zh: string[];
  };
}

export const teamMembers: TeamMember[] = [
  // Design Leads
  {
    id: "1",
    name: "Hoàng Đình Cung",
    photo: "/images/default-men.png",
    role: {
      vi: "Chủ trì thiết kế / Giám sát xây dựng",
      en: "Design Lead / Construction Supervisor",
      zh: "设计负责人 / 施工监理",
    },
    bio: {
      vi: "Kỹ sư xây dựng với hơn 30 năm kinh nghiệm, chuyên giám sát công tác xây dựng công trình dân dụng, công nghiệp và hạ tầng kỹ thuật. Chứng chỉ hành nghề Hạng I.",
      en: "Construction engineer with over 30 years of experience, specializing in supervising civil, industrial, and infrastructure construction works. Class I professional license.",
      zh: "拥有30多年经验的建筑工程师，专门从事民用、工业和基础设施建设工程的监理工作。一级执业资格证书。",
    },
    education: {
      vi: "Đại học Bách Khoa TP. Hồ Chí Minh - Kỹ sư xây dựng",
      en: "Ho Chi Minh City University of Technology - Construction Engineer",
      zh: "胡志明市理工大学 - 建筑工程师",
    },
    certifications: {
      vi: ["Giám sát công tác xây dựng công trình dân dụng - công nghiệp và hạ tầng kỹ thuật (Hạng I)"],
      en: ["Construction Supervision for Civil - Industrial and Infrastructure Works (Class I)"],
      zh: ["民用-工业及基础设施工程施工监理（一级）"],
    },
  },
  {
    id: "2",
    name: "Trần Ngọc Chính",
    photo: "/images/default-men.png",
    role: {
      vi: "Chủ trì thiết kế / Giám sát xây dựng",
      en: "Design Lead / Construction Supervisor",
      zh: "设计负责人 / 施工监理",
    },
    bio: {
      vi: "Kỹ sư xây dựng chuyên ngành kỹ thuật công trình với kinh nghiệm sâu rộng trong giám sát xây dựng công trình dân dụng, công nghiệp và hạ tầng. Chứng chỉ hành nghề Hạng I.",
      en: "Construction engineer specializing in building technology with extensive experience in supervising civil, industrial, and infrastructure construction. Class I professional license.",
      zh: "专门从事建筑技术的建筑工程师，在民用、工业和基础设施建设监理方面拥有丰富经验。一级执业资格证书。",
    },
    education: {
      vi: "Đại học kỹ thuật - Đại học Quốc gia Tp.Hồ Chí Minh - Kỹ sư xây dựng ngành kỹ thuật công trình",
      en: "University of Technology - Vietnam National University HCMC - Construction Engineer",
      zh: "胡志明市国家大学技术大学 - 建筑工程师",
    },
    certifications: {
      vi: ["Giám sát công tác xây dựng công trình dân dụng - công nghiệp và hạ tầng kỹ thuật (Hạng I)"],
      en: ["Construction Supervision for Civil - Industrial and Infrastructure Works (Class I)"],
      zh: ["民用-工业及基础设施工程施工监理（一级）"],
    },
  },
  // Architectural Designers
  {
    id: "3",
    name: "Lê Xuân Đức",
    photo: "/images/default-men.png",
    role: {
      vi: "Kiến trúc sư",
      en: "Architect",
      zh: "建筑师",
    },
    bio: {
      vi: "Kiến trúc sư với chứng chỉ thiết kế kiến trúc công trình và thiết kế đô thị. Chuyên về thiết kế kiến trúc trong đồ án quy hoạch và thiết kế đô thị.",
      en: "Licensed architect with certifications in building architectural design and urban design. Specializes in architectural design for planning projects and urban design.",
      zh: "持有建筑设计和城市设计资格证书的注册建筑师。专门从事规划项目和城市设计中的建筑设计。",
    },
    education: {
      vi: "Đại học Kiến trúc Hà Nội - Kiến trúc sư",
      en: "Hanoi Architectural University - Architect",
      zh: "河内建筑大学 - 建筑师",
    },
    certifications: {
      vi: ["Thiết kế kiến trúc công trình", "Thiết kế kiến trúc trong đồ án quy hoạch, thiết kế đô thị"],
      en: ["Building Architectural Design", "Architectural Design in Planning Projects, Urban Design"],
      zh: ["建筑设计", "规划项目和城市设计中的建筑设计"],
    },
  },
  {
    id: "4",
    name: "Ngô Phước Quang Thặng",
    photo: "/images/default-men.png",
    role: {
      vi: "Kiến trúc sư",
      en: "Architect",
      zh: "建筑师",
    },
    bio: {
      vi: "Kiến trúc sư với chứng chỉ hành nghề thiết kế kiến trúc công trình. Chuyên về thiết kế các công trình cao tầng và tổ hợp đa chức năng.",
      en: "Licensed architect with building architectural design certification. Specializes in high-rise buildings and mixed-use complexes.",
      zh: "持有建筑设计执业资格证书的注册建筑师。专门从事高层建筑和综合体设计。",
    },
    education: {
      vi: "Kiến trúc sư",
      en: "Architect",
      zh: "建筑师",
    },
    certifications: {
      vi: ["Thiết kế kiến trúc công trình"],
      en: ["Building Architectural Design"],
      zh: ["建筑设计"],
    },
  },
  // Structural Designers
  {
    id: "5",
    name: "Đặng Hữu Lợi",
    photo: "/images/default-men.png",
    role: {
      vi: "Kỹ sư kết cấu / Giám sát xây dựng",
      en: "Structural Engineer / Construction Supervisor",
      zh: "结构工程师 / 施工监理",
    },
    bio: {
      vi: "Thạc sĩ kỹ thuật xây dựng công trình đặc biệt với chứng chỉ Hạng I về giám sát và thiết kế kết cấu. Chuyên về xây dựng dân dụng và công nghiệp.",
      en: "Master's degree in special construction engineering with Class I certifications in supervision and structural design. Specializes in civil and industrial construction.",
      zh: "特种建筑工程硕士学位，持有一级监理和结构设计资格证书。专门从事民用和工业建设。",
    },
    education: {
      vi: "Học Viện kỹ thuật quân sự - Thạc sĩ kỹ thuật xây dựng công trình đặc biệt (Xây dựng dân dụng - công nghiệp)",
      en: "Military Technical Academy - Master's in Special Construction Engineering (Civil - Industrial)",
      zh: "军事技术学院 - 特种建筑工程硕士（民用-工业）",
    },
    certifications: {
      vi: ["Giám sát công tác xây dựng công trình dân dụng - công nghiệp và hạ tầng kỹ thuật (Hạng I)", "Thiết kế kết cấu công trình (Hạng I)"],
      en: ["Construction Supervision for Civil - Industrial and Infrastructure Works (Class I)", "Structural Design (Class I)"],
      zh: ["民用-工业及基础设施工程施工监理（一级）", "结构设计（一级）"],
    },
  },
  {
    id: "6",
    name: "Nguyễn Đình Tuấn",
    photo: "/images/default-men.png",
    role: {
      vi: "Kỹ sư kết cấu / Giám sát xây dựng",
      en: "Structural Engineer / Construction Supervisor",
      zh: "结构工程师 / 施工监理",
    },
    bio: {
      vi: "Kỹ sư xây dựng với chứng chỉ Hạng II về thiết kế kết cấu và giám sát công trình dân dụng - công nghiệp. Chuyên về kết cấu thép và bê tông.",
      en: "Construction engineer with Class II certifications in structural design and civil-industrial construction supervision. Specializes in steel and concrete structures.",
      zh: "建筑工程师，持有二级结构设计和民用-工业建设监理资格证书。专门从事钢结构和混凝土结构。",
    },
    education: {
      vi: "ĐH Kiến trúc TP.HCM - Kỹ sư xây dựng",
      en: "Ho Chi Minh City University of Architecture - Construction Engineer",
      zh: "胡志明市建筑大学 - 建筑工程师",
    },
    certifications: {
      vi: ["Thiết kế kết cấu công trình dân dụng - công nghiệp (Hạng II)", "Giám sát công tác xây dựng công trình dân dụng - công nghiệp (Hạng II)", "Giám sát công tác xây dựng công trình hạ tầng kỹ thuật (Hạng III)"],
      en: ["Structural Design for Civil - Industrial Works (Class II)", "Construction Supervision for Civil - Industrial Works (Class II)", "Infrastructure Construction Supervision (Class III)"],
      zh: ["民用-工业工程结构设计（二级）", "民用-工业工程施工监理（二级）", "基础设施工程施工监理（三级）"],
    },
  },
  // MEPF Designers
  {
    id: "7",
    name: "Trương Thanh Hải",
    photo: "/images/default-men.png",
    role: {
      vi: "Kỹ sư Cơ điện",
      en: "MEP Engineer",
      zh: "机电工程师",
    },
    bio: {
      vi: "Kỹ sư điện - điện tử với chứng chỉ Hạng I về thiết kế cơ - điện công trình. Chuyên gia thiết kế hệ thống MEP cho các công trình công nghiệp và thương mại.",
      en: "Electrical-Electronics engineer with Class I certification in MEP design. Expert in MEP system design for industrial and commercial buildings.",
      zh: "电气电子工程师，持有一级机电设计资格证书。工业和商业建筑机电系统设计专家。",
    },
    education: {
      vi: "Đại học Công Nghệ Sài Gòn - Kỹ sư điện - điện tử",
      en: "Saigon Technology University - Electrical-Electronics Engineer",
      zh: "西贡理工大学 - 电气电子工程师",
    },
    certifications: {
      vi: ["Thiết kế cơ - điện công trình (Hạng I)"],
      en: ["MEP Design (Class I)"],
      zh: ["机电设计（一级）"],
    },
  },
  {
    id: "8",
    name: "Huỳnh Văn Hùng",
    photo: "/images/default-men.png",
    role: {
      vi: "Kỹ sư Cơ điện / Giám sát lắp đặt",
      en: "MEP Engineer / Installation Supervisor",
      zh: "机电工程师 / 安装监理",
    },
    bio: {
      vi: "Kỹ sư điện - điện tử với chứng chỉ thiết kế cơ điện Hạng II và giám sát lắp đặt thiết bị điện Hạng III. Chuyên về hệ thống HVAC và điện cho công trình cao tầng.",
      en: "Electrical-Electronics engineer with Class II MEP design and Class III electrical installation supervision certifications. Specializes in HVAC and electrical systems for high-rise buildings.",
      zh: "电气电子工程师，持有二级机电设计和三级电气安装监理资格证书。专门从事高层建筑的暖通空调和电气系统。",
    },
    education: {
      vi: "ĐH Công nghệ Sài Gòn - Kỹ sư Điện - điện tử",
      en: "Saigon Technology University - Electrical-Electronics Engineer",
      zh: "西贡理工大学 - 电气电子工程师",
    },
    certifications: {
      vi: ["Thiết kế cơ - điện công trình dân dụng - công nghiệp (Hạng II)", "Giám sát công tác lắp đặt thiết bị điện công trình dân dụng - công nghiệp (Hạng III)"],
      en: ["MEP Design for Civil - Industrial Works (Class II)", "Electrical Installation Supervision for Civil - Industrial Works (Class III)"],
      zh: ["民用-工业工程机电设计（二级）", "民用-工业工程电气安装监理（三级）"],
    },
  },
  {
    id: "9",
    name: "Nguyễn Ngọc Tuấn",
    photo: "/images/default-men.png",
    role: {
      vi: "Kỹ sư Cơ điện / Giám sát lắp đặt",
      en: "MEP Engineer / Installation Supervisor",
      zh: "机电工程师 / 安装监理",
    },
    bio: {
      vi: "Kỹ sư điện khí hóa và cung cấp điện với chứng chỉ Hạng I về giám sát công tác lắp đặt thiết bị vào công trình.",
      en: "Electrical engineer specializing in power supply with Class I certification for equipment installation supervision.",
      zh: "电气化和供电工程师，持有一级设备安装监理资格证书。",
    },
    education: {
      vi: "Đại học Sư phạm kỹ thuật Tp. Hồ Chí Minh - Kỹ sư Điện khí hóa và cung cấp điện",
      en: "HCMC University of Technology and Education - Electrical Engineer (Power Supply)",
      zh: "胡志明市技术教育大学 - 电气化和供电工程师",
    },
    certifications: {
      vi: ["Giám sát công tác lắp đặt thiết bị vào công trình (Hạng I)"],
      en: ["Equipment Installation Supervision (Class I)"],
      zh: ["设备安装监理（一级）"],
    },
  },
  // Infrastructure Designer
  {
    id: "10",
    name: "Lê Xuân Lương",
    photo: "/images/default-men.png",
    role: {
      vi: "Kỹ sư Hạ tầng / Thiết kế giao thông",
      en: "Infrastructure Engineer / Transportation Designer",
      zh: "基础设施工程师 / 交通设计师",
    },
    bio: {
      vi: "Kỹ sư xây dựng cầu đường với nhiều chứng chỉ hành nghề Hạng II-III về định giá, thiết kế và giám sát công trình giao thông, hạ tầng kỹ thuật.",
      en: "Bridge and road construction engineer with multiple Class II-III certifications in valuation, design, and supervision of transportation and infrastructure works.",
      zh: "桥梁道路建设工程师，持有多项二级至三级估价、设计和交通基础设施工程监理资格证书。",
    },
    education: {
      vi: "Đại học Lạc Hồng - KS XD Cầu đường",
      en: "Lac Hong University - Bridge & Road Construction Engineer",
      zh: "乐鸿大学 - 桥梁道路建设工程师",
    },
    certifications: {
      vi: ["Định giá xây dựng (Hạng II)", "Thiết kế xây dựng công trình Giao thông: Đường bộ (Hạng II)", "Giám sát công tác xây dựng công trình Dân dụng - Công nghiệp - Hạ tầng kỹ thuật và Giao thông (Đường bộ) (Hạng II)", "Giám sát công tác xây dựng công trình Giao thông: Cầu đường bộ (Hạng III)"],
      en: ["Construction Valuation (Class II)", "Transportation Design: Roads (Class II)", "Construction Supervision for Civil - Industrial - Infrastructure and Transportation (Roads) (Class II)", "Transportation Construction Supervision: Road Bridges (Class III)"],
      zh: ["建设估价（二级）", "交通设计：公路（二级）", "民用-工业-基础设施及交通工程施工监理（公路）（二级）", "交通工程施工监理：公路桥梁（三级）"],
    },
  },
  // Surveying Engineer
  {
    id: "11",
    name: "Huỳnh Văn Phụng",
    photo: "/images/default-men.png",
    role: {
      vi: "Kỹ sư Trắc địa",
      en: "Surveying Engineer",
      zh: "测量工程师",
    },
    bio: {
      vi: "Kỹ sư Xây dựng Trắc địa và bản đồ với chứng chỉ Hạng II về khảo sát địa hình. Chuyên về khảo sát và đo đạc cho các dự án xây dựng.",
      en: "Surveying and mapping engineer with Class II topographic survey certification. Specializes in surveying and measurement for construction projects.",
      zh: "测量和制图工程师，持有二级地形测量资格证书。专门从事建设项目的测量和测绘工作。",
    },
    education: {
      vi: "Đại học Bách Khoa - ĐH Quốc Gia TP.HCM - Kỹ sư Xây dựng Trắc địa và bản đồ",
      en: "University of Technology - VNU HCMC - Surveying and Mapping Engineer",
      zh: "胡志明市国家大学理工大学 - 测量和制图工程师",
    },
    certifications: {
      vi: ["Khảo sát Địa hình (Hạng II)"],
      en: ["Topographic Survey (Class II)"],
      zh: ["地形测量（二级）"],
    },
  },
  // Project Manager
  {
    id: "12",
    name: "Nghiêm Trung Minh",
    photo: "/images/default-men.png",
    role: {
      vi: "Quản lý dự án",
      en: "Project Manager",
      zh: "项目经理",
    },
    bio: {
      vi: "Kỹ sư xây dựng cầu đường với chứng chỉ Hạng I về quản lý dự án đầu tư xây dựng công trình dân dụng. Nhiều năm kinh nghiệm điều phối dự án từ thiết kế đến hoàn thiện.",
      en: "Bridge and road construction engineer with Class I certification in civil construction project management. Years of experience coordinating projects from design to completion.",
      zh: "桥梁道路建设工程师，持有一级民用建设项目管理资格证书。多年项目协调经验，从设计到完工。",
    },
    education: {
      vi: "Đại học Giao thông vận tải - Kỹ sư xây dựng cầu đường",
      en: "University of Transport and Communications - Bridge & Road Construction Engineer",
      zh: "交通运输大学 - 桥梁道路建设工程师",
    },
    certifications: {
      vi: ["Quản lý dự án đầu tư xây dựng công trình dân dụng (Hạng I)"],
      en: ["Civil Construction Investment Project Management (Class I)"],
      zh: ["民用建设投资项目管理（一级）"],
    },
  },
  // Estimating Engineers
  {
    id: "13",
    name: "Lâm Thị Lệ Thu",
    photo: "/images/default-women.png",
    role: {
      vi: "Kỹ sư Dự toán",
      en: "Estimating Engineer",
      zh: "估算工程师",
    },
    bio: {
      vi: "Chuyên gia dự toán và quản lý chi phí dự án, đảm bảo tính chính xác và hiệu quả đầu tư.",
      en: "Cost estimation and project cost management expert, ensuring accuracy and investment efficiency.",
      zh: "成本估算和项目成本管理专家，确保准确性和投资效率。",
    },
  },
  {
    id: "14",
    name: "Nguyễn Châu Tuấn",
    photo: "/images/default-men.png",
    role: {
      vi: "Kỹ sư Dự toán",
      en: "Estimating Engineer",
      zh: "估算工程师",
    },
    bio: {
      vi: "Kỹ sư dự toán với kinh nghiệm trong các dự án xây dựng lớn, chuyên về phân tích giá và đấu thầu.",
      en: "Estimating engineer with experience in large construction projects, specializing in cost analysis and tendering.",
      zh: "估算工程师，在大型建筑项目中拥有丰富经验，专注于成本分析和招标。",
    },
  },
  // Chief Accountant
  {
    id: "15",
    name: "Nguyễn Thị Ngọc Hà",
    photo: "/images/default-women.png",
    role: {
      vi: "Kế Toán Trưởng",
      en: "Chief Accountant",
      zh: "总会计师",
    },
    bio: {
      vi: "Kế toán trưởng với nhiều năm kinh nghiệm quản lý tài chính và kế toán cho các dự án xây dựng.",
      en: "Chief accountant with years of experience in financial and accounting management for construction projects.",
      zh: "总会计师，在建筑项目的财务和会计管理方面拥有多年经验。",
    },
  },
];

export function getLocalizedTeamMember(member: TeamMember, locale: Locale) {
  return {
    ...member,
    role: member.role[locale] || member.role.en,
    bio: member.bio?.[locale] || member.bio?.en,
    education: member.education?.[locale] || member.education?.en,
    certifications: member.certifications?.[locale] || member.certifications?.en,
  };
}

// ============================================
// CLIENTS (Notable clients from projects)
// ============================================

export interface Client {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  category: string;
}

export const clients: Client[] = [
  { id: "1", name: "Ajinomoto", logo: "/images/clients/ajinomoto.ico", category: "japanese" },
  { id: "2", name: "Wacoal", logo: "/images/clients/thumb_wacoal.png", category: "japanese" },
  { id: "3", name: "Sanofi", logo: "/images/clients/sanofi.webp", category: "multinational" },
  { id: "4", name: "Colgate Palmolive", logo: "/images/clients/Colgate-Palmolive.webp", category: "multinational" },
  { id: "5", name: "Heineken", logo: "/images/clients/heineken.webp", category: "multinational" },
  { id: "6", name: "Shing Mark", logo: "/images/clients/shing-mark.png", category: "construction" },
  { id: "7", name: "Mitsubishi Motors", logo: "/images/clients/mitsubishi-motors-vietnam-logo.png", category: "multinational" },
  { id: "8", name: "Bestmix", logo: "/images/clients/bestmix.jpg", category: "multinational" },
  { id: "9", name: "R-PAC", logo: "/images/clients/r-pac_service.jpg", category: "multinational" },
  { id: "10", name: "Tribeco", logo: "/images/clients/LOGO-TRIBECO.webp", category: "multinational" },
  { id: "11", name: "Unilever", logo: "/images/clients/logo-unilever.png", category: "multinational" },
  { id: "12", name: "Fukuvi", logo: "/images/clients/fukuvi.png", category: "japanese" },
  { id: "13", name: "KTX Huế", logo: "/images/clients/ktx-hue.png", category: "construction" },
  { id: "14", name: "Nissey", logo: "/images/clients/nissei.png", category: "japanese" },
  { id: "15", name: "Air Water", logo: "/images/clients/air-water.png", category: "multinational" },
  { id: "16", name: "VPIC", logo: "/images/clients/logo-vpic.webp", category: "multinational" },
  { id: "17", name: "CMIT", logo: "/images/clients/cmit.png", category: "construction" },
  { id: "18", name: "Vina Glass", logo: "/images/clients/vinaglass.png", category: "construction" },
  { id: "19", name: "NEC/Tokin", logo: "/images/clients/tokin.png", category: "japanese" },
  { id: "20", name: "Shimazu", logo: "/images/clients/shimadzu-logo.png", category: "japanese" },
  { id: "21", name: "Lixil", logo: "/images/clients/lixil.png", category: "japanese" },
  { id: "22", name: "Newhope", logo: "/images/clients/newhope-vn.jpeg", category: "multinational" },
  { id: "23", name: "Vina Koyei", logo: "/images/clients/vina-kyoki.jpg", category: "construction" },
  
  // { id: "23", name: "SMEC", logo: "/images/clients/placeholder-logo.png", category: "construction" },
  // { id: "24", name: "Tracodi Group", logo: "/images/clients/placeholder-logo.png", category: "construction" },
  // { id: "25", name: "Dinco", logo: "/images/clients/placeholder-logo.png", category: "construction" },
  // { id: "26", name: "COFICO", logo: "/images/clients/placeholder-logo.png", category: "construction" },
  // { id: "27", name: "PEB Vietnam", logo: "/images/clients/placeholder-logo.png", category: "construction" },
  // { id: "28", name: "HAZAMA Corporation", logo: "/images/clients/placeholder-logo.png", category: "construction" },
  // { id: "29", name: "Mitsui Construction", logo: "/images/clients/placeholder-logo.png", category: "construction" },
  // { id: "30", name: "BP-PETRO", logo: "/images/clients/placeholder-logo.png", category: "construction" },
  // Real Estate Developers
  // { id: "31", name: "Pure VN", logo: "/images/clients/placeholder-logo.png", category: "developer" },
  // { id: "32", name: "Tung Feng Vietnam", logo: "/images/clients/placeholder-logo.png", category: "developer" },
  // { id: "33", name: "Chi Thanh", logo: "/images/clients/placeholder-logo.png", category: "developer" },
];

// ============================================
// AREAS OF EXPERTISE
// ============================================

export const areasOfExpertise = [
  {
    vi: "Giải pháp đàm phán",
    en: "Negotiation Solutions",
    zh: "谈判解决方案",
  },
  {
    vi: "Đấu thầu xây dựng",
    en: "Construction Bidding",
    zh: "建筑招标",
  },
  {
    vi: "Đánh giá nhà cung cấp",
    en: "Supplier Evaluation",
    zh: "供应商评估",
  },
  {
    vi: "Quản lý dự án",
    en: "Project Management",
    zh: "项目管理",
  },
  {
    vi: "Chứng nhận LEED",
    en: "LEED Certification",
    zh: "LEED认证",
  },
  {
    vi: "Quản lý cơ sở vật chất (FM)",
    en: "Facility Management (FM)",
    zh: "设施管理",
  },
  {
    vi: "Thiết kế nội thất (ID)",
    en: "Interior Design (ID)",
    zh: "室内设计",
  },
  {
    vi: "Hệ thống MEP",
    en: "MEP Systems",
    zh: "机电系统",
  },
  {
    vi: "An toàn, sức khỏe, môi trường (HSE)",
    en: "Health, Safety, Environment (HSE)",
    zh: "健康、安全、环境",
  },
  {
    vi: "Phòng sạch",
    en: "Clean Room",
    zh: "洁净室",
  },
];

// ============================================
// PROCESS HIGHLIGHTS
// ============================================

export interface ProcessHighlight {
  key: string;
  icon: string;
  title: {
    vi: string;
    en: string;
    zh: string;
  };
  description: {
    vi: string;
    en: string;
    zh: string;
  };
}

export const processHighlights: ProcessHighlight[] = [
  {
    key: "timely",
    icon: "Clock",
    title: {
      vi: "Giao hàng đúng hạn",
      en: "Timely Delivery",
      zh: "及时交付",
    },
    description: {
      vi: "Chúng tôi tôn trọng thời hạn và giao hàng đúng lịch trình",
      en: "We respect deadlines and deliver on schedule",
      zh: "我们尊重截止日期并按计划交付",
    },
  },
  {
    key: "collaborative",
    icon: "Users",
    title: {
      vi: "Phương pháp hợp tác",
      en: "Collaborative Approach",
      zh: "协作方法",
    },
    description: {
      vi: "Hợp tác chặt chẽ với khách hàng trong suốt quá trình",
      en: "Close collaboration with clients throughout the process",
      zh: "在整个过程中与客户密切合作",
    },
  },
  {
    key: "quality",
    icon: "FileCheck",
    title: {
      vi: "Đảm bảo chất lượng",
      en: "Quality Assurance",
      zh: "质量保证",
    },
    description: {
      vi: "Xem xét nghiêm ngặt ở mọi giai đoạn",
      en: "Rigorous review at every stage",
      zh: "在每个阶段进行严格审查",
    },
  },
  {
    key: "result",
    icon: "Target",
    title: {
      vi: "Định hướng kết quả",
      en: "Result-Oriented",
      zh: "结果导向",
    },
    description: {
      vi: "Tập trung vào các giải pháp thực tế, có thể triển khai",
      en: "Focus on practical, implementable solutions",
      zh: "专注于实用、可实施的解决方案",
    },
  },
];

export function getLocalizedProcessHighlight(
  highlight: ProcessHighlight,
  locale: Locale
) {
  return {
    ...highlight,
    title: highlight.title[locale] || highlight.title.en,
    description: highlight.description[locale] || highlight.description.en,
  };
}

// ============================================
// STATISTICS
// ============================================

export const companyStats = {
  yearsExperience: 30,
  projectsCompleted: 50, // 35+ major projects documented
  clients: 24, // Updated to reflect actual client count
  teamMembers: 15, // Updated to reflect actual team size
};
