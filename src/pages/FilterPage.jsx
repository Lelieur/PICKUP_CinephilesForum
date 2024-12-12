import { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';
import GeneralFilter from "../components/Filters/GeneralFilter/GeneralFilter";

const FilterPage = () => {
    const [showFilter, setShowFilter] = useState(false);

    // Toggle para mostrar u ocultar el filtro de búsqueda
    const toggleSearchFilter = () => setShowFilter(prevState => !prevState);

    const handleResultsFound = (results) => {
        // Aquí manejas los resultados que encuentras (en este caso, solo los logueamos)
        console.log(results);
        // Puedes agregar lógica aquí para manejar los resultados si lo deseas
    };

    return (
        <div className="FilterPage">
            <Nav className="d-flex align-items-center">
                {/* Botón para abrir el filtro de búsqueda */}
                <Button variant="light" onClick={toggleSearchFilter}>
                    <Search className="search-icon" size="20px" />
                </Button>
            </Nav>

            {/* Mostrar el filtro de búsqueda si `showFilter` es verdadero */}
            {showFilter && (
                <GeneralFilter
                    onResultsFound={handleResultsFound}
                    setShowFilter={setShowFilter} // Pasar la función para cerrar el modal desde GeneralFilter
                />
            )}
        </div>
    );
};

export default FilterPage;
