import React, {useEffect, useMemo, useState} from "react";
import ReactPaginate from 'react-paginate';
import {PlantEntity} from 'types';
import {PlantTableRow} from "./PlantTableRow";
import './PlantTable.css'


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

    useMemo(() => {
        window.scrollTo({top: 0})
    }, [currentItems])


    const handlePageClick = (event: Select) => {
        const newOffset = (event.selected * itemsPerPage) % props.plants.length;
        setItemOffset(newOffset);
    };
    return (
    <>
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
    </>
    )
}