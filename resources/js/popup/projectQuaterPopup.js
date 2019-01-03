
var loading = "";
var projectQuaterPopupJs = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();
		var projectId = $('[name="projectId"]').val();
		//console.log('projectId',projectId);
		
		$('#bt_clip').on('click',function(){
			var href = $(location).attr('href');
			console.log('href',href);
			
			$('#clip_target').val(href); 
		    $('#clip_target').select(); 
		    try { 
		        var successful = document.execCommand('copy');  
		        alert('클립보드에 주소가 복사되었습니다. Ctrl + V 로 붙여넣기 하세요.'); 
		    } catch (err) { 
		        alert('이 브라우저는 지원하지 않습니다.'); 
		    }
		});
		projectQuaterPopupJs.getProjectQuater(projectId);
	},
	getProjectQuater : function (projectId) {
		loading.show();
		var urlVal = '/project/getProjectQuater';
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			data  		: JSON.stringify( {projectId:projectId} ),
			success     : function(responseData){
				console.log("setQuater data",responseData);
				if (null != responseData && null != responseData.listSlQuestion) {
					projectQuaterPopupJs.setQuestionHtml(responseData);
					loading.hide();
				}				
			},
			error : function(e){
				//console.log("error",e);
				loading.hide();
			}
		});
	},
	setQuestionHtml : function (data) {
		
		if (null != data.listSlQuestion) {
			
			var listSlQuestionSin = new Array();
			var setListIndex = 0;
			$.each(data.listSlQuestion, function(index, value){
				var questionType = value.questionType;
				if ('sin' == questionType) {
					listSlQuestionSin[setListIndex] = value;
					setListIndex++;
				}
			});
			data.listSlQuestionSin = listSlQuestionSin;
			
			projectQuaterPopupJs.setQuaterHtml(data);
			
			if (null != data.selectSlQuater) {
				projectQuaterPopupJs.setSelectSlQuater(data);
			}
		}
		
	},
	setBoost : function(data,type) {
		
		var projectId = $('[name="projectId"]').val();
		
		var listSlBooster = data.listSlBooster;
		var setArray = new Array();
		$.each(listSlBooster, function(index, value){
			
			var projectId = value.projectId;
			var questionId = value.questionId;
			var questionName = value.boosterInfo;
			
			var setObject = new Object();
			setObject.projectId = projectId;
			setObject.questionId = questionId;
			setObject.boosterInfo = questionName;
			setObject.boosterPosition = index;
			setArray.push(setObject);
		});
		console.log('setArray',setArray);
		
		if (null != setArray && 0 < setArray.length) {
			
			var urlVal = '/project/setProjectBooster';
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				data  		: JSON.stringify( {projectId:projectId, checkSave:type, listSlBooster:setArray} ),
				success     : function(responseData){
					console.log("setBooster data",responseData);
					if (null != responseData) {
						projectQuaterPopupJs.setBoostHtml(data, responseData);
					}
				},
				error : function(e){
					//console.log("error",e);
				}
			});
		}
	},
	setBoostHtml : function(data, responseData) {
		
		var setHtml = '';
		var boostArray = new Array();
		var boostindex = 0;
		var boostExampleLen = 0;
		var listSlBooster = data.listSlBooster;
		$.each(listSlBooster, function(index, value){
			
			var questionId = questionId;
			var questionName = value.boosterInfo;
			var questionText = '';
			
			var listSlExample = projectQuaterPopupJs.setExample(questionId, questionName, data.listSlQuestion);
			if (null != listSlExample) {
				
				var setTitleHtml = '';
				var setContentHtml = '';
				var lseLen = listSlExample.length
				var widthNum = 100 / lseLen; 
				var checkEText = true;
				
				$.each(listSlExample, function(index2, value2){
					
					var checkIndex2 = index2+1;
					var exampleText = value2.exampleText;
					var questionName = value2.questionName;
					var questionType = value2.questionType;
					
					questionText = questionName +'. '+ value2.questionTitle;
					
					if ('att' == questionType) {
						
						if ('$$@@$$' == exampleText) {
							checkEText = false;
						}
						if (checkEText) {
							setTitleHtml = setTitleHtml + '		<td style="width:'+widthNum+'%;">'+ exampleText + '</td>';
							
							var setContentHtml2 = '';
							var checkEText2 = true;
							//for (var i=0; i<lseLen; i++) {
							$.each(listSlExample, function(index3, value3){
								
								var checkIndex3 = index3+1;
								var exampleText2 = value3.exampleText;
								if ('$$@@$$' == exampleText2) {
									checkEText2 = false;
								}
								if (checkEText2) {
									setContentHtml2 = setContentHtml2 + '<p id="'+ questionName + '_e_' + checkIndex2 + '_' + checkIndex3 +'"></p>' 
								}
							});
							
							setContentHtml = setContentHtml + '		<td style="width:'+widthNum+'%;">'
							+ 	setContentHtml2
							+ '		</td>';
						}
						
					} else {
						
						setTitleHtml = setTitleHtml + '		<td style="width:'+widthNum+'%;">'+ exampleText + '</td>';
						
						if ('sin' == questionType || 'sca' == questionType || 'mul' == questionType) {
							
							setContentHtml = setContentHtml + '		<td style="width:'+widthNum+'%;" id="'+ questionName + '_e_' + checkIndex2 +'"></td>'
							
						} else if ('ord' == questionType) {
							
							var setContentHtml2 = '';
							for (var i=0; i<lseLen; i++) {
								setContentHtml2 = setContentHtml2 + '<p id="'+ questionName + '_e_' + checkIndex2 + '_' + i +'"></p>' 
							}
							setContentHtml = setContentHtml + '		<td style="width:'+widthNum+'%;">'
							+ 	setContentHtml2
							+ '		</td>';
						}
					}
				});
				
				setHtml = setHtml + '<div style="margin-bottom:20px;">'
						+ '	<p>'+ questionText + '</p>'
						+ '	<table style="float:left; border:1px solid black;" name="tableBoot_'+ (index+1) +'">'
						+ '		<tr>'
						+	setTitleHtml
						+ '		</tr>'
						+ '		<tr>'
						+	setContentHtml
						+ '		</tr>'
						+ '	</table>'
						+ '</div>';
			}
		});
		
		$('#setBoostBody').html(setHtml);
		
		if (null != responseData) {
			var listSlBooster = responseData.listSlBooster;
			if (null != listSlBooster) {
				var lsbLen = listSlBooster.length;
				if (0 < lsbLen) {
					
					$.each(listSlBooster, function(index, value){
						
						var boosterInfo = value.boosterInfo;
						var boosterType = value.boosterType;
						var listBoosterData = value.listBoosterData;
						
						$.each(listBoosterData, function(index2, value2){
							
							if ('mul' == boosterType) {

								var cVal = value2.cVal;
								var cCount = value2.cCount;
								$('#'+ boosterInfo +'_e_'+ cVal).text(cVal +' : '+ cCount);
								
							} else {
								
								$.each(value2, function(key, val){
									var arrayKeyName = key.split('_');
									var setKeyName = '';
									
									if (null != arrayKeyName[2]) {
										setKeyName = arrayKeyName[2] +' : ';
									} else if (null != arrayKeyName[1]) {
										setKeyName = arrayKeyName[1] +' : ';
									}
									$('#'+ boosterInfo +'_'+ key).text(setKeyName + val);
								});
							}
						});
					});
				}
			}
		}
	},
	setQuaterHtml : function(data) {
		
		var rowLenArray = new Array();
		var colLenArray = new Array();
		var rowLen = 0;
		var colLen = 0;
		var rowExampleLen = 0;
		var colExampleLen = 0;
		
		var selectSlQuater = data.selectSlQuater;
		var quaterType = selectSlQuater.quaterType;
		
		if (null != selectSlQuater) {
			
			var quaterRowInfo = selectSlQuater.quaterRowInfo;
			var quaterColInfo = selectSlQuater.quaterColInfo;
			
			var arrQRow = quaterRowInfo.split('>');
			var arrQCol = quaterColInfo.split('>');
			var arrQRowLen = arrQRow.length -1;
			var arrQColLen = arrQCol.length -1;
			
			var questionId = 0;
			$.each(arrQRow, function(index, value){
				if (0 < index) {
					console.log('arrQRow value',value);
					var questionName = value;
					var listSlExample = projectQuaterPopupJs.setExample(questionId, questionName, data.listSlQuestionSin);
					if (null != listSlExample) {
						rowExampleLen = listSlExample.length;
						rowLenArray[rowLen]=listSlExample
						rowLen++;
					}
				}
			});
			$.each(arrQCol, function(index, value){
				if (0 < index) {
					console.log('arrQCol value',value);
					var questionName = value;
					var listSlExample = projectQuaterPopupJs.setExample(questionId, questionName, data.listSlQuestionSin);
					if (null != listSlExample) {
						colExampleLen = listSlExample.length;
						colLenArray[colLen]=listSlExample
						colLen++;
					}
				}
			});
		}
		console.log('rowLenArray',rowLenArray);
		console.log('colLenArray',colLenArray);
		
		var colObject = new Object();
		var rowObject = new Object();
		
		$('#setquaterBody').html('');
		setquaterBodyHtml = '<table style="float:left; border:1px solid black;" name="tableQuater">';
		
		if(quaterType != 2) {			
		
			var setColNextCount = 1;
			
			var colspan = 1;
			for (var rowIndex=0; rowIndex < colLen; rowIndex++) {
				
				setquaterBodyHtml = setquaterBodyHtml + '<tr>';
				
				for (var i=0; i<rowLen; i++) {
					setquaterBodyHtml = setquaterBodyHtml + '<td>'+ ((rowIndex+1)*(i+1)) +'</td>';
				}
					
				var listSlExample = colLenArray[rowIndex];
				var exampleLen = listSlExample.length;
				
				for (var sapnIndex=0; sapnIndex < colLen; sapnIndex++) {
					if (rowIndex < sapnIndex) {
						colspan = colspan * colLenArray[sapnIndex].length;
					} else {
						colspan = 1;
					}
				}
				
				for (var j=0; j<setColNextCount; j++) {
					
					$.each(listSlExample, function(index, value){
						var exampleId = value.exampleId;
						var exampleText = value.exampleText;
						setquaterBodyHtml = setquaterBodyHtml + '<td colspan="'+ colspan +'">'+ exampleText +'</td>';
					});
				}
				setColNextCount = setColNextCount * exampleLen;
				
				setquaterBodyHtml = setquaterBodyHtml + '</tr>';
			}
			
			var rowCount = 1;
			for (var rIndex=0; rIndex < rowLen; rIndex++) {
				var exampleLen = rowLenArray[rIndex].length;
				rowCount = rowCount * exampleLen;
			}
			
			var colCount = 1;
			for (var cIndex=0; cIndex < colLen; cIndex++) {
				var exampleLen = colLenArray[cIndex].length;
				colCount = colCount * exampleLen;
			}
			
			for (var rowIndex=0; rowIndex < rowCount; rowIndex++) {
				
				setquaterBodyHtml = setquaterBodyHtml + '<tr>';
				
				for (var i=0; i<rowLen; i++) {
					
					var rowspan = 1;
					for (var spanIndex=0; spanIndex < rowLen; spanIndex++) {
						
						if (i < spanIndex) {
							rowspan = rowspan * rowLenArray[spanIndex].length;
						} else {
							rowspan = 1;
						}
					}
					
					if ( 0 == (rowIndex % rowspan) ) {
						
						var checkIndex = rowIndex / rowspan ;
						
						var listSlExample = rowLenArray[i];
						var exampleLen = listSlExample.length;
						
						if (checkIndex >= exampleLen) {
							checkIndex = checkIndex % exampleLen;
						}
						
						$.each(listSlExample, function(index, value){
							var exampleId = value.exampleId;
							var exampleText = value.exampleText;
							
							if (checkIndex == index) {
								setquaterBodyHtml = setquaterBodyHtml + '<td rowspan="'+ rowspan +'">'+ exampleText +'</td>';
							}
						});
					}
				} 
				
				for (var i=1; i<(setColNextCount+1); i++) {
					var checkRowIndex = rowIndex + 1;
					setquaterBodyHtml = setquaterBodyHtml + '<td><span id="dq_'+ checkRowIndex +'_'+i+'"></span> / <span name="textQuater" id="q_'+ checkRowIndex +'_'+i+'" ></span>';
				}
										
				setquaterBodyHtml = setquaterBodyHtml + '</tr>';
			}
		} else if(quaterType == 2) {
			setquaterBodyHtml += '<tr><td colspan="">완료자 쿼터 설정</td></tr>';
			setquaterBodyHtml += '<tr>';
			setquaterBodyHtml += '<td><span id="dq_finish"></span> / <span name="textQuater" id="q_finish" onlynumber /></td>';	
			setquaterBodyHtml += '</tr>';
		}
		
		$('#setquaterBody').html(setquaterBodyHtml);
	},
	setExample : function (qId, qName, listData) {
		
		var returnVal = null;
		if (null != listData) {
			
			$.each(listData, function(index, value){
				
				var questionId = value.questionId;
				var questionName = value.questionName;
				var questionType = value.questionType;
				var questionTitle = value.questionTitle;
				
				if (qName == questionName) {
					
					var listSlExample = value.listSlExample;
					if (null != listSlExample) {
						
						$.each(listSlExample, function(index, value){
							value.questionId=questionId;
							value.questionName = questionName;
							value.questionType = questionType;
							value.questionTitle = questionTitle;
						});
						returnVal = value.listSlExample;
						//console.log('returnVal',returnVal);
					}
				}
			});
		}
		return returnVal;
	},
	setSelectSlQuater : function (data) {
		
		var selectSlQuater = data.selectSlQuater;
		if (null != selectSlQuater){
			projectQuaterPopupJs.setQuaterHtml(data);
			projectQuaterPopupJs.setQuaterActiveCount(data);
		}
		
		var listSlBooster = data.listSlBooster;
		if (null != listSlBooster) {
			projectQuaterPopupJs.setBoost(data,'select');
		}
	},
	setQuaterActiveCount : function (data) {
		
		var selectSlQuater = data.selectSlQuater
		if (null != selectSlQuater) {
			var listSlQuaterCount = selectSlQuater.listSlQuaterCount;
			if (null != listSlQuaterCount) {
				
				$.each(listSlQuaterCount, function(index, value){
					
					var quaterPosition = value.quaterPosition;
					var quaterActiveCount = value.quaterActiveCount;
					var quaterTotalCount = value.quaterTotalCount;
					
					$('#d'+quaterPosition).html(quaterActiveCount);
					$('#'+quaterPosition).html(quaterTotalCount);
				});
			}
		}
	}
}

$(function(){
	projectQuaterPopupJs.init();
});