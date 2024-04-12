package com.green.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.green.VO.BoardVO;
import com.green.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long>{
	
	@Query("select b from Board b left join b.section s where s.sectionNo =:sectionNo")
	Page<Board> getBoardPage(@Param("sectionNo") int sectionNo, Pageable pageable);
	
    @Query("select b from Board b where function('YEAR', b.regDate) = :year and b.section.sectionNo = 2")
    Page<Board> findByYear(@Param("year") int year, Pageable pageable);
    
    @Query("select count(b) from Board b where function('YEAR', b.regDate) = :year and b.section.sectionNo = 2")
    long countByYear(@Param("year") int year);
	

	
}