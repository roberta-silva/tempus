import React from 'react';

const Cronometro = () => {
  const [tempo, setTempo] = React.useState(0);
  const [rodando, setRodando] = React.useState(false);

  React.useEffect(() => {
    if (!rodando) return;

    const id = setInterval(() => {
      setTempo((prev) => prev + 10);
    }, 10);

    return () => clearInterval(id);
  }, [rodando]);

  function handleStart() {
    setRodando(true);
  }

  function handlePause() {
    setRodando(false);
  }

  function handleReset() {
    setRodando(false);
    setTempo(0);
  }

  function formatarTempo(tempo) {
    const ms = String(tempo % 1000).padStart(3, '0');
    const totalSec = Math.floor(tempo / 1000);

    const s = String(totalSec % 60).padStart(2, '0');
    const m = String(Math.floor(totalSec / 60) % 60).padStart(2, '0');
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');

    return `${h}:${m}:${s}.${ms}`;
  }

  return (
    <section>
      <h1>Cronômetro</h1>
      <p className="texto-principal">{formatarTempo(tempo)}</p>
      <div className="opcoes">
        <button className="btn" onClick={handleStart} disabled={rodando}>
          Iniciar
        </button>
        <button className="btn" onClick={handlePause} disabled={!rodando}>
          Pausar
        </button>
        <button className="btn" onClick={handleReset}>
          Resetar
        </button>
      </div>
    </section>
  );
};

export default Cronometro;
