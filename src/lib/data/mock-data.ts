// Mock data for HDG website
// This file contains all placeholder data with multilingual support

import type { Locale } from "@/lib/i18n/config";

// ============================================
// PROJECTS DATA
// ============================================

export interface Project {
  slug: string;
  category: string;
  location: string;
  year: number;
  coverImage: string;
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
}

export const projects: Project[] = [
  {
    slug: "modern-office-tower",
    category: "commercial",
    location: "Ho Chi Minh City",
    year: 2024,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    title: {
      vi: "Tòa nhà văn phòng hiện đại",
      en: "Modern Office Tower",
      zh: "现代办公大厦",
    },
    summary: {
      vi: "Thiết kế tòa nhà văn phòng 25 tầng với hệ thống MEP tiên tiến",
      en: "25-story office building design with advanced MEP systems",
      zh: "25层办公楼设计，配备先进的机电系统",
    },
  },
  {
    slug: "luxury-residential-complex",
    category: "residential",
    location: "Hanoi",
    year: 2023,
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    title: {
      vi: "Khu căn hộ cao cấp",
      en: "Luxury Residential Complex",
      zh: "豪华住宅综合体",
    },
    summary: {
      vi: "Dự án căn hộ cao cấp với 500 căn hộ và tiện ích đẳng cấp",
      en: "Premium apartment project with 500 units and world-class amenities",
      zh: "高端公寓项目，拥有500套公寓和世界级设施",
    },
  },
  {
    slug: "industrial-manufacturing-park",
    category: "industrial",
    location: "Binh Duong",
    year: 2023,
    coverImage: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop",
    title: {
      vi: "Khu công nghiệp sản xuất",
      en: "Industrial Manufacturing Park",
      zh: "工业制造园区",
    },
    summary: {
      vi: "Thiết kế khu công nghiệp 50 hecta với hạ tầng hoàn chỉnh",
      en: "50-hectare industrial park design with complete infrastructure",
      zh: "50公顷工业园区设计，配套完善基础设施",
    },
  },
  {
    slug: "mixed-use-development",
    category: "commercial",
    location: "Da Nang",
    year: 2024,
    coverImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    title: {
      vi: "Khu phức hợp đa năng",
      en: "Mixed-Use Development",
      zh: "综合开发项目",
    },
    summary: {
      vi: "Dự án kết hợp thương mại, văn phòng và căn hộ",
      en: "Project combining commercial, office and residential spaces",
      zh: "商业、办公和住宅综合项目",
    },
  },
  {
    slug: "urban-apartment-tower",
    category: "residential",
    location: "Ho Chi Minh City",
    year: 2023,
    coverImage: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&h=600&fit=crop",
    title: {
      vi: "Tháp căn hộ đô thị",
      en: "Urban Apartment Tower",
      zh: "城市公寓大厦",
    },
    summary: {
      vi: "Căn hộ cao cấp 35 tầng tại trung tâm thành phố",
      en: "35-story premium apartments in the city center",
      zh: "市中心35层高端公寓",
    },
  },
  {
    slug: "logistics-hub",
    category: "industrial",
    location: "Long An",
    year: 2024,
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
    title: {
      vi: "Trung tâm logistics",
      en: "Logistics Hub",
      zh: "物流中心",
    },
    summary: {
      vi: "Trung tâm logistics hiện đại với diện tích 30,000m²",
      en: "Modern logistics center with 30,000m² area",
      zh: "30,000平方米现代物流中心",
    },
  },
];

// Helper function to get localized project
export function getLocalizedProject(project: Project, locale: Locale) {
  return {
    ...project,
    title: project.title[locale] || project.title.en,
    summary: project.summary?.[locale] || project.summary?.en,
  };
}

// Get featured projects (first 3)
export function getFeaturedProjects() {
  return projects.slice(0, 3);
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
// TEAM MEMBERS (Future use)
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
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    role: {
      vi: "Giám đốc điều hành",
      en: "Chief Executive Officer",
      zh: "首席执行官",
    },
    bio: {
      vi: "Hơn 20 năm kinh nghiệm trong ngành xây dựng",
      en: "Over 20 years of experience in the construction industry",
      zh: "建筑行业20多年经验",
    },
  },
  {
    id: "2",
    name: "Trần Thị B",
    role: {
      vi: "Giám đốc thiết kế",
      en: "Design Director",
      zh: "设计总监",
    },
    bio: {
      vi: "Chuyên gia thiết kế kiến trúc với nhiều dự án lớn",
      en: "Architecture design expert with many large-scale projects",
      zh: "建筑设计专家，参与多个大型项目",
    },
  },
  {
    id: "3",
    name: "Lê Văn C",
    role: {
      vi: "Trưởng phòng kỹ thuật",
      en: "Technical Manager",
      zh: "技术经理",
    },
    bio: {
      vi: "Chuyên gia về hệ thống MEP và kết cấu công trình",
      en: "Expert in MEP systems and structural engineering",
      zh: "机电系统和结构工程专家",
    },
  },
];

// ============================================
// CLIENTS (Future use)
// ============================================

export interface Client {
  id: string;
  name: string;
  logo?: string;
  website?: string;
}

export const clients: Client[] = [
  { id: "1", name: "Vingroup" },
  { id: "2", name: "Novaland" },
  { id: "3", name: "CapitaLand" },
  { id: "4", name: "Keppel Land" },
  { id: "5", name: "Sun Group" },
  { id: "6", name: "BRG Group" },
];

