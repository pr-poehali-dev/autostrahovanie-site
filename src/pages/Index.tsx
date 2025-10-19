import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [carPower, setCarPower] = useState('');
  const [carAge, setCarAge] = useState('');
  const [driverExp, setDriverExp] = useState('');
  const [region, setRegion] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculateInsurance = () => {
    if (!carPower || !carAge || !driverExp || !region) return;
    
    const baseCost = 5000;
    const powerCoef = Number(carPower) > 150 ? 1.6 : Number(carPower) > 100 ? 1.3 : 1.0;
    const ageCoef = Number(carAge) > 10 ? 1.4 : Number(carAge) > 5 ? 1.2 : 1.0;
    const expCoef = Number(driverExp) < 3 ? 1.8 : Number(driverExp) < 7 ? 1.3 : 1.0;
    const regionCoef = region === 'moscow' ? 2.0 : region === 'spb' ? 1.8 : 1.3;
    
    const total = Math.round(baseCost * powerCoef * ageCoef * expCoef * regionCoef);
    setCalculatedPrice(total);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">АвтоСтрахование</span>
            </div>
            <div className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'about', label: 'О компании' },
                { id: 'services', label: 'Услуги' },
                { id: 'calculator', label: 'Калькулятор' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contacts', label: 'Контакты' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Защитите свой автомобиль с надёжным партнёром
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Профессиональное страхование автомобилей с 2005 года. Более 50 000 довольных клиентов по всей России.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => scrollToSection('calculator')} size="lg" className="text-lg px-8">
                  Рассчитать стоимость
                </Button>
                <Button onClick={() => scrollToSection('services')} variant="outline" size="lg" className="text-lg px-8">
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-primary/5 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: 'Users', value: '50 000+', label: 'Клиентов' },
                    { icon: 'Award', value: '18 лет', label: 'На рынке' },
                    { icon: 'Clock', value: '24/7', label: 'Поддержка' },
                    { icon: 'TrendingUp', value: '98%', label: 'Одобрений' }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <Icon name={stat.icon as any} className="mx-auto mb-2 text-primary" size={32} />
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">О компании</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ShieldCheck',
                title: 'Надёжность',
                text: 'Работаем с ведущими страховыми компаниями России. Гарантируем выплаты по всем случаям.'
              },
              {
                icon: 'Zap',
                title: 'Скорость',
                text: 'Оформление полиса за 15 минут. Моментальная отправка на email в электронном виде.'
              },
              {
                icon: 'Headphones',
                title: 'Поддержка',
                text: 'Персональный менеджер 24/7. Помощь в оформлении документов при ДТП.'
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 hover-scale">
                <Icon name={item.icon as any} className="text-primary mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'Car',
                title: 'ОСАГО',
                desc: 'Обязательное страхование автогражданской ответственности',
                price: 'от 5 000 ₽/год'
              },
              {
                icon: 'Shield',
                title: 'КАСКО',
                desc: 'Добровольное страхование автомобиля от угона и ущерба',
                price: 'от 35 000 ₽/год'
              },
              {
                icon: 'Umbrella',
                title: 'Зелёная карта',
                desc: 'Международное страхование для выезда за границу',
                price: 'от 2 500 ₽'
              },
              {
                icon: 'Users',
                title: 'Страхование пассажиров',
                desc: 'Защита водителя и пассажиров от несчастных случаев',
                price: 'от 1 500 ₽/год'
              }
            ].map((service, idx) => (
              <Card key={idx} className="p-6 hover-scale cursor-pointer transition-all hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon name={service.icon as any} className="text-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-600 mb-3">{service.desc}</p>
                    <div className="text-primary font-semibold">{service.price}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Калькулятор стоимости ОСАГО</h2>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="power">Мощность двигателя (л.с.)</Label>
                <Input
                  id="power"
                  type="number"
                  placeholder="150"
                  value={carPower}
                  onChange={(e) => setCarPower(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="age">Возраст автомобиля (лет)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="5"
                  value={carAge}
                  onChange={(e) => setCarAge(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="exp">Стаж вождения (лет)</Label>
                <Input
                  id="exp"
                  type="number"
                  placeholder="10"
                  value={driverExp}
                  onChange={(e) => setDriverExp(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="region">Регион регистрации</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите регион" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moscow">Москва</SelectItem>
                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                    <SelectItem value="regions">Другие регионы</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={calculateInsurance} size="lg" className="w-full text-lg">
              <Icon name="Calculator" className="mr-2" size={20} />
              Рассчитать стоимость
            </Button>

            {calculatedPrice !== null && (
              <div className="mt-8 p-6 bg-primary/5 rounded-lg animate-fade-in text-center">
                <div className="text-sm text-slate-600 mb-2">Стоимость полиса ОСАГО:</div>
                <div className="text-4xl font-bold text-primary mb-4">{calculatedPrice.toLocaleString()} ₽</div>
                <p className="text-sm text-slate-600 mb-4">в год</p>
                <Button size="lg">Оформить полис</Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: 'Как быстро можно оформить полис ОСАГО?',
                a: 'Оформление занимает 10-15 минут онлайн. Полис отправляется на email сразу после оплаты. Вы можете использовать его в электронном виде.'
              },
              {
                q: 'Что нужно для оформления страховки?',
                a: 'Паспорт владельца, СТС/ПТС автомобиля, водительское удостоверение. Все документы можно загрузить в электронном виде.'
              },
              {
                q: 'Можно ли оформить ОСАГО без техосмотра?',
                a: 'Для автомобилей младше 4 лет диагностическая карта не требуется. Для более старых авто нужна действующая карта техосмотра.'
              },
              {
                q: 'Как получить выплату при ДТП?',
                a: 'Вызовите ГИБДД, оформите документы о ДТП, обратитесь в страховую компанию. Наш менеджер поможет с каждым шагом 24/7.'
              },
              {
                q: 'Действует ли полис в других регионах?',
                a: 'Да, полис ОСАГО действует на всей территории России. Вы защищены в любом регионе страны.'
              }
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Контакты</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Icon name="Phone" className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-lg mb-2">Телефон</h3>
              <p className="text-slate-600">8 (800) 555-35-35</p>
              <p className="text-sm text-slate-500 mt-1">Звонок бесплатный</p>
            </Card>
            <Card className="p-6 text-center">
              <Icon name="Mail" className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-slate-600">info@avtostrahovanie.ru</p>
              <p className="text-sm text-slate-500 mt-1">Ответим за 15 минут</p>
            </Card>
            <Card className="p-6 text-center">
              <Icon name="MapPin" className="mx-auto mb-4 text-primary" size={40} />
              <h3 className="font-bold text-lg mb-2">Адрес</h3>
              <p className="text-slate-600">Москва, ул. Тверская, 15</p>
              <p className="text-sm text-slate-500 mt-1">Пн-Пт: 9:00-19:00</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Shield" size={28} />
                <span className="text-xl font-bold">АвтоСтрахование</span>
              </div>
              <p className="text-slate-400 text-sm">
                Надёжная защита вашего автомобиля с 2005 года
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>ОСАГО</li>
                <li>КАСКО</li>
                <li>Зелёная карта</li>
                <li>Страхование пассажиров</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>О нас</li>
                <li>Лицензии</li>
                <li>Партнёры</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>FAQ</li>
                <li>Контакты</li>
                <li>Документы</li>
                <li>Блог</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            © 2025 АвтоСтрахование. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}