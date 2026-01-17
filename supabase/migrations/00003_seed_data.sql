-- Seed data for initial development

-- Insert default services
INSERT INTO services (name_vi, name_en, name_zh, description_vi, description_en, description_zh, icon, order_index)
VALUES
    (
        'Tư vấn thiết kế',
        'Design Consultancy',
        '设计咨询',
        'Cung cấp giải pháp thiết kế tối ưu cho mọi loại công trình',
        'Providing optimal design solutions for all types of buildings',
        '为各类建筑提供最优设计解决方案',
        'compass',
        1
    ),
    (
        'Thiết kế kỹ thuật',
        'Engineering Design',
        '工程设计',
        'Thiết kế chuyên sâu về Kiến trúc, Kết cấu và hệ thống MEP',
        'In-depth design for Architecture, Structure, and MEP systems',
        '高精度的建筑、结构和MEP系统深度设计',
        'pen-tool',
        2
    ),
    (
        'Giải pháp tổng thể',
        'Integrated Solutions',
        '综合解决方案',
        'Cung cấp giải pháp toàn diện từ giai đoạn ý tưởng đến hoàn thiện',
        'Providing comprehensive solutions from concept to completion',
        '从概念阶段到项目完成提供全面解决方案',
        'layers',
        3
    );

-- Insert sample projects
INSERT INTO projects (slug, title_vi, title_en, title_zh, category, services, location, year, summary_vi, summary_en, summary_zh, published)
VALUES
    (
        'modern-office-tower',
        'Tòa nhà văn phòng hiện đại',
        'Modern Office Tower',
        '现代办公大楼',
        'commercial',
        ARRAY['design', 'engineering'],
        'Ho Chi Minh City',
        2024,
        'Thiết kế tòa nhà văn phòng 20 tầng với các tiện ích hiện đại',
        'Design of a 20-story office building with modern amenities',
        '设计一座拥有现代化设施的20层办公大楼',
        true
    ),
    (
        'luxury-residential-complex',
        'Khu căn hộ cao cấp',
        'Luxury Residential Complex',
        '豪华住宅区',
        'residential',
        ARRAY['design', 'engineering', 'integrated'],
        'Hanoi',
        2023,
        'Thiết kế khu căn hộ cao cấp với hơn 500 căn hộ',
        'Design of a luxury residential complex with over 500 units',
        '设计一个拥有500多套公寓的豪华住宅区',
        true
    ),
    (
        'industrial-manufacturing-park',
        'Khu công nghiệp sản xuất',
        'Industrial Manufacturing Park',
        '工业制造园区',
        'industrial',
        ARRAY['engineering', 'integrated'],
        'Binh Duong',
        2023,
        'Thiết kế khu công nghiệp với diện tích 50 hecta',
        'Design of an industrial park spanning 50 hectares',
        '设计一个占地50公顷的工业园区',
        true
    );

