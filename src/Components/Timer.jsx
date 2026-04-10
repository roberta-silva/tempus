import React from 'react';
import styles from './Timer.module.css';

const Timer = () => {
  const [hora, setHora] = React.useState('');
  const [min, setMin] = React.useState('');
  const [seg, setSeg] = React.useState('');

  const [tempoRestante, setTempoRestante] = React.useState(0);
  const [rodando, setRodando] = React.useState(false);
  const [finalizado, setFinalizado] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const total = Number(hora) * 3600 + Number(min) * 60 + Number(seg);
    if (total <= 0) return;

    setTempoRestante(total);
    setRodando(true);
  }

  function handleReset() {
    setRodando(false);
    setTempoRestante(0);
    setHora('');
    setMin('');
    setSeg('');
  }

  function tocarSom() {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    setFinalizado(true);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 880;
    gainNode.gain.setValueAtTime(1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.8);
  }

  React.useEffect(() => {
    if (!rodando) return;

    const id = setInterval(() => {
      setTempoRestante((valorAnterior) => {
        if (valorAnterior <= 1) {
          clearInterval(id);
          tocarSom();
          return 0;
        }
        return valorAnterior - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [rodando]);

  function formatTime() {
    const h = String(Math.floor(tempoRestante / 3600)).padStart(2, '0');
    const m = String(Math.floor((tempoRestante % 3600) / 60)).padStart(2, '0');
    const s = String(tempoRestante % 60).padStart(2, '0');

    return `${h}:${m}:${s}`;
  }

  return (
    <section>
      <h1>Timer</h1>
      {!rodando && tempoRestante === 0 && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <p>
            <label className="texto-secundario" htmlFor="hora">
              hora
            </label>
            <input
              type="number"
              name="hora"
              id="hora"
              value={hora}
              onChange={({ target }) => setHora(target.value)}
            />
          </p>
          <p>
            <label className="texto-secundario" htmlFor="minuto">
              min
            </label>
            <input
              type="number"
              name="minuto"
              id="minuto"
              value={min}
              onChange={({ target }) => setMin(target.value)}
            />
          </p>
          <p>
            <label className="texto-secundario" htmlFor="segundo">
              seg
            </label>
            <input
              type="number"
              name="segundo"
              id="segundo"
              value={seg}
              onChange={({ target }) => setSeg(target.value)}
            />
          </p>
          <button className="btn">INICIAR</button>
        </form>
      )}
      {(rodando || tempoRestante > 0) && (
        <>
          <p className="texto-principal">{formatTime()}</p>
          {finalizado ? (
            <p className="texto-secundario">⏰ Tempo esgotado!</p>
          ) : (
            <p className="texto-secundario">TEMPO RESTANTE</p>
          )}
          <div className="opcoes">
            <button className="btn" onClick={() => setRodando(!rodando)}>
              {rodando ? 'Pausar' : 'Continuar'}
            </button>
            <button className="btn" onClick={handleReset}>
              Resetar
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Timer;
