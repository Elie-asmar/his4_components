import { isEqual } from 'lodash';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Column, Table } from 'react-virtualized';
import { useStateWithCallback } from '../../../CustomHooks/useStateWithCallback';
import { customTableSearch } from '../../../utils/functions';


export default function VirtualTable({
    data = [], id,
    classname, width, height,
    headerHeight, rowHeight, gridClassName,
    rowClassName = null, columns, enableSearch, ...props }) {

    const STATE = useRef({
        filterText: '',
        dataArrayFiltered: [],
        dataArray: []
    })

    const [state, setState] = useStateWithCallback(STATE.current );

    useEffect(() => {
        if (document.getElementsByClassName(gridClassName)[0])
            document.getElementsByClassName(gridClassName)[0].addEventListener("scroll", onScroll, { passive: true });
        return () => {
            if (document.getElementsByClassName("ReactVirtualized__Grid")[0])
                document.getElementsByClassName("ReactVirtualized__Grid")[0].removeEventListener("scroll", onScroll);
        }
    }, []);



    useEffect(() => {
        setState(prv => {
            return {
                ...prv,
                dataArray: data,
                dataArrayFiltered: data
            }
        }, (nextState, SetNextState) => {
      
            customsearch(nextState.filterText)


        });
    }, [columns, data])

    const onScroll = useCallback(({ }) => {
        let ReactVirtualizedGrid = document.getElementsByClassName(gridClassName)
        let ReactVirtualizedTable = document.getElementById(id)
        ReactVirtualizedTable.scrollLeft = ReactVirtualizedGrid[0].scrollLeft
    }, []);

    const cols = useRef([]);
    useLayoutEffect(() => {
        cols.current = columns?.map((v, i) => { return { ...v, key: i } })
    }, columns)

    const colorRows = useCallback(({ index }) => {
        if (index < 0) {
            return null;
        } else {
            return index % 2 === 0 ? "odd" : null;
        }
    }, []);

    const customsearch = useCallback((value) => {
        setState(prv => {
            return {
                ...prv,
                filterText: value,
                dataArrayFiltered: customTableSearch(value, prv.dataArray)
            }
        },
            (nextState, setNextState) => {
                // if (triggerPaging && !isTriggeredOnStateChange) {

                //     let mappedFiltration = nextState.OriginalFilter.map(e => {
                //         return {
                //             ...e,
                //             isSelected:
                //                 nextState.selectedFilterOptions.findIndex(e1 => e.columnName === e1.value) > -1
                //         }
                //     }).filter(e => e.isSelected);

                //     let searchOptions = extractSearchOptionsFromState(nextState);

                //     triggerPaging(value.toLowerCase(), mappedFiltration, searchOptions);
                // }
            })

    }, [])

    const handleFilterTextChange = useCallback((event) => {

        customsearch(event.target.value);

    }, [])


    return (
        <>
            {enableSearch ?
                <>
                    <div className={`${state.dataArrayFiltered?.length > 0 ? "col-12 offset-lg-8 col-lg-4" : "offset-lg-8 col-lg-4"}`}>
                        <input  type="text" className="form-control form-control-sm mb-2 " value={state.filterText}
                            onChange={handleFilterTextChange} placeholder="Search ..." />
                    </div>
                </>
                :
                null
            }
            <Table
                id={id}
                gridClassName={gridClassName}
                className={classname}
                width={width}
                height={height}
                headerHeight={headerHeight}
                rowHeight={rowHeight}
                rowCount={state.dataArrayFiltered.length}
                rowGetter={({ index }) => state.dataArrayFiltered[index]}
                rowClassName={rowClassName ? rowClassName : colorRows}

            // gridStyle={{
            // }}
            // containerStyle={{
            // }}
            // style={{
            // }}
            >
                {cols.current.length > 0 ? cols.current : null}
            </Table>
        </>
    )

}

// function onScroll() {
//     let ReactVirtualizedGrid = document.getElementsByClassName(props.gridClassName)
//     let ReactVirtualizedTable = document.getElementById(props.id)
//     ReactVirtualizedTable[0].scrollLeft = ReactVirtualizedGrid[0].scrollLeft
// }
