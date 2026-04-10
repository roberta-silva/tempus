import React from 'react';

const Relogio = () => {
  const [data, setData] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => {
      setData(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const dataFormatada = data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section>
      <h1>Relógio</h1>
      <span className="texto-principal">
        {data.toLocaleTimeString('pt-BR')}
      </span>
      <p className="texto-secundario">{dataFormatada}</p>
    </section>
  );
};

export default Relogio;
