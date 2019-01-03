
var pagingJs = {
		
	init : function () {
	}
	//, setPaging : function (pageRow, pageSize, totCountPage, pageNo) {
	, setPaging : function (pr, ps, tp, pn) {
		
		var pageRow = 10;
		var pageSize = 5;
		var totCountPage = 0;
		var pageNo = 1;
		
		var pageIndex = 0;
		var pageLastIndex = 0;
		var prePageIndex = 0;
		var nextPageIndex = 0;
		var pageStartNo = 0;
		var pageEndNo = 0;
		
		var limit1 = 0;
		var limit2 = 0;
		
		if ( null != pr && "" != pr ) { pageRow = parseInt(pr); }
		if ( null != ps && "" != ps ) { pageSize = parseInt(ps); }
		if ( null != tp && "" != tp ) { totCountPage = parseInt(tp); }
		if ( null != pn && "" != pn ) { pageNo = parseInt(pn); }
		//console.log('pageRow',pageRow);
		//console.log('pageSize',pageSize);
		//console.log('totCountPage',totCountPage);
		//console.log('pageNo',pageNo);
		
		if (0 == totCountPage) { return false; }
		
		// Set PageIndex ( 1~5 : 0 , 6~10 : 1 , 11~15 : 2 ... )
		pageIndex = parseInt( pageNo / pageSize ) ;
		// pageNo가 5단위 일때는 pageIndex - 1
		if ( 0 == (pageNo % pageSize) ) {
			pageIndex = pageIndex - 1;
		}
		
		// 마지막 pageIndex 수
		pageLastIndex = parseInt( totCountPage / pageRow ) ;
		if ( 0 == (totCountPage % pageRow) ) {
			pageLastIndex = pageLastIndex - 1;
		}
		
		if (pageIndex  > 0 ) {
			prePageIndex = pageIndex - 1;
		}
		
		if ( pageLastIndex > pageIndex ) {
			nextPageIndex = pageIndex + 1;
		}
		
		// 출력되는 페이지 시작과 끝 번호
		pageStartNo = parseInt( pageIndex * pageSize ) + 1;
		pageEndNo = pageStartNo + pageSize -1;
		
		limit1 = ( (pageNo -1) * pageRow) + 1;
		limit2 = parseInt(pageRow);
		
		var returnObject = new Object();
		returnObject.pageRow = pageRow;
		returnObject.pageSize = pageSize;
		returnObject.totCountPage = totCountPage;
		returnObject.pageNo = pageNo;
		returnObject.pageIndex = pageIndex;
		returnObject.pageLastIndex = pageLastIndex;
		returnObject.prePageIndex = prePageIndex;
		returnObject.nextPageIndex = nextPageIndex;
		returnObject.pageStartNo = pageStartNo;
		returnObject.pageEndNo = pageEndNo;
		returnObject.limit1 = limit1;
		returnObject.limit2 = limit2;
		
		//console.log('returnObject',returnObject);
		
		return returnObject;
		
	}
	, paging : function (paging, key, pageFunction) {
		
		//console.log("paging paging",paging);
		
		var activeText = "";
		var preText = "";
		var nextText = "";
		var firstPageText = "";
		var lastPageText = "";
		var prePageNo = 0;
		var nextPageNo = 0;
		
		var pageNo = parseInt(paging.pageNo);
		var pageRow = parseInt(paging.pageRow);
		var pageSize = parseInt(paging.pageSize);
		
		var pageIndex = parseInt(paging.pageIndex);
		var prePageIndex = parseInt(paging.prePageIndex);
		var nextPageIndex = parseInt(paging.nextPageIndex);
		var pageLastIndex = parseInt(paging.pageLastIndex);
		
		var pageStartNo = parseInt(paging.pageStartNo);
		var pageEndNo = parseInt(paging.pageEndNo);
		
		//$('#pagingInfo').html(pageNo +" / "+ pageLastIndex);
		
		// Set Previous
		if (pageIndex <= 0) {
			preText ='<a href="javascript:void(0);">&lt;</a>';
		} else {
			prePageNo = pageStartNo - pageSize;
			preText ='<a href="javascript:pagingJs.pagingClick(\'pre\',\''+ prePageNo +'\',\''+ key +'\',\''+ pageFunction +'\');">&lt;</a>';
		}
		
		// Set Next
		var pageLastNo = pageLastIndex +1 ;
		if (pageEndNo > pageLastNo) {
			pageEndNo = pageLastNo;
			nextText = '<a href="javascript:void(0);">&gt;</a>';
		} else {
			nextPageNo = pageEndNo + 1;
			nextText = '<a href="javascript:pagingJs.pagingClick(\'next\',\''+ nextPageNo +'\',\''+ key +'\',\''+ pageFunction +'\');">&gt;</a>';
		}
		
		// Set first page
		firstPageText = '<a href="javascript:pagingJs.pagingClick(\'pageNo\',\'1\',\''+ key +'\',\''+ pageFunction +'\');">1</a>';
		
		// Set last page
		lastPageText = '<a href="javascript:pagingJs.pagingClick(\'pageNo\',\''+ pageEndNo +'\',\''+ key +'\',\''+ pageFunction +'\');">'+ pageEndNo +'</a>';
		
		var pHtml = '';
		
		// previous
		pHtml += preText;
		// first Page
		//+ firstPageText;
		
		pHtml += '<span id="paginate">';
		// Set list
		for (var i=pageStartNo; i<=pageEndNo; i++) {
			
			if ( i==pageNo) {
				activeText = "on";
			} else {
				activeText = "";
			}
			pHtml += '<a class="'+ activeText +'" href="javascript:pagingJs.pagingClick(\'pageNo\',\''+ i +'\',\''+ key +'\',\''+ pageFunction +'\');">'+ i +'</a>';
		}

		pHtml += '</span>';
		
		// last Page
		//+ lastPageText
		// next
		pHtml += nextText;
		
		$('.pagination').html(pHtml);
		
	}
	, pagingClick : function (type, pageNo, key, pageFunction) {
		//console.log('pagingClick pageFunction',pageFunction);
		//console.log('pagingClick pageNo',pageNo);
		eval(pageFunction+'('+ pageNo+ ','+ key +')');
	}
	
	, nextPrePaging : function (data, goUrl, keyText ,listUrl) {
		
		var aTagNextTitle = "";
    	var aTagPreTitle = "";
    	var preUrl = "";
    	
    	if (null != data.nextIdx && "" != data.nextIdx) {
    		
    		if ("0" != data.nextIdx) {
    			aTagNextTitle = '<a href="'+ goUrl +'?'+ keyText +'='+ data.nextIdx +'">'+ data.nextTitle +'</a>' ;
    		} else {
    			aTagNextTitle = '<a href="javascript:void(0);">'+ data.nextTitle +'</a>' ;
    		}
    		
    	} else {
    		aTagNextTitle = '<a href="javascript:void(0);">다음 글이 없습니다.</a>' ;
    	}
    	
    	if (null != data.preIdx && "" != data.preIdx) {
    		
    		if ("0" != data.preIdx) {
    			aTagPreTitle = '<a href="'+ goUrl +'?'+ keyText +'='+ data.preIdx +'">'+ data.preTitle +'</a>' ;
    		} else {
    			aTagPreTitle = '<a href="javascript:void(0);">'+ data.preTitle +'</a>' ;
    		}
    		
    	} else {
    		aTagPreTitle = '<a href="javascript:void(0);">이전 글이 없습니다.</a>' ;
    	}
    	
    	var htmlList = "";
    	htmlList += '  <ul>';
		htmlList += '    <li><b>다음글</b>'+ aTagNextTitle +'</li>';
		htmlList += '    <li><b>이전글</b>'+ aTagPreTitle +'</li>';
		htmlList += '  </ul>';
		htmlList += '  <p>';
		htmlList += '    <a href="'+ listUrl +'">목록보기</a>';
		htmlList += '  </p>';
		//console.log('htmlList',htmlList);
		$('#nextPrePaging').html('');
    	$('#nextPrePaging').html(htmlList);
	}
}
