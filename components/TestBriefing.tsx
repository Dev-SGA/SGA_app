"use client";

import Link from "next/link";
import type { TacticalTest } from "@/lib/tests";

type TestBriefingProps = {
  test: TacticalTest;
  onStart: () => void;
};

export function TestBriefing({ test, onStart }: TestBriefingProps) {
  return (
    <div className="test-brief">
      <p className="test-brief__eyebrow">Antes de começar</p>
      <h1 className="test-brief__title">{test.title}</h1>
      <p className="test-brief__meta">
        {test.questions.length} situações · ~{test.durationMinutes} minutos · {test.phase}
      </p>

      <div className="card test-brief__rules">
        <ul className="test-brief__list" role="list">
          <li>
            <span className="test-brief__icon test-brief__icon--warn" aria-hidden="true">
              !
            </span>
            <div>
              <strong>Leia o cenário com calma</strong>
              <span>Cada pergunta simula um momento de jogo. Vídeos e diagramas serão adicionados em breve.</span>
            </div>
          </li>
          <li>
            <span className="test-brief__icon test-brief__icon--warn" aria-hidden="true">
              !
            </span>
            <div>
              <strong>Evite sair no meio</strong>
              <span>Fechar a aba pode fazer você perder o progresso desta tentativa.</span>
            </div>
          </li>
          <li>
            <span className="test-brief__icon test-brief__icon--ok" aria-hidden="true">
              ~
            </span>
            <div>
              <strong>Reserve {test.durationMinutes} minutos</strong>
              <span>Ao final, você vê nota, perfil tático e produtos SGA recomendados.</span>
            </div>
          </li>
        </ul>
      </div>

      <button type="button" className="btn btn--primary btn--lg btn--block" onClick={onStart}>
        Estou pronto — iniciar teste
      </button>
      <Link href="/" className="test-brief__back landing-text-link">
        ← Voltar
      </Link>
    </div>
  );
}
