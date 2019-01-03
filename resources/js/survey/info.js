
var infoJs = {

	init : function(){
		
		var projectId = $('[name="projectId"]').val();
		var uCode = $('[name="uCode"]').val();
		var cpno = $('[name="cpno"]').val();
		var cType = $('[name="cType"]').val();
		//console.log('cType', cType);
		//console.log('cpno', cpno);
		//console.log('uCode', uCode);
		
		if (null != projectId && '' != projectId && null != uCode && '' != uCode) {
			
			var urlVal = '/survey/getInfo';
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				async		: false,
				data  		: JSON.stringify( {projectId:projectId, uCode:uCode} ),
				success     : function(responseData){
					console.log("getInfo data",responseData);
					if (null != responseData) {
						if (!responseData.slQuestionViewPageCheck) {
							alert('문항 뷰 페이지 테이블 데이터 없음');
							return false;
						}
						if (null != responseData.selectSlProject) {
							
							$('#bt_next').on('click',function(){
								
								var selectSlProject = responseData.selectSlProject;
								var selectSlQuater = responseData.selectSlQuater;
								var listSlQuaterCount = responseData.listSlQuaterCount;
								var usePc = selectSlProject.usePc;
								var useMobile = selectSlProject.useMobile;
								var useWeb = surveyCommonJs.usekWeb(usePc, useMobile);
								console.log('useWeb',useWeb);
								var useWebValue = useWeb.value;
								var useWebType = useWeb.type;
								
								var useResearBanner = selectSlProject.useResearBanner;
								var useResearList = selectSlProject.useResearList;
								var slProjectCPNO = selectSlProject.cpno;
								var checkCPNO = false;
								var projectState = selectSlProject.projectState;
								
								var quaterType = "";
								if("" != selectSlQuater && null != selectSlQuater){
									quaterType = selectSlQuater.quaterType;
								}

								var checkQuater = false;
								
								var useFollowing = selectSlProject.useFollowing;
								var listSlQuestionViewPage = responseData.listSlQuestionViewPage;
								var selectTable = responseData.selectTable;
								console.log('useFollowing',useFollowing);
								console.log('listSlQuestionViewPage',listSlQuestionViewPage);
								console.log('selectTable',selectTable);
								
								var serveyGoPath = responseData.serveyGoPath;
								console.log('serveyGoPath',serveyGoPath);
								
								
								// 진입 체크
								if("1" == useResearBanner && "1111" != uCode) {	
									// 배너 조사인 경우
									if("1111" != uCode) {	// 테스트 계정이 아닌 경우									
										var ran = infoJs.generateRandom(1000000, 9999999);
										
										// 설문 시작전은 ucode 3자리 설정
										if("2" != projectState) {
											ran = infoJs.generateRandom(100, 999);
										}
									}
									//console.log('ran',ran);
									$('[name="uCode"]').val(ran);
									uCode = $('[name="uCode"]').val();
								} else if("1" == useResearList) {	
									// 리스트 조사인 경우									
									if(cpno == slProjectCPNO || "1111" == uCode) {	// url cpno와 db cpno 비교
										checkCPNO = true;		
									} else {
										useWebValue = false;
									}
								} else if("2" == quaterType) {	
									// 완료자로 쿼터 제어하는 경우
									var slQuaterCount = listSlQuaterCount[0];
									var quaterActiveCount = slQuaterCount.quaterActiveCount;
									var quaterTotalCount = slQuaterCount.quaterTotalCount;

									if(quaterActiveCount < quaterTotalCount) {
										// 참여 가능 (응답완료 수 < 쿼터)
										checkQuater = true;					
									} else {
										// 쿼터 아웃
										useWebValue = false;
									}
									
								}
								
								if (null != listSlQuestionViewPage) {
									
									var slQuestionViewPage = listSlQuestionViewPage[0];
									
									if (useWebValue) {
										// 이어하기
										var checkBaseGoUrl = false;
										if ('1' == useFollowing && null != selectTable) {
											
											var followingPageName = '';
											var followingPageCheckNum = '';
											var pageLastQuestionId = selectTable.pageLastQuestionId;
											var pageLastQuestionName = selectTable.pageLastQuestionName;	// 마지막 문항
											var pageSaveQuestionName = selectTable.pageSaveQuestionName;	// 마지막으로 저장된 문항
											
											console.log('pageSaveQuestionName',pageSaveQuestionName);
											console.log('pageLastQuestionName',pageLastQuestionName);
											
											console.log('pageLastQuestionName == pageSaveQuestionName',pageLastQuestionName == pageSaveQuestionName);
											
											// 응답 완료 ucode는 진입 X
											if(pageLastQuestionName == pageSaveQuestionName) {
												location.href = "http://online.netpoint.co.kr/survey/already.aspx";
											}
											
											$.each(listSlQuestionViewPage,function(index,value){
												
												var pageTitleQuestionId = value.pageTitleQuestionId;
												var pageTitleQuestionName = value.pageTitleQuestionName;
												var pageTitleQuestionCheckNum = value.pageTitleQuestionCheckNum;
												
												if (pageTitleQuestionId == pageLastQuestionId && pageTitleQuestionName == pageLastQuestionName) {
													followingPageName = pageTitleQuestionName;
													followingPageCheckNum = pageTitleQuestionCheckNum;
												}
											});
											
											console.log('followingPageName',followingPageName);
											
											if ('' != followingPageName && '' != followingPageCheckNum) {
										
												var message = "이어서 진행하시겠습니까?" ;
												if(confirm(message)){													
													var goUrl = serveyGoPath + followingPageName +".jsp?uCode=" + uCode + "&checkNum="+followingPageCheckNum+'&CType='+ cType;
													console.log('goUrl',goUrl);
													location.href= goUrl;
												} else {
													checkBaseGoUrl = true;
												}
											} else {
												checkBaseGoUrl = true;
											}
										
										} else {
											checkBaseGoUrl = true;
										}
										
										// 정상 진행
										console.log('checkBaseGoUrl',checkBaseGoUrl);
										if (checkBaseGoUrl) {	
											if (null != slQuestionViewPage && null != serveyGoPath) {
												
												var pageName = slQuestionViewPage.pageTitleQuestionName
												var pageCheckNum = slQuestionViewPage.pageTitleQuestionCheckNum
												console.log('pageTitleQuestionName',pageName);
												
												if (null != pageName && '' != pageName && null != pageCheckNum && '' != pageCheckNum) {
													
													var goUrl = serveyGoPath + pageName +'.jsp?projectId='+ projectId +'&uCode='+ uCode +'&checkNum='+ pageCheckNum+'&CType='+ cType; 
													console.log('goUrl',goUrl);
													location.href= goUrl;
												}
											}
										}
									} else if("1" == useResearList && !checkCPNO) {
										// cpno 조회 실패
										alert("설문 고유정보(cpno)가 일치하지 않습니다.\n주소확인 후 다시 시도하세요.");
									} else if("2" == quaterType && !checkQuater) {
										// 쿼터 아웃
										alert('완료자 쿼터 아웃');
										//location.href="http://www.netpoint.co.kr/html/front/nc/survey/getCash_v1.jsp?retparam="+uCode+"|"+businessId+"|"+surveyResult;
									} 
									else {
										alert(useWebType + " 불가능 합니다.");
										window.open("about:blank","_self").close();
										return false;
									}
								}
							});
						}
					}
				},
				error : function(e){
					//console.log("error",e);
				}
			});
		}
	},
	generateRandom : function (min, max) {
	  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
	  return ranNum;
	}
}
$(function(){
	infoJs.init();
});
