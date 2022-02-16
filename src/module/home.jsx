import React, {useEffect,useState} from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead,
    MDBPagination, MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";
import { baseUrl } from '../shared/baseUrl';

const RESULTS = 11;
const PAGE_SIZE = 10;

export default function Home() {

    const [data, setData] = useState([]);
    const [formSearch, setFormSearch] = useState('');
    const [searchData, setSearchData] = useState('');
    const [genderData, setGenderData] = useState('');
    const [sortByData, setSortByData] = useState('');
    const [sortOrderData, setSortOrderData] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)

    useEffect( () => {
         fetchData()
    },[currentPage, genderData, searchData, sortByData, sortOrderData])

    const fetchData = async () => {

        let parameter = {
            page: currentPage,
            pageSize: PAGE_SIZE,
            results: RESULTS
        }

        if(genderData) parameter = {...parameter,gender: genderData}
        if(searchData) parameter = {...parameter,keyword: searchData}
        if(sortByData || sortOrderData) parameter = {...parameter,sortBy: sortByData, sortOrder: sortOrderData}

        await fetch(baseUrl+getParamUrl(parameter),{
            method: 'GET',
            credentials: "same-origin"
        })
        .then( (response) => response.json())
        .then( (res) => {
            setData(res.results)
            setTotalPage(Math.ceil(res.results.length/PAGE_SIZE))
        })
        .catch( (error) => alert('error kak ' + error))
    }

    const onChangeSort = (event) => {
        setSortByData(event.target.id)
        if(sortOrderData === 'descend') setSortOrderData('ascend')
        else setSortOrderData('descend')
    }

    const searchButton = () => {
        setSearchData(formSearch)
    }

    const resetFilter = () => {
        setSearchData('')
        setGenderData('')
        setSortByData('')
        setSortOrderData('')
        setFormSearch('')
        document.getElementById('selectGender').value = ''
    }

    const getParamUrl = (parameter) => {
        const copyParams = Object.assign({}, parameter)
        let requestParameter = '?'
        Object.keys(copyParams).forEach(key => {
            const currentParam = copyParams[key]
            requestParameter = `${requestParameter+key}=${currentParam}&`
        })

        return requestParameter.slice(0,-1)
    }

    return (
        <MDBContainer fluid>
            <h3 className="mt-5">Home Page</h3>
            <MDBCard>
                <MDBCardBody>
                    <MDBRow className="mb-4">
                        <MDBCol md="3">
                            <MDBInput id='search' label='Search' value={formSearch} onChange={e => setFormSearch(e.target.value)}/>
                            <MDBBtn tag='a' onClick={searchButton}>
                                <MDBIcon fas icon='search' />
                            </MDBBtn>
                        </MDBCol>
                        <MDBCol md="3">
                        <select id='selectGender' className="form-select" aria-label="Default select example" onChange={e => setGenderData(e.target.value)}>
                            <option hidden value=''>Gender</option>
                            <option value=''>All</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        </MDBCol>
                        <MDBCol md='6'>
                        <MDBBtn outline onClick={resetFilter}>Reset Filter</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBTable responsive hover className='mb-4'>
                                <MDBTableHead>
                                    <tr>
                                    <th scope='col'>Username</th>
                                    <th scope='col' id='name' onClick={onChangeSort}>Name <em className="fas fa-sort"></em></th>
                                    <th scope='col' id='email' onClick={onChangeSort}>Email <em className="fas fa-sort"></em></th>
                                    <th scope='col' id='gender' onClick={onChangeSort}>Gender <em className="fas fa-sort"></em></th>
                                    <th scope='col' id='registered' onClick={onChangeSort}>Registered Date <em className="fas fa-sort"></em></th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                {
                                    data.map( ({login,name,email,gender,registered}) => {
                                        return (
                                        <tr key={login.uuid}>
                                            <td>{login.username}</td>
                                            <td>{name.first + ' ' + name.last}</td>
                                            <td>{email}</td>
                                            <td>{gender}</td>
                                            <td>{new Date(registered.date).toISOString().split('T')[0]}</td>
                                        </tr>
                                        )
                                    })
                                }
                                </MDBTableBody>
                            </MDBTable>

                            <MDBPagination className='float-right'>
                                <MDBPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                                    <MDBPaginationLink href='#'>
                                        First
                                    </MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem active={currentPage === 1} onClick={() => setCurrentPage(1)}>
                                    <MDBPaginationLink href='#'>1</MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem active={currentPage === 2} onClick={() => setCurrentPage(2)}>
                                    <MDBPaginationLink href='#'>2</MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem disabled={currentPage === totalPage} onClick={() => setCurrentPage(totalPage)}>
                                    <MDBPaginationLink href='#'>Last</MDBPaginationLink>
                                </MDBPaginationItem>
                            </MDBPagination>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}