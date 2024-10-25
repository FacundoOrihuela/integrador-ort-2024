import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  // Configuración para archivos JavaScript
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",  // Cambiado a 'module' para permitir ES Modules
      globals: globals.node,  // Puedes mantener 'node' si lo necesitas
    },
  },
  // Reglas recomendadas de ESLint
  pluginJs.configs.recommended,
];
