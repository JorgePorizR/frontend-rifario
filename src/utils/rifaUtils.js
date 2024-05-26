export const getEstadoForDisplay = (estado) => {

    switch (estado) {
        case 0:
            return 'Pendiente';
        case 1:
            return 'Sorteada';
        default:
            return 'No definido';
    }
}