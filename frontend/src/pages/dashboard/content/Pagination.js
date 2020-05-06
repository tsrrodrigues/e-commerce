import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Pagination (props) {
    const [currentPage, setCurrentPage] = useState(props.currentPage)
    const [maxPages, setMaxPages] = useState(props.maxPages)

    const [pages, setPages] = useState([])

    useEffect(() => {
        setCurrentPage(props.currentPage)
        setMaxPages(props.maxPages)

        setPages([])

        for (let i = 0; i < maxPages; i++) {
            setPages(prevPages => [...prevPages, `${i+1}`])
        }

    }, [props.currentPage, props.maxPages, maxPages]);

    return (
        <div className="card-pagination">
            <nav aria-label="Paginação">
                <ul className="pagination">
                    <li className="page-item">
                        {currentPage > 1 &&
                            <Link className="page-link" to={`?page=${parseInt(currentPage) - 1}`} aria-label="Anterior">
                                <span aria-hidden="true">«</span>
                                <span className="sr-only">Anterior</span>
                            </Link>
                        }
                    </li>

                    {pages.map((page, key) => (
                        <li key={key} className={currentPage === page ? "page-item active" : "page-item"}>
                            <Link className="page-link" to={`?page=${page}`}>{page}</Link>
                        </li>
                    ))}

                    <li className="page-item">
                        {currentPage < maxPages &&
                            <Link className="page-link" to={`?page=${parseInt(currentPage) + 1}`} aria-label="Próxima">
                                <span aria-hidden="true">»</span>
                                <span className="sr-only">Próxima</span>
                            </Link>
                        }
                    </li>
                </ul>
            </nav>
        </div>      
    )
}