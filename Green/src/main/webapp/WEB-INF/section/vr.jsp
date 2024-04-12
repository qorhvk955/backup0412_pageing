<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>VR 아카이빙</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>
<body>
	<h3>VR 아카이빙</h3>
	<hr>
	<button>전체</button>
	<button>2024</button>
	<button>2025</button>
	<button>2026</button>
	<div>
	<table border=1>
		<tr>
			<td>게시글 번호</td>
			<td>제목</td>
			<td>내용</td>
			<td>작성 년도</td>
			<td>등록 날짜</td>
			<td>수정 날짜</td>
			<td>파일</td>
		</tr>
		<c:forEach items="${list}" var="board">
			<tr>
				<td>${board.boardNo}</td>
				<td>${board.boardTitle}</td>
				<td>${board.boardContent}</td>
				<td>${board.boardWriteYear}</td>
				<td>${board.regDate}</td>
				<td>${board.modDate}</td>
		        <td>
    				<img src="/images/${board.boardFile}" alt="Image" height="100" width="100">
    			</td>
			</tr>
		</c:forEach>
	</table>
	</div>
		<form action="" id="actionForm" method="get">
			<input type="hidden" name="pageNum" value="${page.cv.pageNum}">
			<input type="hidden" name="amount" value="${page.cv.amount}">
		</form>
	<div>
		<c:if test="${page.prev}">
			<a class="pageBtn" href="${page.startPage-1}"> [prev] </a>
		</c:if>
		<c:forEach var="num" begin="${page.startPage}" end="${page.endPage}" step="1">
			<a class="pageBtn" href="${num}">${num}</a>
		</c:forEach>
		<c:if test="${page.next}">
			<a class="pageBtn" href="${page.endPage+1}"> [next] </a>
		</c:if>
	</div>
	<script type="text/javascript">
	    $(document).ready(function() {
	    	
			let actionForm = $('#actionForm');
			
			$('.pageBtn').on("click", function(e){
				e.preventDefault();
				actionForm.find("input[name='pageNum']").val($(this).attr("href"));
				actionForm.submit();
			})
	        // 년도 선택 버튼 이벤트 핸들러
	        $('button').click(function() {
	            var year = $(this).text(); // 버튼의 텍스트로부터 연도를 가져옴
	            // pageNum을 1로 설정하고, 선택된 년도를 쿼리 스트링에 추가하거나 "전체" 선택 시 쿼리 스트링에서 제거
	            var newUrl = updateQueryStringParameter(window.location.href, 'pageNum', '1'); // 페이지 번호를 1로 설정
	            newUrl = updateQueryStringParameter(newUrl, 'year', year === "전체" ? "" : year); // 년도 설정
	            window.location.href = newUrl; // 업데이트된 URL로 페이지 이동
	        });
	
	        // URL의 쿼리 스트링 업데이트 함수
	        function updateQueryStringParameter(uri, key, value) {
	            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	            if (uri.match(re)) {
	                return uri.replace(re, '$1' + key + "=" + value + '$2');
	            }
	            else {
	                return uri + separator + key + "=" + value;
	            }
	        }
	    });
	</script>

</body>
</html>