import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [carPower, setCarPower] = useState('');
  const [carAge, setCarAge] = useState('');
  const [driverExp, setDriverExp] = useState('');
  const [region, setRegion] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', phone: '', email: '', message: '' });
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
            <Button onClick={() => scrollToSection('contacts')} className="hidden md:block">
              Связаться
            </Button>
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
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToSection('calculator')} size="lg" className="text-lg px-8">
                  Рассчитать стоимость
                </Button>
                <Button onClick={() => scrollToSection('services')} variant="outline" size="lg" className="text-lg px-8">
                  Узнать больше
                </Button>
              </div>
              <div className="flex gap-6 mt-8">
                <div className="flex items-center gap-2 text-slate-600">
                  <Icon name="CheckCircle2" className="text-primary" size={20} />
                  <span className="text-sm">Онлайн оформление</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Icon name="CheckCircle2" className="text-primary" size={20} />
                  <span className="text-sm">Гарантия выплат</span>
                </div>
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
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ShieldCheck',
                title: 'Надёжность',
                text: 'Работаем с ведущими страховыми компаниями России. Гарантируем выплаты по всем страховым случаям.'
              },
              {
                icon: 'Zap',
                title: 'Скорость',
                text: 'Оформление полиса за 15 минут. Моментальная отправка на email в электронном виде.'
              },
              {
                icon: 'Headphones',
                title: 'Поддержка',
                text: 'Персональный менеджер 24/7. Помощь в оформлении документов при ДТП и консультации.'
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
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Наши услуги</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Полный спектр страховых услуг для вашего автомобиля
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'Car',
                title: 'ОСАГО',
                desc: 'Обязательное страхование автогражданской ответственности. Защита от финансовых потерь при ДТП.',
                price: 'от 5 000 ₽/год',
                features: ['Электронный полис', 'Оформление за 15 минут', 'Действует по всей России']
              },
              {
                icon: 'Shield',
                title: 'КАСКО',
                desc: 'Добровольное страхование автомобиля от угона и ущерба. Полная защита вашего авто.',
                price: 'от 35 000 ₽/год',
                features: ['Защита от угона', 'Возмещение ущерба', 'Помощь на дороге']
              },
              {
                icon: 'Umbrella',
                title: 'Зелёная карта',
                desc: 'Международное страхование для выезда за границу. Путешествуйте без ограничений.',
                price: 'от 2 500 ₽',
                features: ['Действует в 48 странах', 'Оформление онлайн', 'Срок от 15 дней']
              },
              {
                icon: 'Users',
                title: 'Страхование пассажиров',
                desc: 'Защита водителя и пассажиров от несчастных случаев. Забота о тех, кто рядом.',
                price: 'от 1 500 ₽/год',
                features: ['До 5 пассажиров', 'Выплаты до 2 млн ₽', 'Круглосуточная поддержка']
              }
            ].map((service, idx) => (
              <Card key={idx} className="p-6 hover-scale cursor-pointer transition-all hover:shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon name={service.icon as any} className="text-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-600 mb-3">{service.desc}</p>
                    <div className="text-primary font-semibold text-lg mb-3">{service.price}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-600">
                      <Icon name="Check" className="text-primary" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Калькулятор стоимости ОСАГО</h2>
          <p className="text-center text-slate-600 mb-12">
            Рассчитайте стоимость полиса за 30 секунд
          </p>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="power">Мощность двигателя (л.с.)</Label>
                <Input
                  id="power"
                  type="number"
                  placeholder="Например: 150"
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
                  placeholder="Например: 5"
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
                  placeholder="Например: 10"
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
                <div className="text-5xl font-bold text-primary mb-2">{calculatedPrice.toLocaleString()} ₽</div>
                <p className="text-sm text-slate-600 mb-6">в год</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" onClick={() => scrollToSection('contacts')}>
                    <Icon name="FileText" className="mr-2" size={20} />
                    Оформить полис
                  </Button>
                  <Button size="lg" variant="outline">
                    <Icon name="Download" className="mr-2" size={20} />
                    Скачать расчёт
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Часто задаваемые вопросы</h2>
          <p className="text-center text-slate-600 mb-12">
            Ответы на популярные вопросы о страховании
          </p>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: 'Как быстро можно оформить полис ОСАГО?',
                a: 'Оформление занимает всего 10-15 минут онлайн. После заполнения анкеты и оплаты, полис автоматически отправляется на ваш email. Вы можете сразу использовать электронную версию полиса — она имеет полную юридическую силу.'
              },
              {
                q: 'Что нужно для оформления страховки?',
                a: 'Для оформления потребуются: паспорт владельца транспортного средства, свидетельство о регистрации ТС (СТС) или паспорт транспортного средства (ПТС), водительское удостоверение. Все документы можно загрузить в электронном виде (фото или скан).'
              },
              {
                q: 'Можно ли оформить ОСАГО без техосмотра?',
                a: 'Для новых автомобилей младше 4 лет диагностическая карта техосмотра не требуется. Для автомобилей старше 4 лет необходима действующая карта техосмотра. Мы поможем найти ближайший пункт техосмотра в вашем городе.'
              },
              {
                q: 'Как получить выплату при ДТП?',
                a: 'При ДТП вызовите ГИБДД и оформите документы о происшествии. Затем обратитесь в страховую компанию виновника (прямое возмещение убытков) или в свою страховую. Наш персональный менеджер проконсультирует вас на каждом этапе и поможет собрать необходимые документы. Поддержка работает 24/7.'
              },
              {
                q: 'Действует ли полис в других регионах России?',
                a: 'Да, полис ОСАГО действует на всей территории Российской Федерации без ограничений. Вы можете свободно путешествовать и быть защищены в любом регионе страны. При необходимости наши специалисты окажут поддержку удалённо.'
              },
              {
                q: 'Можно ли вписать в полис несколько водителей?',
                a: 'Да, вы можете оформить полис с ограниченным количеством водителей (вписав конкретных людей) или без ограничений (любой водитель с правами может управлять автомобилем). Полис без ограничений обойдётся дороже, но удобнее, если машиной пользуются разные люди.'
              }
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Отзывы наших клиентов</h2>
          <p className="text-center text-slate-600 mb-12">
            Более 50 000 водителей доверяют нам защиту своих автомобилей
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Александр Петров',
                city: 'Москва',
                date: '15 октября 2024',
                rating: 5,
                text: 'Оформил ОСАГО за 10 минут, не выходя из дома. Полис пришёл на email сразу после оплаты. Очень удобно и быстро! Рекомендую всем, кто ценит своё время.',
                service: 'ОСАГО'
              },
              {
                name: 'Мария Соколова',
                city: 'Санкт-Петербург',
                date: '8 октября 2024',
                rating: 5,
                text: 'Попала в ДТП, и менеджер помог собрать все документы для страховой. Поддержка работает действительно 24/7. Выплату получила через 2 недели без проблем.',
                service: 'КАСКО'
              },
              {
                name: 'Дмитрий Волков',
                city: 'Казань',
                date: '2 октября 2024',
                rating: 5,
                text: 'Сравнивал цены на КАСКО в разных компаниях — здесь оказалось выгоднее всех. Калькулятор на сайте показал точную стоимость, никаких скрытых платежей.',
                service: 'КАСКО'
              },
              {
                name: 'Елена Новикова',
                city: 'Екатеринбург',
                date: '28 сентября 2024',
                rating: 5,
                text: 'Оформляла зелёную карту для поездки в Европу. Всё объяснили, помогли выбрать нужный срок действия. Получила полис через 5 минут на почту.',
                service: 'Зелёная карта'
              },
              {
                name: 'Игорь Смирнов',
                city: 'Нижний Новгород',
                date: '20 сентября 2024',
                rating: 5,
                text: 'Уже третий год продлеваю ОСАГО через этот сервис. Всегда быстро, удобно и без лишних вопросов. Менеджер даже напомнил о сроке окончания полиса.',
                service: 'ОСАГО'
              },
              {
                name: 'Ольга Федорова',
                city: 'Ростов-на-Дону',
                date: '12 сентября 2024',
                rating: 5,
                text: 'Очень довольна сервисом! Оформила страхование пассажиров для всей семьи. Цены адекватные, менеджер всё подробно рассказал и помог с выбором.',
                service: 'Страхование пассажиров'
              }
            ].map((review, idx) => (
              <Card key={idx} className="p-6 hover-scale">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-500">{review.city}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-yellow-400 fill-yellow-400" size={16} />
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-600 mb-4 leading-relaxed">{review.text}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-primary font-medium">{review.service}</span>
                  <span className="text-xs text-slate-400">{review.date}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 p-6 bg-primary/5 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">4.9</div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>
                <p className="text-sm text-slate-600">Средняя оценка</p>
              </div>
              <div className="h-16 w-px bg-slate-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">2 847</div>
                <p className="text-sm text-slate-600">Отзывов на Яндекс.Картах</p>
              </div>
              <div className="h-16 w-px bg-slate-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">98%</div>
                <p className="text-sm text-slate-600">Рекомендуют друзьям</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-slate-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Свяжитесь с нами</h2>
          <p className="text-center text-slate-600 mb-12">
            Мы всегда на связи и готовы помочь
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Контактная информация</h3>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="Phone" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Телефон</h4>
                      <p className="text-slate-600 text-lg">8 (800) 555-35-35</p>
                      <p className="text-sm text-slate-500 mt-1">Звонок бесплатный, работаем 24/7</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="Mail" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email</h4>
                      <p className="text-slate-600">info@avtostrahovanie.ru</p>
                      <p className="text-sm text-slate-500 mt-1">Ответим в течение 15 минут</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="MapPin" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Офис</h4>
                      <p className="text-slate-600">г. Москва, ул. Тверская, д. 15</p>
                      <p className="text-sm text-slate-500 mt-1">Пн-Пт: 9:00-19:00, Сб: 10:00-16:00</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Оставьте заявку</h3>
              <Card className="p-6">
                {formSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle2" className="text-green-600" size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Заявка отправлена!</h4>
                    <p className="text-slate-600">Наш менеджер свяжется с вами в ближайшее время</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Ваше имя *</Label>
                      <Input
                        id="name"
                        required
                        placeholder="Иван Иванов"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+7 (999) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@mail.ru"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea
                        id="message"
                        placeholder="Расскажите, какой полис вас интересует..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      <Icon name="Send" className="mr-2" size={20} />
                      Отправить заявку
                    </Button>
                    <p className="text-xs text-slate-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                    </p>
                  </form>
                )}
              </Card>
            </div>
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
              <p className="text-slate-400 text-sm mb-4">
                Надёжная защита вашего автомобиля с 2005 года
              </p>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Icon name="Send" size={20} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Icon name="MessageCircle" size={20} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Icon name="Mail" size={20} />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">ОСАГО</li>
                <li className="hover:text-white transition-colors cursor-pointer">КАСКО</li>
                <li className="hover:text-white transition-colors cursor-pointer">Зелёная карта</li>
                <li className="hover:text-white transition-colors cursor-pointer">Страхование пассажиров</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">О нас</li>
                <li className="hover:text-white transition-colors cursor-pointer">Лицензии</li>
                <li className="hover:text-white transition-colors cursor-pointer">Партнёры</li>
                <li className="hover:text-white transition-colors cursor-pointer">Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
                <li className="hover:text-white transition-colors cursor-pointer">Контакты</li>
                <li className="hover:text-white transition-colors cursor-pointer">Документы</li>
                <li className="hover:text-white transition-colors cursor-pointer">Блог</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              © 2025 АвтоСтрахование. Все права защищены.
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <span className="hover:text-white transition-colors cursor-pointer">Политика конфиденциальности</span>
              <span className="hover:text-white transition-colors cursor-pointer">Условия использования</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}