import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './VrArchivingBoard.css';
import test from './images/test.jpg'; 


import { ReactComponent as PersonFill } from 'bootstrap-icons/icons/person-fill.svg';
import { ReactComponent as CalendarCheck } from 'bootstrap-icons/icons/calendar-check.svg';


function VrArchivingBoard() {
	
	const [selectedYear, setSelectedYear] = useState('전체');
    const [vrList, setVrList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        currentPage: 1,
        totalPages: 1,
        prev: true,
        next: true,
        startPage: 1,
        endPage: 1,
    });

    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('pageNum') || '1', 10);

    const fetchPageData = (pageNum) => {
			fetch(`http://localhost:8080/vr?pageNum=${pageNum}&_=${new Date().getTime()}`)
            .then(response => response.json())
            .then(data => {
		    setVrList(data.list);
		    setPageInfo({
		        currentPage: pageNum,
		        totalPages: Math.ceil(data.total / data.page.cv.amount),
		        prev: data.page.prev,
		        next: data.page.next,
		        startPage: data.page.startPage,
		        endPage: data.page.endPage,
		    })              
                navigate(`?pageNum=${pageNum}&amount=9`);
            })
            .catch(error => console.error('Error fetching VR list:', error));
    };
    
    /**/
    const handleYearChange = (year) => {
		setSelectedYear(year);
			
		switch(year){
			case '전체' : console.log("전체"); break;
			case '2024' : console.log("2024"); break;
			case '2025' : console.log("2025"); break;
			case '2026' : console.log("2026"); break;
		}
	};
  
   useEffect(() => {
	const currentPage = parseInt(new URLSearchParams(location.search).get('pageNum') || '1', 10);
	    fetchPageData(currentPage);
	}, [location.search]);


        return (		
			
        <div className="vrArchivingBoard-wrap">
        
            <div className="board-header">
   				<img src={test} alt="광화문이미지" />
            </div>
        
            <div className="year-selector">
                <button className="year-button" onClick={() => handleYearChange('전체')}>전체</button>
				<button className="year-button" onClick={() => handleYearChange('2024')}>2024</button>
				<button className="year-button" onClick={() => handleYearChange('2025')}>2025</button>
				<button className="year-button" onClick={() => handleYearChange('2026')}>2026</button>
            </div>
            <div className="center-wrap">
                <div className="card-wrap">
                    {vrList.map(item => (
                        <div key={item.boardNo} className="card">
                            <img className="card-image" src={`http://localhost:8080/images/${item.boardFile}`} alt={`${item.boardTitle} 이미지`} />
                            
                            <div className="card-hover-info">
                            	<div><PersonFill /> 작성자</div>
                            	<div><CalendarCheck /> {new Date(item.regDate).toLocaleDateString()}</div>
                        </div>
                            
                            
                            <div className="card-body">
                                <h3 className="card-year">{item.boardWriteYear}</h3>
                                <h2 className="card-title">{item.boardTitle}</h2>
                                <p className="card-text">{item.boardContent}</p>
                                <button className="card-button">더 보기</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pagination">
			    {pageInfo.prev && (
			        <button onClick={() => fetchPageData(pageInfo.currentPage - 1)}>이전</button>
			    )}
			    {Array.from({ length: (pageInfo.endPage - pageInfo.startPage + 1) }, (_, i) => pageInfo.startPage + i).map(num => (
			        <button key={num} className={pageInfo.currentPage === num ? "active" : ""} onClick={() => fetchPageData(num)}>
    			{num}
				</button>

			    ))}
			    {pageInfo.next && (
			        <button onClick={() => fetchPageData(pageInfo.currentPage + 1)}>다음</button>
			    )}
			</div>
        </div>
    );
}
export default VrArchivingBoard;
