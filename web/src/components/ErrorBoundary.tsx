// import React, { ErrorInfo } from "react";

// interface ErrorBoundaryState {
//   hasError: boolean;
// }

// class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
//   constructor(props: React.PropsWithChildren<{}>) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   // Atualiza o estado para mostrar a UI de fallback após um erro ser lançado
//   static getDerivedStateFromError(error: Error) {
//     return { hasError: true };
//   }

//   // Log de informação sobre o erro (opcional)
//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.error("ErrorBoundary capturou um erro:", error, errorInfo);
//     // Poderás enviar para um serviço de logging, se quiseres
//   }

//   render() {
//     if (this.state.hasError) {
//       // UI de fallback, caso algum componente filho lance erro
//       return (
//         <div style={{ padding: "2rem" }}>
//           <h2>Ocorreu um erro inesperado</h2>
//           <p>Pedimos desculpas pelo transtorno. Por favor tente novamente mais tarde.</p>
//         </div>
//       );
//     }

//     // Se não há erro, renderiza normalmente os filhos
//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
