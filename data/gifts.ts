import { Gift } from "../models/gift";

export const gifts: Gift[] = [
  {
    id: "lua-de-mel",
    name: "Lua de mel",
    description: "Ajude a tornar nossa viagem ainda mais especial.",
    totalValue: 500,
    quotaValue: 100,
    totalQuotas: 5,
    paidQuotas: 2,
  },
  {
    id: "jogo-de-panelas",
    name: "Jogo de panelas",
    description: "Um presente para começarmos nossa casa com carinho.",
    totalValue: 300,
    quotaValue: 100,
    totalQuotas: 3,
    paidQuotas: 1,
  },
  {
    id: "sofa-novo",
    name: "Sofá novo",
    description: "Para montarmos nosso cantinho com conforto.",
    totalValue: 1000,
    quotaValue: 100,
    totalQuotas: 10,
    paidQuotas: 4,
  },
  {
    id: "air-fryer",
    name: "Air Fryer",
    description: "Um item prático para nossa nova rotina.",
    totalValue: 400,
    quotaValue: 100,
    totalQuotas: 4,
    paidQuotas: 0,
  },
];