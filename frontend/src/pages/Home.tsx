import "@/test.css"
import logo from '@/assets/logo.png';

const Home = () => {
    return (
        <div className="App">
            <Header />
            <Hero />
            <Benefits />
            <Features />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
};

const Header = () => (
    <header className="header">
        <div className="container flex justify-center align-middle">
            <img width={120} src={logo} alt="open-erp-logo" className="invert" />
            <h1>Open ERP</h1>
            <nav>
                <ul>
                    <li><a href="#benefits">Benefícios</a></li>
                    <li><a href="#features">Funcionalidades</a></li>
                    <li><a href="#testimonials">Testemunhos</a></li>
                    <li><a href="#contact">Contato</a></li>
                </ul>
            </nav>
        </div>
    </header>
);

const Hero = () => (
    <section className="hero">
        <div className="container">
            <h2>Gestão Simplificada e Eficiente</h2>
            <p>Nosso ERP oferece todas as ferramentas que sua empresa precisa para crescer e prosperar.</p>
            <button>Saiba Mais</button>
        </div>
    </section>
);

const Benefits = () => (
    <section id="benefits" className="benefits">
        <div className="container">
            <h2>Benefícios</h2>
            <div className="benefit-cards">
                <div className="card">
                    <h3>Automatização de Processos</h3>
                    <p>Reduza o trabalho manual e aumente a produtividade.</p>
                </div>
                <div className="card">
                    <h3>Melhor Controle Financeiro</h3>
                    <p>Monitore receitas, despesas e fluxo de caixa com facilidade.</p>
                </div>
                <div className="card">
                    <h3>Relatórios Detalhados</h3>
                    <p>Tome decisões informadas com base em dados precisos.</p>
                </div>
            </div>
        </div>
    </section>
);

const Features = () => (
    <section id="features" className="features">
        <div className="container">
            <h2>Funcionalidades</h2>
            <ul>
                <li>Gestão de Estoque</li>
                <li>Faturamento e Notas Fiscais</li>
                <li>Controle de Vendas</li>
                <li>Contabilidade Integrada</li>
                <li>Relatórios Personalizáveis</li>
            </ul>
        </div>
    </section>
);

const Testimonials = () => (
    <section id="testimonials" className="testimonials">
        <div className="container">
            <h2>O que Nossos Clientes Dizem</h2>
            <div className="testimonial-cards">
                <div className="card">
                    <p>"Este ERP transformou a gestão da minha empresa. Recomendo!"</p>
                    <h4>- João Silva</h4>
                </div>
                <div className="card">
                    <p>"Ferramenta indispensável para qualquer pequena empresa."</p>
                    <h4>- Maria Oliveira</h4>
                </div>
            </div>
        </div>
    </section>
);

const Contact = () => (
    <section id="contact" className="contact">
        <div className="container">
            <h2>Entre em Contato</h2>
            <form>
                <input type="text" placeholder="Nome" />
                <input type="email" placeholder="Email" />
                <textarea placeholder="Mensagem"></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    </section>
);

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <p>&copy; 2025 Open-ERP. Todos os direitos reservados.</p>
        </div>
    </footer>
);

export default Home;
