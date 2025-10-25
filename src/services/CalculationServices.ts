import { prisma } from "../plugins/prisma";

interface SimulationData {
  initial_contribution: number;
  monthly_contribution: number;
  monthly_rate: number;
  months_to_reach_goal: number;
  total: number;
}

export async function createSimulationService(userId: number, data: SimulationData) {
  const simulation = await prisma.calculation.create({
    data: {
      user_id: userId,
      initial_contribution: data.initial_contribution,
      monthly_contribution: data.monthly_contribution,
      monthly_rate: data.monthly_rate,
      months_to_reach_goal: data.months_to_reach_goal
    },
  });

  return simulation;
}

export async function getUserSimulationsService(userId: number) {
  const simulations = await prisma.calculation.findMany({
    where: { user_id: userId },
    orderBy: { calculation_date: "desc" },
  });

  return simulations;
}

export async function deleteSimulationService(id: number, userId: number) {
  const sim = await prisma.calculation.findFirst({
    where: { id, user_id: userId },
  });

  if (!sim) {
    throw new Error("Simulação não encontrada");
  }

  await prisma.calculation.delete({ where: { id } });

  return { detail: "Simulação excluída com sucesso" };
}