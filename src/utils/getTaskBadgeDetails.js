export const getTaskBadgeDetails = (label) => {
  switch (label) {
    case "en_progreso":
      return { color: "blue", label: "En Progreso" };

    case "completada":
      return { color: "green", label: "Completada" };

    case "fallida":
      return { color: "red", label: "Fallida" };

    default:
      return { color: "gray", label: "Sin Datos" };
      break;
  }
};
