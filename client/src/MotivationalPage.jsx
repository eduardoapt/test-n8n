import React, { useState, useEffect } from 'react';
import './MotivationalPage.css';

const motivationalQuotes = [
  {
    text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    author: "Robert Collier"
  },
  {
    text: "A única maneira de fazer um grande trabalho é amar o que você faz.",
    author: "Steve Jobs"
  },
  {
    text: "O insucesso é apenas uma oportunidade para começar de novo, com mais inteligência.",
    author: "Henry Ford"
  },
  {
    text: "Não espere por oportunidades. Crie-as.",
    author: "George Bernard Shaw"
  },
  {
    text: "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "A persistência é o caminho do êxito.",
    author: "Charles Chaplin"
  },
  {
    text: "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
    author: "Albert Einstein"
  },
  {
    text: "Se você quer ser bem-sucedido, precisa respeitar uma regra: nunca desista.",
    author: "J.K. Rowling"
  }
];

function MotivationalPage({ username, onLogout }) {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento e seleciona uma frase aleatória
    const timer = setTimeout(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getNewQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    // Usa a função de logout passada como prop
    onLogout();
  };

  if (isLoading && !currentQuote) {
    return (
      <div className="motivational-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando inspiração...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="motivational-page">
      <div className="container">
        <header className="header">
          <div>
            <h1 className="title">Sua Dose de Inspiração Diária</h1>
            <p className="welcome">Bem-vindo(a), {username}!</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </header>

        <main className="main-content">
          <div className="quote-card">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                <div className="quote-text">
                  <blockquote>"{currentQuote.text}"</blockquote>
                </div>
                <div className="quote-author">
                  <cite>~ {currentQuote.author}</cite>
                </div>
              </>
            )}
          </div>

          <div className="actions">
            <button className="new-quote-btn" onClick={getNewQuote} disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Nova Frase'}
            </button>
          </div>

          <div className="motivation-section">
            <h2>Lembre-se hoje:</h2>
            <ul className="motivation-list">
              <li>Você é mais forte do que imagina</li>
              <li>Cada passo é um progresso</li>
              <li>O fracasso é apenas um degrau para o sucesso</li>
              <li>Sua atitude determina sua direção</li>
            </ul>
          </div>
        </main>

        <footer className="footer">
          <p>Continue evoluindo. Continue codando. Continue sendo incrível! </p>
        </footer>
      </div>
    </div>
  );
}

export default MotivationalPage;
