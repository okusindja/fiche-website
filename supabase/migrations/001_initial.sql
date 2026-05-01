-- Site settings (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color text NOT NULL DEFAULT '#10913b',
  primary_name text NOT NULL DEFAULT 'green',
  theme_mode text NOT NULL DEFAULT 'system',
  seasonal_override boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert default row
INSERT INTO site_settings (primary_color, primary_name) VALUES ('#10913b', 'green')
  ON CONFLICT DO NOTHING;

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  icon text NOT NULL,
  title_pt text NOT NULL,
  title_en text NOT NULL,
  title_fr text NOT NULL,
  title_zh text NOT NULL,
  description_pt text NOT NULL,
  description_en text NOT NULL,
  description_fr text NOT NULL,
  description_zh text NOT NULL,
  icon_bg text NOT NULL DEFAULT '#f0faf4',
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text NOT NULL,
  content_pt text NOT NULL,
  content_en text NOT NULL,
  content_fr text NOT NULL,
  content_zh text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  action text NOT NULL,
  entity text,
  entity_id text,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Seed services
INSERT INTO services (slug, icon, title_pt, title_en, title_fr, title_zh, description_pt, description_en, description_fr, description_zh, icon_bg, sort_order) VALUES
('produtos-agricolas', '🌾', 'Produtos Agrícolas', 'Agricultural Products', 'Produits Agricoles', '农业产品', 'Sementes, fertilizantes, equipamentos e insumos para o campo angolano. Parceria com fornecedores certificados.', 'Seeds, fertilizers, equipment and inputs for Angolan farms. Partnership with certified suppliers.', 'Semences, engrais, équipements et intrants pour les exploitations agricoles angolaises.', '为安哥拉农场提供种子、化肥、设备和农业投入品。与认证供应商合作。', '#f0faf4', 1),
('restauracao', '🍽️', 'Restauração', 'Catering', 'Restauration', '餐饮服务', 'Serviços de catering e restauração para eventos corporativos, casamentos e funcionamento diário.', 'Catering and restaurant services for corporate events, weddings and daily operations.', 'Services de restauration et traiteur pour événements d''entreprise, mariages et usage quotidien.', '为企业活动、婚礼和日常运营提供餐饮和餐厅服务。', '#f0f9ff', 2),
('obras-publicas', '🏗️', 'Obras Públicas', 'Public Works', 'Travaux Publics', '公共工程', 'Construção civil, reabilitação de infraestruturas e prestação de serviços de engenharia em todo o território.', 'Civil construction, infrastructure rehabilitation and engineering services throughout the country.', 'Construction civile, réhabilitation d''infrastructures et services d''ingénierie sur tout le territoire.', '全国范围内的民用建筑、基础设施修缮和工程服务。', '#fff9f0', 3),
('comercio-geral', '🛒', 'Comércio Geral', 'General Trade', 'Commerce Général', '综合贸易', 'Distribuição e venda de produtos de consumo geral — parceiros fiáveis para retalhistas e grossistas.', 'Distribution and sale of general consumer products — reliable partners for retailers and wholesalers.', 'Distribution et vente de produits de consommation générale — partenaires fiables pour les détaillants et grossistes.', '一般消费品的分销和销售——零售商和批发商的可靠合作伙伴。', '#f9f0ff', 4),
('manutencao', '🔧', 'Manutenção', 'Maintenance', 'Maintenance', '维护服务', 'Serviços de manutenção industrial, predial e de equipamentos para garantir a continuidade do negócio.', 'Industrial, building and equipment maintenance services to ensure business continuity.', 'Services de maintenance industrielle, immobilière et d''équipements pour assurer la continuité des activités.', '工业、建筑和设备维护服务，确保业务连续性。', '#fff0f0', 5),
('logistica', '📦', 'Logística', 'Logistics', 'Logistique', '物流服务', 'Transporte e distribuição eficiente de mercadorias em Angola com frota própria e rede de parceiros.', 'Efficient transport and distribution of goods in Angola with own fleet and partner network.', 'Transport et distribution efficaces de marchandises en Angola avec flotte propre et réseau de partenaires.', '拥有自有车队和合作伙伴网络，在安哥拉高效运输和分发货物。', '#f0f2ff', 6)
ON CONFLICT (slug) DO NOTHING;

-- Seed testimonials
INSERT INTO testimonials (author_name, author_role, content_pt, content_en, content_fr, content_zh, sort_order) VALUES
('Maria Graça', 'Gerente Agrícola, Huambo', '"A FICHE transformou a nossa produção agrícola. Equipamentos de qualidade e suporte técnico excepcional."', '"FICHE transformed our agricultural production. Quality equipment and exceptional technical support."', '"La FICHE a transformé notre production agricole. Équipements de qualité et support technique exceptionnel."', '"FICHE改变了我们的农业生产。高质量的设备和出色的技术支持。"', 1),
('Carlos Mendes', 'Empresário, Luanda', '"Para obras civis, a FICHE é o parceiro certo. Cumprem prazos e entregam qualidade acima do esperado."', '"For civil works, FICHE is the right partner. They meet deadlines and deliver quality above expectations."', '"Pour les travaux civils, FICHE est le bon partenaire. Ils respectent les délais et livrent une qualité au-dessus des attentes."', '"对于土木工程，FICHE是正确的合作伙伴。他们按时完成并提供超出预期的质量。"', 2),
('Ana Ferreira', 'Chef, Restaurante Benguela', '"O serviço de catering da FICHE salvou o nosso evento. Profissionalismo e sabor autêntico angolano."', '"FICHE''s catering service saved our event. Professionalism and authentic Angolan flavor."', '"Le service traiteur de FICHE a sauvé notre événement. Professionnalisme et saveur authentiquement angolaise."', '"FICHE的餐饮服务挽救了我们的活动。专业精神和正宗的安哥拉风味。"', 3)
ON CONFLICT DO NOTHING;

-- RLS policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read for site_settings, services, testimonials
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (active = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (active = true);

-- Authenticated admin for everything else
CREATE POLICY "Admin write site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read contact_messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read audit_logs" ON audit_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin insert audit_logs" ON audit_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
