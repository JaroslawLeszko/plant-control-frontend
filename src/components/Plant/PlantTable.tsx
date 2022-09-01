import React, {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import styled from "styled-components";
import {PlantEntity} from 'types';
import {PlantTableRow} from "./PlantTableRow";
import './PlantTable.css'

const Container = styled.div`
  
    & .pagination {
      list-style: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-inside: 5rem;
      font-size: 1.2rem;
      gap: 5px;
    }
  & .pagination .page-num {
    padding: 8px 15px;
    cursor: pointer;
    border-radius: 3px;
    font-weight: 400;
  }
  
  & .pagination .page-num:hover {
    background-color: #498460;
    color: white;
  }
  
  & .pagination .active {
    background-color: #498460;
  }
`
type Select = {
    selected: number;
}
interface Props {
    plants: PlantEntity[];
    onPlantsChange: () => void;
}

export const PlantTable = (props: Props) => {
    const [currentItems, setCurrentItems] = useState<PlantEntity[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(props.plants.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(props.plants.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);


    const handlePageClick = (event: Select) => {
        const newOffset = (event.selected * itemsPerPage) % props.plants.length;
        setItemOffset(newOffset);
    };
    return (
        <Container>
            <table className="plant-table">
                <tbody>
                {
                    currentItems.map(plant =>
                        <PlantTableRow
                            plant={plant} key={plant.id}
                            onPlantsChange={props.onPlantsChange}
                        />
                    )
                }
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </Container>

)
}