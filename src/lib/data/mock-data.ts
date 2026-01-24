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
    en: "HDG Design & Engineering Consultancy Joint Stock Company",
    zh: "HDG设计工程咨询股份公司",
  },
  address: {
    vi: "125/42/27 Bùi Đình Tuý, Phường Gia Định, Thành phố Hồ Chí Minh, Việt Nam",
    en: "125/42/27 Bui Dinh Tuy, Ward Gia Dinh, Ho Chi Minh City, Vietnam",
    zh: "125/42/27 Bui Dinh Tuy, Ward Gia Dinh, Ho Chi Minh City, Vietnam",
  },
  phone: "+84 28 xxxx xxxx",
  email: "info@hdgcons.com.vn",
  workingHours: {
    vi: "Thứ 2 - Thứ 6: 8:00 - 17:30",
    en: "Mon - Fri: 8:00 - 17:30",
    zh: "周一至周五: 8:00 - 17:30",
  },
};

export function getLocalizedContactInfo(locale: Locale) {
  return {
    company: contactInfo.company[locale] || contactInfo.company.en,
    address: contactInfo.address[locale] || contactInfo.address.en,
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
  // Recent Projects (2020-Present)
  {
    slug: "king-crown-infinity",
    category: "commercial",
    location: "Ho Chi Minh City",
    year: 2024,
    client: "Tracodi Group",
    scale: "Mixed-use complex",
    services: ["design", "engineering"],
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "King Crown Infinity",
      en: "King Crown Infinity",
      zh: "King Crown Infinity",
    },
    summary: {
      vi: "Dự án tổ hợp thương mại cao cấp với thiết kế hiện đại",
      en: "Premium commercial complex with modern design",
      zh: "现代设计的高端商业综合体项目",
    },
    content: {
      vi: "King Crown Infinity là dự án tổ hợp thương mại cao cấp tại TP.HCM, được thiết kế với tiêu chuẩn quốc tế, tích hợp các tiện ích hiện đại phục vụ nhu cầu kinh doanh và sinh hoạt.",
      en: "King Crown Infinity is a premium commercial complex in HCMC, designed to international standards, integrating modern amenities for business and living needs.",
      zh: "King Crown Infinity是胡志明市的高端商业综合体项目，按国际标准设计，集成现代化设施满足商务和生活需求。",
    },
    published: true,
  },
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
      vi: "Căn hộ cao cấp ven biển với tầm nhìn tuyệt đẹp",
      en: "Luxury beachfront apartments with stunning views",
      zh: "海滨豪华公寓，景观绝佳",
    },
    content: {
      vi: "The Song Apartment là dự án căn hộ cao cấp tại Vũng Tàu, sở hữu vị trí đắc địa ven biển với tầm nhìn ra biển tuyệt đẹp. Thiết kế hiện đại, tối ưu ánh sáng tự nhiên và không gian sống.",
      en: "The Song Apartment is a luxury residential project in Vung Tau, featuring prime beachfront location with stunning ocean views. Modern design optimizes natural light and living spaces.",
      zh: "The Song公寓是头顿的高端住宅项目，拥有优越的海滨位置和壮丽的海景。现代设计最大化自然采光和生活空间。",
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
      vi: "Tòa nhà văn phòng hạng A với thiết kế xanh",
      en: "Grade A office building with green design",
      zh: "绿色设计的甲级写字楼",
    },
    content: {
      vi: "Wonder Sea Office là tòa nhà văn phòng hạng A tại TP.HCM, được thiết kế theo tiêu chuẩn xanh với hệ thống HVAC tiên tiến và tối ưu năng lượng.",
      en: "Wonder Sea Office is a Grade A office building in HCMC, designed to green standards with advanced HVAC systems and energy optimization.",
      zh: "Wonder Sea办公楼是胡志明市的甲级写字楼，按绿色标准设计，配备先进的暖通空调系统和节能优化。",
    },
    published: true,
  },
  {
    slug: "heineken-factory",
    category: "industrial",
    location: "Binh Duong",
    year: 2016,
    client: "Heineken / Dinco",
    scale: "Factory complex, 50,000 sqm",
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
      vi: "Nhà máy sản xuất bia hiện đại với công nghệ tiên tiến",
      en: "Modern brewery factory with advanced technology",
      zh: "采用先进技术的现代化啤酒厂",
    },
    content: {
      vi: "Nhà máy Heineken tại Bình Dương là cơ sở sản xuất hiện đại với công nghệ tiên tiến, đáp ứng tiêu chuẩn quốc tế về an toàn thực phẩm và môi trường.",
      en: "Heineken Factory in Binh Duong is a modern production facility with advanced technology, meeting international standards for food safety and environmental compliance.",
      zh: "位于平阳的喜力工厂是采用先进技术的现代化生产设施，符合国际食品安全和环保标准。",
    },
    published: true,
  },
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
      vi: "Tòa nhà văn phòng hiện đại tại trung tâm thành phố",
      en: "Modern office building in city center",
      zh: "市中心的现代办公楼",
    },
    content: {
      vi: "Tòa nhà văn phòng Phú An Thạnh tọa lạc tại vị trí đắc địa TP.HCM, với thiết kế hiện đại, hệ thống cơ điện tiên tiến phục vụ nhu cầu kinh doanh.",
      en: "Phu An Thanh Office Building is located in a prime HCMC location, featuring modern design and advanced MEP systems for business needs.",
      zh: "富安成办公楼位于胡志明市黄金地段，采用现代设计和先进的机电系统满足商务需求。",
    },
    published: true,
  },
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
      vi: "Nhà máy dược phẩm đạt chuẩn GMP quốc tế",
      en: "Pharmaceutical factory meeting international GMP standards",
      zh: "符合国际GMP标准的制药厂",
    },
    content: {
      vi: "Nhà máy ACE Sanofi Việt Nam được xây dựng đạt tiêu chuẩn GMP quốc tế với hệ thống phòng sạch hiện đại, đảm bảo chất lượng sản xuất dược phẩm cao cấp.",
      en: "ACE Sanofi Vietnam factory is built to international GMP standards with modern clean room systems, ensuring high-quality pharmaceutical production.",
      zh: "ACE赛诺菲越南工厂按国际GMP标准建造，配备现代化洁净室系统，确保高质量制药生产。",
    },
    published: true,
  },
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
      vi: "Cảng container quốc tế lớn nhất Việt Nam",
      en: "Vietnam's largest international container port",
      zh: "越南最大的国际集装箱港口",
    },
    content: {
      vi: "Cảng CMIT là một trong những cảng container nước sâu lớn nhất Việt Nam, có khả năng tiếp nhận tàu container siêu lớn, đóng vai trò quan trọng trong chuỗi logistics quốc tế.",
      en: "CMIT Port is one of Vietnam's largest deep-water container ports, capable of receiving ultra-large container vessels, playing a crucial role in international logistics.",
      zh: "CMIT港是越南最大的深水集装箱港口之一，能够接收超大型集装箱船，在国际物流中发挥重要作用。",
    },
    published: true,
  },
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
      vi: "Nhà máy sản xuất hàng tiêu dùng đạt chuẩn quốc tế",
      en: "Consumer goods factory meeting international standards",
      zh: "符合国际标准的日用消费品工厂",
    },
    content: {
      vi: "Nhà máy Colgate Palmolive tại Mỹ Phước là cơ sở sản xuất hiện đại với dây chuyền tự động hóa cao, đáp ứng các tiêu chuẩn quốc tế về an toàn và môi trường.",
      en: "Colgate Palmolive factory in My Phuoc is a modern production facility with highly automated lines, meeting international safety and environmental standards.",
      zh: "美福的高露洁棕榄工厂是现代化生产设施，采用高度自动化生产线，符合国际安全和环保标准。",
    },
    published: true,
  },
  {
    slug: "ajinomoto-factory",
    category: "industrial",
    location: "Dong Nai",
    year: 2001,
    client: "Ajinomoto / HAZAMA VN",
    scale: "Food factory, 25,000 sqm",
    services: ["engineering"],
    coverImage: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop",
    ],
    title: {
      vi: "Nhà máy Ajinomoto",
      en: "Ajinomoto Factory",
      zh: "味之素工厂",
    },
    summary: {
      vi: "Nhà máy thực phẩm Nhật Bản tiêu chuẩn cao",
      en: "High-standard Japanese food factory",
      zh: "高标准日本食品工厂",
    },
    content: {
      vi: "Nhà máy Ajinomoto Việt Nam được xây dựng theo tiêu chuẩn Nhật Bản với hệ thống sản xuất hiện đại, đảm bảo chất lượng sản phẩm cao cấp.",
      en: "Ajinomoto Vietnam factory is built to Japanese standards with modern production systems, ensuring premium product quality.",
      zh: "味之素越南工厂按日本标准建造，采用现代化生产系统，确保优质产品质量。",
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
  experience?: string;
  education?: string;
}

export const teamMembers: TeamMember[] = [
  // Design Leads
  {
    id: "1",
    name: "Hoàng Đình Cung",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    role: {
      vi: "Chủ trì thiết kế",
      en: "Design Lead",
      zh: "设计负责人",
    },
    bio: {
      vi: "Chủ trì thiết kế với nhiều năm kinh nghiệm trong các dự án xây dựng lớn, đảm bảo chất lượng và tính khả thi của thiết kế.",
      en: "Design lead with many years of experience in large construction projects, ensuring design quality and feasibility.",
      zh: "设计负责人，在大型建筑项目中拥有多年经验，确保设计质量和可行性。",
    },
  },
  {
    id: "2",
    name: "Trần Ngọc Chính",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    role: {
      vi: "Chủ trì thiết kế",
      en: "Design Lead",
      zh: "设计负责人",
    },
    bio: {
      vi: "Chủ trì thiết kế chuyên về các dự án công nghiệp và thương mại, có kinh nghiệm làm việc với các tập đoàn quốc tế.",
      en: "Design lead specializing in industrial and commercial projects, with experience working with international corporations.",
      zh: "设计负责人，专注于工业和商业项目，拥有与国际公司合作的经验。",
    },
  },
  // Architectural Designers
  {
    id: "3",
    name: "Lê Xuân Đức",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    role: {
      vi: "Thiết kế kiến trúc",
      en: "Architectural Designer",
      zh: "建筑设计师",
    },
    bio: {
      vi: "Chuyên gia thiết kế kiến trúc với nhiều dự án từ nhà ở đến công trình thương mại và công nghiệp.",
      en: "Architectural design expert with projects ranging from residential to commercial and industrial buildings.",
      zh: "建筑设计专家，项目涵盖住宅、商业和工业建筑。",
    },
  },
  {
    id: "4",
    name: "Ngô Phước Quang Thặng",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    role: {
      vi: "Thiết kế kiến trúc",
      en: "Architectural Designer",
      zh: "建筑设计师",
    },
    bio: {
      vi: "Thiết kế kiến trúc chuyên về các công trình cao tầng và tổ hợp đa chức năng.",
      en: "Architectural designer specializing in high-rise buildings and mixed-use complexes.",
      zh: "建筑设计师，专注于高层建筑和多功能综合体。",
    },
  },
  // Structural Designers
  {
    id: "5",
    name: "Đặng Hữu Lợi",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    role: {
      vi: "Thiết kế kết cấu",
      en: "Structural Designer",
      zh: "结构设计师",
    },
    bio: {
      vi: "Chuyên gia thiết kế kết cấu với kinh nghiệm trong các dự án nhà máy và công trình công nghiệp.",
      en: "Structural design expert with experience in factory and industrial building projects.",
      zh: "结构设计专家，在工厂和工业建筑项目中拥有丰富经验。",
    },
  },
  {
    id: "6",
    name: "Nguyễn Đình Tuấn",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    role: {
      vi: "Thiết kế kết cấu",
      en: "Structural Designer",
      zh: "结构设计师",
    },
    bio: {
      vi: "Thiết kế kết cấu chuyên về kết cấu thép và bê tông cho các công trình lớn.",
      en: "Structural designer specializing in steel and concrete structures for large-scale projects.",
      zh: "结构设计师，专注于大型项目的钢结构和混凝土结构。",
    },
  },
  // MEPF Designers
  {
    id: "7",
    name: "Trương Thanh Hải",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    role: {
      vi: "Thiết kế MEPF",
      en: "MEPF Designer",
      zh: "机电设计师",
    },
    bio: {
      vi: "Chuyên gia thiết kế hệ thống MEPF (Cơ điện, Phòng cháy chữa cháy) cho các công trình công nghiệp và thương mại.",
      en: "MEPF (Mechanical, Electrical, Plumbing, Fire protection) design expert for industrial and commercial buildings.",
      zh: "工业和商业建筑的MEPF（机械、电气、管道、消防）设计专家。",
    },
  },
  {
    id: "8",
    name: "Huỳnh Văn Hùng",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    role: {
      vi: "Thiết kế MEPF",
      en: "MEPF Designer",
      zh: "机电设计师",
    },
    bio: {
      vi: "Thiết kế hệ thống HVAC và điện cho các công trình cao tầng và nhà máy.",
      en: "HVAC and electrical systems designer for high-rise buildings and factories.",
      zh: "高层建筑和工厂的暖通空调和电气系统设计师。",
    },
  },
  {
    id: "9",
    name: "Nguyễn Ngọc Tuấn",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    role: {
      vi: "Thiết kế MEPF",
      en: "MEPF Designer",
      zh: "机电设计师",
    },
    bio: {
      vi: "Chuyên về thiết kế hệ thống cấp thoát nước và phòng cháy chữa cháy.",
      en: "Specializing in plumbing and fire protection system design.",
      zh: "专注于给排水和消防系统设计。",
    },
  },
  // Infrastructure Designer
  {
    id: "10",
    name: "Lê Xuân Lương",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    role: {
      vi: "Thiết kế hạ tầng",
      en: "Infrastructure Designer",
      zh: "基础设施设计师",
    },
    bio: {
      vi: "Chuyên gia thiết kế hạ tầng kỹ thuật cho các dự án khu công nghiệp và đô thị.",
      en: "Infrastructure design expert for industrial parks and urban development projects.",
      zh: "工业园区和城市发展项目的基础设施设计专家。",
    },
  },
  // Estimating Engineers
  {
    id: "11",
    name: "Lâm Thị Lệ Thu",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
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
    id: "12",
    name: "Nguyễn Châu Tuấn",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
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
  // Project Manager
  {
    id: "13",
    name: "Nghiêm Tủng Minh",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    role: {
      vi: "Quản lý dự án",
      en: "Project Manager",
      zh: "项目经理",
    },
    bio: {
      vi: "Quản lý dự án với nhiều năm kinh nghiệm điều phối các dự án từ giai đoạn thiết kế đến hoàn thiện.",
      en: "Project manager with years of experience coordinating projects from design phase to completion.",
      zh: "项目经理，在从设计阶段到完成的项目协调方面拥有多年经验。",
    },
  },
  // Surveying Engineer
  {
    id: "14",
    name: "Huỳnh Văn Phụng",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    role: {
      vi: "Kỹ sư trắc đạc",
      en: "Surveying Engineer",
      zh: "测量工程师",
    },
    bio: {
      vi: "Chuyên gia trắc đạc và khảo sát địa hình, phục vụ các dự án xây dựng và quy hoạch.",
      en: "Surveying and topographic survey expert, serving construction and planning projects.",
      zh: "测量和地形测量专家，为建筑和规划项目提供服务。",
    },
  },
  // Chief Accountant
  {
    id: "15",
    name: "Nguyễn Thị Ngọc Hà",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
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
  // Japanese Companies
  { id: "1", name: "Ajinomoto", category: "japanese" },
  { id: "2", name: "Wacoal", category: "japanese" },
  { id: "3", name: "NEC/Tokin", category: "japanese" },
  { id: "4", name: "Shimazu", category: "japanese" },
  { id: "5", name: "Fukuvi", category: "japanese" },
  // Multinational Corporations
  { id: "6", name: "Heineken", category: "multinational" },
  { id: "7", name: "Colgate Palmolive", category: "multinational" },
  { id: "8", name: "Sanofi", category: "multinational" },
  { id: "9", name: "Unilever", category: "multinational" },
  { id: "10", name: "Mitsubishi Motors", category: "multinational" },
  // Construction & Engineering
  { id: "11", name: "Tracodi Group", category: "construction" },
  { id: "12", name: "Dinco", category: "construction" },
  { id: "13", name: "COFICO", category: "construction" },
  { id: "14", name: "Pure VN", category: "developer" },
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
// STATISTICS
// ============================================

export const companyStats = {
  yearsExperience: 30,
  projectsCompleted: 50,
  clients: 40,
  teamMembers: 16, // Updated to reflect actual team size
};
