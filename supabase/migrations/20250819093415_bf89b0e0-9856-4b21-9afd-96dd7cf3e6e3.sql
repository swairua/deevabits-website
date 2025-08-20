-- Insert mock data for products
INSERT INTO public.products (name, description, price, stock_quantity, category, specifications) VALUES
('280W Monocrystalline Solar Panel', 'High-efficiency solar panel perfect for residential installations', 15000.00, 50, 'Solar Panels', '{"power": "280W", "efficiency": "20.5%", "warranty": "25 years"}'),
('5KVA Pure Sine Wave Inverter', 'Reliable inverter for home and small business use', 45000.00, 25, 'Inverters', '{"capacity": "5KVA", "type": "Pure Sine Wave", "efficiency": "95%"}'),
('200Ah Deep Cycle Battery', 'Long-lasting battery for solar energy storage', 28000.00, 30, 'Batteries', '{"capacity": "200Ah", "type": "Deep Cycle", "lifespan": "8-10 years"}'),
('60A MPPT Charge Controller', 'Maximum Power Point Tracking charge controller', 12000.00, 40, 'Charge Controllers', '{"current": "60A", "type": "MPPT", "efficiency": "98%"}'),
('Solar Installation Kit', 'Complete mounting hardware for roof installation', 8000.00, 35, 'Accessories', '{"includes": "Rails, clamps, bolts", "roof_type": "Metal/Tile"}'),
('DC MCB 63A Double Pole', 'Safety circuit breaker for DC applications', 2500.00, 100, 'Safety Equipment', '{"current": "63A", "poles": "2", "voltage": "1000V DC"}'),
('Solar Water Pump 1HP', 'Efficient solar-powered water pump for irrigation', 35000.00, 15, 'Solar Appliances', '{"power": "1HP", "head": "50m", "flow": "2000L/hr"}'),
('LED Solar Street Light 60W', 'All-in-one solar street light with motion sensor', 18000.00, 20, 'Solar Lighting', '{"power": "60W", "battery": "LiFePO4", "runtime": "12 hours"}'),
('Solar Fridge 168L', 'Energy-efficient solar refrigerator for off-grid use', 85000.00, 8, 'Solar Appliances', '{"capacity": "168L", "power": "DC 12/24V", "efficiency": "A++"}'),
('Flexible Solar Panel 100W', 'Bendable solar panel for boats and RVs', 22000.00, 25, 'Solar Panels', '{"power": "100W", "flexibility": "30 degrees", "weight": "2.5kg"}');

-- Insert mock data for solar packages
INSERT INTO public.solar_packages (name, description, price, components, best_for) VALUES
('Starter Solar Package', 'Perfect for lighting and phone charging', 45000.00, '{"panels": "2x 280W", "battery": "1x 100Ah", "inverter": "1x 1KVA", "controller": "1x 30A PWM"}', '{"Small homes", "Basic lighting", "Phone charging"}'),
('Home Power Package', 'Complete home solar solution for average household', 120000.00, '{"panels": "4x 280W", "battery": "2x 200Ah", "inverter": "1x 3KVA", "controller": "1x 60A MPPT"}', '{"Medium homes", "TV and appliances", "Home office"}'),
('Business Power Package', 'Commercial-grade solar system for small businesses', 280000.00, '{"panels": "8x 280W", "battery": "4x 200Ah", "inverter": "1x 5KVA", "controller": "2x 60A MPPT"}', '{"Small shops", "Offices", "Workshops", "Clinics"}');

-- Insert mock data for blog posts  
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, is_published, published_at) VALUES
('Understanding PAYGo Solar Systems in Kenya', 'paygo-solar-systems-kenya', 'How Pay-As-You-Go solar is revolutionizing energy access for low-income households across Kenya.', 'Pay-As-You-Go (PAYGo) solar systems have transformed energy access in Kenya...', 'Technology', true, NOW() - INTERVAL '7 days'),
('Net Metering: Selling Solar Power Back to the Grid', 'net-metering-solar-power-grid', 'Learn how Kenyan households can earn money by selling excess solar power back to Kenya Power.', 'Net metering allows solar system owners to feed excess electricity back into the national grid...', 'Policy', true, NOW() - INTERVAL '14 days'),
('Solar for Small and Medium Enterprises (SMEs)', 'solar-sme-businesses-kenya', 'Why solar energy is the perfect solution for powering small businesses in Kenya.', 'Small and Medium Enterprises (SMEs) form the backbone of Kenya''s economy...', 'Business', true, NOW() - INTERVAL '21 days'),
('Solar-Powered Cold Storage for Farmers', 'solar-cold-storage-farmers', 'How solar fridges are reducing post-harvest losses and increasing farmer incomes.', 'Post-harvest losses cost Kenyan farmers millions of shillings annually...', 'Agriculture', true, NOW() - INTERVAL '28 days'),
('Financing Your Solar System: Options Available', 'solar-financing-options-kenya', 'Explore various financing options to make solar energy affordable for every Kenyan household.', 'The upfront cost of solar systems can be a barrier for many households...', 'Finance', true, NOW() - INTERVAL '35 days');

-- Insert mock data for donors
INSERT INTO public.donors (name, description, website_url) VALUES
('Green Climate Fund', 'Supporting climate adaptation and mitigation projects in developing countries', 'https://www.greenclimate.fund'),
('USAID Power Africa', 'Increasing access to reliable, affordable electricity across sub-Saharan Africa', 'https://www.usaid.gov/powerafrica'),
('World Bank Energy', 'Financing sustainable energy projects for poverty reduction and economic growth', 'https://www.worldbank.org/en/topic/energy');

-- Insert mock data for projects
INSERT INTO public.projects (title, description, donor_id, amount, outcome, impact_metrics, start_date, end_date) VALUES
('Rural Electrification Initiative', 'Bringing solar power to 5,000 households in remote areas of Turkana County', (SELECT id FROM public.donors WHERE name = 'Green Climate Fund'), 2500000.00, 'Successfully installed solar systems in 5,200 households, exceeding target by 4%', '{"households": 5200, "people_reached": 26000, "co2_saved": 1560, "jobs_created": 85}', '2022-01-15', '2023-06-30'),
('Women Solar Entrepreneurs Program', 'Training 200 women as Village Solar Entrepreneurs across 10 counties', (SELECT id FROM public.donors WHERE name = 'USAID Power Africa'), 800000.00, 'Trained 215 women entrepreneurs who have collectively sold over 8,000 solar systems', '{"women_trained": 215, "systems_sold": 8150, "income_generated": 48900000, "counties_covered": 12}', '2022-06-01', '2024-05-31'),
('Solar for Schools Project', 'Providing solar power and internet connectivity to 100 primary schools', (SELECT id FROM public.donors WHERE name = 'World Bank Energy'), 1200000.00, 'Completed installation in 105 schools, improving learning outcomes for 15,000 students', '{"schools": 105, "students": 15750, "teachers": 420, "computers_installed": 315}', '2021-09-01', '2023-03-31');