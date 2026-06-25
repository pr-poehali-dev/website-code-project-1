import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/6d83858f-b15e-43e4-82b7-a418fe0fd4b9/files/8f56a21d-e6fc-47ca-88c0-7526dcbd052e.jpg';

type Cat = 'all' | 'geo' | 'hydro' | 'chem';

interface Product {
  id: number;
  name: string;
  cat: Exclude<Cat, 'all'>;
  icon: string;
  desc: string;
  price: number;
  unit: string;
}

const products: Product[] = [
  { id: 1, name: 'Георешётка объёмная', cat: 'geo', icon: 'Grid3x3', desc: 'Армирование дорожного полотна', price: 450, unit: 'м²' },
  { id: 2, name: 'Геотекстиль иглопробивной', cat: 'geo', icon: 'Layers', desc: 'Дренаж, фильтрация, разделение слоёв', price: 120, unit: 'м²' },
  { id: 3, name: 'Геокомпозит дренажный', cat: 'geo', icon: 'LayoutGrid', desc: 'Решение для сложных задач', price: 680, unit: 'м²' },
  { id: 4, name: 'Геомембрана ПВХ', cat: 'geo', icon: 'Scroll', desc: 'Гидроизоляция и противофильтрация', price: 540, unit: 'м²' },
  { id: 5, name: 'Рулонная гидроизоляция', cat: 'hydro', icon: 'Waves', desc: 'Битумно-полимерная для дорог', price: 890, unit: 'м²' },
  { id: 6, name: 'Обмазочная гидроизоляция', cat: 'hydro', icon: 'Paintbrush', desc: 'Битумная мастика, праймер', price: 340, unit: 'кг' },
  { id: 7, name: 'Бентонитовый мат', cat: 'hydro', icon: 'Square', desc: 'Гидроизоляция ответственных узлов', price: 1250, unit: 'м²' },
  { id: 8, name: 'Химический анкер', cat: 'chem', icon: 'Syringe', desc: 'Крепление в бетоне и камне', price: 780, unit: 'шт' },
  { id: 9, name: 'Капсульный анкер', cat: 'chem', icon: 'Pill', desc: 'Быстрый монтаж в твёрдые основания', price: 620, unit: 'шт' },
  { id: 10, name: 'Ремонтная смесь', cat: 'chem', icon: 'FlaskConical', desc: 'Восстановление бетонных конструкций', price: 280, unit: 'кг' },
  { id: 11, name: 'Инъекционный состав', cat: 'chem', icon: 'Droplets', desc: 'Герметизация трещин и швов', price: 950, unit: 'л' },
  { id: 12, name: 'Гидрошпонка ПВХ', cat: 'hydro', icon: 'Minus', desc: 'Деформационные швы в бетоне', price: 1450, unit: 'м.п.' },
];

const tabs: { id: Cat; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'geo', label: 'Геосинтетика' },
  { id: 'hydro', label: 'Гидроизоляция' },
  { id: 'chem', label: 'Анкера и ремонт' },
];

const stats = [
  { value: '12 лет', label: 'на рынке' },
  { value: '350+', label: 'проектов' },
  { value: '40+', label: 'регионов' },
  { value: '100%', label: 'гарантия качества' },
];

const navLinks = [
  { id: 'catalog', label: 'Услуги' },
  { id: 'about', label: 'О компании' },
  { id: 'calc', label: 'Калькулятор' },
  { id: 'contact', label: 'Контакты' },
];

const Index = () => {
  const [activeCat, setActiveCat] = useState<Cat>('all');
  const [calcId, setCalcId] = useState(1);
  const [volume, setVolume] = useState(100);
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = activeCat === 'all' ? products : products.filter((p) => p.cat === activeCat);
  const calcProduct = products.find((p) => p.id === calcId)!;

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelect = (id: number) => {
    setCalcId(id);
    scrollTo('calc');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-[64px] md:h-[72px]">
          <button onClick={() => scrollTo('top')} className="flex flex-col items-start leading-none">
            <span className="font-display text-2xl font-700 tracking-tight">
              <span className="text-primary">П</span>И<span className="text-accent">К</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">строительные материалы</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 text-sm font-600 rounded-lg hover:text-primary hover:bg-secondary transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button onClick={() => scrollTo('contact')} className="font-600 hidden sm:inline-flex">Заявка</Button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Меню"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-up">
            <div className="container py-3 flex flex-col gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-left px-3 py-3 text-base font-600 rounded-xl hover:text-primary hover:bg-secondary transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Button onClick={() => scrollTo('contact')} className="font-600 mt-2 h-12 w-full">
                Оставить заявку
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden grid-bg">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-12 items-center py-12 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-secondary text-primary font-600 text-xs sm:text-sm px-4 py-1.5 rounded-full mb-5">
              <Icon name="ShieldCheck" size={16} /> Надёжный поставщик
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-700 leading-[1] lg:leading-[0.95] mb-5 uppercase">
              Материалы для дорог <span className="text-primary">от «ПИК»</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-8">
              Геосинтетика, гидроизоляция, химические анкера. Работаем с подрядчиками по всей России.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="lg" onClick={() => scrollTo('catalog')} className="font-600 text-base h-12 px-7">
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('calc')} className="font-600 text-base h-12 px-7">
                Рассчитать стоимость
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {['Скидки от объёма', 'Логистика включена', 'Сертификаты ГОСТ'].map((f) => (
                <li key={f} className="flex items-center gap-2 font-600 text-sm">
                  <Icon name="Check" size={18} className="text-accent" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
            <div className="absolute -inset-4 bg-accent/20 rounded-[2rem] blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Дорожное строительство"
              className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary text-primary-foreground">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 py-10 md:py-12 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl md:text-4xl lg:text-5xl font-700">{s.value}</div>
              <div className="opacity-80 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG / SERVICES */}
      <section id="catalog" className="py-14 lg:py-20 scroll-mt-16">
        <div className="container">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-700 text-center uppercase">
            Наши <span className="text-primary">услуги</span>
          </h2>
          <p className="text-center text-muted-foreground mt-3 mb-8">Материалы для дорожного строительства</p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveCat(t.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-600 text-sm border-2 transition-all ${
                  activeCat === t.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border hover:border-primary'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="group bg-card rounded-2xl p-5 sm:p-7 border border-border hover:border-primary hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                  <Icon name={p.icon} size={26} />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-600">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{p.desc}</p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-display text-lg font-700 text-primary">
                    от {p.price} ₽<span className="text-sm text-muted-foreground font-400"> / {p.unit}</span>
                  </span>
                  <Button size="sm" variant="secondary" onClick={() => handleSelect(p.id)} className="font-600">
                    Выбрать
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 lg:py-20 bg-secondary/40 scroll-mt-16">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-700 uppercase mb-5">
              О компании <span className="text-primary">«ПИК»</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6">
              Уже 12 лет мы поставляем строительные материалы для автомобильных дорог. Сотрудничаем
              напрямую с заводами-производителями, поэтому гарантируем честные цены и стабильное
              качество на каждом объекте.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: 'Truck', t: 'Своя логистика', d: 'Доставка в 40+ регионов' },
                { icon: 'BadgeCheck', t: 'Сертификаты ГОСТ', d: 'На всю продукцию' },
                { icon: 'Wallet', t: 'Скидки от объёма', d: 'Выгодно крупным заказам' },
                { icon: 'Headphones', t: 'Поддержка 24/7', d: 'Менеджер на связи' },
              ].map((f) => (
                <div key={f.t} className="flex gap-3 bg-card rounded-xl p-4 border border-border">
                  <div className="text-primary shrink-0"><Icon name={f.icon} size={24} /></div>
                  <div>
                    <div className="font-600 text-sm sm:text-base">{f.t}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-first lg:order-last">
            <div className="absolute -inset-3 bg-primary/10 rounded-[2rem] blur-xl" />
            <img src={HERO_IMG} alt="Объект" className="relative rounded-[2rem] shadow-xl w-full object-cover aspect-video lg:aspect-square" />
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="py-14 lg:py-20 scroll-mt-16">
        <div className="container">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-700 text-center uppercase">
            Калькулятор <span className="text-primary">стоимости</span>
          </h2>
          <p className="text-center text-muted-foreground mt-3 mb-8 sm:mb-10">
            Выберите товар и объём, чтобы получить персональное предложение
          </p>

          <div className="max-w-2xl mx-auto bg-card rounded-2xl p-5 sm:p-8 border border-border shadow-lg">
            <label className="font-600 text-sm block mb-2">Выберите товар</label>
            <select
              value={calcId}
              onChange={(e) => setCalcId(Number(e.target.value))}
              className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background font-500 focus:border-primary outline-none transition-colors mb-5 text-sm sm:text-base"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.price} ₽ / {p.unit})
                </option>
              ))}
            </select>

            <label className="font-600 text-sm block mb-2">Объём ({calcProduct.unit})</label>
            <Input
              type="number"
              min={1}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value) || 0)}
              className="h-12 rounded-xl border-2 text-base mb-6"
            />

            <div className="bg-secondary/60 rounded-xl p-4 sm:p-6 border-l-4 border-primary text-center">
              <p className="text-muted-foreground mb-1">
                <strong className="text-foreground font-display text-base sm:text-lg">{calcProduct.name}</strong>
              </p>
              <p className="text-muted-foreground text-sm sm:text-base mb-5">
                Объём: <strong className="text-foreground">{volume}</strong> {calcProduct.unit}
              </p>
              <Button
                size="lg"
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto h-auto py-3 px-6 sm:px-8 whitespace-normal bg-accent hover:bg-accent/90 text-accent-foreground font-700 text-sm sm:text-base animate-pulse-ring"
              >
                <Icon name="Target" size={20} className="mr-2 shrink-0" />
                Узнать персональное предложение
              </Button>
              <p className="text-xs text-muted-foreground mt-3">* Цена зависит от объёма и условий поставки</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-14 lg:py-20 bg-secondary/40 scroll-mt-16">
        <div className="container">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-700 text-center uppercase">
            Оставить <span className="text-primary">заявку</span>
          </h2>
          <p className="text-center text-muted-foreground mt-3 mb-8 sm:mb-10">Мы свяжемся с вами в течение 15 минут</p>

          <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-5 sm:p-8 border border-border shadow-lg">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4">
                    <Icon name="Check" size={36} />
                  </div>
                  <p className="font-display text-xl font-600">Спасибо! Заявка отправлена.</p>
                  <p className="text-muted-foreground">Мы скоро свяжемся с вами.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-3 sm:space-y-4"
                >
                  <Input placeholder="Ваше имя" required className="h-12 rounded-xl border-2" />
                  <Input type="tel" placeholder="Телефон" required className="h-12 rounded-xl border-2" />
                  <Input type="email" placeholder="E-mail (необязательно)" className="h-12 rounded-xl border-2" />
                  <Textarea
                    placeholder="Комментарий: какой товар интересует, объём, сроки..."
                    defaultValue={`Запрос цены: ${calcProduct.name}, объём: ${volume} ${calcProduct.unit}`}
                    className="rounded-xl border-2 min-h-[100px] sm:min-h-[110px]"
                  />
                  <Button type="submit" size="lg" className="w-full font-700 h-12 text-base">
                    Отправить заявку
                  </Button>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              {[
                { icon: 'Phone', t: '+7 (800) 555-35-35', d: 'Звонок по России бесплатный' },
                { icon: 'Mail', t: 'info@pik-dorogi.ru', d: 'Ответим в течение часа' },
                { icon: 'MapPin', t: 'Москва, ул. Строителей, 15', d: 'Офис и склад' },
                { icon: 'Clock', t: 'Пн–Пт 9:00–19:00', d: 'Заявки принимаем круглосуточно' },
              ].map((c) => (
                <div key={c.t} className="flex gap-4 bg-card rounded-2xl p-4 sm:p-5 border border-border items-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={22} />
                  </div>
                  <div>
                    <div className="font-display text-base sm:text-lg font-600">{c.t}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground py-8 sm:py-10 text-center">
        <div className="container">
          <div className="font-display text-2xl font-700">
            <span className="text-primary-foreground">П</span>И<span className="text-accent">К</span>
          </div>
          <p className="mt-3 opacity-90 text-sm">© 2026 Строительная компания «ПИК» — материалы для автодорог</p>
          <p className="mt-1 opacity-60 text-xs">Работаем с подрядчиками по всей России</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
