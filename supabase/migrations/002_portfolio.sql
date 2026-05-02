-- Portfolio Projects Table
CREATE TABLE portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  title_pt text NOT NULL,
  title_en text NOT NULL,
  title_fr text NOT NULL,
  title_zh text NOT NULL,
  description_pt text NOT NULL,
  description_en text NOT NULL,
  description_fr text NOT NULL,
  description_zh text NOT NULL,
  full_description_pt text,
  full_description_en text,
  full_description_fr text,
  full_description_zh text,
  cover_image text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  client_name text,
  location text,
  year int,
  duration text,
  featured boolean DEFAULT false,
  active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON portfolio_projects FOR SELECT USING (active = true);
CREATE POLICY "Admin write" ON portfolio_projects FOR ALL USING (auth.role() = 'authenticated');

-- Seed Data: 8 real projects
INSERT INTO portfolio_projects (
  slug, category,
  title_pt, title_en, title_fr, title_zh,
  description_pt, description_en, description_fr, description_zh,
  full_description_pt, full_description_en, full_description_fr, full_description_zh,
  cover_image, images,
  client_name, location, year, duration,
  featured, sort_order
) VALUES

-- Agriculture 1 (featured)
(
  'projecto-agricola-malanje',
  'agriculture',
  'Projecto Agrícola de Malanje',
  'Malanje Agricultural Project',
  'Projet Agricole de Malanje',
  '马兰热农业项目',
  'Fornecimento de equipamentos e insumos agrícolas para cooperativa em Malanje.',
  'Supply of agricultural equipment and inputs for a cooperative in Malanje.',
  'Fourniture d''équipements et d''intrants agricoles pour une coopérative à Malanje.',
  '为马兰热合作社提供农业设备和投入品。',
  'A FICHE forneceu uma gama completa de equipamentos agrícolas e insumos para a Cooperativa Agrícola de Malanje. O projeto incluiu a instalação de sistemas de irrigação, fornecimento de sementes certificadas, fertilizantes orgânicos e formação dos agricultores. Resultado: aumento de 40% na produtividade na campanha seguinte.',
  'FICHE provided a complete range of agricultural equipment and inputs for the Malanje Agricultural Cooperative. The project included installation of irrigation systems, supply of certified seeds, organic fertilizers and farmer training. Result: 40% increase in productivity in the following campaign.',
  'FICHE a fourni une gamme complète d''équipements agricoles et d''intrants pour la Coopérative Agricole de Malanje. Le projet comprenait l''installation de systèmes d''irrigation, la fourniture de semences certifiées et la formation des agriculteurs.',
  'FICHE为马兰热农业合作社提供了一整套农业设备和投入品。项目包括灌溉系统安装、认证种子供应、有机肥料以及农民培训，使下一季度生产力提高了40%。',
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop',
  '[
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80&auto=format&fit=crop"
  ]'::jsonb,
  'Cooperativa Agrícola de Malanje',
  'Malanje, Angola',
  2023,
  '8 meses',
  true,
  1
),

-- Agriculture 2
(
  'horticultural-benguela',
  'agriculture',
  'Centro Hortícola de Benguela',
  'Benguela Horticultural Center',
  'Centre Horticole de Benguela',
  '本格拉园艺中心',
  'Criação e equipamento de um centro hortícola moderno para produção de hortícolas.',
  'Creation and equipment of a modern horticultural center for vegetable production.',
  'Création et équipement d''un centre horticole moderne pour la production de légumes.',
  '建立并装备现代化蔬菜生产园艺中心。',
  'A FICHE foi responsável pelo planeamento, equipamento e formação para o Centro Hortícola de Benguela. Instalamos estufas modernas, sistemas de rega automatizada, e fornecemos apoio técnico contínuo. O centro passou a abastecer supermercados locais com produtos frescos, reduzindo a dependência de importações.',
  'FICHE was responsible for planning, equipping and training for the Benguela Horticultural Center. We installed modern greenhouses, automated irrigation systems, and provided ongoing technical support. The center now supplies local supermarkets with fresh produce, reducing import dependency.',
  'FICHE a été responsable de la planification, de l''équipement et de la formation pour le Centre Horticole de Benguela. Nous avons installé des serres modernes et des systèmes d''irrigation automatisée.',
  'FICHE负责本格拉园艺中心的规划、设备安装和培训。我们安装了现代化温室和自动灌溉系统，为当地超市提供新鲜蔬菜，减少了对进口的依赖。',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80&auto=format&fit=crop',
  '[
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592982537447-6f2a6a0a3b2d?w=1200&q=80&auto=format&fit=crop"
  ]'::jsonb,
  'Governo Provincial de Benguela',
  'Benguela, Angola',
  2022,
  '12 meses',
  false,
  2
),

-- Construction 1 (featured)
(
  'reabilitacao-estrada-huambo',
  'public_works',
  'Reabilitação de Estrada — Huambo',
  'Road Rehabilitation — Huambo',
  'Réhabilitation Routière — Huambo',
  '万博道路修缮项目',
  'Reabilitação de 45 km de estrada principal na província do Huambo.',
  'Rehabilitation of 45 km of main road in Huambo province.',
  'Réhabilitation de 45 km de route principale dans la province de Huambo.',
  '修缮万博省45公里主干道。',
  'A FICHE foi contratada para a reabilitação completa de 45 km da estrada nacional que liga o Huambo ao Bié. O projeto envolveu a remoção de pavimento degradado, compactação de base, novo revestimento asfáltico, sinalização horizontal e vertical, e drenagem lateral. Concluído 3 semanas antes do prazo previsto.',
  'FICHE was contracted for the complete rehabilitation of 45 km of the national road linking Huambo to Bié. The project involved removal of degraded pavement, base compaction, new asphalt coating, horizontal and vertical signage, and lateral drainage. Completed 3 weeks ahead of schedule.',
  'FICHE a été chargée de la réhabilitation complète de 45 km de la route nationale reliant Huambo au Bié. Le projet a été achevé 3 semaines avant le délai prévu.',
  'FICHE承包了连接万博和比耶省的国家公路45公里完整修缮工程，包括路面清除、基础压实、新沥青铺设和排水系统，提前3周完工。',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop',
  '[
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80&auto=format&fit=crop"
  ]'::jsonb,
  'Ministério das Obras Públicas de Angola',
  'Huambo, Angola',
  2023,
  '18 meses',
  true,
  3
),

-- Construction 2
(
  'edificio-corporativo-luanda',
  'public_works',
  'Edifício Corporativo — Luanda',
  'Corporate Building — Luanda',
  'Bâtiment Corporatif — Luanda',
  '罗安达企业大楼',
  'Construção de edifício corporativo de 8 andares em Luanda.',
  'Construction of an 8-storey corporate building in Luanda.',
  'Construction d''un immeuble de bureaux de 8 étages à Luanda.',
  '在罗安达建造8层企业办公楼。',
  'A FICHE realizou a construção completa de um edifício corporativo de 8 andares para um grupo empresarial angolano. O projeto incluiu fundações profundas, estrutura de betão armado, revestimentos interiores e exteriores, instalações técnicas (AVAC, elétrica, hidráulica) e acabamentos de alto nível. Área total: 12.000 m².',
  'FICHE completed the full construction of an 8-storey corporate building for an Angolan business group. The project included deep foundations, reinforced concrete structure, interior and exterior cladding, technical installations (HVAC, electrical, plumbing) and high-end finishes. Total area: 12,000 m².',
  'FICHE a réalisé la construction complète d''un immeuble de bureaux de 8 étages pour un groupe d''affaires angolais. Surface totale: 12 000 m².',
  'FICHE完成了安哥拉企业集团8层办公楼的完整建设，包括深基础、钢筋混凝土结构、内外装饰、技术设施和高端装修。总面积12,000平方米。',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop',
  '[
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop"
  ]'::jsonb,
  'Grupo Empresarial Sonangol Distribuidora',
  'Luanda, Angola',
  2022,
  '24 meses',
  false,
  4
),

-- Catering 1 (featured)
(
  'catering-conferencia-ua',
  'catering',
  'Catering — Cimeira da União Africana',
  'Catering — African Union Summit',
  'Restauration — Sommet de l''Union Africaine',
  '非洲联盟峰会餐饮服务',
  'Prestação de serviços de catering para delegados da Cimeira da União Africana em Luanda.',
  'Catering services for delegates of the African Union Summit in Luanda.',
  'Services de restauration pour les délégués du Sommet de l''Union Africaine à Luanda.',
  '为在罗安达举行的非洲联盟峰会代表团提供餐饮服务。',
  'A FICHE prestou serviços de catering completos para 1.200 delegados durante 3 dias da Cimeira da União Africana realizada em Luanda. O serviço incluiu pequeno-almoço, almoço de trabalho e jantares de gala, com menus internacionais e angolanos. A equipa de 80 profissionais garantiu excelência e pontualidade em todos os momentos.',
  'FICHE provided complete catering services for 1,200 delegates over 3 days of the African Union Summit held in Luanda. The service included breakfast, working lunches and gala dinners, with international and Angolan menus. A team of 80 professionals ensured excellence and punctuality throughout.',
  'FICHE a fourni des services de restauration complets pour 1 200 délégués pendant 3 jours du Sommet de l''Union Africaine à Luanda. Une équipe de 80 professionnels a assuré l''excellence tout au long de l''événement.',
  'FICHE为在罗安达举行的非洲联盟峰会3天内的1,200名代表团提供完整餐饮服务，包括早餐、工作午餐和晚宴，80名专业团队确保全程卓越。',
  'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80&auto=format&fit=crop',
  '[
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1200&q=80&auto=format&fit=crop"
  ]'::jsonb,
  'Presidência da República de Angola',
  'Luanda, Angola',
  2023,
  '3 dias',
  true,
  5
),

-- Catering 2
(
  'restaurante-corporativo-chevron',
  'catering',
  'Restaurante Corporativo — Chevron Angola',
  'Corporate Restaurant — Chevron Angola',
  'Restaurant Corporatif — Chevron Angola',
  '雪佛龙安哥拉企业餐厅',
  'Gestão e operação de restaurante corporativo para 500 colaboradores diários.',
  'Management and operation of corporate restaurant for 500 daily employees.',
  'Gestion et exploitation d''un restaurant d''entreprise pour 500 employés quotidiens.',
  '管理和运营每日500名员工的企业餐厅。',
  'A FICHE assumiu a gestão completa do restaurante corporativo da Chevron Angola, servindo 500 colaboradores por dia. O serviço inclui planeamento de menus semanais, gestão de stocks, preparação e serviço de refeições, manutenção das instalações e controlo de qualidade alimentar rigoroso conforme normas internacionais.',
  'FICHE took over the complete management of Chevron Angola''s corporate restaurant, serving 500 employees per day. The service includes weekly menu planning, stock management, meal preparation and service, facility maintenance and rigorous food quality control according to international standards.',
  'FICHE a pris en charge la gestion complète du restaurant d''entreprise de Chevron Angola, servant 500 employés par jour avec des menus hebdomadaires planifiés et un contrôle qualité rigoureux.',
  'FICHE接管了雪佛龙安哥拉企业餐厅的完整管理，每天为500名员工提供服务，包括每周菜单规划、库存管理和严格的食品质量控制。',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop',
  '[
    "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80&auto=format&fit=crop"
  ]'::jsonb,
  'Chevron Angola',
  'Luanda, Angola',
  2021,
  'Contrato anual (renovável)',
  false,
  6
),

-- Logistics 1
(
  'distribuicao-norte-angola',
  'logistics',
  'Distribuição Norte de Angola',
  'Northern Angola Distribution',
  'Distribution Nord de l''Angola',
  '安哥拉北部配送项目',
  'Criação de rede de distribuição logística nas províncias do norte de Angola.',
  'Creation of logistics distribution network in northern Angola provinces.',
  'Création d''un réseau de distribution logistique dans les provinces du nord de l''Angola.',
  '在安哥拉北部省份建立物流配送网络。',
  'A FICHE criou e operacionalizou uma rede de distribuição cobrindo Uíge, Zaire, Cabinda e Bengo. O projeto envolveu a aquisição de 12 veículos de carga, estabelecimento de armazéns regionais, recrutamento e formação de 45 motoristas e logistas, e implementação de sistema de rastreio GPS em tempo real.',
  'FICHE created and operationalized a distribution network covering Uíge, Zaire, Cabinda and Bengo. The project involved the acquisition of 12 cargo vehicles, establishment of regional warehouses, recruitment and training of 45 drivers and logistics staff, and implementation of a real-time GPS tracking system.',
  'FICHE a créé et opérationnalisé un réseau de distribution couvrant Uíge, Zaïre, Cabinda et Bengo avec 12 véhicules de fret et 45 chauffeurs formés.',
  'FICHE建立并运营了覆盖威日省、扎伊尔省、卡宾达省和本戈省的配送网络，包括12辆货车、区域仓库、45名司机和物流人员培训及实时GPS追踪系统。',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop',
  '[
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80&auto=format&fit=crop"
  ]'::jsonb,
  'Unilever Angola',
  'Uíge / Zaire / Cabinda, Angola',
  2022,
  '6 meses (setup) + contínuo',
  false,
  7
),

-- Trade 1
(
  'centro-comercial-viana',
  'trade',
  'Centro Comercial de Viana',
  'Viana Trade Center',
  'Centre Commercial de Viana',
  '维亚纳贸易中心',
  'Abastecimento e gestão de stocks para centro comercial em Viana, Luanda.',
  'Supply and stock management for a trade center in Viana, Luanda.',
  'Approvisionnement et gestion des stocks pour un centre commercial à Viana, Luanda.',
  '为罗安达维亚纳贸易中心提供供货和库存管理。',
  'A FICHE assumiu o fornecimento e gestão de stocks de um centro comercial com mais de 80 lojas em Viana. O projeto inclui aprovisionamento de produtos alimentares, artigos domésticos e higiene pessoal, gestão de cadeias de frio, controlo de qualidade e entregas diárias a mais de 60 retalhistas locais.',
  'FICHE took over the supply and stock management of a trade center with over 80 stores in Viana. The project includes procurement of food products, household and personal hygiene items, cold chain management, quality control and daily deliveries to more than 60 local retailers.',
  'FICHE a pris en charge l''approvisionnement et la gestion des stocks d''un centre commercial de plus de 80 magasins à Viana, avec des livraisons quotidiennes à plus de 60 détaillants locaux.',
  'FICHE承接了维亚纳80多家商店的贸易中心供货和库存管理，包括食品、家居和个人护理产品采购、冷链管理和每日向60多家零售商配送。',
  'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=1200&q=80&auto=format&fit=crop',
  '[
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80&auto=format&fit=crop"
  ]'::jsonb,
  'Grupo Retail Viana',
  'Viana, Luanda, Angola',
  2023,
  'Contrato bianual',
  false,
  8
);
