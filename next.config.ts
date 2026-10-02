import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/resultado", destination: "/result", permanent: true },
      { source: "/tests/leitura-posse", destination: "/tests/possession-reading", permanent: true },
      {
        source: "/tests/transicao-defesa-ataque",
        destination: "/tests/defense-to-attack-transition",
        permanent: true,
      },
      { source: "/tests/bloco-defensivo", destination: "/tests/defensive-block", permanent: true },
      {
        source: "/tests/finalizacao-ultimo-passe",
        destination: "/tests/final-third",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
